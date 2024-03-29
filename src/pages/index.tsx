import "@fortawesome/fontawesome-free/css/all.css";
import { Meta } from "@/layout/Meta";
import { Main } from "@/templates/Main";
import React, { useEffect, useState } from "react";
import _ from "lodash";
import Layout from "@/components/Layout";
// import { ToolCard } from "@/components/ToolCard";
import SortableGrid from "@/components/SortableGrid";
// import {
//   FireIcon,
//   HomeIcon,
//   InboxIcon,
//   UserIcon,
// } from "@heroicons/react/outline";

import StakingIcon from "../styles/icons/StakingIcon";
import HomeIcon from "../styles/icons/HomeIcon";
import AuctionsIcon from "../styles/icons/AuctionsIcon";
import RafflesIcon from "../styles/icons/RafflesIcon";

// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";

import router from "next/router";
import { getCookie, setCookie } from "cookies-next";
import axios from "axios";


const Index = () => {
  const [typeTools, settypeTools] = useState("Free tools");
  //@ts-ignore
  const [jwt, setjwt] = useState(getCookie("jwt"));
  const [filterInput, setFilterInput] = useState("");
  const [freeTools, setFreeTools] = useState<any[]>([]);
  const [holderTools, setHolderTools] = useState<any[]>([]);
  const [gameTools, setGameTools] = useState<any[]>([]);
  const [discountTools, setDiscountTools] = useState<any[]>([]);
  const [educationTools, setEducationTools] = useState<any[]>([]);

  const handleFilterChange = (event: any) => {
    setFilterInput(event.target.value);
  }

  const tools = [
    {
      name: "Hyperspace",
      description:
        "Solana's best NFT marketplace. Save money sweeping floors by buying across all marketplaces at once.",
      icon: "https://hyperspace.xyz/apple-touch-icon.png",
      twitter: "https://twitter.com/hyperspacexyz",
      discord: "https://discord.gg/3bh6CX5vU6",
      website: "https://hyperspace.xyz/collection/supportivedudes",
      category: "Marketplace,Aggregator,Portfolio Tracker",
      from: "#3C69F7",
      to: "#18317B",
    },
    {
      name: "Hadeswap",
      description:
        "The most efficient & decentralized NFT trading platform that act as an Automated Market Maker (AMM) NFT marketplace that improves NFT liquidity and its trading experience.",
      icon: "data:image/jpeg;base64,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",
      twitter: "https://twitter.com/hadeswap",
      discord: "https://discord.com/invite/hadeswap",
      website: "https://app.hadeswap.com/trade/supportive_dude",
      category: "AMM,Marketplace",
      from: "#2B2263",
      to: "#7B72B0",
    },
    {
      name: "Jupiter Aggregator",
      description:
        "The best swap aggregator & infrastructure for Solana - powering best price, token selection and UX for all users and devs.",
      icon: "data:image/jpeg;base64,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",
      twitter: "https://twitter.com/JupiterExchange",
      discord: "http://discord.gg/jup",
      website: "https://jup.ag",
      category: "DEX",
      from: "#14171F",
      to: "#2B3039",
    },
    {
      name: "Famous Fox Federation",
      description:
        "The Famous Fox Federation, an independent organization of the most fabulously famous foxes on the Blockchain. Enjoy a multitude of tools for users and owners",
      icon: "https://famousfoxes.com/logo.b8610686.svg",
      twitter: "https://twitter.com/FamousFoxFed",
      discord: "https://discord.com/invite/famousfoxes",
      website: "https://famousfoxes.com/",
      category: "Marketplace,Token Market,Utility Tools",
      from: "#FF7612",
      to: "#974D09",
    },
{
      name: "Dandies V.A.G",
      description:"This application can be used to generate vanity addresses for use with Solana programs, such as SPL tokens, NFTs, or wallet addresses. It is intended to provide a fun and personalised address for you.",
      icon: "https://pbs.twimg.com/profile_images/1592519546753241088/Ys4YwMl4_400x400.jpg",
      discord:"#",
      website: "https://vanity.dandies.xyz/",
      category: "KeyGen",
      from: "#F0F0F0",
      to: "#191919",
    },
    {
      name: "Coin360",
      description:"Watch the heatmap of cryptocurrency prices, market capitalizations, and volumes",
      icon: "https://www.pngall.com/wp-content/uploads/10/Solana-Crypto-Logo-PNG-File.png",
      discord:"#",
      website: "https://coin360.com/coin/solana-sol",
      category: "Charts",
      from: "#1BCDD5",
      to: "#D51BCA",
    },
    {
      name: "Magic Eden",
      description:
        "Magic Eden is the leading NFT Marketplace on Solana. Home to the next generation of digital creators. Discover the best and latest Solana NFT collections.",
      icon: "https://yt3.ggpht.com/HRtpijPgB6rijcMFphGjxEUb5QGFdGFpLVzE_harHbuAi-7VP0S8-2ihkRxF8okOkZo2_yINBw=s900-c-k-c0x00ffffff-no-rj",
      twitter: "https://twitter.com/MagicEden",
      discord: "https://discord.com/invite/magiceden",
      website: "https://magiceden.io/creators/dudes",
      category: "Marketplace,Analytics,Launchpad",
      from: "#950BC6",
      to: "#B657A9",
    },
    {
      name: "Phantom",
      description:
        "Phantom makes it safe & easy for you to store, buy, send, receive, swap tokens and collect NFTs on the Solana blockchain. Coming to Ethereum and Polygon soon!",
      icon: "https://pbs.twimg.com/profile_images/1394116783792025603/jTMcoZRY_400x400.jpg",
      twitter: "https://twitter.com/phantom",
      discord: "https://discord.com/invite/phantom",
      website: "https://phantom.app/",
      category: "Wallet",
      from: "#4024DE",
      to: "#CFC9F3",
    },
{
      name: "BackPack",
      description:
        "The home for your xNFTs. Apply for the beta and claim your name http://backpack.app/download",
      icon: "https://pbs.twimg.com/profile_images/1593111895195762690/1fS4-upH_400x400.jpg",
      twitter: "https://twitter.com/xNFT_Backpack",
      discord: "https://discord.gg/RfwUqWrn7T",
      website: "backpack.app/download",
      category: "Wallet",
      from: "#f72435",
      to: "#000000",
    },
    {
      name: "Elixir",
      description:
        "Elixir is an ecosystem of NFT utility. The Elixir App is powered by AMM pools which encompass a hub of NFT financialization. The Elixir App is just one of the core products stemming from the Elixir ecosystem.",
      icon: "https://pbs.twimg.com/profile_images/1618643252302778368/nsTmlFb-_400x400.jpg",
      twitter: "https://twitter.com/ElixirNFT",
      discord: "https://discord.com/invite/elixirnft",
      website: "https://app.elixirnft.io/",
      category: "AMM,Marketplace,Lend/Borrow",
      from: "#FFE3FF",
      to: "#C66BEE",
    },
    {
      name: "Mercury",
      description:
        "Mercury is a platform created by Blocksmith Labs providing updates on new projects, WL meta management tools, raffles, auctions and other features.",
      icon: "https://icoholder.com/files/img/462aa3e8c91a2615c7f5414be5cd651a.jpeg",
      twitter: "https://twitter.com/BlocksmithLabs",
      discord: "https://discord.com/invite/blocksmithlabs",
      website: "https://mercury.blocksmithlabs.io/",
      category: "WL Gestion",
      from: "#201B01",
      to: "#FF29E8",
    },
    {
      name: "HelloMoon",
      description: "Solana DeFi & NFT analytics",
      icon: "data:image/png;base64,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",
      twitter: "https://twitter.com/HelloMoon_io",
      discord: "discord.gg/hellomoon",
      website: "https://www.hellomoon.io/nfts/top-projects",
      category: "Portfolio Tracker,Analytics",
      from: "#865AEE",
      to: "#B03AA8",
    },
    {
      name: "SolSniper.xyz",
      description:
        "SolSniper is a free Solana NFT analytics and trading tool that outlines trending collections and popular searches, indicating what’s receiving attention amongst the broader community. One of the best features about SolSniper is that it includes multifaceted trading charts with built-in tools that allows for technical analysis. ",
      icon: "https://www.solsniper.xyz/images/solsniper.png",
      twitter: "https://twitter.com/solsniperxyz",
      discord: "https://discord.com/invite/3zbckERyff",
      website: "https://www.solsniper.xyz/collection/supportive_dude",
      category: "Analytics,Portfolio Tracker",
      from: "#7541ED",
      to: "#4B0375",
    },
    {
      name: "Sol Incinerator",
      description: "Burn any unwanted NFTs or tokens and reclaim the rent ",
      icon: "https://www.sol-incinerator.com/favicon.ico",
      twitter: "https://twitter.com/solincinerator",
      discord: "https://t.co/sEMlHXclDR",
      website: "http://sol-incinerator.com/#/",
      category: "Burner",
      from: "#FF3200",
      to: "#FBD111",
    },
    {
      name: "Metaplex",
      description: "Metaplex is a platform for NFT creators and developers on Solana. The top creators and game studios use Metaplex to create, grow, and engage their communities.",
      icon: "https://global-uploads.webflow.com/6143dddcc9cc40b6339177b7/62a55795e68245d68bdc3e80_vDaw9IxG.jpg",
      twitter: "https://twitter.com/metaplex",
      discord: "https://discord.com/invite/7hfGph2K",
      website: "https://www.metaplex.com/",
      category: "Launchpad,Utility Tools",
      from: "#5E2EAD",
      to: "#000000",
    },
    {
      name: "Atadia",
      description: "Build your on-chain identity & benefit endlessly through Solana's first credit scoring-powered uncollateralised loans and an analytics-driven whitelisting tool.",
      icon: "https://uploads-ssl.webflow.com/61ce513cf689b19dbc7ffdda/61de6a8ad23bc18159efc177_Logo.png",
      twitter: "https://twitter.com/atadia_io",
      discord: "https://discord.com/invite/atadia",
      website: "https://product.atadia.io/",
      category: "Utility Tools,Lender",
      from: "#8F8F8F",
      to: "#D5D5D5",
    },
    {
      name: "Sharky.fi",
      description: "Borrow & Lend against your NFTs, instantly.",
      icon: "https://sharky.fi/sharky.svg",
      twitter: "https://twitter.com/sharkyfi",
      discord: "https://discord.com/invite/sharkyfi",
      website: "https://sharky.fi/",
      category: "Lend/Borrow",
      from: "#262626",
      to: "#FE4A4A",
    },
    {
      name: "Coral Cube",
      description:
        "CoralCube is an NFT marketplace and aggregator that aims to highlight three columns of web3 in the context of NFTs : Easy, transparent and community.",
      icon: "https://pbs.twimg.com/profile_images/1503525138649784333/OrxPGUL4_400x400.jpg",
      twitter: "https://mobile.twitter.com/coralcubenft",
      discord: "https://discord.com/invite/RRETBxvMb2",
      website: "https://coralcube.io/",
      category: "Marketplace,Aggregator",
      from: "#2DB573",
      to: "#0D7744",
    },
    {
      name: "LMNFT.io",
      description: "The largest web-based generative NFT project launchpad.",
      icon: "https://pbs.twimg.com/profile_images/1592614814764916738/ZT5r2Qlk_400x400.jpg",
      twitter: "https://twitter.com/LaunchMyNFT",
      discord: "https://discord.com/invite/KXJzsm4eKk",
      website: "https://launchmynft.io/",
      category: "Launchpad",
      from: "#2B31FF",
      to: "#DDDEFF",
    },
    {
      name: "HowRare.is",
      description:
        "Find out how rare is your Solana NFT.",
      icon: "https://pbs.twimg.com/profile_images/1469349925632811017/tjls0SwZ_400x400.jpg",
      twitter: "https://twitter.com/howrareis",
      discord: "https://discord.com/invite/XWAQzNwn8n",
      website: "https://howrare.is/supportive_dude",
      category: "Rarity",
      from: "#E163F4",
      to: "#DAC623",
    },
    {
      name: "Solscan.io",
      description: "The user-friendly and real-time update Scanning Tool for the Solana ecosystem",
      icon: "https://solscan.io/favicon.png",
      twitter: "https://twitter.com/solscanofficial",
      discord: "http://discord.gg/H8FBqAR8bx",
      website: "https://solscan.io/",
      category: "Explorer",
      from: "#A713F0",
      to: "#1FFCAC",
    },
    {
      name: "SolanaFM",
      description: "Bridging the gaps of data accessibility via our indexer, APIs and explorer tools on Solana.",
      icon: "https://pbs.twimg.com/profile_images/1603277783542558720/m838ShBK_400x400.jpg",
      twitter: "https://twitter.com/solanafm",
      discord: "https://discord.com/invite/QqcBJcf274",
      website: "https://solana.fm/",
      category: "Explorer,Analytics",
      from: "#2C0E63",
      to: "#7D53CA",
    },
    {
      name: "Strata",
      description: "Launch a token in minutes on the Solana blockchain. Zero listing fees.",
      icon: "https://pbs.twimg.com/profile_images/1460988164634558464/HPGE_W7r_400x400.jpg",
      twitter: "https://twitter.com/StrataProtocol",
      discord: "https://discord.gg/XQhCFg77WM",
      website: "https://app.strataprotocol.com/launchpad",
      category: "Launchpad,Token Creation",
      from: "#F27633",
      to: "#0C5CBD",
    },
    {
      name: "Rentii",
      description: "Rentii is the NFT renting marketplace.",
      icon: "https://d1fdloi71mui9q.cloudfront.net/xDTY9bWAQO8EVrxOzo9X_yVupir1FAMzqjXmn",
      twitter: "https://twitter.com/Rentii_NFT",
      discord: "http://discord.gg/rentiirebellion",
      website: "https://www.rentii.xyz/",
      category: "Renting",
      from: "#C9C2C2",
      to: "#6A6666",
    },
    {
      name: "Crossmint",
      description: "Making digital assets accessible to all. Create, sell & distribute NFTs in minutes with our APIs, fiat on-ramp & user-friendly wallets - no crypto required.",
      icon: "https://pbs.twimg.com/profile_images/1535656143988707330/Wg16GKQ2_400x400.png",
      twitter: "https://twitter.com/crossmint",
      discord: "https://discord.com/invite/crossmint",
      website: "https://www.crossmint.io/",
      category: "Payment Tool",
      from: "#45C447",
      to: "#092B0A",
    },
    {
      name: "Orca",
      description: "Orca is the easiest, fastest, and most user-friendly cryptocurrency exchange on the Solana blockchain.",
      icon: "https://www.orca.so/static/media/logomark.55072c62035cc78cda4510b2ae9b9a69.svg",
      twitter: "https://twitter.com/orca_so",
      discord: "https://discord.com/invite/nSwGWn5KSG",
      website: "https://www.orca.so/",
      category: "DEX, LP",
      from: "#DCD912",
      to: "#353404",
    },
    {
      name: "Yawww",
      description: "The number #1 OTC Marketplace for Solana NFTs",
      icon: "https://d1fdloi71mui9q.cloudfront.net/YaPRM1YTliyfUSb64cXE_Or3p1vTGQTVPnFrd",
      twitter: "https://twitter.com/yawwwnft",
      discord: "https://discord.com/invite/nSwGWn5KSG",
      website: "https://www.yawww.io/",
      category: "Marketplace,OTC",
      from: "#353404",
      to: "#8CD288",
    },
    {
      name: "ExchangeArt",
      description: "Exchange Art is the leading digital art marketplace on Solana. Browse, create, buy, sell, and auction your artworks.",
      icon: "https://pbs.twimg.com/profile_images/1538859020894838786/vhqI2qxD_400x400.png",
      twitter: "https://twitter.com/exchgART",
      discord: "https://discord.gg/2ambwf3z4A",
      website: "https://exchange.art/",
      category: "Marketplace",
      from: "#F0F0F0",
      to: "#191919",
    },
    {
      name: "Cardinal",
      description: "Cardinal is a Solana Protocol that enables the conditional ownership of NFTs. We're powering the future of NFT utility through royalty enforcement, rentals, subscriptions, staking, tickets and more.",
      icon: "https://s3.amazonaws.com/keybase_processed_uploads/4333ae7c8fa57975e6432bdef31aec05_360_360.jpg",
      twitter: "https://twitter.com/cardinal_labs",
      discord: "https://discord.com/invite/cardinallabs",
      website: "https://www.cardinal.so/",
      category: "Utility Tools,Staking,Royalties Enforcement",
      from: "#751111",
      to: "#1A0404",
    },
    {
      name: "Birdeye",
      description: "View real-time trade data, token price, and gems finder on Solana, plus instant swap with best price.",
      icon: "https://pbs.twimg.com/profile_images/1468800070652887045/swKTrO_m_400x400.jpg",
      twitter: "https://twitter.com/birdeye_so",
      discord: "https://discord.com/invite/WWeVDpT9FK",
      website: "https://birdeye.so/",
      category: "Charts,DEX",
      from: "#E3A412",
      to: "#261D07",
    },
    {
      name: "Diamond Vaults",
      description: "Solana's leading free staking & raffles self-service platform!",
      icon: "https://pbs.twimg.com/profile_images/1536722516412080135/kGcFt_xv_400x400.jpg",
      twitter: "https://twitter.com/DiamondVaults",
      discord: "https://discord.com/invite/gx2b8jTq3q",
      website: "https://diamondvaults.io/",
      category: "Staking,Raffles",
      from: "#59DF77",
      to: "#A9B2AB",
    },
    {
      name: "Moonrank",
      description: "The statistical rarity service for the Solana NFT",
      icon: "https://moonrank.app/static/moonrank_icon.png?1637140874",
      twitter: "#",
      discord: "https://discord.gg/Dv8beXu8pR",
      website: "https://moonrank.app/collection/supportive_dude",
      category: "Rarity",
      from: "#2C0E63",
      to: "#7D53CA",
    },
    {
      name: "OpenBook",
      description: "Solana-based Dex.Trade on the world’s fastest and most powerful decentralized exchange.",
      icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoM5yGWEZ19zG4_MpraafBlE5p9uick1MfeUCztT7jOw&s",
      twitter: "https://twitter.com/openbookdex",
      discord: "https://discord.com/invite/pX3n5Sercb",
      website: "https://www.openbook-solana.com/",
      category: "DEX",
      from: "#661C90",
      to: "#2E0662",
    },
{
      name: "Bonfida Solana Name Service",
      description: "Get your .sol domain that can be used to represent you in the metaverse",
      icon: "https://naming.bonfida.org/assets/white-logo.df40a8e5.svg",
      twitter: "",
      discord: "https://discord.com/invite/J927gF8kaM",
      website: "https://naming.bonfida.org/",
      category: "Naming Service",
      from: "#03001a",
      to: "#0e183c",
    },
{
      name: "ANS Protocol - .ABC Domains",
      description: "Claim your .abc domain",
      icon: "https://pbs.twimg.com/profile_images/1617874905273450496/s9CBuEVM_400x400.jpg",
      twitter: "https://twitter.com/ansprotocol",
      discord: "https://discord.com/invite/AJK53MMd7K",
      website: "https://abc.onsol.io/",
      category: "Naming Service",
      from: "#4ea6c3",
      to: "#34c8ae",
    },
  ];

  const Holderstools = [
 {
      name: "Raven - Raid2Earn",
      description:
        "COMING SOON",
      icon: "https://pbs.twimg.com/profile_images/1570769129443033090/-REx4ItQ_400x400.jpg",
      twitter: "https://twitter.com/RavenBSL",
      discord: "https://discord.com/invite/blocksmithlabs",
      website: "https://t.co/kvNuWOJheJ",
      category: "Raid2Earn",
      from: "#fefe30",
      to: "#161203",
    },
 {
      name: "The Pixel Shop",
      description:
        "COMING SOON",
      icon: "https://pbs.twimg.com/profile_images/1618313883147550720/ayuM4xMJ_400x400.jpg",
      twitter: "https://twitter.com/dudes_sol",
      discord: "https://discord.com/dudessol",
      website: "https://toolidarity.app/",
      category: "Inner Discord, Customization",
      from: "#da5b34",
      to: "#050505",
    },
    {
      name: "Zilla VS Kong",
      description:
        "Get an exclusive access to Zilla vs Kong's Sniper Bot !",
      icon: "https://cdn.discordapp.com/attachments/1011202479171571812/1027961050710155274/j0OYQ1WEgr6TkzKJ3oA4Q-yH3uXv68hH5tyU9Vk3xcA.png",
      twitter: "https://twitter.com/Zilla_VS_Kong",
      discord: "https://discord.com/invite/seyEZ8Ekrt",
      website: "https://snapshots-toolkit.com/home",
      category: "Sniper Bot",
      from: "#D32204",
      to: "#746ADE",
    },
{
      name: "Subber",
      description: "High quality, easy-to-use products for NFT communities. Save time and effort. Connect with your holders.",
      icon: "https://pbs.twimg.com/profile_images/1578148009526714368/GVLnj0Tu_400x400.jpg",
      twitter: "https://twitter.com/subberxyz",
      discord: "https://discord.com/invite/subber",
      website: "https://www.subber.xyz/dudessol",
      category: "WL Gestion",
      from: "#DA1020",
      to: "#1A0103",
    },
    {
      name: "ClaimYourSol",
      description: "Claim your SOL from forgotten empty SPL accounts, 100% legit",
      icon: "https://claimyoursol.com/images/cys-logo.png",
      twitter: "https://twitter.com/claimyoursol",
      discord: "https://discord.gg/A2m4PVXJZz",
      website: "https://claimyoursol.com/SolEddaRity",
      category: "Claim SOL",
      from: "#00F4E9",
      to: "#031593",
    },
    {
      name: "Own-2-Earn by Dudes",
      description:
        "Earn $EDD by holding multiple NFTs and special traits on several NFT collections.",
      icon: "https://st2.depositphotos.com/3491355/7921/v/450/depositphotos_79212646-stock-illustration-diamond-outline-vector-icon-modern.jpg",
      twitter: "https://twitter.com/dudes_sol",
      discord: "https://discord.gg/dudessol",
      website: "https://toolidarity.app",
      category: "Inner Discord,Own-2-Earn",
      from: "#0EFFEA",
      to: "#445D5B",
    },
    {
      name: "{C}IPHER by 313Labs",
      description:
        "Members who apply for Cipherlist will be reviewed and receive a skill-based role within their Discord server.",
      icon: "https://pbs.twimg.com/profile_images/1552350712243580929/KALByWaz_400x400.png",
      twitter: "https://twitter.com/313Labs",
      discord: "#",
      website: "https://313labs.io/",
      category: "Inner Discord,Role Gestion",
      from: "#FF6163",
      to: "#201B01",
    },
    {
      name: "Kalisten",
      description:
        "Use your Supportive Dude to track your workouts, progress your NFT, Train2Earn, and earn $KST that you can directly swap to $USDC.",
      icon: "https://cdn.discordapp.com/attachments/1021030450371772446/1035656455082213456/Kalisten_Logo_Gradient.png",
      twitter: "https://twitter.com/kalisten_",
      discord: "https://discord.com/invite/kalisten",
      website: "https://train.kalisten.app/",
      category: "Train-2-Earn",
      from: "#B09717",
      to: "#FB8028",
    },
    {
      name: "The Castle",
      description:
        "Holders can use their $EDD tokens to claim whitelist roles through Your Majesty by The Castle",
      icon: "https://pbs.twimg.com/profile_images/1584171267111919616/k03rOhRb_400x400.jpg",
      twitter: "https://twitter.com/nft_satori",
      discord: "https://discord.com/invite/castleking",
      website: "https://castle.thekingscastle.io/",
      category: "WL Market",
      from: "#5E5513",
      to: "#DED16A",
    },
    {
      name: "Hub3",
      description:
        "Create a personalized web3 profile, highlight your favorite NFTs, and join whitelists to empower your web3 experience.",
      icon: "https://hub3.ee/favicon.png",
      twitter: "https://twitter.com/hub3ee",
      discord: "https://discord.com/invite/d49SfuhApQ",
      website: "https://hub3.ee/app/collections/soleddarity-",
      category: "WL Gestion,Portfolio Tracker",
      from: "#581A99",
      to: "#4E1D5B",
    },
    {
      name: "Unirexcity",
      description:
        "Spend your $EDD to rename your NFTs! Naming ceremony is the first tool on Solana allowing NFTs to be named",
      icon: "https://pbs.twimg.com/profile_images/1554146782195720195/cCrUFbTU_400x400.jpg",
      twitter: "https://twitter.com/unirexcity",
      discord: "https://discord.com/invite/unirexcity",
      website: "https://naming-ceremony.unirex.city/",
      category: "NFT Renaming",
      from: "#30C132",
      to: "#E7CB1A",
    },
    {
      name: "Parrot",
      description:
        "Access the Portfolio Tracker from Parrot Tools. They are building a Solana NFT Copy Trading Platform. Investors make more profitable trades. Traders make passive income.",
      icon: "https://cdn.discordapp.com/attachments/1011202479171571812/1026491471471329300/125.png",
      twitter: "https://twitter.com/ParrotTools",
      discord: "https://discord.gg/parrotflock",
      website: "https://www.parrottrading.com/app/",
      category: "Portfolio Tracker,Copy Trading",
      from: "#003748",
      to: "#4AE486",
    },
    {
      name: "Solpix",
      description:
        "An exclusive DAO dedicated to the empowerment of the Solana community.",
      icon: "https://media.discordapp.net/attachments/1021030450371772446/1035656596405092382/FfTC06SWAAQlQB0.jpg",
      twitter: "https://twitter.com/solpixdao",
      discord: "https://discord.gg/sxA945rkCp",
      website: "https://solpix.io/",
      category: "Inner Discord,Alpha Calls,P2P,Analytics",
      from: "#CDD794",
      to: "#F7B215",
    },
    {
      name: "Rethinkable",
      description:
        "Discord based Web3 recruitment solution that supports projects, communities, and individuals",
      icon: "https://pbs.twimg.com/profile_images/1552653202189086721/gVFMyO2K_400x400.jpg",
      twitter: "https://twitter.com/rethinkablexyz",
      discord: "https://discord.com/invite/rethinkable",
      website: "https://www.rethinkable.xyz/",
      category: "Inner Discord,Job Offers",
      from: "#2D75FA",
      to: "#112C5F",
    },
    {
      name: "Satori",
      description:
        "Trading tools, Analytics Platform on Solana",
      icon: "https://cdn.discordapp.com/attachments/1011202479171571812/1027220196005519522/-9He2j8XSuR-rG5UNYvQCjV_ycjIbI1sr_SoD_PDY6A.png",
      twitter: "https://twitter.com/nft_satori",
      discord: "https://discord.gg/besatori",
      website: "https://satori-nft.io/",
      category: "Inner Discord,Alpha Calls,Analytics",
      from: "#57DCF7",
      to: "#2F527C",
    },
    {
      name: "Sol Decoder",
      description:
        "A suite of tools to find/judge hype of mints. Earn XP by chatting and completing tasks, get weekly rewards",
      icon: "https://soldecoder.app/assets/site-logos/logo-transparent.png",
      twitter: "https://twitter.com/SOL_Decoder",
      discord: "https://discord.com/invite/s4ne34TrUC",
      website: "https://soldecoder.app/",
      category: "Inner Discord,Engage-2-Earn,Analytics",
      from: "#647FE1",
      to: "#76E5CD",
    },
    {
      name: "NexiLabs",
      description:
        "Nexi Labs is an All-In-One Defi Platform that integrates Solana wallets into Discord",
      icon: "https://moon.ly/uploads/nft/1cbff083-93a8-44ac-9a69-3f3e55d1d87a.jpg",
      twitter: "https://twitter.com/NexiLabs",
      discord: "https://discord.com/invite/nexi",
      website: "https://www.nexilabs.io/",
      category: "Inner Discord,Analytics",
      from: "#161203",
      to: "#B0A98C",
    },
    {
      name: "Matrica",
      description:
        "NFT-based verification, token-gating, and voting services to Discord servers, and an NFT wallet. ",
      icon: "https://nftsolana.io/wp-content/uploads/2021/09/nX5X4u3w_400x400.jpg",
      twitter: "https://twitter.com/MatricaLabs",
      discord: "https://discord.com/invite/MatricaLabs",
      website: "https://matrica.io/community/sol-edda-rity",
      category: "Portfolio Tracker,Verification",
      from: "#83C2AA",
      to: "#494E6C",
    },
  ];

  const discounts = [
 {
      name: "Pixel Art Service",
      description:
        "Get the best generative pixel art for your NFT collection in GIF or PNG designed by Sans-Qui",
      icon: "https://pbs.twimg.com/profile_images/1613851543769423874/yO1ObGXb_400x400.jpg",
      twitter: "https://twitter.com/dudes_sol",
      discord: "https://discord.com/invite/dudessol",
      website: "",
      category: "Art Creation",
      from: "#070100",
      to: "#fefcfc",
    },
    {
      name: "Oak Paradise",
      description:
        "Oak Paradise is building sportsbook, casino and poker room featuring Solana and SPL Tokens, E-Sports betting and custom games, such as Pawnshop, NFT Jackpot and Sports Alpha.",
      icon: "https://creator-hub-prod.s3.us-east-2.amazonaws.com/oak_paradise_pfp_1661193184623.jpeg",
      twitter: "https://twitter.com/oakparadisenft",
      discord: "https://discord.com/invite/oakdystopia",
      website: "https://registration.oak.bet/?referral=Soleddarity",
      category: "Casino,P2E,SportsBook",
      from: "#5C8656",
      to: "#314631",
    },
    {
      name: "Scalp Empire",
      description:
        "-23% on the monthly subscription. Analytic tools, sniping bot ... anything you need as a scalper.",
      icon: "https://www.scalp-empire.com/v4/se_logo-192x192.png",
      twitter: "https://twitter.com/ScalpEmpireNFT",
      discord: "https://discord.com/invite/scalpempire",
      website: "https://www.scalp-empire.com/subscribe/soleddarity",
      category: "Sniper Bot",
      from: "#152E4C",
      to: "#6E83A3",
    },
    {
      name: "Parrot",
      description:
        "-20% discount on traders subscription fees. Parrot Tools are building a Solana NFT Copy Trading Platform. Investors make more profitable trades. Traders make passive income.",
      icon: "https://cdn.discordapp.com/attachments/1011202479171571812/1026491471471329300/125.png",
      twitter: "https://twitter.com/ParrotTools",
      discord: "https://discord.gg/parrotflock",
      website: "https://www.parrottrading.com/app/portfolio",
      category: "Portfolio Tracker,Copy Trading",
      from: "#003748",
      to: "#4AE486",
    },
{
      name: "SOL Casino",
      description:
        "First Licensed Live Casino / Sportsbook / Crash playable directly with your Web3 wallets",
      icon: "https://pbs.twimg.com/profile_images/1466791696063156230/_uYOZtNS_400x400.jpg",
      twitter: "https://twitter.com/Solcasinoio",
      discord: "",
      website: "https://solcasino.io/r/95gFTW3T",
      category: "Casino",
      from: "#059368",
      to: "#3f4543",
    },
    {
      name: "Doge Capital",
      description:
        "Enjoy the Supportive Dude benefits by having a multitude of discounts on Doge Capital services",
      icon: "https://dl.airtable.com/.attachmentThumbnails/5e07dff05059715ef2478b80cfee0c99/41bbd847",
      twitter: "https://twitter.com/thedogecapital",
      discord: "https://discord.gg/generousrobots",
      website: "https://thedogecapital.com/",
      category: "Utility Tools",
      from: "#E5BD63",
      to: "#907539",
    },
    {
      name: "SolBookie",
      description:
        "25% bonus on ALL your deposits on the premier sports betting destination in the Solana ecosystem",
      icon: "https://cdn.discordapp.com/attachments/1021030450371772446/1035678239470919710/download.jpg",
      twitter: "https://twitter.com/solbookienft",
      discord: "https://discord.com/invite/SolBookieNFT",
      website: "https://solbookie.io/",
      category: "SportsBook",
      from: "#5B9EB8",
      to: "#642FDA",
    },
  ];

  const games = [
    {
      name: "EDD's Multiflip",
      description:
        "Flip in $EDD or Solana with up to 10x Multipliers and 1-click lightning fast transactions",
      icon: "https://edd.multiflip.io/images/icon.png",
      twitter: "#",
      discord: "discord.gg/soleddarity",
      website: "https://edd.multiflip.io/",
      category: "Multiflip",
      from: "#C7AE35",
      to: "#03C2BC",
    },
    {
      name: "DegenDevil",
      description:
        "Holders get a 50% deposit bonus on this Solana based full service casino with a sportsbook, live casino games, virtual sport and more!",
      icon: "https://pbs.twimg.com/profile_images/1595460707470176256/7U3IBMuR_400x400.jpg",
      twitter: "https://twitter.com/SKULLBOTS",
      discord: "https://discord.com/invite/skullbots",
      website: "https://degendevil.com/?ref=supportive",
      category: "Casino,SportsBook,P2E",
      from: "#000000",
      to: "#D91313",
    },
    {
      name: "AibaverseNFT",
      description:
        "???",
      icon: "https://pbs.twimg.com/profile_images/1588377913077878784/xjWbnSb1_400x400.jpg",
      twitter: "https://twitter.com/aibaversenft",
      discord: "discord.gg/8uBvkjNp9Z",
      website: "#",
      category: "Social Simulation",
      from: "#B929FF",
      to: "#22072F",
    },
{
      name: "Shuffle by Immortals",
      description:
        "PVP betting games to Web3",
      icon: "https://pbs.twimg.com/profile_images/1622049430877732866/ITATkpZL_400x400.jpg",
      twitter: "https://twitter.com/immortalsSOL",
      discord: "discord.gg/immortalsSOL",
      website: "https://www.solanashuffle.com/jackpot/1bbd7349-15cc-4ffc-95ad-3bff22108aa8",
      category: "Betting",
      from: "#14171F",
      to: "#2B3039",
    },
    {
      name: "Solcrash.io",
      description:
        "The highest adrenaline crypto game on Solana",
      icon: "https://pbs.twimg.com/profile_images/1507197976158126082/KXhKpePV_400x400.jpg",
      twitter: "https://twitter.com/solcrash",
      discord: "discord.gg/solcrash",
      website: "https://solcrash.io/?code=Dudes",
      category: "Betting",
      from: "#544F64",
      to: "#068FC7",
    },
    {
      name: "Oak Poker Paradise",
      description:
        "Oak Paradise is building sportsbook, casino and poker room featuring Solana and SPL Tokens, E-Sports betting and custom games, such as Pawnshop, NFT Jackpot and Sports Alpha.",
      icon: "https://creator-hub-prod.s3.us-east-2.amazonaws.com/oak_paradise_pfp_1661193184623.jpeg",
      twitter: "https://twitter.com/oakparadisenft",
      discord: "https://discord.com/invite/oakdystopia",
      website: "https://registration.oak.bet/?referral=Soleddarity",
      category: "Casino,Poker",
      from: "#5C8656",
      to: "#314631",
    },
  ];

  const educations = [
    {
      name: "Max Educational Platform",
      description: "Sharing knowledge on the Solana NFT market @MaxbrsNFT",
      icon: "https://cdn.discordapp.com/attachments/1021030450371772446/1034516444408459384/Capture_decran_2022-10-25_a_19.18.31.png",
      twitter: "#",
      discord: "#",
      website:
        "https://maxbrs.notion.site/Max-Educational-Platform-0459f9ed8e3a418ea07854a5595adcf2",
      category: "Full Guide",
      from: "#9AC786",
      to: "#6BCF39",
    },
{
      name: "Solana NFT Review",
      description: "Your #1 resource for Solana NFT education",
      icon: "https://pbs.twimg.com/profile_images/1491548889182265352/bhWpS1Pn_400x400.jpg",
      twitter: "https://twitter.com/ReviewSolana",
      discord: "#",
      website:
        "https://t.co/W06ZhRt78E",
      category: "Review",
      from: "#7C9CD8",
      to: "#03C2BC",
    },
     {
      name: "Ledger Academy",
      description: "Ledger academy is here to provide you with all the content you need to safely navigate Web3. Learn crypto on your own terms.",
      icon: "https://finance-et-compagnies.com/storage/media/1244/N44_mYZ7_400x400.jpg",
      twitter: "#",
      discord: "#",
      website: "https://www.ledger.com/academy",
      category: "Full Guide",
      from: "#1C1C1C",
      to: "#DFB0B0",
},
    {
      name: "Magic Eden's Intro to Solana NFTs",
      description:
        "Get to know the basic of NFts and Solana Blockchain on the official's Magic Eden guide",
      icon: "https://yt3.ggpht.com/HRtpijPgB6rijcMFphGjxEUb5QGFdGFpLVzE_harHbuAi-7VP0S8-2ihkRxF8okOkZo2_yINBw=s900-c-k-c0x00ffffff-no-rj",
      twitter: "https://twitter.com/MagicEden",
      discord: "https://discord.com/invite/magiceden",
      website: "https://contenthub.magiceden.io/playbook",
      category: "Full Guide",
      from: "#950BC6",
      to: "#B657A9",
    },
  ];

  const navigation = [
    { name: "Home", href: "#", icon: HomeIcon, active: false },
    { name: "Staking", href: "#", icon: StakingIcon, active: false },
    { name: "Auctions", href: "#", icon: AuctionsIcon, active: false },
    { name: "Raffles", href: "#", icon: RafflesIcon, active: false },
  ];

  // const isFound = nfts.some((element) => {
  //   if (element.data.symbol === "SOLEDD"||element.data.symbol === "PIXELDUDES"||element.data.symbol === "ZOMB"||element.data.symbol === "PXLD"||element.data.symbol === "MIDH"||element.data.symbol === "GREATGOATS"||element.data.symbol === "SAC"||element.data.symbol === "BASC"||element.data.symbol === "HANA"||element.data.symbol === "SSL"||element.data.symbol === "NH"||element.data.symbol === "Rentii"||element.data.symbol === "EXP"||element.data.symbol === "HL"||element.data.symbol === "KBC"||element.data.symbol === "BSL"||element.data.symbol === "SMB"||element.data.symbol === "FT"||element.data.symbol === "IMRTL"||element.data.symbol === "NOVA"||element.data.symbol === "UGS"||element.data.symbol === "JA"||element.data.symbol === "KK"||element.data.symbol === "HODLERS"||element.data.symbol === "HSKI"||element.data.symbol === "ZUMA"||element.data.symbol === "APINLABS"||element.data.symbol === "TYP"||element.data.symbol === "GOON"||element.data.symbol === "INFKTED"||element.data.symbol === "LS"||element.data.symbol === "LILY"||element.data.symbol === "BVD"||element.data.symbol === "TSHS"||element.data.symbol === "GHOSTKID"||element.data.symbol === "FLOPPAS"||element.data.symbol === "ZK"||element.data.symbol === "CoC"||element.data.symbol === "KING"||element.data.symbol === "CURSED"||element.data.symbol === "PP"||element.data.symbol === "UNIREX"||element.data.symbol === "NEXI"||element.data.symbol === "soldecoder"||element.data.symbol === "SC"||element.data.symbol === "OAK"||element.data.symbol === "SEN"||element.data.symbol === "DC"||element.data.symbol === "KNIT"||element.data.symbol === "DGOD"||element.data.symbol === "Y00T"||element.data.symbol === "DINO"||element.data.symbol === "MARA"||element.data.symbol === "ABC"||element.data.symbol === "DUELBOTS"||element.data.symbol === "sharx"||element.data.symbol === "okay_bears"||element.data.symbol === "OON"||element.data.symbol === "OVOL"||element.data.symbol === "LILY"||element.data.symbol === "CC"||element.data.symbol === "FFF"||element.data.symbol === "YC"||element.data.symbol === "DFC"||element.data.symbol === "AP"||element.data.symbol === "DAPE"||element.data.symbol === "SMB"||element.data.symbol === "AUROR"||element.data.symbol === "LUNAR"||element.data.symbol === "sss"||element.data.symbol === "AoM"||element.data.symbol === "WN"||element.data.symbol === "C3"||element.data.symbol === "DG"||element.data.symbol === "SNR"||element.data.symbol === "JUSTAPE"||element.data.symbol === "DN"||element.data.symbol === "okay_bears"||element.data.symbol === "BSL"||element.data.symbol === "SOLANOSAURUS"||element.data.symbol === "GMERS"||element.data.symbol === "UKIYO"||element.data.symbol === "SOR"||element.data.symbol === "LLGEN2"||element.data.symbol === "MTC"||element.data.symbol === "SOLGods"||element.data.symbol === "sharx"||element.data.symbol === "ATP"||element.data.symbol === "V") {
  //     if (typeof window !== "undefined") {
  //       localStorage.setItem("haveAnubis", "true");
  //     }
  //     return true;
  //   }

  //   return false;
  // });

  };

  useEffect(() => {
    sethaveAnubis(true);
    // if (isFound) {
    //   sethaveAnubis(true);
    // } else {
    //   sethaveAnubis(false);
    // }
  });

  useEffect(() => {
    setFreeTools(tools);
    setHolderTools(Holderstools);
    setGameTools(games);
    setDiscountTools(discounts);
    setEducationTools(educations);
  }, []);

  useEffect(() => {
    setFilterInput('');
  }, [typeTools]);
  
  return (
              <Layout>
                <div className="flex flex-col gap-2 lg:p-5">
                  <div className="flex items-center flex-col xl:flex-row justify-between">
                    <div className="flex flex-col gap-2 lg:p-5">
                      <div className="bg-[#171E27] font-semibold flex items-center border border-[#2f3a47] rounded-xl">
                        <div
                          onClick={() => settypeTools("Free tools")}
                          className={
                            typeTools == "Free tools"
                              ? "p-2 lg:p-5 w-auto text-center bg-[#1CE9C6] bg-opacity-[14%] rounded-xl border border-[#1CE9C6]"
                              : "p-2 lg:p-5 w-auto cursor-pointer hover:opacity-80 text-center"
                          }
                        >
                          Free Tools
                        </div>
                        <div
                          onClick={() => settypeTools("Holders only")}
                          className={
                            typeTools == "Holders only"
                              ? "p-2 lg:p-5 text-center bg-[#1CE9C6] bg-opacity-[14%] rounded-xl border border-[#1CE9C6]"
                              : "p-2 lg:p-5 cursor-pointer hover:opacity-80 text-center"
                          }
                        >
                          Dudes Tools
                        </div>
                        <div
                          onClick={() => settypeTools("Discounts")}
                          className={
                            typeTools == "Discounts"
                              ? "p-2 lg:p-5 w-auto text-center bg-[#1CE9C6] bg-opacity-[14%] rounded-xl border border-[#1CE9C6]"
                              : "p-2 lg:p-5 w-auto cursor-pointer hover:opacity-80 text-center"
                          }
                        >
                          Discounts
                        </div>
                        <div
                          onClick={() => settypeTools("Games")}
                          className={
                            typeTools == "Games"
                              ? "p-2 lg:p-5 w-auto text-center bg-[#1CE9C6] bg-opacity-[14%] rounded-xl border border-[#1CE9C6]"
                              : "p-2 lg:p-5 w-auto cursor-pointer hover:opacity-80 text-center"
                          }
                        >
                          Games
                        </div>
                        <div
                          onClick={() => settypeTools("Educations")}
                          className={
                            typeTools == "Educations"
                              ? "p-2 lg:p-5 w-auto text-center bg-[#1CE9C6] bg-opacity-[14%] rounded-xl border border-[#1CE9C6]"
                              : "p-2 lg:p-5 w-auto cursor-pointer hover:opacity-80 text-center"
                          }
                        >
                          Educational
                        </div>
                      </div>
                    </div>
                    <div className="filter-div">
                      <input value={filterInput} onChange={handleFilterChange} placeholder="Filter items" />
                    </div>

                    <div className="flex items-center gap-2">
                      
                    </div>
                  </div>
                  
                  {/* <div className="grid gap-2 lg:p-5 grid-cols-1 2xl:grid-cols-3 lg:grid-cols-3  md:grid-cols-2"> */}
                  <div>
                    {typeTools == "Free tools" ? (
                      <>
                      <SortableGrid key="freetoolskey" tools={freeTools} name="free-tools" filter={filterInput} />
                      </>
                    ) : typeTools == "Holders only" ? (
                      <>
                      <SortableGrid key="holdertoolskey" tools={holderTools} name="holder-tools" filter={filterInput} />
                      </>
                    ) : typeTools == "Games" ? (
                      <>
                        <SortableGrid key="gametoolskey" tools={gameTools} name="game-tools" filter={filterInput} />
                      </>
                    ) : typeTools == "Educations" ? (
                      <>
                        <SortableGrid key="educationtoolskey" tools={educationTools} name="education-tools" filter={filterInput} />
                      </>
                    ) : (
                      <>
                        <SortableGrid key="discounttoolskey" tools={discountTools} name="discount-tools" filter={filterInput} />
                      </>
                    )}
                  </div>

                </div>
              </Layout>
            </>
          ) : (
            <>
              <div className="flex h-screen bg-[#14171F] text-white">
                <div className="hidden lg:flex lg:flex-shrink-0">
                  <div className="flex w-20 flex-col">
                    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto bg-[#14171F] border-[#1F2029] border-r-2">
                      <div className="flex-1 flex flex-col items-center gap-28">
                        <div>
                          <div className="flex items-center justify-center  py-4">
                            <img
                              className="h-12 w-auto"
                              src={`${router.basePath}/assets/images/logo.png`}
                              alt="Toolidarity"
                            />
                          </div>
                          {/* <div className="flex items-center justify-center mt-5 flex-shrink-0 pb-5">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              className="w-6 h-6 text-center text-[#1CE9C6]"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                              />
                            </svg>
                          </div> */}
                        </div>
                        <nav
                          aria-label="Sidebar"
                          className="flex flex-col items-center  space-y-5 py-10"
                        >
                          {navigation.map((item) => (
                            <a
                              key={item.name}
                              href={item.href}
                              className={
                                item.active
                                  ? "flex items-center  p-4 text-[#1CE9C6] hover:opacity-80 border-l-2 border-[#1CE9C6] ml-[-15px]"
                                  : "flex items-center  p-4 text-white hover:opacity-80 ml-[-15px]"
                              }
                            >
                              <item.icon
                                aria-hidden="true"
                              />
                              <span className="sr-only">{item.name}</span>
                            </a>
                          ))}
                        </nav>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
                  <div className="lg:hidden">
                    <div className="flex items-center justify-between bg-[#14171F] border-[#1F2029] border-b-2 py-2 px-4 sm:px-6 lg:px-8">
                      <div>
                        <img
                          className="h-8 w-auto"
                          src={`${router.basePath}/assets/images/logo.png`}
                          alt="Your Company"
                        />
                      </div>
                      <div>
                        <button
                          type="button"
                          className="-mr-3 inline-flex h-12 w-12 items-center justify-center rounded-md  text-white hover:bg-[#1CE9C6] hover:text-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        >
                          <span className="sr-only">Open sidebar</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>

                  <main className="flex flex-1 overflow-hidden">
                    {/* Primary column */}
                    <section
                      aria-labelledby="primary-heading"
                      className="flex h-full min-w-0 flex-1 flex-col overflow-y-auto lg:order-last"
                    >
                      <h1 id="primary-heading" className="sr-only">
                        Account
                      </h1>
                      <div className="p-10 flex flex-col items-center justify-center w-full h-screen">
                        <div className="flex flex-col items-center justify-center">
                          <img
                            className="h-auto w-auto mb-5"
                            src={`${router.basePath}/assets/images/logo.png`}
                            alt="Your Company"
                          />
                          <h1 className="text-3xl xl:text-5xl text-center font-semibold leading-none">
                            ACCESS DENIED!
                          </h1>
                          <p className="leading-none opacity-40">
                            Connect your wallet to access toolidarity !
                          </p>
                          <div className="mt-5">
                            <WalletMultiButton></WalletMultiButton>
                          </div>
                          <div>
                            <a
                              href="https://magiceden.io/creators/dudes"
                              target="_blank"
                              className="block w-full"
                            >
                              <div className="bg-[#E42575] flex items-center justify-center p-3 w-full font-bold rounded-md mt-3 cursor-pointer hover:bg-[#c51d63]">
                                <img
                                  className="h-[20px] mr-2 relative z-10 cursor-pointer hover:opacity-80"
                                  src={`${router.basePath}/assets/images/me.png`}
                                />
                                JOIN THE DUDES!
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
                    </section>
                  </main>
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        <>
          <Login></Login>
        </>
      )}
    </Main>
  );
};

export default Index;
