# Cukka, a DeSoc platform built in @ETHGlobal Brusssels

Cukka is a unique way of sending money to social media accounts (X and Github) without having to ask the users for their cryptoa addresses. Built on Arbitrum and Chainlink by Bilkent Blockchain for ETHGlobal Brussels 2024.

## Features
- Easily send ETH or USDC to any X or GitHub account.
- Withdraw your payment with one click by authenticating your X and GitHub account onchain with Chainlink Functions.

## Tech
Below, you can see how Cukka achieves payments using social media.

[Chainlink Functions:](https://docs.chain.link/chainlink-functions) Cukka uses Chainlink Functions to enable people to authenticate their social media accounts in order to claim the crypto assets (ETH & USDC) that has been sent to them. Web2 apps like X and GitHub have OAuth services that authenticates the users and their data, and using Chainlink Functions, Cukka contract sends a request to the APIs of X and GitHub to authenticate the users. It should be noted that the access token of the users are encrypted for the access of the Chainlink DON only.

[Arbitrum:](https://docs.arbitrum.io/welcome/get-started) Arbitrum is the best choice for Cuppa as a cheap, fast and secure layer. Cheap claims and transfers are crucial for the best UX on Cukka. Because Chainlink Functions are supported on Arbitrum and offers cheap premium fees, users will authenticate themselves and receive their funds cheaply and easily!

[Circle:](https://www.circle.com/en/usdc): It is important to have a fully backed digital dollar where users can receive their payments as a stablecoin without being affected by the volatility of ETH. As the Cukka team, we utilize USDC to make sure our users' payments do not lose their value. Additionally, we provide a unique way for crypto users to receive their payments in USDC which improves the UX for USDC transfers and interactions.

### Description

Cukka is a platform designed to integrate cryptocurrency payments with social media interactions. It addresses the growing need for easy, secure, and user-friendly methods to send digital currencies across popular social platforms. By allowing users to send ETH or USDC to X or GitHub accounts (or any other app that has OAuth services), Cukka eliminates the complexities and potential security risks associated with sharing or managing long and cumbersome Ethereum addresses.

### Social Media Integration
Cukka seamlessly integrates with popular social media platforms like X and GitHub that has OAuth services. This integration is facilitated through OAuth authorization, ensuring that users can connect their social media accounts with Cukka securely and efficiently.

Ethereum and USDC Transfers Users can send two major cryptocurrencies, Ethereum (ETH) and USD Coin (USDC), to recipients by targeting their social media handles. This feature democratizes access to digital currency transfers, making it as simple as sending a message or tweet.

Arbitrum Network Utilization Cukka leverages the Arbitrum network, a layer 2 scaling solution for Ethereum. This choice ensures faster transaction times and significantly lower fees compared to the main Ethereum network, enhancing the overall user experience. 

Chainlink Functions for Verification To ensure that payments are sent to the correct recipients, Cukka employs Chainlink functions. These functions are used to verify the ownership of social media accounts. Receivers must prove their ownership, adding a layer of security and trust to the transaction process.

### Sending Payments Selecting the Recipient
The sender selects a recipient by their X or GitHub handle. Choosing the Cryptocurrency: The sender chooses to send either ETH or USDC. Transaction Execution: The sender confirms the transaction, and Cukka facilitates the transfer via the Arbitrum network.

### Receiving Payments Verification Process
The recipient receives a notification about the pending payment. Proving Ownership: The recipient uses Chainlink functions to prove their ownership of the social media account. This verification is a one-time process per account. Receiving Funds: Once ownership is verified, the recipient's linked Ethereum wallet receives the funds.

### Security Measures 

##### OAuth Authorization
Ensures that account linking is done securely, preventing unauthorized access.
##### Chainlink Verification
Adds an extra layer of security by requiring proof of social media account ownership. c. Arbitrum Network: Reduces the risk of network congestion and high transaction fees, which enhances the overall security and efficiency of transactions.
