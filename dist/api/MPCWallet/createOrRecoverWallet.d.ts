declare const createOrRecoverWallet: (accessToken: string, email: string, password: string) => Promise<string | null>;
export default createOrRecoverWallet;
