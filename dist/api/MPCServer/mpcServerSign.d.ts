declare const signMessage: (hash: string, encryptedPassword: string, mpcToken: string, pvencStr: string, sid: string, uid: string, wid: string) => Promise<any>;
export default signMessage;
