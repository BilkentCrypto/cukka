'use client'

import { getGithubAccessToken, getTwitterOAuthToken } from "@/app/actions";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function TwitterCallback() {

    const router = useRouter()

    const [response, setResponse] = useState();

    const params = useSearchParams()
    const code = params.get('code');

    const fetchTwitter = async () => {
        console.log("params: ", code)
        const res = await getTwitterOAuthToken(code);
        console.log("twitter response: ", res);
        setResponse(res);
        router.replace('/my-accounts');
    }

    useEffect(() => {
        fetchTwitter();
    }, []);

    return (
        <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-md text-center">
          {!response ? (
            <>
              <LoaderPinwheelIcon className="mx-auto h-12 w-12 animate-spin text-primary" />
              <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Processing Authentication</h1>
              <p className="mt-4 text-muted-foreground">Please wait while we process your authentication.</p>
            </>
          )
          :  (
            <>
              <CircleCheckIcon className="mx-auto h-12 w-12 text-green-500" />
              <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Authentication Successful</h1>
              <p className="mt-4 text-muted-foreground">You authenticated successfully.</p>
            </>
          )}
        </div>
      </div>
    )
}



function CircleCheckIcon(props) {
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
        <path d="m9 12 2 2 4-4" />
      </svg>
    )
  }
  
  
  function LoaderPinwheelIcon(props) {
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
        <path d="M2 12c0-2.8 2.2-5 5-5s5 2.2 5 5 2.2 5 5 5 5-2.2 5-5" />
        <path d="M7 20.7a1 1 0 1 1 5-8.7 1 1 0 1 0 5-8.6" />
        <path d="M7 3.3a1 1 0 1 1 5 8.6 1 1 0 1 0 5 8.6" />
        <circle cx="12" cy="12" r="10" />
      </svg>
    )
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
    )
  }