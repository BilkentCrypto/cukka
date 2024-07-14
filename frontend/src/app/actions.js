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
  console.log("response test: ", json)
  if (json.error) {
    return { error: json.error };
  } else {
    const token = json.access_token;
    cookies().set('GH_token', token);
    return { success: "Success!" }
  }

}

export const getTwitterUserData = async () => {
  const accessToken = cookies().get('X_token')
  try {
    // request GET https://api.twitter.com/2/users/me
    const response = await fetch("https://api.twitter.com/2/users/me", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        // put the access token in the Authorization Bearer token
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // Check if the response is ok (status code 200-299)
    if (!response.ok) {

      throw new Error(`Error fetching user: ${response.statusText}`);
    }

    // Parse the JSON response
    const data = await response.json();
    console.log("TWITTER: ", data)
    return data.data ?? null;
  } catch (err) {
    console.error(err);
    return null;
  }

}

export const getGithubUserData = async () => {
  const token = cookies().get('GH_token')
  console.log("github token: ", token)
  const res = await fetch("https://api.github.com/user", {
    method: "GET",
    headers: {
      "Authorization": "Bearer " + token.value
    }
  });

  const json = await res.json();
  console.log("user data: ", json)
  if (json.error) {
    return { error: json.error };
  } else {
    return json;
  }

}
export async function getTwitterOauthUrl() {
  const rootUrl = "https://twitter.com/i/oauth2/authorize";
  const options = {
    redirect_uri: "http://www.localhost:3000/token/twitter", // client url cannot be http://localhost:3000/ or http://127.0.0.1:3000/
    client_id: process.env.NEXT_PUBLIC_TWITTER_ID,
    state: "state",
    response_type: "code",
    code_challenge: "y_SfRG4BmOES02uqWeIkIgLQAlTBggyf_G7uKT51ku8",
    code_challenge_method: "S256",
    scope: ["users.read", "tweet.read"].join(" "), // add/remove scopes as needed
  };
  const qs = new URLSearchParams(options).toString();
  return `${rootUrl}?${qs}`;
}

export async function getTwitterOAuthToken(code) {
  const TWITTER_OAUTH_CLIENT_ID = process.env.NEXT_PUBLIC_TWITTER_ID;
  const TWITTER_OAUTH_CLIENT_SECRET = process.env.NEXT_PUBLIC_TWITTER_SECRET;
  const TWITTER_OAUTH_TOKEN_URL = "https://api.twitter.com/2/oauth2/token";

  const BasicAuthToken = Buffer.from(`${TWITTER_OAUTH_CLIENT_ID}:${TWITTER_OAUTH_CLIENT_SECRET}`, "utf8").toString(
    "base64"
  );

  const twitterOauthTokenParams = {
    client_id: TWITTER_OAUTH_CLIENT_ID,
    // based on code_challenge
    code_verifier: "8KxxO-RPl0bLSxX5AWwgdiFbMnry_VOKzFeIlVA7NoA",
    redirect_uri: `http://www.localhost:3000/token/twitter`,
    grant_type: "authorization_code",
  };

  const params = new URLSearchParams({ ...twitterOauthTokenParams, code });

  try {
    const response = await fetch(TWITTER_OAUTH_TOKEN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${BasicAuthToken}`,
      },
      body: params.toString(),
    });

    // Check if the response is ok (status code 200-299)
    if (!response.ok) {
      throw new Error(`Error fetching token: ${response.statusText}`);
    }

    const data = await response.json();
    cookies().set('X_token', data.access_token);
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }


}