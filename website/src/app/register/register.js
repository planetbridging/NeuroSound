"use client";

import React, { Component } from "react";
import { Box, Button, Input, VStack, Text, Flex } from "@chakra-ui/react";

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      message: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();

    const { username, password, email } = this.state;

    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, email }),
    });

    const data = await response.json();

    if (response.ok) {
      this.setState({ message: "User registered successfully" });
    } else {
      this.setState({ message: `Error: ${data.error}` });
    }
  }

  render() {
    const { username, password, email, message } = this.state;

    return (
      <Flex align="center" justify="center" bg="gray.900">
        <Box
          width="350px"
          p="6"
          boxShadow="lg"
          borderRadius="md"
          bg="gray.800"
          color="white"
        >
          <Text fontSize="2xl" mb="6" textAlign="center">
            Register
          </Text>
          <form onSubmit={this.handleSubmit}>
            <Input
              placeholder="Username"
              name="username"
              value={username}
              onChange={this.handleInputChange}
              mb="4"
              bg="gray.700"
              border="1px solid"
              borderColor="gray.600"
              _placeholder={{ color: "gray.400" }}
            />
            <Input
              placeholder="Password"
              type="password"
              name="password"
              value={password}
              onChange={this.handleInputChange}
              mb="4"
              bg="gray.700"
              border="1px solid"
              borderColor="gray.600"
              _placeholder={{ color: "gray.400" }}
            />
            <Input
              placeholder="Email"
              type="email"
              name="email"
              value={email}
              onChange={this.handleInputChange}
              mb="6"
              bg="gray.700"
              border="1px solid"
              borderColor="gray.600"
              _placeholder={{ color: "gray.400" }}
            />
            <Button
              type="submit"
              colorScheme="blue"
              width="full"
              _hover={{ bg: "blue.600" }}
            >
              Register
            </Button>
          </form>
          {message && (
            <Text mt="4" textAlign="center" color="red.400">
              {message}
            </Text>
          )}
        </Box>
      </Flex>
    );
  }
}

export default RegisterForm;
