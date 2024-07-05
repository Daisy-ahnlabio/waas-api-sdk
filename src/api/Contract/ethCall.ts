import axios from "axios";
import chalk from "chalk";

const ethCall = async (
  accessToken: string,
  network: string,
  isEIP1559: boolean,
  toAddress: string,
  data: string,
  fromAddress?: string,
  gasLimit?: string,
  gasPrice?: string,
  value?: string,
  nonce?: string,
  maxPriorityFeePerGas?: string,
  maxFeePerGas?: string
): Promise<string | null> => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_WAASURL}/wapi/v2/contract/eth-call`,
      {
        network,
        isEIP1559,
        from: fromAddress,
        to: toAddress,
        data,
        gasLimit,
        gasPrice,
        value,
        nonce,
        maxPriorityFeePerGas,
        maxFeePerGas,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    if (response.status === 200) {
      console.log(chalk.green("eth_call: "), chalk.blue(response.data.result));
      return response.data.result;
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

export default ethCall;
