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
exports.SubstrateChainHandler = exports.DOTSAMA_MAX_CONTINUE_RETRY = exports.DOTSAMA_AUTO_CONNECT_MS = exports.DEFAULT_AUX = void 0;
var api_1 = require("@acala-network/api");
var types_1 = require("@oak-foundation/types");
var api_2 = require("@polkadot/api");
var api_contract_1 = require("@polkadot/api-contract");
var substrate_connect_1 = require("@polkadot/rpc-provider/substrate-connect");
var create_1 = require("@polkadot/types/create");
var util_1 = require("@polkadot/util");
var logger_1 = require("@polkadot/util/logger");
var defaults_1 = require("@polkadot/util-crypto/address/defaults");
var types_2 = require("@subwallet/chain-list/types");
var index_1 = require("@subwallet/chain-service/helper/index");
var index_2 = require("@subwallet/chain-list/api-helper/index");
function getWellKnownChain(chain) {
    if (chain === void 0) { chain = 'polkadot'; }
    switch (chain) {
        case 'kusama':
            return substrate_connect_1.ScProvider.WellKnownChain.ksmcc3;
        case 'polkadot':
            return substrate_connect_1.ScProvider.WellKnownChain.polkadot;
        case 'rococo':
            return substrate_connect_1.ScProvider.WellKnownChain.rococo_v2_2;
        case 'westend':
            return substrate_connect_1.ScProvider.WellKnownChain.westend2;
        default:
            return chain;
    }
}
exports.DEFAULT_AUX = ['Aux1', 'Aux2', 'Aux3', 'Aux4', 'Aux5', 'Aux6', 'Aux7', 'Aux8', 'Aux9'];
exports.DOTSAMA_AUTO_CONNECT_MS = 3000;
exports.DOTSAMA_MAX_CONTINUE_RETRY = 2;
var SubstrateChainHandler = /** @class */ (function () {
    function SubstrateChainHandler() {
        this.substrateApiMap = {};
        this.logger = (0, logger_1.logger)('substrate-chain-handler');
        console.log(this.substrateApiMap);
    }
    SubstrateChainHandler.prototype.getSubstrateApiByChain = function (chainSlug) {
        return this.substrateApiMap[chainSlug];
    };
    SubstrateChainHandler.prototype.getChainSpec = function (substrateApi) {
        var _a, _b, _c, _d, _e;
        return __awaiter(this, void 0, void 0, function () {
            var result, _f, chainDecimals, chainTokens, _g, _h;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0:
                        result = {
                            addressPrefix: -1,
                            decimals: 0,
                            existentialDeposit: '',
                            genesisHash: (_a = substrateApi.api.genesisHash) === null || _a === void 0 ? void 0 : _a.toHex(),
                            name: '',
                            symbol: '',
                            paraId: null
                        };
                        _f = substrateApi.api.registry, chainDecimals = _f.chainDecimals, chainTokens = _f.chainTokens;
                        if (!substrateApi.api.query.parachainInfo) return [3 /*break*/, 2];
                        _g = result;
                        return [4 /*yield*/, substrateApi.api.query.parachainInfo.parachainId()];
                    case 1:
                        _g.paraId = (_j.sent()).toPrimitive();
                        _j.label = 2;
                    case 2:
                        // get first token by default, might change
                        _h = result;
                        return [4 /*yield*/, substrateApi.api.rpc.system.chain()];
                    case 3:
                        // get first token by default, might change
                        _h.name = (_j.sent()).toPrimitive();
                        result.symbol = chainTokens[0];
                        result.decimals = chainDecimals[0];
                        result.addressPrefix = (_e = (_d = (_c = (_b = substrateApi.api) === null || _b === void 0 ? void 0 : _b.consts) === null || _c === void 0 ? void 0 : _c.system) === null || _d === void 0 ? void 0 : _d.ss58Prefix) === null || _e === void 0 ? void 0 : _e.toPrimitive();
                        result.existentialDeposit = substrateApi.api.consts.balances.existentialDeposit.toString();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    SubstrateChainHandler.prototype.getSmartContractTokenInfo = function (contractAddress, tokenType, originChain, contractCaller) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function () {
            var tokenContract, name, decimals, symbol, contractError, substrateApi, _e, nameResp, symbolResp, decimalsResp, collectionIdResp, collectionIdDict, e_1;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        name = '';
                        decimals = -1;
                        symbol = '';
                        contractError = false;
                        substrateApi = this.getSubstrateApiByChain(originChain);
                        _f.label = 1;
                    case 1:
                        _f.trys.push([1, 6, , 7]);
                        if (!(tokenType === types_2._AssetType.PSP22)) return [3 /*break*/, 3];
                        tokenContract = new api_contract_1.ContractPromise(substrateApi.api, index_1._PSP22_ABI, contractAddress);
                        return [4 /*yield*/, Promise.all([
                                tokenContract.query['psp22Metadata::tokenName'](contractCaller || contractAddress, { gasLimit: -1 }),
                                tokenContract.query['psp22Metadata::tokenSymbol'](contractCaller || contractAddress, { gasLimit: -1 }),
                                tokenContract.query['psp22Metadata::tokenDecimals'](contractCaller || contractAddress, { gasLimit: -1 })
                            ])];
                    case 2:
                        _e = _f.sent(), nameResp = _e[0], symbolResp = _e[1], decimalsResp = _e[2];
                        if (!(nameResp.result.isOk && symbolResp.result.isOk && decimalsResp.result.isOk) || !nameResp.output || !decimalsResp.output || !symbolResp.output) {
                            this.logger.error('Error response while validating WASM contract');
                            return [2 /*return*/, {
                                    name: '',
                                    decimals: -1,
                                    symbol: '',
                                    contractError: true
                                }];
                        }
                        else {
                            name = (_a = symbolResp.output) === null || _a === void 0 ? void 0 : _a.toHuman();
                            decimals = parseInt((_b = decimalsResp.output) === null || _b === void 0 ? void 0 : _b.toHuman());
                            symbol = (_c = symbolResp.output) === null || _c === void 0 ? void 0 : _c.toHuman();
                            if (name === '' || symbol === '') {
                                contractError = true;
                            }
                        }
                        return [3 /*break*/, 5];
                    case 3:
                        tokenContract = new api_contract_1.ContractPromise(substrateApi.api, index_1._PSP34_ABI, contractAddress);
                        return [4 /*yield*/, tokenContract.query['psp34::collectionId'](contractCaller || contractAddress, { gasLimit: -1 })];
                    case 4:
                        collectionIdResp = _f.sent();
                        if (!collectionIdResp.result.isOk || !collectionIdResp.output) {
                            this.logger.error('Error response while validating WASM contract');
                            return [2 /*return*/, {
                                    name: '',
                                    decimals: -1,
                                    symbol: '',
                                    contractError: true
                                }];
                        }
                        else {
                            collectionIdDict = (_d = collectionIdResp.output) === null || _d === void 0 ? void 0 : _d.toHuman();
                            if (collectionIdDict.Bytes === '') {
                                contractError = true;
                            }
                            else {
                                name = ''; // no function to get collection name, let user manually put in the name
                            }
                        }
                        _f.label = 5;
                    case 5: return [2 /*return*/, {
                            name: name,
                            decimals: decimals,
                            symbol: symbol,
                            contractError: contractError
                        }];
                    case 6:
                        e_1 = _f.sent();
                        this.logger.error('Error validating WASM contract', e_1);
                        return [2 /*return*/, {
                                name: '',
                                decimals: -1,
                                symbol: '',
                                contractError: true
                            }];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    SubstrateChainHandler.prototype.initApi = function (chainSlug, apiUrl) {
        var _this = this;
        var registry = new create_1.TypeRegistry();
        var provider = apiUrl.startsWith('light://')
            ? new substrate_connect_1.ScProvider(getWellKnownChain(apiUrl.replace('light://substrate-connect/', '')))
            : new api_2.WsProvider(apiUrl, exports.DOTSAMA_AUTO_CONNECT_MS);
        var apiOption = { provider: provider, typesBundle: index_2.typesBundle, typesChain: index_2.typesChain };
        // @ts-ignore
        apiOption.registry = registry;
        var api;
        if (['acala', 'karura', 'origintrail', 'kintsugi'].includes(chainSlug)) {
            api = new api_2.ApiPromise((0, api_1.options)({ provider: provider }));
        }
        else if (['turingStaging', 'turing'].includes(chainSlug)) {
            api = new api_2.ApiPromise({
                provider: provider,
                rpc: types_1.rpc,
                types: types_1.types
            });
        }
        else {
            api = new api_2.ApiPromise(apiOption);
        }
        var substrateApi = ({
            api: api,
            chainSlug: chainSlug,
            apiUrl: apiUrl,
            apiError: undefined,
            apiRetry: 0,
            isApiReady: false,
            isApiReadyOnce: false,
            isApiConnected: false,
            isApiInitialized: true,
            registry: registry,
            specName: '',
            specVersion: '',
            systemChain: '',
            systemName: '',
            systemVersion: '',
            apiDefaultTx: undefined,
            apiDefaultTxSudo: undefined,
            defaultFormatBalance: undefined,
            recoverConnect: function () {
                substrateApi.apiRetry = 0;
                _this.logger.log('Recover connect to ', apiUrl);
                provider.connect().then(console.log)["catch"](console.error);
            },
            get isReady() {
                var self = this;
                function f() {
                    return __awaiter(this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!!substrateApi.isApiReadyOnce) return [3 /*break*/, 2];
                                    return [4 /*yield*/, self.api.isReady];
                                case 1:
                                    _a.sent();
                                    _a.label = 2;
                                case 2: return [2 /*return*/, new Promise(function (resolve, reject) {
                                        (function wait() {
                                            if (self.isApiReady) {
                                                return resolve(self);
                                            }
                                            setTimeout(wait, 10);
                                        })();
                                    })];
                            }
                        });
                    });
                }
                return f();
            }
        });
        api.on('connected', function () {
            _this.logger.log('Substrate API connected to ', apiUrl);
            substrateApi.apiRetry = 0;
            if (substrateApi.isApiReadyOnce) {
                substrateApi.isApiReady = true;
            }
            substrateApi.isApiConnected = true;
        });
        api.on('disconnected', function () {
            substrateApi.isApiConnected = false;
            substrateApi.isApiReady = false;
            substrateApi.apiRetry = (substrateApi.apiRetry || 0) + 1;
            _this.logger.log("Substrate API disconnected from ".concat(JSON.stringify(apiUrl), " ").concat(JSON.stringify(substrateApi.apiRetry), " times"));
            if (substrateApi.apiRetry > exports.DOTSAMA_MAX_CONTINUE_RETRY) {
                console.log("Disconnect from provider ".concat(JSON.stringify(apiUrl), " because retry maxed out"));
                provider.disconnect()
                    .then(_this.logger.log)["catch"](_this.logger.error);
            }
        });
        api.on('ready', function () {
            _this.logger.log('Substrate API ready with', apiUrl);
            _this.loadOnReady(registry, api)
                .then(function (rs) {
                (0, util_1.objectSpread)(substrateApi, rs);
            })["catch"](function (error) {
                substrateApi.apiError = error.message;
            });
        });
        return substrateApi;
    };
    SubstrateChainHandler.prototype.getChainMetadata = function (registry, api) {
        var _a, _b, _c, _d, _e;
        return __awaiter(this, void 0, void 0, function () {
            var _f, systemChain, systemChainType, systemName, systemVersion;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0: return [4 /*yield*/, Promise.all([
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
                            (_a = api.rpc.system) === null || _a === void 0 ? void 0 : _a.chain(),
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                            ((_b = api.rpc.system) === null || _b === void 0 ? void 0 : _b.chainType)
                                // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
                                ? (_c = api.rpc.system) === null || _c === void 0 ? void 0 : _c.chainType()
                                : Promise.resolve(registry.createType('ChainType', 'Live')),
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
                            (_d = api.rpc.system) === null || _d === void 0 ? void 0 : _d.name(),
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
                            (_e = api.rpc.system) === null || _e === void 0 ? void 0 : _e.version()
                        ])];
                    case 1:
                        _f = _g.sent(), systemChain = _f[0], systemChainType = _f[1], systemName = _f[2], systemVersion = _f[3];
                        return [2 /*return*/, {
                                // @ts-ignore
                                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                                properties: registry.createType('ChainProperties', { ss58Format: api.registry.chainSS58, tokenDecimals: api.registry.chainDecimals, tokenSymbol: api.registry.chainTokens }),
                                // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
                                systemChain: (systemChain || '<unknown>').toString(),
                                // @ts-ignore
                                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                                systemChainType: systemChainType,
                                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
                                systemName: systemName.toString(),
                                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
                                systemVersion: systemVersion.toString()
                            }];
                }
            });
        });
    };
    SubstrateChainHandler.prototype.loadOnReady = function (registry, api) {
        return __awaiter(this, void 0, void 0, function () {
            var DEFAULT_DECIMALS, DEFAULT_SS58, _a, properties, systemChain, systemChainType, systemName, systemVersion, ss58Format, tokenSymbol, tokenDecimals, isDevelopment, defaultFormatBalance, defaultSection, defaultMethod, apiDefaultTx, apiDefaultTxSudo;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        DEFAULT_DECIMALS = registry.createType('u32', 12);
                        DEFAULT_SS58 = registry.createType('u32', defaults_1.defaults.prefix);
                        return [4 /*yield*/, this.getChainMetadata(registry, api)];
                    case 1:
                        _a = _b.sent(), properties = _a.properties, systemChain = _a.systemChain, systemChainType = _a.systemChainType, systemName = _a.systemName, systemVersion = _a.systemVersion;
                        ss58Format = properties.ss58Format.unwrapOr(DEFAULT_SS58).toNumber();
                        tokenSymbol = properties.tokenSymbol.unwrapOr(__spreadArray([util_1.formatBalance.getDefaults().unit], exports.DEFAULT_AUX, true));
                        tokenDecimals = properties.tokenDecimals.unwrapOr([DEFAULT_DECIMALS]);
                        isDevelopment = (systemChainType.isDevelopment || systemChainType.isLocal || (0, util_1.isTestChain)(systemChain));
                        this.logger.log("chain: ".concat(systemChain, " (").concat(systemChainType.toString(), "), ").concat((0, util_1.stringify)(properties)));
                        // explicitly override the ss58Format as specified
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        registry.setChainProperties(registry.createType('ChainProperties', { ss58Format: ss58Format, tokenDecimals: tokenDecimals, tokenSymbol: tokenSymbol }));
                        defaultFormatBalance = {
                            decimals: tokenDecimals.map(function (b) { return b.toNumber(); }),
                            unit: tokenSymbol[0].toString()
                        };
                        defaultSection = Object.keys(api.tx)[0];
                        defaultMethod = Object.keys(api.tx[defaultSection])[0];
                        apiDefaultTx = api.tx[defaultSection][defaultMethod];
                        apiDefaultTxSudo = (api.tx.system && api.tx.system.setCode) || apiDefaultTx;
                        return [2 /*return*/, {
                                defaultFormatBalance: defaultFormatBalance,
                                registry: registry,
                                apiDefaultTx: apiDefaultTx,
                                apiDefaultTxSudo: apiDefaultTxSudo,
                                isApiReady: true,
                                isApiReadyOnce: true,
                                isDevelopment: isDevelopment,
                                specName: api.runtimeVersion.specName.toString(),
                                specVersion: api.runtimeVersion.specVersion.toString(),
                                systemChain: systemChain,
                                systemName: systemName,
                                systemVersion: systemVersion
                            }];
                }
            });
        });
    };
    return SubstrateChainHandler;
}());
exports.SubstrateChainHandler = SubstrateChainHandler;
