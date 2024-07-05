import { getSecureChannel, encrypt } from "../Secure-Channel/AuthUtil";
import qs from "qs";
import chalk from "chalk";
import axios from "axios";

const createOrRecoverWallet = async (
  accessToken: string,
  email: string,
  password: string
): Promise<string | null> => {
  try {
    const { channelid } = await getSecureChannel();
    const encryptedPassword = await encrypt(password);

    const response = await axios.post(
      `${process.env.REACT_APP_WAASURL}/wapi/v2/mpc/wallets`,
      qs.stringify({
        email: email,
        devicePassword: encryptedPassword,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${accessToken}`,
          "Secure-Channel": channelid,
        },
      }
    );

    if (response.status === 200) {
      const responseData = response.data;
      console.log(
        chalk.green("Wallet created/recovered successfully: "),
        chalk.blue(JSON.stringify(responseData, null, 2))
      );
      return responseData;
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

export default createOrRecoverWallet;
