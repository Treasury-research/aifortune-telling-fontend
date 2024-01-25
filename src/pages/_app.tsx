import "regenerator-runtime/runtime";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import customTheme from "styles/theme";
import "styles/globals.css";
import ChatProvider from "context";
import "styles/markdown.css";
import "styles/markdown-editor.css";
import "styles/markdown-preview.css";
import React, { useEffect } from 'react'
import { userInfoStore } from "store/userInfoStore";
import { useChatStore } from "store/chatStore";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const {
    name,
    userConverId,
    clearUserInfo
  } = userInfoStore();
  const {
    clearChatInfo
  } = useChatStore();

  // 判断标记不存在或不同就清除历史记录及重新登录
  useEffect(() => {
    const deleteHis: any = localStorage.getItem("deleteHis");
    if (!deleteHis || deleteHis !== "2") {
      clearUserInfo();
      clearChatInfo();
      localStorage.setItem("deleteHis", "2");
    }
  }, []);


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
