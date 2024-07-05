import axios from "axios";
import chalk from "chalk";

const sendRawTransaction = async (
  accessToken: string,
  network: string,
  sender: string,
  receiver: string,
  amount: string,
  expirationTimestampSecs: number,
  sequenceNumber: number,
  maxGasAmount: number,
  gasUnitPrice: number,
  pubkey: string,
  signatureJson: string
): Promise<string | null> => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_WAASURL}/wapi/v2/aptos/transfer`,
      {
        sender,
        receiver,
        amount,
        expirationTimestampSecs,
        sequenceNumber,
        maxGasAmount,
        gasUnitPrice,
        pubkey,
        signatureJson,
        network,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      console.log(chalk.green("Successfully sent raw transaction"));
      console.log(
        chalk.green("Response Data:"),
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

export default sendRawTransaction;
