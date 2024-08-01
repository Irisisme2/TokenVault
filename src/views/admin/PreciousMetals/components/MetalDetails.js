import React, { useState } from "react";
import {
  Box,
  Button,
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
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend } from 'chart.js';
import Btc from 'assets/img/icons/btc.png';
import Eth from 'assets/img/icons/eth.png';
import Usdt from 'assets/img/icons/usdt.png';
import Bnb from 'assets/img/icons/bnb.png';
import Ada from 'assets/img/icons/ada.png';
import Dot from 'assets/img/icons/dot.png';

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);

// Example historical data
const historicalData = {
  BTC: [0.000035, 0.000036, 0.000037, 0.000038, 0.000039],
  ETH: [0.0005, 0.00052, 0.00054, 0.00055, 0.00056],
  USDT: [1, 1, 1, 1, 1],
  BNB: [0.0032, 0.0033, 0.0034, 0.0035, 0.0036],
  ADA: [1.6, 1.55, 1.58, 1.57, 1.60],
  DOT: [0.041, 0.042, 0.043, 0.044, 0.045],
};

const cryptoOptions = [
  { value: 'BTC', label: 'Bitcoin (BTC)', image: Btc },
  { value: 'ETH', label: 'Ethereum (ETH)', image: Eth },
  { value: 'USDT', label: 'Tether (USDT)', image: Usdt },
  { value: 'BNB', label: 'Binance Coin (BNB)', image: Bnb },
  { value: 'ADA', label: 'Cardano (ADA)', image: Ada },
  { value: 'DOT', label: 'Polkadot (DOT)', image: Dot },
];

const exchangeRates = {
  BTC: 0.000034,
  ETH: 0.00045,
  USDT: 1,
  BNB: 0.003,
  ADA: 1.5,
  DOT: 0.04,
};

const MetalDetails = ({ isOpen, onClose, metal }) => {
  const [selectedCrypto, setSelectedCrypto] = useState('USD');
  const [metalDetails, setMetalDetails] = useState({
    notes: '',
    reminders: '',
  });
  const toast = useToast();

  const handleNoteChange = (e) => {
    setMetalDetails({ ...metalDetails, notes: e.target.value });
  };

  const handleReminderChange = (e) => {
    setMetalDetails({ ...metalDetails, reminders: e.target.value });
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

  // Example chart data
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: `Value in ${selectedCrypto}`,
        data: historicalData[selectedCrypto],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };

  // Calculate the value in the selected cryptocurrency
  const valueInSelectedCrypto = metal.value * (exchangeRates[selectedCrypto] || 1);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{metal.name}</ModalHeader>
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
                    src={metal.image}
                    alt={metal.name}
                    boxSize="100%"
                    maxHeight="500px"
                    objectFit="cover"
                    borderRadius="md"
                    boxShadow="lg"
                  />
                  <Text fontSize="2xl" fontWeight="bold" mb={4}>{metal.name}</Text>
                  <Text fontSize="lg" fontWeight="bold">Purity:</Text>
                  <Text mb={4}>{metal.purity}</Text>
                  <Text fontSize="lg" fontWeight="bold">Description:</Text>
                  <Text mb={4}>{metal.description}</Text>
                </Stack>
              </TabPanel>
              <TabPanel>
                <Stack spacing={6}>
                  <Text fontSize="xl" fontWeight="bold">Value Chart</Text>
                  <Line data={chartData} />
                  <Text fontSize="xl" fontWeight="bold" mt={4}>Transaction History</Text>
                  {/* Example table for transaction history */}
                </Stack>
              </TabPanel>
              <TabPanel>
                <Stack spacing={6}>
                  <Text fontSize="xl" fontWeight="bold">Authenticity Certificates</Text>
                  <Text mb={4}>Documents confirming the authenticity of the precious metal.</Text>
                  <Text fontSize="xl" fontWeight="bold">Provenance Documents</Text>
                  <Text mb={4}>Documents regarding the metal's provenance history.</Text>
                </Stack>
              </TabPanel>
              <TabPanel>
                <Stack spacing={6}>
                  <Text fontSize="xl" fontWeight="bold">Edit Details</Text>
                  <FormControl id="notes" mt={4}>
                    <FormLabel>Notes</FormLabel>
                    <Textarea
                      value={metalDetails.notes}
                      onChange={handleNoteChange}
                      placeholder="Add notes about the metal"
                    />
                  </FormControl>
                  <FormControl id="reminders" mt={4}>
                    <FormLabel>Reminders</FormLabel>
                    <Input
                      value={metalDetails.reminders}
                      onChange={handleReminderChange}
                      placeholder="Set reminders for this metal"
                    />
                  </FormControl>
                  <FormControl id="crypto" mt={4}>
                    <FormLabel>Choose Cryptocurrency</FormLabel>
                    <Select
                      value={selectedCrypto}
                      onChange={(e) => setSelectedCrypto(e.target.value)}
                    >
                      {cryptoOptions.map((crypto) => (
                        <option key={crypto.value} value={crypto.value}>
                          {crypto.label}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                  <Text fontSize="lg" mt={4}>
                    Current Value in {selectedCrypto}: {valueInSelectedCrypto.toFixed(2)}
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
                    <FormLabel>Price in Selected Cryptocurrency</FormLabel>
                    <Input
                      value={valueInSelectedCrypto.toFixed(2)}
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

export default MetalDetails;
