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
import Image from 'next/image';

export function TransferComponent() {
  const [platform, setPlatform] = useState('');
  const [username, setUsername] = useState('');
  const [amount, setAmount] = useState('');
  const [assetType, setAssetType] = useState('');

  const handleSend = () => {
    console.log(`Sending ${amount} to ${username} on ${platform} using ${assetType}`);
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
              <Button
                variant="ghost"
                className={`aspect-square rounded-lg p-2 ${platform === 'twitter' ? 'bg-primary text-background' : 'bg-muted'}`}
                onClick={() => setPlatform('twitter')}>
                <TwitterIcon className="h-6 w-6" />
                <span className="sr-only">Twitter</span>
              </Button>
              <Button
                variant="ghost"
                className={`aspect-square rounded-lg p-2 ${platform === 'instagram' ? 'bg-primary text-background' : 'bg-muted'}`}
                onClick={() => setPlatform('instagram')}>
                <InstagramIcon className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </Button>
              <Button
                variant="ghost"
                className={`aspect-square rounded-lg p-2 ${platform === 'facebook' ? 'bg-primary text-background' : 'bg-muted'}`}
                onClick={() => setPlatform('facebook')}>
                <FacebookIcon className="h-6 w-6" />
                <span className="sr-only">Facebook</span>
              </Button>
              <Button
                variant="ghost"
                className={`aspect-square rounded-lg p-2 ${platform === 'tiktok' ? 'bg-primary text-background' : 'bg-muted'}`}
                onClick={() => setPlatform('tiktok')}>
                <TiktokIcon className="h-6 w-6" />
                <span className="sr-only">TikTok</span>
              </Button>
              <Button
                variant="ghost"
                className={`aspect-square rounded-lg p-2 ${platform === 'youtube' ? 'bg-primary text-background' : 'bg-muted'}`}
                onClick={() => setPlatform('youtube')}>
                <YoutubeIcon className="h-6 w-6" />
                <span className="sr-only">YouTube</span>
              </Button>
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
                <SelectItem value="bitcoin">Bitcoin</SelectItem>
                <SelectItem value="ethereum">Ethereum</SelectItem>
                <SelectItem value="usdc">USDC</SelectItem>
                <SelectItem value="dai">DAI</SelectItem>
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

function FacebookIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function TwitterIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path
        d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

function TiktokIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path
        d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

function YoutubeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path
        d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  );
}
