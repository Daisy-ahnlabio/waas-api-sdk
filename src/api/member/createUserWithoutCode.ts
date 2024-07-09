import axios from "axios";
import qs from "qs";
import { getSecureChannel, encrypt } from "../Secure-Channel/AuthUtil";
import chalk from "chalk";

export default async function createUserWithoutCode(
  username: string,
  password: string,
  overage: number,
  agree: number,
  collect: number,
  thirdparty: number,
  advertise: number
): Promise<void> {
  try {
    const { channelid } = await getSecureChannel();
    const encryptedPassword = await encrypt(password);

    const data = qs.stringify({
      username,
      password: encryptedPassword,
      serviceid: process.env.REACT_APP_SERVICE_ID,
      joinpath: "",
      overage,
      agree,
      collect,
      thirdparty,
      advertise,
    });

    const response = await axios.post(
      `${process.env.REACT_APP_WAASURL}/member/user-management/users/create`,
      data,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Secure-Channel": channelid,
          Authorization: process.env.REACT_APP_AUTHORIZATION,
        },
      }
    );

    if (response.status === 201) {
      console.log(chalk.green("User created successfully."));
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
}
