'use server';
import { cookies } from 'next/headers'
import {
    SecretsManager,
} from "@chainlink/functions-toolkit";

import ethers from "ethers";



const gatewayUrls = [
    "https://01.functions-gateway.testnet.chain.link/",
    "https://02.functions-gateway.testnet.chain.link/",
];

const donId = "fun-arbitrum-sepolia-1"
const slotIdNumber = 0;
const routerAddress = "0x234a5fb5Bd614a7AA2FfAB244D603abFA0Ac5C5C"
const expirationTimeMinutes = 360;

const provider = new ethers.providers.JsonRpcProvider("https://sepolia-rollup.arbitrum.io/rpc");
const wallet = new ethers.Wallet(process.env.CHAINLINK_ACCESS_TOKEN);
const signer = wallet.connect(provider);



export async function storeEncryptedSecretDON(accessToken) {
console.log("token: ",accessToken)
    const secretsManager = new SecretsManager({
        signer: signer,
        functionsRouterAddress: routerAddress,
        donId: donId,
    });
    await secretsManager.initialize();
    const encryptedSecretsObj = await secretsManager.encryptSecrets({accessToken: accessToken});
    console.log(
        `Upload encrypted secret to gateways ${gatewayUrls}. slotId ${slotIdNumber}. Expiration in minutes: ${expirationTimeMinutes}`
    );
    const uploadResult = await secretsManager.uploadEncryptedSecretsToDON({
        encryptedSecretsHexstring: encryptedSecretsObj.encryptedSecrets,
        gatewayUrls: gatewayUrls,
        slotId: slotIdNumber,
        minutesUntilExpiration: expirationTimeMinutes,
    });

    if (!uploadResult.success)
        throw new Error(`Encrypted secrets not uploaded to ${gatewayUrls}`);

    console.log(
        `\n✅ Secrets uploaded properly to gateways ${gatewayUrls}! Gateways response: `,
        uploadResult
    );
}

import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic' // defaults to auto
export async function GET(req) {

    await storeEncryptedSecretDON(req.body.accessToken);
    return NextResponse.json({ message: 'Pong!' }, { status: 200 })
}