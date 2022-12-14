import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";
import { AppConfig } from "@/utils/AppConfig";
import { CssBaseline } from "@nextui-org/react";
import React from "react";

// Need to create a custom _document because i18n support is not compatible with `next export`.
class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: React.Children.toArray([initialProps.styles]),
    };
  }

  render() {
    return (
      <Html lang={AppConfig.locale}>
        <Head>
          <title>Toolidarity</title>
          {CssBaseline.flush()}
          <link rel="preconnect" href="https://fonts.googleapis.com"></link>
          <link rel="preconnect" href="https://fonts.gstatic.com"></link>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css"
          ></link>

          <script
            async
            src="https://cdn.jsdelivr.net/gh/Diamond-Vaults/dv-embed@latest/build/bundle.min.js"
          ></script>

          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/gh/Diamond-Vaults/dv-embed@latest/build/bundle.css"
          />
          <link rel="preconnect" href="https://fonts.googleapis.com"></link>
          {
            //@ts-ignore
            <link rel="preconnect" href="https://fonts.gstatic.com"></link>
          }

          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;800;900&display=swap"
            rel="stylesheet"
          ></link>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/inter-ui/3.19.3/inter.css"
            integrity="sha512-3kSeajrEqMrItwRkYz09bOsHsl4/wpoT6mgw5Aw+eSLweQtX7kZp2P/Dm7hnUg/TrbTGesAgCPwvZpllhuROTw=="
            //@ts-ignore
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
          />
          <meta
            name="viewport"
            content="width=device-width,initial-scale=1"
            key="viewport"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
