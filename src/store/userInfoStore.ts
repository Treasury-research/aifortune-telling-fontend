import { create } from "zustand";
import { persist } from "zustand/middleware";

export const userInfoStore: any = create<any>()(
	persist(
		(set, get) => ({
			// state
			account: "",
			email: "",
			name: "",
			token: "",
			sex: false, //false 男 true女
			birthDay: "",
			userId: "",
			userConverId: "",
			assets: [],
			setAccount: (account: string) => {
				set({ account });
			},
			setEmail: (email: string) => {
				set({ email });
			},
			setToken: (token: string) => {
				set({ token });
			},
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
			setUserId: (userId: string) => {
				set({
					userId,
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
			clearUserInfo: () => {
				set({
					account: "",
					email: "",
					name: "",
					sex: false, //false 男 true女
					birthDay: "",
					userId: "",
					token: "",
					userConverId: "",
					assets: [],
				});
			},
		}),
		{
			name: "useUserInfoStore",
		}
	)
);
