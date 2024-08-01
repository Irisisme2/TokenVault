import React, { useState } from 'react';
import { Box, SimpleGrid } from '@chakra-ui/react';
import MiniStatistics from 'components/card/MiniStatistics';
import HistoricalPerformance from 'views/admin/default/components/HistoricalPerformance';
import TokenizedAssetsTable from 'views/admin/default/components/TokenizedAssetsTable';
import TransactionHistory from 'views/admin/default/components/TransactionHistory';
import TopHoldings from 'views/admin/default/components/TopHoldings';
import ChartsAndReports from 'views/admin/default/components/ChartsAndReports';
import SwapComponent from 'views/admin/default/components/SwapComponent';
import Btc from 'assets/img/icons/btc.png'; // Bitcoin icon
import Eth from 'assets/img/icons/eth.png'; // Ethereum icon
import Usdt from 'assets/img/icons/usdt.png'; // Tether icon
import Bnb from 'assets/img/icons/bnb.png'; // Binance Coin icon
import Ada from 'assets/img/icons/ada.png'; // Cardano icon
import Dot from 'assets/img/icons/dot.png'; // Polkadot icon

const values = {
  btc: {
    totalPortfolioValue: '1,200 BTC',
    totalRealEstateValue: '500 BTC',
    totalArtValue: '300 BTC',
    totalPreciousMetalsValue: '400 BTC',
  },
  eth: {
    totalPortfolioValue: '2,000 ETH',
    totalRealEstateValue: '800 ETH',
    totalArtValue: '500 ETH',
    totalPreciousMetalsValue: '700 ETH',
  },
  usdt: {
    totalPortfolioValue: '1,500 USDT',
    totalRealEstateValue: '600 USDT',
    totalArtValue: '400 USDT',
    totalPreciousMetalsValue: '500 USDT',
  },
  bnb: {
    totalPortfolioValue: '1,800 BNB',
    totalRealEstateValue: '700 BNB',
    totalArtValue: '450 BNB',
    totalPreciousMetalsValue: '550 BNB',
  },
  ada: {
    totalPortfolioValue: '1,100 ADA',
    totalRealEstateValue: '450 ADA',
    totalArtValue: '350 ADA',
    totalPreciousMetalsValue: '400 ADA',
  },
  dot: {
    totalPortfolioValue: '1,300 DOT',
    totalRealEstateValue: '550 DOT',
    totalArtValue: '400 DOT',
    totalPreciousMetalsValue: '500 DOT',
  }
};

const tokenIcons = {
  btc: Btc,
  eth: Eth,
  usdt: Usdt,
  bnb: Bnb,
  ada: Ada,
  dot: Dot,
};

const tokenOptions = [
  { value: 'btc', label: 'Bitcoin (BTC)' },
  { value: 'eth', label: 'Ethereum (ETH)' },
  { value: 'usdt', label: 'Tether (USDT)' },
  { value: 'bnb', label: 'Binance Coin (BNB)' },
  { value: 'ada', label: 'Cardano (ADA)' },
  { value: 'dot', label: 'Polkadot (DOT)' },
];

export default function UserReports() {
  const [selectedTokenPortfolio, setSelectedTokenPortfolio] = useState('btc');
  const [selectedTokenRealEstate, setSelectedTokenRealEstate] = useState('btc');
  const [selectedTokenArt, setSelectedTokenArt] = useState('btc');
  const [selectedTokenPreciousMetals, setSelectedTokenPreciousMetals] = useState('btc');

  const [valuesState, setValuesState] = useState(values);

  const handleTokenChange = (setter) => (e) => {
    setter(e.target.value);
  };

  const handleSwap = (fromToken, toToken, amount, swappedAmount) => {
    setValuesState(prevValues => {
      const updatedValues = { ...prevValues };

      const fromTokenData = updatedValues[fromToken] || {
        totalPortfolioValue: '0',
        totalRealEstateValue: '0',
        totalArtValue: '0',
        totalPreciousMetalsValue: '0',
      };
      const toTokenData = updatedValues[toToken] || {
        totalPortfolioValue: '0',
        totalRealEstateValue: '0',
        totalArtValue: '0',
        totalPreciousMetalsValue: '0',
      };

      updatedValues[fromToken] = {
        ...fromTokenData,
        totalPortfolioValue: (parseFloat(fromTokenData.totalPortfolioValue) - amount).toFixed(2) + ` ${fromToken.toUpperCase()}`
      };

      updatedValues[toToken] = {
        ...toTokenData,
        totalPortfolioValue: (parseFloat(toTokenData.totalPortfolioValue) + swappedAmount).toFixed(2) + ` ${toToken.toUpperCase()}`
      };

      return updatedValues;
    });
  };

  const { totalRealEstateValue = '0', totalArtValue = '0', totalPreciousMetalsValue = '0' } = valuesState[selectedTokenRealEstate] || {};

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3, "2xl": 4 }} gap='20px' mb='20px'>
        <MiniStatistics
          name='Total Portfolio Value'
          value={valuesState[selectedTokenPortfolio]?.totalPortfolioValue || '0'}
          tokenOptions={tokenOptions}
          selectedToken={selectedTokenPortfolio}
          onTokenChange={handleTokenChange(setSelectedTokenPortfolio)}
          tokenIcon={tokenIcons[selectedTokenPortfolio]}
        />
        <MiniStatistics
          name='Total Real Estate Value'
          value={totalRealEstateValue}
          tokenOptions={tokenOptions}
          selectedToken={selectedTokenRealEstate}
          onTokenChange={handleTokenChange(setSelectedTokenRealEstate)}
          tokenIcon={tokenIcons[selectedTokenRealEstate]}
        />
        <MiniStatistics
          name='Total Art Value'
          value={totalArtValue}
          tokenOptions={tokenOptions}
          selectedToken={selectedTokenArt}
          onTokenChange={handleTokenChange(setSelectedTokenArt)}
          tokenIcon={tokenIcons[selectedTokenArt]}
        />
        <MiniStatistics
          name='Total Precious Metals Value'
          value={totalPreciousMetalsValue}
          tokenOptions={tokenOptions}
          selectedToken={selectedTokenPreciousMetals}
          onTokenChange={handleTokenChange(setSelectedTokenPreciousMetals)}
          tokenIcon={tokenIcons[selectedTokenPreciousMetals]}
        />
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px' mb='20px'>
        <HistoricalPerformance />
        <SwapComponent onSwap={handleSwap} />
      </SimpleGrid>
      <SimpleGrid gap='20px' mb='20px'>
        <ChartsAndReports />
        <TokenizedAssetsTable />
        <TransactionHistory />
        <TopHoldings h='100%' minW='100%' selectRange={false} />
      </SimpleGrid>
    </Box>
  );
}
