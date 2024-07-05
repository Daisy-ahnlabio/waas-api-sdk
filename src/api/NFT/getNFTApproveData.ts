import axios from "axios";
import chalk from "chalk";

const getNFTApproveData = async (
  accessToken: string,
  network: string,
  tokenId: number,
  approvedAddress: string
): Promise<string | null> => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_WAASURL}/wapi/v2/nft/approve-data`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          network,
          tokenId,
          approved: approvedAddress,
        },
      }
    );

    if (response.status === 200) {
      console.log(
        chalk.green("Successfully retrieved NFT approve data:"),
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

export default getNFTApproveData;
