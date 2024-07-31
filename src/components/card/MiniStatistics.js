// MiniStatistics.js
import React from 'react';
import { Box, Text, Flex, Avatar, Select, useColorModeValue } from '@chakra-ui/react';
import IconBox from 'components/icons/IconBox';

const MiniStatistics = ({ 
  name, 
  value, 
  tokenOptions, 
  selectedToken, 
  onTokenChange,
  tokenIcon 
}) => {
  const brandColor = useColorModeValue('brand.500', 'white');

  return (
    <Box p='20px' bg='white' borderRadius='15px' boxShadow='md'>
      <Flex align='center' justify='space-between' mb='10px'>
        <IconBox
          w='56px'
          h='56px'
          icon={<Avatar src={tokenIcon} w='32px' h='32px' />}
        />
        <Select
          variant='outline'
          mt='5px'
          me='0px'
          value={selectedToken}
          onChange={onTokenChange}
          size='sm'
        >
          {tokenOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </Flex>
      <Text fontSize='sm' color='gray.500'>
        {name}
      </Text>
      <Text fontSize='xl' color={brandColor} fontWeight='bold'>
        {value}
      </Text>
    </Box>
  );
};

export default MiniStatistics;
