'use client';

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TransactionTable from "@/components/ui/TransactionTable"; // Import the new component
import TwitterIcon from "@/components/icons/TwitterIcon";
import GithubIcon from "@/components/icons/GithubIcon";
import GitlabIcon from "@/components/icons/GitlabIcon";


export function Accounts() {


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



  return (
    <div className="flex flex-col min-h-screen">
      <main className="container mx-auto px-4 py-12 md:px-6 lg:py-16">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Connect Your Accounts
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <Card className="bg-card text-card-foreground p-6 flex flex-col items-center justify-between">
            <div className="flex items-center gap-4">
              <TwitterIcon className="w-8 h-8 text-[#1DA1F2]" />
              <div>
                <h3 className="text-lg font-semibold">@twitterdev</h3>
                <p className="text-muted-foreground text-sm">Twitter</p>
              </div>
            </div>
            <Button variant="secondary">Connect</Button>
          </Card>
          <Card className="bg-card text-card-foreground p-6 flex flex-col items-center justify-between">
            <div className="flex items-center gap-4">
              <GitlabIcon className="w-8 h-8 text-[#333]" />
              <div>
                <h3 className="text-lg font-semibold">@github</h3>
                <p className="text-muted-foreground text-sm">GitHub</p>
              </div>
            </div>
            <Button variant="secondary">Connect</Button>
          </Card>
        </div>
      </main>
      <footer className="bg-muted text-muted-foreground py-8">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-2xl font-bold mb-6">Transaction History</h2>
          <TransactionTable transactions={transactions} />
        </div>
      </footer>
    </div>
  );
}

function DiscIcon(props) {
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
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

function GitlabIcon(props) {
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
      strokeLinejoin="round"
    >
      <path d="m22 13.29-3.33-10a.42.42 0 0 0-.14-.18.38.38 0 0 0-.22-.11.39.39 0 0 0-.23.07.42.42 0 0 0-.14.18l-2.26 6.67H8.32L6.1 3.26a.42.42 0 0 0-.1-.18.38.38 0 0 0-.26-.08.39.39 0 0 0-.23.07.42.42 0 0 0-.14.18L2 13.29a.74.74 0 0 0 .27.83L12 21l9.69-6.88a.71.71 0 0 0 .31-.83Z" />
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
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
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
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

export default Accounts;
