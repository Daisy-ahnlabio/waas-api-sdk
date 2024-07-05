import axios from "axios";
import chalk from "chalk";

interface NftMetaData {
  url: string;
  mimetype: string;
  data: {
    name: string;
    description: string;
    image: string;
    dna: string;
    edition: number;
    date: number;
    attributes: Array<{
      trait_type: string;
      value: string;
    }>;
    compiler: string;
  };
}

interface NftInfo {
  name: string;
  platform: string;
  type: string;
  collectionName: string;
  description: string;
  possibleSpam: boolean;
  isSbt: boolean;
  last_transfer_at: string;
  creator_address: string;
  collection_data_id_hash: string;
  token_data_id_hash: string;
  network: string;
  updated: string;
  balance: number;
  tokenId: number;
  tokenUri: string;
  image: string;
  meta: NftMetaData;
}

const getNfts = async (
  accessToken: string,
  network: string,
  walletAddress: string,
  minimalInfo?: boolean
): Promise<NftInfo[] | null> => {
  try {
    const response = await axios.get<NftInfo[]>(
      `${process.env.REACT_APP_WALLETSCAN}/nfts`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          walletAddress,
          networks: network,
          minimal_info: minimalInfo,
        },
      }
    );

    if (response.status === 200) {
      console.log(
        chalk.green("NFTs retrieved successfully:"),
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

export default getNfts;
