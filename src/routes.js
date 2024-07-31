import React from "react";
import { Icon } from "@chakra-ui/react";
import {
  MdDashboard,
  MdWallet,
  MdHome,
  MdArtTrack,
  MdAttachMoney,
  MdHouse,
  MdOutlineBarChart,
  MdShoppingCart
} from "react-icons/md";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import Wallet from "views/admin/wallet";
import Transactions from "views/admin/Transactions";
import RealEstate from "views/admin/RealEstate";
import Art from "views/admin/Art";
import PreciousMetals from "views/admin/PreciousMetals";
import Analytics from "views/admin/Analytics";

const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "/default",
    icon: <Icon as={MdDashboard} width='20px' height='20px' color='inherit' />,
    component: MainDashboard,
  },
  {
    name: "Wallet",
    layout: "/admin",
    path: "/wallet",
    icon: <Icon as={MdWallet} width='20px' height='20px' color='inherit' />,
    component: Wallet,
    secondary: true,
  },
  {
    name: "Transactions",
    layout: "/admin",
    path: "/Transactions",
    icon: <Icon as={MdAttachMoney} width='20px' height='20px' color='inherit' />,
    component: Transactions,
    secondary: true,

  },
  {
    name: "Marketplace",
    layout: "/admin",
    path: "/nft-marketplace",
    icon: <Icon as={MdShoppingCart} width='20px' height='20px' color='inherit' />,
    component: NFTMarketplace,
    secondary: true,
  },
  {
    name: "Real Estate",
    layout: "/admin",
    path: "/RealEstate",
    icon: <Icon as={MdHouse} width='20px' height='20px' color='inherit' />,
    component: RealEstate,
    secondary: true,

  },
  {
    name: "Art",
    layout: "/admin",
    path: "/Art",
    icon: <Icon as={MdArtTrack} width='20px' height='20px' color='inherit' />,
    component: Art,
  },
  {
    name: "Precious Metals",
    layout: "/admin",
    path: "/PreciousMetals",
    icon: <Icon as={MdOutlineBarChart} width='20px' height='20px' color='inherit' />,
    component: PreciousMetals,
  },
  {
    name: "Analytics",
    layout: "/admin",
    path: "/Analytics",
    icon: <Icon as={MdOutlineBarChart} width='20px' height='20px' color='inherit' />,
    component: Analytics,
  },
];

export default routes;
