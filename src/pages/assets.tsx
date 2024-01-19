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
import { IoMdAdd } from "react-icons/io";
import moment from "moment";
import { getTimeRange } from "lib/common";

export default function assets() {
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
    addMessage,
    getAssets
  } = useChatContext();
  const {
    name,
    user_id,
    assets
  } = userInfoStore();
  const router = useRouter();
  const toast = useToast();

  const resetConvertion = async () => {
    const res: any = await api.post(`${baseURL}/api/reset_chat`, {
      conversation_id: activeChatId,
    });
    if (res && res.length > 0 && res[0]['status'] == "success") {
      updateChat(activeChatId, {
        messages: [],
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
      messages: [],
      name: `# 资产运势 ${time}`
    };

    addChat(newChat);
    router.push(`/${section}?id=${newChat.id}`);
  }

  const addAssets = () => {
    updateChat(activeChatId, {
      messages: [
        {
          id: uuidv4(),
          content: '请填写币种信息，以便占卜师为您预测运势~',
          type: 'answer',
          loading: false
        },
        {
          id: uuidv4(),
          type: 'question',
          isSubmit: false,
          category: 'form',
          name: '',
          birthDay: '',
          is_public: '1'
        }
      ],
    })
  }

  const assetsBtnClick = (t: any) => {
    const parsedDate = moment(t[1]).format('YYYY/MM/DD HH')
    submitQuestion('form', {
      year: parsedDate.split('/')[0],
      month: parsedDate.split('/')[1],
      day: parsedDate.split('/')[2].split(' ')[0],
      time: getTimeRange(parsedDate.split('/')[2].split(' ')[1]),
      n: true,
    })
  }

  useEffect(() => {
    if (allChatList.length == 0) {
      createNewChat()
    }
  }, [allChatList])

  useEffect(() => {
    getAssets()
    if (!name) {
      router.push(`/numerology`);
    }
  }, [])

  return (
    <>
      <Head>
        <title>AI</title>
      </Head>
      <div className='w-full h-full flex'>
        <div className='w-[120px] h-full bg-[#E4DFF8]'>
          <div className='w-[50px] mx-auto mt-5 mb-10 h-[50px]'>
            <Image className='shrink-0' src={`/images/logo.png`} alt="" />
          </div>
          <Left />
        </div>
        <div className='w-[300px] h-full px-5 py-10 overflow-auto no-scrollbar'>
          <div className='text-[20px] font-bold mb-10'>资产运势</div>
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
            <div className='h-[calc(100%-100px)] overflow-auto no-scrollbar' id="chat-content">
              {
                activeChat && activeChat.messages && activeChat.messages.length > 0 ? (
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
                ) : (
                  <div className='w-full h-full items-center justify-center flex'>
                    <div className='w-[80%]'>
                      <div className='mb-10 font-bold text-[16px] text-center'>
                        请选择下列币种，占卜您与该币种的关系
                      </div>
                      <div className="overflow-hidden w-full">
                        {
                          assets.map((t: any, i: number) => (
                            <div className="truncate w-[120px] flex items-center justify-center 
                            mb-3 float-left mr-3 mx-4 h-10 border-[1px] 
                            border-[#D8D8D8] bg-[#fff] hover:opacity-70 
                            rounded-[2px] cursor-pointer text-center"
                              onClick={() => assetsBtnClick(t)}>
                              {t[0]}
                            </div>
                          ))
                        }
                      </div>
                      <div className='flex justify-center mt-10'>
                        <Button
                          variant="bluePrimary"
                          size="md"
                          className='mt-3'
                          px={5}
                          borderRadius={4}
                          onClick={() => addAssets()}
                        >
                          <Icon
                            as={IoMdAdd}
                            color="bg.white"
                            boxSize={5}
                          />
                          添加资产
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              }
            </div>
            {
              activeChat && activeChat.messages && activeChat.messages.length > 0 && (
                <div className='h-[100px] flex items-center'>
                  <ChatInput inputSubmit={(e: any) => {
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
              )
            }
          </div>
        </div>
      </div>
    </>
  );
}
