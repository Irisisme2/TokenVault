import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  Button,
  Stack,
  useColorModeValue,
  Select,
  IconButton,
  InputGroup,
  Input,
  InputRightElement,
  Tooltip,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { DownloadIcon, SearchIcon, InfoIcon } from '@chakra-ui/icons';
import Card from "components/card/Card";
import { saveAs } from 'file-saver'; // For exporting files

// Sample data for performance charts
const performanceData = {
  portfolio: [
    { name: 'Jan', value: 4000000 },
    { name: 'Feb', value: 3000000 },
    { name: 'Mar', value: 2000000 },
    { name: 'Apr', value: 2780000 },
    { name: 'May', value: 1890000 },
    { name: 'Jun', value: 2390000 },
  ],
  assets: [
    { name: 'Jan', value: 2400000 },
    { name: 'Feb', value: 1398000 },
    { name: 'Mar', value: 9800000 },
    { name: 'Apr', value: 3908000 },
    { name: 'May', value: 4800000 },
    { name: 'Jun', value: 3800000 },
  ],
};

// Exchange rates for cryptocurrency conversion
const exchangeRates = {
  BTC: 0.000034,
  ETH: 0.00045,
  USDT: 1,
  BNB: 0.003,
  ADA: 1.5,
  DOT: 0.04,
};

const currencies = Object.keys(exchangeRates);

// Sample report data
const reportData = [
  { metric: 'Total Portfolio Value', value: '$10,000,000' },
  { metric: 'Total Assets Value', value: '$8,500,000' },
  { metric: 'Monthly Gain/Loss', value: '$200,000' },
  { metric: 'Top Performing Asset', value: 'Starry Night' },
];

const PerformanceReports = () => {
  const [chartType, setChartType] = useState('portfolio');
  const [currency, setCurrency] = useState('USD');
  const [showChart, setShowChart] = useState('Line'); // Toggle between Line and Bar charts
  const [searchQuery, setSearchQuery] = useState('');
  const [realTimeData, setRealTimeData] = useState(performanceData.portfolio); // Simulated real-time data
  const { isOpen, onOpen, onClose } = useDisclosure();

  const textColor = useColorModeValue("secondaryGray.900", "white");

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      setRealTimeData(prevData => {
        const newData = prevData.map((data, index) => ({
          ...data,
          value: data.value + Math.random() * 100000 - 50000, // Simulate fluctuation
        }));
        return newData;
      });
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const convertValue = (value) => {
    if (currency === 'USD') return value;
    return value * exchangeRates[currency];
  };

  const handleChartTypeChange = (event) => {
    setChartType(event.target.value);
  };

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  const handleSearch = () => {
    // Implement search functionality here
    console.log(`Search for: ${searchQuery}`);
  };

  const downloadReport = (format) => {
    // Example function to simulate report download
    const blob = new Blob([`Report in ${format} format`], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, `report.${format}`);
  };

  return (
    <Box pt={{ base: "180px", md: "80px", xl: "80px" }} px={{ base: "20px", md: "40px" }}>
      <Text mb="20px" color={textColor} fontSize="2xl" fontWeight="700">
        Performance Charts and Reports
      </Text>

      <Stack spacing={8}>
        {/* Performance Charts */}
        <Card>
          <Text fontSize="xl" fontWeight="bold" mb={4}>Performance Charts</Text>

          <Stack spacing={4} mb={4}>
            <Select value={chartType} onChange={handleChartTypeChange} placeholder="Select Chart Type">
              <option value="portfolio">Portfolio Performance</option>
              <option value="assets">Asset Performance</option>
            </Select>

            <Select mb={4} value={currency} onChange={handleCurrencyChange} placeholder="Select Currency">
              {currencies.map((currencyKey) => (
                <option key={currencyKey} value={currencyKey}>{currencyKey}</option>
              ))}
            </Select>

            <InputGroup>
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <InputRightElement>
                <IconButton icon={<SearchIcon />} onClick={handleSearch} aria-label="Search" />
              </InputRightElement>
            </InputGroup>

            <Select mb={4} value={showChart} onChange={(e) => setShowChart(e.target.value)} placeholder="Select Chart Type">
              <option value="Line">Line Chart</option>
              <option value="Bar">Bar Chart</option>
            </Select>
          </Stack>

          <ResponsiveContainer width="100%" height={400}>
            {showChart === 'Line' ? (
              <LineChart data={realTimeData.map(data => ({ ...data, value: convertValue(data.value) }))}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <RechartsTooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#8884d8" />
              </LineChart>
            ) : (
              <BarChart data={realTimeData.map(data => ({ ...data, value: convertValue(data.value) }))}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <RechartsTooltip />
                <Legend />
                <Bar dataKey="value" fill="#82ca9d" />
              </BarChart>
            )}
          </ResponsiveContainer>
        </Card>

        {/* Detailed Reports */}
        <Card>
          <Text fontSize="xl" fontWeight="bold" mb={4}>Detailed Reports</Text>

          <Stack spacing={4} mb={4}>
            {reportData.map((item, index) => (
              <Box key={index} p={4} borderWidth="1px" borderRadius="md" borderColor={textColor}>
                <Text fontSize="lg" fontWeight="semibold">{item.metric}</Text>
                <Text fontSize="md">{item.value}</Text>
              </Box>
            ))}
          </Stack>

          <Button mt={4} colorScheme="blue" leftIcon={<DownloadIcon />} onClick={() => downloadReport('pdf')}>
            Download PDF Report
          </Button>
          <Button mt={4} ml={4} colorScheme="blue" leftIcon={<DownloadIcon />} onClick={() => downloadReport('csv')}>
            Download CSV Report
          </Button>
          <Button mt={4} ml={4} colorScheme="blue" leftIcon={<DownloadIcon />} onClick={() => downloadReport('xlsx')}>
            Download Excel Report
          </Button>
        </Card>

        {/* Information Modal */}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Additional Information</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text fontSize="md">Here you can find more details about the selected performance charts and reports. Customize the data, filters, and download options as needed.</Text>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <Tooltip label="More Info" aria-label="More Info Tooltip">
          <IconButton icon={<InfoIcon />} onClick={onOpen} aria-label="Info" />
        </Tooltip>
      </Stack>
    </Box>
  );
};

export default PerformanceReports;


