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
import dayjs from 'dayjs';
import { userInfoStore } from "store/userInfoStore";
import { getTimeRange } from "lib/common";

export default function UserForm(props: any) {

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
        setBirthDay,
        userConverId,
        setUserConverId
    } = userInfoStore();


    const dateFormat = 'YYYY/MM/DD HH';

    const { item } = props

    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(dateString);
    };

    const submitForm = () => {
        if (!name || !birthDay) {
            setName(item.name)
            setSex(item.sex)
            setBirthDay(item.birthDay)
            setUserConverId(activeChatId)
        }
        updateChat(activeChatId, { name: item.name })
        updateMessage(activeChatId, item.id, { isSubmit: true })
        submitQuestion('form', {
            year: item.birthDay.split('/')[0],
            month: item.birthDay.split('/')[1],
            day: item.birthDay.split('/')[2].split(' ')[0],
            time: getTimeRange(item.birthDay.split('/')[2].split(' ')[1]),
            n: item.sex == '1' ? false : true,
        })
    }
    return (
        <div>
            <div className='w-[400px] p-5 bg-[#fff] rounded-[6px]'>
                <div className='mb-3'>名字</div>
                <Input
                    className='mb-3'
                    size="sm"
                    isDisabled={item.isSubmit}
                    width="100%"
                    placeholder="请输入名字"
                    _focusVisible={{ border: "1px solid #ddd" }}
                    bg="transparent"
                    value={item.name}
                    onChange={(e) => updateMessage(activeChatId, item.id, { name: e.target.value })}
                />
                <div className='mb-3'>性别</div>
                <div className='mb-3'>
                    <RadioGroup isDisabled={item.isSubmit} value={item.sex} onChange={(e) => updateMessage(activeChatId, item.id, { sex: e })}>
                        <Stack direction='row' gap={10}>
                            <Radio value={'1'} colorScheme='purple'>男</Radio>
                            <Radio value={'2'} colorScheme='purple'>女</Radio>
                        </Stack>
                    </RadioGroup>
                </div>
                <div className='mb-3'>出生时间</div>
                <div className='mb-3'>
                    <DatePicker
                        placeholder='请输入时间'
                        showTime
                        disabled={item.isSubmit}
                        value={item.birthDay ? dayjs(item.birthDay, dateFormat) : null}
                        format={dateFormat}
                        onChange={(date: any, dateString: any) => {
                            console.log(dateString)
                            updateMessage(activeChatId, item.id, { birthDay: dateString })
                        }}
                        style={{ 'width': '100%' }}
                    /></div>
                <div className='text-[#B3B3B3] text-[12px]'>首次填写信息时，默认为本人</div>
            </div>
            <Button
                variant="bluePrimary"
                size="md"
                className='mt-3'
                px={5}
                isDisabled={item.isSubmit || !item.name || !item.birthDay}
                borderRadius={4}
                onClick={() => submitForm()}
            >
                提交
            </Button>

        </div>
    );
}
