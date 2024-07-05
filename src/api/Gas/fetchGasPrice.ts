import axios from "axios";
import chalk from "chalk";

const fetchGasPrice = async (
  accessToken: string,
  network: string
): Promise<{
  gasPrice: string;
  gasLimit: string;
} | null> => {
  try {
    const gasLimit = 21000;
    const gasLimitHex = "0x" + gasLimit.toString(16);

    const response = await axios.get(
      `${process.env.REACT_APP_WAASURL}/wapi/v2/gas/price`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          network,
        },
      }
    );

    if (response.status === 200) {
      console.log(chalk.green("Suggested Gas Fees fetched successfully."));
      console.log(
        chalk.green("Gas Price:"),
        chalk.blue(response.data.result),
        chalk.green("Gas Limit:"),
        chalk.blue(gasLimitHex)
      );
      return {
        gasPrice: response.data.result,
        gasLimit: gasLimitHex,
      };
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

export default fetchGasPrice;
