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

export default function Accounts() {
  const transactions = [
    {
      user: "John Doe",
      username: "@johndoe",
      platform: "twitter",
      amount: "50.00",
    },
    {
      user: "Jane Smith",
      username: "@janesmith",
      platform: "github",
      amount: "75.00",
    },
  ];

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
      <footer className=" text-gray-700 py-8">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-2xl font-bold mb-6 text-center">Transaction History</h2>
          <div className="rounded-lg border shadow-lg p-4 bg-white mx-4">
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead className="text-center">Social Media</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction, index) => (
                  <TransactionRow key={index} transaction={transaction} />
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </footer>
    </div>
  );
}
