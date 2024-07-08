import axios from "axios";
import chalk from "chalk";

const verifyAddress = async (accessToken: string, address: string) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_WAASURL}/wapi/v2/address/verify`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          address,
        },
      }
    );

    if (response.status === 200) {
      const isValid = response.data.result;
      console.log(
        chalk.green("Address:"),
        chalk.blue(address),
        chalk.green("is valid:"),
        chalk.blue(isValid)
      );
      return isValid;
    } else {
      console.error(chalk.red(`Failed. HTTP Status: ${response.status}`));
      return false;
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
    return false;
  }
};

export default verifyAddress;
