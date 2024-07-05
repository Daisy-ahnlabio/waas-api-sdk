import qs from "qs";
import chalk from "chalk";
import { getSecureChannel, encrypt } from "../Secure-Channel/AuthUtil";
import axios from "axios";

interface TransactionPayload {
  uid: string;
  wid: string;
  sid: string;
  pvencstr: string;
  encryptDevicePassword: string;
  gasPrice?: string;
  gasLimit?: string;
  maxPriorityFeePerGas?: string;
  maxFeePerGas?: string;
  network?: any;
  version?: string;
  type?: string;
  messageJson: string;
}

export async function signTypedData(
  accessToken: string,
  network: string,
  type: string,
  jsonMessage: string,
  uid: string,
  wid: string,
  sid: string,
  pvencstr: string,
  encryptDevicePassword: string
) {
  try {
    const { channelid } = await getSecureChannel();
    if (!channelid) return;

    const encryptedWid = await encrypt(wid);
    const encryptedPvencstr = await encrypt(pvencstr);
    const encryptedDevicePassword = await encrypt(encryptDevicePassword);

    if (type === "SignTypedDataV3") {
      type = "v3";
    } else if (type === "SignTypedDataV4") {
      type = "v4";
    } else {
      throw new Error("Invalid transaction type for signing typed data.");
    }

    const payload: TransactionPayload = {
      network,
      uid,
      wid: encryptedWid,
      sid,
      pvencstr: encryptedPvencstr,
      encryptDevicePassword: encryptedDevicePassword,
      version: type,
      messageJson: jsonMessage,
    };

    const signResponse = await axios.post(
      `${process.env.REACT_APP_WAASURL}/wapi/v2/sign/typed-data`,
      qs.stringify(payload),
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Secure-Channel": channelid,
        },
      }
    );

    if (signResponse.status === 200) {
      console.log(
        chalk.green("Transaction signature successful:"),
        chalk.blue(JSON.stringify(signResponse.data))
      );
      return signResponse.data.result;
    } else {
      console.error(chalk.red(`Failed. HTTP Status: ${signResponse.status}`));
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
}

export default signTypedData;
