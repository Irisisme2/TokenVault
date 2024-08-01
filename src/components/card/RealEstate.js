import React from 'react';
import { Box, Button, Flex, Image, Text, useColorModeValue } from '@chakra-ui/react';

export default function NFT({ name, author, bidders, image, details }) {
  const textColor = useColorModeValue("secondaryGray.900", "white");

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg="white"
      boxShadow="md"
      _hover={{ boxShadow: "lg" }}
    >
      <Image src={image} alt={name} />
      <Box p="6">
        <Flex align="center" justify="space-between">
          <Text fontWeight="bold" color={textColor}>
            {name}
          </Text>
          <Button onClick={details} variant="solid" colorScheme="blue">
            Details
          </Button>
        </Flex>
        <Text mt="2" color="gray.500">{author}</Text>
      </Box>
    </Box>
  );
}
