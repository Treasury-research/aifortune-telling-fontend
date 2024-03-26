import { useBoolean, useToast } from "@chakra-ui/react";
import React, { useEffect, useMemo, useState } from "react";
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import { mainnet, sepolia } from "wagmi/chains";
// import { signMessage } from "@wagmi/core";
import { useAccount, useDisconnect, useSignMessage } from "wagmi";
import { createWeb3Modal } from "@web3modal/wagmi/react";
import { useChatStore } from "store/chatStore";

import { useRouter } from "next/router";
import { useConnectModalStore } from "store/modalStore";
import { userInfoStore } from "store/userInfoStore";
import { useWeb3Modal } from "@web3modal/wagmi/react";

import { QueryClient } from "@tanstack/react-query";

import api from "api";

const queryClient = new QueryClient();
const projectId = "c27e0568aa579f4d572246b7a2882010";

const metadata = {
	name: "AI 算命",
	description: "Web3Modal Example",
	url: "https://app.zendao.ai/", // origin must match your domain & subdomain
	icons: ["https://app.zendao.ai/images/logo.png"],
};

const chains = [mainnet, sepolia] as const;
const config = defaultWagmiConfig({
	chains,
	projectId,
	metadata,
	ssr: true,
});

createWeb3Modal({
	wagmiConfig: config,
	projectId,
	enableAnalytics: true, // Optional - defaults to your Cloud configuration
	enableOnramp: true, // Optional - false as default
});

export default function useWallet() {
	const router = useRouter();
	const toast = useToast();
	const { signMessageAsync } = useSignMessage();
	const [isLogin, setIsLogin] = useBoolean(false);
	const [signLoading, setSignLoading] = useState(false);
	const { address, isConnected, isDisconnected } = useAccount();
	const { disconnect } = useDisconnect();
	const { lang } = useChatStore();

	const { open } = useWeb3Modal();
	const { clearConnectModalStore, setOpenConnectModal, openConnectModal } =
		useConnectModalStore();
	const { setUserId, clearUserInfo, setAccount, setEmail, setToken, setName } =
		userInfoStore();

	console.log("isConnected:", isConnected, address);

	// step1
	const signAndGetJwt = async () => {
		if (address) {
			try {
				setSignLoading(true);
				const message = `Hello, welcome to ZenDao AI. Please sign this message to verify your wallet. Please make sure the URL is: https://app.zendao.ai/ \nTime: ${Date.now()}`;
				const signMsg = await signMessageAsync({
					message,
				});
				const nonce = await getNonce(message, signMsg);
				if (nonce) {
					await loginGetJwt(nonce);
					return true;
				}
				setSignLoading(false);
				setIsLogin.off();
				return false;
			} catch (error) {
				setIsLogin.off();
				setSignLoading(false);
				return false;
			}
		}
	};

	// step2
	const getNonce = async (challenge: string, signMsg: string) => {
		const res: any = await api.post(`/api/login`, {
			message: challenge,
			address,
			signature: signMsg,
		});
		if (res && res.length > 0 && res[1] === 200) {
			return res[0].nonce;
		}
		return null;
	};

	// step3
	const loginGetJwt = async (nonce: string) => {
		const res: any = await api.post(`api/verify`, {
			nonce,
			address,
		});
		// console.log("res", res);
		if (res && res.length > 0 && res[1] === 200) {
			// api.defaults.headers.authorization = `Bearer ${res[0]?.data?.token}`;
			setAccount(address);
			setUserId(res[0]?.data?.user_id);
			setEmail(res[0]?.data?.email);
			setToken(res[0]?.data?.token);
			setName(res[0]?.data?.name);
		} else {
			setIsLogin.off();
			toast({
				description: lang === "CN" ? "认证失败" : "Authentication failed!",
				duration: 3000,
				position: "top-right",
				variant: "subtle",
				status: "error",
				isClosable: false,
			});
		}
	};

	// login
	const handleLogin = async () => {
		try {
			const res = await signAndGetJwt();
			console.log("res", res);
			if (res) {
				toast({
					description: lang === "CN" ? "登陆成功!" : "Login Success!",
					duration: 3000,
					position: "top-right",
					variant: "subtle",
					status: "success",
					isClosable: false,
				});
			} else {
				toast({
					description: lang === "CN" ? "登陆失败!" : "Login Failed!",
					duration: 3000,
					position: "top-right",
					variant: "subtle",
					status: "warning",
					isClosable: false,
				});
			}
			setIsLogin.off();
			setOpenConnectModal(false);

			return !!res;
		} catch (error) {
			setIsLogin.off();
			return false;
		}
	};

	// auth info
	const getAuth = async () => {
		const res: any = await api.get(`/api/auth`);
		if (res && res.length > 0 && res[1] === 200) {
			setAccount(res[0]?.data?.account);
			setUserId(res[0]?.data?.user_id);
			setEmail(res[0]?.data?.email);
			setName(res[0]?.data?.name);
		}
	};

	const doLogout = async () => {
		setIsLogin.off();
		disconnect();
		clearUserInfo();
		clearConnectModalStore();
	};

	const openConnectWallet = () => {
		doLogout();
		setIsLogin.on();
		open();
	};

	useEffect(() => {
		if (isConnected && isLogin) {
			handleLogin();
		}
		if (!isConnected) {
			doLogout();
		}
	}, [isConnected]);

	return {
		signLoading,
		projectId,
		config,
		address,
		isConnected,
		queryClient,
		getAuth,
		openConnectWallet,
		handleLogin,
		doLogout,
	};
}
