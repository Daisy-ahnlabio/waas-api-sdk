import chalk from "chalk";
import axios from "axios";

const preRecoverWallet = async (accessToken: string): Promise<any> => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_WAASURL}/wapi/v2/mpc/wallets/recover`,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (response.status === 200) {
      const preRecoverData = response.data;
      console.log(
        chalk.green("Pre-recover wallet data fetched successfully:"),
        chalk.blue(JSON.stringify(preRecoverData, null, 2))
      );
      return preRecoverData;
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

export default preRecoverWallet;
