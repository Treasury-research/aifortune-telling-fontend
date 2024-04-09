import React, { useEffect } from "react";
import Head from "next/head";
import Left from "components/common/Left";
import Channel from "components/common/Channel";
import ChatInput from "components/common/ChatInput";
import ChatLeft from "components/common/ChatLeft";
import ChatRight from "components/common/ChatRight";
import { Router, useRouter } from "next/router";
import { Text, Button, Image, Box, Flex, HStack } from "@chakra-ui/react";
import useChatContext from "hooks/useChatContext";
import { v4 as uuidv4 } from "uuid";
import { userInfoStore } from "store/userInfoStore";
import { useToast } from "@chakra-ui/react";
import api, { baseURL } from "api";
import { useChatStore } from "store/chatStore";
import { ChatTitle } from "components/common/ChatTitle";
import ChatPanel from "components/common/ChatPanel";

export default function Assets() {
	const {
		activeChatId,
		setActiveChatById,
		activeChat,
		chatList,
		allChatList,
		updateChat,
		section,
		isPhone,
		addChat,
		submitQuestion,
		addMessage,
		getAssets,
	} = useChatContext();
	const { name, userId, assets } = userInfoStore();
	const router = useRouter();
	const toast = useToast();
	const { clearChatInfo, lang } = useChatStore();

	useEffect(() => {
		getAssets();
	}, []);

	useEffect(() => {
		if (isPhone) {
			const mobileURL = location.href.replace(
				/^(https?:\/\/[^\/]+)(\/.*)$/,
				"$1/mobile$2"
			);

			router.push(mobileURL);
		}
	}, [router]);

	return (
		<>
			<div className="w-full h-full flex">
				<Left tabName="assets" />
				<div className="w-[300px] h-full px-5 py-10 overflow-auto no-scrollbar">
					<Channel />
				</div>

				<Box className="w-[calc(100%-280px)] h-full pr-5">
					<ChatTitle />
					<Box className="w-full h-[calc(100%-80px)] bg-[#F3F4F6] rounded-[10px] pt-10 px-10">
						<ChatPanel />
					</Box>
				</Box>
			</div>
		</>
	);
}
