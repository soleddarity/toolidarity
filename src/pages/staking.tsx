import "@fortawesome/fontawesome-free/css/all.css";
import { Meta } from "@/layout/Meta";
import { Main } from "@/templates/Main";
import React from "react";
import _ from "lodash";
import Layout from "@/components/Layout";

// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";

import { useWallet } from "@solana/wallet-adapter-react";
import Login from "@/components/Login";
import { LibraryIcon } from "@heroicons/react/outline";

const Staking = () => {
  const { publicKey } = useWallet();
  return (
    <Main meta={<Meta title="Toolidarity" description="" />}>
      {publicKey ? (
        <>
          <Layout>
            <div className="flex flex-col gap-5">
              <h1 className="text-4xl flex items-center gap-2 font-semibold">
                <LibraryIcon className="h-10 w-10"></LibraryIcon> Staking
              </h1>
              {
                //@ts-ignore
                <div id="diamond-vaults" vaultPath="dudes"></div>
              }
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

export default Staking;
