import React, { useEffect } from "react";
import { Image, Text, VStack, Box } from "@chakra-ui/react";
import { Router, useRouter } from "next/router";
import { userInfoStore } from "store/userInfoStore";
import { useToast } from "@chakra-ui/react";
import { useChatStore } from "store/chatStore";
import { ConnectBtn } from "components/connect/ConnectBtn";
import { ConnectModal } from "components/connect/ConnectModal";
import { isPhone } from "lib/common";

export default function Left({ tabName }: { tabName: string }) {
	const router = useRouter();
	const toast = useToast();
	const { name } = userInfoStore();
	const { getAllChatList, lang } = useChatStore();

	const tabs = [
		{
			name: lang === "CN" ? "命理" : "Five Elements",
			img: "ml",
			router: "numerology",
		},
		{
			name: lang === "CN" ? "资产" : "Assets",
			img: "zc",
			router: "assets",
		},
	];

	return (
		<>
			<VStack w="auto" px={2} justify="space-between" h="full" bg="#E4DFF8">
				<Box>
					<Image
						className="shrink-0 cursor-pointer"
						src={`/images/logo.png`}
						alt=""
						w="50px"
						mt={5}
						mb={10}
						onClick={() => router.push("/home")}
					/>
					<Box className="w-full">
						{tabs.map((t: any, i: number) => (
							<VStack
								key={i}
								w="full"
								className="rounded-[50%] background-[#fff] cursor-pointer mb-5"
								onClick={() => {
									const chatList: any = getAllChatList()
										.filter((item: any) => item.section === t.router)
										.sort((a: any, b: any) => {
											if (a.createTime > b.createTime) {
												return -1;
											}

											return 1;
										});
									if (chatList.length > 0) {
										router.push(
											`${isPhone() ? "/mobile" : ""}/${t.router}?id=${
												chatList[0].id
											}`
										);
									} else {
										router.push(`${isPhone() ? "/mobile" : ""}/${t.router}`);
									}
								}}
							>
								<div
									className={`w-10 h-10 flex items-center justify-center ${
										router.pathname.includes(t.router) ? "bg-[#EFECFB]" : ""
									} rounded-[50%]`}
								>
									<Image
										src={`/images/left/${
											router.pathname.includes(t.router)
												? `${t.img}_active`
												: t.img
										}.png`}
										alt=""
									/>
								</div>
								<Text whiteSpace="nowrap">{t.name}</Text>
							</VStack>
						))}
					</Box>
				</Box>
				<ConnectBtn />
			</VStack>
			<ConnectModal />
		</>
	);
}
