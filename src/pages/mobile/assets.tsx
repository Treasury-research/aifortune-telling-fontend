import React, { useEffect } from "react";
import { Box, Flex, VStack, Container, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import useChatContext from "hooks/useChatContext";
import { useAccount } from "wagmi";
import { ChatTitle } from "components/common/ChatTitle";
import { Menu } from "components/common/menu";
import ChatPanel from "components/common/ChatPanel";

// import { Menu } from "components/chat/menu";
// import ChatContent from "components/chat/content";
// import { ChatInput } from "components/chat/ChatInput";
// import { ChatTitle } from "components/chat/ChatTitle";
// import { useUserInfoStore } from "store/userInfoStore";
// import { Quest } from "components/chat/Quest";
// import { Operate } from "./Operate";

const Chat = () => {
	const router = useRouter();
	const {
		activeChatId,
		removeChat,
		activeChat,
		chatList,
		allChatList,
		updateChat,
		isGenerate,
		addChat,
		showNav,
		closeNav,
		submitQuestion,
		addMessage,
		getAssets,
	} = useChatContext();

	useEffect(() => {
		getAssets();
	}, []);

	return (
		<Container
			w="100vw"
			pr={0}
			pl={0}
			overflow="hidden"
			h="calc(100vh - 55px)"
			className="container no-scrollbar"
			position="relative"
		>
			<Flex w="280vw" className={showNav ? "move-left" : "move-center"}>
				<Menu tabName="assets" />
				<VStack
					w="100vw"
					h="full"
					pos="relative"
					overflow="hidden"
					alignItems="flex-start"
					onClick={() => {
						showNav && closeNav();
					}}
					gap="0"
				>
					<ChatTitle />
					<VStack
						pt="70px"
						pb="5px"
						w="full"
						h="100%"
						px={3}
						bg="#F3F4F6"
						mt="0!"
						pointerEvents={showNav ? "none" : "auto"}
						alignItems="flex-start"
					>
						<ChatPanel />
					</VStack>
				</VStack>
			</Flex>
		</Container>
	);
};

export default Chat;
