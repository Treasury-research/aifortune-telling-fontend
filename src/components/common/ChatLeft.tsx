import React, { useEffect } from "react";
import {
	Image,
	Text,
	Box,
	Flex,
	VStack,
	HStack,
	Icon,
	Skeleton,
} from "@chakra-ui/react";
import { Router, useRouter } from "next/router";
import { CiSearch } from "react-icons/ci";

import { SearchIcon } from "@chakra-ui/icons";
import useChatContext from "hooks/useChatContext";
import { v4 as uuidv4 } from "uuid";
import { BeatLoader } from "react-spinners";
import { useChatStore } from "store/chatStore";
import { BiRefresh } from "react-icons/bi";

export default function ChatLeft(props: any) {
	const router = useRouter();
	const { activeChatId, submitQuestion, addMessage, activeChat } =
		useChatContext();
	const { item } = props;
	const { lang } = useChatStore();

	const regen = () => {
		const lastActiveMsg = activeChat.messages[props.index - 1];
		if (lastActiveMsg?.category == "form") {
			submitQuestion("form", {
				year: lastActiveMsg.birthDay.split("/")[0],
				month: lastActiveMsg.birthDay.split("/")[1],
				day: lastActiveMsg.birthDay.split("/")[2],
				time: lastActiveMsg.time,
				n: lastActiveMsg.sex == "1" ? false : true,
			});
		} else {
			submitQuestion("chat", {
				message: lastActiveMsg?.content,
			});
		}
	};

	return (
		<Box w="full">
			{true ? (
				<Flex w="full" className="flex gap-5 items-start ">
					<Image
						className="shrink-0 h-[42px] rounded-[50%]"
						src={`/images/logo.png`}
						alt=""
					/>
					<Box className="p-5 bg-[#fff] rounded-[6px] overflow-auto">
						<HStack spacing={1}>
							<Text fontSize="14px">
								{lang === "CN" ? "正在计算中" : "Calculations in progress"}
							</Text>
							<BeatLoader color="#000" size={4} speedMultiplier={1} />
						</HStack>

						<Skeleton
							height="8px"
							mt={2}
							className="chat-skeleton"
							w={"320px"}
							startColor="#F3F3F3"
							endColor="#DFDFDF"
							borderRadius={"8px"}
						/>
					</Box>
				</Flex>
			) : (
				<Box w="full">
					<Flex className="chat-left gap-3 items-start mb-4">
						<Image
							className="shrink-0 h-[42px] rounded-[50%]"
							src={`/images/logo.png`}
							alt=""
						/>
						<div className="chat-left-content px-5 py-3 bg-[#fff] rounded-[6px] overflow-auto">
							{item.source == "form" ||
							item.source == "jqpp" ||
							!item.source ? (
								<Box
									className={`pre-item`}
									color={item.error ? "red" : "#000"}
									dangerouslySetInnerHTML={{ __html: item.content }}
								/>
							) : (
								<Box
									className={`pre-item`}
									color={item.error ? "red" : "#000"}
									// className="max-w-[calc(100vw-900px)]"
									dangerouslySetInnerHTML={{ __html: item.content }}
								/>
							)}
						</div>
						{item.error && (
							<Icon
								as={BiRefresh}
								boxSize={5}
								mt={3}
								cursor="pointer"
								onClick={regen}
							/>
						)}
					</Flex>
					{item.recommends && (
						<VStack
							alignItems="flex-start"
							ml="55px"
							mb={5}
							className="chat-recomand max-w-[calc(100vw-900px)]"
							fontSize="14px"
							color="#7A61DE"
						>
							{item.recommends.length > 0 &&
								item.recommends.map((item: string, index: number) => {
									return (
										<HStack
											px={3}
											py="6px"
											key={index}
											bg="rgba(122, 97, 222, 0.2)"
											borderRadius="md"
											cursor="pointer"
											alignItems="flex-start"
											onClick={() => {
												addMessage(activeChatId, [
													{
														id: uuidv4(),
														type: "question",
														category: "chat",
														content: item,
													},
												]);
												submitQuestion("chat", {
													message: item,
												});
											}}
										>
											<Icon as={SearchIcon} mt={1} />
											<Text>{item}</Text>
										</HStack>
									);
								})}
						</VStack>
					)}
				</Box>
			)}
		</Box>
	);
}
