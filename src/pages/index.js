import { useEffect, useState } from "react";
import truncateEthAddress from "truncate-eth-address";
import { useConnect, useAccount, useReadContract, useWriteContract, useSendTransaction } from "wagmi";
import { injected } from "wagmi/connectors";
import SimpleSolidityJSON from "../../SimpleSolidityABI.json";
import { parseEther } from "viem";

const SimpleSolidityContractAddress = "0x1DbB9BA2cB0F77c76Ae7755d99316e2A464ED581";

export default function Home() {
  const [donationAmount, setDonationAmount] = useState();
  const { connect } = useConnect();
  const { address } = useAccount();
  const [isMounted, setIsMounted] = useState();
  const { writeContract } = useWriteContract();
  const { sendTransaction } = useSendTransaction();
  const likesCount = useReadContract({
    abi: SimpleSolidityJSON.abi,
    address: SimpleSolidityContractAddress,
    functionName: "likesCount"
  });
  const dislikesCount = useReadContract({
    abi: SimpleSolidityJSON.abi,
    address: SimpleSolidityContractAddress,
    functionName: "dislikesCount"
  })
  const message = useReadContract({
    abi: SimpleSolidityJSON.abi,
    address: SimpleSolidityContractAddress,
    functionName: "message"
  })

  useEffect(() => (
    setIsMounted(true)
  ), []);

  const like = () => {
    writeContract({
      abi: SimpleSolidityJSON.abi,
      address: SimpleSolidityContractAddress,
      functionName: 'like'
    })
  }

  const dislike = () => {
    writeContract({
      abi: SimpleSolidityJSON.abi,
      address: SimpleSolidityContractAddress,
      functionName: 'dislike'
    })
  }

  const donate = (amount) => {
    sendTransaction({ to: SimpleSolidityContractAddress, value: parseEther(amount) })
  }

  return (
    <main className="max-w-[1000px] mx-auto px-4 py-20">
      <div className="flex items-center justify-between">
        <p className="text-4xl">Hello Simple Solidity</p>
        {
          isMounted && (
            address ?
              <p>{truncateEthAddress(address)}</p> :
              <div onClick={() => connect({ connector: injected() })} className="py-3 px-8 bg-zinc-800 cursor-pointer">Connect</div>
          )
        }
      </div>

      <p className="text-2xl my-20">{message.data}</p>
      <div className="flex items-center gap-5">
        <p>{Number(likesCount.data)} likes</p>
        <p>{Number(dislikesCount.data)} dislikes</p>
      </div>
      <div className="flex items-center gap-5 mt-5">
        <div onClick={like} className="py-3 w-[200px] bg-blue-500 text-center cursor-pointer">Like</div>
        <div onClick={dislike} className="py-3 w-[200px] bg-red-700 text-center cursor-pointer">Dislike</div>
      </div>

      <div className="mt-32">
        <p className="mb-3">If you really like this message, but me a coffee</p>
        <div className="flex intes-center gap-5">
          <input value={donationAmount} onChange={(e) => setDonationAmount(e.target.value)} className="py-3 text-black w-full max-w-[500px]" type="number" placeholder="Donation amount in ETH" />
          <div onClick={() => donate(donationAmount)} className="py-3 w-[200px] bg-white text-black text-center cursor-pointer">Donate</div>
        </div>
      </div>
    </main>
  );
}
