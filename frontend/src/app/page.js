'use client';
import Image from "next/image";
import ConnectButton from "@/components/ui/ConnectButton";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export async function getUserData(code) {

}

export default function Home() {

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParam = urlParams.get("code");
    console.log(codeParam);

    const getUserData = async (code) => {
      const params = "?client_id=" + process.env.NEXT_PUBLIC_CLIENT_ID + "&client_secret=" + process.env.NEXT_PUBLIC_CLIENT_SECRET + "&code=" + code;

      fetch("https://github.com/login/oauth/access_token" + params, {
        method: "POST",
        headers: {
          "Accept": "application/json"
        }
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          // Handle the access token data
          console.log(data);
        });
    }
    console.log("merhaba")
    getUserData(codeParam)
  }, []);

  function loginwithGithub() {
    window.location.assign("https://github.com/login/oauth/authorize?client_id=" + process.env.NEXT_PUBLIC_CLIENT_ID)

  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ConnectButton />
      <button onClick={loginwithGithub}>
        Login with github
      </button>
    </main>
  );
}
