import dotenv from "dotenv";
dotenv.config();

// Address
export { default as getNonce } from "./api/Address/getNonce";
export { default as getWalletBalance } from "./api/Address/getWalletBalance";
export { default as verifyAddress } from "./api/Address/verifyAddress";

// Aptos
export { default as getAccountInfo } from "./api/Aptos/getAccountInfo";
export { default as getAptosAddress } from "./api/Aptos/getAptosAddress";
export { default as getAptosTransaction } from "./api/Aptos/getAptosTransaction";
export { default as getGasEstimate } from "./api/Aptos/getGasEstimate";
export { default as getSequenceNumber } from "./api/Aptos/getSequenceNumber";
export { default as getTransferPreData } from "./api/Aptos/getTransferPreData";
export { default as getWalletBalanceAptos } from "./api/Aptos/getWalletBalance";
export { default as sendRawTransaction } from "./api/Aptos/sendRawTransaction";
export { default as simulateTransfer } from "./api/Aptos/simulateTransfer";

// Contract
export { default as ethCall } from "./api/Contract/ethCall";
export { default as ethCallEIP1559 } from "./api/Contract/ethCallEIP1559";
export { default as ethCallLegacy } from "./api/Contract/ethCallLegacy";

// Gas
export { default as estimateGasFee } from "./api/Gas/estimateGasFee";
export { default as fetchGasPrice } from "./api/Gas/fetchGasPrice";
export { default as fetchSuggestedGasFees } from "./api/Gas/fetchSuggestedGasFees";

// MPCServer
export { default as generateShare } from "./api/MPCServer/generateShare";
export { default as mpcServerSign } from "./api/MPCServer/mpcServerSign";
export { default as recoverShare } from "./api/MPCServer/recoverShare";

// MPCWallet
export { default as checkDevicePassword } from "./api/MPCWallet/checkDevicePassword";
export { default as checkDevicePasswordShare } from "./api/MPCWallet/checkDevicePasswordShare";
export { default as createOrRecoverWallet } from "./api/MPCWallet/createOrRecoverWallet";
export { default as getWalletInfo } from "./api/MPCWallet/getWalletInfo";
export { default as postRecoverWallet } from "./api/MPCWallet/postRecoverWallet";
export { default as postWallet } from "./api/MPCWallet/postWallet";
export { default as preRecoverWallet } from "./api/MPCWallet/preRecoverWallet";

// NFT
export { default as getNFTApprovalForAllData } from "./api/NFT/getNFTApprovalForAllData";
export { default as getNFTApproveData } from "./api/NFT/getNFTApproveData";
export { default as getNFTApproved } from "./api/NFT/getNFTApproved";
export { default as getNFTApprovedForAll } from "./api/NFT/getNFTApprovedForAll";
export { default as getNFTBalance } from "./api/NFT/getNFTBalance";
export { default as getNFTName } from "./api/NFT/getNFTName";
export { default as getNFTOwner } from "./api/NFT/getNFTOwner";
export { default as getNFTSymbol } from "./api/NFT/getNFTSymbol";
export { default as getNFTTotalSupply } from "./api/NFT/getNFTTotalSupply";
export { default as getNFTTransferFromData } from "./api/NFT/getNFTTransferFromData";

// Secure-Channel
export {
  getSecureChannel,
  encrypt,
  decrypt,
} from "./api/Secure-Channel/AuthUtil";

// Sign
export { default as PreSign } from "./api/Sign/PreSign";
export { default as postSign } from "./api/Sign/postSign";
export { default as signTransaction } from "./api/Sign/signTransaction";
export { default as signTypedData } from "./api/Sign/signTypedData";

// Token
export { default as generateTokenApproveData } from "./api/Token/generateTokenApproveData";
export { default as generateTokenTransferData } from "./api/Token/generateTokenTransferData";
export { default as getTokenAllowance } from "./api/Token/getTokenAllowance";
export { default as getTokenInfo } from "./api/Token/getTokenInfo";

// Transaction
export { default as getBlock } from "./api/Transaction/getBlock";
export { default as getTransactionByHash } from "./api/Transaction/getTransactionByHash";
export { default as getTransactionCount } from "./api/Transaction/getTransactionCount";
export { default as getTransactionReceipt } from "./api/Transaction/getTransactionReceipt";
export { default as getTransactions } from "./api/Transaction/getTransactions";
export { default as sendTransaction } from "./api/Transaction/sendTransaction";

// Walletscan
export { default as getNfts } from "./api/Walletscan/getNfts";
export { default as getNftsByContractAddress } from "./api/Walletscan/getNftsByContractAddress";
export { default as getTokenMetadata } from "./api/Walletscan/getTokenMetadata";
export { default as getTokenPrice } from "./api/Walletscan/getTokenPrice";
export { default as getTokenPriceByContract } from "./api/Walletscan/getTokenPriceByContract";
export { default as getTokens } from "./api/Walletscan/getTokens";
export { default as getTransactionsWalletscan } from "./api/Walletscan/getTransactions";

// Member
export { default as checkUserAvailability } from "./api/member/checkUserAvailability";
export { default as createSNSUser } from "./api/member/createSNSUser";
export { default as createUserWithCode } from "./api/member/createUserWithCode";
export { default as createUserWithoutCode } from "./api/member/createUserWithoutCode";
export { default as login } from "./api/member/login";
export { default as sendVerificationCode } from "./api/member/sendVerificationCode";
export { default as verifyEmailCode } from "./api/member/verifyEmailCode";
