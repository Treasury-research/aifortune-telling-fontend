import React, { useEffect, useState } from 'react'
import {
  Image,
  Input,
  Radio, RadioGroup,
  Stack,
  Button,
  Icon
} from "@chakra-ui/react";
import { Router, useRouter } from "next/router";
import { CiSearch } from "react-icons/ci";
import type { DatePickerProps } from 'antd';
import { DatePicker, Space } from 'antd';
import useChatContext from "hooks/useChatContext";
import { userInfoStore } from "store/userInfoStore";
import UserForm from './../numberology/UserForm'
import AssetForm from './../assets/AssetForm'
import { Markdown } from './MarkDown'

export default function ChatRight(props: any) {
  const router = useRouter();

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
    updateMessage,
    submitQuestion
  } = useChatContext();

  const {
    name,
    birthDay,
    setName,
    setSex,
    setBirthDay
  } = userInfoStore();

  const { item } = props

  return (
    <div className='flex'>
      <div className='flex gap-5 items-start ml-auto mb-5'>
        {
          item.category == 'form' ? (
            <>
              {
                section == 'numerology' ? (
                  <UserForm item={item} />
                ) : (
                  <AssetForm item={item} />
                )
              }
            </>
          ) : (
            <div className='max-w-[500px] p-3 bg-[#fff] rounded-[6px]'><Markdown value={item.content} /></div>
          )
        }
        <Image className='shrink-0' src={`/images/chat/right-chat.png`} alt="" />
      </div>
    </div>
  );
}
