import { createWeb3Modal } from "@web3modal/wagmi/react";
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import { WagmiProvider } from "wagmi";
import { arbitrum, mainnet } from "wagmi/chains";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = "7357e2defc3d574ff101a3b9634e2b60";

// 2. Create wagmiConfig
const metadata = {
	name: "Web3Modal",
	description: "Web3Modal Example",
	url: "https://web3modal.com", // origin must match your domain & subdomain
	icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const chains = [mainnet] as const;
const config = defaultWagmiConfig({
	chains,
	ssr: true,
	pollingInterval: 10_0000,
	projectId,
	metadata,
	// enableInjected: false,
	// enableEIP6963: false,
	enableCoinbase: false,
	enableSmartAccounts: false,
	enableWalletConnect: false,
});

// 3. Create modal
createWeb3Modal({
	wagmiConfig: config,
	projectId,
	enableAnalytics: false, // Optional - defaults to your Cloud configuration
	enableOnramp: false, // Optional - false as default
});

export function Web3ModalProvider({ children }: { children: any }) {
	const [ready, setReady] = useState(false);

	useEffect(() => {
		setReady(true);
	}, []);
	return (
		<WagmiProvider config={config}>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</WagmiProvider>
	);
}
