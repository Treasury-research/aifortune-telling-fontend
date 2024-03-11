import React, { useEffect } from "react";
import { Image, Text, Box, Flex, VStack, HStack } from "@chakra-ui/react";
import { Router, useRouter } from "next/router";
import { CiSearch } from "react-icons/ci";
import { Markdown } from "./MarkDown";
import { SearchIcon } from "@chakra-ui/icons";
import useChatContext from "hooks/useChatContext";
import { v4 as uuidv4 } from "uuid";

export default function ChatLeft(props: any) {
	const router = useRouter();
	const { activeChatId, submitQuestion, addMessage } = useChatContext();
	const { item } = props;

	return (
		<Box w="full">
			<Flex className="  gap-5 items-start mb-4">
				<Image
					className="shrink-0 h-[48px] rounded-[50%]"
					src={`/images/logo.png`}
					alt=""
				/>
				<div className="p-5 bg-[#fff] rounded-[6px] overflow-auto">
					{item.source == "form" || item.source == "jqpp" || !item.source ? (
						<div className="max-w-[calc(100vw-900px)]">
							<Box
								className={`pre-item`}
								dangerouslySetInnerHTML={{ __html: item.content }}
							/>
						</div>
					) : (
						<Box
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
					fontSize="14px"
					color="#7A61DE"
				>
					{item.recommends.length > 0 &&
						item.recommends.map((item: string) => {
							return (
								<HStack
									px={3}
									py="6px"
									bg="rgba(122, 97, 222, 0.2)"
									borderRadius="md"
									cursor="pointer"
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
									<SearchIcon />
									<Text>{item}</Text>
								</HStack>
							);
						})}
				</VStack>
			)}
		</Box>
	);
}
