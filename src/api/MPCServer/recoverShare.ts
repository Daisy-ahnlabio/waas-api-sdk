import axios from "axios";
import chalk from "chalk";

const recoverShare = async (
  accessToken: string,
  password: string,
  sid: string,
  uid: string,
  wid: string
): Promise<any> => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_MPC}/v1/recoverShare`,
      {
        access_token: accessToken,
        password: password,
        sid: sid,
        uid: uid,
        wid: wid,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      const data = response.data;
      console.log(
        chalk.green("Key share recovered successfully:"),
        chalk.blue(JSON.stringify(data, null, 2))
      );
      return data;
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

export default recoverShare;
