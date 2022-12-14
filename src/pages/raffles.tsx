import "@fortawesome/fontawesome-free/css/all.css";
import { Meta } from "@/layout/Meta";
import { Main } from "@/templates/Main";
import React, { useState } from "react";
import _ from "lodash";
import Layout from "@/components/Layout";

// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";


import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import Login from "@/components/Login";
import { AuctionCard } from "@/components/AuctionCard";
import { TagIcon } from "@heroicons/react/outline";

const Raffles = () => {
  const [typeTools, settypeTools] = useState("Free tools");

  const { publicKey } = useWallet();
  return (
    <Main meta={<Meta title="Toolidarity" description="" />}>
      {publicKey ? (
        <>
          <Layout>
            <div className="flex flex-col gap-5">
              <h1 className="text-4xl leading-none flex items-center gap-2 font-semibold">
                <TagIcon className="w-7 h-7"></TagIcon>
                Raffles
              </h1>
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-5">
                  <div className="bg-[#171E27] font-semibold flex items-center border border-[#2f3a47] rounded-xl">
                    <div
                      onClick={() => settypeTools("Free tools")}
                      className={
                        typeTools == "Free tools"
                          ? "p-5 w-[200px] text-center bg-[#1CE9C6] bg-opacity-[14%] rounded-xl border border-[#1CE9C6]"
                          : "p-5 w-[200px] cursor-pointer hover:opacity-80 text-center"
                      }
                    >
                      Trends raffles
                    </div>
                    <div
                      onClick={() => settypeTools("New auctions")}
                      className={
                        typeTools == "New auctions"
                          ? "p-5 w-[200px] text-center bg-[#1CE9C6] bg-opacity-[14%] rounded-xl border border-[#1CE9C6]"
                          : "p-5 w-[200px] cursor-pointer hover:opacity-80 text-center"
                      }
                    >
                      New raffles
                    </div>
                    <div
                      onClick={() => settypeTools("Discounts")}
                      className={
                        typeTools == "Discounts"
                          ? "p-5 w-[200px] text-center bg-[#1CE9C6] bg-opacity-[14%] rounded-xl border border-[#1CE9C6]"
                          : "p-5 w-[200px] cursor-pointer hover:opacity-80 text-center"
                      }
                    >
                      Past raffles
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <WalletMultiButton></WalletMultiButton>
                </div>
              </div>
              <div className="grid gap-5 grid-cols-1 2xl:grid-cols-3 lg:grid-cols-3  md:grid-cols-2 relative">
                <div className="lockedscreen absolute left-0 right-0 bottom-0 top-0 flex gap-5 rounded-xl items-center justify-center flex-col glass z-20">
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
                      d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                    />
                  </svg>
                  Coming soon
                </div>
                <AuctionCard></AuctionCard>
                <AuctionCard></AuctionCard>
                <AuctionCard></AuctionCard>
                <AuctionCard></AuctionCard>
                <AuctionCard></AuctionCard>
                <AuctionCard></AuctionCard>
              </div>
            </div>
          </Layout>
        </>
      ) : (
        <>
          <Login></Login>
        </>
      )}
    </Main>
  );
};

export default Raffles;
