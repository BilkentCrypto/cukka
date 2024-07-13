'use client';
import Image from "next/image";
import ConnectButton from "@/components/ui/ConnectButton";
import { Button } from "@/components/ui/button";
import { useAccount, useBalance, useBlockNumber } from 'wagmi'


export default function TestPage() {

  const balance = useBalance();
  const blockNumber = useBlockNumber();
  const {address} = useAccount()
  console.log(balance)
  console.log(blockNumber)
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      Hey
      {balance.data?.value?.toString()}
      {blockNumber.data?.toString()}
      {address}

    </main>
  );
}
