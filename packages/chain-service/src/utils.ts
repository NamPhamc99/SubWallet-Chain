// Copyright 2019-2022 @subwallet/extension-koni-base authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { _ChainAsset } from '@subwallet/chain-list/types';

import { isEthereumAddress } from '@polkadot/util-crypto';

import { _CUSTOM_NETWORK_PREFIX } from './types';

export function _isCustomNetwork (slug: string) {
  if (slug.length === 0) {
    return true;
  }

  return slug.startsWith(_CUSTOM_NETWORK_PREFIX);
}

export function _isCustomAsset (slug: string) { // might be different from _isCustomNetwork
  if (slug.length === 0) {
    return true;
  }

  return slug.startsWith(_CUSTOM_NETWORK_PREFIX);
}

export function _getCustomAssets (assetRegistry: Record<string, _ChainAsset>): Record<string, _ChainAsset> {
  const filteredAssetMap: Record<string, _ChainAsset> = {};

  Object.values(assetRegistry).forEach((chainAsset) => {
    if (_isCustomAsset(chainAsset.slug)) {
      filteredAssetMap[chainAsset.slug] = chainAsset;
    }
  });

  return filteredAssetMap;
}

export function _isEqualContractAddress (address1: string, address2: string) {
  if (isEthereumAddress(address1) && isEthereumAddress(address2)) {
    return address1.toLowerCase() === address2.toLowerCase(); // EVM address is case-insensitive
  }

  return address2 === address1;
}
