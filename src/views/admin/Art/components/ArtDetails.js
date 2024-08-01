import React, { useState } from "react";
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
  Select,
  useToast,
} from "@chakra-ui/react";
import { Line } from 'react-chartjs-2'; // Line chart component
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Title } from 'chart.js';

// Register necessary components for the chart
ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title);

// Sample transaction history
const sampleTransactionHistory = [
  { date: '2023-01-01', price: 1000000, status: 'Sold' },
  { date: '2023-06-15', price: 1500000, status: 'Sold' },
  { date: '2024-01-20', price: 2000000, status: 'For Sale' },
];

// Exchange rates for cryptocurrencies
const exchangeRates = {
  BTC: 0.000034,
  ETH: 0.00045,
  USDT: 1,
  BNB: 0.003,
  ADA: 1.5,
  DOT: 0.04,
};

const ArtDetails = ({ isOpen, onClose, art }) => {
  const [selectedCurrency, setSelectedCurrency] = useState('USDT');
  const [artDetails, setArtDetails] = useState({
    notes: '',
    reminders: '',
  });
  const toast = useToast();

  const handleNoteChange = (e) => {
    setArtDetails({ ...artDetails, notes: e.target.value });
  };

  const handleReminderChange = (e) => {
    setArtDetails({ ...artDetails, reminders: e.target.value });
  };

  const handleSaveChanges = () => {
    toast({
      title: 'Changes Saved.',
      description: 'Your changes have been saved successfully.',
      status: 'success',
      duration: 9000,
      isClosable: true,
    });
    // Add logic to save changes
  };

  // Prepare chart data
  const chartData = {
    labels: sampleTransactionHistory.map((item) => item.date),
    datasets: [
      {
        label: 'Value Over Time',
        data: sampleTransactionHistory.map((item) => item.price),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };

  // Calculate the value in the selected cryptocurrency
  const valueInSelectedCurrency = art.value * (exchangeRates[selectedCurrency] || 1);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{art.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Tabs isFitted variant="enclosed">
            <TabList>
              <Tab>Basic Information</Tab>
              <Tab>Value and History</Tab>
              <Tab>Documentation</Tab>
              <Tab>Options</Tab>
              <Tab>Marketplace Listing</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Stack spacing={6}>
                  <Image
                    src={art.image}
                    alt={art.name}
                    boxSize="100%"
                    maxHeight="500px"
                    objectFit="cover"
                    borderRadius="md"
                    boxShadow="lg"
                  />
                  <Text fontSize="2xl" fontWeight="bold" mb={4}>{art.name}</Text>
                  <Text fontSize="lg" fontWeight="bold">Artist:</Text>
                  <Text mb={4}>{art.artist}</Text>
                  <Text fontSize="lg" fontWeight="bold">Description:</Text>
                  <Text mb={4}>{art.description}</Text>
                </Stack>
              </TabPanel>
              <TabPanel>
                <Stack spacing={6}>
                  <Text fontSize="xl" fontWeight="bold">Value Chart</Text>
                  <Box>
                    <Line data={chartData} />
                  </Box>
                  <Text fontSize="xl" fontWeight="bold" mt={4}>Transaction History</Text>
                  <Box overflowX="auto">
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr>
                          <th style={{ borderBottom: '1px solid black', padding: '8px' }}>Date</th>
                          <th style={{ borderBottom: '1px solid black', padding: '8px' }}>Price</th>
                          <th style={{ borderBottom: '1px solid black', padding: '8px' }}>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sampleTransactionHistory.map((transaction, index) => (
                          <tr key={index}>
                            <td style={{ borderBottom: '1px solid gray', padding: '8px' }}>{transaction.date}</td>
                            <td style={{ borderBottom: '1px solid gray', padding: '8px' }}>${transaction.price.toLocaleString()}</td>
                            <td style={{ borderBottom: '1px solid gray', padding: '8px' }}>{transaction.status}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </Box>
                </Stack>
              </TabPanel>
              <TabPanel>
                <Stack spacing={6}>
                  <Text fontSize="xl" fontWeight="bold">Authenticity Certificates</Text>
                  <Text mb={4}>Documents confirming the authenticity of the artwork.</Text>
                  <Text fontSize="xl" fontWeight="bold">Provenance Documents</Text>
                  <Text mb={4}>Documents regarding the artwork's provenance history.</Text>
                  <Text fontSize="xl" fontWeight="bold">Additional Images</Text>
                  <Image src={art.image} alt={art.name} borderRadius="md" boxShadow="lg" />
                </Stack>
              </TabPanel>
              <TabPanel>
                <Stack spacing={6}>
                  <Text fontSize="xl" fontWeight="bold">Edit Details</Text>
                  <FormControl id="notes" mt={4}>
                    <FormLabel>Notes</FormLabel>
                    <Textarea
                      value={artDetails.notes}
                      onChange={handleNoteChange}
                      placeholder="Add notes about the artwork"
                    />
                  </FormControl>
                  <FormControl id="reminders" mt={4}>
                    <FormLabel>Reminders</FormLabel>
                    <Input
                      value={artDetails.reminders}
                      onChange={handleReminderChange}
                      placeholder="Set reminders for this artwork"
                    />
                  </FormControl>
                  <FormControl id="currency" mt={4}>
                    <FormLabel>Choose Cryptocurrency</FormLabel>
                    <Select
                      value={selectedCurrency}
                      onChange={(e) => setSelectedCurrency(e.target.value)}
                    >
                      <option value="BTC">Bitcoin (BTC)</option>
                      <option value="ETH">Ethereum (ETH)</option>
                      <option value="USDT">Tether (USDT)</option>
                      <option value="BNB">Binance Coin (BNB)</option>
                      <option value="ADA">Cardano (ADA)</option>
                      <option value="DOT">Polkadot (DOT)</option>
                    </Select>
                  </FormControl>
                  <Text fontSize="lg" mt={4}>
                    Current Value in {selectedCurrency}: {valueInSelectedCurrency.toFixed(4)}
                  </Text>
                  <Button colorScheme="blue" mt={4} onClick={handleSaveChanges}>
                    Save Changes
                  </Button>
                </Stack>
              </TabPanel>
              <TabPanel>
                <Stack spacing={6}>
                  <Text fontSize="xl" fontWeight="bold">List on Marketplace</Text>
                  <FormControl id="price" mt={4}>
                    <FormLabel>Price in Selected Currency</FormLabel>
                    <Input
                      value={valueInSelectedCurrency.toFixed(4)}
                      isReadOnly
                      placeholder="Price in selected cryptocurrency"
                    />
                  </FormControl>
                  <FormControl id="listingDescription" mt={4}>
                    <FormLabel>Listing Description</FormLabel>
                    <Textarea
                      placeholder="Provide a description for the marketplace listing"
                    />
                  </FormControl>
                  <Button colorScheme="teal" mt={4}>
                    List on Marketplace
                  </Button>
                </Stack>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ArtDetails;
