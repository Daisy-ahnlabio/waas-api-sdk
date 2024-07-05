import axios from "axios";
import chalk from "chalk";

const sendVerificationCode = async (
  email: string,
  lang = "en",
  template = "verify"
): Promise<void> => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BASEURL}/member/mail-service/${email}/sendcode`,
      {
        params: { lang, template },
      }
    );

    if (response.status === 200) {
      console.log(chalk.green("Verification code sent successfully."));
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

export default sendVerificationCode;
