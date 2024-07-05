import axios from "axios";
import chalk from "chalk";

interface Token {
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
  walletAddress: string;
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
  contractAddress?: string;
}

interface TokenResponse {
  data: Token[];
}

const getTokens = async (
  accessToken: string,
  network: string,
  walletAddress: string,
  minimalInfo?: boolean
): Promise<Token[] | null> => {
  try {
    const response = await axios.get<TokenResponse>(
      `${process.env.REACT_APP_WALLETSCAN}/tokens`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          walletAddress,
          networks: network,
          minimal_info: minimalInfo,
        },
      }
    );

    if (response.status === 200) {
      console.log(
        chalk.green("Tokens information retrieved successfully:"),
        chalk.blue(JSON.stringify(response.data, null, 2))
      );
      return response.data.data;
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

export default getTokens;
