import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Brush,
  ReferenceLine,
} from 'recharts';
import { Box, Text, Select, Flex, Button } from '@chakra-ui/react';
import Card from 'components/card/Card'; // Import your Card component
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { CSVLink } from 'react-csv'; // Import for exporting CSV

// Extended historical data with multiple series for different assets
const historicalData = {
  '1Y': [
    { date: '2023-07-01', realEstate: 950, art: 500, metals: 800 },
    { date: '2023-08-01', realEstate: 1000, art: 550, metals: 850 },
    { date: '2023-09-01', realEstate: 1050, art: 600, metals: 900 },
    { date: '2023-10-01', realEstate: 1100, art: 650, metals: 950 },
    { date: '2023-11-01', realEstate: 1150, art: 700, metals: 1000 },
    { date: '2023-12-01', realEstate: 1200, art: 750, metals: 1050 },
    { date: '2024-01-01', realEstate: 1250, art: 800, metals: 1100 },
    { date: '2024-02-01', realEstate: 1300, art: 850, metals: 1150 },
    { date: '2024-03-01', realEstate: 1350, art: 900, metals: 1200 },
    { date: '2024-04-01', realEstate: 1400, art: 950, metals: 1250 },
    { date: '2024-05-01', realEstate: 1450, art: 1000, metals: 1300 },
    { date: '2024-06-01', realEstate: 1500, art: 1050, metals: 1350 },
    { date: '2024-07-01', realEstate: 1550, art: 1100, metals: 1400 },
  ],
  '3Y': [
    { date: '2021-07-01', realEstate: 800, art: 450, metals: 700 },
    { date: '2021-08-01', realEstate: 850, art: 500, metals: 750 },
    { date: '2021-09-01', realEstate: 900, art: 550, metals: 800 },
    { date: '2021-10-01', realEstate: 950, art: 600, metals: 850 },
    { date: '2021-11-01', realEstate: 1000, art: 650, metals: 900 },
    { date: '2021-12-01', realEstate: 1050, art: 700, metals: 950 },
    { date: '2022-01-01', realEstate: 1100, art: 750, metals: 1000 },
    { date: '2022-02-01', realEstate: 1150, art: 800, metals: 1050 },
    { date: '2022-03-01', realEstate: 1200, art: 850, metals: 1100 },
    { date: '2022-04-01', realEstate: 1250, art: 900, metals: 1150 },
    { date: '2022-05-01', realEstate: 1300, art: 950, metals: 1200 },
    { date: '2022-06-01', realEstate: 1350, art: 1000, metals: 1250 },
    { date: '2022-07-01', realEstate: 1400, art: 1050, metals: 1300 },
    { date: '2022-08-01', realEstate: 1450, art: 1100, metals: 1350 },
    { date: '2022-09-01', realEstate: 1500, art: 1150, metals: 1400 },
    { date: '2022-10-01', realEstate: 1550, art: 1200, metals: 1450 },
    { date: '2022-11-01', realEstate: 1600, art: 1250, metals: 1500 },
    { date: '2022-12-01', realEstate: 1650, art: 1300, metals: 1550 },
    { date: '2023-01-01', realEstate: 1700, art: 1350, metals: 1600 },
  ],
  '5Y': [
    { date: '2019-07-01', realEstate: 700, art: 400, metals: 600 },
    { date: '2019-08-01', realEstate: 750, art: 450, metals: 650 },
    { date: '2019-09-01', realEstate: 800, art: 500, metals: 700 },
    { date: '2019-10-01', realEstate: 850, art: 550, metals: 750 },
    { date: '2019-11-01', realEstate: 900, art: 600, metals: 800 },
    { date: '2019-12-01', realEstate: 950, art: 650, metals: 850 },
    { date: '2020-01-01', realEstate: 1000, art: 700, metals: 900 },
    { date: '2020-02-01', realEstate: 1050, art: 750, metals: 950 },
    { date: '2020-03-01', realEstate: 1100, art: 800, metals: 1000 },
    { date: '2020-04-01', realEstate: 1150, art: 850, metals: 1050 },
    { date: '2020-05-01', realEstate: 1200, art: 900, metals: 1100 },
    { date: '2020-06-01', realEstate: 1250, art: 950, metals: 1150 },
    { date: '2020-07-01', realEstate: 1300, art: 1000, metals: 1200 },
    { date: '2020-08-01', realEstate: 1350, art: 1050, metals: 1250 },
    { date: '2020-09-01', realEstate: 1400, art: 1100, metals: 1300 },
    { date: '2020-10-01', realEstate: 1450, art: 1150, metals: 1350 },
    { date: '2020-11-01', realEstate: 1500, art: 1200, metals: 1400 },
    { date: '2020-12-01', realEstate: 1550, art: 1250, metals: 1450 },
    { date: '2021-01-01', realEstate: 1600, art: 1300, metals: 1500 },
    { date: '2021-02-01', realEstate: 1650, art: 1350, metals: 1550 },
    { date: '2021-03-01', realEstate: 1700, art: 1400, metals: 1600 },
    { date: '2021-04-01', realEstate: 1750, art: 1450, metals: 1650 },
    { date: '2021-05-01', realEstate: 1800, art: 1500, metals: 1700 },
    { date: '2021-06-01', realEstate: 1850, art: 1550, metals: 1750 },
    { date: '2021-07-01', realEstate: 1900, art: 1600, metals: 1800 },
  ],
};

const HistoricalPerformance = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('1Y');
  const [dateRange, setDateRange] = useState([moment().subtract(1, 'year').toDate(), new Date()]);
  const [data, setData] = useState(historicalData['1Y']);
  const [hoveredPoint, setHoveredPoint] = useState(null);

  useEffect(() => {
    const filteredData = historicalData[selectedPeriod].filter(item => {
      const date = moment(item.date);
      return date.isBetween(dateRange[0], dateRange[1], null, '[]');
    });
    setData(filteredData);
  }, [selectedPeriod, dateRange]);

  const formatXAxis = (tickItem) => moment(tickItem).format('MMM YY');

  return (
    <Card>
      <Box p="20px">
        <Text fontSize="lg" fontWeight="bold" mb="10px">
          Historical Performance
        </Text>
        <Flex mb="10px" align="center">
          <Select
            placeholder="Select Period"
            onChange={(e) => setSelectedPeriod(e.target.value)}
            value={selectedPeriod}
            width="200px"
          >
            <option value="1Y">Last 1 Year</option>
            <option value="3Y">Last 3 Years</option>
            <option value="5Y">Last 5 Years</option>
          </Select>
          <DatePicker
            selected={dateRange[0]}
            onChange={(dates) => setDateRange(dates)}
            startDate={dateRange[0]}
            endDate={dateRange[1]}
            selectsRange
            dateFormat="MMMM d, yyyy"
            customInput={<Button ml="10px">Select Date Range</Button>}
          />
          <CSVLink
            data={data}
            headers={[
              { label: 'Date', key: 'date' },
              { label: 'Real Estate', key: 'realEstate' },
              { label: 'Art', key: 'art' },
              { label: 'Precious Metals', key: 'metals' },
            ]}
            filename="historical-performance.csv"
          >
            <Button ml="10px">Export Data</Button>
          </CSVLink>
        </Flex>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
            onMouseEnter={(e) => setHoveredPoint(e.activePayload ? e.activePayload[0].payload : null)}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tickFormatter={formatXAxis} />
            <YAxis />
            <Tooltip
              formatter={(value) => new Intl.NumberFormat('en').format(value)}
              labelFormatter={(label) => moment(label).format('MMM DD, YYYY')}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="realEstate"
              stroke="#4CAF50"
              dot={{ stroke: '#4CAF50', strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="art"
              stroke="#2196F3"
              dot={{ stroke: '#2196F3', strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="metals"
              stroke="#FFC107"
              dot={{ stroke: '#FFC107', strokeWidth: 2 }}
            />
            <Brush
              dataKey="date"
              height={30}
              stroke="#8884d8"
              fill="#8884d8"
              startIndex={data.length - 10}
            />
            <ReferenceLine y={hoveredPoint?.realEstate} label="Real Estate" stroke="#4CAF50" strokeDasharray="3 3" />
            <ReferenceLine y={hoveredPoint?.art} label="Art" stroke="#2196F3" strokeDasharray="3 3" />
            <ReferenceLine y={hoveredPoint?.metals} label="Precious Metals" stroke="#FFC107" strokeDasharray="3 3" />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Card>
  );
};

export default HistoricalPerformance;
