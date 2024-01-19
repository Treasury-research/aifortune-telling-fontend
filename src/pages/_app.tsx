import "regenerator-runtime/runtime";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import customTheme from "styles/theme";
import "styles/globals.css";
import ChatProvider from "context";
import "styles/markdown.css";
import "styles/markdown-editor.css";
import "styles/markdown-preview.css";

const MyApp = ({ Component, pageProps }: AppProps) => {

  return (
    <ChatProvider>
      <ChakraProvider theme={customTheme}>
        <div className="w-full h-full">
          <Component {...pageProps} className="flex-1" />
        </div>
      </ChakraProvider>
    </ChatProvider>
  );
};

export default MyApp;
