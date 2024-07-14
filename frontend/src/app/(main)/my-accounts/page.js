'use client';

import { Card } from "@/components/ui/card";
import TransactionRow from "@/components/ui/TransactionRow";
import ClaimButton from "@/components/ui/ClaimButton";
import GithubCard from "@/app/(main)/my-accounts/social-cards/GithubCard";
import XCard from "./social-cards/XCard";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { useBlockNumber, useClient, usePublicClient, useWalletClient } from "wagmi";
import { parseAbiItem } from 'viem'
import { useEffect, useState } from "react";
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import contractAddresses from '@/utils/contract_addresses.json'
import usdcAbi from '@/utils/erc20_abi.json'
import escrowAbi from '@/utils/escrow_abi.json'
import { parseEther } from 'viem'
import { config } from "@/config";


export default function Accounts() {




  const handleClaimFunds = () => {
    // Logic to claim funds
    console.log("Claim funds clicked");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="container mx-auto px-4 py-12 md:px-6 lg:py-16">
        <h1 className="text-3xl font-bold mb-8 text-center">Connect Your Accounts</h1>
        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <GithubCard />
            <XCard />
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <ClaimButton onClick={handleClaimFunds} className="py-3 px-6 text-lg" />
        </div>
      </main>
      <footer className="text-center text-3xl text-gray-700 py-4">
        And many more...
      </footer>
    </div>
  );
}
