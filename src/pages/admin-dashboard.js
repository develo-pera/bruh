import { useEffect, useState } from "react";
import truncateEthAddress from "truncate-eth-address";
import { useAccount, useWriteContract } from "wagmi";

import SimpleSolidityJSON from "../../SimpleSolidityABI.json";
const SimpleSolidityContractAddress = "0x1DbB9BA2cB0F77c76Ae7755d99316e2A464ED581";

export default function AdminDash() {
  const [message, setMessage] = useState();
  const { address } = useAccount();
  const [isMounted, setIsMounted] = useState();
  useEffect(() => (
    setIsMounted(true)
  ), []);

  const { writeContract } = useWriteContract()

  const saveMessage = (message) => {
    console.log(message)
    writeContract({
      abi: SimpleSolidityJSON.abi,
      address: SimpleSolidityContractAddress,
      functionName: "setMessage",
      args: [
        message
      ]
    })
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

      <textarea value={message} onChange={(e) => setMessage(e.target.value)} className="mt-10 py-3 text-black w-full min-h-[500px]"></textarea>
      <div onClick={(e) => saveMessage(message)} className="py-3 w-[200px] bg-white text-black text-center cursor-pointer">Save Message</div>
    </main>
  )
}