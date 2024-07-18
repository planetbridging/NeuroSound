import { Box, Text, Image, VStack, Heading, Stack } from "@chakra-ui/react";

export default function Home() {
  return (
    <Box minHeight="100vh" padding="20px" color="white">
      <VStack align="center" justify="center" spacing={10}>
        <Image src="/flukebot.png" alt="Flukebot Logo" boxSize="150px" mb="4" />
        <Heading as="h1" size="2xl" textAlign="center">
          Welcome to Flukebot
        </Heading>
        <Text fontSize="xl" textAlign="center" maxW="800px">
          Flukebot is a revolutionary project designed to analyze various types
          of data using advanced machine learning techniques. Our system offers
          both client-side and server-side training capabilities, leveraging the
          Neural Forge for a mixture of experts approach.
        </Text>

        <Heading as="h2" size="xl">
          Project Overview
        </Heading>
        <Text fontSize="lg" textAlign="center" maxW="800px">
          Our group project focuses on creating a comprehensive queue system to
          upload and process different types of data, with an initial focus on
          audio files. The system will automatically process these files to
          extract and analyze sounds, classifying different types of animals
          present in the clips. The processed files will then be sorted and
          uploaded to another server for storage and further analysis. The
          system integrates the Neural Forge, enabling users to perform both
          client-side and server-side training using advanced machine learning
          techniques. This setup allows for a flexible and scalable approach to
          training and utilizing neural networks for various types of data
          classification and analysis.
        </Text>

        <Heading as="h2" size="xl">
          Key Features
        </Heading>
        <VStack align="start" spacing={3} maxW="800px">
          <Text>- Automated data file upload and processing</Text>
          <Text>- Sound extraction and classification for audio files</Text>
          <Text>- Versatile system for processing various types of data</Text>
          <Text>- Server-side and client-side training using Neural Forge</Text>
          <Text>- Real-time queue system for managing processed files</Text>
          <Text>- Scalable infrastructure for handling large datasets</Text>
        </VStack>

        <Heading as="h2" size="xl">
          Contact Us
        </Heading>
        <Text fontSize="lg">
          For inquiries, please contact us at{" "}
          <a href="mailto:planetbridging@gmail.com" style={{ color: "teal" }}>
            planetbridging@gmail.com
          </a>
        </Text>
      </VStack>
    </Box>
  );
}
