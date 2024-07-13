'use client'

import { getGithubAccessToken } from "@/app/actions";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function GithubCallback() {

  const router = useRouter()

  const [response, setResponse] = useState();

  const params = useSearchParams()
  const code = params.get('code');

  const fetchGithub = async () => {
    console.log("params: ", code)
    const res = await getGithubAccessToken(code);
    console.log("git response: ", res);
    setResponse(res);
    router.replace('/my-accounts');
  }

  useEffect(() => {
    fetchGithub();
  }, []);

  return (
    <div>
      <p>{response ? response.error ? "Error!" : "Success!" : "Waiting..."}</p>
    </div>
  )
}