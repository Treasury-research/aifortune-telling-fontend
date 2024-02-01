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
import { DatePicker, Select } from 'antd';
import useChatContext from "hooks/useChatContext";
import dayjs from 'dayjs';
import { userInfoStore } from "store/userInfoStore";
import { getTimeRange, getCnDate } from "lib/common";

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


    const dateFormat = 'YYYY/MM/DD';

    const { item } = props

    const submitForm = () => {

        let cnTime = getCnDate(item.utc, item.birthDay, item.time)
        let time = getTimeRange(cnTime[1])
        // console.log(cnTime)
        // console.log(time)
        if (!name || !birthDay) {
            setName(item.name)
            setSex(item.sex)
            setBirthDay(item.birthDay)
            setUserConverId(activeChatId)
        }
        updateChat(activeChatId, { name: item.name })
        updateMessage(activeChatId, item.id, { isSubmit: true })
        submitQuestion('form', {
            year: cnTime[0].split('/')[0],
            month: cnTime[0].split('/')[1],
            day: cnTime[0].split('/')[2],
            time: time,
            n: item.sex == '1' ? false : true,
        })
    }

    return (
        <div>
            <div className='w-[460px] p-5 bg-[#fff] rounded-[6px]'>
                <div className='mb-3'>姓名</div>
                <Input
                    className='mb-3'
                    size="sm"
                    isDisabled={item.isSubmit}
                    width="100%"
                    placeholder="请输入姓名"
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
                <div className='mb-3 flex items-center'>
                    <div className='w-[28%] mr-3'>
                        <Select value={item.utc} disabled={item.isSubmit} onChange={(e: any) => updateMessage(activeChatId, item.id, { utc: e })} style={{ 'width': '100%' }}>
                            <option value='UTC-11:00'>UTC-11:00</option>
                            <option value='UTC-10:00'>UTC-10:00</option>
                            <option value='UTC-09:00'>UTC-09:00</option>
                            <option value='UTC-08:00'>UTC-08:00</option>
                            <option value='UTC-07:00'>UTC-07:00</option>
                            <option value='UTC-06:00'>UTC-06:00</option>
                            <option value='UTC-05:00'>UTC-05:00</option>
                            <option value='UTC-04:00'>UTC-04:00</option>
                            <option value='UTC-03:00'>UTC-03:00</option>
                            <option value='UTC-02:00'>UTC-02:00</option>
                            <option value='UTC-01:00'>UTC-01:00</option>
                            <option value='UTC+00:00'>UTC+00:00</option>
                            <option value='UTC+01:00'>UTC+01:00</option>
                            <option value='UTC+02:00'>UTC+02:00</option>
                            <option value='UTC+03:00'>UTC+03:00</option>
                            <option value='UTC+04:00'>UTC+04:00</option>
                            <option value='UTC+05:00'>UTC+05:00</option>
                            <option value='UTC+06:00'>UTC+06:00</option>
                            <option value='UTC+07:00'>UTC+07:00</option>
                            <option value='UTC+08:00'>UTC+08:00</option>
                            <option value='UTC+09:00'>UTC+09:00</option>
                            <option value='UTC+10:00'>UTC+10:00</option>
                            <option value='UTC+11:00'>UTC+11:00</option>
                        </Select>
                    </div>
                    <div className='w-[calc(42%-24px)] mr-3'>
                        <DatePicker
                            placeholder='请输入时间'
                            disabled={item.isSubmit}
                            value={item.birthDay ? dayjs(item.birthDay, dateFormat) : null}
                            format={dateFormat}
                            onChange={(date: any, dateString: any) => {
                                updateMessage(activeChatId, item.id, { birthDay: dateString })
                            }}
                            style={{ 'width': '100%' }}
                        />
                    </div>
                    <div className='w-[30%]'>
                        <Select value={item.time} disabled={item.isSubmit} onChange={(e: any) => updateMessage(activeChatId, item.id, { time: e })} style={{ 'width': '100%' }}>
                            <option value='01:00~02:59'>01:00~02:59</option>
                            <option value='03:00~04:59'>03:00~04:59</option>
                            <option value='05:00~06:59'>05:00~06:59</option>
                            <option value='07:00~08:59'>07:00~08:59</option>
                            <option value='09:00~10:59'>09:00~10:59</option>
                            <option value='11:00~12:59'>11:00~12:59</option>
                            <option value='13:00~14:59'>13:00~14:59</option>
                            <option value='15:00~16:59'>15:00~16:59</option>
                            <option value='17:00~18:59'>17:00~18:59</option>
                            <option value='19:00~20:59'>19:00~20:59</option>
                            <option value='21:00~22:59'>21:00~22:59</option>
                            <option value='23:00~00:59'>23:00~00:59</option>
                        </Select>
                    </div>
                </div>
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
