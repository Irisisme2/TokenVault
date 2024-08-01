import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine } from 'recharts';
import { Box, Text, Select, HStack, Image, Button, Stack, useBreakpointValue } from '@chakra-ui/react';
import Card from 'components/card/Card'; // Import your Card component
import { saveAs } from 'file-saver'; // For exporting the chart data
import DatePicker from 'react-datepicker'; // Import react-datepicker

// Import cryptocurrency icons
import Btc from 'assets/img/icons/btc.png'; // Bitcoin icon
import Eth from 'assets/img/icons/eth.png'; // Ethereum icon
import Usdt from 'assets/img/icons/usdt.png'; // Tether icon
import Bnb from 'assets/img/icons/bnb.png'; // Binance Coin icon
import Ada from 'assets/img/icons/ada.png'; // Cardano icon
import Dot from 'assets/img/icons/dot.png'; // Polkadot icon

// Example data for different cryptocurrencies
const CRYPTO_DATA = {
  BTC: [
    { date: '2024-01-01', value: 50000 },
    { date: '2024-02-01', value: 52000 },
    { date: '2024-03-01', value: 53000 },
    { date: '2024-04-01', value: 55000 },
    { date: '2024-05-01', value: 57000 }
  ],
  ETH: [
    { date: '2024-01-01', value: 3000 },
    { date: '2024-02-01', value: 3100 },
    { date: '2024-03-01', value: 3200 },
    { date: '2024-04-01', value: 3300 },
    { date: '2024-05-01', value: 3400 }
  ],
  USDT: [
    { date: '2024-01-01', value: 1 },
    { date: '2024-02-01', value: 1 },
    { date: '2024-03-01', value: 1 },
    { date: '2024-04-01', value: 1 },
    { date: '2024-05-01', value: 1 }
  ],
  BNB: [
    { date: '2024-01-01', value: 400 },
    { date: '2024-02-01', value: 410 },
    { date: '2024-03-01', value: 420 },
    { date: '2024-04-01', value: 430 },
    { date: '2024-05-01', value: 440 }
  ],
  ADA: [
    { date: '2024-01-01', value: 1.2 },
    { date: '2024-02-01', value: 1.3 },
    { date: '2024-03-01', value: 1.4 },
    { date: '2024-04-01', value: 1.5 },
    { date: '2024-05-01', value: 1.6 }
  ],
  DOT: [
    { date: '2024-01-01', value: 10 },
    { date: '2024-02-01', value: 12 },
    { date: '2024-03-01', value: 14 },
    { date: '2024-04-01', value: 16 },
    { date: '2024-05-01', value: 18 }
  ],
};

const ICONS = {
  BTC: Btc,
  ETH: Eth,
  USDT: Usdt,
  BNB: Bnb,
  ADA: Ada,
  DOT: Dot,
};

const LineChartComponent = () => {
  const [selectedCrypto, setSelectedCrypto] = useState('BTC');
  const [startDate, setStartDate] = useState(new Date('2024-01-01'));
  const [endDate, setEndDate] = useState(new Date('2024-05-01'));

  const handleCryptoChange = (e) => {
    setSelectedCrypto(e.target.value);
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const chartData = CRYPTO_DATA[selectedCrypto].filter(
    (item) => new Date(item.date) >= startDate && new Date(item.date) <= endDate
  );

  const cryptoIcon = ICONS[selectedCrypto];

  // Export function
  const handleExport = () => {
    const blob = new Blob([JSON.stringify(chartData, null, 2)], { type: 'application/json' });
    saveAs(blob, `${selectedCrypto}_historical_data.json`);
  };

  // Responsive width and height based on screen size
  const chartWidth = useBreakpointValue({ base: 300, md: 600 });
  const chartHeight = useBreakpointValue({ base: 200, md: 400 });

  return (
    <Card>
      <Box p="20px">
        <Text fontSize="lg" fontWeight="bold" mb="10px" textAlign="center">
          Historical Portfolio Value
        </Text>
        <Text fontSize="md" mb="20px" textAlign="center">
          View historical value for different cryptocurrencies.
        </Text>

        <HStack spacing="10px" mb="20px" justifyContent="center">
          <Select
            value={selectedCrypto}
            onChange={handleCryptoChange}
            width="200px"
            variant="outline"
          >
            {Object.keys(CRYPTO_DATA).map((crypto) => (
              <option key={crypto} value={crypto}>
                {crypto}
              </option>
            ))}
          </Select>
          <Image src={cryptoIcon} alt={`${selectedCrypto} icon`} boxSize="40px" />
          <Text fontSize="lg" fontWeight="bold">
            {selectedCrypto}
          </Text>
        </HStack>

        <Stack spacing="20px" mb="20px" align="center">
          <HStack spacing="10px">
            <Text>Select Date Range:</Text>
            <DatePicker
              selected={startDate}
              onChange={handleStartDateChange}
              dateFormat="yyyy-MM-dd"
              placeholderText="Start Date"
            />
            <DatePicker
              selected={endDate}
              onChange={handleEndDateChange}
              dateFormat="yyyy-MM-dd"
              placeholderText="End Date"
            />
          </HStack>
          <Button onClick={handleExport} colorScheme="blue">
            Export Data
          </Button>
        </Stack>

        <LineChart
          width={chartWidth}
          height={chartHeight}
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#8884d8"
            dot={{ stroke: '#8884d8', strokeWidth: 2 }}
          />
          <ReferenceLine y={0} stroke="#000" />
        </LineChart>
      </Box>
    </Card>
  );
};

// Custom Tooltip Component
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <Box bg="white" border="1px solid #ddd" borderRadius="4px" p="10px">
        <Text fontWeight="bold">{`Date: ${payload[0].payload.date}`}</Text>
        <Text>{`Value: ${payload[0].value}`}</Text>
      </Box>
    );
  }

  return null;
};

export default LineChartComponent;
