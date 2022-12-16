import "@fortawesome/fontawesome-free/css/all.css";
import { Meta } from "@/layout/Meta";
import { Main } from "@/templates/Main";
import React, { useEffect, useState } from "react";
import _ from "lodash";
import Layout from "@/components/Layout";
import { ToolCard } from "@/components/ToolCard";
import {
  FireIcon,
  HomeIcon,
  InboxIcon,
  UserIcon,
} from "@heroicons/react/outline";

// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import Login from "@/components/Login";
import { useWalletNfts } from "@nfteyez/sol-rayz-react";
import router from "next/router";
import { getCookie, setCookie } from "cookies-next";
import axios from "axios";

const Index = () => {
  const [typeTools, settypeTools] = useState("Free tools");
  //@ts-ignore
  const [jwt, setjwt] = useState(getCookie("jwt"));
  const tools = [
    {
      name: "Magic Eden",
      description:
        "Magic Eden is the leading NFT Marketplace on Solana. Home to the next generation of digital creators. Discover the best and latest Solana NFT collections.",
      icon: "https://yt3.ggpht.com/HRtpijPgB6rijcMFphGjxEUb5QGFdGFpLVzE_harHbuAi-7VP0S8-2ihkRxF8okOkZo2_yINBw=s900-c-k-c0x00ffffff-no-rj",
      twitter: "https://twitter.com/MagicEden",
      discord: "https://discord.com/invite/magiceden",
      website: "https://magiceden.io/",
      category: "Marketplace",
      from: "#950BC6",
      to: "#7C00A8",
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
      name: "Jupiter Aggregator",
      description:
        "The best swap aggregator & infrastructure for Solana - powering best price, token selection and UX for all users and devs.",
      icon: "https://pbs.twimg.com/profile_images/1446493130555990024/xggcEv5a_400x400.jpg",
      twitter: "https://twitter.com/JupiterExchange",
      discord: "http://discord.gg/jup",
      website: "https://jup.ag",
      category: "DEX",
      from: "#14171F",
      to: "#2B3039",
    },
    {
      name: "YAWWW",
      description:
        "Solana's first peer-to-peer (P2P) automated escrow & trading service for NFTs, Solana's first and only P2P loans marketplace.",
      icon: "https://www.yawww.io/apple-touch-icon.png",
      twitter: "https://twitter.com/YawwwNFT",
      discord: "http://discord.gg/yawwwnft",
      website: "https://www.yawww.io/",
      category: "MarketPlace,P2P,OTC",
      from: "#0BC2A1",
      to: "#065B51",
    },
    {
      name: "HelloMoon",
      description: "Solana DeFi & NFT analytics",
      icon: "data:image/png;base64,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",
      twitter: "https://twitter.com/HelloMoon_io",
      discord: "discord.gg/hellomoon",
      website: "https://www.hellomoon.io/nfts/top-projects",
      category: "Portfolio Tracker",
      from: "#865AEE",
      to: "#B03AA8",
    },
    {
      name: "Famous Fox Federation",
      description:
        "The Famous Fox Federation, an independent organization of the most fabulously famous foxes on the Blockchain.",
      icon: "https://famousfoxes.com/logo.b8610686.svg",
      twitter: "https://twitter.com/FamousFoxFed",
      discord: "https://discord.com/invite/famousfoxes",
      website: "https://famousfoxes.com/",
      category: "Marketplace,Token Market",
      from: "#FF7612",
      to: "#974D09",
    },

    {
      name: "Sol Incinerator",
      description: "Burn any unwanted NFTs or tokens and reclaim the rent ",
      icon: "https://www.sol-incinerator.com/favicon.ico",
      twitter: "https://twitter.com/solincinerator",
      discord: "https://t.co/sEMlHXclDR",
      website: "http://sol-incinerator.com/#/",
      category: "Burner",
      from: "#FF6163",
      to: "#e54b4b",
    },

    {
      name: "CoinFra Labs",
      description:
        "NFT Project launchpad |  NFT Portfolio Tracker |  NFT P2P Trading",
      icon: "https://s3.ap-northeast-1.wasabisys.com/coinfra/assets/logo-Coinfra.png",
      twitter: "https://twitter.com/gocoinfra",
      discord: "https://discord.com/invite/psKdEkcmkU",
      website: "https://www.coinfra.io/",
      category: "Portfolio Tracker",
      from: "#5A57EB",
      to: "#C36EC9",
    },
    {
      name: "Hyperspace",
      description:
        "Solana's best NFT marketplace. Save money sweeping floors by buying across all marketplaces at once.",
      icon: "https://hyperspace.xyz/apple-touch-icon.png",
      twitter: "https://twitter.com/hyperspacexyz",
      discord: "https://discord.gg/3bh6CX5vU6",
      website: "https://hyperspace.xyz/",
      category: "Portfolio Tracker",
      from: "#3C69F7",
      to: "#315ee2",
    },
    {
      name: "SHARKY.FI",
      description: "Borrow & Lend against your NFTs, instantly.",
      icon: "https://sharky.fi/sharky.svg",
      twitter: "https://twitter.com/sharkyfi",
      discord: "https://discord.com/invite/sharkyfi",
      website: "https://sharky.fi/",
      category: "Lend/Borrow",
      from: "#262626",
      to: "#FE4A4A",
    },
  ];

  const Holderstools = [
    {
      name: "Zilla VS Kong",
      description:
        "888 Zillas and Kongs battling each other ferociously in the Solana metaverse. Holders can take part in staking, breeding and our exclusive Snapshots metaverse world.",
      icon: "https://cdn.discordapp.com/attachments/1011202479171571812/1027961050710155274/j0OYQ1WEgr6TkzKJ3oA4Q-yH3uXv68hH5tyU9Vk3xcA.png",
      twitter: "https://twitter.com/Zilla_VS_Kong",
      discord: "https://discord.com/invite/seyEZ8Ekrt",
      website: "https://snapshots-toolkit.com/home",
      category: "Sniper Bot",
      from: "#D32204",
      to: "#ed2b0e",
    },

    {
      name: "313 Labs - {C}IPHER",
      description:
        "Members who apply for Cipherlist will be reviewed and receive a skill-based role within their Discord server.  ",
      icon: "https://cdn.discordapp.com/attachments/1021030450371772446/1034517404866330775/Capture_decran_2022-10-25_a_19.22.45.png",
      twitter: "https://twitter.com/313Labs",
      discord: "#",
      website: "https://313labs.io/",
      category: "Utility Tool",
      from: "#FF6163",
      to: "#e54b4b",
    },
    {
      name: "Kalisten",
      description:
        "Use Kalisten's App to track your workouts, progress your NFTs, Train2Earn, and much more. This is the collection you need to buy if you are interested in Train2Earn. ",
      icon: "https://cdn.discordapp.com/attachments/1021030450371772446/1035656455082213456/Kalisten_Logo_Gradient.png",
      twitter: "https://twitter.com/kalisten_",
      discord: "https://discord.com/invite/kalisten",
      website: "https://train.kalisten.app/",
      category: "Utility Tool",
      from: "#FB8028",
      to: "#FB8028",
    },
    {
      name: "SOLPIX",
      description:
        "An exclusive DAO dedicated to the empowerment of the Solana community - building a web3 ecosystem called Solpix.",
      icon: "https://media.discordapp.net/attachments/1021030450371772446/1035656596405092382/FfTC06SWAAQlQB0.jpg",
      twitter: "https://twitter.com/solpixnft",
      discord: "https://discord.gg/sxA945rkCp",
      website: "https://solpix.io/",
      category: "Alpha Calls / Utility tools",
      from: "#F7B215",
      to: "#F7B215",
    },
    {
      name: "Parrot",
      description:
        "Parrot Tools is building a Solana NFT Copy Trading Platform. Investors make more profitable trades. Traders make passive income.",
      icon: "https://cdn.discordapp.com/attachments/1011202479171571812/1026491471471329300/125.png",
      twitter: "https://twitter.com/ParrotTools",
      discord: "https://discord.gg/parrotflock",
      website: "http://www.parrottrading.com/",
      category: "Utility Tool",
      from: "#003748",
      to: "#4AE486",
    },
    {
      name: "SATORI",
      description:
        "Exceed your limits... Trading tools | Analytics Platform on #Solana. Team & Products.",
      icon: "https://cdn.discordapp.com/attachments/1011202479171571812/1027220196005519522/-9He2j8XSuR-rG5UNYvQCjV_ycjIbI1sr_SoD_PDY6A.png",
      twitter: "https://twitter.com/nft_satori",
      discord: "https://discord.gg/besatori",
      website: "https://satori-nft.io/",
      category: "Utility Tool",
      from: "#57DCF7",
      to: "#2F527C",
    },
    {
      name: "Anubis Lens",
      description:
        "Anubis Lens grants the power to reveal the wallets and data of every Solana NFT project offering a broader and more objective view of every DAO/community",
      icon: "https://anubis-punt.com/assets/images/lens.png",
      twitter: "dsdssd",
      discord: "Marketplace",
      website: "https://anubis-punt.com/",
      category: "Spy Wallets",
      from: "#0F2837",
      to: "#0E3555",
    },
    {
      name: "SOL DECODER",
      description:
        "A suite of tools to find / judge hype of mints. Alpha generating Discord bots that any Discord can add. Whitelist management tool to get whitelisted in < 10 seconds. iOS & Android app live",
      icon: "https://soldecoder.app/assets/site-logos/logo-transparent.png",
      twitter: "https://twitter.com/SOL_Decoder",
      discord: "https://discord.com/invite/s4ne34TrUC",
      website: "https://soldecoder.app/",
      category: "Utility Tool",
      from: "#647FE1",
      to: "#76E5CD",
    },
    {
      name: "PIXEL PENGUINS DAO",
      description:
        "Pixel / Phantom Penguins DAO is the first DAO implementing a Web2/Web3 experience. They centralize Alpha calls from the best Caller in the space",
      icon: "https://pixelpenguinsdao.xyz/images/logo.png",
      twitter: "https://discord.com/invite/5RjFKAR55M",
      discord: "https://twitter.com/pixelpenguindao",
      website: "https://pixelpenguinsdao.xyz/",
      category: "Alpha Calls",
      from: "#7FFFD4",
      to: "#1C9891",
    },
  ];

  const discounts = [
    {
      name: "OAK PARADISE",
      description:
        "Oak Paradise is building sportsbook, casino and poker room featuring Solana and SPL Tokens. E-Sports betting with our own league under Paradise Gaming umbrella, alongside tools and custom games, such as Pawnshop, NFT Jackpot and Sports Alpha.",
      icon: "https://api.oak.bet/external_storage/logos/AEbmRZ1A5ObZEDkTtVVItCTOxR2G3vC5QJ3NmQFv.png",
      twitter: "https://twitter.com/oakparadisenft",
      discord: "https://discord.com/invite/oakdystopia",
      website: "https://oak.bet/?ref=soleddarity",
      category: "Casino,P2E",
      from: "#5C8656",
      to: "#314631",
    },
    {
      name: "SCALP EMPIRE",
      description:
        "Analytic tools, sniping bot ... anything you need as a scalper.",
      icon: "https://www.scalp-empire.com/v4/se_logo-192x192.png",
      twitter: "https://twitter.com/ScalpEmpireNFT",
      discord: "https://discord.com/invite/scalpempire",
      website: "https://www.scalp-empire.com/subscribe/soleddarity",
      category: "Sniping bot",
      from: "#152E4C",
      to: "#6E83A3",
    },

    {
      name: "Doge Capital",
      description:
        "Doge Capital is a collection of 5000 cute 24x24 pixel art collection on the Solana Blockchain. Holding a Doge Capital grants membership to the Woof Club and owner exclusive perks. Monkeys and Apes have been having fun for too long so we have decided to join them. Woof!",
      icon: "https://pbs.twimg.com/profile_images/1476461549212499970/ILDtg6As_400x400.jpg",
      twitter: "https://twitter.com/thedogecapital",
      discord: "https://discord.gg/generousrobots",
      website: "https://thedogecapital.com/",
      category: "Utility",
      from: "#C473F7",
      to: "#46A1FE",
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
      name: "Coin Flip",
      description:
        "Bet in SOL or $EDD in a 50/50 coin flip. 2.5% fee on each games shared with the dudes.",
      icon: "https://soleddarity-coinflip.vercel.app/TAIL.png",
      twitter: "#",
      discord: "discord.gg/soleddarity",
      website: "https://soleddarity-coinflip.vercel.app/",
      category: "Coin Flip",
      from: "#7C9CD8",
      to: "#8E68D5",
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
  ];

  const navigation = [
    { name: "Home", href: "#", icon: HomeIcon, active: false },
    { name: "Trending", href: "#", icon: FireIcon, active: false },
    { name: "Messages", href: "#", icon: InboxIcon, active: false },
    { name: "Profile", href: "#", icon: UserIcon, active: false },
  ];

  const { publicKey } = useWallet();
  const { connection } = useConnection();
  const [haveAnubis, sethaveAnubis] = useState<boolean>(false);
  const { nfts } = useWalletNfts({
    //@ts-ignore
    publicAddress: publicKey,
    connection,
  });

  const isFound = nfts.some((element) => {
    if (element.data.symbol === "SOLEDD") {
      if (typeof window !== "undefined") {
        localStorage.setItem("haveAnubis", "true");
      }
      return true;
    }

    return false;
  });

  const login = async () => {
    axios
      .post("http://localhost:3030/api/auth/login", {
        publicKey: publicKey,
      })
      .then((response) => {
        setCookie("jwt", response.data.token);
      })
      .catch(function () {
        //signup();
      });
  };

  useEffect(() => {
    sethaveAnubis(false);
    if (isFound) {
      sethaveAnubis(true);
    } else {
      sethaveAnubis(false);
    }
  });

  useEffect(() => {
    login();
  }, [publicKey]);

  return (
    <Main meta={<Meta title="Toolidarity" description="" />}>
      {publicKey || haveAnubis ? (
        <>
          {haveAnubis || jwt ? (
            <>
              <Layout>
                <div className="flex flex-col gap-2 lg:p-5">
                  <div className="flex items-center flex-col xl:flex-row justify-between">
                    <div className="flex flex-col gap-2 lg:p-5">
                      <div className="bg-[#171E27] font-semibold flex items-center border border-[#2f3a47] rounded-xl">
                        <div
                          onClick={() => settypeTools("Free tools")}
                          className={
                            typeTools == "Free tools"
                              ? "p-2 lg:p-5 w-auto lg:w-[150px] text-center bg-[#1CE9C6] bg-opacity-[14%] rounded-xl border border-[#1CE9C6]"
                              : "p-2 lg:p-5 w-auto lg:w-[150px] cursor-pointer hover:opacity-80 text-center"
                          }
                        >
                          Free tools
                        </div>
                        <div
                          onClick={() => settypeTools("Holders only")}
                          className={
                            typeTools == "Holders only"
                              ? "p-2 lg:p-5 w-[200px] text-center bg-[#1CE9C6] bg-opacity-[14%] rounded-xl border border-[#1CE9C6]"
                              : "p-2 lg:p-5 w-[200px] cursor-pointer hover:opacity-80 text-center"
                          }
                        >
                          Unlocked Tools
                        </div>
                        <div
                          onClick={() => settypeTools("Discounts")}
                          className={
                            typeTools == "Discounts"
                              ? "p-2 lg:p-5 w-auto lg:w-[150px] text-center bg-[#1CE9C6] bg-opacity-[14%] rounded-xl border border-[#1CE9C6]"
                              : "p-2 lg:p-5 w-auto lg:w-[150px] cursor-pointer hover:opacity-80 text-center"
                          }
                        >
                          Discounts
                        </div>
                        <div
                          onClick={() => settypeTools("Games")}
                          className={
                            typeTools == "Games"
                              ? "p-2 lg:p-5 w-auto lg:w-[150px] text-center bg-[#1CE9C6] bg-opacity-[14%] rounded-xl border border-[#1CE9C6]"
                              : "p-2 lg:p-5 w-auto lg:w-[150px] cursor-pointer hover:opacity-80 text-center"
                          }
                        >
                          Games
                        </div>
                        <div
                          onClick={() => settypeTools("Educations")}
                          className={
                            typeTools == "Educations"
                              ? "p-2 lg:p-5 w-auto lg:w-[150px] text-center bg-[#1CE9C6] bg-opacity-[14%] rounded-xl border border-[#1CE9C6]"
                              : "p-2 lg:p-5 w-auto lg:w-[150px] cursor-pointer hover:opacity-80 text-center"
                          }
                        >
                          Educational
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <WalletMultiButton></WalletMultiButton>
                    </div>
                  </div>
                  <div className="grid gap-2 lg:p-5 grid-cols-1 2xl:grid-cols-3 lg:grid-cols-3  md:grid-cols-2">
                    {typeTools == "Free tools" ? (
                      <>
                        {tools.map(function (tool, idx) {
                          return <ToolCard key={idx} tool={tool}></ToolCard>;
                        })}
                      </>
                    ) : typeTools == "Holders only" ? (
                      <>
                        {Holderstools.map(function (tool, idx) {
                          return <ToolCard key={idx} tool={tool}></ToolCard>;
                        })}
                      </>
                    ) : typeTools == "Games" ? (
                      <>
                        {games.map(function (tool, idx) {
                          return <ToolCard key={idx} tool={tool}></ToolCard>;
                        })}
                      </>
                    ) : typeTools == "Educations" ? (
                      <>
                        {educations.map(function (tool, idx) {
                          return <ToolCard key={idx} tool={tool}></ToolCard>;
                        })}
                      </>
                    ) : (
                      <>
                        {" "}
                        {discounts.map(function (tool, idx) {
                          return <ToolCard key={idx} tool={tool}></ToolCard>;
                        })}
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
                              alt="Your Company"
                            />
                          </div>
                          <div className="flex items-center justify-center mt-5 flex-shrink-0 pb-5">
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
                          </div>
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
                                className="h-6 w-6"
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
                            You don't have access
                          </h1>
                          <p className="leading-none opacity-40">
                            Please connect your wallet to use the tool !
                          </p>
                          <div className="mt-5">
                            <WalletMultiButton></WalletMultiButton>
                          </div>
                          <div>
                            <a
                              href="https://magiceden.io/marketplace/supportive_dude"
                              target="_blank"
                              className="block w-full"
                            >
                              <div className="bg-[#E42575] flex items-center justify-center p-3 w-full font-bold rounded-md mt-3 cursor-pointer hover:bg-[#c51d63]">
                                <img
                                  className="h-[20px] mr-2 relative z-10 cursor-pointer hover:opacity-80"
                                  src={`${router.basePath}/assets/images/me.png`}
                                />
                                Buy a Supportive Dude on Magic Eden
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
