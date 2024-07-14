'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PlatformButton from './PlatformButton';
import TwitterIcon from '@/components/icons/TwitterIcon';
import { FiGithub } from "react-icons/fi";
// import InstagramIcon from '@/components/icons/InstagramIcon';
// import FacebookIcon from '@/components/icons/FacebookIcon';
// import TiktokIcon from '@/components/icons/TiktokIcon';
// import YoutubeIcon from '@/components/icons/YoutubeIcon';
import GithubIcon from '@/components/icons/GithubIcon';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import contractAddresses from '@/utils/contract_addresses.json'
import usdcAbi from '@/utils/erc20_abi.json'
import escrowAbi from '@/utils/escrow_abi.json'
import { parseEther } from 'viem'


export function TransferComponent({ initialValues, onSubmit }) {
  const [platform, setPlatform] = useState('');
  const [username, setUsername] = useState('');
  const [amount, setAmount] = useState('');
  const [assetType, setAssetType] = useState('');

  const {address} = useAccount();
  console.log(usdcAbi, contractAddresses.ESCROW_CONTRACT_ADDRESS)
  const { writeContract, error, failureReason } = useWriteContract()
  const approvalResult = useReadContract({
    abi: usdcAbi,
    address: contractAddresses.USDC_CONTRACT_ADDRESS,
    functionName: 'allowance',
    args: [address, contractAddresses.ESCROW_CONTRACT_ADDRESS],
  })

  const isApproved = approvalResult.data > 0

  useEffect(() => {
    if (initialValues) {
      setPlatform(initialValues.platform || '');
      setUsername(initialValues.username || '');
      setAmount(initialValues.amount || '');
      setAssetType(initialValues.assetType || '');
    }
  }, [initialValues]);
  console.log(error, failureReason)
  const handleSubmit = async () => {
    try {
    const args = [username, platform == 'github' ? 0 : 1, parseEther(amount.toString()), assetType == "ethereum"]

    await writeContract({ 
      abi: escrowAbi,
      address: contractAddresses.ESCROW_CONTRACT_ADDRESS,
      functionName: 'depositFunds',
      args: args,
      value: assetType == "ethereum" ? parseEther(amount.toString()) : 0,
   })
    } catch(e) {
      console.log("hey");
      console.log(e)
    }
  };

  const handleApprove = async () => {
    await writeContract({ 
      abi: usdcAbi,
      address: contractAddresses.USDC_CONTRACT_ADDRESS,
      functionName: 'approve',
      args: [contractAddresses.ESCROW_CONTRACT_ADDRESS, "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"],
   })
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Card className="w-full max-w-md p-6 rounded-lg">
        <CardHeader>
          <CardTitle>Send Money</CardTitle>
          <CardDescription>Enter the details to send money to a social media account.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label>Platform</Label>
            <div className="grid grid-cols-5 gap-4">
              <PlatformButton
                platform="github"
                selectedPlatform={platform}
                setPlatform={setPlatform}
                Icon={FiGithub}
                label="Github"
              />
              <PlatformButton
                platform="twitter"
                selectedPlatform={platform}
                setPlatform={setPlatform}
                Icon={TwitterIcon}
                label="Twitter"
              />
              {/* <PlatformButton
                platform="instagram"
                selectedPlatform={platform}
                setPlatform={setPlatform}
                Icon={InstagramIcon}
                label="Instagram"
              />
              <PlatformButton
                platform="facebook"
                selectedPlatform={platform}
                setPlatform={setPlatform}
                Icon={FacebookIcon}
                label="Facebook"
              />
              <PlatformButton
                platform="tiktok"
                selectedPlatform={platform}
                setPlatform={setPlatform}
                Icon={TiktokIcon}
                label="TikTok"
              />
              <PlatformButton
                platform="youtube"
                selectedPlatform={platform}
                setPlatform={setPlatform}
                Icon={YoutubeIcon}
                label="YouTube"
              />  */}
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="asset">Asset Type</Label>
            <Select
              id="asset"
              value={assetType}
              onValueChange={(value) => setAssetType(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select asset type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ethereum">Ethereum</SelectItem>
                <SelectItem value="usdc">USDC</SelectItem>
                {/* <SelectItem value="dai">DAI</SelectItem>
                <SelectItem value="bitcoin">Bitcoin</SelectItem> */}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter>
          {!isApproved && assetType == 'usdc' ? 
           <Button className="w-full" onClick={handleApprove} disabled={!(address && platform && username && amount && assetType)}>Approve</Button>
          : 
          <Button className="w-full" onClick={handleSubmit} disabled={!(address && platform && username && amount && assetType)}>{address ? "Send" : "Wallet Not Connected"}</Button>
          }
         
        </CardFooter>
      </Card>
    </div>
  );
}
