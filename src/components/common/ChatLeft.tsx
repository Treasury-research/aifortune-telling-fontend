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

export default function ChatLeft(props: any) {
	const router = useRouter();
	const { activeChatId, submitQuestion, addMessage } = useChatContext();
	const { item } = props;
	const { lang } = useChatStore();

	return (
		<Box w="full">
			{item.loading ? (
				<Flex w="full" className="flex gap-5 items-start ">
					<Image
						className="shrink-0 h-[48px] rounded-[50%]"
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
							w={"400px"}
							startColor="#F3F3F3"
							endColor="#DFDFDF"
							borderRadius={"8px"}
						/>
					</Box>
				</Flex>
			) : (
				<Box w="full">
					<Flex className="  gap-5 items-start mb-4">
						<Image
							className="shrink-0 h-[48px] rounded-[50%]"
							src={`/images/logo.png`}
							alt=""
						/>
						<div className="px-5 py-3 bg-[#fff] rounded-[6px] overflow-auto">
							{item.source == "form" ||
							item.source == "jqpp" ||
							!item.source ? (
								<div className="max-w-[calc(100vw-900px)]">
									<Box
										className={`pre-item`}
										color={item.error ? "red" : "#000"}
										dangerouslySetInnerHTML={{ __html: item.content }}
									/>
								</div>
							) : (
								<Box
									color={item.error ? "red" : "#000"}
									className="max-w-[calc(100vw-900px)]"
									dangerouslySetInnerHTML={{ __html: item.content }}
								/>
							)}
						</div>
					</Flex>
					{item.recommends && (
						<VStack
							alignItems="flex-start"
							ml="68px"
							mb={5}
							className="max-w-[calc(100vw-900px)]"
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
