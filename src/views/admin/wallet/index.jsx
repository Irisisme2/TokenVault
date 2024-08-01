/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2023 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import { Box, SimpleGrid } from "@chakra-ui/react";
import PortfolioSummary from "views/admin/wallet/components/PortfolioSummary";
import BarChartComponent from "views/admin/wallet/components/BarChartComponent";
import LineChartComponent from "views/admin/wallet/components/LineChartComponent";
import AssetTable from "views/admin/wallet/components/AssetTable";

import React from "react";

export default function Settings() {
  // Chakra Color Mode
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        mb='20px'
        columns={{ base: 1, md: 2 }}
        spacing={{ base: "20px", xl: "20px" }}
        templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', xl: 'repeat(2, 1fr)' }}
      >
        <Box gridColumn={{ md: 'span 1', xl: 'span 1' }}>
          <PortfolioSummary />
        </Box>
        <Box gridColumn={{ md: 'span 1', xl: 'span 1' }}>
          <BarChartComponent 
          />
        </Box>
      </SimpleGrid>
      <Box width="100%" mb='20px'>
      <LineChartComponent />
      </Box>
        <Box gridColumn={{ md: 'span 1', xl: 'span 1' }}>
        <AssetTable />
      </Box>
    </Box>
  );
}
