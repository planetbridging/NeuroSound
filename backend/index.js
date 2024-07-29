const mime = require("mime");
const path = require("path");
const express = require("express");
const subdomain = require("express-subdomain");
const { createProxyMiddleware } = require("http-proxy-middleware");
const jwt = require("jsonwebtoken");
const app = express();
const fs = require("fs");
const Parse = require("parse/node");
const cookieParser = require("cookie-parser");
require("dotenv").config();

var port = 8456;
const nextJsPort = 3000; // Port where your Next.js app is running

Parse.initialize(
  process.env.PARSE_SERVER_APPLICATION_ID,
  "",
  process.env.PARSE_SERVER_MASTER_KEY
); // Initialize Parse
Parse.serverURL = process.env.PARSE_SERVER_URL;

app.use(express.json()); // Middleware to parse JSON bodies
app.use(cookieParser()); // Middleware to parse cookies

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

(async () => {
  console.log("welcome to flukebot");
  await startup();
})();

async function startup() {
  // Registration endpoint
  app.post("/api/register", async (req, res) => {
    const { username, password, email } = req.body;
    const user = new Parse.User();
    user.set("username", username);
    user.set("password", password);
    user.set("email", email);

    try {
      await user.signUp();
      res.status(200).json({ message: "User registered successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  // Login endpoint
  app.post("/api/login", async (req, res) => {
    const { username, password } = req.body;

    try {
      const user = await Parse.User.logIn(username, password);
      const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 3600000, // 1 hour
        sameSite: "strict",
        path: "/",
      });
      res.status(200).json({ message: "Logged in successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  // Logout endpoint
  app.post("/api/logout", (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
  });

  // Middleware to verify JWT
  function verifyToken(req, res, next) {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(403).json({ error: "No token provided" });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Failed to authenticate token" });
      }
      req.username = decoded.username;
      next();
    });
  }

  // Check authentication endpoint
  app.get("/api/check-auth", verifyToken, (req, res) => {
    res.status(200).json({ username: req.username });
  });

  // Protected route example
  app.get("/api/profile", verifyToken, (req, res) => {
    res.status(200).json({ message: `Welcome ${req.username}` });
  });

  // Proxy requests to Next.js in development and production
  app.use(
    "/",
    createProxyMiddleware({
      target: `http://localhost:${nextJsPort}`,
      changeOrigin: true,
      pathRewrite: {
        "^/": "/", // remove base path
      },
    })
  );

  app.listen(port, () => {
    console.log("Server is running on port " + port);
  });
}
