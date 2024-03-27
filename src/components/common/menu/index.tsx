import { Box, Button, Flex, VStack, useToast, HStack } from "@chakra-ui/react";

import Left from "../Left";
import Channel from "components/common/Channel";
import { useChatStore } from "store/chatStore";
import { v4 as uuidv4 } from "uuid";
import useChatContext from "hooks/useChatContext";
import { userInfoStore } from "store/userInfoStore";
import api, { baseURL } from "api";
import { useRouter } from "next/router";

export function Menu({ tabName }: { tabName: string }) {
	const {
		setActiveChatId,
		activeChatId,
		removeChat,
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

	const resetConver = [
		{
			id: uuidv4(),
			content:
				lang === "CN"
					? "请填写以下个人信息，以便占卜师为您预测运势~"
					: "Please fill in the following personal information~",
			type: "answer",
			loading: false,
		},
		{
			id: uuidv4(),
			type: "question",
			isSubmit: false,
			category: "form",
			name: "",
			sex: "1", //1 男 2女
			birthDay: "",
			time: "01:00~02:59",
			utc: "UTC+08:00",
		},
	];

	const resetConvertion = async () => {
		if (activeChatId == userConverId) {
			resetChat();
			clearChatInfo();
		}
		const res: any = await api.post(`${baseURL}/api/reset_chat`, {
			conversation_id: activeChatId,
		});
		if (res && res.length > 0 && res[0]["status"] == "success") {
			updateChat(activeChatId, {
				messages: [...resetConver],
			});
		}
	};

	const createNewChat = () => {
		const timestamp = new Date().getTime();
		const time = new Date(timestamp).toLocaleTimeString();
		let newChatId = uuidv4();

		const newChat: any = {
			id: newChatId,
			timestamp: timestamp,
			section,
			messages: [...resetConver],
			name: `${lang === "CN" ? "新的占卜" : "New Five Elements"} ${time}`,
		};

		addChat(newChat);
		setActiveChatId(newChatId);
		const newURL = location.href.replace(/(\?|&)id=[^&]*/, "$1id=" + newChatId);
		history.replaceState({}, document.title, newURL);
	};

	return (
		<HStack w="80vw" h="full" bg="#e4dff880" spacing={0} zIndex={5}>
			<Left tabName={tabName} />
			<div className="w-[300px] h-full px-5 py-10 overflow-auto no-scrollbar">
				<div className="text-[20px] font-bold mb-10">
					{lang === "CN" ? "命理占卜" : "Five Elements"}
				</div>
				<Channel resetConvertion={() => resetConvertion()} />
				<div
					className="w-full h-10 cursor-pointer px-5"
					onClick={() => {
						if (!name && section==="assets") {
							toast({
								description: "请先提交您的个人信息!",
								duration: 3000,
								position: "top-right",
								variant: "subtle",
								status: "info",
								isClosable: false,
							});
							return;
						}
						createNewChat();
					}}
				>
					<span className="text-[20px] font-bold">+</span>
					{lang === "CN" ? " 新的占卜" : " New Five Elements "}
				</div>
			</div>
		</HStack>
	);
}
