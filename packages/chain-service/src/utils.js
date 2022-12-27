"use strict";
// Copyright 2019-2022 @subwallet/extension-koni-base authors & contributors
// SPDX-License-Identifier: Apache-2.0
exports.__esModule = true;
exports._isEqualContractAddress = exports._getCustomAssets = exports._isCustomAsset = exports._isCustomNetwork = void 0;
var util_crypto_1 = require("@polkadot/util-crypto");
var types_1 = require("./types");
function _isCustomNetwork(slug) {
    if (slug.length === 0) {
        return true;
    }
    return slug.startsWith(types_1._CUSTOM_NETWORK_PREFIX);
}
exports._isCustomNetwork = _isCustomNetwork;
function _isCustomAsset(slug) {
    if (slug.length === 0) {
        return true;
    }
    return slug.startsWith(types_1._CUSTOM_NETWORK_PREFIX);
}
exports._isCustomAsset = _isCustomAsset;
function _getCustomAssets(assetRegistry) {
    var filteredAssetMap = {};
    Object.values(assetRegistry).forEach(function (chainAsset) {
        if (_isCustomAsset(chainAsset.slug)) {
            filteredAssetMap[chainAsset.slug] = chainAsset;
        }
    });
    return filteredAssetMap;
}
exports._getCustomAssets = _getCustomAssets;
function _isEqualContractAddress(address1, address2) {
    if ((0, util_crypto_1.isEthereumAddress)(address1) && (0, util_crypto_1.isEthereumAddress)(address2)) {
        return address1.toLowerCase() === address2.toLowerCase(); // EVM address is case-insensitive
    }
    return address2 === address1;
}
exports._isEqualContractAddress = _isEqualContractAddress;
