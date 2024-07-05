import axios from "axios";
import chalk from "chalk";

const getSequenceNumber = async (
  accessToken: string,
  network: string,
  address: string
): Promise<string | null> => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_WAASURL}/wapi/v2/aptos/sequence`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          address,
          network,
        },
      }
    );

    if (response.status === 200) {
      const sequenceNumber = response.data.result;
      console.log(
        chalk.green("Successfully retrieved sequence number for address:"),
        chalk.blue(address)
      );
      console.log(chalk.green("Sequence Number:"), chalk.blue(sequenceNumber));
      return sequenceNumber;
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

export default getSequenceNumber;
