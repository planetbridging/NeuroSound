import { Box, Button, Text, Image, VStack } from "@chakra-ui/react";

export default function NeuralForge() {
  return (
    <VStack align="center" justify="center" height="200px">
      <Image src={"/logo.png"} alt="Logo" boxSize="150px" mb="4" />
      <Text color="white" fontSize="2xl">
        Welcome to Neural Forge
      </Text>
    </VStack>
  );
}
