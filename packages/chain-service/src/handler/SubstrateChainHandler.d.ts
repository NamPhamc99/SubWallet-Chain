import { _AssetType } from '@subwallet/extension-koni-base/services/chain-list/types';
import { _SmartContractTokenInfo, _SubstrateApi } from '@subwallet/extension-koni-base/services/chain-service/types';
export declare class SubstrateChainHandler {
    private substrateApiMap;
    private logger;
    constructor();
    getSubstrateApiByChain(chainSlug: string): _SubstrateApi;
    getChainSpec(substrateApi: _SubstrateApi): Promise<_SubstrateChainSpec>;
    getSmartContractTokenInfo(contractAddress: string, tokenType: _AssetType, originChain: string, contractCaller?: string): Promise<_SmartContractTokenInfo>;
    initApi(chainSlug: string, apiUrl: string): _SubstrateApi;
    private getChainMetadata;
    private loadOnReady;
}
