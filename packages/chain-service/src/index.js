"use strict";
// Copyright 2019-2022 @subwallet/extension-koni-base authors & contributors
// SPDX-License-Identifier: Apache-2.0
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.ChainService = void 0;
var rxjs_1 = require("rxjs");
var web3_1 = require("web3");
var logger_1 = require("@polkadot/util/logger");
var chain_list_1 = require("@subwallet/chain-list");
var types_1 = require("@subwallet/chain-list/types");
var types_2 = require("./types");
var SubstrateChainHandler_1 = require("./handler/SubstrateChainHandler");
var utils_1 = require("./utils");
var types_3 = require("./handler/types");
var EvmChainHandler_1 = require("./handler/EvmChainHandler");
var ChainService = /** @class */ (function () {
    function ChainService() {
        var _this = this;
        this.dataMap = {
            chainInfoMap: {},
            chainStateMap: {},
            assetRegistry: {}
        };
        this.lockChainInfoMap = false; // prevent unwanted changes (edit, enable, disable) to chainInfoMap
        this.chainInfoMapSubject = new rxjs_1.Subject();
        this.chainStateMapSubject = new rxjs_1.Subject();
        this.assetRegistrySubject = new rxjs_1.Subject();
        this.dataMap.chainInfoMap = chain_list_1.ChainInfoMap;
        Object.values(this.dataMap.chainInfoMap).forEach(function (chainInfo) {
            _this.dataMap.chainStateMap[chainInfo.slug] = {
                currentProvider: Object.keys(chainInfo.providers)[0],
                slug: chainInfo.slug,
                connectionStatus: types_2._ConnectionStatus.DISCONNECTED,
                active: false
            };
        });
        this.dataMap.assetRegistry = chain_list_1.ChainAssetMap;
        this.substrateChainHandler = new SubstrateChainHandler_1.SubstrateChainHandler();
        this.evmChainHandler = new EvmChainHandler_1.EvmChainHandler();
        this.chainInfoMapSubject.next(this.dataMap.chainInfoMap);
        this.chainStateMapSubject.next(this.dataMap.chainStateMap);
        this.assetRegistrySubject.next(this.dataMap.assetRegistry);
        this.logger = (0, logger_1.logger)('chain-service');
    }
    ChainService.prototype.getChainInfoByKey = function (key) {
        return this.dataMap.chainInfoMap[key];
    };
    ChainService.prototype.initChainState = function () {
        var chainStateMap = this.getChainStateMap();
        types_1._DEFAULT_NETWORKS.forEach(function (slug) {
            chainStateMap[slug].active = true;
        });
        this.logger.log('Initiated with default networks');
    };
    ChainService.prototype.subscribeChainInfoMap = function () {
        return this.chainInfoMapSubject;
    };
    ChainService.prototype.subscribeAssetRegistry = function () {
        return this.assetRegistrySubject;
    };
    ChainService.prototype.subscribeChainStateMap = function () {
        return this.chainStateMapSubject;
    };
    ChainService.prototype.getAssetRegistry = function () {
        return this.dataMap.assetRegistry;
    };
    ChainService.prototype.getSmartContractTokens = function () {
        var filteredAssetRegistry = {};
        Object.values(this.getAssetRegistry()).forEach(function (asset) {
            if (types_2._SMART_CONTRACT_STANDARDS.includes(asset.assetType)) {
                filteredAssetRegistry[asset.slug] = asset;
            }
        });
        return filteredAssetRegistry;
    };
    ChainService.prototype.getChainInfoMap = function () {
        return this.dataMap.chainInfoMap;
    };
    ChainService.prototype.getChainStateMap = function () {
        return this.dataMap.chainStateMap;
    };
    ChainService.prototype.removeChain = function (slug) {
        if (this.lockChainInfoMap) {
            return false;
        }
        this.lockChainInfoMap = true;
        var chainInfoMap = this.getChainInfoMap();
        var chainStateMap = this.getChainStateMap();
        if (!(slug in chainInfoMap)) {
            return false;
        }
        if (chainStateMap[slug].active) {
            return false;
        }
        delete chainStateMap[slug];
        delete chainInfoMap[slug];
        this.chainInfoMapSubject.next(this.getChainInfoMap());
        this.chainStateMapSubject.next(this.getChainStateMap());
        this.lockChainInfoMap = false;
        return true;
    };
    ChainService.prototype.updateChainActiveStatus = function (slug, active) {
        var chainStateMap = this.getChainStateMap();
        if (!Object.keys(chainStateMap).includes(slug)) {
            return false;
        }
        if (this.lockChainInfoMap) {
            return false;
        }
        this.lockChainInfoMap = true;
        chainStateMap[slug].active = active;
        this.chainStateMapSubject.next(this.getChainStateMap());
        this.lockChainInfoMap = false;
        return true;
    };
    ChainService.prototype.getSupportedSmartContractTypes = function () {
        return [types_1._AssetType.ERC20, types_1._AssetType.ERC721, types_1._AssetType.PSP22, types_1._AssetType.PSP34];
    };
    ChainService.prototype.resetChainInfoMap = function () {
        if (this.lockChainInfoMap) {
            return false;
        }
        this.lockChainInfoMap = true;
        var chainStateMap = this.getChainStateMap();
        for (var _i = 0, _a = Object.entries(chainStateMap); _i < _a.length; _i++) {
            var _b = _a[_i], slug = _b[0], chainState = _b[1];
            if (!types_1._DEFAULT_NETWORKS.includes(slug)) {
                chainState.active = false;
            }
        }
        this.chainStateMapSubject.next(this.getChainStateMap());
        this.lockChainInfoMap = false;
        return true;
    };
    ChainService.prototype.updateChainState = function (slug, active, currentProvider) {
        var chainStateMap = this.getChainStateMap();
        if (active) {
            chainStateMap[slug].active = active;
        }
        if (currentProvider) {
            chainStateMap[slug].currentProvider = currentProvider;
        }
        this.chainStateMapSubject.next(this.getChainStateMap());
    };
    ChainService.prototype.upsertChainInfo = function (data) {
        var params = data;
        if (this.lockChainInfoMap) {
            return false;
        }
        var chainInfoMap = this.getChainInfoMap();
        var slug = params.chainEditInfo.slug;
        this.lockChainInfoMap = true;
        if (slug !== '' && slug in chainInfoMap) { // update existing chainInfo
            var targetChainInfo = chainInfoMap[slug];
            targetChainInfo.providers = params.chainEditInfo.providers;
            targetChainInfo.name = params.chainEditInfo.name;
            if (targetChainInfo.substrateInfo) {
                targetChainInfo.substrateInfo.symbol = params.chainEditInfo.symbol;
            }
            else if (targetChainInfo.evmInfo) {
                targetChainInfo.evmInfo.symbol = params.chainEditInfo.symbol;
            }
            this.updateChainState(params.chainEditInfo.slug, null, params.chainEditInfo.currentProvider);
        }
        else { // insert custom network
            var newSlug = this.generateSlugForChain(params.chainEditInfo.chainType, params.chainEditInfo.name, params.chainSpec.paraId, params.chainSpec.evmChainId);
            var substrateInfo = null;
            var evmInfo = null;
            if (params.chainSpec.genesisHash !== '') {
                substrateInfo = {
                    addressPrefix: params.chainSpec.addressPrefix,
                    blockExplorer: params.chainEditInfo.blockExplorer || null,
                    category: [],
                    crowdloanUrl: params.chainEditInfo.crowdloanUrl || null,
                    decimals: params.chainSpec.decimals,
                    existentialDeposit: params.chainSpec.existentialDeposit,
                    paraId: params.chainSpec.paraId,
                    symbol: params.chainEditInfo.symbol,
                    genesisHash: params.chainSpec.genesisHash,
                    relaySlug: null,
                    supportStaking: params.chainSpec.paraId === null,
                    supportSmartContract: null
                };
            }
            else if (params.chainSpec.evmChainId !== null) {
                evmInfo = {
                    supportSmartContract: [types_1._AssetType.ERC20, types_1._AssetType.ERC721],
                    blockExplorer: params.chainEditInfo.blockExplorer || null,
                    decimals: params.chainSpec.decimals,
                    evmChainId: params.chainSpec.evmChainId,
                    existentialDeposit: params.chainSpec.existentialDeposit,
                    symbol: params.chainEditInfo.symbol
                };
            }
            // insert new chainInfo
            chainInfoMap[newSlug] = {
                slug: newSlug,
                name: params.chainEditInfo.name,
                providers: params.chainEditInfo.providers,
                substrateInfo: substrateInfo,
                evmInfo: evmInfo,
                logo: ''
            };
            // insert new chainState
            var chainStateMap = this.getChainStateMap();
            // create a record in assetRegistry for native token
            this.upsertCustomToken({
                assetType: types_1._AssetType.NATIVE,
                decimals: params.chainSpec.decimals,
                metadata: null,
                minAmount: params.chainSpec.existentialDeposit,
                multiChainAsset: null,
                name: params.chainEditInfo.name,
                originChain: newSlug,
                priceId: null,
                slug: '',
                symbol: params.chainEditInfo.symbol
            });
            chainStateMap[newSlug] = {
                active: true,
                connectionStatus: types_2._ConnectionStatus.DISCONNECTED,
                currentProvider: params.chainEditInfo.currentProvider,
                slug: newSlug
            };
            this.chainStateMapSubject.next(this.getChainStateMap());
        }
        this.chainInfoMapSubject.next(this.getChainInfoMap());
        this.lockChainInfoMap = false;
        return true;
    };
    ChainService.prototype.generateSlugForChain = function (chainType, name, paraId, evmChainId) {
        var parsedName = name.replaceAll(' ', '').toLowerCase();
        if (evmChainId !== null) {
            return "".concat(types_2._CUSTOM_NETWORK_PREFIX).concat(chainType, "-").concat(parsedName, "-").concat(evmChainId);
        }
        else {
            var slug = "".concat(types_2._CUSTOM_NETWORK_PREFIX).concat(chainType, "-").concat(parsedName);
            if (paraId !== null) {
                slug = slug.concat("-".concat(paraId));
            }
            return slug;
        }
    };
    ChainService.prototype.validateCustomChain = function (provider, existingChainSlug) {
        return __awaiter(this, void 0, void 0, function () {
            var result, _a, providerConflictChainName, providerConflictChainSlug, providerError, api, connectionTimeout, connectionTrial, _api, chainSpec, existedChainInfo, _i, _b, chainInfo, _c, _d, chainInfo, e_1;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        result = {
                            decimals: 0,
                            existentialDeposit: '',
                            paraId: null,
                            symbol: '',
                            success: false,
                            genesisHash: '',
                            addressPrefix: '',
                            name: '',
                            evmChainId: null
                        };
                        _e.label = 1;
                    case 1:
                        _e.trys.push([1, 8, , 9]);
                        _a = this.validateProvider(provider, existingChainSlug), providerConflictChainName = _a.conflictChainName, providerConflictChainSlug = _a.conflictChainSlug, providerError = _a.error;
                        if (!(providerError === types_3._CHAIN_VALIDATION_ERROR.NONE)) return [3 /*break*/, 6];
                        api = void 0;
                        if (provider.startsWith('http')) {
                            // HTTP provider is EVM by default
                            api = this.evmChainHandler.initApi('custom', provider);
                        }
                        else {
                            api = this.substrateChainHandler.initApi('custom', provider);
                        }
                        connectionTimeout = new Promise(function (resolve) {
                            var id = setTimeout(function () {
                                clearTimeout(id);
                                resolve(null);
                            }, 5000);
                        });
                        return [4 /*yield*/, Promise.race([
                                connectionTimeout,
                                api.isReady
                            ])];
                    case 2:
                        connectionTrial = _e.sent();
                        if (!(connectionTrial !== null)) return [3 /*break*/, 4];
                        _api = connectionTrial;
                        return [4 /*yield*/, this.getChainSpecByProvider(_api)];
                    case 3:
                        chainSpec = _e.sent();
                        result = Object.assign(result, chainSpec);
                        if (existingChainSlug) {
                            existedChainInfo = this.getChainInfoByKey(existingChainSlug);
                            if (existedChainInfo.evmInfo !== null) {
                                if (result.evmChainId !== existedChainInfo.evmInfo.evmChainId) {
                                    result.error = types_3._CHAIN_VALIDATION_ERROR.PROVIDER_NOT_SAME_CHAIN;
                                }
                            }
                            else if (existedChainInfo.substrateInfo !== null) {
                                if (result.genesisHash !== existedChainInfo.substrateInfo.genesisHash) {
                                    result.error = types_3._CHAIN_VALIDATION_ERROR.PROVIDER_NOT_SAME_CHAIN;
                                }
                            }
                        }
                        else {
                            // check if network existed
                            if (result.evmChainId !== null) {
                                for (_i = 0, _b = Object.values(this.getChainInfoMap()); _i < _b.length; _i++) {
                                    chainInfo = _b[_i];
                                    if (chainInfo.evmInfo !== null && chainInfo.evmInfo.evmChainId === result.evmChainId) {
                                        result.error = types_3._CHAIN_VALIDATION_ERROR.EXISTED_CHAIN;
                                        result.conflictChainName = chainInfo.name;
                                        result.conflictChainSlug = chainInfo.slug;
                                        break;
                                    }
                                }
                            }
                            else if (result.genesisHash !== '') {
                                for (_c = 0, _d = Object.values(this.getChainInfoMap()); _c < _d.length; _c++) {
                                    chainInfo = _d[_c];
                                    if (chainInfo.substrateInfo !== null && chainInfo.substrateInfo.genesisHash === result.genesisHash) {
                                        result.error = types_3._CHAIN_VALIDATION_ERROR.EXISTED_CHAIN;
                                        result.conflictChainName = chainInfo.name;
                                        result.conflictChainSlug = chainInfo.slug;
                                        break;
                                    }
                                }
                            }
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        result.error = types_3._CHAIN_VALIDATION_ERROR.CONNECTION_FAILURE;
                        result.success = false;
                        _e.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        result.success = false;
                        result.error = providerError;
                        result.conflictChainName = providerConflictChainName;
                        result.conflictChainSlug = providerConflictChainSlug;
                        _e.label = 7;
                    case 7:
                        if (!result.error && (result.evmChainId !== null || result.genesisHash !== '')) {
                            result.success = true;
                        }
                        return [2 /*return*/, result];
                    case 8:
                        e_1 = _e.sent();
                        console.error('Error connecting to provider', e_1);
                        result.success = false;
                        result.error = types_3._CHAIN_VALIDATION_ERROR.CONNECTION_FAILURE;
                        return [2 /*return*/, result];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    ChainService.prototype.getChainSpecByProvider = function (api) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(api.api instanceof web3_1["default"])) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.evmChainHandler.getChainSpec(api)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2: return [4 /*yield*/, this.substrateChainHandler.getChainSpec(api)];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ChainService.prototype.validateProvider = function (targetProvider, existingChainSlug) {
        var error = types_3._CHAIN_VALIDATION_ERROR.NONE;
        var chainInfoMap = this.getChainInfoMap();
        var allExistedProviders = [];
        var conflictChainSlug = '';
        var conflictChainName = '';
        if (existingChainSlug) {
            var chainInfo = chainInfoMap[existingChainSlug];
            if (Object.values(chainInfo.providers).includes(targetProvider)) {
                error = types_3._CHAIN_VALIDATION_ERROR.EXISTED_CHAIN;
                conflictChainSlug = chainInfo.slug;
                conflictChainName = chainInfo.name;
            }
            return { error: error, conflictChainSlug: conflictChainSlug, conflictChainName: conflictChainName };
        }
        var _loop_1 = function (key, value) {
            Object.values(value.providers).forEach(function (provider) {
                allExistedProviders.push({ key: key, provider: provider });
            });
        };
        // get all providers
        for (var _i = 0, _a = Object.entries(chainInfoMap); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], value = _b[1];
            _loop_1(key, value);
        }
        for (var _c = 0, allExistedProviders_1 = allExistedProviders; _c < allExistedProviders_1.length; _c++) {
            var _d = allExistedProviders_1[_c], key = _d.key, provider = _d.provider;
            if (provider === targetProvider) {
                error = types_3._CHAIN_VALIDATION_ERROR.EXISTED_CHAIN;
                conflictChainSlug = key;
                conflictChainName = chainInfoMap[key].name;
                break;
            }
        }
        return { error: error, conflictChainSlug: conflictChainSlug, conflictChainName: conflictChainName };
    };
    ChainService.prototype.getSmartContractTokenInfo = function (contractAddress, tokenType, originChain, contractCaller) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (![types_1._AssetType.ERC721, types_1._AssetType.ERC20].includes(tokenType)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.evmChainHandler.getSmartContractTokenInfo(contractAddress, tokenType, originChain)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        if (![types_1._AssetType.PSP34, types_1._AssetType.PSP22].includes(tokenType)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.substrateChainHandler.getSmartContractTokenInfo(contractAddress, tokenType, originChain, contractCaller)];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4: return [2 /*return*/, {
                            decimals: -1,
                            name: '',
                            symbol: '',
                            contractError: false
                        }];
                }
            });
        });
    };
    ChainService.prototype.validateCustomToken = function (data) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var assetRegistry, isExist, _i, _b, token, contractAddress, _c, contractError, decimals, name, symbol;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        assetRegistry = this.getSmartContractTokens();
                        isExist = false;
                        for (_i = 0, _b = Object.values(assetRegistry); _i < _b.length; _i++) {
                            token = _b[_i];
                            contractAddress = (_a = token === null || token === void 0 ? void 0 : token.metadata) === null || _a === void 0 ? void 0 : _a.contractAddress;
                            if ((0, utils_1._isEqualContractAddress)(contractAddress, data.contractAddress) && token.assetType === data.type && token.originChain === data.originChain) {
                                isExist = true;
                                break;
                            }
                        }
                        if (isExist) {
                            return [2 /*return*/, {
                                    decimals: -1,
                                    name: '',
                                    symbol: '',
                                    isExist: isExist,
                                    contractError: false
                                }];
                        }
                        return [4 /*yield*/, this.getSmartContractTokenInfo(data.contractAddress, data.type, data.originChain, data.contractCaller)];
                    case 1:
                        _c = _d.sent(), contractError = _c.contractError, decimals = _c.decimals, name = _c.name, symbol = _c.symbol;
                        return [2 /*return*/, {
                                name: name,
                                decimals: decimals,
                                symbol: symbol,
                                isExist: isExist,
                                contractError: contractError
                            }];
                }
            });
        });
    };
    ChainService.prototype.generateSlugForToken = function (originChain, assetType, symbol, contractAddress) {
        return "".concat(originChain, "-").concat(assetType, "-").concat(symbol, "-").concat(contractAddress);
    };
    ChainService.prototype.upsertCustomToken = function (token) {
        var _a;
        if (token.slug.length === 0) { // new token
            token.slug = this.generateSlugForToken(token.originChain, token.assetType, token.symbol, (_a = token.metadata) === null || _a === void 0 ? void 0 : _a.contractAddress);
        }
        var assetRegistry = this.getAssetRegistry();
        assetRegistry[token.slug] = token;
        this.assetRegistrySubject.next(assetRegistry);
    };
    ChainService.prototype.deleteCustomTokens = function (targetTokens) {
        var assetRegistry = this.getAssetRegistry();
        targetTokens.forEach(function (targetToken) {
            delete assetRegistry[targetToken];
        });
        this.assetRegistrySubject.next(assetRegistry);
    };
    return ChainService;
}());
exports.ChainService = ChainService;
