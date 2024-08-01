import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import Card from "components/card/Card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import Btc from "assets/img/icons/btc.png";
import Eth from "assets/img/icons/eth.png";
import Usdt from "assets/img/icons/usdt.png";
import Bnb from "assets/img/icons/bnb.png";
import Ada from "assets/img/icons/ada.png";
import Dot from "assets/img/icons/dot.png";

const tokenData = [
  { name: 'Jan', BTC: 32000, ETH: 2000, USDT: 1, BNB: 300, ADA: 1.2, DOT: 7 },
  { name: 'Feb', BTC: 34000, ETH: 2200, USDT: 1, BNB: 320, ADA: 1.5, DOT: 8 },
  { name: 'Mar', BTC: 36000, ETH: 2400, USDT: 1, BNB: 340, ADA: 1.7, DOT: 9 },
  // Add more data as needed
];

const tokenOptions = [
  { value: 'BTC', label: 'Bitcoin', icon: Btc },
  { value: 'ETH', label: 'Ethereum', icon: Eth },
  { value: 'USDT', label: 'Tether', icon: Usdt },
  { value: 'BNB', label: 'Binance Coin', icon: Bnb },
  { value: 'ADA', label: 'Cardano', icon: Ada },
  { value: 'DOT', label: 'Polkadot', icon: Dot },
];

const exchangeRates = {
  BTC: 32000,
  ETH: 2000,
  USDT: 1,
  BNB: 300,
  ADA: 1.2,
  DOT: 7,
};

export default function SwapComponent({ onSwap }) {
  const [fromToken, setFromToken] = useState("BTC");
  const [toToken, setToToken] = useState("ETH");
  const [amount, setAmount] = useState("");
  const [isSwapping, setIsSwapping] = useState(false);
  const toast = useToast();

  const handleSwap = () => {
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      toast({
        title: 'Invalid Amount',
        description: 'Please enter a valid amount to swap.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    const fromRate = exchangeRates[fromToken];
    const toRate = exchangeRates[toToken];
    const swapAmount = parseFloat(amount);
    const swappedAmount = (swapAmount * fromRate) / toRate;

    setIsSwapping(true);
    setTimeout(() => {
      setIsSwapping(false);
      onSwap(fromToken, toToken, swapAmount, swappedAmount); // Notify parent component of the swap
      toast({
        title: 'Swap Successful',
        description: `Swapped ${swapAmount} ${fromToken} to ${swappedAmount.toFixed(4)} ${toToken}.`,
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    }, 2000); // Simulate a 2 second delay
  };

  return (
    <Card p="20px" boxShadow="md">
      <Text fontSize="2xl" fontWeight="bold" mb="20px">
        Token Swap
      </Text>

      <Flex mb="20px" gap="20px">
        <FormControl flex="1">
          <FormLabel>From Token</FormLabel>
          <Select value={fromToken} onChange={(e) => setFromToken(e.target.value)}>
            {tokenOptions.map((option) => (
              <option key={option.value} value={option.value}>
                <Flex align="center">
                  <img src={option.icon} alt={option.label} width="20" style={{ marginRight: '8px' }} />
                  {option.label} ({option.value})
                </Flex>
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl flex="1">
          <FormLabel>To Token</FormLabel>
          <Select value={toToken} onChange={(e) => setToToken(e.target.value)}>
            {tokenOptions.map((option) => (
              <option key={option.value} value={option.value}>
                <Flex align="center">
                  <img src={option.icon} alt={option.label} width="20" style={{ marginRight: '8px' }} />
                  {option.label} ({option.value})
                </Flex>
              </option>
            ))}
          </Select>
        </FormControl>
      </Flex>

      <FormControl mb="20px">
        <FormLabel>Amount</FormLabel>
        <Input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
        />
      </FormControl>

      <Button colorScheme="blue" onClick={handleSwap} disabled={isSwapping}>
        {isSwapping ? <Spinner size="sm" /> : 'Swap'}
      </Button>

      <Box mt="40px">
        <Text fontSize="xl" fontWeight="bold" mb="20px">
          Token Price History
        </Text>
        <Card p="20px" boxShadow="md">
          <LineChart width={600} height={300} data={tokenData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey={fromToken} stroke="#8884d8" />
            <Line type="monotone" dataKey={toToken} stroke="#82ca9d" />
          </LineChart>
        </Card>
      </Box>
    </Card>
  );
}
