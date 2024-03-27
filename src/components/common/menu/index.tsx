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
	const { setActiveChatById, activeChatId, removeChat, activeChat } =
		useChatContext();

	const { clearChatInfo, lang } = useChatStore();
	const router = useRouter();
	const toast = useToast();

	return (
		<HStack w="80vw" h="full" bg="#e4dff880" spacing={0} zIndex={5}>
			<Left tabName={tabName} />
			<div className="w-[300px] h-full px-5 py-10 overflow-auto no-scrollbar">
				<Channel />
			</div>
		</HStack>
	);
}
