import axios from "axios";
import chalk from "chalk";

const checkUserAvailability = async (email: string): Promise<void> => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BASEURL}/member/user-management/users/${email}`,
      {
        params: { serviceid: process.env.REACT_APP_SERVICE_ID },
      }
    );

    if (response.status === 200) {
      console.log(chalk.green("User can sign up."));
    } else {
      console.error(chalk.red(`Failed. HTTP Status: ${response.status}`));
      throw new Error(`Failed. HTTP Status: ${response.status}`);
    }
  } catch (error: any) {
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
  }
};

export default checkUserAvailability;
