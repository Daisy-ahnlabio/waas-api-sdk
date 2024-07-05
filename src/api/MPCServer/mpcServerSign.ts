import axios from "axios";
import chalk from "chalk";

const signMessage = async (
  hash: string,
  encryptedPassword: string,
  mpcToken: string,
  pvencStr: string,
  sid: string,
  uid: string,
  wid: string
): Promise<any> => {
  try {
    const requestData = {
      encrypted_password: encryptedPassword,
      hash: hash,
      mpc_token: mpcToken,
      pvenc_str: pvencStr,
      sid: sid,
      uid: uid,
      wid: wid,
    };

    const response = await axios.post(
      `${process.env.REACT_APP_MPC}/v1/sign`,
      requestData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      console.log(
        chalk.green("Message signed successfully:"),
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

export default signMessage;
