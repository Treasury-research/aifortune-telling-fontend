import { create } from "zustand";
import { persist } from "zustand/middleware";

export const userInfoStore: any = create<any>()(
  persist(
    (set, get) => ({
      // state
      name: '',
      sex: false, //false 男 true女
      birthDay: '',
      user_id:'',
      userConverId:'',
      assets:[],
      setAssets: (assets: any) => {
        set({
          assets,
        });
      },
      setName: (name: string) => {
        set({
          name,
        });
      },
      setUserId: (user_id: string) => {
        set({
          user_id,
        });
      },
      setUserConverId: (userConverId: string) => {
        set({
          userConverId,
        });
      },
      setSex: (sex: boolean) => {
        set({
          sex,
        });
      },
      setBirthDay: (birthDay: string) => {
        set({
          birthDay,
        });
      },
      clearChatInfo: () => {
        set({
          name: '',
          sex: '1', //1 男 2女
          birthDay: '',
          assets:[]
        });
      },
    }),
    {
      name: "useUserInfoStore",
    }
  )
);
