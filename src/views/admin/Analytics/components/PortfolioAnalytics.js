import React, { useState } from "react";
import {
  Box,
  Text,
  Select,
  Stack,
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
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  ZAxis,
  LineChart,
  Line,
  BarChart,
  Bar,
} from "recharts";
import Card from "components/card/Card";
import { InfoIcon, DownloadIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";

const areaChartData = [
  { month: "Jan", value: 4000 },
  { month: "Feb", value: 3000 },
  { month: "Mar", value: 2000 },
  { month: "Apr", value: 2780 },
  { month: "May", value: 1890 },
  { month: "Jun", value: 2390 },
  { month: "Jul", value: 3490 },
];

const bubbleChartData = [
  { x: 1, y: 4000, z: 100 },
  { x: 2, y: 3000, z: 80 },
  { x: 3, y: 2000, z: 60 },
  { x: 4, y: 2780, z: 120 },
  { x: 5, y: 1890, z: 90 },
  { x: 6, y: 2390, z: 70 },
  { x: 7, y: 3490, z: 110 },
];

const heatmapData = [
  { asset: "BTC", time: "Jan", value: 1000 },
  { asset: "BTC", time: "Feb", value: 1200 },
  { asset: "ETH", time: "Jan", value: 800 },
  { asset: "ETH", time: "Feb", value: 1000 },
  { asset: "ADA", time: "Jan", value: 600 },
  { asset: "ADA", time: "Feb", value: 700 },
];

const exchangeRates = {
  BTC: 0.000034,
  ETH: 0.00045,
  USDT: 1,
  BNB: 0.003,
  ADA: 1.5,
  DOT: 0.04,
};

const colors = {
  BTC: "#F7931A",
  ETH: "#627EEA",
  USDT: "#26A17B",
  BNB: "#F3BA2F",
  ADA: "#3CC8C8",
  DOT: "#E6007A",
};

const PortfolioAnalytics = () => {
  const [chartType, setChartType] = useState("Area");
  const [crypto, setCrypto] = useState("USDT");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInsight, setSelectedInsight] = useState(null);
  const [note, setNote] = useState("");
  const [annotations, setAnnotations] = useState([]);
  const [editingAnnotation, setEditingAnnotation] = useState(null);
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const toast = useToast();

  const handleChartTypeChange = (event) => {
    setChartType(event.target.value);
  };

  const handleCryptoChange = (event) => {
    setCrypto(event.target.value);
  };

  const handleInsightClick = (insight) => {
    setSelectedInsight(insight);
    setIsModalOpen(true);
  };

  const addAnnotation = () => {
    if (note.trim()) {
      setAnnotations([...annotations, { note: note.trim(), date: new Date() }]);
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

  const editAnnotation = (index) => {
    setEditingAnnotation(index);
    setNote(annotations[index].note);
  };

  const updateAnnotation = () => {
    if (note.trim()) {
      const updatedAnnotations = annotations.map((annotation, index) =>
        index === editingAnnotation ? { ...annotation, note: note.trim() } : annotation
      );
      setAnnotations(updatedAnnotations);
      setEditingAnnotation(null);
      setNote("");
      toast({
        title: "Annotation updated.",
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

  const deleteAnnotation = (index) => {
    const updatedAnnotations = annotations.filter((_, i) => i !== index);
    setAnnotations(updatedAnnotations);
    toast({
      title: "Annotation deleted.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const convertedData = areaChartData.map((item) => ({
    ...item,
    value: item.value * exchangeRates[crypto],
  }));

  return (
    <Box pt={{ base: "180px", md: "80px", xl: "80px" }} px={{ base: "20px", md: "40px" }}>
      <Text mb="20px" color={textColor} fontSize="2xl" fontWeight="700">
        Portfolio Analytics 📈
      </Text>

      <Stack spacing={8}>
        {/* Area Chart */}
        <Card>
          <Text fontSize="xl" fontWeight="bold" mb={4}>Asset Performance</Text>

          <Stack spacing={4} mb={4}>
            <FormControl>
              <FormLabel>Select Chart Type</FormLabel>
              <Select value={chartType} onChange={handleChartTypeChange}>
                <option value="Area">Area Chart</option>
                <option value="Bubble">Bubble Chart</option>
                <option value="Heatmap">Heatmap</option>
                <option value="Line">Line Chart</option>
                <option value="Bar">Bar Chart</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Select Cryptocurrency</FormLabel>
              <Select value={crypto} onChange={handleCryptoChange}>
                {Object.keys(exchangeRates).map((key) => (
                  <option value={key} key={key}>{key}</option>
                ))}
              </Select>
            </FormControl>
          </Stack>

          <ResponsiveContainer width="100%" height={400}>
            {chartType === "Area" ? (
              <AreaChart data={convertedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <RechartsTooltip />
                <Area type="monotone" dataKey="value" stroke={colors[crypto]} fillOpacity={0.3} fill={colors[crypto]} />
              </AreaChart>
            ) : chartType === "Bubble" ? (
              <ScatterChart width={600} height={400}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" dataKey="x" name="Transaction Volume" unit="K" />
                <YAxis type="number" dataKey="y" name="Transaction Value" unit="$" />
                <ZAxis type="number" dataKey="z" range={[60, 400]} name="Transaction Size" unit="$" />
                <RechartsTooltip cursor={{ strokeDasharray: "3 3" }} />
                <Scatter name="Transactions" data={bubbleChartData} fill={colors[crypto]} />
              </ScatterChart>
            ) : chartType === "Heatmap" ? (
              <ResponsiveContainer width="100%" height={400}>
                <ScatterChart
                  width={800}
                  height={400}
                  margin={{ top: 20, right: 20, bottom: 10, left: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="category" dataKey="time" name="Time" />
                  <YAxis type="category" dataKey="asset" name="Asset" />
                  <ZAxis type="number" dataKey="value" range={[50, 200]} name="Value" />
                  <RechartsTooltip cursor={{ strokeDasharray: "3 3" }} />
                  <Scatter data={heatmapData} fill={colors[crypto]} />
                </ScatterChart>
              </ResponsiveContainer>
            ) : chartType === "Line" ? (
              <LineChart data={convertedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <RechartsTooltip />
                <Line type="monotone" dataKey="value" stroke={colors[crypto]} />
              </LineChart>
            ) : (
              <BarChart data={convertedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <RechartsTooltip />
                <Bar dataKey="value" fill={colors[crypto]} />
              </BarChart>
            )}
          </ResponsiveContainer>

          <Stack spacing={4} mt={4}>
            <Button colorScheme="blue" leftIcon={<DownloadIcon />}>
              Download Data
            </Button>
          </Stack>
        </Card>

        {/* Market Forecasts */}
        <Card>
          <Text fontSize="xl" fontWeight="bold" mb={4}>Market Forecasts</Text>

          <Stack spacing={4}>
            <Text fontSize="md">
              Trends and Predictions: This section provides graphical representations of predicted trends based on market analysis and historical data.
            </Text>
            <Text fontSize="md">
              Expert Insights: This section includes analysis or commentary from financial experts regarding future market movements.
            </Text>
          </Stack>

          <Tooltip label="More Info" aria-label="More Info Tooltip">
            <IconButton icon={<InfoIcon />} onClick={() => setIsModalOpen(true)} aria-label="Info" />
          </Tooltip>
        </Card>

        {/* Detailed Reports */}
        <Card>
          <Text fontSize="xl" fontWeight="bold" mb={4}>Detailed Reports</Text>

          <Stack spacing={4}>
            <Text fontSize="md">
              Downloadable or viewable reports summarizing portfolio performance, asset gains/losses, and other key metrics.
            </Text>
          </Stack>

          <Button colorScheme="blue" leftIcon={<DownloadIcon />}>
            Download Report
          </Button>
        </Card>

        {/* Information Modal */}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Additional Information</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text fontSize="md">
                This section provides insights and analytics on portfolio performance and transaction analysis. You can view charts illustrating asset growth, transaction relationships, and frequency heatmaps.
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
            {editingAnnotation === null ? (
              <Button colorScheme="blue" onClick={addAnnotation}>
                Add Annotation
              </Button>
            ) : (
              <Button colorScheme="blue" onClick={updateAnnotation}>
                Update Annotation
              </Button>
            )}
            <Stack spacing={2} mt={4}>
              {annotations.map((annotation, index) => (
                <Box key={index} p={4} borderWidth="1px" borderRadius="md" borderColor={textColor}>
                  <Text fontSize="md">{annotation.note}</Text>
                  <Text fontSize="sm" color="gray.500">{annotation.date.toLocaleString()}</Text>
                  <Stack direction="row" spacing={4} mt={2}>
                    <Button leftIcon={<EditIcon />} onClick={() => editAnnotation(index)} size="sm">
                      Edit
                    </Button>
                    <Button leftIcon={<DeleteIcon />} onClick={() => deleteAnnotation(index)} size="sm" colorScheme="red">
                      Delete
                    </Button>
                  </Stack>
                </Box>
              ))}
            </Stack>
          </Stack>
        </Card>
      </Stack>
    </Box>
  );
};

export default PortfolioAnalytics;
