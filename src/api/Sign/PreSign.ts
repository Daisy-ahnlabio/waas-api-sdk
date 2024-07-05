import qs from "qs";
import chalk from "chalk";
import { fetchGasPrice, fetchSuggestedGasFees } from "../Gas";
import axios from "axios";

const preSign = async (
  accessToken: string,
  network: string,
  type: string,
  additionalData: { [key: string]: any } = {},
  uid: string,
  wid: string,
  sid: string
): Promise<any> => {
  try {
    const requestData: { [key: string]: any } = {
      uid,
      wid,
      sid,
      type,
      network,
      from: sid,
      ...additionalData,
    };

    if (["LEGACY", "EIP1559"].includes(type)) {
      if (type === "LEGACY") {
        const gasInfo = await fetchGasPrice(accessToken, network);
        if (gasInfo) {
          requestData.gasPrice = gasInfo.gasPrice;
          requestData.gasLimit = gasInfo.gasLimit;
        }
      }

      if (type === "EIP1559") {
        const gasInfo = await fetchSuggestedGasFees(accessToken, network);
        if (gasInfo) {
          requestData.maxPriorityFeePerGas = gasInfo.maxPriorityFeePerGas;
          requestData.maxFeePerGas = gasInfo.maxFeePerGas;
        }
      }
    }

    const response = await axios.post(
      `${process.env.REACT_APP_WAASURL}/wapi/v2/sign/pre`,
      qs.stringify(requestData),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (response.status === 200) {
      console.log(
        chalk.green("preSign Response:"),
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

export default preSign;
