interface EstimateGasFeeParams {
    to: string;
    from?: string;
    gasLimit?: number;
    value?: number;
    data?: string;
    nonce?: number;
    maxPriorityFeePerGas?: number;
    maxFeePerGas?: number;
}
declare const estimateGasFee: (accessToken: string, network: string, isEIP1559: boolean, params: EstimateGasFeeParams) => Promise<string | null>;
export default estimateGasFee;
