import axios from "axios";
import chalk from "chalk";

const getTransferPreData = async (
  accessToken: string,
  network: string,
  sender: string,
  receiver: string,
  amount: string
): Promise<any> => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_WAASURL}/wapi/v2/aptos/transfer/pre`,
      {
        sender,
        receiver,
        amount,
        network,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    if (response.status === 200) {
      console.log(chalk.green("Successfully retrieved transfer pre-data"));
      console.log(
        chalk.green("Transfer Pre-Data:"),
        chalk.blue(JSON.stringify(response.data, null, 2))
      );
      return response.data;
    } else {
      console.error(chalk.red(`Failed. HTTP Status: ${response.status}`));
      return null;
    }
  } catch (error: any) {
    console.error(
      chalk.red("Failed to get transfer pre-data:"),
      chalk.yellow(error.message)
    );
    return null;
  }
};

export default getTransferPreData;
