"use client";

import { createAppKit } from "@reown/appkit/react";
import { EthersAdapter } from "@reown/appkit-adapter-ethers";
import { mainnet, arbitrum } from "@reown/appkit/networks";
import type { ReactNode } from "react";

const projectId =
  process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ||
  process.env.NEXT_PUBLIC_PROJECT_ID;

if (!projectId) {
  throw new Error(
    "WalletConnect project ID is missing. Set NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID in .env"
  );
}

const metadata = {
  name: "My Projects Marketplace",
  description: "Sell and showcase games, scripts, bots, and website projects.",
  url: typeof window !== "undefined" ? window.location.origin : "http://localhost:3000",
  icons: ["/favicon.ico"],
};

createAppKit({
  adapters: [new EthersAdapter()],
  metadata,
  networks: [mainnet, arbitrum],
  defaultNetwork: mainnet,
  projectId,
  features: {
    analytics: true,
  },
});

export function AppKitProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
