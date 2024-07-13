'use client';
import Image from "next/image";
import ConnectButton from "@/components/ui/ConnectButton";
import { Button } from "@/components/ui/button";



const CLIENT_ID = "Ov23li9nq1LDqOZ6BXmj"

export default function TestPage() {

  function loginwithGithub(){
    window.location.assign("https://github.com/login/oauth/authorize?client_id=" + CLIENT_ID)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ConnectButton/>
      <button onClick={loginwithGithub}>
        Login with github
      </button>
    </main>
  );
}
