import React, { useEffect, useState } from 'react'
import {
    Image,
    Radio, RadioGroup,
    Stack,
    Button,
    Icon
} from "@chakra-ui/react";
import { Router, useRouter } from "next/router";
import { CiSearch } from "react-icons/ci";
import { Input } from "antd";
const { TextArea } = Input;

export default function ChatInput(props: any) {
    const router = useRouter();
    const [inputValue, setInputValue] = useState<any>('')
    return (
        <div className='w-[90%] flex px-3 mx-auto bg-[#fff] h-[50px] rounded-[20px] items-center'>
            <div className='w-[calc(100%-30px)]'>
                <TextArea
                    style={{ 'border': 'none', 'boxShadow': 'none' }}
                    placeholder="请输入问题，我会帮您解答"
                    autoSize={{ maxRows: 1 }}
                    value={inputValue}
                    onPressEnter={(e: any) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            props.inputSubmit(inputValue);
                            setInputValue('')
                        }
                    }}
                    onChange={(e:any) => setInputValue(e.target.value)}
                />
            </div>
            <Button
                variant="bluePrimary"
                size="sm"
                borderRadius={10}
                onClick={() => {
                    props.inputSubmit(inputValue);
                    setInputValue('')
                }}
            >
                <Icon as={CiSearch} boxSize={5} />
            </Button>
        </div>
    );
}
