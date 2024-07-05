import axios from "axios";
import chalk from "chalk";

interface TokenInfo {
  name: string;
  symbol: string;
  platform: string;
  decimals: number;
  logo?: string;
  isNative: boolean;
  type: string;
  totalSupply: number;
  website?: string;
  description?: string;
  balance: number;
  possibleSpam: boolean;
  network: string;
  contractAddress: string;
  updated: string;
  hrBalance: number;
  price?: {
    coingecko?: {
      ETH?: number;
      USD?: number;
      KRW?: number;
      JPY?: number;
    };
    chainlink?: {
      USD?: number;
      KRW?: number;
      JPY?: number;
    };
  };
  marketChart?: {
    coingecko?: Array<[number, number]>;
  };
}

const getTokenMetadata = async (
  accessToken: string,
  network: string,
  contractAddress: string,
  minimalInfo?: boolean
): Promise<TokenInfo[] | null> => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_WALLETSCAN}/token/${contractAddress}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          networks: network,
          minimal_info: minimalInfo,
        },
      }
    );

    if (response.status === 200) {
      console.log(
        chalk.green("Token metadata retrieved successfully:"),
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

export default getTokenMetadata;
