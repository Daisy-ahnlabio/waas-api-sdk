import axios from "axios";
import chalk from "chalk";

const fetchSuggestedGasFees = async (
  accessToken: string,
  network: string
): Promise<{
  maxPriorityFeePerGas: string;
  maxFeePerGas: string;
} | null> => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_WAASURL}/wapi/v2/gas/suggestedGasFees`,
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
      const suggestedMaxPriorityFeePerGasHex =
        "0x" +
        parseInt(response.data.medium.suggestedMaxPriorityFeePerGas).toString(
          16
        );
      const suggestedMaxFeePerGasHex =
        "0x" +
        parseInt(response.data.medium.suggestedMaxFeePerGas).toString(16);
      console.log(
        chalk.green("maxPriorityFeePerGas:"),
        chalk.blue(suggestedMaxPriorityFeePerGasHex),
        chalk.green("maxFeePerGas:"),
        chalk.blue(suggestedMaxFeePerGasHex)
      );
      return {
        maxPriorityFeePerGas: suggestedMaxPriorityFeePerGasHex,
        maxFeePerGas: suggestedMaxFeePerGasHex,
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

export default fetchSuggestedGasFees;
