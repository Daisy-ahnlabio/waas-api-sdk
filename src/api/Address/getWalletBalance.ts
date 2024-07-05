import axios from "axios";
import chalk from "chalk";

const getWalletBalance = async (
  accessToken: string,
  network: string,
  address: string
) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_WAASURL}/wapi/v2/address/balance`,
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
      const balanceInWei = BigInt(response.data.result);
      const balanceInEth = Number(balanceInWei) / 1e18;
      const balanceWithDecimals = balanceInEth.toFixed(18);
      console.log(
        chalk.green("Address:"),
        chalk.blue(address),
        chalk.green("Network:"),
        chalk.blue(network),
        chalk.green("Balance:"),
        chalk.blue(balanceWithDecimals)
      );
      return balanceWithDecimals;
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

export default getWalletBalance;
