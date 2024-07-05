import qs from "qs";
import chalk from "chalk";
import axios from "axios";

const sendTransaction = async (
  accessToken: string,
  network: string,
  serializedTx: string
): Promise<string | null> => {
  try {
    let data = qs.stringify({
      signedSerializeTx: serializedTx,
      network: network,
    });

    const response = await axios.post(
      `${process.env.REACT_APP_WAASURL}/wapi/v2/transactions/raw-tx/send`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    if (response.status === 200) {
      console.log(
        chalk.green("Transaction sent successfully:"),
        chalk.blue(response.data.result)
      );
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

export default sendTransaction;
