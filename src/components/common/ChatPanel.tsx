import {
	Image,
	Input,
	Radio,
	RadioGroup,
	Stack,
	Button,
	Text,
	Box,
	Flex,
	HStack,
} from "@chakra-ui/react";
import useChatContext from "hooks/useChatContext";
import { v4 as uuidv4 } from "uuid";
import { userInfoStore } from "store/userInfoStore";
import { useChatStore } from "store/chatStore";
import { useToast } from "@chakra-ui/react";
import api, { baseURL } from "api";
import { ChatTitle } from "components/common/ChatTitle";
import { useRouter } from "next/router";
import ChatLeft from "./ChatLeft";
import ChatRight from "./ChatRight";
import ChatInput from "./ChatInput";

export default function ChatPanel() {
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
	const { name, userConverId, assets } = userInfoStore();
	const { clearChatInfo, lang } = useChatStore();
	const router = useRouter();
	const toast = useToast();

	const assetsBtnClick = (t: any) => {
		submitQuestion("form", {
			name: t[0],
			n: true,
			matcher_id: t[2],
		});
	};

	return (
		<>
			<div className="h-[calc(100%-100px)] overflow-auto" id="chat-content">
				{activeChat &&
					activeChat.messages &&
					activeChat.messages.length > 0 && (
						<>
							{activeChat.messages.map((t: any, i: number) => (
								<div key={i}>
									{t.type == "answer" && <ChatLeft item={t} />}
									{t.type == "question" && <ChatRight item={t} index={i} />}
								</div>
							))}
						</>
					)}

				{section === "assets" &&
					activeChat &&
					activeChat.messages &&
					activeChat.messages.length === 0 && (
						<Box className="w-full h-full mt-10 justify-center flex">
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
											px={6}
											h="42px"
											fontWeight="semibold"
											className="truncate flex items-center justify-center 
                            mb-3 float-left mr-3 mx-4 border-[1px] 
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

								<Box mt={3} className="overflow-auto w-full max-h-[50vh]">
									<Text my={4} ml={4} fontWeight="semibold">
										{lang === "CN" ? "近期热点Token" : "Trending Token"}
									</Text>
									{(assets["recent_hot"] || []).map((t: any, i: number) => (
										<Box
											key={i}
											px={4}
											h="32px"
											borderRadius={4}
											className="truncate flex items-center justify-center 
                            mb-3 float-left mr-3 mx-4 border-[1px] 
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
			{!(
				section === "assets" &&
				activeChat &&
				activeChat.messages &&
				activeChat.messages.length === 0
			) && (
				<div className="h-[100px] flex items-center">
					<ChatInput
						inputSubmit={(e: any) => {
							const lastActiveMsg =
								activeChat.messages[activeChat.messages.length - 1];
							if (
								(section === "assets" && !name) ||
								(lastActiveMsg &&
									lastActiveMsg.category == "form" &&
									!lastActiveMsg.isSubmit)
							) {
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
		</>
	);
}
