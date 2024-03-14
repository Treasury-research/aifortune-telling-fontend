import {
	Box,
	Flex,
	Image,
	Spinner,
	useBoolean,
	Alert,
	AlertIcon,
	Text,
	HStack,
} from "@chakra-ui/react";
import React, { useEffect, useMemo } from "react";
import { BaseModal } from "components/BaseModal";
import { useConnectModalStore } from "store/modalStore";
import { useRouter } from "next/router";
import api from "api";
import { userInfoStore } from "store/userInfoStore";
import { CloseIcon } from "@chakra-ui/icons";
import useWallet from "lib/useWallet";

export function ConnectModal(props: any) {
	const router = useRouter();
	const { openConnectModal, setOpenConnectModal } = useConnectModalStore();
	const { handleLogin, openConnectWallet, isConnected } = useWallet();
	const [isLoading, setIsLoading] = useBoolean(false);

	return (
		<>
			<BaseModal
				closeOnOverlayClick={false}
				isOpen={openConnectModal}
				onClose={() => {
					setOpenConnectModal(false);
					setIsLoading.off();
				}}
				title="Sign In"
				isCentered={true}
			>
				<Flex
					alignItems="center"
					justifyContent="space-between"
					width="400px"
					maxW="full"
					border="1px"
					borderColor="text.gray"
					borderRadius="md"
					px={4}
					py={1}
					h={12}
					my={4}
					cursor="pointer"
					className="hover:opacity-70"
					onClick={() => {
						isConnected ? handleLogin() : openConnectWallet();
					}}
				>
					<Box> {isConnected ? "Sign with Wallet" : "Connect Wallet"}</Box>
					<Box>
						{isLoading ? (
							<Spinner size="md" mr={2} mt={1} color="gray.700" />
						) : (
							<Image
								src="/images/chat/metamask.svg"
								alt=""
								height="40px"
								width="40px"
							/>
						)}
					</Box>
				</Flex>
			</BaseModal>
		</>
	);
}
