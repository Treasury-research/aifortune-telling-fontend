import React, { useEffect, useState } from "react";
import {
	Image,
	Radio,
	RadioGroup,
	Stack,
	Button,
	Icon,
	useToast,
} from "@chakra-ui/react";
import { Router, useRouter } from "next/router";
import { CiSearch } from "react-icons/ci";
import { Input } from "antd";

import useChatContext from "hooks/useChatContext";
import { useChatStore } from "store/chatStore";
import { userInfoStore } from "store/userInfoStore";

const { TextArea } = Input;

export default function ChatInput(props: any) {
	const router = useRouter();
	const [inputValue, setInputValue] = useState<any>("");
	const { lang } = useChatStore();
	const { isDone } = useChatContext();
	const toast = useToast();
	const { name, userConverId, resetChat } = userInfoStore();

	return (
		<div className="chat-input w-[90%] flex px-3 mx-auto bg-[#fff] h-[50px] rounded-[20px] items-center">
			<div className="w-[calc(100%-30px)]">
				<TextArea
					style={{ border: "none", boxShadow: "none" }}
					placeholder={
						lang === "CN"
							? "请输入问题，我会帮您解答"
							: "Please enter a question and I'll help you answer it"
					}
					autoSize={{ maxRows: 1 }}
					value={inputValue}
					disabled={!isDone}
					onPressEnter={(e: any) => {
						if (e.key === "Enter") {
							e.preventDefault();
							props.inputSubmit(inputValue);
							setInputValue("");
						}
					}}
					onChange={(e: any) => setInputValue(e.target.value)}
				/>
			</div>
			<Button
				variant="bluePrimary"
				size="sm"
				isDisabled={!isDone}
				borderRadius={10}
				onClick={() => {
					if (!name) {
						toast({
							description: "请先提交您的个人信息!",
							duration: 3000,
							position: "top-right",
							variant: "subtle",
							status: "info",
							isClosable: false,
						});
						return;
					}
					props.inputSubmit(inputValue);
					setInputValue("");
				}}
			>
				<Icon as={CiSearch} boxSize={5} />
			</Button>
		</div>
	);
}
