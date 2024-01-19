import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useChatStore: any = create<any>()(
  persist(
    (set, get) => ({
      // state
      activeChatId: null,
      chatById: {},
      // getters
      getAllChatList: () => {
        const { chatById } = get();
        const chatIds = Object.keys(chatById);

        return chatIds
          .map((id: any) => {
            return chatById[id];
          })
          .filter((item) => !!item);
      },
      getChatList: (type: any) => {
        return get()
          .getAllChatList()
          .filter((item: any) => item.type === type);
      },
      getFirstChatByType: (type: any) => {
        const list = get().getChatList(type);

        if (list && list.length) {
          return list[0];
        }

        return null;
      },
      getActiveChat: () => {
        const { chatById, activeChatId, sharedChat } = get();
        return chatById[activeChatId] || sharedChat;
      },
      getActiveChatMessages: () => {
        const activeChat = get().getActiveChat();
        return activeChat ? activeChat.messages : [];
      },
      getChat: (id: any) => {
        return get().chatById[id] as any;
      },
      getMessage: (chatId: any, messageId: any) => {
        const chat = get().getChat(chatId);
        if (!chat) return null;
        const messages = chat.messages;
        const index = messages.findIndex((m: any) => m.id === messageId);

        if (index !== -1) {
          return messages[index];
        }

        return null;
      },
      hasMessage: (chatId: any, messageId: any) => {
        return !!get().getMessage(chatId, messageId);
      },

      // actions
      addChat: (newChat: any) => {
        set((state: any) => {
          return {
            chatById: {
              ...state.chatById,
              [newChat.id]: newChat,
            },
          };
        });
      },
      addAndSwitchChat: (newChat: any) => {
        set((state: any) => ({
          chatById: {
            ...state.chatById,
            [newChat.id]: newChat,
          },
          activeChatId: newChat.id,
        }));
      },
      removeChat: (id: any) => {
        const chatById = { ...get().chatById };
        delete chatById[id];

        set(() => ({
          chatById,
        }));
      },
      updateChat: (chatId: any, payload: any = {}) => {
        set((state: any) => ({
          chatById: {
            ...state.chatById,
            [chatId]: {
              ...state.chatById[chatId],
              ...payload,
            },
          },
        }));
      },
      switchChat: (activeChatId: any) => {
        set({ activeChatId });
      },
      setActiveChatId: (activeChatId: any) => {
        set({ activeChatId });
      },
      addMessage: (chatId: any, newMessage: any) => {
        set((state: any) => ({
          chatById: {
            ...state.chatById,
            [chatId]: {
              ...state.chatById[chatId],
              messages: [...state.chatById[chatId].messages, ...newMessage],
            },
          },
        }));
      },
      removeMessage: (chatId: any, messageId: any) => {
        const messages = get().chatById[chatId].messages.filter(
          (m: any) => m.id !== messageId
        );
        set((state: any) => ({
          chatById: {
            ...state.chatById,
            [chatId]: {
              ...state.chatById[chatId],
              messages,
            },
          },
        }));
      },
      updateMessage: (chatId: any, messageId: any, payload: any) => {
        const chatById = get().chatById;
        const chat = get().getChat(chatId);
        set({
          chatById: {
            ...chatById,
            [chatId]: {
              ...chatById[chatId],
              messages: chat.messages.map((item: any) => {
                if (item.id === messageId) {
                  return {
                    ...item,
                    ...payload,
                  };
                } else {
                  return item;
                }
              }),
            },
          },
        });
      },
      clearChatInfo: () => {
        set({
          activeChatId: null,
          chatById: {},
        });
      },
    }),
    {
      name: "useChatStore",
    }
  )
);
