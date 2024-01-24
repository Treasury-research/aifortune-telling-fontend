import React, { useEffect, useState, useRef } from 'react'
import { Router, useRouter } from "next/router";
import {
    Box,
    Image,
    Flex,
    VStack,
    Icon,
    HStack,
    Tooltip,
    Text,
    PopoverTrigger,
    Popover,
    PopoverContent,
    PopoverArrow,
    PopoverBody,
    Input,
    IconButton,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    SliderMark,
} from "@chakra-ui/react";
import { HiOutlineEllipsisVertical } from "react-icons/hi2";
import { FiEdit } from "react-icons/fi";
import { LuRefreshCcw } from "react-icons/lu";
import { MdDeleteOutline } from "react-icons/md";
import useChatContext from "hooks/useChatContext";
import { v4 as uuidv4 } from "uuid";
import api, { baseURL } from "api";
import { userInfoStore } from "store/userInfoStore";

export default function Channel(props: any) {
    const router = useRouter();
    const myInput = useRef<any>(null);
    const [editIndex, setEditIndex] = useState<any>(null)
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
        submitQuestion,
        addMessage
    } = useChatContext();

    const {
        name,
        birthDay,
        setName,
        setBirthDay,
        userConverId,
        setUserConverId,
        user_id
    } = userInfoStore();

    return (
        <div className='w-full'>
            {
                allChatList.map((t: any, i: number) => (
                    <div
                        key={i}
                        onClick={() => router.push(`/${section}?id=${t.id}`)}
                        className={`w-full ${t.id == activeChatId ? 'bg-[#E4DFF8]' : ''} hover:bg-[#E4DFF8] rounded-[6px] h-10 group cursor-pointer flex items-center justify-between px-5 font-bold mb-5`}>
                        {
                            editIndex == i ? (
                                <div>
                                    <Input
                                        size="sm"
                                        width="100%"
                                        onChange={(e) => updateChat(t.id, { name: e.target.value })}
                                        onBlur={() => {
                                            updateChat(t.id, { name: t.name })
                                            setEditIndex(null);
                                        }}
                                        ref={myInput}
                                        onKeyUp={(e) => {
                                            if (e.key === "Enter") {

                                                setEditIndex(null);
                                            }
                                        }}
                                        placeholder="Enter name"
                                        value={t.name}
                                        _focusVisible={{ border: "1px solid #ddd" }}
                                        bg="transparent"
                                    />
                                </div>
                            ) : (
                                <div className='truncate'>{t.name}</div>
                            )
                        }
                        <div className={`invisible group-hover:visible`}>
                            <Popover placement="top">
                                <PopoverTrigger>
                                    <Flex w="20px" pl={2} justify="center">
                                        <Icon
                                            as={HiOutlineEllipsisVertical}
                                            className="text-[21px] cursor-pointer h-6"
                                            _hover={{ transform: "scale(1.1)" }}
                                        />
                                    </Flex>
                                </PopoverTrigger>
                                <PopoverContent w="140px" ml={2} overflow="hidden" border="none">
                                    <PopoverArrow bg="bg.main" />
                                    <PopoverBody bg="#F3F4F6" px={0} py={1} fontSize="13px">
                                        <HStack
                                            w="full"
                                            _hover={{ bg: "gray.300" }}
                                            cursor="pointer"
                                            px={2}
                                            py={1}
                                            onClick={() => {
                                                setTimeout(() => {
                                                    myInput.current.focus();
                                                }, 100);
                                                setEditIndex(i)
                                            }}
                                        >
                                            <Icon
                                                as={FiEdit}
                                                color="#7A61DE"
                                                cursor="pointer"
                                                w="20px"
                                            />
                                            <Text>编辑</Text>
                                        </HStack>
                                            <HStack
                                                w="full"
                                                _hover={{ bg: "gray.300" }}
                                                cursor="pointer"
                                                px={2}
                                                py={1}
                                                onClick={() => {
                                                    props.resetConvertion()
                                                }}
                                            >
                                                <Icon as={LuRefreshCcw} color="#7A61DE" w="20px" />
                                                <Text
                                                    whiteSpace="nowrap"
                                                    overflow="hidden"
                                                    textOverflow="ellipsis"
                                                >
                                                    重置对话
                                                </Text>
                                            </HStack>
                                        {
                                            allChatList.length > 1 && t.id !== userConverId &&
                                            <HStack
                                                w="full"
                                                _hover={{ bg: "gray.300" }}
                                                px={2}
                                                py={1}
                                                onClick={() => {
                                                    removeChat(t.id)
                                                    const filterChatList = allChatList.filter((item: any) => {
                                                        return t.id !== item.id
                                                    })
                                                    console.log(filterChatList)
                                                    router.push(`/${section}?id=${filterChatList[0]['id']}`)
                                                }}
                                            >
                                                <Icon as={MdDeleteOutline} color="#7A61DE" w="20px" />
                                                <Text>删除对话</Text>
                                            </HStack>
                                        }
                                        {
                                            userConverId &&
                                            <HStack
                                                w="full"
                                                _hover={{ bg: "gray.300" }}
                                                px={2}
                                                py={1}
                                                onClick={() => {
                                                    addMessage(activeChatId, [{
                                                        id: uuidv4(),
                                                        type: 'question',
                                                        category: 'chat',
                                                        content: '精确批文'
                                                    }])
                                                    submitQuestion('jqpp', {
                                                        message: '精确批文'
                                                    })
                                                }}
                                            >
                                                <Icon as={MdDeleteOutline} color="#7A61DE" w="20px" />
                                                <Text>精确批文</Text>
                                            </HStack>
                                        }

                                    </PopoverBody>
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}
