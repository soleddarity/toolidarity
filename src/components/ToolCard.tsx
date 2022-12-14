import { FC } from "react";
import "swiper/css";
import "swiper/css/pagination";
import React from "react";
import { useRouter } from "next/router";

type Props = {
  tool: any;
};

export const ToolCard: FC<Props> = ({ tool }) => {
  //@ts-ignore
  const router = useRouter();

  return (
    <>
      <div
        className={"p-5 rounded-md h-[250px] flex flex-col justify-between "}
        style={{
          background:
            "linear-gradient(180deg, " +
            tool.from +
            " 20%, " +
            tool.to +
            " 100%)",
        }}
      >
        <div className="flex items-center justify-between">
          <img src={tool.icon} className="rounded-xl w-14" />
          <div className="flex overflow-scroll items-center gap-2">
            {tool.category.split(",").map(function (item: any) {
              return (
                <>
                  <span
                    className={
                      "inline-flex items-center rounded-full  px-2 py-0.5 text-xs font-medium " +
                      (item === "Marketplace"
                        ? "text-white bg-[#FF2F2F]"
                        : item === "Aggregator"
                        ? "text-white bg-[#891CA6]"
                        : item === "Portfolio Tracker"
                        ? "text-white bg-[#49D949]"
                        : item === "Utility Tools"
                        ? "text-white bg-[#5E1BF9]"
                        : item === "Wallet"
                        ? "text-white bg-[#2C1B89]"
                        : item === "Token Market"
                        ? "text-white bg-[#2C1B89]"
                        : item === "Burner"
                        ? "text-white bg-[#920E2A]"
                        : item === "AMM"
                        ? "text-white bg-[#ECBA20]"
                        : item === "Lend/Borrow"
                        ? "text-white bg-[#0FB914]"
                        : item === "WL Gestion"
                        ? "text-white bg-[#272727]"
                        : item === "Analytics"
                        ? "text-white bg-[#E2CA00]"
                        : item === "Inner Discord"
                        ? "text-white bg-[#1B4BFF]"
                        : item === "Repay Royalties"
                        ? "text-white bg-[#3BE1DA]"
                        : item === "DEX"
                        ? "text-white bg-[#A338D8]"
                        : item === "Explorer"
                        ? "text-white bg-[#EFA111]"
                        : item === "Rarity"
                        ? "text-white bg-[#E547AC]"
                        : item === "P2P"
                        ? "text-white bg-[#3C8CB9]"
                        : item === "Sniper Bot"
                        ? "text-white bg-[#686868]"
                        : item === "Train-2-Earn"
                        ? "text-white bg-[#D69A00]"
                        : item === "Raid-2-Earn"
                        ? "text-white bg-[#611C95]"
                        : item === "Chat-2-Earn"
                        ? "text-white bg-[#0D8899]"
                        : item === "Engage-2-Earn"
                        ? "text-white bg-[#A82B25]"
                        : item === "NFT Renaming"
                        ? "text-white bg-[#C9D11C]"
                        : item === "Copy Trading"
                        ? "text-white bg-[#F09447]"
                        : item === "Alpha Calls"
                        ? "text-white bg-[#EA460D]"
                        : item === "WL Market"
                        ? "text-white bg-[#363636]"
                        : item === "Casino"
                        ? "text-white bg-[#E855DB]"
                        : item === "P2E"
                        ? "text-white bg-[#40B64D]"
                        : item === "Full Guide"
                        ? "text-white bg-[#54B7CF]"
                        : item === "SportsBook"
                        ? "text-white bg-[#C09721]"
                        : item === "Launchpad"
                        ? "text-white bg-[#5CD86D]"
                        : item === "OTC"
                        ? "text-white bg-[#F29F22]"
                        : "text-white bg-[#14181F]")
                    }
                  >
                    <svg
                      className="mr-1.5 h-2 w-2 text-white"
                      fill="currentColor"
                      viewBox="0 0 8 8"
                    >
                      <circle cx={4} cy={4} r={3} />
                    </svg>
                    {item}
                  </span>
                </>
              );
            })}
          </div>
        </div>
        <div>
          <h1 className="font-semibold text-xl">{tool.name}</h1>
          <p className="font-regular leading-5 text-sm">{tool.description}</p>
          <div className="mt-3 flex items-center gap-1.5">
            <a
              href={tool.twitter}
              target="_blank"
              className="inline-flex cursor-pointer items-center  px-2 py-0.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-[#10A0E7] hover:opacity-80"
            >
              Twitter
            </a>
            <a
              href={tool.discord}
              target="_blank"
              className="inline-flex items-center   px-2 py-0.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-[#3D5AD8] hover:opacity-80"
            >
              Discord
            </a>
            <a
              href={tool.website}
              target="_blank"
              className="inline-flex items-center  px-2 py-0.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-[#31496A] bg-[#E6F6FE] hover:opacity-80"
            >
              Access
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
