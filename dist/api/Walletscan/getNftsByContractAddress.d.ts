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
declare const getNftsByContractAddress: (accessToken: string, network: string, contractAddress: string, walletAddress: string, minimalInfo?: boolean) => Promise<NftInfo[] | null>;
export default getNftsByContractAddress;
