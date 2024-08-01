import React, { useState } from 'react';
import { Box, Button, Image, Text, useDisclosure } from '@chakra-ui/react';
import { NFT } from 'components/card/NFT'; // Import your NFT component

const NFTModal = ({ nft, isOpen, onClose }) => (
  <Box>
    {/* Modal Content */}
    <Box p='20px'>
      <Image src={nft.image} alt={nft.name} boxSize='300px' />
      <Text fontSize='2xl' fontWeight='700'>{nft.name}</Text>
      <Text fontSize='xl'>Author: {nft.author}</Text>
      <Text fontSize='lg'>Current Bid: {nft.currentbid}</Text>
      <Button mt='20px' colorScheme='blue' onClick={onClose}>Close</Button>
    </Box>
  </Box>
);

export default NFTModal;
