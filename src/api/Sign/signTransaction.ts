import qs from "qs";
import chalk from "chalk";
import { getSecureChannel, encrypt } from "../Secure-Channel/AuthUtil";
import fetchGasPrice from "../Gas/fetchGasPrice";
import fetchSuggestedGasFees from "../Gas/fetchSuggestedGasFees";
import axios from "axios";

interface TransactionPayload {
  uid: string;
  wid: string;
  sid: string;
  from: string;
  pvencstr: string;
  encryptDevicePassword: string;
  value?: string;
  network: any;
  message?: string;
  gasPrice?: string;
  gasLimit?: string;
  maxPriorityFeePerGas?: string;
  maxFeePerGas?: string;
  to?: string;
  version?: string;
  type?: string;
}

export async function signTransaction(
  accessToken: string,
  network: string,
  type: string,
  to: string,
  pvencstr: string,
  encryptDevicePassword: string,
  uid: string,
  wid: string,
  sid: string,
  value?: string,
  message?: string
) {
  try {
    const { channelid } = await getSecureChannel();
    const encryptedWid = await encrypt(wid);
    const encryptedPvencstr = await encrypt(pvencstr);
    const encryptedDevicePassword = await encrypt(encryptDevicePassword);
    // 초기 payload 설정
    let payload: TransactionPayload = {
      to,
      from: sid,
      network: network,
      uid,
      wid: encryptedWid,
      sid,
      pvencstr: encryptedPvencstr,
      encryptDevicePassword: encryptedDevicePassword,
      value,
      type,
      message,
    };

    if (type === "LEGACY") {
      const gasInfo = await fetchGasPrice(accessToken, network);
      if (gasInfo) {
        payload = {
          ...payload,
          gasPrice: gasInfo.gasPrice,
          gasLimit: gasInfo.gasLimit,
        };
      }
    } else if (type === "EIP1559") {
      const gasInfo = await fetchSuggestedGasFees(accessToken, network);
      if (gasInfo) {
        payload = {
          ...payload,
          maxPriorityFeePerGas: gasInfo.maxPriorityFeePerGas,
          maxFeePerGas: gasInfo.maxFeePerGas,
        };
      }
    }

    const signResponse = await axios.post(
      `${process.env.REACT_APP_WAASURL}/wapi/v2/sign`,
      qs.stringify(payload),
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/x-www-form-urlencoded",
          "Secure-Channel": channelid,
        },
      }
    );
    if (signResponse.status === 200) {
      console.log(
        chalk.green("Transaction signed successfully:"),
        chalk.blue(JSON.stringify(signResponse.data, null, 2))
      );
      const { serializedTx } = signResponse.data;
      return serializedTx;
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

export default signTransaction;
