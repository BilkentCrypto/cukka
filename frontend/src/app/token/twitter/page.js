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
        console.log("git response: ", res);
        setResponse(res);
        router.replace('/my-accounts');
    }

    useEffect(() => {
        fetchTwitter();
    }, []);

    return (
        <div>
            <p>{response ? response.error ? "Error!" : "Success!" : "Waiting..."}</p>
        </div>
    )
}