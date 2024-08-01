import React, { useState } from "react";
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Select,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";

// Sample data
const transactions = [
  {
    id: "TX001",
    date: "2024-08-01",
    asset: "Bitcoin",
    quantity: 0.5,
    type: "Buy",
    status: "Completed",
    value: { BTC: 0.5, ETH: 6.8, USDT: 5000, BNB: 12.5, ADA: 750, DOT: 20 },
  },
  {
    id: "TX002",
    date: "2024-08-02",
    asset: "Ethereum",
    quantity: 2,
    type: "Sell",
    status: "Pending",
    value: { BTC: 0.03, ETH: 2, USDT: 2000, BNB: 1.5, ADA: 150, DOT: 4 },
  },
  {
    id: "TX003",
    date: "2024-08-03",
    asset: "Binance Coin",
    quantity: 10,
    type: "Transfer",
    status: "Cancelled",
    value: { BTC: 0.005, ETH: 0.07, USDT: 70, BNB: 10, ADA: 15, DOT: 1.5 },
  },
  // More transactions...
];

const TransactionTable = () => {
  const [selectedCrypto, setSelectedCrypto] = useState("USDT");
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const cardBgColor = useColorModeValue("white", "gray.700");
  const cardShadow = useColorModeValue("md", "dark-lg");

  return (
    <Box pt={{ base: "180px", md: "80px", xl: "80px" }} px={{ base: "20px", md: "40px" }}>
      <Text mb="20px" color={textColor} fontSize="2xl" fontWeight="700">
        Transaction Table
      </Text>
      <Card bg={cardBgColor} boxShadow={cardShadow} borderRadius="md">
        <CardHeader>
          <Flex justify="space-between" align="center">
            <Text fontSize="xl" fontWeight="bold">Transaction Records</Text>
            <Select
              placeholder="Select Cryptocurrency"
              value={selectedCrypto}
              onChange={(e) => setSelectedCrypto(e.target.value)}
            >
              <option value="BTC">Bitcoin (BTC)</option>
              <option value="ETH">Ethereum (ETH)</option>
              <option value="USDT">Tether (USDT)</option>
              <option value="BNB">Binance Coin (BNB)</option>
              <option value="ADA">Cardano (ADA)</option>
              <option value="DOT">Polkadot (DOT)</option>
            </Select>
          </Flex>
        </CardHeader>
        <CardBody>
          <VStack spacing={4} align="stretch">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Date</Th>
                  <Th>Asset</Th>
                  <Th>Quantity</Th>
                  <Th>Type</Th>
                  <Th>Status</Th>
                  <Th>Value ({selectedCrypto})</Th>
                </Tr>
              </Thead>
              <Tbody>
                {transactions.map((transaction) => (
                  <Tr key={transaction.id}>
                    <Td>{transaction.id}</Td>
                    <Td>{transaction.date}</Td>
                    <Td>{transaction.asset}</Td>
                    <Td>{transaction.quantity}</Td>
                    <Td>{transaction.type}</Td>
                    <Td>{transaction.status}</Td>
                    <Td>{transaction.value[selectedCrypto].toLocaleString()}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </VStack>
        </CardBody>
      </Card>
    </Box>
  );
};

export default TransactionTable;
