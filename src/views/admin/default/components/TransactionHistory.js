import React, { useState } from 'react';
import {
  Box,
  Text,
  Flex,
  Input,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  HStack,
  Divider,
} from '@chakra-ui/react';
import Card from 'components/card/Card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// Example Data for Transactions
const transactions = [
  { id: 'T001', date: '2024-07-30', assetName: 'Property 1', amount: 1, type: 'Buy', status: 'Completed', amountUSD: 100000 },
  { id: 'T002', date: '2024-07-31', assetName: 'Van Gogh Painting', amount: 1, type: 'Sell', status: 'Completed', amountUSD: 5000000 },
  { id: 'T003', date: '2024-07-28', assetName: 'Gold Bar', amount: 10, type: 'Transfer', status: 'Pending', amountUSD: 200000 },
  { id: 'T004', date: '2024-07-25', assetName: 'Silver Coin', amount: 50, type: 'Buy', status: 'Cancelled', amountUSD: 50000 },
];

// Filters
const filterOptions = {
  types: ['Buy', 'Sell', 'Transfer'],
  statuses: ['Pending', 'Completed', 'Cancelled'],
};

// Sample data for transaction status breakdown chart
const statusData = [
  { name: 'Pending', count: 1 },
  { name: 'Completed', count: 2 },
  { name: 'Cancelled', count: 1 },
];

const TransactionHistory = () => {
  const [selectedType, setSelectedType] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [filteredTransactions, setFilteredTransactions] = useState(transactions);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Filter transactions based on selected filters
  const applyFilters = () => {
    const filtered = transactions.filter(tx =>
      (selectedType === '' || tx.type === selectedType) &&
      (selectedStatus === '' || tx.status === selectedStatus) &&
      (dateRange.start === '' || new Date(tx.date) >= new Date(dateRange.start)) &&
      (dateRange.end === '' || new Date(tx.date) <= new Date(dateRange.end))
    );
    setFilteredTransactions(filtered);
  };

  const handleRowClick = (transaction) => {
    setSelectedTransaction(transaction);
    onOpen();
  };

  return (
    <Card>
      <Box p="20px">
        <Text fontSize="lg" fontWeight="bold" mb="10px">Transaction History</Text>
        <Flex mb="10px" direction="column" gap="10px">
          <HStack spacing="10px">
            <Input
              type="date"
              placeholder="Start Date"
              onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
            />
            <Input
              type="date"
              placeholder="End Date"
              onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
            />
          </HStack>
          <HStack spacing="10px">
            <Select placeholder="Filter by Type" onChange={(e) => setSelectedType(e.target.value)}>
              {filterOptions.types.map(type => <option key={type} value={type}>{type}</option>)}
            </Select>
            <Select placeholder="Filter by Status" onChange={(e) => setSelectedStatus(e.target.value)}>
              {filterOptions.statuses.map(status => <option key={status} value={status}>{status}</option>)}
            </Select>
          </HStack>
          <Button colorScheme="blue" onClick={applyFilters}>Apply Filters</Button>
        </Flex>
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>Transaction ID</Th>
              <Th>Date</Th>
              <Th>Tokenized Asset Name</Th>
              <Th>Amount</Th>
              <Th>Type</Th>
              <Th>Status</Th>
              <Th>Amount in USD</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredTransactions.map((tx, index) => (
              <Tr key={index} onClick={() => handleRowClick(tx)} _hover={{ cursor: 'pointer' }}>
                <Td>{tx.id}</Td>
                <Td>{tx.date}</Td>
                <Td>{tx.assetName}</Td>
                <Td>{tx.amount}</Td>
                <Td>{tx.type}</Td>
                <Td>{tx.status}</Td>
                <Td>${tx.amountUSD.toLocaleString()}</Td>
                <Td><Button colorScheme="blue" onClick={() => handleRowClick(tx)}>View Details</Button></Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        <Divider my="20px" />

        {/* Status Breakdown Chart */}
        <Text fontSize="lg" fontWeight="bold" mb="10px">Transaction Status Breakdown</Text>
        <BarChart width={600} height={300} data={statusData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>

        {/* Modal for displaying transaction details */}
        <Modal isOpen={isOpen} onClose={onClose} size="full">
          <ModalOverlay />
          <ModalContent maxWidth="1200px">
            <ModalHeader>Transaction Details</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text fontSize="lg" fontWeight="bold" mb="10px">Transaction ID: {selectedTransaction?.id}</Text>
              <Text mb="10px">Date: {selectedTransaction?.date}</Text>
              <Text mb="10px">Tokenized Asset Name: {selectedTransaction?.assetName}</Text>
              <Text mb="10px">Amount: {selectedTransaction?.amount}</Text>
              <Text mb="10px">Type: {selectedTransaction?.type}</Text>
              <Text mb="10px">Status: {selectedTransaction?.status}</Text>
              <Text mb="10px">Amount in USD: ${selectedTransaction?.amountUSD.toLocaleString()}</Text>
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

export default TransactionHistory;
