import { _AssetType } from '@subwallet/extension-koni-base/services/chain-list/types';
import { _EvmApi, _SmartContractTokenInfo } from '@subwallet/extension-koni-base/services/chain-service/types';
export declare class EvmChainHandler {
    private evmApiMap;
    private logger;
    constructor();
    getEvmApiByChain(chainSlug: string): _EvmApi;
    initApi(chainSlug: string, apiUrl: string): _EvmApi;
    getChainSpec(evmApi: _EvmApi): Promise<_EvmChainSpec>;
    getSmartContractTokenInfo(contractAddress: string, tokenType: _AssetType, originChain: string): Promise<_SmartContractTokenInfo>;
}
