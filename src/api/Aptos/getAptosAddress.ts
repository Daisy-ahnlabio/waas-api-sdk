import axios from "axios";
import chalk from "chalk";

const getAptosAddress = async (
  accessToken: string,
  network: string,
  pubkey: string
): Promise<string | null> => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_WAASURL}/wapi/v2/aptos/address`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          pubkey,
          network,
        },
      }
    );

    if (response.status === 200) {
      const address = response.data.result;
      console.log(
        chalk.green("Successfully retrieved address from pubkey:"),
        chalk.blue(pubkey)
      );
      console.log(chalk.green("Address:"), chalk.blue(address));
      return address;
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

export default getAptosAddress;
