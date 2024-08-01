import React, { useState } from 'react';
import { Box, SimpleGrid, Select, Button, Input, useToast, Text } from '@chakra-ui/react';
import MiniStatistics from 'components/card/MiniStatistics';
import HistoricalPerformance from 'views/admin/default/components/HistoricalPerformance';
import WeeklyRevenue from 'views/admin/default/components/WeeklyRevenue';
import TokenizedAssetsTable from 'views/admin/default/components/TokenizedAssetsTable';
import TransactionHistory from 'views/admin/default/components/TransactionHistory';
import TopHoldings from 'views/admin/default/components/TopHoldings';
import { generateDepositAddress, executeSwap, openDepositChannel, executeDirectVaultTrade } from 'utils/ChainflipAPI'; // Import Chainflip API
import Btc from 'assets/img/icons/btc.png'; // Bitcoin icon
import Eth from 'assets/img/icons/eth.png'; // Ethereum icon
import Usdt from 'assets/img/icons/usdt.png'; // Tether icon
import Bnb from 'assets/img/icons/bnb.png'; // Binance Coin icon
import Ada from 'assets/img/icons/ada.png'; // Cardano icon
import Dot from 'assets/img/icons/dot.png'; // Polkadot icon

const values = {
  btc: { totalPortfolioValue: '1,200 BTC', totalRealEstateValue: '500 BTC', totalArtValue: '300 BTC', totalPreciousMetalsValue: '400 BTC' },
  eth: { totalPortfolioValue: '2,000 ETH', totalRealEstateValue: '800 ETH', totalArtValue: '500 ETH', totalPreciousMetalsValue: '700 ETH' },
  usdt: { totalPortfolioValue: '1,500 USDT', totalRealEstateValue: '600 USDT', totalArtValue: '400 USDT', totalPreciousMetalsValue: '500 USDT' },
  bnb: { totalPortfolioValue: '1,800 BNB', totalRealEstateValue: '700 BNB', totalArtValue: '450 BNB', totalPreciousMetalsValue: '550 BNB' },
  ada: { totalPortfolioValue: '1,100 ADA', totalRealEstateValue: '450 ADA', totalArtValue: '350 ADA', totalPreciousMetalsValue: '400 ADA' },
  dot: { totalPortfolioValue: '1,300 DOT', totalRealEstateValue: '550 DOT', totalArtValue: '400 DOT', totalPreciousMetalsValue: '500 DOT' }
};

const tokenIcons = { btc: Btc, eth: Eth, usdt: Usdt, bnb: Bnb, ada: Ada, dot: Dot };
const tokenOptions = [ { value: 'btc', label: 'Bitcoin (BTC)' }, { value: 'eth', label: 'Ethereum (ETH)' }, { value: 'usdt', label: 'Tether (USDT)' }, { value: 'bnb', label: 'Binance Coin (BNB)' }, { value: 'ada', label: 'Cardano (ADA)' }, { value: 'dot', label: 'Polkadot (DOT)' } ];

export default function UserReports() {
  const [selectedTokenFrom, setSelectedTokenFrom] = useState('btc');
  const [selectedTokenTo, setSelectedTokenTo] = useState('eth');
  const [amount, setAmount] = useState('');
  const [destinationAddress, setDestinationAddress] = useState('');
  const [depositAddress, setDepositAddress] = useState(null);
  const [isDirectTrade, setIsDirectTrade] = useState(false); // Flag for direct vault trades
  const toast = useToast();

  const handleExchange = async () => {
    if (!amount || isNaN(amount) || amount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount to exchange.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    try {
      if (isDirectTrade) {
        // Direct Vault Trade
        await executeDirectVaultTrade(selectedTokenFrom, selectedTokenTo, amount, destinationAddress);
        toast({
          title: "Trade Successful",
          description: `Direct vault trade executed: ${amount} ${selectedTokenFrom} to ${selectedTokenTo}.`,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      } else {
        // Open Deposit Channel and Execute Swap
        const depositResponse = await openDepositChannel(selectedTokenFrom, amount, 'DestinationChainName', destinationAddress); // Replace 'DestinationChainName' with actual chain
        setDepositAddress(depositResponse.address); // Save the deposit address
        
        // Generate deposit address and execute swap
        await generateDepositAddress(selectedTokenFrom, amount);
        await executeSwap(selectedTokenFrom, selectedTokenTo, amount);

        toast({
          title: "Exchange Successful",
          description: `Successfully exchanged ${amount} ${selectedTokenFrom} to ${selectedTokenTo}. Deposit address: ${depositResponse.address}`,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Exchange Failed",
        description: "There was an error processing your exchange. Please try again later.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3, "2xl": 4 }} gap='20px' mb='20px'>
        <MiniStatistics
          name='Total Portfolio Value'
          value={values[selectedTokenFrom].totalPortfolioValue}
          tokenOptions={tokenOptions}
          selectedToken={selectedTokenFrom}
          onTokenChange={(e) => setSelectedTokenFrom(e.target.value)}
          tokenIcon={tokenIcons[selectedTokenFrom]}
        />
        <MiniStatistics
          name='Total Real Estate Value'
          value={values[selectedTokenFrom].totalRealEstateValue}
          tokenOptions={tokenOptions}
          selectedToken={selectedTokenFrom}
          onTokenChange={(e) => setSelectedTokenFrom(e.target.value)}
          tokenIcon={tokenIcons[selectedTokenFrom]}
        />
        <MiniStatistics
          name='Total Art Value'
          value={values[selectedTokenFrom].totalArtValue}
          tokenOptions={tokenOptions}
          selectedToken={selectedTokenFrom}
          onTokenChange={(e) => setSelectedTokenFrom(e.target.value)}
          tokenIcon={tokenIcons[selectedTokenFrom]}
        />
        <MiniStatistics
          name='Total Precious Metals Value'
          value={values[selectedTokenFrom].totalPreciousMetalsValue}
          tokenOptions={tokenOptions}
          selectedToken={selectedTokenFrom}
          onTokenChange={(e) => setSelectedTokenFrom(e.target.value)}
          tokenIcon={tokenIcons[selectedTokenFrom]}
        />
      </SimpleGrid>

      <Box mb='20px'>
        <Text fontSize='xl' mb='4'>Exchange Tokens</Text>
        <Select placeholder='From Token' value={selectedTokenFrom} onChange={(e) => setSelectedTokenFrom(e.target.value)}>
          {tokenOptions.map(token => (
            <option key={token.value} value={token.value}>{token.label}</option>
          ))}
        </Select>
        <Select placeholder='To Token' value={selectedTokenTo} onChange={(e) => setSelectedTokenTo(e.target.value)} mt='4'>
          {tokenOptions.map(token => (
            <option key={token.value} value={token.value}>{token.label}</option>
          ))}
        </Select>
        <Input placeholder='Amount' type='number' value={amount} onChange={(e) => setAmount(e.target.value)} mt='4' />
        <Input placeholder='Destination Address' value={destinationAddress} onChange={(e) => setDestinationAddress(e.target.value)} mt='4' />
        <Button onClick={handleExchange} colorScheme='blue' mt='4'>Exchange</Button>
        <Button onClick={() => setIsDirectTrade(!isDirectTrade)} colorScheme='teal' mt='4' ml='4'>
          {isDirectTrade ? 'Switch to Deposit Channel' : 'Switch to Direct Vault Trade'}
        </Button>
        {depositAddress && <Text mt='4'>Deposit Address: {depositAddress}</Text>}
      </Box>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3, "2xl": 4 }} gap='20px'>
        <HistoricalPerformance />
        <WeeklyRevenue />
        <TokenizedAssetsTable />
        <TransactionHistory />
        <TopHoldings h='100%' minW='100%' selectRange={false} />
      </SimpleGrid>
    </Box>
  );
}

