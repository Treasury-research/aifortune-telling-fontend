import React, { useEffect } from "react";
import {
	Box,
	Button,
	Icon,
	Text,
	Image,
	VStack,
	HStack,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
} from "@chakra-ui/react";
import { useConnectModalStore } from "store/modalStore";
import { BiLogIn, BiWallet } from "react-icons/bi";
import useWallet from "lib/useWallet";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import { toShortAddress } from "lib/common";
import { Copy } from "components/Copy";
import { userInfoStore } from "store/userInfoStore";
import { LuLogOut } from "react-icons/lu";
import { useChatStore } from "store/chatStore";
// import WalletIcon from '@icon/WalletIcon';

interface Web3LoginModalProps {
	afterConnect?: () => void;
}

export const ConnectBtn = (props: any) => {
	const { setOpenConnectModal } = useConnectModalStore();
	const { isConnected, address, getAuth, doLogout } = useWallet();
	const { userId } = userInfoStore();
	const { lang } = useChatStore();
	// console.log("userId", userId);

	useEffect(() => {
		if (userId && address) {
			getAuth();
		}
	}, [userId, address]);

	return (
		<Box mb="5!">
			{userId && address ? (
				<Box w="full">
					<Menu>
						<MenuButton as={Button} colorScheme="">
							<Jazzicon
								diameter={50}
								seed={jsNumberForAddress(address as string)}
							/>
						</MenuButton>
						<MenuList minW="100px" border={0} boxShadow="md" mb={2} ml={3}>
							<MenuItem>
								<HStack>
									<Text fontSize="14px">
										{toShortAddress(address as string, 10)}
									</Text>
									<Copy text={address as string} color="#7B62DE" />
								</HStack>
							</MenuItem>
							<MenuItem onClick={doLogout}>
								<HStack>
									<Text>{lang === "CN" ? "登出" : "Logout"}</Text>
									<Icon as={LuLogOut} boxSize={4} color="#7B62DE" />
								</HStack>
							</MenuItem>
						</MenuList>
					</Menu>
				</Box>
			) : (
				<Box w="95px">
					<Button
						w="full"
						leftIcon={
							isConnected ? (
								<Icon as={BiLogIn} boxSize={4} ml={1} />
							) : (
								<Icon as={BiWallet} boxSize={4} ml={1} />
							)
						}
						variant={props.bg ? "" : "bluePrimary"}
						size="sm"
						px={3}
						bg={props.bg}
						borderRadius={16}
						cursor="pointer"
						onClick={() => setOpenConnectModal(true)}
					>
						<Text fontSize="13px" color="#fff" ml="-2px" pr={1}>
							{isConnected
								? lang === "CN"
									? "登录"
									: "Sign in"
								: lang === "CN"
								? "连接钱包"
								: "Connect"}
						</Text>
					</Button>
				</Box>
			)}
		</Box>
	);
};
