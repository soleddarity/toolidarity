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
          <div className="flex items-center gap-2">
            {tool.category.split(",").map(function (item: any) {
              return (
                <>
                  <span
                    className={
                      "inline-flex items-center rounded-full  px-2 py-0.5 text-xs font-medium " +
                      (item === "Marketplace"
                        ? "text-white bg-[#FF2F2F]"
                        : item === "Aggregator"
                        ? "text-white bg-[#3CB949]"
                        : item === "Token Market"
                        ? "text-white bg-[#1CE9C6]"
                        : item === "P2P"
                        ? "text-white bg-[#3C8CB9]"
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
