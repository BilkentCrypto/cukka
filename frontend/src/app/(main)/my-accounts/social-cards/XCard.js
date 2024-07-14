'use client';

import { Card } from "@/components/ui/card"
import Image from "next/image";
import ConnectButton from "@/components/ui/ConnectButton";
import { Button } from "@/components/ui/button";
import { getCookie, deleteCookie } from 'cookies-next';
import { useEffect, useState } from "react";
import { getGithubUserData, getTwitterOauthUrl, getTwitterUserData } from "@/app/actions";
import { FaXTwitter } from "react-icons/fa6";

const cookieName = 'X_token'

export default function XCard() {

  const [userData, setUserData] = useState();

  const twitterCookie = getCookie("X_token");
  console.log("twitter cookie: ", twitterCookie)

  /*
  const getGithubUser = async () => {
    const res = await getGithubUserData();
    setUserData(res);

  }
  */

  const getTwitterData = async () => {
    console.log("get twitter data")
    const res = await getTwitterUserData();
    console.log("Twitter user data: ", res)
    return res
  }

  useEffect(() => {
    if (twitterCookie) {
      console.log("selammm")
      getTwitterData();
    }

  }, []);
  async function connect() {
    const url = await getTwitterOauthUrl();
    window.location.assign(url)
  }

  function disconnect() {
    deleteCookie(cookieName);
    setUserData(null)
  }


  const isConnected = userData ? true : false;
  return (
    <Card
      className="bg-card text-card-foreground p-6 gap-y-2 flex flex-col items-center justify-between">
      <div className="flex items-center gap-4">
        <FaXTwitter className="w-8 h-8 text-[#333]" />
        {userData ?
          <div>
            <h3 className="text-lg font-semibold">@{userData.login}</h3>
            <p className="text-muted-foreground text-sm">X (Formerly Twitter)</p>
          </div>
          :
          <div>
            <h3 className="text-lg font-semibold">X (Formerly Twitter)</h3>
          </div>
        }
      </div>
      <Button onClick={isConnected ? disconnect : connect} variant="secondary"  >{isConnected ? "Disconnect" : "Connect"}</Button>
    </Card>
  )
}