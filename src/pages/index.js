import truncateEthAddress from "truncate-eth-address";
import { useConnect, useAccount, useReadContract, useChainId } from "wagmi";
import { injected } from "wagmi/connectors";
import SimpleSolidityJSON from "../../SimpleSolidityABI.json";

const SimpleSolidityContractAddress = "0xd0eFE13123E4077371B6A23d54cB0634C95D4b37";

export default function Home() {
  const { connect } = useConnect();
  const { address } = useAccount();
  const result = useReadContract({
    abi: SimpleSolidityJSON.abi,
    address: SimpleSolidityContractAddress,
    functionName: "likesCount"
  })

  return (
    <main className="max-w-[1000px] mx-auto px-4 py-20">
      <div className="flex items-center justify-between">
        <p className="text-4xl">Hello Simple Solidity</p>
        {
          address ?
            <p>{truncateEthAddress(address)}</p> :
            <div onClick={() => connect({ connector: injected() })} className="py-3 px-8 bg-zinc-800 cursor-pointer">Connect</div>
        }
      </div>

      <p className="text-2xl my-20">Lorem ipsum...</p>
      <div className="flex items-center gap-5">
        <p>{Number(result.data)} likes</p>
        <p>100 dislikes</p>
      </div>
      <div className="flex items-center gap-5 mt-5">
        <div className="py-3 w-[200px] bg-blue-500 text-center cursor-pointer">Like</div>
        <div className="py-3 w-[200px] bg-red-700 text-center cursor-pointer">Dislike</div>
      </div>

      <div className="mt-32">
        <p className="mb-3">If you really like this message, but me a coffee</p>
        <div className="flex intes-center gap-5">
          <input className="py-3 text-black w-full max-w-[500px]" type="number" placeholder="Donation amount in ETH" />
          <div className="py-3 w-[200px] bg-white text-black text-center cursor-pointer">Donate</div>
        </div>
      </div>
    </main>
  );
}