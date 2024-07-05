import axios from "axios";
import chalk from "chalk";

const getGasEstimate = async (
  accessToken: string,
  network: string
): Promise<string | null> => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_WAASURL}/wapi/v2/aptos/gas/estimate`,
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
      console.log(
        chalk.green("Successfully retrieved gas estimate for network:"),
        chalk.blue(network)
      );
      console.log(
        chalk.green("Gas Estimate:"),
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

export default getGasEstimate;
