const fs = require("fs");
const path = require("path");
const {
    SubscriptionManager,
    SecretsManager,
    simulateScript,
    ResponseListener,
    ReturnType,
    decodeResult,
    FulfillmentCode,
} = require("@chainlink/functions-toolkit");

const ethers = require("ethers");

const gatewayUrls = [
    "https://01.functions-gateway.testnet.chain.link/",
    "https://02.functions-gateway.testnet.chain.link/",
];

const donId = "fun-arbitrum-sepolia-1"
const slotIdNumber = 0;
const routerAddress = "0x234a5fb5Bd614a7AA2FfAB244D603abFA0Ac5C5C"
const secretAccessToken = { accessToken: "ACCESS_TOKEN_HERE" };
const expirationTimeMinutes = 360;

const provider = new ethers.providers.JsonRpcProvider("https://sepolia-rollup.arbitrum.io/rpc");
const wallet = new ethers.Wallet(PRIVATE_KEY);
const signer = wallet.connect(provider);


export async function storeEncryptedSecretDON() {
    const secretsManager = new SecretsManager({
        signer: signer,
        functionsRouterAddress: routerAddress,
        donId: donId,
    });
    await secretsManager.initialize();
    const encryptedSecretsObj = await secretsManager.encryptSecrets(secretAccessToken);
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