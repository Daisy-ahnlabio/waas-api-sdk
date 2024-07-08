import dotenv from "dotenv";
import axios from "axios";
import { getSecureChannel, encrypt } from "../Secure-Channel/AuthUtil";
import qs from "qs";
import chalk from "chalk";

dotenv.config();

export default async function login(
  email: string,
  password: string,
  network: string
): Promise<any> {
  try {
    const { channelid } = await getSecureChannel();
    const encryptedData = await encrypt(password);

    const data = qs.stringify({
      grant_type: "password",
      username: email,
      password: encryptedData,
      audience: process.env.REACT_APP_SERVICE_ID,
    });

    const response = await axios.post(
      `${process.env.REACT_APP_BASEURL}/auth/auth-service/v2/login`,
      data,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Accept-Language": "ko",
          "Secure-Channel": channelid,
          Authorization: process.env.REACT_APP_AUTHORIZATION,
        },
      }
    );

    if (response.status === 200) {
      const tokens = response.data;
      console.log(chalk.green("Login successful."));
      const WalletInfo = {
        email: email,
        network: network,
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
      };
      console.log(chalk.blue(JSON.stringify(WalletInfo, null, 2)));
      return WalletInfo;
    } else {
      console.error(
        chalk.red(`Login failed with status code: ${response.status}`)
      );
    }
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error(chalk.red("Login failed with Axios error:"));
      console.error(chalk.red("Status:"), chalk.red(error.response?.status));
      console.error(
        chalk.red("Status text:"),
        chalk.red(error.response?.statusText)
      );
      console.error(
        chalk.red("Data:"),
        chalk.red(JSON.stringify(error.response?.data, null, 2))
      );
    } else {
      console.error(
        chalk.red("Login failed with error:"),
        chalk.red(error.message)
      );
    }
  }
}
