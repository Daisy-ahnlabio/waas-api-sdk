interface TransactionExtra {
    hash: string;
    nonce: string;
    transaction_index: string;
    from_address: string;
    to_address: string;
    value: string;
    gas: string;
    gas_price: string;
    input: string;
    receipt_cumulative_gas_used: string;
    receipt_gas_used: string;
    receipt_status: string;
    block_timestamp: string;
    block_number: string;
    block_hash: string;
    transfer_index: [number, number];
}
interface TransactionInfo {
    platform: string;
    network: string;
    blockNumber: number;
    timeStamp: string;
    txHash: string;
    nonce: number;
    blockHash: string;
    transactionIndex: number;
    input: string;
    txAddress: string;
    rxAddress: string;
    value: number;
    gasOffered: number;
    gasPrice: number;
    receiptGasUsed: number;
    txFee: number;
    txReceiptStatus: boolean;
    transferType: string;
    extra: TransactionExtra;
}
declare const getTransactions: (accessToken: string, network: string, walletAddress: string) => Promise<TransactionInfo[] | null>;
export default getTransactions;
