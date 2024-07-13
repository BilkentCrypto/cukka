'use client';
import Image from "next/image";
import ConnectButton from "@/components/ui/ConnectButton";
import { Button } from "@/components/ui/button";
import { useParams, useSearchParams } from 'next/navigation'
import { useEffect } from "react";
import { getUserData } from "./actions";
import Link from 'next/link';


export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ConnectButton />
      <Link href='/my-accounts'>My accounts</Link>
    </main>
  );
}
