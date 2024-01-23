import React, { useEffect } from 'react'
import Head from "next/head";
import Left from "components/common/Left"
import Channel from "components/common/Channel"
import ChatInput from "components/common/ChatInput"
import ChatLeft from "components/common/ChatLeft"
import ChatRight from "components/common/ChatRight"
import { Router, useRouter } from "next/router";
import {
  Image,
  Input,
  Radio, RadioGroup,
  Stack,
  Button,
  Icon
} from "@chakra-ui/react";
import useChatContext from "hooks/useChatContext";
import { v4 as uuidv4 } from "uuid";
import { userInfoStore } from "store/userInfoStore";
import { useToast } from "@chakra-ui/react";
import api, { baseURL } from "api";

export default function Numerology() {
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
    name
  } = userInfoStore();
  const router = useRouter();
  const toast = useToast();

  const resetConver = [
    {
      id: uuidv4(),
      content: '请填写以下个人信息，以便占卜师为您预测运势~',
      type: 'answer',
      loading: false
    },
    {
      id: uuidv4(),
      type: 'question',
      isSubmit: false,
      category: 'form',
      name: '',
      sex: '1', //1 男 2女
      birthDay: '',
    }
  ]

  const resetConvertion = async () => {
    const res: any = await api.post(`${baseURL}/api/reset_chat`, {
      conversation_id: activeChatId,
    });
    if (res && res.length > 0 && res[0]['status'] == "success") {
      updateChat(activeChatId, {
        messages: [...resetConver],
      })
    }
  }

  const createNewChat = () => {
    const timestamp = new Date().getTime();
    const time = new Date(timestamp).toLocaleTimeString();
    let newChatId = uuidv4();

    const newChat: any = {
      id: newChatId,
      timestamp: timestamp,
      section,
      messages: [...resetConver],
      name: `新的占卜 ${time}`
    };

    addChat(newChat);
    router.push(`/${section}?id=${newChat.id}`);
  }


  useEffect(() => {
    if (allChatList.length == 0) {
      createNewChat()
    }
  }, [allChatList])

  return (
    <>
      <div className='w-full h-full flex'>
        <div className='w-[120px] h-full bg-[#E4DFF8]'>
          <div className='w-[50px] mx-auto mt-5 mb-10 h-[50px]'>
            <Image className='shrink-0' src={`/images/logo.png`} alt="" />
          </div>
          <Left />
        </div>
        <div className='w-[300px] h-full px-5 py-10 overflow-auto no-scrollbar'>
          <div className='text-[20px] font-bold mb-10'>命理占卜</div>
          <Channel resetConvertion={() => resetConvertion()} />
          <div className='w-full h-10 cursor-pointer px-5' onClick={() => {
            if (!name) {
              toast({
                description: '请先提交您的个人信息!',
                duration: 3000,
                position: "top-right",
                variant: "subtle",
                status: "info",
                isClosable: false,
              });
              return
            }
            createNewChat()
          }}>
            <span className='text-[20px] font-bold'>+</span> 新的占卜
          </div>
        </div>

        <div className='w-[calc(100%-280px)] h-full pr-5'>
          <div className='h-20 flex items-center text-[18px] font-bold'>{activeChat ? activeChat.name : ''}</div>
          <div className='w-full h-[calc(100%-80px)] bg-[#F3F4F6] rounded-[10px] pt-10 px-10'>
            <div className='h-[calc(100%-100px)] overflow-auto' id="chat-content">
              {
                activeChat && activeChat.messages && (
                  <>
                    {
                      activeChat.messages.map((t: any, i: number) => (
                        <div key={i}>
                          {
                            t.type == 'answer' &&
                            <ChatLeft item={t} />
                          }
                          {
                            t.type == 'question' &&
                            <ChatRight item={t} />
                          }
                        </div>
                      ))
                    }
                  </>
                )
              }
            </div>
            <div className='h-[100px] flex items-center'>
              <ChatInput inputSubmit={(e: any) => {
                const lastActiveMsg = activeChat.messages[activeChat.messages.length - 1]
                if (lastActiveMsg && lastActiveMsg.category == 'form' && !lastActiveMsg.isSubmit) {
                  toast({
                    description: '请先提交您的个人信息!',
                    duration: 3000,
                    position: "top-right",
                    variant: "subtle",
                    status: "info",
                    isClosable: false,
                  });
                  return
                }
                addMessage(activeChatId, [{
                  id: uuidv4(),
                  type: 'question',
                  category: 'chat',
                  content: e
                }])
                submitQuestion('chat', {
                  message: e
                })
              }} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
