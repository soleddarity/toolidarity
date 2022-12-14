import { FC } from "react";
import "swiper/css";
import "swiper/css/pagination";
import React from "react";
import { useRouter } from "next/router";

export const AuctionCard: FC = () => {
  //@ts-ignore
  const router = useRouter();

  return (
    <>
      <div className="bg-[#171E27] flex items-start gap-10 p-5 border border-[#ffffff36] border-opacity-5 rounded-xl">
        <div className="w-[100px] flex items-center justify-center h-auto">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-10 h-10 text-[#1CE9C6]"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
              />
            </svg>
          </div>
        </div>
        <div>
          <h1 className="text-xl font-semibold">Soon</h1>
          <h1 className="text-md font-semibold text-[#1CE9C6]">Soon</h1>
          <div className="mt-5 flex flex-col">
            <span className="opacity-30">Highest bid</span>
            <span className="font-semibold">20SOL</span>
          </div>
          <div className="mt-5 flex flex-col">
            <span className="opacity-30">Time remaining</span>
            <span className="font-semibold">1hrs 09min 56s</span>
          </div>
        </div>
      </div>
    </>
  );
};
