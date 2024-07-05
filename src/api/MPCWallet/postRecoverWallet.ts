import qs from "qs";
import chalk from "chalk";
import axios from "axios";

const recoverWallet = async (
  accessToken: string,
  ucpubkey: string,
  uid: string,
  wid: string
): Promise<any> => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_WAASURL}/wapi/v2/mpc/wallets/recover`,
      qs.stringify({
        ucpubkey: ucpubkey,
        uid: uid,
        wid: wid,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (response.status === 200) {
      console.log(
        chalk.green("Wallet recovered successfully:"),
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

export default recoverWallet;
