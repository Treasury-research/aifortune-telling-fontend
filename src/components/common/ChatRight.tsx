import React, { useEffect, useMemo, useState } from "react";
import {
	Image,
	Input,
	Radio,
	Box,
	Skeleton,
	Text,
	Flex,
	Avatar,
	VStack,
	HStack,
} from "@chakra-ui/react";
import { Router, useRouter } from "next/router";
import { CiSearch } from "react-icons/ci";
import type { DatePickerProps } from "antd";
import { DatePicker, Space } from "antd";
import useChatContext from "hooks/useChatContext";
import { userInfoStore } from "store/userInfoStore";
import UserForm from "./../numberology/UserForm";
import AssetForm from "./../assets/AssetForm";
import { Markdown } from "./MarkDown";
import { useChatStore } from "store/chatStore";
import { BeatLoader } from "react-spinners";

export default function ChatRight(props: any) {
	const router = useRouter();
	const { lang } = useChatStore();
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
		updateMessage,
		submitQuestion,
	} = useChatContext();

	const { name, birthDay, setName, setSex, setBirthDay } = userInfoStore();
	const { item, index } = props;

	const loadContent = useMemo(() => {
		const msgItem = activeChat.messages[index + 1];
		return msgItem?.content;
	}, [activeChat, index]);

	const showContent = useMemo(() => {
		return (
			(item.category === "form" && item.isSubmit && !loadContent) ||
			(item.category === "chat" && !loadContent)
		);
	}, [item, loadContent]);

	return (
		<VStack alignItems="flex-end" mb={5}>
			<div className="flex gap-5 items-start ml-auto mb-5">
				{item.category == "form" ? (
					<>
						{section == "numerology" ? (
							<UserForm item={item} />
						) : (
							<AssetForm item={item} />
						)}
					</>
				) : (
					<div className="max-w-[500px] p-3 bg-[#fff] rounded-[6px]">
						<Markdown value={item.content} />
					</div>
				)}
				<Avatar size="md" bg="rgba(160,60,214)" />
			</div>
			{showContent && (
				<Flex w="full" className="flex gap-5 items-start ">
					<Image
						className="shrink-0 h-[48px] rounded-[50%]"
						src={`/images/logo.png`}
						alt=""
					/>
					<Box className="p-5 bg-[#fff] rounded-[6px] overflow-auto">
						<HStack spacing={1}>
							<Text>
								{lang === "CN" ? "正在计算中" : "Calculations in progress"}
							</Text>
							<BeatLoader color="#000" size={4} speedMultiplier={1}/>
						</HStack>

						<Skeleton
							height="10px"
							mt={2}
							w={"400px"}
							startColor="#F3F3F3"
							endColor="#DFDFDF"
							borderRadius={"8px"}
						/>
					</Box>
				</Flex>
			)}
		</VStack>
	);
}
