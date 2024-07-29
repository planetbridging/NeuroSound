// src/app/profile.js
import { Box, Text, VStack, Flex, Button } from "@chakra-ui/react";
import { cookies } from "next/headers";
import cookie from "cookie";

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

export default async function Profile() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  const username = token ? await checkAuth(token.value) : null;

  return (
    <Flex align="center" justify="center" height="100vh" bg="gray.900">
      <Box
        width="350px"
        p="6"
        boxShadow="lg"
        borderRadius="md"
        bg="gray.800"
        color="white"
      >
        <VStack spacing={4} align="center">
          <Text fontSize="2xl">Profile</Text>
          {username ? (
            <>
              <Text>Welcome, {username}</Text>
            </>
          ) : (
            <Text>You are not logged in</Text>
          )}
        </VStack>
      </Box>
    </Flex>
  );
}
