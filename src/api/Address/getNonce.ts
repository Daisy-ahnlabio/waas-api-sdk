import axios from "axios";
import chalk from "chalk";

const getNonce = async (
  accessToken: string,
  network: string,
  address: string
) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_WAASURL}/wapi/v2/address/nonce`,
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
      const nonce = response.data.result;
      console.log(
        chalk.green("Nonce for address"),
        chalk.blue(address),
        chalk.green(":"),
        chalk.blue(nonce)
      );
      return nonce;
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

export default getNonce;
