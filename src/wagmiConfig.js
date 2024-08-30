import { http, createConfig } from 'wagmi'
import { localhost, sepolia } from 'wagmi/chains'
import { injected, metaMask } from 'wagmi/connectors'

const config = createConfig({
  chains: [localhost, sepolia],
  transports: {
    [sepolia.id]: http(),
  },
});

export {
  config
}