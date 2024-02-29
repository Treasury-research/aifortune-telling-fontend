import React, { useEffect } from 'react'
import {
    Image
} from "@chakra-ui/react";
import { Router, useRouter } from "next/router";
import { userInfoStore } from "store/userInfoStore";
import { useToast } from "@chakra-ui/react";
import { useChatStore } from "store/chatStore";

const tabs = [{
    name: '命理',
    img: 'ml',
    router: 'numerology'
},
// {
//     name: '资产',
//     img: 'zc',
//     router: 'assets'
// }
]

export default function Left() {
    const router = useRouter();
    const toast = useToast();
    const {
        name
    } = userInfoStore();
    const {
        getAllChatList
    } = useChatStore();

    return (
        <div className='w-full'>
            {
                tabs.map((t: any, i: number) => (
                    <div key={i} className='w-10 mx-auto text-center rounded-[50%] background-[#fff] cursor-pointer mb-5'
                        onClick={() => {
                            if (!name) {
                                toast({
                                    description: '请先提交您的个人信息!',
                                    duration: 3000,
                                    position: "top-right",
                                    variant: "subtle",
                                    status: "info",
                                    isClosable: false,
                                });
                                router.push(`/numerology`)
                                return
                            }
                            const chatList: any = getAllChatList()
                                .filter(
                                    (item: any) =>
                                        item.section === t.router
                                )
                                .sort((a: any, b: any) => {
                                    if (a.createTime > b.createTime) {
                                        return -1;
                                    }

                                    return 1;
                                });
                            if (chatList.length > 0) {
                                router.push(`/${t.router}?id=${chatList[0].id}`)
                            } else {
                                router.push(`/${t.router}`)
                            }

                        }}>
                        <div className={`w-10 h-10 flex items-center justify-center mx-auto mb-2 ${router.pathname.includes(t.router) ? 'bg-[#EFECFB]' : ''} rounded-[50%]`}>
                            <Image src={`/images/left/${router.pathname.includes(t.router) ? `${t.img}_active` : t.img}.png`} alt="" />
                        </div>
                        <span>{t.name}</span>
                    </div>
                ))
            }
        </div>
    );
}
