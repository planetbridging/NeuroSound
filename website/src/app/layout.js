import { Inter } from "next/font/google";
import "./globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { Box, Button, Text, Image, Flex } from "@chakra-ui/react";
import Link from "next/link";
import { cookies } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Flukebot",
  description: "Flukebot",
};

async function checkAuth(token) {
  if (!token) return null;
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/check-auth`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store", // Disable caching for this request
      }
    );
    if (response.ok) {
      const data = await response.json();
      return data.username;
    }
  } catch (error) {
    console.error("Error checking authentication:", error);
  }
  return null;
}

export default async function RootLayout({ children }) {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  const loggedInUser = token ? await checkAuth(token.value) : null;

  return (
    <html lang="en">
      <body className={inter.className}>
        <ChakraProvider>
          <Flex
            direction="column"
            minHeight="100vh"
            style={{ backgroundImage: `url(/bg.jpg)`, backgroundSize: "cover" }}
          >
            <Box
              flex="1"
              bg="rgba(0, 0, 0, 0.5)"
              backdropFilter="blur(10px)"
              position="relative"
              zIndex="1"
            >
              <Box
                as="nav"
                justifyContent="flex-start"
                padding="10px"
                backgroundColor="rgba(0, 0, 0, 0.7)"
                color="white"
                bg="rgba(255, 255, 255, 0.1)"
                w="100%"
                h="100%"
                p="20px"
                boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
                backdropFilter="blur(10px)"
                display="flex"
                alignItems="center"
              >
                <Link href="/" passHref>
                  <Button as="span" colorScheme="teal" variant="outline" mr="4">
                    Home
                  </Button>
                </Link>
                <Link href="/neuralforge" passHref>
                  <Button as="span" colorScheme="teal" variant="outline">
                    <Image src="/logo.png" alt="Logo" boxSize="50px" />
                    Neural Forge
                  </Button>
                </Link>
                <Link href="/neuralsound" passHref>
                  <Button as="span" colorScheme="teal" variant="outline">
                    <Image src="/neuralsound.png" alt="Logo" boxSize="50px" />
                    Neural Sound
                  </Button>
                </Link>
                {loggedInUser ? (
                  <>
                    <Link href="/profile" passHref>
                      <Button
                        as="span"
                        colorScheme="teal"
                        variant="outline"
                        mr="4"
                      >
                        Profile
                      </Button>
                    </Link>
                    <Link href="/api/logout" passHref>
                      <Button as="span" colorScheme="teal" variant="outline">
                        Logout
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="/login" passHref>
                      <Button
                        as="span"
                        colorScheme="teal"
                        variant="outline"
                        mr="4"
                      >
                        Login
                      </Button>
                    </Link>
                    <Link href="/register" passHref>
                      <Button as="span" colorScheme="teal" variant="outline">
                        Register
                      </Button>
                    </Link>
                  </>
                )}
              </Box>
              <Box position="relative" zIndex="1" paddingBottom="100px">
                {children}
              </Box>
            </Box>
            <Box
              as="footer"
              width="100%"
              backgroundColor="rgba(0, 0, 0, 0.7)"
              color="white"
              padding="10px"
              textAlign="center"
            >
              <Text>
                © {new Date().getFullYear()} Flukebot. All rights reserved.
              </Text>
              <Text>
                Contact us at{" "}
                <a
                  href="mailto:planetbridging@gmail.com"
                  style={{ color: "teal" }}
                >
                  planetbridging@gmail.com
                </a>
              </Text>
            </Box>
          </Flex>
        </ChakraProvider>
      </body>
    </html>
  );
}
