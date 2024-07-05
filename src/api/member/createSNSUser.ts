import axios from "axios";
import qs from "qs";
import dotenv from "dotenv";
import chalk from "chalk";

dotenv.config();

export default async function createSNSUser(
  username: string,
  code: string,
  joinPath: string,
  socialType: string,
  overage: number,
  agree: number,
  collect: number,
  thirdparty: number,
  advertise: number
): Promise<void> {
  try {
    const data = qs.stringify({
      username,
      code,
      serviceid: process.env.REACT_APP_SERVICE_ID,
      joinpath: joinPath,
      socialtype: socialType,
      overage,
      agree,
      collect,
      thirdparty,
      advertise,
    });

    const response = await axios.post(
      `${process.env.REACT_APP_BASEURL}/member/user-management/v2/join`,
      data,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: process.env.REACT_APP_AUTHORIZATION,
        },
      }
    );

    if (response.status === 201) {
      console.log(chalk.green("SNS user created successfully."));
    } else {
      console.error(chalk.red("Unexpected response status: "), response.status);
      throw new Error(`Unexpected response status: ${response.status}`);
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
}
