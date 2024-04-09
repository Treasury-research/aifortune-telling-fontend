import React, { useEffect, useState } from "react";
import {
	Image,
	Input,
	Radio,
	RadioGroup,
	Stack,
	Text,
	Box,
	Flex,
	HStack,
} from "@chakra-ui/react";
import { DatePicker, Select } from "antd";
import useChatContext from "hooks/useChatContext";
import dayjs from "dayjs";
import { userInfoStore } from "store/userInfoStore";
import { getTimeRange, getCnDate } from "lib/common";
import { useChatStore } from "store/chatStore";

export default function HotCoins(props: any) {
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
	const { lang } = useChatStore();
	const { assets } = userInfoStore();

	const assetsBtnClick = (t: any) => {
		updateChat(activeChatId, { name: t[0] });
		submitQuestion("form", {
			name: t[0],
			n: true,
			matcher_id: t[2],
		});
	};

	return (
		<>
			{section === "assets" &&
				activeChat &&
				activeChat.messages &&
				activeChat.messages.length === 0 && (
					<Box className="w-auto h-full mt-[50px] justify-center flex">
						<div className="w-auto">
							<Text pl={3} className="mb-8 font-bold text-[18px] text-center">
								{lang === "CN"
									? "请选择下列币种，占卜该币种的运势"
									: "Please select the following coins to read the horoscope of that coin"}
							</Text>
							<HStack pl={3} className="overflow-auto w-auto" gap={2}>
								{(assets["hot"] || []).map((t: any, i: number) => (
									<HStack
										key={i}
										borderRadius={4}
										px={5}
										minW="75px"
										h="42px"
										fontWeight="semibold"
										className="items-center justify-center 
                            float-left border-[1px] 
                            border-[#D8D8D8] bg-[#fff] hover:opacity-70 
                            rounded-[2px] cursor-pointer text-center"
										onClick={() => assetsBtnClick(t)}
									>
										<Image
											src={`/images/coins/${t[0]}.svg`}
											boxSize={5}
											alt=""
										/>
										<Text>{t[0]}</Text>
									</HStack>
								))}
							</HStack>

							<Box mt={10} pl={3} className="overflow-auto w-auto max-h-[50vh]">
								<Text my={4} fontWeight="semibold" textAlign="center">
									{lang === "CN" ? "近期热点Token" : "Trending Token"}
								</Text>
								<HStack pt={2} spacing={2} flexFlow="row wrap" gap={2}>
									{(assets["recent_hot"] || []).map((t: any, i: number) => (
										<Flex
											key={i}
											px={4}
											h="32px"
											borderRadius={4}
											className="items-center 
                            border-[1px] 
                            border-[#D8D8D8] bg-[#fff] hover:opacity-70 
                            rounded-[2px] cursor-pointer text-center"
											onClick={() => assetsBtnClick(t)}
										>
											{t[0]}
										</Flex>
									))}
								</HStack>
							</Box>

							{/* <div className="flex justify-center mt-10">
											<Button
												variant="bluePrimary"
												size="md"
												className="mt-3"
												px={5}
												borderRadius={4}
												onClick={() => addAssets()}
											>
												<Icon as={IoMdAdd} color="bg.white" boxSize={5} />
												添加资产
											</Button>
										</div> */}
						</div>
					</Box>
				)}
		</>
	);
}
