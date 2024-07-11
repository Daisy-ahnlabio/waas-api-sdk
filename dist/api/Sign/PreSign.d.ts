declare const preSign: (accessToken: string, network: string, type: string, additionalData: {
    [key: string]: any;
} | undefined, uid: string, wid: string, sid: string) => Promise<any>;
export default preSign;
