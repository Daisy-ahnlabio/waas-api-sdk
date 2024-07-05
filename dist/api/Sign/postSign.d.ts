declare const postSign: (accessToken: string, network: string, type: string, additionalData: {
    [key: string]: any;
} | undefined, signatureJson: any, hash: string, nonce: string, uid: string, wid: string, sid: string) => Promise<any>;
export default postSign;
