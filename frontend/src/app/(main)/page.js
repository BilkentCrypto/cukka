'use client';
import Image from "next/image";
import ConnectButton from "@/components/ui/ConnectButton";
import { Button } from "@/components/ui/button";
import { useParams, useSearchParams } from 'next/navigation'
import { useEffect } from "react";
import { getUserData } from "../actions";
import Link from 'next/link';
import { TransferComponent } from "@/components/transfer-component";
import About from "@/components/about";
import { Welcome } from "@/components/Welcome"

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen p-12 bg-white">
      <div className="flex w-full mb-12 justify-between items-center mt-8">
        <div className="flex-1 flex justify-center mt-8">
          <Welcome />
        </div>
        <div className="flex-1 flex justify-center mt-8">
          <TransferComponent />
        </div>
      </div>
      <div className="w-full mt-12">
        <About />
      </div>
    </main>
  );
}