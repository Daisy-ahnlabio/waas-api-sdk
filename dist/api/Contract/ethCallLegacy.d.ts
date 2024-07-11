declare const ethCallLegacy: (accessToken: string, network: string, toAddress: string, data: string, fromAddress?: string, gasLimit?: string, gasPrice?: string, value?: string, nonce?: string) => Promise<string | null>;
export default ethCallLegacy;
