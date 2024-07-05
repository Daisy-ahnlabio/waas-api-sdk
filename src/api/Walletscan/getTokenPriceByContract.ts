import axios from "axios";
import chalk from "chalk";

interface TokenPrice {
  [key: string]: {
    [currency: string]: number;
  };
}

const getTokenPriceByContract = async (
  accessToken: string,
  network: string,
  contractAddress: string,
  currency: string
): Promise<TokenPrice | null> => {
  try {
    const response = await axios.get<TokenPrice>(
      `${process.env.REACT_APP_WALLETSCAN}/price/cg/${contractAddress}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          networks: network,
          currency,
        },
      }
    );

    if (response.status === 200) {
      console.log(
        chalk.green("Token price retrieved successfully:"),
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

export default getTokenPriceByContract;
