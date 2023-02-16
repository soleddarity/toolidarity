import "@fortawesome/fontawesome-svg-core/styles.css";
import "../styles/global.css";
import { useEffect, useState } from "react";
import "aos/dist/aos.css";
import { ContextProvider } from "@/contexts/ContextProvider";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "next-themes";
import type { AppProps } from 'next/app';
import { Analytics } from '@vercel/analytics/react';

require("@solana/wallet-adapter-react-ui/styles.css");

//@ts-ignore
function MyApp({ Component, pageProps }) {
  const [showing, setShowing] = useState(false);

  useEffect(() => {
    setShowing(true);
  }, []);

  if (!showing) {
    return null;
  }

  if (typeof window === "undefined") {
    return <></>;
  } else {
    return (
      <ContextProvider>
        <NextUIProvider>
          <ThemeProvider enableSystem={true} attribute="class">
            <Component {...pageProps} />
           <Analytics />
          </ThemeProvider>
        </NextUIProvider>
      </ContextProvider>
    );
  }
}

export default MyApp;
