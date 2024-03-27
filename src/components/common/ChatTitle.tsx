import {
	Icon,
	Text,
	Center,
	VStack,
	Button,
	HStack,
	Box,
	useToast,
} from "@chakra-ui/react";
import { useCallback } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { BiGift } from "react-icons/bi";
import { NavBar, Tabs, Badge } from "react-vant";
import useChatContext from "hooks/useChatContext";
import { userInfoStore } from "store/userInfoStore";
import { useConnectModalStore } from "store/modalStore";

export function ChatTitle() {
	const {
		activeChat,
		isLoading,
		showNav,
		isPhone,
		openNav,
		isGenerate,
		setActionSheetProps,
		setIsActionSheetOpen,
	} = useChatContext();
	const { userId } = userInfoStore();

	return (
		<>
			{isPhone ? (
				<Box w="100vw" pos="fixed" top="0">
					{showNav && <Box w="full" h="full" pos="absolute" zIndex={5} />}
					<NavBar
						className="nav-bar"
						title={activeChat?.name || "Chat"}
						leftText={
							<Icon
								className="chat-menu"
								as={AiOutlineMenu}
								boxSize={5}
								mr={3}
								ml={1}
								onClick={openNav}
							/>
						}
					/>
				</Box>
			) : (
				<div className="h-20 flex items-center text-[18px] font-bold">
					# {activeChat?.name || "Chat"}
				</div>
			)}
		</>
	);
}
