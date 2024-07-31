import React, { useState } from 'react';
import { Box, Text, Button, HStack, Image, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody } from '@chakra-ui/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Card from 'components/card/Card'; // Import your Card component

// Import cryptocurrency icons
import Btc from 'assets/img/icons/btc.png'; // Bitcoin icon
import Eth from 'assets/img/icons/eth.png'; // Ethereum icon
import Usdt from 'assets/img/icons/usdt.png'; // Tether icon
import Bnb from 'assets/img/icons/bnb.png'; // Binance Coin icon
import Ada from 'assets/img/icons/ada.png'; // Cardano icon

// Example data with historical values and corresponding cryptocurrency values
const assets = [
  {
    name: 'NYC Apartment',
    icon: Btc, // Icon for Bitcoin (BTC)
    historicalData: [
      { date: '2024-01-01', value: 0.5 }, // Values in BTC
      { date: '2024-02-01', value: 0.55 },
      { date: '2024-03-01', value: 0.52 },
      { date: '2024-04-01', value: 0.6 },
    ],
  },
  {
    name: 'Van Gogh Painting',
    icon: Eth, // Icon for Ethereum (ETH)
    historicalData: [
      { date: '2024-01-01', value: 0.4 }, // Values in ETH
      { date: '2024-02-01', value: 0.45 },
      { date: '2024-03-01', value: 0.42 },
      { date: '2024-04-01', value: 0.5 },
    ],
  },
  {
    name: 'Gold Bullion',
    icon: Usdt, // Icon for Tether (USDT)
    historicalData: [
      { date: '2024-01-01', value: 2.0 }, // Values in USDT
      { date: '2024-02-01', value: 2.1 },
      { date: '2024-03-01', value: 2.05 },
      { date: '2024-04-01', value: 2.2 },
    ],
  },
  {
    name: 'Classic Car',
    icon: Bnb, // Icon for Binance Coin (BNB)
    historicalData: [
      { date: '2024-01-01', value: 1.2 }, // Values in BNB
      { date: '2024-02-01', value: 1.25 },
      { date: '2024-03-01', value: 1.22 },
      { date: '2024-04-01', value: 1.3 },
    ],
  },
  {
    name: 'Rare Wine Collection',
    icon: Ada, // Icon for Cardano (ADA)
    historicalData: [
      { date: '2024-01-01', value: 0.6 }, // Values in ADA
      { date: '2024-02-01', value: 0.65 },
      { date: '2024-03-01', value: 0.62 },
      { date: '2024-04-01', value: 0.7 },
    ],
  },
];

const TopHoldings = () => {
  const [selectedAsset, setSelectedAsset] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOpenModal = (asset) => {
    setSelectedAsset(asset);
    onOpen();
  };

  return (
    <Box>
      <Text fontSize="2xl" fontWeight="bold" mb="20px">
        Top Holdings
      </Text>

      {assets.map((asset, index) => (
        <Card key={index} mb="20px">
          <Box p="20px">
            <HStack spacing="10px">
              <Image src={asset.icon} alt={`${asset.name} icon`} boxSize="30px" />
              <Text fontSize="lg" fontWeight="bold">
                {asset.name}
              </Text>
            </HStack>
            <Text fontSize="md" color="gray.600" mt="5px">
              Current Value: {asset.historicalData[asset.historicalData.length - 1].value} {asset.name === 'Gold Bullion' ? 'USDT' : asset.name === 'Van Gogh Painting' ? 'ETH' : asset.name === 'NYC Apartment' ? 'BTC' : asset.name === 'Classic Car' ? 'BNB' : 'ADA'}
            </Text>
            <Button
              mt="10px"
              colorScheme="blue"
              onClick={() => handleOpenModal(asset)}
            >
              View Trend
            </Button>
          </Box>
        </Card>
      ))}

      {/* Modal for Line Chart */}
      {selectedAsset && (
        <Modal isOpen={isOpen} onClose={onClose} size="4xl"> {/* Wider modal */}
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{selectedAsset.name} Trend</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <LineChart width={800} height={400} data={selectedAsset.historicalData}> {/* Wider chart */}
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#4CAF50" />
              </LineChart>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};

export default TopHoldings;
