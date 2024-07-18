import { Inter } from "next/font/google";
import "./globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { Box, Button, Text, Image, VStack, Flex } from "@chakra-ui/react";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Flukebot",
  description: "Flukebot",
};

export default function RootLayout({ children }) {
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
                <Link href="/">
                  <Button colorScheme="teal" variant="outline" mr="4">
                    Home
                  </Button>
                </Link>
                <Link href="/neuralforge">
                  <Button colorScheme="teal" variant="outline">
                    <Image src={"/logo.png"} alt="Logo" boxSize="50px" />
                    Neural Forge
                  </Button>
                </Link>
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
