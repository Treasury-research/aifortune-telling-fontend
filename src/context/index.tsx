import React, { createContext, useCallback, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useBoolean, useDisclosure } from "@chakra-ui/react";
import api, { baseURL } from "api";
import { useRouter } from "next/router";
import { useChatStore } from "store/chatStore";
import { userInfoStore } from "store/userInfoStore";

export const ChatContext = createContext({});

export default function ChatProvider({ children }: any) {
  const router = useRouter();

  const {
    setTotalCoupon,
    setDailyAdd,
    addChat,
    activeChatId,
    getActiveChat,
    getActiveChatMessages,
    setActiveChatId,
    removeMessage,
    addMessage,
    updateMessage,
    getAllChatList,
    getChatList,
    getFirstChatByType,
    removeChat,
    updateChat,
    getMessage,
    getChat,
    chatById,
    channel,
    setChannel,
  } = useChatStore();

  const {
    name,
    birthDay,
    setName,
    setSex,
    setBirthDay,
    userConverId,
    user_id,
    setUserId,
    setAssets
  } = userInfoStore();

  const [section, setSection] = useState(router.pathname.split("/")[1]);
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [input, setInput] = useState("");

  let activeChat: any = getActiveChat();
  const activeMessages: any = getActiveChatMessages();
  const chatList: any = getAllChatList()
    .filter(
      (item: any) =>
        item.section === section
    )
    .sort((a: any, b: any) => {
      if (a.createTime > b.createTime) {
        return -1;
      }

      return 1;
    });

  const [allChatList, setAllChatList] = useState(chatList);

  useEffect(() => {
    console.log('router',router)
    if (router.query.id) {
      if (getChat(router.query.id)) {
        setActiveChatId(router.query.id);
      }
    }
    if (router.pathname) {
      setSection(router.pathname.split("/")[1]);
    }
    onScroll(600)
  }, [router]);

  useEffect(() => {
    const chatList: any = getAllChatList()
      .filter(
        (item: any) =>
          item.section === section
      )
      .sort((a: any, b: any) => {
        if (a.createTime > b.createTime) {
          return -1;
        }

        return 1;
      });

    setAllChatList(chatList);
  }, [section, chatById, activeChatId]);

  const getAssets = async () => {
    const res:any = await api.post(`${baseURL}/api/assets_select`, {
      user_id,
    });
    if(res && res.length > 0 && res[0].data && res[0].data.length > 0){
      setAssets(res[0].data)
    }
  }

  const onScroll = (timer: number) => {
    setTimeout(() => {
      const chatContent = document.getElementById("chat-content");
      chatContent && chatContent?.scrollTo({ top: 50000, behavior: "smooth" });
    }, timer);
  };

  const isJSONString = (str: string) => {
    try {
      JSON.parse(str);
      return true;
    } catch (error) {
      console.log('error',error)
      return false;
    }
  };

  const submitQuestion = async (type: 'chat' | 'form', paload: any) => {
    if (section == 'numerology') {
      handleNumer(type, paload)
    } else {
      handleAsset(type, paload)
    }
  }

  const handleAsset = async (type: 'chat' | 'form', paload: any) => {
    const id = uuidv4()
    addMessage(activeChatId, [{
      id,
      content: '',
      type: 'answer',
      loading: true
    }])

    onScroll(400)

    const onChunkedResponseError = (err: any) => {
      console.error(err);
    };

    const processChunkedResponse = (response: any) => {
      console.log('response', response)
      return new Promise((resolve, reject) => {
        var reader = response.body.getReader();
        var decoder = new TextDecoder();
        let sourceChunk = '';

        return readChunk();

        async function readChunk() {
          onScroll(400)
          return reader.read().then(appendChunks);
        }

        function appendChunks(result: any) {

          let chunk: any = decoder.decode(result.value || new Uint8Array(), {
            stream: !result.done,
          });

          sourceChunk += chunk

          updateMessage(activeChatId, id, {
            content: sourceChunk,
            loading: false
          })

          // console.log("chunk1", chunk);
          if (result.done) {
            console.log(result)
          } else {
            return readChunk();
          }
        }
      });
    };
    // let body :any;
    let url: any
    let params: any

    if (type == 'form') {
      url = '/api/baziMatch'
        params = {
          ...paload,
          user_id,
          conversation_id:activeChat.id,
          matcher_type:'2'
        }
    } else {
      url = '/api/chat_bazi_match'
      params = {
        ...paload,
        conversation_id: activeChat.id
      }
    }

    await fetch(`${baseURL}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...params
      }),
    })
      .then(processChunkedResponse)
      .then((respones: any) => {
        if (respones.done) {
          console.log(respones)
        }
      })
      .catch(onChunkedResponseError);
  }

  const handleNumer = async (type: 'chat' | 'form', paload: any) => {
    const id = uuidv4()
  
    const onChunkedResponseError = (err: any) => {
      console.error(err);
    };

    const processChunkedResponse = (response: any) => {
      console.log('response', response)
      return new Promise((resolve, reject) => {
        var reader = response.body.getReader();
        var decoder = new TextDecoder();
        let sourceChunk = '';

        return readChunk();

        async function readChunk() {
          onScroll(400)
          return reader.read().then(appendChunks);
        }

        function appendChunks(result: any) {

          let chunk: any = decoder.decode(result.value || new Uint8Array(), {
            stream: !result.done,
          });
          console.log('chunk',chunk)

          let str: any = chunk.match(/<chunk>([\s\S]*?)<\/chunk>/g);
          if (str && Array.isArray(str) && str.length > 0) {
            let chunk1: any = str.map((t: string) => t.replace(/<\/?chunk>/g, ""));
            for (let i = 0; i < chunk1.length; i++) {
              if (isJSONString(chunk1[i])) {
                let user = JSON.parse(chunk1[i])
                if (user.user_id) {
                  setUserId(user.user_id)
                }
                chunk.replace(chunk1[i], '')
              }
            }
          }
          const regex = /<chunk>.*?<\/chunk>/g;

          chunk = chunk.replace(regex, "")

          // chunk.replace(/<\/?chunk>/g, "")

          sourceChunk += chunk

          console.log('sourceChunk',sourceChunk)

          updateMessage(activeChatId, id, {
            content: sourceChunk,
            loading: false
          })

          // console.log("chunk1", chunk);
          if (result.done) {
            console.log(result)
          } else {
            return readChunk();
          }
        }
      });
    };
    // let body :any;
    let url: any
    let params: any
    let source:any
    if (type == 'form') {
      // 已经填入个人信息，走八字匹配接口
      if (userConverId && user_id) {
        url = '/api/baziMatch'
        params = {
          ...paload,
          user_id,
          conversation_id:activeChat.id,
          matcher_type:'1'
        }
      } else {
        url = '/api/baziAnalysis'
        params = {
          ...paload,
          conversation_id:activeChat.id
        }
      }
    } else {
      // 个人聊天
      if (userConverId == activeChat.id) {
        url = '/api/chat_bazi'
      } else {
        // 八字聊天
        url = '/api/chat_bazi_match'
      }
      params = {
        ...paload,
        conversation_id: activeChat.id
      }
    }

    addMessage(activeChatId, [{
      id,
      content: '',
      type: 'answer',
      loading: true,
      source:type
    }])

    onScroll(400)

    // await api.post(`${baseURL}/api/assets_select`, {
    //   user_id:'',
    // });

    await fetch(`${baseURL}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...params
      }),
    })
      .then(processChunkedResponse)
      .then((respones: any) => {
        if (respones.done) {
          console.log(respones)
        }
      })
      .catch(onChunkedResponseError);
  }

  return (
    <ChatContext.Provider
      value={{
        onOpen,
        onClose,
        isOpen,
        setInput,
        input,
        activeChatId,
        activeChat,
        activeMessages,
        setActiveChatId,
        removeMessage,
        allChatList,
        getChatList,
        section,
        setSection,
        getChat,
        addChat,
        removeChat,
        updateChat,
        updateMessage,
        submitQuestion,
        addMessage,
        getAssets
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
