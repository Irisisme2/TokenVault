import React, { useState } from 'react';
import { Box, Text, Flex, Input, Select, Table, Thead, Tbody, Tr, Th, Td, useDisclosure, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react';
import Card from 'components/card/Card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// Example Data in USD
const data = [
  { name: 'Property 1', category: 'Real Estate', quantity: '1', currentValueUSD: 100000, totalValueUSD: 100000, lastUpdated: '2024-07-31' },
  { name: 'Property 2', category: 'Real Estate', quantity: '2', currentValueUSD: 200000, totalValueUSD: 200000, lastUpdated: '2024-07-30' },
  { name: 'Van Gogh Painting', category: 'Art', quantity: '1', currentValueUSD: 5000000, totalValueUSD: 5000000, lastUpdated: '2024-07-29' },
  { name: 'Gold Bar', category: 'Precious Metals', quantity: '10', currentValueUSD: 200000, totalValueUSD: 200000, lastUpdated: '2024-07-28' },
  { name: 'Silver Coin', category: 'Precious Metals', quantity: '50', currentValueUSD: 50000, totalValueUSD: 50000, lastUpdated: '2024-07-27' }
];

// Conversion rate from USD to BTC (example rate, e.g., 1 BTC = $30,000)
const USD_TO_BTC = 30000;

// Sample data for historical performance line chart
const chartData = [
  { date: '2024-01-01', realEstateBTC: 16.67, artBTC: 66.67, preciousMetalsBTC: 5 },
  { date: '2024-02-01', realEstateBTC: 17, artBTC: 68.33, preciousMetalsBTC: 5.17 },
  { date: '2024-03-01', realEstateBTC: 17.33, artBTC: 70, preciousMetalsBTC: 5.33 },
  { date: '2024-04-01', realEstateBTC: 17.67, artBTC: 73.33, preciousMetalsBTC: 5.5 },
  { date: '2024-05-01', realEstateBTC: 18, artBTC: 76.67, preciousMetalsBTC: 5.67 },
];

// Sample transaction history
const transactionHistory = [
  { date: '2024-07-30', type: 'Buy', amount: 1, status: 'Completed' },
  { date: '2024-07-31', type: 'Sell', amount: 1, status: 'Completed' },
  { date: '2024-07-28', type: 'Transfer', amount: 1, status: 'Pending' },
];

// Sample value information
const valueInfo = {
  'Property 1': { currentPriceBTC: (100000 / USD_TO_BTC).toFixed(8), historicalPricesBTC: [(95000 / USD_TO_BTC).toFixed(8), (100000 / USD_TO_BTC).toFixed(8), (105000 / USD_TO_BTC).toFixed(8)], priceChangePercentage: 5 },
  'Van Gogh Painting': { currentPriceBTC: (5000000 / USD_TO_BTC).toFixed(8), historicalPricesBTC: [(4900000 / USD_TO_BTC).toFixed(8), (5000000 / USD_TO_BTC).toFixed(8), (5100000 / USD_TO_BTC).toFixed(8)], priceChangePercentage: 2 },
};

const TokenizedAssetsTable = () => {
  const [filterCategory, setFilterCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAsset, setSelectedAsset] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Filter and search logic
  const filteredData = data.filter(item => 
    (filterCategory === '' || item.category === filterCategory) &&
    (searchTerm === '' || item.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleRowClick = (asset) => {
    setSelectedAsset(asset);
    onOpen();
  };

  const renderValueInfo = () => {
    if (!selectedAsset) return null;
    const info = valueInfo[selectedAsset.name];
    if (!info) return null;

    return (
      <Box mb="20px">
        <Text fontSize="lg" fontWeight="bold">Value Information</Text>
        <Text>Current Price: {info.currentPriceBTC} BTC</Text>
        <Text>
          Historical Prices: {info.historicalPricesBTC.map((price, index) => (
            <span key={index}>
              {price} BTC {index < info.historicalPricesBTC.length - 1 && ', '}
            </span>
          ))}
        </Text>
        <Text>Price Change Percentage: {info.priceChangePercentage}%</Text>
      </Box>
    );
  };

  const renderTransactionHistory = () => (
    <Box mb="20px">
      <Text fontSize="lg" fontWeight="bold" mb="10px">Transaction History</Text>
      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>Date</Th>
            <Th>Type</Th>
            <Th>Amount</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {transactionHistory.map((transaction, index) => (
            <Tr key={index}>
              <Td>{transaction.date}</Td>
              <Td>{transaction.type}</Td>
              <Td>{transaction.amount}</Td>
              <Td>{transaction.status}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );

  const renderAssetData = () => (
    <Box mb="20px">
      <Text fontSize="lg" fontWeight="bold" mb="10px">Asset Data</Text>
      <Text>Ownership Details: Sample details...</Text>
      <Text>Historical Performance: Refer to the chart below.</Text>
      <Text>Associated Metadata: Sample metadata...</Text>
    </Box>
  );

  return (
    <Card>
      <Box p="20px">
        <Text fontSize="lg" fontWeight="bold" mb="10px">Tokenized Assets</Text>
        <Flex mb="10px" align="center" justify="space-between">
          <Input
            placeholder="Search..."
            width="250px"
            mb="10px"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select
            placeholder="Filter by Category"
            width="250px"
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="Real Estate">Real Estate</option>
            <option value="Art">Art</option>
            <option value="Precious Metals">Precious Metals</option>
          </Select>
        </Flex>
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Category</Th>
              <Th>Quantity</Th>
              <Th>Current Value (BTC)</Th>
              <Th>Total Value (BTC)</Th>
              <Th>Last Updated</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredData.map((item, index) => (
              <Tr key={index} onClick={() => handleRowClick(item)} _hover={{ cursor: 'pointer' }}>
                <Td>{item.name}</Td>
                <Td>{item.category}</Td>
                <Td>{item.quantity}</Td>
                <Td>{(item.currentValueUSD / USD_TO_BTC).toFixed(8)} BTC</Td>
                <Td>{(item.totalValueUSD / USD_TO_BTC).toFixed(8)} BTC</Td>
                <Td>{item.lastUpdated}</Td>
                <Td><Button colorScheme="blue" onClick={() => handleRowClick(item)}>View Details</Button></Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        {/* Modal for displaying historical performance */}
        <Modal isOpen={isOpen} onClose={onClose} size="full">
          <ModalOverlay />
          <ModalContent maxWidth="1200px">
            <ModalHeader>Asset Details</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text fontSize="lg" fontWeight="bold" mb="10px">{selectedAsset?.name}</Text>
              <Text mb="10px">Category: {selectedAsset?.category}</Text>
              <Text mb="10px">Quantity: {selectedAsset?.quantity}</Text>
              <Text mb="10px">Current Value: {(selectedAsset?.currentValueUSD / USD_TO_BTC).toFixed(8)} BTC</Text>
              <Text mb="10px">Total Value: {(selectedAsset?.totalValueUSD / USD_TO_BTC).toFixed(8)} BTC</Text>
              <Text mb="10px">Last Updated: {selectedAsset?.lastUpdated}</Text>

              {renderValueInfo()}
              {renderTransactionHistory()}
              {renderAssetData()}

              <LineChart width={1000} height={500} data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="realEstateBTC" stroke="#4CAF50" />
                <Line type="monotone" dataKey="artBTC" stroke="#2196F3" />
                <Line type="monotone" dataKey="preciousMetalsBTC" stroke="#00BCD4" />
              </LineChart>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Card>
  );
};

export default TokenizedAssetsTable;
