import axios from "axios";
import chalk from "chalk";

const getAccountInfo = async (
  accessToken: string,
  network: string,
  address: string
): Promise<any> => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_WAASURL}/wapi/v2/aptos/account`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          address,
          network,
        },
      }
    );

    if (response.status === 200) {
      console.log(
        chalk.green("Successfully retrieved account info for address:"),
        chalk.blue(address)
      );
      console.log(
        chalk.green("Account Information:"),
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

export default getAccountInfo;
