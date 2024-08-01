import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  Select,
  Stack,
  useColorModeValue,
  Button,
  Tooltip,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Textarea,
  useToast
} from "@chakra-ui/react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, AreaChart, Area, ScatterChart, Scatter } from 'recharts';
import { InfoIcon, DownloadIcon } from '@chakra-ui/icons';
import Card from "components/card/Card";
import { saveAs } from 'file-saver';

const trendsData = [
  { month: 'Jan', BTC: 0.000034, ETH: 0.00045, USDT: 1, BNB: 0.003, ADA: 1.5, DOT: 0.04 },
  { month: 'Feb', BTC: 0.000032, ETH: 0.00042, USDT: 1, BNB: 0.0028, ADA: 1.4, DOT: 0.038 },
  { month: 'Mar', BTC: 0.000035, ETH: 0.00048, USDT: 1, BNB: 0.0032, ADA: 1.6, DOT: 0.042 },
  { month: 'Apr', BTC: 0.000037, ETH: 0.00050, USDT: 1, BNB: 0.0035, ADA: 1.7, DOT: 0.045 },
  { month: 'May', BTC: 0.000036, ETH: 0.00047, USDT: 1, BNB: 0.0034, ADA: 1.6, DOT: 0.043 },
  { month: 'Jun', BTC: 0.000039, ETH: 0.00052, USDT: 1, BNB: 0.0036, ADA: 1.8, DOT: 0.046 },
];

const expertInsights = [
  "The market is showing positive trends, with an upward movement expected in the next quarter.",
  "Historical data suggests a strong performance in Q3. Investors should consider increasing their positions.",
  "Diversification remains key, with a focus on high-performing assets like ETH and BTC.",
  "Expert consensus points to a bullish trend for ADA and DOT in the coming months.",
];

const MarketForecasts = () => {
  const [chartType, setChartType] = useState('Line');
  const [selectedCrypto, setSelectedCrypto] = useState('BTC');
  const [showingData, setShowingData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInsight, setSelectedInsight] = useState(null);
  const [note, setNote] = useState("");
  const [annotations, setAnnotations] = useState([]);
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const toast = useToast();

  useEffect(() => {
    setShowingData(transformData(selectedCrypto));
  }, [selectedCrypto]);

  // Transform data based on selected crypto
  const transformData = (crypto) => {
    return trendsData.map(data => ({
      month: data.month,
      value: data[crypto],
    }));
  };

  const handleChartTypeChange = (event) => {
    setChartType(event.target.value);
  };

  const handleCryptoChange = (event) => {
    setSelectedCrypto(event.target.value);
  };

  const handleInsightClick = (index) => {
    setSelectedInsight(expertInsights[index]);
    setIsModalOpen(true);
  };

  const downloadForecast = (format) => {
    const blob = new Blob([`Forecast in ${format} format`], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, `forecast.${format}`);
  };

  const addAnnotation = () => {
    if (note.trim()) {
      setAnnotations([...annotations, note.trim()]);
      setNote("");
      toast({
        title: "Annotation added.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Please enter a note.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box pt={{ base: "180px", md: "80px", xl: "80px" }} px={{ base: "20px", md: "40px" }}>
      <Text mb="20px" color={textColor} fontSize="2xl" fontWeight="700">
        Market Forecasts
      </Text>

      <Stack spacing={8}>
        {/* Trends and Predictions */}
        <Card>
          <Text fontSize="xl" fontWeight="bold" mb={4}>Trends and Predictions</Text>

          <Stack spacing={4} mb={4}>
            <FormControl>
              <FormLabel>Select Chart Type</FormLabel>
              <Select value={chartType} onChange={handleChartTypeChange}>
                <option value="Line">Line Chart</option>
                <option value="Bar">Bar Chart</option>
                <option value="Area">Area Chart</option>
                <option value="Scatter">Scatter Chart</option>
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>Select Cryptocurrency</FormLabel>
              <Select value={selectedCrypto} onChange={handleCryptoChange}>
                <option value="BTC">Bitcoin (BTC)</option>
                <option value="ETH">Ethereum (ETH)</option>
                <option value="USDT">Tether (USDT)</option>
                <option value="BNB">Binance Coin (BNB)</option>
                <option value="ADA">Cardano (ADA)</option>
                <option value="DOT">Polkadot (DOT)</option>
              </Select>
            </FormControl>
          </Stack>

          <ResponsiveContainer width="100%" height={400}>
            {chartType === 'Line' ? (
              <LineChart data={showingData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <RechartsTooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#8884d8" />
              </LineChart>
            ) : chartType === 'Bar' ? (
              <BarChart data={showingData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <RechartsTooltip />
                <Legend />
                <Bar dataKey="value" fill="#82ca9d" />
              </BarChart>
            ) : chartType === 'Area' ? (
              <AreaChart data={showingData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <RechartsTooltip />
                <Legend />
                <Area type="monotone" dataKey="value" stroke="#8884d8" fillOpacity={0.3} fill="#8884d8" />
              </AreaChart>
            ) : (
              <ScatterChart data={showingData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <RechartsTooltip />
                <Legend />
                <Scatter dataKey="value" fill="#8884d8" />
              </ScatterChart>
            )}
          </ResponsiveContainer>

          <Stack spacing={4} mt={4}>
            <Button colorScheme="blue" leftIcon={<DownloadIcon />} onClick={() => downloadForecast('pdf')}>
              Download PDF Forecast
            </Button>
            <Button colorScheme="blue" leftIcon={<DownloadIcon />} onClick={() => downloadForecast('csv')}>
              Download CSV Forecast
            </Button>
            <Button colorScheme="blue" leftIcon={<DownloadIcon />} onClick={() => downloadForecast('xlsx')}>
              Download Excel Forecast
            </Button>
          </Stack>
        </Card>

        {/* Expert Insights */}
        <Card>
          <Text fontSize="xl" fontWeight="bold" mb={4}>Expert Insights</Text>

          <Stack spacing={4}>
            {expertInsights.map((insight, index) => (
              <Box
                key={index}
                p={4}
                borderWidth="1px"
                borderRadius="md"
                borderColor={textColor}
                cursor="pointer"
                _hover={{ bg: "gray.100" }}
                onClick={() => handleInsightClick(index)}
              >
                <Text fontSize="md">{insight.slice(0, 100)}...</Text> {/* Show preview */}
              </Box>
            ))}
          </Stack>

          <Tooltip label="More Info" aria-label="More Info Tooltip">
            <IconButton icon={<InfoIcon />} onClick={() => setIsModalOpen(true)} aria-label="Info" />
          </Tooltip>
        </Card>

        {/* Information Modal */}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Additional Information</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text fontSize="md">
                This section provides expert analysis and forecasts based on current market data. 
                You can view trends, predictions, and expert insights to make informed investment decisions.
              </Text>
              {selectedInsight && (
                <Box mt={4}>
                  <Text fontSize="md">{selectedInsight}</Text>
                </Box>
              )}
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" onClick={() => setIsModalOpen(false)}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* User Annotations */}
        <Card>
          <Text fontSize="xl" fontWeight="bold" mb={4}>User Annotations</Text>

          <Stack spacing={4}>
            <FormControl>
              <FormLabel>Add a Note</FormLabel>
              <Textarea
                placeholder="Enter your notes here..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </FormControl>
            <Button colorScheme="blue" onClick={addAnnotation}>
              Add Annotation
            </Button>
            <Stack spacing={2} mt={4}>
              {annotations.map((annotation, index) => (
                <Box key={index} p={4} borderWidth="1px" borderRadius="md" borderColor={textColor}>
                  <Text fontSize="md">{annotation}</Text>
                </Box>
              ))}
            </Stack>
          </Stack>
        </Card>
      </Stack>
    </Box>
  );
};

export default MarketForecasts;

