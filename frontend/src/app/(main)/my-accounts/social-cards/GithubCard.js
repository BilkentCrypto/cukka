'use client';

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getCookie, deleteCookie } from 'cookies-next';
import { useEffect, useState } from "react";
import { getGithubUserData } from "@/app/actions";
import { FiGithub } from "react-icons/fi";
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import escrowAbi from '@/utils/escrow_abi.json'
import contractAddresses from '@/utils/contract_addresses.json'
import { formatEther, parseEther } from 'viem'


export default function GithubCard() {
  const [userData, setUserData] = useState();
  const githubCookie = getCookie("GH_token");
  const { writeContract, error, failureReason } = useWriteContract()

  const args = [userData?.login, 0]
  const result = useReadContract({
    abi: escrowAbi,
    address: contractAddresses.ESCROW_CONTRACT_ADDRESS,
    functionName: 'getUserKey',
    args: args
  })
  console.log(result.data)

  const ethBalance = useReadContract({
    abi: escrowAbi,
    address: contractAddresses.ESCROW_CONTRACT_ADDRESS,
    functionName: 'ethBalances',
    args: [result?.data]
  })

  const usdcBalance = useReadContract({
    abi: escrowAbi,
    address: contractAddresses.ESCROW_CONTRACT_ADDRESS,
    functionName: 'usdcBalances',
    args: [result?.data]
  })
  if (usdcBalance.data) console.log("usdc balance: ", formatEther(usdcBalance.data))

  if (ethBalance.data) console.log("eth balance: ", formatEther(ethBalance.data))


  const getGithubUser = async () => {
    const res = await getGithubUserData();
    setUserData(res);
  };

  useEffect(() => {
    if (githubCookie) {
      getGithubUser();
    }
  }, []);

  function connect() {
    window.location.assign("https://github.com/login/oauth/authorize?client_id=" + process.env.NEXT_PUBLIC_CLIENT_ID);
  }

  function disconnect() {
    deleteCookie('GH_token');
    setUserData(null);
  }

  const getHostedSecretVersion = async () => {
    console.log(githubCookie)
    const res = await fetch("https://course-wizard.com:8011/store/github", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: githubCookie
      })
    });
    const response = await res.json()
    return response.version
  }

  const handleClaim = async () => {
    const version = await getHostedSecretVersion();
    console.log("version", version)
    const userData = await getGithubUserData();
    const username = userData.login;
    try {
      const args = [username, version, 0]

      await writeContract({
        abi: escrowAbi,
        address: contractAddresses.ESCROW_CONTRACT_ADDRESS,
        functionName: 'sendClaimRequest',
        args: args
      })
    } catch (e) {
      console.log("hey");
      console.log(e)
    }
  };
  const isConnected = userData ? true : false;
  return (
    <Card className="bg-card text-card-foreground p-6 gap-y-2 flex flex-col items-center justify-between h-42">
      <div className="flex items-center gap-4">
        <FiGithub className="w-8 h-8 text-[#333]" />
        {userData ? (
          <div>
            <h3 className="text-lg font-semibold">@{userData.login}</h3>
            <p className="text-muted-foreground text-sm">Github</p>
          </div>
        ) : (
          <div>
            <h3 className="text-lg font-semibold">Github</h3>
          </div>
        )}
      </div>
      {
        isConnected &&
        <div>
          {ethBalance.data && <h3>ETH Balance: {formatEther(ethBalance.data)}</h3>}
          {usdcBalance.data && <h3>USDC Balance: {formatEther(usdcBalance.data)}</h3>}
        </div>

      }
      <Button onClick={isConnected ? disconnect : connect} variant={isConnected ? "destructive" : "secondary"}>
        {isConnected ? "Disconnect" : "Connect"}
      </Button>
      {
        isConnected && (<Button onClick={handleClaim} variant="secondary">
          {isConnected ? "Claim Cukka" : "No Cukka"}
        </Button>)
      }

    </Card>
  );
}


