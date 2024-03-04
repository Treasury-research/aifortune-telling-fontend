import "regenerator-runtime/runtime";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import customTheme from "styles/theme";
import "styles/globals.css";
import ChatProvider from "context";
import "styles/markdown.css";
import "styles/markdown-editor.css";
import "styles/markdown-preview.css";
import React, { useEffect } from "react";
import { userInfoStore } from "store/userInfoStore";
import { useChatStore } from "store/chatStore";
import { ConfigProvider } from "antd";
import locale from "antd/locale/zh_CN";

import dayjs from "dayjs";
import "dayjs/locale/zh-cn";

const MyApp = ({ Component, pageProps }: AppProps) => {
	const { name, userConverId, clearUserInfo } = userInfoStore();
	const { clearChatInfo, setLang } = useChatStore();

	// 判断标记不存在或不同就清除历史记录及重新登录
	useEffect(() => {
		const deleteHis: any = localStorage.getItem("deleteHis");
		if (!deleteHis || deleteHis !== "2") {
			clearUserInfo();
			clearChatInfo();
			localStorage.setItem("deleteHis", "2");
		}
	}, []);

	useEffect(() => {
		const lang = navigator.language.startsWith("en") ? "EN" : "CN";
		lang === "CN" ? dayjs.locale("zh-cn") : dayjs.locale("en");
		console.log("lang:", lang)
		setLang(lang);
	}, []);

	return (
		<ChatProvider>
			<ChakraProvider theme={customTheme}>
				<script
					async
					src="https://www.googletagmanager.com/gtag/js?id=G-S9HQ9CWY45"
				></script>
				<script>
					{`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
  
    gtag('config', 'G-S9HQ9CWY45');
  `}
				</script>
				<div className="w-full h-full">
					<ConfigProvider locale={locale}>
						<Component {...pageProps} className="flex-1" />
					</ConfigProvider>
				</div>
			</ChakraProvider>
		</ChatProvider>
	);
};

export default MyApp;
