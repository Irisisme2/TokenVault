import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList, ReferenceLine } from 'recharts';
import { Box, Text, useBreakpointValue, Button, IconButton, Tooltip as ChakraTooltip, Select, Stack } from '@chakra-ui/react';
import { DownloadIcon, InfoIcon } from '@chakra-ui/icons';
import Card from 'components/card/Card'; // Import your Card component

// Define color palette for multiple series
const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff6f61', '#7e57c2'];

// Define default data
const DEFAULT_DATA = [
  { category: 'Real Estate', value: 40000, date: '2024-01-01' },
  { category: 'Art', value: 30000, date: '2024-01-02' },
  { category: 'Precious Metals', value: 50000, date: '2024-01-03' },
  { category: 'Stocks', value: 60000, date: '2024-01-04' },
  { category: 'Bonds', value: 35000, date: '2024-01-05' }
];

// Custom Tooltip component
const CustomTooltip = ({ payload, label, active }) => {
  if (active && payload && payload.length) {
    return (
      <Box bg="white" border="1px" borderColor="gray.200" p="10px" borderRadius="md">
        <Text fontWeight="bold">{label}</Text>
        {payload.map((entry, index) => (
          <Text key={index}>{`${entry.name}: ${entry.value}`}</Text>
        ))}
      </Box>
    );
  }
  return null;
};

// Function to handle chart export
const handleExport = (format) => {
  // Implement export functionality here
  console.log(`Exporting chart as ${format}`);
  // Placeholder code, integrate with chart export libraries
};

const BarChartComponent = ({ data = DEFAULT_DATA, title = '', description = '', filters = [], onFilterChange }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDateRange, setSelectedDateRange] = useState('lastMonth');
  const [exportFormat, setExportFormat] = useState('png');

  // Responsive width and height based on screen size
  const chartWidth = useBreakpointValue({ base: 300, md: 600 });
  const chartHeight = useBreakpointValue({ base: 200, md: 400 });

  // Handle bar click to filter data
  const handleBarClick = (data) => {
    setSelectedCategory(data.category);
    if (onFilterChange) onFilterChange(data.category);
  };

  // Handle filter change
  const handleFilterChange = (event) => {
    setSelectedDateRange(event.target.value);
    // Update data based on selected date range
    console.log('Selected date range:', event.target.value);
  };

  // Filtered data based on selected category and date range
  const filteredData = (data || []).filter(item => 
    (selectedCategory ? item.category === selectedCategory : true) &&
    (selectedDateRange === 'lastMonth' ? new Date(item.date) >= new Date(Date.now() - 30*24*60*60*1000) : true)
  );

  return (
    <Card>
      <Box p="20px">
        <Box mb="20px" d="flex" alignItems="center" justifyContent="space-between">
          <Text fontSize="lg" fontWeight="bold">{title}</Text>
          <Box d="flex" alignItems="center">
            <ChakraTooltip label="Download Chart" aria-label="Download Chart">
              <IconButton 
                icon={<DownloadIcon />} 
                onClick={() => handleExport(exportFormat)} 
                aria-label="Download"
                mr="10px"
              />
            </ChakraTooltip>
            <ChakraTooltip label="More Info" aria-label="More Info">
              <IconButton 
                icon={<InfoIcon />} 
                onClick={() => alert('Additional information')} 
                aria-label="More Info"
              />
            </ChakraTooltip>
          </Box>
        </Box>
        <Text fontSize="md" mb="20px">{description}</Text>
        <Stack direction="row" spacing="20px" mb="20px">
          <Select placeholder="Select Date Range" onChange={handleFilterChange}>
            <option value="lastMonth">Last Month</option>
            <option value="lastYear">Last Year</option>
            <option value="allTime">All Time</option>
          </Select>
        </Stack>
        <BarChart width={chartWidth} height={chartHeight} data={filteredData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar
            dataKey="value"
            fill={COLORS[0]} // Using first color from COLORS array
            onClick={handleBarClick}
          >
            <LabelList dataKey="value" position="top" />
          </Bar>
          <ReferenceLine y={50000} label="Target" stroke="red" strokeDasharray="3 3" />
        </BarChart>
      </Box>
    </Card>
  );
};

export default BarChartComponent;
