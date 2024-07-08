# WAAS API SDK

### Address Module

**getNonce**: Retrieves the nonce value for a given wallet address.

- **Parameters**: `accessToken`, `network`, `address`
- **Returns**: nonce value

**Usage**:

```typescript
getNonce(accessToken, network, address)
  .then((nonce) => {
    console.log("Nonce:", nonce);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

**getWalletBalance**: Retrieves the balance of a given wallet address.

- **Parameters**: `accessToken`, `network`, `address`
- **Returns**: balance in Ethereum units

**Usage**:

```typescript
getWalletBalance(accessToken, network, address)
  .then((balance) => {
    console.log("Balance:", balance);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

**verifyAddress**: Validates whether the given address follows the correct format for an EVM-based blockchain address.

- **Parameters**: `accessToken`, `address`
- **Returns**: Validation result (`true` if valid, otherwise `false`)

**Usage**:

```typescript
verifyAddress(accessToken, address)
  .then((result) => {
    console.log("Address is valid:", result);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

### Aptos Module

**getAccountInfo**: Retrieves account information for a given wallet address.

- **Parameters**: `accessToken`, `network`, `address`
- **Returns**: Account information

**Usage**:

```typescript
getAccountInfo(accessToken, network, address)
  .then((accountInfo) => {
    console.log("Account Information:", accountInfo);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

**getAptosAddress**: Retrieves the Aptos address for a given public key.

- **Parameters**: `accessToken`, `network`, `pubkey`
- **Returns**: Aptos address

**Usage**:

```typescript
getAptosAddress(accessToken, network, pubkey)
  .then((address) => {
    console.log("Aptos Address:", address);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

**getAptosTransaction**: Retrieves transaction details for a given transaction hash.

- **Parameters**: `accessToken`, `network`, `txHash`
- **Returns**: Transaction details

**Usage**:

```typescript
getAptosTransaction(accessToken, network, txHash)
  .then((transactionDetails) => {
    console.log("Transaction Details:", transactionDetails);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

**getGasEstimate**: Retrieves gas estimate for a given network.

- **Parameters**: `accessToken`, `network`
- **Returns**: Gas estimate

**Usage**:

```typescript
getGasEstimate(accessToken, network)
  .then((gasEstimate) => {
    console.log("Gas Estimate:", gasEstimate);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

**getSequenceNumber**: Retrieves the sequence number for a given wallet address.

- **Parameters**: `accessToken`, `network`, `address`
- **Returns**: Sequence number

**Usage**:

```typescript
getSequenceNumber(accessToken, network, address)
  .then((sequenceNumber) => {
    console.log("Sequence Number:", sequenceNumber);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

**getTransferPreData**: Retrieves pre-data for a transfer.

- **Parameters**: `accessToken`, `network`, `sender`, `receiver`, `amount`
- **Returns**: Transfer pre-data

**Usage**:

```typescript
getTransferPreData(accessToken, network, sender, receiver, amount)
  .then((preData) => {
    console.log("Transfer Pre-Data:", preData);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

**getWalletBalance**: Retrieves the wallet balance for a given address.

- **Parameters**: `accessToken`, `network`, `address`
- **Returns**: Wallet balance

**Usage**:

```typescript
getWalletBalance(accessToken, network, address)
  .then((balance) => {
    console.log("Wallet Balance:", balance);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

**sendRawTransaction**: Sends a raw transaction.

- **Parameters**: `accessToken`, `network`, `sender`, `receiver`, `amount`, `expirationTimestampSecs`, `sequenceNumber`, `maxGasAmount`, `gasUnitPrice`, `pubkey`, `signatureJson`
- **Returns**: Transaction result

**Usage**:

```typescript
sendRawTransaction(
  accessToken,
  network,
  sender,
  receiver,
  amount,
  expirationTimestampSecs,
  sequenceNumber,
  maxGasAmount,
  gasUnitPrice,
  pubkey,
  signatureJson
)
  .then((result) => {
    console.log("Transaction Result:", result);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

**simulateTransfer**: Simulates a transfer transaction.

- **Parameters**: `accessToken`, `network`, `sender`, `receiver`, `amount`, `expirationTimestampSecs`, `sequenceNumber`, `maxGasAmount`, `gasUnitPrice`, `pubkey`, `signatureJson`
- **Returns**: Simulation result

**Usage**:

```typescript
simulateTransfer(
  accessToken,
  network,
  sender,
  receiver,
  amount,
  expirationTimestampSecs,
  sequenceNumber,
  maxGasAmount,
  gasUnitPrice,
  pubkey,
  signatureJson
)
  .then((result) => {
    console.log("Simulation Result:", result);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

### Contract Module

**ethCall**: Executes a smart contract call on the Ethereum network.

- **Parameters**:
  - `accessToken`: Authorization token
  - `network`: Blockchain network
  - `isEIP1559`: Indicates if the transaction is an EIP-1559 transaction
  - `toAddress`: Contract address to call
  - `data`: Data payload for the call
  - `fromAddress` (optional): Address making the call
  - `gasLimit` (optional): Gas limit for the call
  - `gasPrice` (optional): Gas price for the call
  - `value` (optional): Value to send with the call
  - `nonce` (optional): Nonce for the transaction
  - `maxPriorityFeePerGas` (optional): Max priority fee per gas for EIP-1559
  - `maxFeePerGas` (optional): Max fee per gas for EIP-1559
- **Returns**: Result of the contract call

**Usage**:

```typescript
ethCall(
  accessToken,
  network,
  isEIP1559,
  toAddress,
  data,
  fromAddress,
  gasLimit,
  gasPrice,
  value,
  nonce,
  maxPriorityFeePerGas,
  maxFeePerGas
)
  .then((result) => {
    console.log("Contract Call Result:", result);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

**ethCallEIP1559**: Executes a smart contract call on the Ethereum network using EIP-1559 transaction format.

- **Parameters**:
  - `accessToken`: Authorization token
  - `network`: Blockchain network
  - `toAddress`: Contract address to call
  - `data`: Data payload for the call
  - `fromAddress` (optional): Address making the call
  - `gasLimit` (optional): Gas limit for the call
  - `value` (optional): Value to send with the call
  - `nonce` (optional): Nonce for the transaction
  - `maxPriorityFeePerGas` (optional): Max priority fee per gas for EIP-1559
  - `maxFeePerGas` (optional): Max fee per gas for EIP-1559
- **Returns**: Result of the contract call

**Usage**:

```typescript
ethCallEIP1559(
  accessToken,
  network,
  toAddress,
  data,
  fromAddress,
  gasLimit,
  value,
  nonce,
  maxPriorityFeePerGas,
  maxFeePerGas
)
  .then((result) => {
    console.log("EIP-1559 Contract Call Result:", result);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

**ethCallLegacy**: Executes a smart contract call on the Ethereum network using legacy transaction format.

- **Parameters**:
  - `accessToken`: Authorization token
  - `network`: Blockchain network
  - `toAddress`: Contract address to call
  - `data`: Data payload for the call
  - `fromAddress` (optional): Address making the call
  - `gasLimit` (optional): Gas limit for the call
  - `gasPrice` (optional): Gas price for the call
  - `value` (optional): Value to send with the call
  - `nonce` (optional): Nonce for the transaction
- **Returns**: Result of the contract call

**Usage**:

```typescript
ethCallLegacy(
  accessToken,
  network,
  toAddress,
  data,
  fromAddress,
  gasLimit,
  gasPrice,
  value,
  nonce
)
  .then((result) => {
    console.log("Legacy Contract Call Result:", result);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

### Gas Module

**estimateGasFee**: Estimates the gas fee for a given transaction.

- **Parameters**:
  - `accessToken`: Authorization token
  - `network`: Blockchain network
  - `isEIP1559`: Indicates if the transaction is an EIP-1559 transaction
  - `params`: Object containing:
    - `to`: Recipient address
    - `from` (optional): Sender address
    - `gasLimit` (optional): Gas limit for the transaction
    - `value` (optional): Value to be sent in the transaction
    - `data` (optional): Data payload for the transaction
    - `nonce` (optional): Nonce for the transaction
    - `maxPriorityFeePerGas` (optional): Max priority fee per gas for EIP-1559
    - `maxFeePerGas` (optional): Max fee per gas for EIP-1559
- **Returns**: Estimated gas fee

**Usage**:

```typescript
estimateGasFee(accessToken, network, isEIP1559, {
  to: "0xRecipientAddress",
  from: "0xSenderAddress",
  gasLimit: 21000,
  value: 1000000000,
  data: "0xDataPayload",
  nonce: 1,
  maxPriorityFeePerGas: 2,
  maxFeePerGas: 100,
})
  .then((gasFee) => {
    console.log("Estimated Gas Fee:", gasFee);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

**fetchGasPrice**: Fetches the current gas price for the given network.

- **Parameters**:
  - `accessToken`: Authorization token
  - `network`: Blockchain network
- **Returns**: Object containing gas price and gas limit

**Usage**:

```typescript
fetchGasPrice(accessToken, network)
  .then((gasInfo) => {
    console.log("Gas Price:", gasInfo.gasPrice);
    console.log("Gas Limit:", gasInfo.gasLimit);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

**fetchSuggestedGasFees**: Fetches the suggested gas fees for EIP-1559 transactions on the given network.

- **Parameters**:
  - `accessToken`: Authorization token
  - `network`: Blockchain network
- **Returns**: Object containing max priority fee per gas and max fee per gas

**Usage**:

```typescript
fetchSuggestedGasFees(accessToken, network)
  .then((gasFees) => {
    console.log("Max Priority Fee Per Gas:", gasFees.maxPriorityFeePerGas);
    console.log("Max Fee Per Gas:", gasFees.maxFeePerGas);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

### Member Module

**checkUserAvailability**: Checks if a user can sign up with the provided email.

- **Parameters**: `email`
- **Returns**: void

**Usage**:

```typescript
checkUserAvailability("test@example.com")
  .then(() => {
    console.log("User can sign up.");
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

**createSNSUser**: Creates an SNS user with the provided details.

- **Parameters**: `username`, `code`, `joinPath`, `socialType`, `overage`, `agree`, `collect`, `thirdparty`, `advertise`
- **Returns**: void

**Usage**:

```typescript
createSNSUser("username", "code", "joinPath", "socialType", 1, 1, 1, 1, 1)
  .then(() => {
    console.log("SNS user created successfully.");
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

**createUserWithCode**: Creates a user with the provided details and a code.

- **Parameters**: `username`, `password`, `code`, `overage`, `agree`, `collect`, `thirdparty`, `advertise`
- **Returns**: void

**Usage**:

```typescript
createUserWithCode("username", "password", "code", 1, 1, 1, 1, 1)
  .then(() => {
    console.log("User created successfully.");
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

**createUserWithoutCode**: Creates a user with the provided details without a code.

- **Parameters**: `username`, `password`, `overage`, `agree`, `collect`, `thirdparty`, `advertise`
- **Returns**: void

**Usage**:

```typescript
createUserWithoutCode("username", "password", 1, 1, 1, 1, 1)
  .then(() => {
    console.log("User created successfully.");
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

**login**: Authenticates a user with their email and password, and retrieves access and refresh tokens.

- **Parameters**: `email`, `password`
- **Returns**: Wallet information containing email, access token, and refresh token

**Usage**:

```typescript
login(email, password)
  .then((walletInfo) => {
    console.log("Login successful:", walletInfo);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

**sendVerificationCode**: Sends a verification code to the provided email.

- **Parameters**: `email`, `lang` (optional), `template` (optional)
- **Returns**: void

**Usage**:

```typescript
sendVerificationCode("test@example.com")
  .then(() => {
    console.log("Verification code sent successfully.");
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

**verifyEmailCode**: Verifies the email code sent to the user.

- **Parameters**: `email`, `code`
- **Returns**: void

**Usage**:

```typescript
verifyEmailCode("test@example.com", "code")
  .then(() => {
    console.log("Verification code validated successfully.");
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

### MPCServer Module

**generateShare**: Generates a key share using the provided access token and password.

- **Parameters**: `accessToken`, `password`
- **Returns**: Generated key share data

**Usage**:

```typescript
generateShare(accessToken, password)
  .then((data) => {
    console.log("Key share generated successfully:", data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

**signMessage**: Signs a message using the provided details.

- **Parameters**: `hash`, `encryptedPassword`, `mpcToken`, `pvencStr`, `sid`, `uid`, `wid`
- **Returns**: Signed message data

**Usage**:

```typescript
signMessage(hash, encryptedPassword, mpcToken, pvencStr, sid, uid, wid)
  .then((data) => {
    console.log("Message signed successfully:", data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

**recoverShare**: Recovers a key share using the provided access token, password, and identifiers.

- **Parameters**: `accessToken`, `password`, `sid`, `uid`, `wid`
- **Returns**: Recovered key share data

**Usage**:

```typescript
recoverShare(accessToken, password, sid, uid, wid)
  .then((data) => {
    console.log("Key share recovered successfully:", data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

### MPC Wallet Module

**checkDevicePassword**: Validates a device password.

- **Parameters**: `accessToken`, `devicePassword`
- **Returns**: Validation result

**Usage**:

```typescript
checkDevicePassword(accessToken, devicePassword)
  .then((result) => {
    console.log("Device password check result:", result);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

**checkDevicePasswordShare**: Validates a device password share.

- **Parameters**: `accessToken`, `devicePassword`, `pvencstr`
- **Returns**: Validation result

**Usage**:

```typescript
checkDevicePasswordShare(accessToken, devicePassword, pvencstr)
  .then((result) => {
    console.log("Device password share check result:", result);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

**createOrRecoverWallet**: Creates or recovers a wallet.

- **Parameters**: `accessToken`, `email`, `password`
- **Returns**: Wallet data

**Usage**:

```typescript
createOrRecoverWallet(accessToken, email, password)
  .then((walletData) => {
    console.log("Wallet data:", walletData);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

**getWalletInfo**: Retrieves wallet information.

- **Parameters**: `accessToken`
- **Returns**: Wallet information

**Usage**:

```typescript
getWalletInfo(accessToken)
  .then((walletInfo) => {
    console.log("Wallet info:", walletInfo);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

**recoverWallet**: Recovers a wallet using provided keys.

- **Parameters**: `accessToken`, `ucpubkey`, `uid`, `wid`
- **Returns**: Recovery data

**Usage**:

```typescript
recoverWallet(accessToken, ucpubkey, uid, wid)
  .then((recoveryData) => {
    console.log("Recovery data:", recoveryData);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

**postWallet**: Posts wallet data.

- **Parameters**: `accessToken`, `email`, `ourpubkey`, `ucpubkey`, `uid`, `wid`, `sid`
- **Returns**: Post response data

**Usage**:

```typescript
postWallet(accessToken, email, ourpubkey, ucpubkey, uid, wid, sid)
  .then((postResponse) => {
    console.log("Post response:", postResponse);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

**preRecoverWallet**: Fetches pre-recovery wallet data.

- **Parameters**: `accessToken`
- **Returns**: Pre-recovery data

**Usage**:

```typescript
preRecoverWallet(accessToken)
  .then((preRecoverData) => {
    console.log("Pre-recovery data:", preRecoverData);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

### NFT Module

**getNFTApprovalForAllData**: Retrieves NFT approval data for all tokens.

- **Parameters**: `accessToken`, `network`, `operatorAddress`, `approved`
- **Returns**: Approval data

**Usage**:

```typescript
getNFTApprovalForAllData(accessToken, network, operatorAddress, approved)
  .then((approvalData) => {
    console.log("NFT approval for all data:", approvalData);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

**getNFTApproved**: Retrieves the approved address for a specific NFT token.

- **Parameters**: `accessToken`, `network`, `contractAddress`, `tokenId`, `walletAddress`
- **Returns**: Approved address

**Usage**:

```typescript
getNFTApproved(accessToken, network, contractAddress, tokenId, walletAddress)
  .then((approvedAddress) => {
    console.log("NFT approved address:", approvedAddress);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

**getNFTApproveData**: Retrieves the data needed to approve a specific address for an NFT token.

- **Parameters**: `accessToken`, `network`, `tokenId`, `approvedAddress`
- **Returns**: Approve data

**Usage**:

```typescript
getNFTApproveData(accessToken, network, tokenId, approvedAddress)
  .then((approveData) => {
    console.log("NFT approve data:", approveData);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

**getNFTApprovedForAll**: Retrieves whether an operator is approved for all tokens of an owner.

- **Parameters**: `accessToken`, `network`, `contractAddress`, `ownerAddress`, `operatorAddress`
- **Returns**: Approval status

**Usage**:

```typescript
getNFTApprovedForAll(
  accessToken,
  network,
  contractAddress,
  ownerAddress,
  operatorAddress
)
  .then((approvalStatus) => {
    console.log("NFT approval for all status:", approvalStatus);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

**getNFTBalance**: Retrieves the balance of a specific NFT token.

- **Parameters**: `accessToken`, `network`, `contractAddress`, `walletAddress`
- **Returns**: NFT balance

**Usage**:

```typescript
getNFTBalance(accessToken, network, contractAddress, walletAddress)
  .then((balance) => {
    console.log("NFT balance:", balance);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

**getNFTName**: Retrieves the name of a specific NFT contract.

- **Parameters**: `accessToken`, `network`, `contractAddress`
- **Returns**: NFT name

**Usage**:

```typescript
getNFTName(accessToken, network, contractAddress)
  .then((name) => {
    console.log("NFT name:", name);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

**getNFTOwner**: Retrieves the owner of a specific NFT token.

- **Parameters**: `accessToken`, `network`, `contractAddress`, `tokenId`
- **Returns**: Owner address

**Usage**:

```typescript
getNFTOwner(accessToken, network, contractAddress, tokenId)
  .then((owner) => {
    console.log("NFT owner:", owner);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

**getNFTSymbol**: Retrieves the symbol of a specific NFT contract.

- **Parameters**: `accessToken`, `network`, `contractAddress`
- **Returns**: NFT symbol

**Usage**:

```typescript
getNFTSymbol(accessToken, network, contractAddress)
  .then((symbol) => {
    console.log("NFT symbol:", symbol);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

**getNFTTotalSupply**: Retrieves the total supply of a specific NFT contract.

- **Parameters**: `accessToken`, `network`, `contractAddress`
- **Returns**: Total supply

**Usage**:

```typescript
getNFTTotalSupply(accessToken, network, contractAddress)
  .then((totalSupply) => {
    console.log("NFT total supply:", totalSupply);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

**getNFTTransferFromData**: Retrieves the data needed to transfer a specific NFT token.

- **Parameters**: `accessToken`, `network`, `fromAddress`, `toAddress`, `tokenId`, `data`
- **Returns**: Transfer data

**Usage**:

```typescript
getNFTTransferFromData(
  accessToken,
  network,
  fromAddress,
  toAddress,
  tokenId,
  data
)
  .then((transferData) => {
    console.log("NFT transfer data:", transferData);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

### Secure-Channel Module

**getSecureChannel**: Retrieves secure channel information.

- **Parameters**: None
- **Returns**: Secure channel information including `channelid` and `secretKey`

**Usage**:

```typescript
getSecureChannel()
  .then((channelInfo) => {
    console.log("Secure channel information:", channelInfo);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

**encrypt**: Encrypts a given string.

- **Parameters**: `plain` (string to be encrypted)
- **Returns**: Encrypted string

**Usage**:

```typescript
encrypt("yourPlainText")
  .then((encryptedText) => {
    console.log("Encrypted text:", encryptedText);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

**decrypt**: Decrypts a given encrypted text.

- **Parameters**: `encrypted` (encrypted text), `secretKey` (shared secret key used for decryption)
- **Returns**: Decrypted string

**Usage**:

```typescript
decrypt("yourEncryptedText", "yourSecretKey")
  .then((decryptedText) => {
    console.log("Decrypted text:", decryptedText);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

### Sign Module

**postSign**: Signs a transaction after data is prepared.

- **Parameters**: `accessToken`, `network`, `type`, `additionalData`, `signatureJson`, `hash`, `nonce`, `uid`, `wid`, `sid`
- **Returns**: Signed transaction data

**Usage**:

```typescript
postSign(
  accessToken,
  network,
  type,
  additionalData,
  signatureJson,
  hash,
  nonce,
  uid,
  wid,
  sid
)
  .then((response) => {
    console.log("Response:", response);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

**preSign**: Prepares transaction data for signing.

- **Parameters**: `accessToken`, `network`, `type`, `additionalData`, `uid`, `wid`, `sid`
- **Returns**: Prepared transaction data

**Usage**:

```typescript
preSign(accessToken, network, type, additionalData, uid, wid, sid)
  .then((response) => {
    console.log("Response:", response);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

**signTransaction**: Signs a transaction with the provided data.

- **Parameters**: `accessToken`, `network`, `type`, `to`, `pvencstr`, `encryptDevicePassword`, `uid`, `wid`, `sid`, `value`, `message`
- **Returns**: Serialized transaction

**Usage**:

```typescript
signTransaction(
  accessToken,
  network,
  type,
  to,
  pvencstr,
  encryptDevicePassword,
  uid,
  wid,
  sid,
  value,
  message
)
  .then((serializedTx) => {
    console.log("Serialized Transaction:", serializedTx);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

**signTypedData**: Signs typed data.

- **Parameters**: `accessToken`, `network`, `type`, `jsonMessage`, `uid`, `wid`, `sid`, `pvencstr`, `encryptDevicePassword`
- **Returns**: Signed typed data result

**Usage**:

```typescript
signTypedData(
  accessToken,
  network,
  type,
  jsonMessage,
  uid,
  wid,
  sid,
  pvencstr,
  encryptDevicePassword
)
  .then((result) => {
    console.log("Signed Typed Data Result:", result);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

### Token Module

**generateTokenApproveData**: Generates data required to approve a token transfer.

- **Parameters**: `accessToken`, `network`, `spenderAddress`, `value`
- **Returns**: Approval data

**Usage**:

```typescript
generateTokenApproveData(accessToken, network, spenderAddress, value)
  .then((data) => {
    console.log("Approval Data:", data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

**generateTokenTransferData**: Generates data required to transfer tokens.

- **Parameters**: `accessToken`, `network`, `from`, `to`, `value`
- **Returns**: Transfer data

**Usage**:

```typescript
generateTokenTransferData(accessToken, network, from, to, value)
  .then((data) => {
    console.log("Transfer Data:", data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

**getTokenAllowance**: Retrieves the allowance of a given token for a spender.

- **Parameters**: `accessToken`, `network`, `contractAddress`, `ownerAddress`, `spenderAddress`
- **Returns**: Allowance value

**Usage**:

```typescript
getTokenAllowance(
  accessToken,
  network,
  contractAddress,
  ownerAddress,
  spenderAddress
)
  .then((allowance) => {
    console.log("Token Allowance:", allowance);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

**getTokenInfo**: Retrieves information about a given token.

- **Parameters**: `accessToken`, `network`, `contractAddress`, `ownerAddress`
- **Returns**: Token information

**Usage**:

```typescript
getTokenInfo(accessToken, network, contractAddress, ownerAddress)
  .then((info) => {
    console.log("Token Info:", info);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

### Transaction Module

**getBlock**: Retrieves block information for a given block number.

- **Parameters**: `accessToken`, `network`, `blockNumber`
- **Returns**: Block information

**Usage**:

```typescript
getBlock(accessToken, network, blockNumber)
  .then((blockInfo) => {
    console.log("Block Information:", blockInfo);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

**getTransactionByHash**: Retrieves transaction details for a given transaction hash.

- **Parameters**: `accessToken`, `network`, `hash`
- **Returns**: Transaction details

**Usage**:

```typescript
getTransactionByHash(accessToken, network, hash)
  .then((transactionDetails) => {
    console.log("Transaction Details:", transactionDetails);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

**getTransactionCount**: Retrieves the number of transactions sent from an address.

- **Parameters**: `accessToken`, `network`, `address`, `block`
- **Returns**: Transaction count

**Usage**:

```typescript
getTransactionCount(accessToken, network, address, block)
  .then((transactionCount) => {
    console.log("Transaction Count:", transactionCount);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

**getTransactionReceipt**: Retrieves the receipt of a transaction.

- **Parameters**: `accessToken`, `network`, `transactionHash`
- **Returns**: Transaction receipt

**Usage**:

```typescript
getTransactionReceipt(accessToken, network, transactionHash)
  .then((receipt) => {
    console.log("Transaction Receipt:", receipt);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

**getTransactions**: Retrieves transactions for a given address.

- **Parameters**: `accessToken`, `network`, `address`
- **Returns**: Transactions

**Usage**:

```typescript
getTransactions(accessToken, network, address)
  .then((transactions) => {
    console.log("Transactions:", transactions);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

**sendTransaction**: Sends a signed transaction.

- **Parameters**: `accessToken`, `network`, `serializedTx`
- **Returns**: Transaction result

**Usage**:

```typescript
sendTransaction(accessToken, network, serializedTx)
  .then((result) => {
    console.log("Transaction Result:", result);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

### NFT and Token Module

**getNfts**: Retrieves NFTs owned by a wallet address.

- **Parameters**: `accessToken`, `network`, `walletAddress`, `minimalInfo?`
- **Returns**: Array of NFT information

**Usage**:

```typescript
getNfts(accessToken, network, walletAddress, minimalInfo)
  .then((nfts) => {
    console.log("NFTs:", nfts);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

**getNftsByContractAddress**: Retrieves NFTs from a specific contract address.

- **Parameters**: `accessToken`, `network`, `contractAddress`, `walletAddress`, `minimalInfo?`
- **Returns**: Array of NFT information

**Usage**:

```typescript
getNftsByContractAddress(
  accessToken,
  network,
  contractAddress,
  walletAddress,
  minimalInfo
)
  .then((nfts) => {
    console.log("NFTs by Contract:", nfts);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

**getTokenMetadata**: Retrieves metadata for a specific token.

- **Parameters**: `accessToken`, `network`, `contractAddress`, `minimalInfo?`
- **Returns**: Array of token information

**Usage**:

```typescript
getTokenMetadata(accessToken, network, contractAddress, minimalInfo)
  .then((metadata) => {
    console.log("Token Metadata:", metadata);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

**getTokenPrice**: Retrieves the price of tokens in a specific currency.

- **Parameters**: `accessToken`, `network`, `currency`
- **Returns**: Token price information

**Usage**:

```typescript
getTokenPrice(accessToken, network, currency)
  .then((price) => {
    console.log("Token Price:", price);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

**getTokenPriceByContract**: Retrieves the price of a specific token by contract address.

- **Parameters**: `accessToken`, `network`, `contractAddress`, `currency`
- **Returns**: Token price information

**Usage**:

```typescript
getTokenPriceByContract(accessToken, network, contractAddress, currency)
  .then((price) => {
    console.log("Token Price by Contract:", price);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

**getTokens**: Retrieves tokens owned by a wallet address.

- **Parameters**: `accessToken`, `network`, `walletAddress`, `minimalInfo?`
- **Returns**: Array of token information

**Usage**:

```typescript
getTokens(accessToken, network, walletAddress, minimalInfo)
  .then((tokens) => {
    console.log("Tokens:", tokens);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

**getTransactions**: Retrieves transactions of a wallet address.

- **Parameters**: `accessToken`, `network`, `walletAddress`
- **Returns**: Array of transaction information

**Usage**:

```typescript
getTransactions(accessToken, network, walletAddress)
  .then((transactions) => {
    console.log("Transactions:", transactions);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```
