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
import HotCoins from "components/template/HotCoins";

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

	return (
		<>
			<div
				className="h-[calc(100%-100px)] w-full overflow-auto"
				id="chat-content"
			>
				{activeChat &&
					activeChat.messages &&
					activeChat.messages.length > 0 && (
						<>
							{activeChat.messages.map((t: any, i: number) => (
								<Box key={i} w="full">
									{t.type == "answer" && <ChatLeft item={t} index={i} />}
									{t.type == "question" && <ChatRight item={t} index={i} />}
								</Box>
							))}
						</>
					)}

				<HotCoins />
			</div>

			{!(
				section === "assets" &&
				activeChat &&
				activeChat.messages &&
				activeChat.messages.length === 0
			) && (
				<div className="w-full h-[100px] flex items-center">
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
