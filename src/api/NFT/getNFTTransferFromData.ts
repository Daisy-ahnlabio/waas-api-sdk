import axios from "axios";
import chalk from "chalk";

const getNFTTransferFromData = async (
  accessToken: string,
  network: string,
  fromAddress: string,
  toAddress: string,
  tokenId: number,
  data?: string
): Promise<any> => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_WAASURL}/wapi/v2/nft/transfer-from-data`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          network,
          from: fromAddress,
          to: toAddress,
          tokenId,
          data,
        },
      }
    );

    if (response.status === 200) {
      console.log(
        chalk.green("Successfully retrieved NFT transfer data:"),
        chalk.blue(response.data.result)
      );
      return response.data.result;
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

export default getNFTTransferFromData;
