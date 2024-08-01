import React from "react";

// Chakra imports
import {
  Box,
  Button,
  Flex,
  Grid,
  Link,
  Text,
  useColorModeValue,
  SimpleGrid,
} from "@chakra-ui/react";

// Custom components
import Banner from "views/admin/marketplace/components/Banner";
import HistoryItem from "views/admin/marketplace/components/HistoryItem";
import NFT from "components/card/NFT";
import Card from "components/card/Card.js";

// Assets
import Property1 from "assets/img/properties/Property1.png";
import Property2 from "assets/img/properties/Property2.png";
import Property3 from "assets/img/properties/Property3.png";
import Property4 from "assets/img/properties/Property4.png";
import Property5 from "assets/img/properties/Property5.png";
import Property6 from "assets/img/properties/Property6.png";
import Avatar1 from "assets/img/avatars/avatar1.png";
import Avatar2 from "assets/img/avatars/avatar2.png";
import Avatar3 from "assets/img/avatars/avatar3.png";
import Avatar4 from "assets/img/avatars/avatar4.png";
import Art1 from "assets/img/art/Art1.png";
import Art2 from "assets/img/art/Art2.png";
import Art3 from "assets/img/art/Art3.png";
import Metal1 from "assets/img/metals/Metal1.png";
import Metal2 from "assets/img/metals/Metal2.png";
import Metal3 from "assets/img/metals/Metal3.png";

export default function Marketplace() {
  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorBrand = useColorModeValue("brand.500", "white");

  return (
    <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
      {/* Main Fields */}
      <Grid
        mb='20px'
        gridTemplateColumns={{ xl: "repeat(3, 1fr)", "2xl": "1fr 0.46fr" }}
        gap={{ base: "20px", xl: "20px" }}
        display={{ base: "block", xl: "grid" }}>
        <Flex
          flexDirection='column'
          gridArea={{ xl: "1 / 1 / 2 / 3", "2xl": "1 / 1 / 2 / 2" }}>
          <Banner />
          <Flex direction='column'>
            <Text
              mt='45px'
              mb='36px'
              color={textColor}
              fontSize='2xl'
              ms='24px'
              fontWeight='700'>
              Real Estate Assets
            </Text>
            <SimpleGrid columns={{ base: 1, md: 3 }} gap='20px'>
              <NFT
                name='Modern Villa'
                author='By John Doe'
                bidders={[Avatar1, Avatar2, Avatar3, Avatar4]}
                image={Property5}
                currentbid='$1.5M'
                download='#'
              />
              <NFT
                name='Luxury Penthouse'
                author='By Jane Smith'
                bidders={[Avatar1, Avatar2, Avatar3, Avatar4]}
                image={Property1}
                currentbid='$2.3M'
                download='#'
              />
              <NFT
                name='Suburban House'
                author='By Michael Lee'
                bidders={[Avatar1, Avatar2, Avatar3, Avatar4]}
                image={Property2}
                currentbid='$3.2M'
                download='#'
              />
            </SimpleGrid>

            {/* Art NFTs */}
            <Text
              mt='45px'
              mb='36px'
              color={textColor}
              fontSize='2xl'
              ms='24px'
              fontWeight='700'>
              Art Assets
            </Text>
            <SimpleGrid columns={{ base: 1, md: 3 }} gap='20px'>
              <NFT
                name='Van gogh'
                author='By Esthera Jackson'
                bidders={[Avatar1, Avatar2, Avatar3, Avatar4]}
                image={Art1}
                currentbid='1.2 ETH'
                download='#'
              />
              <NFT
                name='Beksinski'
                author='By Nick Wilson'
                bidders={[Avatar1, Avatar2, Avatar3, Avatar4]}
                image={Art2}
                currentbid='2.5 ETH'
                download='#'
              />
              <NFT
                name='Matejko'
                author='By Will Smith'
                bidders={[Avatar1, Avatar2, Avatar3, Avatar4]}
                image={Art3}
                currentbid='0.9 ETH'
                download='#'
              />
            </SimpleGrid>

            {/* Precious Metals NFTs */}
            <Text
              mt='45px'
              mb='36px'
              color={textColor}
              fontSize='2xl'
              ms='24px'
              fontWeight='700'>
              Precious Metals
            </Text>
            <SimpleGrid columns={{ base: 1, md: 3 }} gap='20px'>
              <NFT
                name='Gold Bullion'
                author='By Peter Williams'
                bidders={[Avatar1, Avatar2, Avatar3, Avatar4]}
                image={Metal1}
                currentbid='1200 USDT '
                download='#'
              />
              <NFT
                name='Silver Bar'
                author='By Emma Johnson'
                bidders={[Avatar1, Avatar2, Avatar3, Avatar4]}
                image={Metal2}
                currentbid='$100 USDT'
                download='#'
              />
              <NFT
                name='Platinum Coin'
                author='By Linda Davis'
                bidders={[Avatar1, Avatar2, Avatar3, Avatar4]}
                image={Metal3}
                currentbid='15000 USDT'
                download='#'
              />
            </SimpleGrid>
          </Flex>
        </Flex>
        <Flex
          flexDirection='column'
          gridArea={{ xl: "1 / 3 / 2 / 4", "2xl": "1 / 2 / 2 / 3" }}>
          <Card p='0px'>
            <Flex
              align={{ sm: "flex-start", lg: "center" }}
              justify='space-between'
              w='100%'
              px='22px'
              py='18px'>
              <Text color={textColor} fontSize='xl' fontWeight='600'>
                History
              </Text>
              <Button variant='action'>See all</Button>
            </Flex>

            <HistoryItem
              name='Miami Villa'
              author='By Mark Benjamin'
              date='30s ago'
              image={Property5}
              price='70 ETH'
            />
            <HistoryItem
              name='Boston Apartment'
              author='By Esthera Jackson'
              date='58s ago'
              image={Property1}
              price='11 BTC'
            />
            <HistoryItem
              name='1 oz coin'
              author='By Nick Wilson'
              date='1m ago'
              image={Metal1}
              price='0.91 ETH'
            />
            <HistoryItem
              name='Van gogh'
              author='By Peter Will'
              date='1m ago'
              image={Art1}
              price='1 BTC'
            />
            <HistoryItem
              name='Los angeles office '
              author='By Will Smith'
              date='2m ago'
              image={Property3}
              price='361 ETH'
            />
            <HistoryItem
              name='Yorkshire Castle'
              author='By Manny Gates'
              date='3m ago'
              image={Property6}
              price='121 ETH'
            />
          </Card>
        </Flex>
      </Grid>
      {/* Delete Product */}
    </Box>
  );
}
