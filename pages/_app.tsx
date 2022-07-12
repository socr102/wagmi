import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { jsonRpcProvider } from "wagmi/providers/jsonRpc"
import { WagmiConfig, createClient, configureChains, chain } from "wagmi"
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { useState, useEffect} from 'react'

const { provider } = configureChains(
  [chain.mainnet],
  [
      jsonRpcProvider({
        rpc: () => {
          return {
            http: "http://eth-mainnet.blastapi.io/API-KEY",
          };
        },
      }),
  ]
);

const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({
      chains: [chain.mainnet],
    }),
  ],
  provider,
})

function MyApp({ Component, pageProps }: AppProps) {
  const [showChild, setShowChild] = useState<boolean>(false);

  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }
  if (typeof window === 'undefined') {
    return <></>;
  } else {
    return (
      <WagmiConfig client={client}>
        <Component {...pageProps}/>
      </WagmiConfig>
    );
  }
}

export default MyApp
