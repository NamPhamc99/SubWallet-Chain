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
                Rarity: {
                    _enum: [
                        'Common',
                        'Uncommon',
                        'Rare',
                        'Epic',
                        'Legendary',
                        'Relic'
                    ]
                },
                TokenId: 'U256',
                Stackable: {
                    _enum: [
                        'Silver',
                        'Gold',
                        'Diamond'
                    ]
                },
                String: 'Vec<u8>',
                TokenType: {
                    _enum: {
                        Basic: '(Rarity, String, u32, String)'
                    }
                },
                Status: {
                    _enum: [
                        'OnSell',
                        'InDelegation',
                        'Free'
                    ]
                },
                Token: {
                    token_id: 'TokenId',
                    token: 'TokenType'
                }
            }
        }
    ]
};
exports["default"] = definitions;
