import { _ChainAsset } from '@subwallet/chain-list/types';
export declare function _isCustomNetwork(slug: string): boolean;
export declare function _isCustomAsset(slug: string): boolean;
export declare function _getCustomAssets(assetRegistry: Record<string, _ChainAsset>): Record<string, _ChainAsset>;
export declare function _isEqualContractAddress(address1: string, address2: string): boolean;
