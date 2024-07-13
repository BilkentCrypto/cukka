'use client';

import * as React from 'react';
import { useState } from 'react';
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
import InstagramIcon from '@/components/icons/InstagramIcon';
import FacebookIcon from '@/components/icons/FacebookIcon';
import TiktokIcon from '@/components/icons/TiktokIcon';
import YoutubeIcon from '@/components/icons/YoutubeIcon';
//import { storeEncryptedSecretDON } from '@/utils/chainlink';
import { getEthersSigner } from '@/utils/ethersUtil'
import { config } from '@/config'


export function TransferComponent() {
  const [platform, setPlatform] = useState('');
  const [username, setUsername] = useState('');
  const [amount, setAmount] = useState('');
  const [assetType, setAssetType] = useState('');

  const handleSend = async () => {
    // Logic to handle sending money
    console.log(`Sending ${amount} to ${username} on ${platform} using ${assetType}`);
    const signer = getEthersSigner(config)
    //await storeEncryptedSecretDON(signer);
    
  };

  return (
    <div className="flex flex-col items-center justify-center h-full bg-background">
      <Card className="w-full max-w-md p-6">
        <CardHeader>
          <CardTitle>Send Money</CardTitle>
          <CardDescription>Enter the details to send money to a social media account.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label>Platform</Label>
            <div className="grid grid-cols-5 gap-4">
              <PlatformButton
                platform="twitter"
                selectedPlatform={platform}
                setPlatform={setPlatform}
                Icon={TwitterIcon}
                label="Twitter"
              />
              <PlatformButton
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
              />
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
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleSend}>Send</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
