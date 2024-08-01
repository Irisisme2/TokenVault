import React from 'react';
import { Box, Card, CardBody, CardHeader, Flex, Text, useColorModeValue, Divider } from '@chakra-ui/react';
import { BarChart, Bar, PieChart, Pie, LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Sample data for charts
const transactionTypes = [
  { type: 'Buy', count: 150 },
  { type: 'Sell', count: 120 },
  { type: 'Transfer', count: 90 }
];

const transactionStatuses = [
  { status: 'Pending', count: 50 },
  { status: 'Completed', count: 300 },
  { status: 'Canceled', count: 20 }
];

const transactionValuesOverTime = [
  { date: '2024-01-01', value: 20000 },
  { date: '2024-02-01', value: 25000 },
  { date: '2024-03-01', value: 15000 },
  { date: '2024-04-01', value: 30000 },
  { date: '2024-05-01', value: 40000 },
];

const TransactionCharts = () => {
  const cardBgColor = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const chartColor = useColorModeValue('#4FD1C5', '#2B6CB0');
  
  return (
    <Box pt={{ base: '180px', md: '80px', xl: '80px' }} px={{ base: '20px', md: '40px' }}>
      <Text mb="20px" color={textColor} fontSize="2xl" fontWeight="700">
        Transaction Statistics
      </Text>
      
      <Flex direction={{ base: 'column', md: 'row' }} gap="20px" mb="20px">
        <Card bg={cardBgColor} boxShadow="md" borderRadius="md" flex="1" p="4">
          <CardHeader>
            <Text fontSize="lg" fontWeight="bold" color={textColor}>Transaction Types</Text>
          </CardHeader>
          <Divider />
          <CardBody>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={transactionTypes}>
                <XAxis dataKey="type" tick={{ fontSize: 12, fill: textColor }} />
                <YAxis tick={{ fontSize: 12, fill: textColor }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill={chartColor} />
              </BarChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>

        <Card bg={cardBgColor} boxShadow="md" borderRadius="md" flex="1" p="4">
          <CardHeader>
            <Text fontSize="lg" fontWeight="bold" color={textColor}>Transaction Statuses</Text>
          </CardHeader>
          <Divider />
          <CardBody>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={transactionStatuses}
                  dataKey="count"
                  nameKey="status"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill={chartColor}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                />
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>
      </Flex>
      
      <Card bg={cardBgColor} boxShadow="md" borderRadius="md">
        <CardHeader>
          <Text fontSize="lg" fontWeight="bold" color={textColor}>Transaction Values Over Time</Text>
        </CardHeader>
        <Divider />
        <CardBody>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={transactionValuesOverTime}>
              <XAxis dataKey="date" tick={{ fontSize: 12, fill: textColor }} />
              <YAxis tick={{ fontSize: 12, fill: textColor }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke={chartColor} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardBody>
      </Card>
    </Box>
  );
};

export default TransactionCharts;
