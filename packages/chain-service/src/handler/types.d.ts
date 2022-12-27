export interface _EvmChainSpec {
    evmChainId: number;
    name: string;
    symbol: string;
    decimals: number;
    existentialDeposit: string;
}
export interface _SubstrateChainSpec {
    name: string;
    addressPrefix: number;
    genesisHash: string;
    symbol: string;
    decimals: number;
    existentialDeposit: string;
    paraId: number | null;
}
export declare enum _CHAIN_VALIDATION_ERROR {
    INVALID_INFO_TYPE = "invalidInfoType",
    INJECT_SCRIPT_DETECTED = "injectScriptDetected",
    EXISTED_CHAIN = "existedChain",
    EXISTED_PROVIDER = "existedProvider",
    INVALID_PROVIDER = "invalidProvider",
    NONE = "none",
    CONNECTION_FAILURE = "connectionFailure",
    PROVIDER_NOT_SAME_CHAIN = "providerNotSameChain"
}
