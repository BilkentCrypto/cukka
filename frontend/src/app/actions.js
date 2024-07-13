'use server';
import { cookies } from 'next/headers'

export const getGithubAccessToken = async (code) => {
    const params = "?client_id=" + process.env.NEXT_PUBLIC_CLIENT_ID + "&client_secret=" + process.env.NEXT_PUBLIC_CLIENT_SECRET + "&code=" + code;
    console.log(params);
  const res = await fetch("https://github.com/login/oauth/access_token" + params, {
      method: "POST",
      headers: {
        "Accept": "application/json"
      }
    });
    const json = await res.json();
    console.log("response test: ",json)
    if(json.error) {
        return {error: json.error};
    } else {
        const token = json.access_token;
        cookies().set('GH_token', token);
        return {success: "Success!"}
    }

  }

  export const getGithubUserData = async () => {
   const token =  cookies().get('GH_token')
console.log("github token: ", token)
  const res = await fetch("https://api.github.com/user", {
      method: "GET",
      headers: {
        "Authorization":  "Bearer " + token.value
      }
    });

    const json = await res.json();
    console.log("user data: ", json )
    if(json.error) {
        return {error: json.error};
    } else {
        return json;
    }

  }