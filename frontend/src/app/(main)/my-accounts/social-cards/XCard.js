'use client';

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getCookie, deleteCookie } from 'cookies-next';
import { useEffect, useState } from "react";
import { getTwitterOauthUrl, getTwitterUserData } from "@/app/actions";
import { FaXTwitter } from "react-icons/fa6";

const cookieName = 'X_token';

export default function XCard() {
  const [userData, setUserData] = useState();

  const cookie = getCookie(cookieName);

  const getTwitterData = async () => {
    console.log("get twitter data")
    const res = await getTwitterUserData();
    console.log("Twitter user data: ", res)
    setUserData(res);
    return res
  }



  useEffect(() => {
    if (cookie) {
      console.log("selammm")
      getTwitterData();
    }
  }, []);

  async function connect() {
    const url = await getTwitterOauthUrl();
    window.location.assign(url);
  }

  function disconnect() {
    deleteCookie(cookieName);
    setUserData(null);
  }

  const isConnected = userData ? true : false;
  return (
    <Card className="bg-card text-card-foreground p-6 gap-y-2 flex flex-col items-center justify-between h-36">
      <div className="flex items-center gap-4">
        <FaXTwitter className="w-8 h-8 text-[#333]" />
        {userData ? (
          <div>
            <h3 className="text-lg font-semibold">@{userData.login}</h3>
            <p className="text-muted-foreground text-sm">X (Formerly Twitter)</p>
          </div>
        ) : (
          <div>
            <h3 className="text-lg font-semibold">X (Formerly Twitter)</h3>
          </div>
        )}
      </div>
      <Button onClick={isConnected ? disconnect : connect} variant="secondary">
        {isConnected ? "Disconnect" : "Connect"}
      </Button>
    </Card>
  );
}
