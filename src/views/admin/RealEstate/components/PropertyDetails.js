import React, { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  Text,
  Stack,
  Input,
  Textarea,
  FormControl,
  FormLabel,
  useToast,
  Select,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

// Assets
import Btc from 'assets/img/icons/btc.png';
import Eth from 'assets/img/icons/eth.png';
import Usdt from 'assets/img/icons/usdt.png';
import Bnb from 'assets/img/icons/bnb.png';
import Ada from 'assets/img/icons/ada.png';
import Dot from 'assets/img/icons/dot.png';

const exchangeRates = {
  BTC: 0.000034,
  ETH: 0.00045,
  USDT: 1,
  BNB: 0.003,
  ADA: 1.5,
  DOT: 0.04,
};

const cryptoOptions = [
  { value: 'BTC', label: 'Bitcoin', icon: Btc },
  { value: 'ETH', label: 'Ethereum', icon: Eth },
  { value: 'USDT', label: 'Tether', icon: Usdt },
  { value: 'BNB', label: 'Binance Coin', icon: Bnb },
  { value: 'ADA', label: 'Cardano', icon: Ada },
  { value: 'DOT', label: 'Polkadot', icon: Dot },
];

export default function PropertyDetails({ isOpen, onClose, property, onListingCreated }) {
  const [selectedCrypto, setSelectedCrypto] = useState('USDT');
  const [listingDetails, setListingDetails] = useState({
    price: '',
    description: '',
    contactInfo: '',
    priceCrypto: 'USDT',
  });
  const toast = useToast();

  const handleCryptoChange = (value) => {
    setSelectedCrypto(value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setListingDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleListingSubmit = () => {
    // Mock submit function
    toast({
      title: 'Listing Created.',
      description: 'Your property listing has been submitted successfully.',
      status: 'success',
      duration: 9000,
      isClosable: true,
    });

    // Call the callback to pass data to Marketplace
    onListingCreated({
      name: 'New Property', // Update with actual data
      image: 'path_to_image', // Update with actual image
      price: listingDetails.price,
      crypto: listingDetails.priceCrypto,
    });

    setListingDetails({
      price: '',
      description: '',
      contactInfo: '',
      priceCrypto: 'USDT',
    });
    onClose();
  };

  const calculateCryptoValue = (valueInUSD) => {
    return (valueInUSD * exchangeRates[selectedCrypto]).toFixed(6);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Property Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Tabs isFitted variant="enclosed">
            <TabList>
              <Tab>Basic Information</Tab>
              <Tab>Value & History</Tab>
              <Tab>Documentation</Tab>
              <Tab>Options</Tab>
              <Tab>Listing</Tab> {/* New Tab */}
            </TabList>
            <TabPanels>
              <TabPanel>
                <Stack spacing={6}>
                  <Image
                    src={property?.image}
                    alt={property?.name}
                    boxSize="100%" 
                    maxHeight="500px"
                    objectFit="cover"
                    borderRadius="md"
                    boxShadow="lg"
                  />
                  <Text fontSize="2xl" fontWeight="bold" mb={4}>{property?.name}</Text>
                  
                  <Box bg="gray.50" p={4} borderRadius="md" boxShadow="md">
                    <Text fontSize="lg" fontWeight="bold" mb={2}>Overview:</Text>
                    <Text fontSize="md" mb={4}>
                      {property?.description || "No description available."}
                    </Text>
                    
                    <Text fontSize="lg" fontWeight="bold" mb={2}>Key Features:</Text>
                    <Stack spacing={1} pl={4}>
                      <Text fontSize="md">• Spacious layout with modern finishes</Text>
                      <Text fontSize="md">• Located in a prime area with excellent amenities</Text>
                      <Text fontSize="md">• High investment potential with rising property values</Text>
                    </Stack>

                    <Text fontSize="lg" fontWeight="bold" mt={4} mb={2}>Additional Information:</Text>
                    <Text fontSize="md">
                      This property offers a unique opportunity for both investors and homebuyers. With its prime location and modern design, it represents a valuable addition to any real estate portfolio.
                    </Text>
                  </Box>
                </Stack>
              </TabPanel>
              <TabPanel>
                {/* Value & History Tab Content */}
              </TabPanel>
              <TabPanel>
                {/* Documentation Tab Content */}
              </TabPanel>
              <TabPanel>
                {/* Options Tab Content */}
              </TabPanel>
              <TabPanel>
                <Stack spacing={6}>
                  <Text fontSize="xl" fontWeight="bold">Create Listing</Text>
                  
                  <FormControl id="price" isRequired>
                    <FormLabel>Price</FormLabel>
                    <Flex alignItems="center">
                      <Input
                        type="number"
                        name="price"
                        value={listingDetails.price}
                        onChange={handleInputChange}
                        placeholder="Enter the price"
                        mr={4}
                      />
                      <Select
                        name="priceCrypto"
                        value={listingDetails.priceCrypto}
                        onChange={handleInputChange}
                        placeholder="Select cryptocurrency"
                      >
                        {cryptoOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </Select>
                    </Flex>
                  </FormControl>
                  
                  <FormControl id="description" isRequired mt={4}>
                    <FormLabel>Description</FormLabel>
                    <Textarea
                      name="description"
                      value={listingDetails.description}
                      onChange={handleInputChange}
                      placeholder="Enter a detailed description of the property"
                    />
                  </FormControl>
                  
                  <FormControl id="contactInfo" isRequired mt={4}>
                    <FormLabel>Contact Information</FormLabel>
                    <Input
                      type="text"
                      name="contactInfo"
                      value={listingDetails.contactInfo}
                      onChange={handleInputChange}
                      placeholder="Enter your contact information"
                    />
                  </FormControl>

                  <Button colorScheme="blue" mt={4} onClick={handleListingSubmit}>
                    Submit Listing
                  </Button>
                </Stack>
              </TabPanel>
            </TabPanels>
          </Tabs>
          <Flex mt={6} alignItems="center">
            <Text fontSize="xl" fontWeight="bold" mr={4}>Value in Selected Crypto:</Text>
            <Select
              value={selectedCrypto}
              onChange={(e) => handleCryptoChange(e.target.value)}
            >
              {cryptoOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </Flex>
          <Text fontSize="lg" mt={4}>
            {`Value in ${cryptoOptions.find(option => option.value === selectedCrypto)?.label}: ${calculateCryptoValue(property?.value)} ${selectedCrypto}`}
          </Text>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
