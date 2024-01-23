import React, { useEffect } from 'react'
import {
    Image,
    Skeleton,
    Radio, RadioGroup,
    Stack,
    Button,
    Icon
} from "@chakra-ui/react";
import { Router, useRouter } from "next/router";
import { CiSearch } from "react-icons/ci";
import { Markdown } from './MarkDown'

export default function ChatLeft(props: any) {
    const router = useRouter();
    const { item } = props
    return (
        <div className='flex gap-5 items-start mb-5'>
            <Image className='shrink-0' src={`/images/chat/left-chat.png`} alt="" />
            <div className='max-w-[calc(100vw-600px)] p-5 bg-[#fff] rounded-[6px] overflow-auto'>
                {
                    item.loading ? (
                        <>
                            <Skeleton
                                height="16px"
                                mb={2}
                                w={"400px"}
                                startColor="#F3F3F3"
                                endColor="#DFDFDF"
                                borderRadius={"8px"}
                            />
                            <Skeleton
                                height="16px"
                                mb={2}
                                w={"380px"}
                                startColor="#F3F3F3"
                                endColor="#DFDFDF"
                                borderRadius={"8px"}
                            />
                            <Skeleton
                                height="16px"
                                w={"360px"}
                                startColor="#F3F3F3"
                                endColor="#DFDFDF"
                                borderRadius={"8px"}
                            />
                        </>
                    ) : (
                        // <Markdown value={item.content} />
                        <pre>{item.content}</pre>
                    )
                }

            </div>
        </div>
    );
}
