import React, { useState } from "react";
import { Box, Button, SimpleGrid, Text, useColorModeValue } from "@chakra-ui/react";
import RealEstate from "components/card/RealEstate";
import Property1 from "assets/img/properties/Property1.png";
import Property2 from "assets/img/properties/Property2.png";
import Property3 from "assets/img/properties/Property3.png";
import Avatar1 from "assets/img/avatars/avatar1.png";
import Avatar2 from "assets/img/avatars/avatar2.png";
import Avatar3 from "assets/img/avatars/avatar3.png";
import Avatar4 from "assets/img/avatars/avatar4.png";
import PropertyDetails from "views/admin/RealEstate/components/PropertyDetails";

const propertiesData = [
  {
    name: 'Modern Villa',
    author: 'By John Doe',
    image: Property1,
    location: 'Beverly Hills, CA',
    description: 'A modern villa with stunning views.',
    value: 1500000,
  },
  {
    name: 'Luxury Penthouse',
    author: 'By Jane Smith',
    image: Property2,
    location: 'New York, NY',
    description: 'A luxurious penthouse in the heart of the city.',
    value: 2300000,
  },
  {
    name: 'Beachfront Property',
    author: 'By Michael Lee',
    image: Property3,
    location: 'Miami, FL',
    description: 'A beachfront property with private access.',
    value: 3200000,
  },
];

export default function MyProperties() {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const textColor = useColorModeValue("secondaryGray.900", "white");

  const openDetailsModal = (property) => {
    setSelectedProperty(property);
    setIsModalOpen(true);
  };

  const closeDetailsModal = () => {
    setSelectedProperty(null);
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
        My Properties
      </Text>
      <SimpleGrid columns={{ base: 1, md: 3 }} gap='20px'>
        {propertiesData.map((property, index) => (
          <RealEstate
            key={index}
            name={property.name}
            author={property.author}
            bidders={[Avatar1, Avatar2, Avatar3, Avatar4]}
            image={property.image}
            details={() => openDetailsModal(property)}
          />
        ))}
      </SimpleGrid>
      {selectedProperty && (
        <PropertyDetails
          isOpen={isModalOpen}
          onClose={closeDetailsModal}
          property={selectedProperty}
        />
      )}
    </Box>
  );
}
