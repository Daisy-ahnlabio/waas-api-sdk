import axios from "axios";
import chalk from "chalk";

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

const getTransactions = async (
  accessToken: string,
  network: string,
  walletAddress: string
): Promise<TransactionInfo[] | null> => {
  try {
    const response = await axios.get<TransactionInfo[]>(
      `${process.env.REACT_APP_WALLETSCAN}/transactions`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          walletAddress,
          networks: network,
        },
      }
    );

    if (response.status === 200) {
      console.log(
        chalk.green("Transactions retrieved successfully:"),
        chalk.blue(JSON.stringify(response.data, null, 2))
      );
      return response.data;
    } else {
      console.error(chalk.red(`Failed. HTTP Status: ${response.status}`));
      return null;
    }
  } catch (error: any) {
    if (error.response) {
      console.error(
        chalk.red(`Error: ${error.message}`),
        chalk.red(`HTTP Status: ${error.response.status}`),
        chalk.red(`Response Data: ${JSON.stringify(error.response.data)}`)
      );
    } else if (error.request) {
      console.error(
        chalk.red(`Error: ${error.message}`),
        chalk.red("No response received from the server.")
      );
    } else {
      console.error(
        chalk.red(`Error: ${error.message}`),
        chalk.red("An error occurred while setting up the request.")
      );
    }
    return null;
  }
};

export default getTransactions;
