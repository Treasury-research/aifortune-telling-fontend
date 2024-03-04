import React, { useEffect, useState } from "react";
import {
	Image,
	Radio,
	RadioGroup,
	Stack,
	Button,
	Icon,
} from "@chakra-ui/react";
import { Router, useRouter } from "next/router";
import { CiSearch } from "react-icons/ci";
import { Input } from "antd";
const { TextArea } = Input;
import useChatContext from "hooks/useChatContext";
import { useChatStore } from "store/chatStore";

export default function ChatInput(props: any) {
	const router = useRouter();
	const [inputValue, setInputValue] = useState<any>("");
	const { lang } = useChatStore();
	const { isDone } = useChatContext();
	return (
		<div className="w-[90%] flex px-3 mx-auto bg-[#fff] h-[50px] rounded-[20px] items-center">
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
					props.inputSubmit(inputValue);
					setInputValue("");
				}}
			>
				<Icon as={CiSearch} boxSize={5} />
			</Button>
		</div>
	);
}
