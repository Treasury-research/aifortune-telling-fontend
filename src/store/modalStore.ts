import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useConnectModalStore: any = create<any>()(
	persist(
		(set, get) => ({
			openConnectModal: false,
			setOpenConnectModal: (openConnectModal: boolean) => {
				set({ openConnectModal });
			},

			clearConnectModalStore: () => {
				set({
					openConnectModal: false,
				});
			},
		}),
		{
			name: "useConnectModalStore",
		}
	)
);
