import React, { useState } from "react";
import { Box, Button, SimpleGrid, Text, useColorModeValue } from "@chakra-ui/react";
import ArtPiece from "components/card/ArtPiece"; // Załóżmy, że masz komponent ArtPiece
import Scream from "assets/img/art/Scream.png";
import Memory from "assets/img/art/Memory.png";
import StarryNight from "assets/img/art/Starry Night.png";
import Avatar1 from "assets/img/avatars/avatar1.png";
import Avatar2 from "assets/img/avatars/avatar2.png";
import Avatar3 from "assets/img/avatars/avatar3.png";
import Avatar4 from "assets/img/avatars/avatar4.png";
import ArtDetails from "views/admin/Art/components/ArtDetails"; // Użyjmy przykładowo ArtDetails

const artData = [
  {
    name: 'Starry Night',
    artist: 'Vincent van Gogh',
    image: StarryNight,
    description: 'A famous painting by Vincent van Gogh, depicting a starry night sky.',
    value: 5000000,
  },
  {
    name: 'The Persistence of Memory',
    artist: 'Salvador Dalí',
    image: Memory,
    description: 'A surrealist masterpiece by Salvador Dalí, known for its melting clocks.',
    value: 7500000,
  },
  {
    name: 'The Scream',
    artist: 'Edvard Munch',
    image: Scream,
    description: 'An iconic painting by Edvard Munch, expressing existential dread.',
    value: 6000000,
  },
];

export default function Art() {
  const [selectedArt, setSelectedArt] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const textColor = useColorModeValue("secondaryGray.900", "white");

  const openDetailsModal = (art) => {
    setSelectedArt(art);
    setIsModalOpen(true);
  };

  const closeDetailsModal = () => {
    setSelectedArt(null);
    setIsModalOpen(false);
  };

  return (
    <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
      <Text
        mb='20px'
        color={textColor}
        fontSize='2xl'
        ms='24px'
        fontWeight='700'>
        Art Collection
      </Text>
      <SimpleGrid columns={{ base: 1, md: 3 }} gap='20px'>
        {artData.map((art, index) => (
          <ArtPiece
            key={index}
            name={art.name}
            artist={art.artist}
            image={art.image}
            details={() => openDetailsModal(art)}
          />
        ))}
      </SimpleGrid>
      {selectedArt && (
        <ArtDetails
          isOpen={isModalOpen}
          onClose={closeDetailsModal}
          art={selectedArt}
        />
      )}
    </Box>
  );
}
