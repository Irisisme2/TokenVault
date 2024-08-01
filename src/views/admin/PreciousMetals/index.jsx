import React, { useState } from "react";
import { Box, Button, SimpleGrid, Text, useColorModeValue } from "@chakra-ui/react";
import MetalPiece from "components/card/MetalPiece"; // Replace with your component for precious metals
import Gold from "assets/img/metals/Metal1.png";
import Silver from "assets/img/metals/Metal2.png";
import Platinum from "assets/img/metals/Metal3.png";
import MetalDetails from "views/admin/PreciousMetals/components/MetalDetails"; // Replace with the details component for metals

const metalData = [
  {
    name: 'Gold Bar',
    purity: '99.99%',
    image: Gold,
    description: 'A gold bar of high purity, ideal for investment.',
    value: 200000, // Price in USD
  },
  {
    name: 'Silver Coin',
    purity: '99.90%',
    image: Silver,
    description: 'A collectible silver coin with a high purity level.',
    value: 1500, // Price in USD
  },
  {
    name: 'Platinum Bullion',
    purity: '99.95%',
    image: Platinum,
    description: 'A platinum bullion with exceptional purity, suitable for trading.',
    value: 300000, // Price in USD
  },
];

export default function PreciousMetals() {
  const [selectedMetal, setSelectedMetal] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const textColor = useColorModeValue("secondaryGray.900", "white");

  const openDetailsModal = (metal) => {
    setSelectedMetal(metal);
    setIsModalOpen(true);
  };

  const closeDetailsModal = () => {
    setSelectedMetal(null);
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
        Precious Metals Collection
      </Text>
      <SimpleGrid columns={{ base: 1, md: 3 }} gap='20px'>
        {metalData.map((metal, index) => (
          <MetalPiece
            key={index}
            name={metal.name}
            purity={metal.purity}
            image={metal.image}
            details={() => openDetailsModal(metal)}
          />
        ))}
      </SimpleGrid>
      {selectedMetal && (
        <MetalDetails
          isOpen={isModalOpen}
          onClose={closeDetailsModal}
          metal={selectedMetal}
        />
      )}
    </Box>
  );
}
