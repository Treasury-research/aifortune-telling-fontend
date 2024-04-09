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
import UserForm from "../template/UserForm";
import AssetForm from "../template/AssetForm";
import { Markdown } from "./MarkDown";
import { useChatStore } from "store/chatStore";

export default function ChatRight(props: any) {
	const router = useRouter();
	const { lang } = useChatStore();
	const {
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

	const { item, index } = props;

	return (
		<VStack w="full" alignItems="flex-end" mb={5}>
			<Box
				className="right-panel flex gap-3 items-start ml-auto mb-5"
			>
				{item.category == "form" ? (
					<>
						{section == "numerology" ? (
							<UserForm item={item} />
						) : (
							<AssetForm item={item} />
						)}
					</>
				) : (
					<div className="max-w-[500px] px-3 py-2 bg-[#fff] rounded-[6px]">
						<Markdown value={item.content} />
					</div>
				)}

				<Avatar w="40px" h="40px" bg="rgba(160,60,214)" />
			</Box>
		</VStack>
	);
}
