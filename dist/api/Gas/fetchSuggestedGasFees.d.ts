declare const fetchSuggestedGasFees: (accessToken: string, network: string) => Promise<{
    maxPriorityFeePerGas: string;
    maxFeePerGas: string;
} | null>;
export default fetchSuggestedGasFees;
