import axios from "axios";
import chalk from "chalk";

interface EstimateGasFeeParams {
  to: string;
  from?: string;
  gasLimit?: number;
  value?: number;
  data?: string;
  nonce?: number;
  maxPriorityFeePerGas?: number;
  maxFeePerGas?: number;
}

const estimateGasFee = async (
  accessToken: string,
  network: string,
  isEIP1559: boolean,
  params: EstimateGasFeeParams
): Promise<string | null> => {
  try {
    const endpoint = isEIP1559
      ? "/wapi/v2/gas/estimate/eip1559"
      : "/wapi/v2/gas/estimate/legacy";

    const response = await axios.post(
      `${process.env.REACT_APP_WAASURL}${endpoint}`,
      {
        network,
        to: params.to,
        from: params.from,
        gasLimit: params.gasLimit,
        value: params.value,
        data: params.data,
        nonce: params.nonce,
        maxPriorityFeePerGas: params.maxPriorityFeePerGas,
        maxFeePerGas: params.maxFeePerGas,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    if (response.status === 200) {
      const gasFee = response.data.result;
      console.log(chalk.green("Estimated gas fee: "), chalk.blue(gasFee));
      return gasFee;
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

export default estimateGasFee;
