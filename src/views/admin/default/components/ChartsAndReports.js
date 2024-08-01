import React from 'react';
import {
  Box,
  Text,
  Button,
  Flex,
  Divider,
} from '@chakra-ui/react';
import Card from 'components/card/Card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// Sample Data for Performance Charts
const performanceData = [
  { name: 'January', portfolioValue: 500000, assetPerformance: 200000 },
  { name: 'February', portfolioValue: 510000, assetPerformance: 205000 },
  { name: 'March', portfolioValue: 520000, assetPerformance: 210000 },
  { name: 'April', portfolioValue: 530000, assetPerformance: 220000 },
  { name: 'May', portfolioValue: 540000, assetPerformance: 230000 },
];

// Sample Data for Detailed Reports
const detailedReports = [
  { reportName: 'Monthly Portfolio Summary', downloadLink: '/reports/portfolio-summary.pdf' },
  { reportName: 'Asset Gains/Losses Report', downloadLink: '/reports/asset-gains-losses.pdf' },
  { reportName: 'ROI Analysis', downloadLink: '/reports/roi-analysis.pdf' },
];

const ChartsAndReports = () => {
  return (
    <Card>
      <Box p="20px">
        <Text fontSize="lg" fontWeight="bold" mb="10px">Performance Charts</Text>

        {/* Performance Chart */}
        <BarChart width={800} height={400} data={performanceData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="portfolioValue" fill="#8884d8" name="Portfolio Value" />
          <Bar dataKey="assetPerformance" fill="#82ca9d" name="Asset Performance" />
        </BarChart>

        <Divider my="20px" />

        <Text fontSize="lg" fontWeight="bold" mb="10px">Detailed Reports</Text>

        {/* Report Links */}
        {detailedReports.map((report, index) => (
          <Flex key={index} align="center" justify="space-between" mb="10px">
            <Text>{report.reportName}</Text>
            <Button colorScheme="blue" as="a" href={report.downloadLink} download>
              Download
            </Button>
          </Flex>
        ))}
      </Box>
    </Card>
  );
};

export default ChartsAndReports;