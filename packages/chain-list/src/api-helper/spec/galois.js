"use strict";
// Copyright 2017-2022 @polkadot/apps-config authors & contributors
// SPDX-License-Identifier: Apache-2.0
exports.__esModule = true;
// structs need to be in order
/* eslint-disable sort-keys */
var definitions = {
    types: [
        {
            // on all versions
            minmax: [0, undefined],
            types: {
                Address: 'MultiAddress',
                LookupSource: 'MultiAddress',
                Balance: 'u128',
                RefCount: 'u32',
                Account: {
                    nonce: 'U256',
                    balance: 'U256'
                },
                AccountServiceEnum: {
                    _enum: {
                        Nickname: 'String',
                        Ethereum: 'H160'
                    }
                },
                MultiAddressDetails: {
                    nickname: 'AccountServiceEnum',
                    ethereum: 'AccountServiceEnum'
                },
                Nickname: 'String',
                Ethereum: 'H160',
                TransferAmountInfo: {
                    date: 'u64',
                    daily_info: 'Balance',
                    monthly_info: 'Balance',
                    yearly_info: 'Balance'
                },
                AccountLimit: {
                    daily_limit: 'Balance',
                    monthly_limit: 'Balance',
                    yearly_limit: 'Balance'
                },
                Keys: 'SessionKeys2'
            }
        }
    ]
};
exports["default"] = definitions;
