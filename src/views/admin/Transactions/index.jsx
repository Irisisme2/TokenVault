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
import { Box, Grid } from "@chakra-ui/react";

// Custom components
import TransactionSummary from "views/admin/Transactions/components/TransactionSummary";
import TransactionCharts from "views/admin/Transactions/components/TransactionCharts";
import TransactionTable from "views/admin/Transactions/components/TransactionTable";

// Assets
import React from "react";

export default function Overview() {
  return (
    <Box >
        <TransactionSummary/>
        <TransactionTable/>
        <TransactionCharts />
 </Box>
  );
}
