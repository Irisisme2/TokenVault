import React, { useState, useCallback } from 'react';
import { Box, Text, Select, Image, Flex, Table, Thead, Tbody, Tr, Th, Td, Button, Input, IconButton, Collapse, Checkbox, useToast, Menu, MenuButton, MenuItems, MenuItem } from '@chakra-ui/react';
import { EditIcon, CheckIcon, CloseIcon, DownloadIcon, DeleteIcon, ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import Card from 'components/card/Card'; // Import Card component
import Btc from 'assets/img/icons/btc.png'; // Bitcoin icon
import Eth from 'assets/img/icons/eth.png'; // Ethereum icon
import Usdt from 'assets/img/icons/usdt.png'; // Tether icon
import Bnb from 'assets/img/icons/bnb.png'; // Binance Coin icon
import Ada from 'assets/img/icons/ada.png'; // Cardano icon
import Dot from 'assets/img/icons/dot.png'; // Polkadot icon
import { CSVLink } from "react-csv";

// Exchange rates for different tokens
const exchangeRates = {
  BTC: 0.000034, // Example rate: 1 USD = 0.000034 BTC
  ETH: 0.00045,  // Example rate: 1 USD = 0.00045 ETH
  USDT: 1,       // Example rate: 1 USD = 1 USDT
  BNB: 0.003,    // Example rate: 1 USD = 0.003 BNB
  ADA: 1.5,      // Example rate: 1 USD = 1.5 ADA
  DOT: 0.04      // Example rate: 1 USD = 0.04 DOT
};

// Example data
const initialAssetData = [
  { name: 'Building A', category: 'Real Estate', amount: 10, currentValueUSD: 500000, totalValueUSD: 5000000, lastUpdated: '2024-07-01', details: 'Prime location building with high rental income' },
  { name: 'Mona Lisa', category: 'Art', amount: 1, currentValueUSD: 1000000, totalValueUSD: 1000000, lastUpdated: '2024-07-01', details: 'Famous painting by Leonardo da Vinci' },
  { name: 'Gold Bar', category: 'Precious Metals', amount: 50, currentValueUSD: 20000, totalValueUSD: 1000000, lastUpdated: '2024-07-01', details: '24k gold bars, each weighing 1kg' }
];

const icons = {
  BTC: Btc,
  ETH: Eth,
  USDT: Usdt,
  BNB: Bnb,
  ADA: Ada,
  DOT: Dot
};

const categories = ["All", "Real Estate", "Art", "Precious Metals"];

const AssetTable = () => {
  const [selectedToken, setSelectedToken] = useState('USD');
  const [tokenIcon, setTokenIcon] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Number of items per page
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [searchQuery, setSearchQuery] = useState('');
  const [editingRow, setEditingRow] = useState(null);
  const [assetData, setAssetData] = useState(initialAssetData);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [selectedRows, setSelectedRows] = useState(new Set());
  const toast = useToast();

  const handleTokenChange = (event) => {
    const token = event.target.value;
    setSelectedToken(token);
    setTokenIcon(icons[token]);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setCurrentPage(1);
  };

  const getTokenValue = (valueInUSD) => {
    if (selectedToken === 'USD') return valueInUSD;
    return valueInUSD * exchangeRates[selectedToken];
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleDateRangeChange = (event) => {
    const { name, value } = event.target;
    setDateRange(prevState => ({ ...prevState, [name]: value }));
  };

  const handleEdit = (index) => {
    setEditingRow(index);
  };

  const handleSave = (index) => {
    setEditingRow(null);
  };

  const handleCancel = () => {
    setEditingRow(null);
  };

  const handleInputChange = (index, field, value) => {
    const updatedData = [...assetData];
    updatedData[index][field] = value;
    setAssetData(updatedData);
  };

  const handleBulkDelete = () => {
    const updatedData = assetData.filter((_, index) => !selectedRows.has(index));
    setAssetData(updatedData);
    setSelectedRows(new Set());
    toast({
      title: "Assets deleted.",
      description: "Selected assets have been deleted.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  const handleSelectAll = () => {
    setSelectedRows(new Set(assetData.map((_, index) => index)));
  };

  const handleDeselectAll = () => {
    setSelectedRows(new Set());
  };

  const handleRowSelect = (index) => {
    const newSelectedRows = new Set(selectedRows);
    if (newSelectedRows.has(index)) {
      newSelectedRows.delete(index);
    } else {
      newSelectedRows.add(index);
    }
    setSelectedRows(newSelectedRows);
  };

  const filterDataByDate = (data) => {
    const { start, end } = dateRange;
    if (!start && !end) return data;

    return data.filter(asset => {
      const assetDate = new Date(asset.lastUpdated);
      const startDate = new Date(start);
      const endDate = new Date(end);

      return (!start || assetDate >= startDate) && (!end || assetDate <= endDate);
    });
  };

  const sortedData = React.useMemo(() => {
    let sortableItems = [...assetData];
    if (sortConfig.key) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [assetData, sortConfig]);

  const filteredData = sortedData.filter(asset =>
    (selectedCategory === "All" || asset.category === selectedCategory) &&
    (asset.name.toLowerCase().includes(searchQuery.toLowerCase())) &&
    filterDataByDate([asset]).length > 0
  );

  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <Card>
      <Box p="20px">
        <Text fontSize="2xl" fontWeight="bold" mb="10px">
          Asset Table
        </Text>
        <Flex align="center" mb="20px">
          {tokenIcon && <Image src={tokenIcon} alt={selectedToken} boxSize="30px" mr="10px" />}
          <Select value={selectedToken} onChange={handleTokenChange} mr="10px">
            <option value="USD">USD</option>
            <option value="BTC">BTC</option>
            <option value="ETH">ETH</option>
            <option value="USDT">USDT</option>
            <option value="BNB">BNB</option>
            <option value="ADA">ADA</option>
            <option value="DOT">DOT</option>
          </Select>
          <Select value={selectedCategory} onChange={handleCategoryChange} mr="10px">
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </Select>
          <Input
            placeholder="Search assets"
            value={searchQuery}
            onChange={handleSearchChange}
            mr="10px"
            width="250px"
          />
          <Input
            placeholder="Start Date"
            type="date"
            name="start"
            value={dateRange.start}
            onChange={handleDateRangeChange}
            mr="10px"
          />
          <Input
            placeholder="End Date"
            type="date"
            name="end"
            value={dateRange.end}
            onChange={handleDateRangeChange}
            mr="10px"
          />
          <Button onClick={handleSelectAll} mr="10px">
            Select All
          </Button>
          <Button onClick={handleDeselectAll} mr="10px">
            Deselect All
          </Button>
          <Button colorScheme="red" onClick={handleBulkDelete} isDisabled={selectedRows.size === 0} mr="10px">
            Bulk Delete
          </Button>
          <CSVLink data={assetData} filename={"assets.csv"} className="btn btn-primary" target="_blank">
            <Button leftIcon={<DownloadIcon />} mr="10px">
              Export to CSV
            </Button>
          </CSVLink>
        </Flex>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th> <Checkbox isChecked={filteredData.length === selectedRows.size} onChange={(e) => e.target.checked ? handleSelectAll() : handleDeselectAll()} /> </Th>
              <Th>
                Name
                <IconButton icon={sortConfig.key === 'name' && sortConfig.direction === 'asc' ? <ChevronUpIcon /> : <ChevronDownIcon />} onClick={() => handleSort('name')} aria-label="Sort" ml="2" />
              </Th>
              <Th>
                Category
                <IconButton icon={sortConfig.key === 'category' && sortConfig.direction === 'asc' ? <ChevronUpIcon /> : <ChevronDownIcon />} onClick={() => handleSort('category')} aria-label="Sort" ml="2" />
              </Th>
              <Th>
                Amount
                <IconButton icon={sortConfig.key === 'amount' && sortConfig.direction === 'asc' ? <ChevronUpIcon /> : <ChevronDownIcon />} onClick={() => handleSort('amount')} aria-label="Sort" ml="2" />
              </Th>
              <Th>
                Current Value (USD)
                <IconButton icon={sortConfig.key === 'currentValueUSD' && sortConfig.direction === 'asc' ? <ChevronUpIcon /> : <ChevronDownIcon />} onClick={() => handleSort('currentValueUSD')} aria-label="Sort" ml="2" />
              </Th>
              <Th>
                Total Value (USD)
                <IconButton icon={sortConfig.key === 'totalValueUSD' && sortConfig.direction === 'asc' ? <ChevronUpIcon /> : <ChevronDownIcon />} onClick={() => handleSort('totalValueUSD')} aria-label="Sort" ml="2" />
              </Th>
              <Th>
                Last Updated
                <IconButton icon={sortConfig.key === 'lastUpdated' && sortConfig.direction === 'asc' ? <ChevronUpIcon /> : <ChevronDownIcon />} onClick={() => handleSort('lastUpdated')} aria-label="Sort" ml="2" />
              </Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {paginatedData.map((asset, index) => (
              <React.Fragment key={index}>
                <Tr>
                  <Td>
                    <Checkbox isChecked={selectedRows.has(index)} onChange={() => handleRowSelect(index)} />
                  </Td>
                  <Td>{editingRow === index ? <Input value={asset.name} onChange={(e) => handleInputChange(index, 'name', e.target.value)} /> : asset.name}</Td>
                  <Td>{editingRow === index ? <Input value={asset.category} onChange={(e) => handleInputChange(index, 'category', e.target.value)} /> : asset.category}</Td>
                  <Td>{editingRow === index ? <Input value={asset.amount} onChange={(e) => handleInputChange(index, 'amount', e.target.value)} /> : asset.amount}</Td>
                  <Td>{editingRow === index ? <Input value={getTokenValue(asset.currentValueUSD)} onChange={(e) => handleInputChange(index, 'currentValueUSD', e.target.value)} /> : getTokenValue(asset.currentValueUSD).toLocaleString()}</Td>
                  <Td>{editingRow === index ? <Input value={getTokenValue(asset.totalValueUSD)} onChange={(e) => handleInputChange(index, 'totalValueUSD', e.target.value)} /> : getTokenValue(asset.totalValueUSD).toLocaleString()}</Td>
                  <Td>{editingRow === index ? <Input value={asset.lastUpdated} onChange={(e) => handleInputChange(index, 'lastUpdated', e.target.value)} /> : asset.lastUpdated}</Td>
                  <Td>
                    {editingRow === index ? (
                      <>
                        <IconButton icon={<CheckIcon />} onClick={() => handleSave(index)} />
                        <IconButton icon={<CloseIcon />} onClick={handleCancel} />
                      </>
                    ) : (
                      <IconButton icon={<EditIcon />} onClick={() => handleEdit(index)} />
                    )}
                  </Td>
                </Tr>
                <Tr>
                  <Td colSpan="8">
                    <Collapse in={editingRow === index} animateOpacity>
                      <Box p="20px" bg="gray.100" rounded="md" shadow="md">
                        {editingRow === index ? <Input value={asset.details} onChange={(e) => handleInputChange(index, 'details', e.target.value)} /> : asset.details}
                      </Box>
                    </Collapse>
                  </Td>
                </Tr>
              </React.Fragment>
            ))}
          </Tbody>
        </Table>
        <Flex justify="space-between" mt="20px">
          <Button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
            Previous
          </Button>
          <Text>Page {currentPage} of {totalPages}</Text>
          <Button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
            Next
          </Button>
        </Flex>
      </Box>
    </Card>
  );
};

export default AssetTable;
