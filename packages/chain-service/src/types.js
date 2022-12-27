"use strict";
// Copyright 2019-2022 @subwallet/extension-koni-base authors & contributors
// SPDX-License-Identifier: Apache-2.0
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports._SMART_CONTRACT_STANDARDS = exports._NFT_CONTRACT_STANDARDS = exports._FUNGIBLE_CONTRACT_STANDARDS = exports._CUSTOM_NETWORK_PREFIX = exports._ConnectionStatus = void 0;
/* eslint @typescript-eslint/no-empty-interface: "off" */
var types_1 = require("@subwallet/extension-koni-base/services/chain-list/types");
var _ConnectionStatus;
(function (_ConnectionStatus) {
    _ConnectionStatus["CONNECTED"] = "CONNECTED";
    _ConnectionStatus["DISCONNECTED"] = "DISCONNECTED";
    _ConnectionStatus["UNSTABLE"] = "UNSTABLE";
})(_ConnectionStatus = exports._ConnectionStatus || (exports._ConnectionStatus = {}));
exports._CUSTOM_NETWORK_PREFIX = 'custom-';
exports._FUNGIBLE_CONTRACT_STANDARDS = [
    types_1._AssetType.ERC20,
    types_1._AssetType.PSP22
];
exports._NFT_CONTRACT_STANDARDS = [
    types_1._AssetType.PSP34,
    types_1._AssetType.ERC721
];
exports._SMART_CONTRACT_STANDARDS = __spreadArray(__spreadArray([], exports._FUNGIBLE_CONTRACT_STANDARDS, true), exports._NFT_CONTRACT_STANDARDS, true);
