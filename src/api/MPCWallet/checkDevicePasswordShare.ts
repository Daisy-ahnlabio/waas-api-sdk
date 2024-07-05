import qs from "qs";
import { encrypt, getSecureChannel } from "../Secure-Channel/AuthUtil";
import chalk from "chalk";
import axios from "axios";

const checkDevicePasswordShare = async (
  accessToken: string,
  devicePassword: string,
  pvencstr: string
): Promise<string | null> => {
  try {
    const { channelid } = await getSecureChannel();
    const encryptedData = await encrypt(devicePassword);

    const response = await axios.post(
      `${process.env.REACT_APP_WAASURL}/wapi/v2/mpc/wallets/check/device-password/share`,
      qs.stringify({
        devicePassword: encryptedData,
        pvencstr: pvencstr,
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
      console.log(
        chalk.green("Check Device Password Share Response:"),
        chalk.blue(response.data)
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

export default checkDevicePasswordShare;
