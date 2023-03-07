import "@fortawesome/fontawesome-free/css/all.css";
import { Meta } from "@/layout/Meta";
import { Main } from "@/templates/Main";
import React, { useEffect, useState } from "react";
import _ from "lodash";
import Layout from "@/components/Layout";
import SortableGrid from "@/components/SortableGrid";
import StakingIcon from "../styles/icons/StakingIcon";
import HomeIcon from "../styles/icons/HomeIcon";
import AuctionsIcon from "../styles/icons/AuctionsIcon";
import RafflesIcon from "../styles/icons/RafflesIcon";

// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";

import Login from "@/components/Login";
import router from "next/router";
import { getCookie } from "cookies-next";
import * as solanaTools from "../tools/solana/tool";
import * as ethereumTools from "../tools/ethereum/tool";
import * as polygonTools from "../tools/polygon/tool";
import * as suiTools from "../tools/sui/tool";
import * as aptosTools from "../tools/aptos/tool";

const Index = () => {
  const chains = [
    { id: 1, name: 'Solana', value: 'solana', image: 'assets/images/solana.svg', unavailable: false },
    { id: 2, name: 'Ethereum', value: 'ethereum', image: 'assets/images/ethereum.svg', unavailable: false },
    { id: 3, name: 'Polygon', value: 'polygon', image: 'assets/images/polygon.svg', unavailable: false },
    { id: 4, name: 'Aptos', value: 'aptos', image: 'assets/images/aptos.svg', unavailable: false },
    // { id: 5, name: 'Sui', value: 'sui', image: 'assets/images/sui.png', unavailable: false },
  ];

  const [chain, setChain] = useState(null);
  const [typeTools, settypeTools] = useState("Free tools");
  //@ts-ignore
  const [jwt, setjwt] = useState(getCookie("jwt"));
  const [filterInput, setFilterInput] = useState("");
  const [freeTools, setFreeTools] = useState<any[]>([]);
  const [holderTools, setHolderTools] = useState<any[]>([]);
  const [gameTools, setGameTools] = useState<any[]>([]);
  const [discountTools, setDiscountTools] = useState<any[]>([]);
  const [educationTools, setEducationTools] = useState<any[]>([]);
  const [adsTools, setAdsTools] = useState<any[]>([]);
  const [allowTools, setAllowTools] = useState<any[]>([]);

  const handleFilterChange = (event: any) => {
    setFilterInput(event.target.value);
  }

  const navigation = [
    { name: "Home", href: "#", icon: HomeIcon, active: false },
    { name: "Staking", href: "#", icon: StakingIcon, active: false },
    { name: "Auctions", href: "#", icon: AuctionsIcon, active: false },
    { name: "Raffles", href: "#", icon: RafflesIcon, active: false },
  ];

  // const { publicKey } = useWallet();
  // const { connection } = useConnection();
  const [haveAnubis, sethaveAnubis] = useState<boolean>(false);
  // const { nfts } = useWalletNfts({
  //   //@ts-ignore
  //   publicAddress: publicKey,
  //   connection,
  // });

  // const isFound = nfts.some((element) => {
  //   if (element.data.symbol === "SOLEDD"||element.data.symbol === "PIXELDUDES"||element.data.symbol === "ZOMB"||element.data.symbol === "PXLD"||element.data.symbol === "MIDH"||element.data.symbol === "GREATGOATS"||element.data.symbol === "SAC"||element.data.symbol === "BASC"||element.data.symbol === "HANA"||element.data.symbol === "SSL"||element.data.symbol === "NH"||element.data.symbol === "Rentii"||element.data.symbol === "EXP"||element.data.symbol === "HL"||element.data.symbol === "KBC"||element.data.symbol === "BSL"||element.data.symbol === "SMB"||element.data.symbol === "FT"||element.data.symbol === "IMRTL"||element.data.symbol === "NOVA"||element.data.symbol === "UGS"||element.data.symbol === "JA"||element.data.symbol === "KK"||element.data.symbol === "HODLERS"||element.data.symbol === "HSKI"||element.data.symbol === "ZUMA"||element.data.symbol === "APINLABS"||element.data.symbol === "TYP"||element.data.symbol === "GOON"||element.data.symbol === "INFKTED"||element.data.symbol === "LS"||element.data.symbol === "LILY"||element.data.symbol === "BVD"||element.data.symbol === "TSHS"||element.data.symbol === "GHOSTKID"||element.data.symbol === "FLOPPAS"||element.data.symbol === "ZK"||element.data.symbol === "CoC"||element.data.symbol === "KING"||element.data.symbol === "CURSED"||element.data.symbol === "PP"||element.data.symbol === "UNIREX"||element.data.symbol === "NEXI"||element.data.symbol === "soldecoder"||element.data.symbol === "SC"||element.data.symbol === "OAK"||element.data.symbol === "SEN"||element.data.symbol === "DC"||element.data.symbol === "KNIT"||element.data.symbol === "DGOD"||element.data.symbol === "Y00T"||element.data.symbol === "DINO"||element.data.symbol === "MARA"||element.data.symbol === "ABC"||element.data.symbol === "DUELBOTS"||element.data.symbol === "sharx"||element.data.symbol === "okay_bears"||element.data.symbol === "OON"||element.data.symbol === "OVOL"||element.data.symbol === "LILY"||element.data.symbol === "CC"||element.data.symbol === "FFF"||element.data.symbol === "YC"||element.data.symbol === "DFC"||element.data.symbol === "AP"||element.data.symbol === "DAPE"||element.data.symbol === "SMB"||element.data.symbol === "AUROR"||element.data.symbol === "LUNAR"||element.data.symbol === "sss"||element.data.symbol === "AoM"||element.data.symbol === "WN"||element.data.symbol === "C3"||element.data.symbol === "DG"||element.data.symbol === "SNR"||element.data.symbol === "JUSTAPE"||element.data.symbol === "DN"||element.data.symbol === "okay_bears"||element.data.symbol === "BSL"||element.data.symbol === "SOLANOSAURUS"||element.data.symbol === "GMERS"||element.data.symbol === "UKIYO"||element.data.symbol === "SOR"||element.data.symbol === "LLGEN2"||element.data.symbol === "MTC"||element.data.symbol === "SOLGods"||element.data.symbol === "sharx"||element.data.symbol === "ATP"||element.data.symbol === "V") {
  //     if (typeof window !== "undefined") {
  //       localStorage.setItem("haveAnubis", "true");
  //     }
  //     return true;
  //   }

  //   return false;
  // });

  useEffect(() => {
    sethaveAnubis(true);
    // if (isFound) {
    //   sethaveAnubis(true);
    // } else {
    //   sethaveAnubis(false);
    // }
  });

  // useEffect(() => {
  //   setFreeTools(tools);
  //   setHolderTools(Holderstools);
  //   setGameTools(games);
  //   setDiscountTools(discounts);
  //   setEducationTools(educations);
  //   setAdsTools(ads);

  // }, []);

  useEffect(() => {
    setFilterInput('');
  }, [typeTools]);
  
  useEffect(() => {
    setChain(chains[0]);
  }, []);
  

  useEffect(() => {
    
    if (chain && chain.value === 'solana') {
      settypeTools("");
      console.log(`set chain`, chain);

      setFreeTools(solanaTools.tools);
      setHolderTools(solanaTools.Holderstools);
      setGameTools(solanaTools.games);
      setDiscountTools(solanaTools.discounts);
      setEducationTools(solanaTools.educations);
      setAdsTools(solanaTools.ads);
      setAllowTools(solanaTools.allowTools);
      setTimeout(() => {
        settypeTools("Free tools");
      }, 100);
    }

    if (chain && chain.value === 'ethereum') {
      settypeTools("");
      setFreeTools([...ethereumTools.tools]);
      setHolderTools(ethereumTools.Holderstools);
      setGameTools(ethereumTools.games);
      setDiscountTools(ethereumTools.discounts);
      setEducationTools(ethereumTools.educations);
      setAdsTools(ethereumTools.ads);
      setAllowTools(ethereumTools.allowTools);
      setTimeout(() => {
        settypeTools("Free tools");
      }, 100);
    }

    if (chain && chain.value === 'polygon') {
      settypeTools("");
      setFreeTools(polygonTools.tools);
      setHolderTools(polygonTools.Holderstools);
      setGameTools(polygonTools.games);
      setDiscountTools(polygonTools.discounts);
      setEducationTools(polygonTools.educations);
      setAdsTools(polygonTools.ads);
      setAllowTools(polygonTools.allowTools);
      setTimeout(() => {
        settypeTools("Free tools");
      }, 100);
    }

    if (chain && chain.value === 'sui') {
      settypeTools("");
      setFreeTools(suiTools.tools);
      setHolderTools(suiTools.Holderstools);
      setGameTools(suiTools.games);
      setDiscountTools(suiTools.discounts);
      setEducationTools(suiTools.educations);
      setAdsTools(suiTools.ads);
      setAllowTools(suiTools.allowTools);
      setTimeout(() => {
        settypeTools("Free tools");
      }, 100);
    }

    if (chain && chain.value === 'aptos') {
      settypeTools("");
      setFreeTools(aptosTools.tools);
      setHolderTools(aptosTools.Holderstools);
      setGameTools(aptosTools.games);
      setDiscountTools(aptosTools.discounts);
      setEducationTools(aptosTools.educations);
      setAdsTools(aptosTools.ads);
      setAllowTools(aptosTools.allowTools);
      setTimeout(() => {
        settypeTools("Free tools");
      }, 100);
    }

  }, [chain]);

  const setSelectedChain = (event: any) => {
    let value = event.target.value;

    for (let i = 0; i < chains.length; i++) {
      if (chains[i].value === value) {
        setChain(chains[i]);
      }
    }
  }
  
  return (
    <Main meta={<Meta title="Toolidarity" description="" />}>
      {haveAnubis ? (
        <>
          {haveAnubis || jwt ? (
            <>
              <Layout>
                <div className="flex flex-col gap-2 lg:p-5">
                  <div className="flex items-center flex-col xl:flex-row justify-between">
                    <div className="flex flex-col gap-2 lg:p-5">
                    


<ul className="flex gap-4" onChange={setSelectedChain}>
  {chains.map(ch => (
     <li>
     <input type="radio" id={ch.name} name="chain-select" value={ch.value} className="hidden peer" checked={chain.name === ch.name} required />
     <label htmlFor={ch.name} className="inline-flex items-center px-5 py-2 text-gray-500 border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">                           
         <img src={ch.image} width="32" height="32" />
         <div className="pl-4">{ch.name}</div>
     </label>
 </li>
  ))}
</ul>

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
                        <div
                          onClick={() => settypeTools("Allowlist")}
                          className={
                            typeTools == "Allowlist"
                              ? "p-2 lg:p-5 w-auto text-center bg-[#1CE9C6] bg-opacity-[14%] rounded-xl border border-[#1CE9C6]"
                              : "p-2 lg:p-5 w-auto cursor-pointer hover:opacity-80 text-center"
                          }
                        >
                          Allow List
                        </div>
                        <div
                          onClick={() => settypeTools("Ads")}
                          className={
                            typeTools == "Ads"
                              ? "p-2 lg:p-5 w-auto text-center bg-[#1CE9C6] bg-opacity-[14%] rounded-xl border border-[#1CE9C6]"
                              : "p-2 lg:p-5 w-auto cursor-pointer hover:opacity-80 text-center"
                          }
                        >
                          Featured Projects
                        </div>
                      </div>
                    </div>
                    <div className="filter-div">
                      <input value={filterInput} onChange={handleFilterChange} placeholder="Filter items" />
                    </div>

                  </div>
                  
                  {/* <div className="grid gap-2 lg:p-5 grid-cols-1 2xl:grid-cols-3 lg:grid-cols-3  md:grid-cols-2"> */}
                  <div>
                    {typeTools == "Free tools" ? (
                      <>
                      <SortableGrid key="freetoolskey" tools={freeTools} chain={chain} name="free-tools" filter={filterInput} />
                      </>
                    ) : typeTools == "Holders only" ? (
                      <>
                      <SortableGrid key="holdertoolskey" tools={holderTools} chain={chain} name="holder-tools" filter={filterInput} />
                      </>
                    ) : typeTools == "Games" ? (
                      <>
                        <SortableGrid key="gametoolskey" tools={gameTools} chain={chain} name="game-tools" filter={filterInput} />
                      </>
                    ) : typeTools == "Educations" ? (
                      <>
                        <SortableGrid key="educationtoolskey" tools={educationTools} chain={chain} name="education-tools" filter={filterInput} />
                      </>
                    ) : typeTools == "Allowlist" ? (
                      <>
                        <SortableGrid key="allowtoolskey" tools={allowTools} chain={chain} name="allow-tools" filter={filterInput} />
                      </>
                    ) : typeTools == "Ads" ? (
                      <>
                        <SortableGrid key="adstoolskey" tools={adsTools} name="ads-tools" filter={filterInput} />
                      </>
                    ) : typeTools == "Discounts" ? (
                      <>
                        <SortableGrid key="discounttoolskey" tools={discountTools} chain={chain} name="discount-tools" filter={filterInput} />
                      </>
                    )
                     : (<></>)}
                  </div>

                </div>

                <footer className="p-4rounded-lg shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800">
                  <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 All Rights Reserved.
                  </span>
                  <span className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
                    Powered by Dudes
                  </span>
                </footer>
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
                          {/* <div className="mt-5">
                            <WalletMultiButton></WalletMultiButton>
                          </div> */}
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
