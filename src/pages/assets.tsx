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

export default function Assets() {
	const {
		setActiveChatId,
		activeChatId,
		removeChat,
		activeChat,
		chatList,
		allChatList,
		updateChat,
		section,
		isGenerate,
		addChat,
		submitQuestion,
		addMessage,
		getAssets,
	} = useChatContext();
	const { name, userId, assets } = userInfoStore();
	const router = useRouter();
	const toast = useToast();
	const { clearChatInfo, lang } = useChatStore();

	console.log("assets", assets);

	const resetConvertion = async () => {
		const res: any = await api.post(`${baseURL}/api/reset_chat`, {
			conversation_id: activeChatId,
		});
		if (res && res.length > 0 && res[0]["status"] == "success") {
			updateChat(activeChatId, {
				messages: [],
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
			messages: [],
			name: `${lang === "CN" ? "资产运势" : "New Five Elements"} ${time}`,
		};

		addChat(newChat);
		router.push(`/${section}?id=${newChat.id}`);
	};

	// const addAssets = () => {
	// 	updateChat(activeChatId, {
	// 		messages: [
	// 			{
	// 				id: uuidv4(),
	// 				content: "请填写币种信息，以便占卜师为您预测运势~",
	// 				type: "answer",
	// 				loading: false,
	// 			},
	// 			{
	// 				id: uuidv4(),
	// 				type: "question",
	// 				isSubmit: false,
	// 				category: "form",
	// 				name: "",
	// 				birthDay: "",
	// 				is_public: "1",
	// 				time: "01:00~02:59",
	// 				utc: "UTC+08:00",
	// 			},
	// 		],
	// 	});
	// };

	const assetsBtnClick = (t: any) => {
		submitQuestion("form", {
			name: t[0],
			n: true,
			matcher_id: t[2],
		});
	};

	useEffect(() => {
		if (allChatList.length == 0) {
			createNewChat();
		}
	}, [allChatList]);

	useEffect(() => {
		getAssets();
		if (!name) {
			router.push(`/numerology`);
		}
	}, []);

	return (
		<>
			<div className="w-full h-full flex">
				<Left tabName="assets" />
				<div className="w-[300px] h-full px-5 py-10 overflow-auto no-scrollbar">
					<div className="text-[20px] font-bold mb-10">
						{lang === "CN" ? "资产运势" : "Token Five Elements"}
					</div>
					<Channel resetConvertion={() => resetConvertion()} />
					<div
						className="w-full h-10 cursor-pointer px-5"
						onClick={() => {
							if (!name) {
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

				<Box className="w-[calc(100%-280px)] h-full pr-5">
					<Text className="h-20 flex items-center text-[18px] font-bold">
						{activeChat ? activeChat.name : ""}
					</Text>
					<div className="w-full h-[calc(100%-80px)] bg-[#F3F4F6] rounded-[10px] pt-10 px-10">
						<div
							className={`${
								activeChat &&
								activeChat.messages &&
								activeChat.messages.length > 0
									? "overflow-auto h-[calc(100%-100px)]"
									: "h-full"
							}`}
							id="chat-content"
						>
							{activeChat &&
							activeChat.messages &&
							activeChat.messages.length > 0 ? (
								<>
									{activeChat.messages.map((t: any, i: number) => (
										<div key={i}>
											{t.type == "answer" && <ChatLeft item={t} />}
											{t.type == "question" && <ChatRight item={t} />}
										</div>
									))}
								</>
							) : (
								<Box className="w-full h-full items-center justify-center flex">
									<div className="w-[80%]">
										<div className="mb-10 font-bold text-[18px] text-center">
											{lang === "CN"
												? "请选择下列币种，占卜该币种的运势"
												: "Please select the following coins to read the horoscope of that coin"}
										</div>
										<Flex className="overflow-auto w-full max-h-[50vh]">
											{(assets["hot"] || []).map((t: any, i: number) => (
												<HStack
													key={i}
													borderRadius={4}
													px={4}
													fontWeight="semibold"
													className="truncate flex items-center justify-center 
                            mb-3 float-left mr-3 mx-4 h-10 border-[1px] 
                            border-[#D8D8D8] bg-[#fff] hover:opacity-70 
                            rounded-[2px] cursor-pointer text-center"
													onClick={() => assetsBtnClick(t)}
												>
													<Image
														src={`/images/coins/${t[0]}.svg`}
														boxSize={5}
														alt=""
													/>
													<Text>{t[0]}</Text>
												</HStack>
											))}
										</Flex>

										<Box mt={2} className="overflow-auto w-full max-h-[50vh]">
											<Text my={3} ml={4} fontWeight="semibold">
												{lang === "CN" ? "近期热点Token" : "Trending Token"}
											</Text>
											{(assets["recent_hot"] || []).map((t: any, i: number) => (
												<Box
													key={i}
													px={3}
													borderRadius={4}
													className="truncate flex items-center justify-center 
                            mb-3 float-left mr-3 mx-4 h-8 border-[1px] 
                            border-[#D8D8D8] bg-[#fff] hover:opacity-70 
                            rounded-[2px] cursor-pointer text-center"
													onClick={() => assetsBtnClick(t)}
												>
													{t[0]}
												</Box>
											))}
										</Box>

										{/* <div className="flex justify-center mt-10">
											<Button
												variant="bluePrimary"
												size="md"
												className="mt-3"
												px={5}
												borderRadius={4}
												onClick={() => addAssets()}
											>
												<Icon as={IoMdAdd} color="bg.white" boxSize={5} />
												添加资产
											</Button>
										</div> */}
									</div>
								</Box>
							)}
						</div>
						{activeChat &&
							activeChat.messages &&
							activeChat.messages.length > 0 && (
								<div className="h-[100px] flex items-center">
									<ChatInput
										inputSubmit={(e: any) => {
											addMessage(activeChatId, [
												{
													id: uuidv4(),
													type: "question",
													category: "chat",
													content: e,
												},
											]);
											submitQuestion("chat", {
												message: e,
											});
										}}
									/>
								</div>
							)}
					</div>
				</Box>
			</div>
		</>
	);
}
