'use client';
import Image from "next/image";
import ConnectButton from "@/components/ui/ConnectButton";
import { Button } from "@/components/ui/button";
import { getCookie } from 'cookies-next';
import { useEffect, useState } from "react";
import { getGithubUserData } from "@/app/actions";

function loginwithGithub() {
  window.location.assign("https://github.com/login/oauth/authorize?client_id=" + process.env.NEXT_PUBLIC_CLIENT_ID)

}
export default function MyAccounts() {
  const [userData, setUserData] = useState();
  const githubCookie = getCookie("GH_token");

  const getGithubUser = async () => {
    const res = await getGithubUserData();
    setUserData(res);
    
  }

  useEffect(() => {
 getGithubUser();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ConnectButton />
      <div className="flex flex-row gap-2">
        <p>{userData?.login}</p>
        <p>{githubCookie ? `Token: ${githubCookie}` : "Not logged in"}</p>
        <button onClick={loginwithGithub}>
          Login with github
        </button>
      </div>
    </main>
  );
}
