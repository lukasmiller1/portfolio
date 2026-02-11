/* Client-side WalletConnect universal connector config */
"use client";

import type { AppKitNetwork } from "@reown/appkit/networks";
import type { CustomCaipNetwork } from "@reown/appkit-common";
import { UniversalConnector } from "@reown/appkit-universal-connector";

const projectId =
  process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ||
  process.env.PROJECT_ID ||
  "";

if (!projectId) {
  // In dev this will surface clearly if the env var is missing.
  // For production, ensure NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is set.
  // eslint-disable-next-line no-console
  console.warn(
    "NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is not set. WalletConnect will not be initialized."
  );
}

// Simple Ethereum mainnet network definition for WalletConnect
const ethMainnet: CustomCaipNetwork<"eip155"> = {
  id: 1,
  chainNamespace: "eip155" as const,
  caipNetworkId: "eip155:1",
  name: "Ethereum Mainnet",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: { default: { http: ["https://cloudflare-eth.com"] } },
};

export const networks = [ethMainnet] as [AppKitNetwork, ...AppKitNetwork[]];

let universalConnectorPromise:
  | Promise<InstanceType<typeof UniversalConnector>>
  | null = null;

export async function getUniversalConnector() {
  if (!projectId) {
    throw new Error(
      "WalletConnect project ID is not configured. Set NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID in your .env file."
    );
  }

  if (!universalConnectorPromise) {
    universalConnectorPromise = UniversalConnector.init({
      projectId,
      metadata: {
        name: "My Projects Marketplace",
        description: "Project store with wallet connection",
        url: "http://localhost:3000",
        icons: ["https://www.walletconnect.com/icon.png"],
      },
      networks: [
        {
          methods: ["eth_sendTransaction", "personal_sign"],
          chains: [ethMainnet],
          events: [],
          namespace: "eip155",
        },
      ],
    });
  }

  return universalConnectorPromise;
}

