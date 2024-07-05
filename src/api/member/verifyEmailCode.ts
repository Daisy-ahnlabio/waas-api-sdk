import axios from "axios";
import chalk from "chalk";
import qs from "qs";

const verifyEmailCode = async (email: string, code: string): Promise<void> => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BASEURL}/member/mail-service/${email}/verifycode`,
      qs.stringify({
        email,
        code,
        serviceid: process.env.REACT_APP_SERVICE_ID,
      }),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    if (response.status === 200) {
      console.log(chalk.green("Verification code validated successfully."));
    } else {
      console.error(chalk.red("Unexpected response status: "), response.status);
      throw new Error(`Unexpected response status: ${response.status}`);
    }
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error(
          chalk.red(`Error: ${error.message}`),
          chalk.red(`HTTP Status: ${error.response.status}`),
          chalk.red(`Response Data: ${JSON.stringify(error.response.data)}`)
        );
        throw new Error(error.response.data.msg || error.message);
      } else if (error.request) {
        console.error(
          chalk.red(`Error: ${error.message}`),
          chalk.red("No response received from the server.")
        );
        throw new Error("No response received from the server.");
      } else {
        console.error(
          chalk.red(`Error: ${error.message}`),
          chalk.red("An error occurred while setting up the request.")
        );
        throw new Error("An error occurred while setting up the request.");
      }
    } else {
      console.error(
        chalk.red(`Error: ${error.message}`),
        chalk.red("An unknown error occurred.")
      );
      throw new Error("An unknown error occurred.");
    }
  }
};

export default verifyEmailCode;
