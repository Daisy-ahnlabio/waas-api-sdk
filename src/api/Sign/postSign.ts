import qs from "qs";
import chalk from "chalk";
import { fetchGasPrice, fetchSuggestedGasFees } from "../Gas";
import axios from "axios";

const postSign = async (
  accessToken: string,
  network: string,
  type: string,
  additionalData: { [key: string]: any } = {},
  signatureJson: any, // signatureJson을 string으로 처리
  hash: string,
  nonce: string,
  uid: string,
  wid: string,
  sid: string
): Promise<any> => {
  try {
    const postData: { [key: string]: any } = {
      uid,
      wid,
      sid,
      type,
      network,
      from: sid,
      hashHex: hash,
      nonce,
      ...additionalData,
    };

    if (["LEGACY", "EIP1559"].includes(type)) {
      if (type === "LEGACY") {
        const gasInfo = await fetchGasPrice(accessToken, network);
        if (gasInfo) {
          postData.gasPrice = gasInfo.gasPrice;
          postData.gasLimit = gasInfo.gasLimit;
        }
      }

      if (type === "EIP1559") {
        const gasInfo = await fetchSuggestedGasFees(accessToken, network);
        if (gasInfo) {
          postData.maxPriorityFeePerGas = gasInfo.maxPriorityFeePerGas;
          postData.maxFeePerGas = gasInfo.maxFeePerGas;
        }
      }
    }

    const enhancedSignatureJson = {
      signstr: signatureJson.sign_str,
    };

    // qs.stringify를 사용하여 쿼리 문자열 생성
    let formBody = qs.stringify(postData);

    // enhancedSignatureJson을 JSON 문자열로 변환하여 직접 추가
    formBody += `&signatureJson=${encodeURIComponent(
      JSON.stringify(enhancedSignatureJson)
    )}`;

    const response = await axios.post(
      `${process.env.REACT_APP_WAASURL}/wapi/v2/sign/post`,
      formBody,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (response.status === 200) {
      console.log(
        chalk.green("postSign Response:"),
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

export default postSign;
