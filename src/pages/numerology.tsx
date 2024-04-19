import React, { useEffect } from "react";
import Head from "next/head";
import Left from "components/common/Left";
import Channel from "components/common/Channel";
import ChatInput from "components/common/ChatInput";
import ChatLeft from "components/common/ChatLeft";
import ChatRight from "components/common/ChatRight";
import { Router, useRouter } from "next/router";
import {
	Image,
	Input,
	Radio,
	RadioGroup,
	Stack,
	Button,
	Icon,
	Box,
} from "@chakra-ui/react";
import useChatContext from "hooks/useChatContext";
import { v4 as uuidv4 } from "uuid";
import { userInfoStore } from "store/userInfoStore";
import { useChatStore } from "store/chatStore";
import { useToast } from "@chakra-ui/react";
import api, { baseURL } from "api";
import { ChatTitle } from "components/common/ChatTitle";
import ChatPanel from "components/common/ChatPanel";

export default function Numerology() {
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
	} = useChatContext();
	const { name, userConverId, resetChat } = userInfoStore();
	const { clearChatInfo, lang } = useChatStore();
	const router = useRouter();
	const toast = useToast();

	console.log("isPhone", isPhone);
	useEffect(() => {
		if (isPhone) {
			const mobileURL = location.href.replace(
				/^(https?:\/\/[^\/]+)(\/.*)$/,
				"$1/mobile$2"
			);
			router.push(mobileURL);
		}
	}, [isPhone]);

	return (
		<>
			<div className="w-full h-full flex">
				<Left tabName="numerology" />
				<Box className="w-[300px] h-full px-5 py-10 overflow-auto no-scrollbar">
					<Channel />
				</Box>

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
