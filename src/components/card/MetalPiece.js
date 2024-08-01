import React from "react";
import { Box, Image, Text, Button, Flex } from "@chakra-ui/react";

const ArtPiece = ({ name, artist, image, details }) => (
  <Box p={4} borderWidth={1} borderRadius="md" boxShadow="md">
    <Image src={image} alt={name} borderRadius="md" mb={4} />
    <Text fontSize="xl" fontWeight="bold">{name}</Text>
    <Flex mt={4} justify="space-between" align="center">
      <Button colorScheme="blue" onClick={details}>View Details</Button>
    </Flex>
  </Box>
);

export default ArtPiece;
