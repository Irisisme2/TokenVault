import React from "react";
import {
  Box,
  Text,
  Stack,
  Flex,
  Card,
  VStack,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  useColorModeValue,
  Tooltip,
} from "@chakra-ui/react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from "recharts";
import { FaDollarSign, FaList, FaCheckCircle, FaTimesCircle, FaSpinner } from 'react-icons/fa';

// Sample data
const transactionData = [
  { status: "Pending", count: 10, color: "#FFA500", icon: FaSpinner },
  { status: "Completed", count: 45, color: "#4CAF50", icon: FaCheckCircle },
  { status: "Cancelled", count: 5, color: "#F44336", icon: FaTimesCircle },
];

const totalTransactions = transactionData.reduce((acc, curr) => acc + curr.count, 0);
const totalValue = 100000; // Sample total value

const TransactionSummary = () => {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const cardBgColor = useColorModeValue("white", "gray.700");
  const cardShadow = useColorModeValue("md", "dark-lg");

  return (
    <Box pt={{ base: "180px", md: "80px", xl: "80px" }} px={{ base: "20px", md: "40px" }}>
      <Stack spacing={8}>
        {/* Total Transactions */}
        <Card bg={cardBgColor} boxShadow={cardShadow} p={5} borderRadius="md">
          <Flex align="center" justify="space-between">
            <Stat>
              <StatLabel>Total Transactions</StatLabel>
              <StatNumber fontSize="2xl">{totalTransactions}</StatNumber>
            </Stat>
            <Tooltip label="Total number of transactions" fontSize="md">
              <FaList size={30} color={textColor} />
            </Tooltip>
          </Flex>
        </Card>

        {/* Total Value */}
        <Card bg={cardBgColor} boxShadow={cardShadow} p={5} borderRadius="md">
          <Flex align="center" justify="space-between">
            <Stat>
              <StatLabel>Total Value</StatLabel>
              <StatNumber fontSize="2xl">${totalValue.toLocaleString()}</StatNumber>
            </Stat>
            <Tooltip label="Total monetary value of all transactions" fontSize="md">
              <FaDollarSign size={30} color={textColor} />
            </Tooltip>
          </Flex>
        </Card>

        {/* Transaction Statuses */}
        <Card bg={cardBgColor} boxShadow={cardShadow} p={5} borderRadius="md">
          <VStack spacing={4} align="stretch">
            <Text fontSize="xl" fontWeight="bold">Transaction Statuses</Text>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={transactionData}
                  dataKey="count"
                  nameKey="status"
                  cx="50%"
                  cy="50%"
                  outerRadius="80%"
                  fill="#8884d8"
                  paddingAngle={5}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {transactionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip />
              </PieChart>
            </ResponsiveContainer>
            <Flex justify="space-between">
              {transactionData.map((entry, index) => (
                <Box key={index} d="flex" alignItems="center">
                  <Box bg={entry.color} p={2} borderRadius="full" mr={2} />
                  <Text fontSize="sm" fontWeight="bold">{entry.status}</Text>
                </Box>
              ))}
            </Flex>
          </VStack>
        </Card>
      </Stack>
    </Box>
  );
};

export default TransactionSummary;

