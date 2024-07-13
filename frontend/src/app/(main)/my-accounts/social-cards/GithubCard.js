'use client';

import { Card } from "@/components/ui/card"
import Image from "next/image";
import ConnectButton from "@/components/ui/ConnectButton";
import { Button } from "@/components/ui/button";
import { getCookie, deleteCookie } from 'cookies-next';
import { useEffect, useState } from "react";
import { getGithubUserData } from "@/app/actions";
import { FiGithub } from "react-icons/fi";


export default function GithubCard() {

  const [userData, setUserData] = useState();
  const githubCookie = getCookie("GH_token");
  console.log("Github token: ", githubCookie);
  const getGithubUser = async () => {
    const res = await getGithubUserData();
    setUserData(res);
    
  }

  useEffect(() => {
    if(githubCookie) {
      getGithubUser();
    }

  }, []);
  function connect() {
    window.location.assign("https://github.com/login/oauth/authorize?client_id=" + process.env.NEXT_PUBLIC_CLIENT_ID)
  }

  function disconnect() {
    deleteCookie('GH_token');
    setUserData(null)
  }


const isConnected = userData ? true : false;
    return(
        <Card
        className="bg-card text-card-foreground p-6 gap-y-2 flex flex-col items-center justify-between h-36">
        <div className="flex items-center gap-4">
          <FiGithub className="w-8 h-8 text-[#333]" />
          {userData ?
          <div>
            <h3 className="text-lg font-semibold">@{userData.login}</h3>
            <p className="text-muted-foreground text-sm">Github</p>
          </div>
          :
          <div>
            <h3 className="text-lg font-semibold">Github</h3>
          </div>
        }
        </div>
        <Button onClick={isConnected ? disconnect : connect} variant={isConnected ? "destructive" :  "secondary" }  >{isConnected ? "Disconnect" :"Connect" }</Button>
      </Card>
    )
}