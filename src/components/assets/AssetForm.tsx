import React, { useEffect, useState } from 'react'
import {
    Image,
    Input,
    Radio, RadioGroup,
    Button,
    Icon
} from "@chakra-ui/react";
import { Router, useRouter } from "next/router";
import { CiSearch } from "react-icons/ci";
import type { DatePickerProps } from 'antd';
import api, { baseURL } from "api";
import { DatePicker, Select } from 'antd';
import useChatContext from "hooks/useChatContext";
import dayjs from 'dayjs';
import { userInfoStore } from "store/userInfoStore";
import { getTimeRange } from "lib/common";

export default function AssetForm(props: any) {

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
        submitQuestion,
        getAssets
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


    const dateFormat = 'YYYY/MM/DD HH';

    const { item } = props

    const submitForm = async () => {
        const res: any = await api.post(`${baseURL}/api/assets_insert`, {
            user_id,
            name:item.name,
            birthday : item.birthDay,
            is_public: item == '1' ? false : true,
            n: true,
        });
        updateChat(activeChatId, { name: item.name })
        if (res && res.length > 0 && res[0]['status'] == "success") {
            getAssets()
            updateMessage(activeChatId, item.id, { isSubmit: true })
            submitQuestion('form', {
                year: item.birthDay.split('/')[0],
                month: item.birthDay.split('/')[1],
                day: item.birthDay.split('/')[2].split(' ')[0],
                time: getTimeRange(item.birthDay.split('/')[2].split(' ')[1]),
                n: true,
                name:item.name
            })
        }
    }

    return (
        <div>
            <div className='w-[400px] p-5 bg-[#fff] rounded-[6px]'>
                <div className='mb-3'>资产名称</div>
                <Input
                    className='mb-3'
                    size="sm"
                    isDisabled={item.isSubmit}
                    width="100%"
                    placeholder="请输资产名称"
                    _focusVisible={{ border: "1px solid #ddd" }}
                    bg="transparent"
                    value={item.name}
                    onChange={(e) => updateMessage(activeChatId, item.id, { name: e.target.value })}
                />
                <div className='mb-3'>创始时间</div>
                <div className='mb-3'>
                    <DatePicker
                        showTime 
                        placeholder='请输入时间'
                        disabled={item.isSubmit}
                        value={item.birthDay ? dayjs(item.birthDay, dateFormat) : null}
                        format={dateFormat}
                        onChange={(date: any, dateString: any) => {
                            console.log(dateString)
                            updateMessage(activeChatId, item.id, { birthDay: dateString })
                        }}
                        style={{ 'width': '100%' }}
                    /></div>
                <div className='mb-3'>谁可以看</div>
                <div className='mb-3'>
                    <Select placeholder='Select option' value={item.is_public} onChange={(e: any) => updateMessage(activeChatId, item.id, { is_public: e })} style={{ 'width': '100%' }}>
                        <option value='1'>仅自己可见</option>
                        <option value='2'>全部人可见</option>
                    </Select></div>
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
