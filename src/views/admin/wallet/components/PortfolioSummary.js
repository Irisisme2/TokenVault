import React, { useState } from 'react';
import { Box, Text, SimpleGrid, Select, Image, Flex, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import Card from 'components/card/Card'; // Import Card component
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import Btc from 'assets/img/icons/btc.png'; // Bitcoin icon
import Eth from 'assets/img/icons/eth.png'; // Ethereum icon
import Usdt from 'assets/img/icons/usdt.png'; // Tether icon
import Bnb from 'assets/img/icons/bnb.png'; // Binance Coin icon
import Ada from 'assets/img/icons/ada.png'; // Cardano icon
import Dot from 'assets/img/icons/dot.png'; // Polkadot icon

const exchangeRates = {
  BTC: 0.000034, // Example rate: 1 USD = 0.000034 BTC
  ETH: 0.00045,  // Example rate: 1 USD = 0.00045 ETH
  USDT: 1,       // Example rate: 1 USD = 1 USDT
  BNB: 0.003,    // Example rate: 1 USD = 0.003 BNB
  ADA: 1.5,      // Example rate: 1 USD = 1.5 ADA
  DOT: 0.04      // Example rate: 1 USD = 0.04 DOT
};

// Example data
const totalPortfolioValue = 1000000; // Example total portfolio value in USD

const allocationData = [
  { name: 'Real Estate', value: 500000 },
  { name: 'Art', value: 300000 },
  { name: 'Precious Metals', value: 200000 },
];

const assetDetails = [
  { name: 'Real Estate', value: 500000, percentage: 50 },
  { name: 'Art', value: 300000, percentage: 30 },
  { name: 'Precious Metals', value: 200000, percentage: 20 },
];

const COLORS = ['#4CAF50', '#2196F3', '#FFC107']; // Green, Blue, Amber

const icons = {
  BTC: Btc,
  ETH: Eth,
  USDT: Usdt,
  BNB: Bnb,
  ADA: Ada,
  DOT: Dot
};

const PortfolioSummary = () => {
  const [selectedToken, setSelectedToken] = useState('USD');
  const [tokenIcon, setTokenIcon] = useState(null);

  const handleTokenChange = (event) => {
    const token = event.target.value;
    setSelectedToken(token);
    setTokenIcon(icons[token]);
  };

  const getTokenValue = (valueInUSD) => {
    if (selectedToken === 'USD') return valueInUSD;
    return valueInUSD * exchangeRates[selectedToken];
  };

  return (
    <Card>
      <Box p="20px">
        <Text fontSize="2xl" fontWeight="bold" mb="10px">
          Portfolio Summary
        </Text>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing="20px">
          {/* Total Portfolio Value */}
          <Box>
            <Text fontSize="lg" fontWeight="bold" mb="10px">
              Portfolio Value
            </Text>
            <Flex align="center">
              {tokenIcon && <Image src={tokenIcon} alt={selectedToken} boxSize="30px" mr="10px" />}
              <Text fontSize="3xl" fontWeight="bold">
                {getTokenValue(totalPortfolioValue).toLocaleString()} {selectedToken}
              </Text>
            </Flex>
            <Select mt="10px" value={selectedToken} onChange={handleTokenChange}>
              <option value="USD">USD</option>
              <option value="BTC">BTC</option>
              <option value="ETH">ETH</option>
              <option value="USDT">USDT</option>
              <option value="BNB">BNB</option>
              <option value="ADA">ADA</option>
              <option value="DOT">DOT</option>
            </Select>
          </Box>
          {/* Asset Allocation */}
          <Box>
            <Text fontSize="lg" fontWeight="bold" mb="10px">
              Asset Allocation
            </Text>
            <PieChart width={200} height={200}>
              <Pie
                data={allocationData}
                dataKey="value"
                nameKey="name"
                outerRadius={80}
                label={({ name, value }) => `${name}: ${(value / totalPortfolioValue * 100).toFixed(2)}%`}
              >
                {allocationData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </Box>
        </SimpleGrid>
        {/* Detailed Asset Information */}
        <Box mt="20px">
          <Text fontSize="lg" fontWeight="bold" mb="10px">
            Detailed Asset Information
          </Text>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Asset Name</Th>
                <Th>Value ({selectedToken})</Th>
                <Th>Percentage Share</Th>
              </Tr>
            </Thead>
            <Tbody>
              {assetDetails.map((asset, index) => (
                <Tr key={index}>
                  <Td>{asset.name}</Td>
                  <Td>{getTokenValue(asset.value).toLocaleString()}</Td>
                  <Td>{asset.percentage}%</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Box>
    </Card>
  );
};

export default PortfolioSummary;
