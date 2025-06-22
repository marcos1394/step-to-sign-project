/** An IntrospectionQuery representation of your schema.
 *
 * @remarks
 * This is an introspection of your schema saved as a file by GraphQLSP.
 * You may import it to create a `graphql()` tag function with `gql.tada`
 * by importing it and passing it to `initGraphQLTada<>()`.
 *
 * @example
 * ```
 * import { initGraphQLTada } from 'gql.tada';
 * import type { introspection } from './introspection';
 *
 * export const graphql = initGraphQLTada<{
 *   introspection: typeof introspection;
 *   scalars: {
 *     DateTime: string;
 *     Json: any;
 *   };
 * }>();
 * ```
 */
declare const introspection: {
    readonly __schema: {
        readonly queryType: {
            readonly name: "Query";
        };
        readonly mutationType: {
            readonly name: "Mutation";
        };
        readonly subscriptionType: null;
        readonly types: readonly [{
            readonly kind: "OBJECT";
            readonly name: "ActiveJwk";
            readonly fields: readonly [{
                readonly name: "alg";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "e";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "epoch";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "Epoch";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "iss";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "kid";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "kty";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "n";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "ActiveJwkConnection";
            readonly fields: readonly [{
                readonly name: "edges";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "LIST";
                        readonly ofType: {
                            readonly kind: "NON_NULL";
                            readonly ofType: {
                                readonly kind: "OBJECT";
                                readonly name: "ActiveJwkEdge";
                            };
                        };
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "nodes";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "LIST";
                        readonly ofType: {
                            readonly kind: "NON_NULL";
                            readonly ofType: {
                                readonly kind: "OBJECT";
                                readonly name: "ActiveJwk";
                            };
                        };
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "pageInfo";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "PageInfo";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "ActiveJwkEdge";
            readonly fields: readonly [{
                readonly name: "cursor";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "node";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "ActiveJwk";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "Address";
            readonly fields: readonly [{
                readonly name: "address";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "SuiAddress";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "balance";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "Balance";
                };
                readonly args: readonly [{
                    readonly name: "type";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "balances";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "BalanceConnection";
                    };
                };
                readonly args: readonly [{
                    readonly name: "after";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "before";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "first";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "last";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "coins";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "CoinConnection";
                    };
                };
                readonly args: readonly [{
                    readonly name: "after";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "before";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "first";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "last";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "type";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "defaultSuinsName";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "String";
                };
                readonly args: readonly [{
                    readonly name: "format";
                    readonly type: {
                        readonly kind: "ENUM";
                        readonly name: "DomainFormat";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "objects";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "MoveObjectConnection";
                    };
                };
                readonly args: readonly [{
                    readonly name: "after";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "before";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "filter";
                    readonly type: {
                        readonly kind: "INPUT_OBJECT";
                        readonly name: "ObjectFilter";
                    };
                }, {
                    readonly name: "first";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "last";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "stakedSuis";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "StakedSuiConnection";
                    };
                };
                readonly args: readonly [{
                    readonly name: "after";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "before";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "first";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "last";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "suinsRegistrations";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "SuinsRegistrationConnection";
                    };
                };
                readonly args: readonly [{
                    readonly name: "after";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "before";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "first";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "last";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "transactionBlocks";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "TransactionBlockConnection";
                    };
                };
                readonly args: readonly [{
                    readonly name: "after";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "before";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "filter";
                    readonly type: {
                        readonly kind: "INPUT_OBJECT";
                        readonly name: "TransactionBlockFilter";
                    };
                }, {
                    readonly name: "first";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "last";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "relation";
                    readonly type: {
                        readonly kind: "ENUM";
                        readonly name: "AddressTransactionBlockRelationship";
                    };
                }, {
                    readonly name: "scanLimit";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [{
                readonly kind: "INTERFACE";
                readonly name: "IOwner";
            }];
        }, {
            readonly kind: "OBJECT";
            readonly name: "AddressConnection";
            readonly fields: readonly [{
                readonly name: "edges";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "LIST";
                        readonly ofType: {
                            readonly kind: "NON_NULL";
                            readonly ofType: {
                                readonly kind: "OBJECT";
                                readonly name: "AddressEdge";
                            };
                        };
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "nodes";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "LIST";
                        readonly ofType: {
                            readonly kind: "NON_NULL";
                            readonly ofType: {
                                readonly kind: "OBJECT";
                                readonly name: "Address";
                            };
                        };
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "pageInfo";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "PageInfo";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "AddressEdge";
            readonly fields: readonly [{
                readonly name: "cursor";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "node";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "Address";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "AddressOwner";
            readonly fields: readonly [{
                readonly name: "owner";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "Owner";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "ENUM";
            readonly name: "AddressTransactionBlockRelationship";
            readonly enumValues: readonly [{
                readonly name: "SENT";
                readonly isDeprecated: false;
            }, {
                readonly name: "AFFECTED";
                readonly isDeprecated: false;
            }];
        }, {
            readonly kind: "UNION";
            readonly name: "Authenticator";
            readonly possibleTypes: readonly [{
                readonly kind: "OBJECT";
                readonly name: "Address";
            }];
        }, {
            readonly kind: "OBJECT";
            readonly name: "AuthenticatorStateCreateTransaction";
            readonly fields: readonly [{
                readonly name: "_";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "Boolean";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "AuthenticatorStateExpireTransaction";
            readonly fields: readonly [{
                readonly name: "authenticatorObjInitialSharedVersion";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "UInt53";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "minEpoch";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "Epoch";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "AuthenticatorStateUpdateTransaction";
            readonly fields: readonly [{
                readonly name: "authenticatorObjInitialSharedVersion";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "UInt53";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "epoch";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "Epoch";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "newActiveJwks";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "ActiveJwkConnection";
                    };
                };
                readonly args: readonly [{
                    readonly name: "after";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "before";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "first";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "last";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "round";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "UInt53";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "AvailableRange";
            readonly fields: readonly [{
                readonly name: "first";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "Checkpoint";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "last";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "Checkpoint";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "Balance";
            readonly fields: readonly [{
                readonly name: "coinObjectCount";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "UInt53";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "coinType";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "MoveType";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "totalBalance";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "BigInt";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "BalanceChange";
            readonly fields: readonly [{
                readonly name: "amount";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "BigInt";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "coinType";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "MoveType";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "owner";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "Owner";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "BalanceChangeConnection";
            readonly fields: readonly [{
                readonly name: "edges";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "LIST";
                        readonly ofType: {
                            readonly kind: "NON_NULL";
                            readonly ofType: {
                                readonly kind: "OBJECT";
                                readonly name: "BalanceChangeEdge";
                            };
                        };
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "nodes";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "LIST";
                        readonly ofType: {
                            readonly kind: "NON_NULL";
                            readonly ofType: {
                                readonly kind: "OBJECT";
                                readonly name: "BalanceChange";
                            };
                        };
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "pageInfo";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "PageInfo";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "BalanceChangeEdge";
            readonly fields: readonly [{
                readonly name: "cursor";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "node";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "BalanceChange";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "BalanceConnection";
            readonly fields: readonly [{
                readonly name: "edges";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "LIST";
                        readonly ofType: {
                            readonly kind: "NON_NULL";
                            readonly ofType: {
                                readonly kind: "OBJECT";
                                readonly name: "BalanceEdge";
                            };
                        };
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "nodes";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "LIST";
                        readonly ofType: {
                            readonly kind: "NON_NULL";
                            readonly ofType: {
                                readonly kind: "OBJECT";
                                readonly name: "Balance";
                            };
                        };
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "pageInfo";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "PageInfo";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "BalanceEdge";
            readonly fields: readonly [{
                readonly name: "cursor";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "node";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "Balance";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "SCALAR";
            readonly name: "Base64";
        }, {
            readonly kind: "SCALAR";
            readonly name: "BigInt";
        }, {
            readonly kind: "SCALAR";
            readonly name: "Boolean";
        }, {
            readonly kind: "OBJECT";
            readonly name: "BridgeCommitteeInitTransaction";
            readonly fields: readonly [{
                readonly name: "bridgeObjInitialSharedVersion";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "UInt53";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "BridgeStateCreateTransaction";
            readonly fields: readonly [{
                readonly name: "chainId";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "ChangeEpochTransaction";
            readonly fields: readonly [{
                readonly name: "computationCharge";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "BigInt";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "epoch";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "Epoch";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "nonRefundableStorageFee";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "BigInt";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "protocolVersion";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "UInt53";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "startTimestamp";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "DateTime";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "storageCharge";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "BigInt";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "storageRebate";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "BigInt";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "systemPackages";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "MovePackageConnection";
                    };
                };
                readonly args: readonly [{
                    readonly name: "after";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "before";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "first";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "last";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "Checkpoint";
            readonly fields: readonly [{
                readonly name: "bcs";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "Base64";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "digest";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "epoch";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "Epoch";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "networkTotalTransactions";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "UInt53";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "previousCheckpointDigest";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "String";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "rollingGasSummary";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "GasCostSummary";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "sequenceNumber";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "UInt53";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "timestamp";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "DateTime";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "transactionBlocks";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "TransactionBlockConnection";
                    };
                };
                readonly args: readonly [{
                    readonly name: "after";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "before";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "filter";
                    readonly type: {
                        readonly kind: "INPUT_OBJECT";
                        readonly name: "TransactionBlockFilter";
                    };
                }, {
                    readonly name: "first";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "last";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "scanLimit";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "validatorSignatures";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "Base64";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "CheckpointConnection";
            readonly fields: readonly [{
                readonly name: "edges";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "LIST";
                        readonly ofType: {
                            readonly kind: "NON_NULL";
                            readonly ofType: {
                                readonly kind: "OBJECT";
                                readonly name: "CheckpointEdge";
                            };
                        };
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "nodes";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "LIST";
                        readonly ofType: {
                            readonly kind: "NON_NULL";
                            readonly ofType: {
                                readonly kind: "OBJECT";
                                readonly name: "Checkpoint";
                            };
                        };
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "pageInfo";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "PageInfo";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "CheckpointEdge";
            readonly fields: readonly [{
                readonly name: "cursor";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "node";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "Checkpoint";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "INPUT_OBJECT";
            readonly name: "CheckpointId";
            readonly inputFields: readonly [{
                readonly name: "digest";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "String";
                };
            }, {
                readonly name: "sequenceNumber";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "UInt53";
                };
            }];
            readonly isOneOf: false;
        }, {
            readonly kind: "OBJECT";
            readonly name: "Coin";
            readonly fields: readonly [{
                readonly name: "address";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "SuiAddress";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "balance";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "Balance";
                };
                readonly args: readonly [{
                    readonly name: "type";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "balances";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "BalanceConnection";
                    };
                };
                readonly args: readonly [{
                    readonly name: "after";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "before";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "first";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "last";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "bcs";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "Base64";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "coinBalance";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "BigInt";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "coins";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "CoinConnection";
                    };
                };
                readonly args: readonly [{
                    readonly name: "after";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "before";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "first";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "last";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "type";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "contents";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "MoveValue";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "defaultSuinsName";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "String";
                };
                readonly args: readonly [{
                    readonly name: "format";
                    readonly type: {
                        readonly kind: "ENUM";
                        readonly name: "DomainFormat";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "digest";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "String";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "display";
                readonly type: {
                    readonly kind: "LIST";
                    readonly ofType: {
                        readonly kind: "NON_NULL";
                        readonly ofType: {
                            readonly kind: "OBJECT";
                            readonly name: "DisplayEntry";
                        };
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "dynamicField";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "DynamicField";
                };
                readonly args: readonly [{
                    readonly name: "name";
                    readonly type: {
                        readonly kind: "NON_NULL";
                        readonly ofType: {
                            readonly kind: "INPUT_OBJECT";
                            readonly name: "DynamicFieldName";
                        };
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "dynamicFields";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "DynamicFieldConnection";
                    };
                };
                readonly args: readonly [{
                    readonly name: "after";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "before";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "first";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "last";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "dynamicObjectField";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "DynamicField";
                };
                readonly args: readonly [{
                    readonly name: "name";
                    readonly type: {
                        readonly kind: "NON_NULL";
                        readonly ofType: {
                            readonly kind: "INPUT_OBJECT";
                            readonly name: "DynamicFieldName";
                        };
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "hasPublicTransfer";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "Boolean";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "objects";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "MoveObjectConnection";
                    };
                };
                readonly args: readonly [{
                    readonly name: "after";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "before";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "filter";
                    readonly type: {
                        readonly kind: "INPUT_OBJECT";
                        readonly name: "ObjectFilter";
                    };
                }, {
                    readonly name: "first";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "last";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "owner";
                readonly type: {
                    readonly kind: "UNION";
                    readonly name: "ObjectOwner";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "previousTransactionBlock";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "TransactionBlock";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "receivedTransactionBlocks";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "TransactionBlockConnection";
                    };
                };
                readonly args: readonly [{
                    readonly name: "after";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "before";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "filter";
                    readonly type: {
                        readonly kind: "INPUT_OBJECT";
                        readonly name: "TransactionBlockFilter";
                    };
                }, {
                    readonly name: "first";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "last";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "scanLimit";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "stakedSuis";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "StakedSuiConnection";
                    };
                };
                readonly args: readonly [{
                    readonly name: "after";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "before";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "first";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "last";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "status";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "ENUM";
                        readonly name: "ObjectKind";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "storageRebate";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "BigInt";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "suinsRegistrations";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "SuinsRegistrationConnection";
                    };
                };
                readonly args: readonly [{
                    readonly name: "after";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "before";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "first";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "last";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "version";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "UInt53";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [{
                readonly kind: "INTERFACE";
                readonly name: "IMoveObject";
            }, {
                readonly kind: "INTERFACE";
                readonly name: "IObject";
            }, {
                readonly kind: "INTERFACE";
                readonly name: "IOwner";
            }];
        }, {
            readonly kind: "OBJECT";
            readonly name: "CoinConnection";
            readonly fields: readonly [{
                readonly name: "edges";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "LIST";
                        readonly ofType: {
                            readonly kind: "NON_NULL";
                            readonly ofType: {
                                readonly kind: "OBJECT";
                                readonly name: "CoinEdge";
                            };
                        };
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "nodes";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "LIST";
                        readonly ofType: {
                            readonly kind: "NON_NULL";
                            readonly ofType: {
                                readonly kind: "OBJECT";
                                readonly name: "Coin";
                            };
                        };
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "pageInfo";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "PageInfo";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "CoinDenyListStateCreateTransaction";
            readonly fields: readonly [{
                readonly name: "_";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "Boolean";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "CoinEdge";
            readonly fields: readonly [{
                readonly name: "cursor";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "node";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "Coin";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "CoinMetadata";
            readonly fields: readonly [{
                readonly name: "address";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "SuiAddress";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "balance";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "Balance";
                };
                readonly args: readonly [{
                    readonly name: "type";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "balances";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "BalanceConnection";
                    };
                };
                readonly args: readonly [{
                    readonly name: "after";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "before";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "first";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "last";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "bcs";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "Base64";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "coins";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "CoinConnection";
                    };
                };
                readonly args: readonly [{
                    readonly name: "after";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "before";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "first";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "last";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "type";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "contents";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "MoveValue";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "decimals";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "Int";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "defaultSuinsName";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "String";
                };
                readonly args: readonly [{
                    readonly name: "format";
                    readonly type: {
                        readonly kind: "ENUM";
                        readonly name: "DomainFormat";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "description";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "String";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "digest";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "String";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "display";
                readonly type: {
                    readonly kind: "LIST";
                    readonly ofType: {
                        readonly kind: "NON_NULL";
                        readonly ofType: {
                            readonly kind: "OBJECT";
                            readonly name: "DisplayEntry";
                        };
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "dynamicField";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "DynamicField";
                };
                readonly args: readonly [{
                    readonly name: "name";
                    readonly type: {
                        readonly kind: "NON_NULL";
                        readonly ofType: {
                            readonly kind: "INPUT_OBJECT";
                            readonly name: "DynamicFieldName";
                        };
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "dynamicFields";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "DynamicFieldConnection";
                    };
                };
                readonly args: readonly [{
                    readonly name: "after";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "before";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "first";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "last";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "dynamicObjectField";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "DynamicField";
                };
                readonly args: readonly [{
                    readonly name: "name";
                    readonly type: {
                        readonly kind: "NON_NULL";
                        readonly ofType: {
                            readonly kind: "INPUT_OBJECT";
                            readonly name: "DynamicFieldName";
                        };
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "hasPublicTransfer";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "Boolean";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "iconUrl";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "String";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "name";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "String";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "objects";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "MoveObjectConnection";
                    };
                };
                readonly args: readonly [{
                    readonly name: "after";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "before";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "filter";
                    readonly type: {
                        readonly kind: "INPUT_OBJECT";
                        readonly name: "ObjectFilter";
                    };
                }, {
                    readonly name: "first";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "last";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "owner";
                readonly type: {
                    readonly kind: "UNION";
                    readonly name: "ObjectOwner";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "previousTransactionBlock";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "TransactionBlock";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "receivedTransactionBlocks";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "TransactionBlockConnection";
                    };
                };
                readonly args: readonly [{
                    readonly name: "after";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "before";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "filter";
                    readonly type: {
                        readonly kind: "INPUT_OBJECT";
                        readonly name: "TransactionBlockFilter";
                    };
                }, {
                    readonly name: "first";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "last";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "scanLimit";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "stakedSuis";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "StakedSuiConnection";
                    };
                };
                readonly args: readonly [{
                    readonly name: "after";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "before";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "first";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "last";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "status";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "ENUM";
                        readonly name: "ObjectKind";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "storageRebate";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "BigInt";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "suinsRegistrations";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "SuinsRegistrationConnection";
                    };
                };
                readonly args: readonly [{
                    readonly name: "after";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "before";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "first";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "last";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "supply";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "BigInt";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "symbol";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "String";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "version";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "UInt53";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [{
                readonly kind: "INTERFACE";
                readonly name: "IMoveObject";
            }, {
                readonly kind: "INTERFACE";
                readonly name: "IObject";
            }, {
                readonly kind: "INTERFACE";
                readonly name: "IOwner";
            }];
        }, {
            readonly kind: "OBJECT";
            readonly name: "ConsensusCommitPrologueTransaction";
            readonly fields: readonly [{
                readonly name: "commitTimestamp";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "DateTime";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "consensusCommitDigest";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "String";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "epoch";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "Epoch";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "round";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "UInt53";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "ConsensusV2";
            readonly fields: readonly [{
                readonly name: "authenticator";
                readonly type: {
                    readonly kind: "UNION";
                    readonly name: "Authenticator";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "startVersion";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "UInt53";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "SCALAR";
            readonly name: "DateTime";
        }, {
            readonly kind: "OBJECT";
            readonly name: "DependencyConnection";
            readonly fields: readonly [{
                readonly name: "edges";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "LIST";
                        readonly ofType: {
                            readonly kind: "NON_NULL";
                            readonly ofType: {
                                readonly kind: "OBJECT";
                                readonly name: "DependencyEdge";
                            };
                        };
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "nodes";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "LIST";
                        readonly ofType: {
                            readonly kind: "NON_NULL";
                            readonly ofType: {
                                readonly kind: "OBJECT";
                                readonly name: "TransactionBlock";
                            };
                        };
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "pageInfo";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "PageInfo";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "DependencyEdge";
            readonly fields: readonly [{
                readonly name: "cursor";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "node";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "TransactionBlock";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "DisplayEntry";
            readonly fields: readonly [{
                readonly name: "error";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "String";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "key";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "value";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "String";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "ENUM";
            readonly name: "DomainFormat";
            readonly enumValues: readonly [{
                readonly name: "AT";
                readonly isDeprecated: false;
            }, {
                readonly name: "DOT";
                readonly isDeprecated: false;
            }];
        }, {
            readonly kind: "OBJECT";
            readonly name: "DryRunEffect";
            readonly fields: readonly [{
                readonly name: "mutatedReferences";
                readonly type: {
                    readonly kind: "LIST";
                    readonly ofType: {
                        readonly kind: "NON_NULL";
                        readonly ofType: {
                            readonly kind: "OBJECT";
                            readonly name: "DryRunMutation";
                        };
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "returnValues";
                readonly type: {
                    readonly kind: "LIST";
                    readonly ofType: {
                        readonly kind: "NON_NULL";
                        readonly ofType: {
                            readonly kind: "OBJECT";
                            readonly name: "DryRunReturn";
                        };
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "DryRunMutation";
            readonly fields: readonly [{
                readonly name: "bcs";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "Base64";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "input";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "UNION";
                        readonly name: "TransactionArgument";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "type";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "MoveType";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "DryRunResult";
            readonly fields: readonly [{
                readonly name: "error";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "String";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "results";
                readonly type: {
                    readonly kind: "LIST";
                    readonly ofType: {
                        readonly kind: "NON_NULL";
                        readonly ofType: {
                            readonly kind: "OBJECT";
                            readonly name: "DryRunEffect";
                        };
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "transaction";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "TransactionBlock";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "DryRunReturn";
            readonly fields: readonly [{
                readonly name: "bcs";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "Base64";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "type";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "MoveType";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "DynamicField";
            readonly fields: readonly [{
                readonly name: "name";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "MoveValue";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "value";
                readonly type: {
                    readonly kind: "UNION";
                    readonly name: "DynamicFieldValue";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "DynamicFieldConnection";
            readonly fields: readonly [{
                readonly name: "edges";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "LIST";
                        readonly ofType: {
                            readonly kind: "NON_NULL";
                            readonly ofType: {
                                readonly kind: "OBJECT";
                                readonly name: "DynamicFieldEdge";
                            };
                        };
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "nodes";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "LIST";
                        readonly ofType: {
                            readonly kind: "NON_NULL";
                            readonly ofType: {
                                readonly kind: "OBJECT";
                                readonly name: "DynamicField";
                            };
                        };
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "pageInfo";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "PageInfo";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "DynamicFieldEdge";
            readonly fields: readonly [{
                readonly name: "cursor";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "node";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "DynamicField";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "INPUT_OBJECT";
            readonly name: "DynamicFieldName";
            readonly inputFields: readonly [{
                readonly name: "type";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                };
            }, {
                readonly name: "bcs";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "Base64";
                    };
                };
            }];
            readonly isOneOf: false;
        }, {
            readonly kind: "UNION";
            readonly name: "DynamicFieldValue";
            readonly possibleTypes: readonly [{
                readonly kind: "OBJECT";
                readonly name: "MoveObject";
            }, {
                readonly kind: "OBJECT";
                readonly name: "MoveValue";
            }];
        }, {
            readonly kind: "OBJECT";
            readonly name: "EndOfEpochTransaction";
            readonly fields: readonly [{
                readonly name: "transactions";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "EndOfEpochTransactionKindConnection";
                    };
                };
                readonly args: readonly [{
                    readonly name: "after";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "before";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "first";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "last";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "UNION";
            readonly name: "EndOfEpochTransactionKind";
            readonly possibleTypes: readonly [{
                readonly kind: "OBJECT";
                readonly name: "AuthenticatorStateCreateTransaction";
            }, {
                readonly kind: "OBJECT";
                readonly name: "AuthenticatorStateExpireTransaction";
            }, {
                readonly kind: "OBJECT";
                readonly name: "BridgeCommitteeInitTransaction";
            }, {
                readonly kind: "OBJECT";
                readonly name: "BridgeStateCreateTransaction";
            }, {
                readonly kind: "OBJECT";
                readonly name: "ChangeEpochTransaction";
            }, {
                readonly kind: "OBJECT";
                readonly name: "CoinDenyListStateCreateTransaction";
            }, {
                readonly kind: "OBJECT";
                readonly name: "RandomnessStateCreateTransaction";
            }, {
                readonly kind: "OBJECT";
                readonly name: "StoreExecutionTimeObservationsTransaction";
            }];
        }, {
            readonly kind: "OBJECT";
            readonly name: "EndOfEpochTransactionKindConnection";
            readonly fields: readonly [{
                readonly name: "edges";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "LIST";
                        readonly ofType: {
                            readonly kind: "NON_NULL";
                            readonly ofType: {
                                readonly kind: "OBJECT";
                                readonly name: "EndOfEpochTransactionKindEdge";
                            };
                        };
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "nodes";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "LIST";
                        readonly ofType: {
                            readonly kind: "NON_NULL";
                            readonly ofType: {
                                readonly kind: "UNION";
                                readonly name: "EndOfEpochTransactionKind";
                            };
                        };
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "pageInfo";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "PageInfo";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "EndOfEpochTransactionKindEdge";
            readonly fields: readonly [{
                readonly name: "cursor";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "node";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "UNION";
                        readonly name: "EndOfEpochTransactionKind";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "Epoch";
            readonly fields: readonly [{
                readonly name: "checkpoints";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "CheckpointConnection";
                    };
                };
                readonly args: readonly [{
                    readonly name: "after";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "before";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "first";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "last";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "endTimestamp";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "DateTime";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "epochId";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "UInt53";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "fundInflow";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "BigInt";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "fundOutflow";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "BigInt";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "fundSize";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "BigInt";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "liveObjectSetDigest";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "String";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "netInflow";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "BigInt";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "protocolConfigs";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "ProtocolConfigs";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "referenceGasPrice";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "BigInt";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "safeMode";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "SafeMode";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "startTimestamp";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "DateTime";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "storageFund";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "StorageFund";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "systemParameters";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "SystemParameters";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "systemStakeSubsidy";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "StakeSubsidy";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "systemStateVersion";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "UInt53";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "totalCheckpoints";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "UInt53";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "totalGasFees";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "BigInt";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "totalStakeRewards";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "BigInt";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "totalStakeSubsidies";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "BigInt";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "totalTransactions";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "UInt53";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "transactionBlocks";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "TransactionBlockConnection";
                    };
                };
                readonly args: readonly [{
                    readonly name: "after";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "before";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "filter";
                    readonly type: {
                        readonly kind: "INPUT_OBJECT";
                        readonly name: "TransactionBlockFilter";
                    };
                }, {
                    readonly name: "first";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "last";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "scanLimit";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "validatorSet";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "ValidatorSet";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "EpochConnection";
            readonly fields: readonly [{
                readonly name: "edges";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "LIST";
                        readonly ofType: {
                            readonly kind: "NON_NULL";
                            readonly ofType: {
                                readonly kind: "OBJECT";
                                readonly name: "EpochEdge";
                            };
                        };
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "nodes";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "LIST";
                        readonly ofType: {
                            readonly kind: "NON_NULL";
                            readonly ofType: {
                                readonly kind: "OBJECT";
                                readonly name: "Epoch";
                            };
                        };
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "pageInfo";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "PageInfo";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "EpochEdge";
            readonly fields: readonly [{
                readonly name: "cursor";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "node";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "Epoch";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "Event";
            readonly fields: readonly [{
                readonly name: "bcs";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "Base64";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "contents";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "MoveValue";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "sender";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "Address";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "sendingModule";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "MoveModule";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "timestamp";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "DateTime";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "transactionBlock";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "TransactionBlock";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "EventConnection";
            readonly fields: readonly [{
                readonly name: "edges";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "LIST";
                        readonly ofType: {
                            readonly kind: "NON_NULL";
                            readonly ofType: {
                                readonly kind: "OBJECT";
                                readonly name: "EventEdge";
                            };
                        };
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "nodes";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "LIST";
                        readonly ofType: {
                            readonly kind: "NON_NULL";
                            readonly ofType: {
                                readonly kind: "OBJECT";
                                readonly name: "Event";
                            };
                        };
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "pageInfo";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "PageInfo";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "EventEdge";
            readonly fields: readonly [{
                readonly name: "cursor";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "node";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "Event";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "INPUT_OBJECT";
            readonly name: "EventFilter";
            readonly inputFields: readonly [{
                readonly name: "sender";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "SuiAddress";
                };
            }, {
                readonly name: "transactionDigest";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "String";
                };
            }, {
                readonly name: "emittingModule";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "String";
                };
            }, {
                readonly name: "eventType";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "String";
                };
            }];
            readonly isOneOf: false;
        }, {
            readonly kind: "OBJECT";
            readonly name: "ExecutionResult";
            readonly fields: readonly [{
                readonly name: "effects";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "TransactionBlockEffects";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "errors";
                readonly type: {
                    readonly kind: "LIST";
                    readonly ofType: {
                        readonly kind: "NON_NULL";
                        readonly ofType: {
                            readonly kind: "SCALAR";
                            readonly name: "String";
                        };
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "ENUM";
            readonly name: "ExecutionStatus";
            readonly enumValues: readonly [{
                readonly name: "SUCCESS";
                readonly isDeprecated: false;
            }, {
                readonly name: "FAILURE";
                readonly isDeprecated: false;
            }];
        }, {
            readonly kind: "ENUM";
            readonly name: "Feature";
            readonly enumValues: readonly [{
                readonly name: "ANALYTICS";
                readonly isDeprecated: false;
            }, {
                readonly name: "COINS";
                readonly isDeprecated: false;
            }, {
                readonly name: "DYNAMIC_FIELDS";
                readonly isDeprecated: false;
            }, {
                readonly name: "NAME_SERVICE";
                readonly isDeprecated: false;
            }, {
                readonly name: "SUBSCRIPTIONS";
                readonly isDeprecated: false;
            }, {
                readonly name: "SYSTEM_STATE";
                readonly isDeprecated: false;
            }, {
                readonly name: "MOVE_REGISTRY";
                readonly isDeprecated: false;
            }];
        }, {
            readonly kind: "OBJECT";
            readonly name: "GasCoin";
            readonly fields: readonly [{
                readonly name: "_";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "Boolean";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "GasCostSummary";
            readonly fields: readonly [{
                readonly name: "computationCost";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "BigInt";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "nonRefundableStorageFee";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "BigInt";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "storageCost";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "BigInt";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "storageRebate";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "BigInt";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "GasEffects";
            readonly fields: readonly [{
                readonly name: "gasObject";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "Object";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "gasSummary";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "GasCostSummary";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "GasInput";
            readonly fields: readonly [{
                readonly name: "gasBudget";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "BigInt";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "gasPayment";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "ObjectConnection";
                    };
                };
                readonly args: readonly [{
                    readonly name: "after";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "before";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "first";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "last";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "gasPrice";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "BigInt";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "gasSponsor";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "Address";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "GenesisTransaction";
            readonly fields: readonly [{
                readonly name: "objects";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "ObjectConnection";
                    };
                };
                readonly args: readonly [{
                    readonly name: "after";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "before";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "first";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "last";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "INTERFACE";
            readonly name: "IMoveDatatype";
            readonly fields: readonly [{
                readonly name: "abilities";
                readonly type: {
                    readonly kind: "LIST";
                    readonly ofType: {
                        readonly kind: "NON_NULL";
                        readonly ofType: {
                            readonly kind: "ENUM";
                            readonly name: "MoveAbility";
                        };
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "module";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "MoveModule";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "name";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "typeParameters";
                readonly type: {
                    readonly kind: "LIST";
                    readonly ofType: {
                        readonly kind: "NON_NULL";
                        readonly ofType: {
                            readonly kind: "OBJECT";
                            readonly name: "MoveStructTypeParameter";
                        };
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
            readonly possibleTypes: readonly [{
                readonly kind: "OBJECT";
                readonly name: "MoveDatatype";
            }, {
                readonly kind: "OBJECT";
                readonly name: "MoveEnum";
            }, {
                readonly kind: "OBJECT";
                readonly name: "MoveStruct";
            }];
        }, {
            readonly kind: "INTERFACE";
            readonly name: "IMoveObject";
            readonly fields: readonly [{
                readonly name: "contents";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "MoveValue";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "display";
                readonly type: {
                    readonly kind: "LIST";
                    readonly ofType: {
                        readonly kind: "NON_NULL";
                        readonly ofType: {
                            readonly kind: "OBJECT";
                            readonly name: "DisplayEntry";
                        };
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "dynamicField";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "DynamicField";
                };
                readonly args: readonly [{
                    readonly name: "name";
                    readonly type: {
                        readonly kind: "NON_NULL";
                        readonly ofType: {
                            readonly kind: "INPUT_OBJECT";
                            readonly name: "DynamicFieldName";
                        };
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "dynamicFields";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "DynamicFieldConnection";
                    };
                };
                readonly args: readonly [{
                    readonly name: "after";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "before";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "first";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "last";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "dynamicObjectField";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "DynamicField";
                };
                readonly args: readonly [{
                    readonly name: "name";
                    readonly type: {
                        readonly kind: "NON_NULL";
                        readonly ofType: {
                            readonly kind: "INPUT_OBJECT";
                            readonly name: "DynamicFieldName";
                        };
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "hasPublicTransfer";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "Boolean";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
            readonly possibleTypes: readonly [{
                readonly kind: "OBJECT";
                readonly name: "Coin";
            }, {
                readonly kind: "OBJECT";
                readonly name: "CoinMetadata";
            }, {
                readonly kind: "OBJECT";
                readonly name: "MoveObject";
            }, {
                readonly kind: "OBJECT";
                readonly name: "StakedSui";
            }, {
                readonly kind: "OBJECT";
                readonly name: "SuinsRegistration";
            }];
        }, {
            readonly kind: "INTERFACE";
            readonly name: "IObject";
            readonly fields: readonly [{
                readonly name: "bcs";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "Base64";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "digest";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "String";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "owner";
                readonly type: {
                    readonly kind: "UNION";
                    readonly name: "ObjectOwner";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "previousTransactionBlock";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "TransactionBlock";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "receivedTransactionBlocks";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "TransactionBlockConnection";
                    };
                };
                readonly args: readonly [{
                    readonly name: "after";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "before";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "filter";
                    readonly type: {
                        readonly kind: "INPUT_OBJECT";
                        readonly name: "TransactionBlockFilter";
                    };
                }, {
                    readonly name: "first";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "last";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "scanLimit";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "status";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "ENUM";
                        readonly name: "ObjectKind";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "storageRebate";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "BigInt";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "version";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "UInt53";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
            readonly possibleTypes: readonly [{
                readonly kind: "OBJECT";
                readonly name: "Coin";
            }, {
                readonly kind: "OBJECT";
                readonly name: "CoinMetadata";
            }, {
                readonly kind: "OBJECT";
                readonly name: "MoveObject";
            }, {
                readonly kind: "OBJECT";
                readonly name: "MovePackage";
            }, {
                readonly kind: "OBJECT";
                readonly name: "Object";
            }, {
                readonly kind: "OBJECT";
                readonly name: "StakedSui";
            }, {
                readonly kind: "OBJECT";
                readonly name: "SuinsRegistration";
            }];
        }, {
            readonly kind: "INTERFACE";
            readonly name: "IOwner";
            readonly fields: readonly [{
                readonly name: "address";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "SuiAddress";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "balance";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "Balance";
                };
                readonly args: readonly [{
                    readonly name: "type";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "balances";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "BalanceConnection";
                    };
                };
                readonly args: readonly [{
                    readonly name: "after";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "before";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "first";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "last";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "coins";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "CoinConnection";
                    };
                };
                readonly args: readonly [{
                    readonly name: "after";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "before";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "first";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "last";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "type";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "defaultSuinsName";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "String";
                };
                readonly args: readonly [{
                    readonly name: "format";
                    readonly type: {
                        readonly kind: "ENUM";
                        readonly name: "DomainFormat";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "objects";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "MoveObjectConnection";
                    };
                };
                readonly args: readonly [{
                    readonly name: "after";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "before";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "filter";
                    readonly type: {
                        readonly kind: "INPUT_OBJECT";
                        readonly name: "ObjectFilter";
                    };
                }, {
                    readonly name: "first";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "last";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "stakedSuis";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "StakedSuiConnection";
                    };
                };
                readonly args: readonly [{
                    readonly name: "after";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "before";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "first";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "last";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "suinsRegistrations";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "SuinsRegistrationConnection";
                    };
                };
                readonly args: readonly [{
                    readonly name: "after";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "before";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "first";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "last";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
            readonly possibleTypes: readonly [{
                readonly kind: "OBJECT";
                readonly name: "Address";
            }, {
                readonly kind: "OBJECT";
                readonly name: "Coin";
            }, {
                readonly kind: "OBJECT";
                readonly name: "CoinMetadata";
            }, {
                readonly kind: "OBJECT";
                readonly name: "MoveObject";
            }, {
                readonly kind: "OBJECT";
                readonly name: "MovePackage";
            }, {
                readonly kind: "OBJECT";
                readonly name: "Object";
            }, {
                readonly kind: "OBJECT";
                readonly name: "Owner";
            }, {
                readonly kind: "OBJECT";
                readonly name: "StakedSui";
            }, {
                readonly kind: "OBJECT";
                readonly name: "SuinsRegistration";
            }];
        }, {
            readonly kind: "OBJECT";
            readonly name: "Immutable";
            readonly fields: readonly [{
                readonly name: "_";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "Boolean";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "Input";
            readonly fields: readonly [{
                readonly name: "ix";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "SCALAR";
            readonly name: "Int";
        }, {
            readonly kind: "SCALAR";
            readonly name: "JSON";
        }, {
            readonly kind: "OBJECT";
            readonly name: "Linkage";
            readonly fields: readonly [{
                readonly name: "originalId";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "SuiAddress";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "upgradedId";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "SuiAddress";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "version";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "UInt53";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "MakeMoveVecTransaction";
            readonly fields: readonly [{
                readonly name: "elements";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "LIST";
                        readonly ofType: {
                            readonly kind: "NON_NULL";
                            readonly ofType: {
                                readonly kind: "UNION";
                                readonly name: "TransactionArgument";
                            };
                        };
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "type";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "MoveType";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "MergeCoinsTransaction";
            readonly fields: readonly [{
                readonly name: "coin";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "UNION";
                        readonly name: "TransactionArgument";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "coins";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "LIST";
                        readonly ofType: {
                            readonly kind: "NON_NULL";
                            readonly ofType: {
                                readonly kind: "UNION";
                                readonly name: "TransactionArgument";
                            };
                        };
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "ENUM";
            readonly name: "MoveAbility";
            readonly enumValues: readonly [{
                readonly name: "COPY";
                readonly isDeprecated: false;
            }, {
                readonly name: "DROP";
                readonly isDeprecated: false;
            }, {
                readonly name: "KEY";
                readonly isDeprecated: false;
            }, {
                readonly name: "STORE";
                readonly isDeprecated: false;
            }];
        }, {
            readonly kind: "OBJECT";
            readonly name: "MoveCallTransaction";
            readonly fields: readonly [{
                readonly name: "arguments";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "LIST";
                        readonly ofType: {
                            readonly kind: "NON_NULL";
                            readonly ofType: {
                                readonly kind: "UNION";
                                readonly name: "TransactionArgument";
                            };
                        };
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "function";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "MoveFunction";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "functionName";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "module";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "package";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "SuiAddress";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "typeArguments";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "LIST";
                        readonly ofType: {
                            readonly kind: "NON_NULL";
                            readonly ofType: {
                                readonly kind: "OBJECT";
                                readonly name: "MoveType";
                            };
                        };
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "SCALAR";
            readonly name: "MoveData";
        }, {
            readonly kind: "OBJECT";
            readonly name: "MoveDatatype";
            readonly fields: readonly [{
                readonly name: "abilities";
                readonly type: {
                    readonly kind: "LIST";
                    readonly ofType: {
                        readonly kind: "NON_NULL";
                        readonly ofType: {
                            readonly kind: "ENUM";
                            readonly name: "MoveAbility";
                        };
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "asMoveEnum";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "MoveEnum";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "asMoveStruct";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "MoveStruct";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "module";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "MoveModule";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "name";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "typeParameters";
                readonly type: {
                    readonly kind: "LIST";
                    readonly ofType: {
                        readonly kind: "NON_NULL";
                        readonly ofType: {
                            readonly kind: "OBJECT";
                            readonly name: "MoveStructTypeParameter";
                        };
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [{
                readonly kind: "INTERFACE";
                readonly name: "IMoveDatatype";
            }];
        }, {
            readonly kind: "OBJECT";
            readonly name: "MoveDatatypeConnection";
            readonly fields: readonly [{
                readonly name: "edges";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "LIST";
                        readonly ofType: {
                            readonly kind: "NON_NULL";
                            readonly ofType: {
                                readonly kind: "OBJECT";
                                readonly name: "MoveDatatypeEdge";
                            };
                        };
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "nodes";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "LIST";
                        readonly ofType: {
                            readonly kind: "NON_NULL";
                            readonly ofType: {
                                readonly kind: "OBJECT";
                                readonly name: "MoveDatatype";
                            };
                        };
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "pageInfo";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "PageInfo";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "MoveDatatypeEdge";
            readonly fields: readonly [{
                readonly name: "cursor";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "node";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "MoveDatatype";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "MoveEnum";
            readonly fields: readonly [{
                readonly name: "abilities";
                readonly type: {
                    readonly kind: "LIST";
                    readonly ofType: {
                        readonly kind: "NON_NULL";
                        readonly ofType: {
                            readonly kind: "ENUM";
                            readonly name: "MoveAbility";
                        };
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "module";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "MoveModule";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "name";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "typeParameters";
                readonly type: {
                    readonly kind: "LIST";
                    readonly ofType: {
                        readonly kind: "NON_NULL";
                        readonly ofType: {
                            readonly kind: "OBJECT";
                            readonly name: "MoveStructTypeParameter";
                        };
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "variants";
                readonly type: {
                    readonly kind: "LIST";
                    readonly ofType: {
                        readonly kind: "NON_NULL";
                        readonly ofType: {
                            readonly kind: "OBJECT";
                            readonly name: "MoveEnumVariant";
                        };
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [{
                readonly kind: "INTERFACE";
                readonly name: "IMoveDatatype";
            }];
        }, {
            readonly kind: "OBJECT";
            readonly name: "MoveEnumConnection";
            readonly fields: readonly [{
                readonly name: "edges";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "LIST";
                        readonly ofType: {
                            readonly kind: "NON_NULL";
                            readonly ofType: {
                                readonly kind: "OBJECT";
                                readonly name: "MoveEnumEdge";
                            };
                        };
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "nodes";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "LIST";
                        readonly ofType: {
                            readonly kind: "NON_NULL";
                            readonly ofType: {
                                readonly kind: "OBJECT";
                                readonly name: "MoveEnum";
                            };
                        };
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "pageInfo";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "PageInfo";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "MoveEnumEdge";
            readonly fields: readonly [{
                readonly name: "cursor";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "node";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "MoveEnum";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "MoveEnumVariant";
            readonly fields: readonly [{
                readonly name: "fields";
                readonly type: {
                    readonly kind: "LIST";
                    readonly ofType: {
                        readonly kind: "NON_NULL";
                        readonly ofType: {
                            readonly kind: "OBJECT";
                            readonly name: "MoveField";
                        };
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "name";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "MoveField";
            readonly fields: readonly [{
                readonly name: "name";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "type";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "OpenMoveType";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "MoveFunction";
            readonly fields: readonly [{
                readonly name: "isEntry";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "Boolean";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "module";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "MoveModule";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "name";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "parameters";
                readonly type: {
                    readonly kind: "LIST";
                    readonly ofType: {
                        readonly kind: "NON_NULL";
                        readonly ofType: {
                            readonly kind: "OBJECT";
                            readonly name: "OpenMoveType";
                        };
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "return";
                readonly type: {
                    readonly kind: "LIST";
                    readonly ofType: {
                        readonly kind: "NON_NULL";
                        readonly ofType: {
                            readonly kind: "OBJECT";
                            readonly name: "OpenMoveType";
                        };
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "typeParameters";
                readonly type: {
                    readonly kind: "LIST";
                    readonly ofType: {
                        readonly kind: "NON_NULL";
                        readonly ofType: {
                            readonly kind: "OBJECT";
                            readonly name: "MoveFunctionTypeParameter";
                        };
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "visibility";
                readonly type: {
                    readonly kind: "ENUM";
                    readonly name: "MoveVisibility";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "MoveFunctionConnection";
            readonly fields: readonly [{
                readonly name: "edges";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "LIST";
                        readonly ofType: {
                            readonly kind: "NON_NULL";
                            readonly ofType: {
                                readonly kind: "OBJECT";
                                readonly name: "MoveFunctionEdge";
                            };
                        };
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "nodes";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "LIST";
                        readonly ofType: {
                            readonly kind: "NON_NULL";
                            readonly ofType: {
                                readonly kind: "OBJECT";
                                readonly name: "MoveFunction";
                            };
                        };
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "pageInfo";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "PageInfo";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "MoveFunctionEdge";
            readonly fields: readonly [{
                readonly name: "cursor";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "node";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "MoveFunction";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "MoveFunctionTypeParameter";
            readonly fields: readonly [{
                readonly name: "constraints";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "LIST";
                        readonly ofType: {
                            readonly kind: "NON_NULL";
                            readonly ofType: {
                                readonly kind: "ENUM";
                                readonly name: "MoveAbility";
                            };
                        };
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "MoveModule";
            readonly fields: readonly [{
                readonly name: "bytes";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "Base64";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "datatype";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "MoveDatatype";
                };
                readonly args: readonly [{
                    readonly name: "name";
                    readonly type: {
                        readonly kind: "NON_NULL";
                        readonly ofType: {
                            readonly kind: "SCALAR";
                            readonly name: "String";
                        };
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "datatypes";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "MoveDatatypeConnection";
                };
                readonly args: readonly [{
                    readonly name: "after";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "before";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "first";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "last";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "disassembly";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "String";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "enum";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "MoveEnum";
                };
                readonly args: readonly [{
                    readonly name: "name";
                    readonly type: {
                        readonly kind: "NON_NULL";
                        readonly ofType: {
                            readonly kind: "SCALAR";
                            readonly name: "String";
                        };
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "enums";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "MoveEnumConnection";
                };
                readonly args: readonly [{
                    readonly name: "after";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "before";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "first";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "last";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "fileFormatVersion";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "friends";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "MoveModuleConnection";
                    };
                };
                readonly args: readonly [{
                    readonly name: "after";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "before";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "first";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "last";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "function";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "MoveFunction";
                };
                readonly args: readonly [{
                    readonly name: "name";
                    readonly type: {
                        readonly kind: "NON_NULL";
                        readonly ofType: {
                            readonly kind: "SCALAR";
                            readonly name: "String";
                        };
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "functions";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "MoveFunctionConnection";
                };
                readonly args: readonly [{
                    readonly name: "after";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "before";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "first";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "last";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "name";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "package";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "MovePackage";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "struct";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "MoveStruct";
                };
                readonly args: readonly [{
                    readonly name: "name";
                    readonly type: {
                        readonly kind: "NON_NULL";
                        readonly ofType: {
                            readonly kind: "SCALAR";
                            readonly name: "String";
                        };
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "structs";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "MoveStructConnection";
                };
                readonly args: readonly [{
                    readonly name: "after";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "before";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "first";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "last";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "MoveModuleConnection";
            readonly fields: readonly [{
                readonly name: "edges";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "LIST";
                        readonly ofType: {
                            readonly kind: "NON_NULL";
                            readonly ofType: {
                                readonly kind: "OBJECT";
                                readonly name: "MoveModuleEdge";
                            };
                        };
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "nodes";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "LIST";
                        readonly ofType: {
                            readonly kind: "NON_NULL";
                            readonly ofType: {
                                readonly kind: "OBJECT";
                                readonly name: "MoveModule";
                            };
                        };
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "pageInfo";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "PageInfo";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "MoveModuleEdge";
            readonly fields: readonly [{
                readonly name: "cursor";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "node";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "MoveModule";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "MoveObject";
            readonly fields: readonly [{
                readonly name: "address";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "SuiAddress";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "asCoin";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "Coin";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "asCoinMetadata";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "CoinMetadata";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "asStakedSui";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "StakedSui";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "asSuinsRegistration";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "SuinsRegistration";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "balance";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "Balance";
                };
                readonly args: readonly [{
                    readonly name: "type";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "balances";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "BalanceConnection";
                    };
                };
                readonly args: readonly [{
                    readonly name: "after";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "before";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "first";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "last";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "bcs";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "Base64";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "coins";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "CoinConnection";
                    };
                };
                readonly args: readonly [{
                    readonly name: "after";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "before";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "first";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "last";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "type";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "contents";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "MoveValue";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "defaultSuinsName";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "String";
                };
                readonly args: readonly [{
                    readonly name: "format";
                    readonly type: {
                        readonly kind: "ENUM";
                        readonly name: "DomainFormat";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "digest";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "String";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "display";
                readonly type: {
                    readonly kind: "LIST";
                    readonly ofType: {
                        readonly kind: "NON_NULL";
                        readonly ofType: {
                            readonly kind: "OBJECT";
                            readonly name: "DisplayEntry";
                        };
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "dynamicField";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "DynamicField";
                };
                readonly args: readonly [{
                    readonly name: "name";
                    readonly type: {
                        readonly kind: "NON_NULL";
                        readonly ofType: {
                            readonly kind: "INPUT_OBJECT";
                            readonly name: "DynamicFieldName";
                        };
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "dynamicFields";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "DynamicFieldConnection";
                    };
                };
                readonly args: readonly [{
                    readonly name: "after";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "before";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "first";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "last";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "dynamicObjectField";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "DynamicField";
                };
                readonly args: readonly [{
                    readonly name: "name";
                    readonly type: {
                        readonly kind: "NON_NULL";
                        readonly ofType: {
                            readonly kind: "INPUT_OBJECT";
                            readonly name: "DynamicFieldName";
                        };
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "hasPublicTransfer";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "Boolean";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "objects";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "MoveObjectConnection";
                    };
                };
                readonly args: readonly [{
                    readonly name: "after";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "before";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "filter";
                    readonly type: {
                        readonly kind: "INPUT_OBJECT";
                        readonly name: "ObjectFilter";
                    };
                }, {
                    readonly name: "first";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "last";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "owner";
                readonly type: {
                    readonly kind: "UNION";
                    readonly name: "ObjectOwner";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "previousTransactionBlock";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "TransactionBlock";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "receivedTransactionBlocks";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "TransactionBlockConnection";
                    };
                };
                readonly args: readonly [{
                    readonly name: "after";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "before";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "filter";
                    readonly type: {
                        readonly kind: "INPUT_OBJECT";
                        readonly name: "TransactionBlockFilter";
                    };
                }, {
                    readonly name: "first";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "last";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "scanLimit";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "stakedSuis";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "StakedSuiConnection";
                    };
                };
                readonly args: readonly [{
                    readonly name: "after";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "before";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "first";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "last";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "status";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "ENUM";
                        readonly name: "ObjectKind";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "storageRebate";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "BigInt";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "suinsRegistrations";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "SuinsRegistrationConnection";
                    };
                };
                readonly args: readonly [{
                    readonly name: "after";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "before";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "first";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "last";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "version";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "UInt53";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [{
                readonly kind: "INTERFACE";
                readonly name: "IMoveObject";
            }, {
                readonly kind: "INTERFACE";
                readonly name: "IObject";
            }, {
                readonly kind: "INTERFACE";
                readonly name: "IOwner";
            }];
        }, {
            readonly kind: "OBJECT";
            readonly name: "MoveObjectConnection";
            readonly fields: readonly [{
                readonly name: "edges";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "LIST";
                        readonly ofType: {
                            readonly kind: "NON_NULL";
                            readonly ofType: {
                                readonly kind: "OBJECT";
                                readonly name: "MoveObjectEdge";
                            };
                        };
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "nodes";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "LIST";
                        readonly ofType: {
                            readonly kind: "NON_NULL";
                            readonly ofType: {
                                readonly kind: "OBJECT";
                                readonly name: "MoveObject";
                            };
                        };
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "pageInfo";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "PageInfo";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "MoveObjectEdge";
            readonly fields: readonly [{
                readonly name: "cursor";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "node";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "MoveObject";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "MovePackage";
            readonly fields: readonly [{
                readonly name: "address";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "SuiAddress";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "balance";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "Balance";
                };
                readonly args: readonly [{
                    readonly name: "type";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "balances";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "BalanceConnection";
                    };
                };
                readonly args: readonly [{
                    readonly name: "after";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "before";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "first";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "last";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "bcs";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "Base64";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "coins";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "CoinConnection";
                    };
                };
                readonly args: readonly [{
                    readonly name: "after";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "before";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "first";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "last";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "type";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "defaultSuinsName";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "String";
                };
                readonly args: readonly [{
                    readonly name: "format";
                    readonly type: {
                        readonly kind: "ENUM";
                        readonly name: "DomainFormat";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "digest";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "String";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "latestPackage";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "MovePackage";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "linkage";
                readonly type: {
                    readonly kind: "LIST";
                    readonly ofType: {
                        readonly kind: "NON_NULL";
                        readonly ofType: {
                            readonly kind: "OBJECT";
                            readonly name: "Linkage";
                        };
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "module";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "MoveModule";
                };
                readonly args: readonly [{
                    readonly name: "name";
                    readonly type: {
                        readonly kind: "NON_NULL";
                        readonly ofType: {
                            readonly kind: "SCALAR";
                            readonly name: "String";
                        };
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "moduleBcs";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "Base64";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "modules";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "MoveModuleConnection";
                };
                readonly args: readonly [{
                    readonly name: "after";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "before";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "first";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "last";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "objects";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "MoveObjectConnection";
                    };
                };
                readonly args: readonly [{
                    readonly name: "after";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "before";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "filter";
                    readonly type: {
                        readonly kind: "INPUT_OBJECT";
                        readonly name: "ObjectFilter";
                    };
                }, {
                    readonly name: "first";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "last";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "owner";
                readonly type: {
                    readonly kind: "UNION";
                    readonly name: "ObjectOwner";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "packageAtVersion";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "MovePackage";
                };
                readonly args: readonly [{
                    readonly name: "version";
                    readonly type: {
                        readonly kind: "NON_NULL";
                        readonly ofType: {
                            readonly kind: "SCALAR";
                            readonly name: "Int";
                        };
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "packageBcs";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "Base64";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "packageVersions";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "MovePackageConnection";
                    };
                };
                readonly args: readonly [{
                    readonly name: "after";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "before";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "filter";
                    readonly type: {
                        readonly kind: "INPUT_OBJECT";
                        readonly name: "MovePackageVersionFilter";
                    };
                }, {
                    readonly name: "first";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "last";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "previousTransactionBlock";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "TransactionBlock";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "receivedTransactionBlocks";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "TransactionBlockConnection";
                    };
                };
                readonly args: readonly [{
                    readonly name: "after";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "before";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "filter";
                    readonly type: {
                        readonly kind: "INPUT_OBJECT";
                        readonly name: "TransactionBlockFilter";
                    };
                }, {
                    readonly name: "first";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "last";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "scanLimit";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "stakedSuis";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "StakedSuiConnection";
                    };
                };
                readonly args: readonly [{
                    readonly name: "after";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "before";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "first";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "last";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "status";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "ENUM";
                        readonly name: "ObjectKind";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "storageRebate";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "BigInt";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "suinsRegistrations";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "SuinsRegistrationConnection";
                    };
                };
                readonly args: readonly [{
                    readonly name: "after";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "before";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "first";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "last";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "typeOrigins";
                readonly type: {
                    readonly kind: "LIST";
                    readonly ofType: {
                        readonly kind: "NON_NULL";
                        readonly ofType: {
                            readonly kind: "OBJECT";
                            readonly name: "TypeOrigin";
                        };
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "version";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "UInt53";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [{
                readonly kind: "INTERFACE";
                readonly name: "IObject";
            }, {
                readonly kind: "INTERFACE";
                readonly name: "IOwner";
            }];
        }, {
            readonly kind: "INPUT_OBJECT";
            readonly name: "MovePackageCheckpointFilter";
            readonly inputFields: readonly [{
                readonly name: "afterCheckpoint";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "UInt53";
                };
            }, {
                readonly name: "beforeCheckpoint";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "UInt53";
                };
            }];
            readonly isOneOf: false;
        }, {
            readonly kind: "OBJECT";
            readonly name: "MovePackageConnection";
            readonly fields: readonly [{
                readonly name: "edges";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "LIST";
                        readonly ofType: {
                            readonly kind: "NON_NULL";
                            readonly ofType: {
                                readonly kind: "OBJECT";
                                readonly name: "MovePackageEdge";
                            };
                        };
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "nodes";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "LIST";
                        readonly ofType: {
                            readonly kind: "NON_NULL";
                            readonly ofType: {
                                readonly kind: "OBJECT";
                                readonly name: "MovePackage";
                            };
                        };
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "pageInfo";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "PageInfo";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "MovePackageEdge";
            readonly fields: readonly [{
                readonly name: "cursor";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "node";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "MovePackage";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "INPUT_OBJECT";
            readonly name: "MovePackageVersionFilter";
            readonly inputFields: readonly [{
                readonly name: "afterVersion";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "UInt53";
                };
            }, {
                readonly name: "beforeVersion";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "UInt53";
                };
            }];
            readonly isOneOf: false;
        }, {
            readonly kind: "OBJECT";
            readonly name: "MoveStruct";
            readonly fields: readonly [{
                readonly name: "abilities";
                readonly type: {
                    readonly kind: "LIST";
                    readonly ofType: {
                        readonly kind: "NON_NULL";
                        readonly ofType: {
                            readonly kind: "ENUM";
                            readonly name: "MoveAbility";
                        };
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "fields";
                readonly type: {
                    readonly kind: "LIST";
                    readonly ofType: {
                        readonly kind: "NON_NULL";
                        readonly ofType: {
                            readonly kind: "OBJECT";
                            readonly name: "MoveField";
                        };
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "module";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "MoveModule";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "name";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "typeParameters";
                readonly type: {
                    readonly kind: "LIST";
                    readonly ofType: {
                        readonly kind: "NON_NULL";
                        readonly ofType: {
                            readonly kind: "OBJECT";
                            readonly name: "MoveStructTypeParameter";
                        };
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [{
                readonly kind: "INTERFACE";
                readonly name: "IMoveDatatype";
            }];
        }, {
            readonly kind: "OBJECT";
            readonly name: "MoveStructConnection";
            readonly fields: readonly [{
                readonly name: "edges";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "LIST";
                        readonly ofType: {
                            readonly kind: "NON_NULL";
                            readonly ofType: {
                                readonly kind: "OBJECT";
                                readonly name: "MoveStructEdge";
                            };
                        };
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "nodes";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "LIST";
                        readonly ofType: {
                            readonly kind: "NON_NULL";
                            readonly ofType: {
                                readonly kind: "OBJECT";
                                readonly name: "MoveStruct";
                            };
                        };
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "pageInfo";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "PageInfo";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "MoveStructEdge";
            readonly fields: readonly [{
                readonly name: "cursor";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "node";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "MoveStruct";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "MoveStructTypeParameter";
            readonly fields: readonly [{
                readonly name: "constraints";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "LIST";
                        readonly ofType: {
                            readonly kind: "NON_NULL";
                            readonly ofType: {
                                readonly kind: "ENUM";
                                readonly name: "MoveAbility";
                            };
                        };
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "isPhantom";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "Boolean";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "MoveType";
            readonly fields: readonly [{
                readonly name: "abilities";
                readonly type: {
                    readonly kind: "LIST";
                    readonly ofType: {
                        readonly kind: "NON_NULL";
                        readonly ofType: {
                            readonly kind: "ENUM";
                            readonly name: "MoveAbility";
                        };
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "layout";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "MoveTypeLayout";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "repr";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "signature";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "MoveTypeSignature";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "SCALAR";
            readonly name: "MoveTypeLayout";
        }, {
            readonly kind: "SCALAR";
            readonly name: "MoveTypeSignature";
        }, {
            readonly kind: "OBJECT";
            readonly name: "MoveValue";
            readonly fields: readonly [{
                readonly name: "bcs";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "Base64";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "data";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "MoveData";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "json";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "JSON";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "type";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "MoveType";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "ENUM";
            readonly name: "MoveVisibility";
            readonly enumValues: readonly [{
                readonly name: "PUBLIC";
                readonly isDeprecated: false;
            }, {
                readonly name: "PRIVATE";
                readonly isDeprecated: false;
            }, {
                readonly name: "FRIEND";
                readonly isDeprecated: false;
            }];
        }, {
            readonly kind: "OBJECT";
            readonly name: "Mutation";
            readonly fields: readonly [{
                readonly name: "executeTransactionBlock";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "ExecutionResult";
                    };
                };
                readonly args: readonly [{
                    readonly name: "signatures";
                    readonly type: {
                        readonly kind: "NON_NULL";
                        readonly ofType: {
                            readonly kind: "LIST";
                            readonly ofType: {
                                readonly kind: "NON_NULL";
                                readonly ofType: {
                                    readonly kind: "SCALAR";
                                    readonly name: "String";
                                };
                            };
                        };
                    };
                }, {
                    readonly name: "txBytes";
                    readonly type: {
                        readonly kind: "NON_NULL";
                        readonly ofType: {
                            readonly kind: "SCALAR";
                            readonly name: "String";
                        };
                    };
                }];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "Object";
            readonly fields: readonly [{
                readonly name: "address";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "SuiAddress";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "asMoveObject";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "MoveObject";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "asMovePackage";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "MovePackage";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "balance";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "Balance";
                };
                readonly args: readonly [{
                    readonly name: "type";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "balances";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "BalanceConnection";
                    };
                };
                readonly args: readonly [{
                    readonly name: "after";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "before";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "first";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "last";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "bcs";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "Base64";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "coins";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "CoinConnection";
                    };
                };
                readonly args: readonly [{
                    readonly name: "after";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "before";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "first";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "last";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "type";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "defaultSuinsName";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "String";
                };
                readonly args: readonly [{
                    readonly name: "format";
                    readonly type: {
                        readonly kind: "ENUM";
                        readonly name: "DomainFormat";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "digest";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "String";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "display";
                readonly type: {
                    readonly kind: "LIST";
                    readonly ofType: {
                        readonly kind: "NON_NULL";
                        readonly ofType: {
                            readonly kind: "OBJECT";
                            readonly name: "DisplayEntry";
                        };
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "dynamicField";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "DynamicField";
                };
                readonly args: readonly [{
                    readonly name: "name";
                    readonly type: {
                        readonly kind: "NON_NULL";
                        readonly ofType: {
                            readonly kind: "INPUT_OBJECT";
                            readonly name: "DynamicFieldName";
                        };
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "dynamicFields";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "DynamicFieldConnection";
                    };
                };
                readonly args: readonly [{
                    readonly name: "after";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "before";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "first";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "last";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "dynamicObjectField";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "DynamicField";
                };
                readonly args: readonly [{
                    readonly name: "name";
                    readonly type: {
                        readonly kind: "NON_NULL";
                        readonly ofType: {
                            readonly kind: "INPUT_OBJECT";
                            readonly name: "DynamicFieldName";
                        };
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "objects";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "MoveObjectConnection";
                    };
                };
                readonly args: readonly [{
                    readonly name: "after";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "before";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "filter";
                    readonly type: {
                        readonly kind: "INPUT_OBJECT";
                        readonly name: "ObjectFilter";
                    };
                }, {
                    readonly name: "first";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "last";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "owner";
                readonly type: {
                    readonly kind: "UNION";
                    readonly name: "ObjectOwner";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "previousTransactionBlock";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "TransactionBlock";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "receivedTransactionBlocks";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "TransactionBlockConnection";
                    };
                };
                readonly args: readonly [{
                    readonly name: "after";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "before";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "filter";
                    readonly type: {
                        readonly kind: "INPUT_OBJECT";
                        readonly name: "TransactionBlockFilter";
                    };
                }, {
                    readonly name: "first";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "last";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "scanLimit";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "stakedSuis";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "StakedSuiConnection";
                    };
                };
                readonly args: readonly [{
                    readonly name: "after";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "before";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "first";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "last";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "status";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "ENUM";
                        readonly name: "ObjectKind";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "storageRebate";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "BigInt";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "suinsRegistrations";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "SuinsRegistrationConnection";
                    };
                };
                readonly args: readonly [{
                    readonly name: "after";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "before";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "first";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "last";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "version";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "UInt53";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [{
                readonly kind: "INTERFACE";
                readonly name: "IObject";
            }, {
                readonly kind: "INTERFACE";
                readonly name: "IOwner";
            }];
        }, {
            readonly kind: "OBJECT";
            readonly name: "ObjectChange";
            readonly fields: readonly [{
                readonly name: "address";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "SuiAddress";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "idCreated";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "Boolean";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "idDeleted";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "Boolean";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "inputState";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "Object";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "outputState";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "Object";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "ObjectChangeConnection";
            readonly fields: readonly [{
                readonly name: "edges";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "LIST";
                        readonly ofType: {
                            readonly kind: "NON_NULL";
                            readonly ofType: {
                                readonly kind: "OBJECT";
                                readonly name: "ObjectChangeEdge";
                            };
                        };
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "nodes";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "LIST";
                        readonly ofType: {
                            readonly kind: "NON_NULL";
                            readonly ofType: {
                                readonly kind: "OBJECT";
                                readonly name: "ObjectChange";
                            };
                        };
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "pageInfo";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "PageInfo";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "ObjectChangeEdge";
            readonly fields: readonly [{
                readonly name: "cursor";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "node";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "ObjectChange";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "ObjectConnection";
            readonly fields: readonly [{
                readonly name: "edges";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "LIST";
                        readonly ofType: {
                            readonly kind: "NON_NULL";
                            readonly ofType: {
                                readonly kind: "OBJECT";
                                readonly name: "ObjectEdge";
                            };
                        };
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "nodes";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "LIST";
                        readonly ofType: {
                            readonly kind: "NON_NULL";
                            readonly ofType: {
                                readonly kind: "OBJECT";
                                readonly name: "Object";
                            };
                        };
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "pageInfo";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "PageInfo";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "ObjectEdge";
            readonly fields: readonly [{
                readonly name: "cursor";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "node";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "Object";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "INPUT_OBJECT";
            readonly name: "ObjectFilter";
            readonly inputFields: readonly [{
                readonly name: "type";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "String";
                };
            }, {
                readonly name: "owner";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "SuiAddress";
                };
            }, {
                readonly name: "objectIds";
                readonly type: {
                    readonly kind: "LIST";
                    readonly ofType: {
                        readonly kind: "NON_NULL";
                        readonly ofType: {
                            readonly kind: "SCALAR";
                            readonly name: "SuiAddress";
                        };
                    };
                };
            }];
            readonly isOneOf: false;
        }, {
            readonly kind: "INPUT_OBJECT";
            readonly name: "ObjectKey";
            readonly inputFields: readonly [{
                readonly name: "objectId";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "SuiAddress";
                    };
                };
            }, {
                readonly name: "version";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "UInt53";
                    };
                };
            }];
            readonly isOneOf: false;
        }, {
            readonly kind: "ENUM";
            readonly name: "ObjectKind";
            readonly enumValues: readonly [{
                readonly name: "NOT_INDEXED";
                readonly isDeprecated: false;
            }, {
                readonly name: "INDEXED";
                readonly isDeprecated: false;
            }];
        }, {
            readonly kind: "UNION";
            readonly name: "ObjectOwner";
            readonly possibleTypes: readonly [{
                readonly kind: "OBJECT";
                readonly name: "AddressOwner";
            }, {
                readonly kind: "OBJECT";
                readonly name: "ConsensusV2";
            }, {
                readonly kind: "OBJECT";
                readonly name: "Immutable";
            }, {
                readonly kind: "OBJECT";
                readonly name: "Parent";
            }, {
                readonly kind: "OBJECT";
                readonly name: "Shared";
            }];
        }, {
            readonly kind: "INPUT_OBJECT";
            readonly name: "ObjectRef";
            readonly inputFields: readonly [{
                readonly name: "address";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "SuiAddress";
                    };
                };
            }, {
                readonly name: "version";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "UInt53";
                    };
                };
            }, {
                readonly name: "digest";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                };
            }];
            readonly isOneOf: false;
        }, {
            readonly kind: "OBJECT";
            readonly name: "OpenMoveType";
            readonly fields: readonly [{
                readonly name: "repr";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "signature";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "OpenMoveTypeSignature";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "SCALAR";
            readonly name: "OpenMoveTypeSignature";
        }, {
            readonly kind: "OBJECT";
            readonly name: "OwnedOrImmutable";
            readonly fields: readonly [{
                readonly name: "address";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "SuiAddress";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "digest";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "object";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "Object";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "version";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "UInt53";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "Owner";
            readonly fields: readonly [{
                readonly name: "address";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "SuiAddress";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "asAddress";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "Address";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "asObject";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "Object";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "balance";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "Balance";
                };
                readonly args: readonly [{
                    readonly name: "type";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "balances";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "BalanceConnection";
                    };
                };
                readonly args: readonly [{
                    readonly name: "after";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "before";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "first";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "last";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "coins";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "CoinConnection";
                    };
                };
                readonly args: readonly [{
                    readonly name: "after";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "before";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "first";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "last";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "type";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "defaultSuinsName";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "String";
                };
                readonly args: readonly [{
                    readonly name: "format";
                    readonly type: {
                        readonly kind: "ENUM";
                        readonly name: "DomainFormat";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "dynamicField";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "DynamicField";
                };
                readonly args: readonly [{
                    readonly name: "name";
                    readonly type: {
                        readonly kind: "NON_NULL";
                        readonly ofType: {
                            readonly kind: "INPUT_OBJECT";
                            readonly name: "DynamicFieldName";
                        };
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "dynamicFields";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "DynamicFieldConnection";
                    };
                };
                readonly args: readonly [{
                    readonly name: "after";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "before";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "first";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "last";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "dynamicObjectField";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "DynamicField";
                };
                readonly args: readonly [{
                    readonly name: "name";
                    readonly type: {
                        readonly kind: "NON_NULL";
                        readonly ofType: {
                            readonly kind: "INPUT_OBJECT";
                            readonly name: "DynamicFieldName";
                        };
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "objects";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "MoveObjectConnection";
                    };
                };
                readonly args: readonly [{
                    readonly name: "after";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "before";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "filter";
                    readonly type: {
                        readonly kind: "INPUT_OBJECT";
                        readonly name: "ObjectFilter";
                    };
                }, {
                    readonly name: "first";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "last";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "stakedSuis";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "StakedSuiConnection";
                    };
                };
                readonly args: readonly [{
                    readonly name: "after";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "before";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "first";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "last";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "suinsRegistrations";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "SuinsRegistrationConnection";
                    };
                };
                readonly args: readonly [{
                    readonly name: "after";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "before";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "first";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "last";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [{
                readonly kind: "INTERFACE";
                readonly name: "IOwner";
            }];
        }, {
            readonly kind: "OBJECT";
            readonly name: "PageInfo";
            readonly fields: readonly [{
                readonly name: "endCursor";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "String";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "hasNextPage";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "Boolean";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "hasPreviousPage";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "Boolean";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "startCursor";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "String";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "Parent";
            readonly fields: readonly [{
                readonly name: "parent";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "Owner";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "UNION";
            readonly name: "ProgrammableTransaction";
            readonly possibleTypes: readonly [{
                readonly kind: "OBJECT";
                readonly name: "MakeMoveVecTransaction";
            }, {
                readonly kind: "OBJECT";
                readonly name: "MergeCoinsTransaction";
            }, {
                readonly kind: "OBJECT";
                readonly name: "MoveCallTransaction";
            }, {
                readonly kind: "OBJECT";
                readonly name: "PublishTransaction";
            }, {
                readonly kind: "OBJECT";
                readonly name: "SplitCoinsTransaction";
            }, {
                readonly kind: "OBJECT";
                readonly name: "TransferObjectsTransaction";
            }, {
                readonly kind: "OBJECT";
                readonly name: "UpgradeTransaction";
            }];
        }, {
            readonly kind: "OBJECT";
            readonly name: "ProgrammableTransactionBlock";
            readonly fields: readonly [{
                readonly name: "inputs";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "TransactionInputConnection";
                    };
                };
                readonly args: readonly [{
                    readonly name: "after";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "before";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "first";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "last";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "transactions";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "ProgrammableTransactionConnection";
                    };
                };
                readonly args: readonly [{
                    readonly name: "after";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "before";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "first";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "last";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "ProgrammableTransactionConnection";
            readonly fields: readonly [{
                readonly name: "edges";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "LIST";
                        readonly ofType: {
                            readonly kind: "NON_NULL";
                            readonly ofType: {
                                readonly kind: "OBJECT";
                                readonly name: "ProgrammableTransactionEdge";
                            };
                        };
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "nodes";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "LIST";
                        readonly ofType: {
                            readonly kind: "NON_NULL";
                            readonly ofType: {
                                readonly kind: "UNION";
                                readonly name: "ProgrammableTransaction";
                            };
                        };
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "pageInfo";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "PageInfo";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "ProgrammableTransactionEdge";
            readonly fields: readonly [{
                readonly name: "cursor";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "node";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "UNION";
                        readonly name: "ProgrammableTransaction";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "ProtocolConfigAttr";
            readonly fields: readonly [{
                readonly name: "key";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "value";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "String";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "ProtocolConfigFeatureFlag";
            readonly fields: readonly [{
                readonly name: "key";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "value";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "Boolean";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "ProtocolConfigs";
            readonly fields: readonly [{
                readonly name: "config";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "ProtocolConfigAttr";
                };
                readonly args: readonly [{
                    readonly name: "key";
                    readonly type: {
                        readonly kind: "NON_NULL";
                        readonly ofType: {
                            readonly kind: "SCALAR";
                            readonly name: "String";
                        };
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "configs";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "LIST";
                        readonly ofType: {
                            readonly kind: "NON_NULL";
                            readonly ofType: {
                                readonly kind: "OBJECT";
                                readonly name: "ProtocolConfigAttr";
                            };
                        };
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "featureFlag";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "ProtocolConfigFeatureFlag";
                };
                readonly args: readonly [{
                    readonly name: "key";
                    readonly type: {
                        readonly kind: "NON_NULL";
                        readonly ofType: {
                            readonly kind: "SCALAR";
                            readonly name: "String";
                        };
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "featureFlags";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "LIST";
                        readonly ofType: {
                            readonly kind: "NON_NULL";
                            readonly ofType: {
                                readonly kind: "OBJECT";
                                readonly name: "ProtocolConfigFeatureFlag";
                            };
                        };
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "protocolVersion";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "UInt53";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "PublishTransaction";
            readonly fields: readonly [{
                readonly name: "dependencies";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "LIST";
                        readonly ofType: {
                            readonly kind: "NON_NULL";
                            readonly ofType: {
                                readonly kind: "SCALAR";
                                readonly name: "SuiAddress";
                            };
                        };
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "modules";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "LIST";
                        readonly ofType: {
                            readonly kind: "NON_NULL";
                            readonly ofType: {
                                readonly kind: "SCALAR";
                                readonly name: "Base64";
                            };
                        };
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "Pure";
            readonly fields: readonly [{
                readonly name: "bytes";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "Base64";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "Query";
            readonly fields: readonly [{
                readonly name: "address";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "Address";
                };
                readonly args: readonly [{
                    readonly name: "address";
                    readonly type: {
                        readonly kind: "NON_NULL";
                        readonly ofType: {
                            readonly kind: "SCALAR";
                            readonly name: "SuiAddress";
                        };
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "availableRange";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "AvailableRange";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "chainIdentifier";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "checkpoint";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "Checkpoint";
                };
                readonly args: readonly [{
                    readonly name: "id";
                    readonly type: {
                        readonly kind: "INPUT_OBJECT";
                        readonly name: "CheckpointId";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "checkpoints";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "CheckpointConnection";
                    };
                };
                readonly args: readonly [{
                    readonly name: "after";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "before";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "first";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "last";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "coinMetadata";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "CoinMetadata";
                };
                readonly args: readonly [{
                    readonly name: "coinType";
                    readonly type: {
                        readonly kind: "NON_NULL";
                        readonly ofType: {
                            readonly kind: "SCALAR";
                            readonly name: "String";
                        };
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "coins";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "CoinConnection";
                    };
                };
                readonly args: readonly [{
                    readonly name: "after";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "before";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "first";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "last";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "type";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "dryRunTransactionBlock";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "DryRunResult";
                    };
                };
                readonly args: readonly [{
                    readonly name: "skipChecks";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Boolean";
                    };
                }, {
                    readonly name: "txBytes";
                    readonly type: {
                        readonly kind: "NON_NULL";
                        readonly ofType: {
                            readonly kind: "SCALAR";
                            readonly name: "String";
                        };
                    };
                }, {
                    readonly name: "txMeta";
                    readonly type: {
                        readonly kind: "INPUT_OBJECT";
                        readonly name: "TransactionMetadata";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "epoch";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "Epoch";
                };
                readonly args: readonly [{
                    readonly name: "id";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "UInt53";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "epochs";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "EpochConnection";
                    };
                };
                readonly args: readonly [{
                    readonly name: "after";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "before";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "first";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "last";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "events";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "EventConnection";
                    };
                };
                readonly args: readonly [{
                    readonly name: "after";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "before";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "filter";
                    readonly type: {
                        readonly kind: "INPUT_OBJECT";
                        readonly name: "EventFilter";
                    };
                }, {
                    readonly name: "first";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "last";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "latestPackage";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "MovePackage";
                };
                readonly args: readonly [{
                    readonly name: "address";
                    readonly type: {
                        readonly kind: "NON_NULL";
                        readonly ofType: {
                            readonly kind: "SCALAR";
                            readonly name: "SuiAddress";
                        };
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "multiGetObjects";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "LIST";
                        readonly ofType: {
                            readonly kind: "OBJECT";
                            readonly name: "Object";
                        };
                    };
                };
                readonly args: readonly [{
                    readonly name: "keys";
                    readonly type: {
                        readonly kind: "NON_NULL";
                        readonly ofType: {
                            readonly kind: "LIST";
                            readonly ofType: {
                                readonly kind: "NON_NULL";
                                readonly ofType: {
                                    readonly kind: "INPUT_OBJECT";
                                    readonly name: "ObjectKey";
                                };
                            };
                        };
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "object";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "Object";
                };
                readonly args: readonly [{
                    readonly name: "address";
                    readonly type: {
                        readonly kind: "NON_NULL";
                        readonly ofType: {
                            readonly kind: "SCALAR";
                            readonly name: "SuiAddress";
                        };
                    };
                }, {
                    readonly name: "version";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "UInt53";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "objects";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "ObjectConnection";
                    };
                };
                readonly args: readonly [{
                    readonly name: "after";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "before";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "filter";
                    readonly type: {
                        readonly kind: "INPUT_OBJECT";
                        readonly name: "ObjectFilter";
                    };
                }, {
                    readonly name: "first";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "last";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "owner";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "Owner";
                };
                readonly args: readonly [{
                    readonly name: "address";
                    readonly type: {
                        readonly kind: "NON_NULL";
                        readonly ofType: {
                            readonly kind: "SCALAR";
                            readonly name: "SuiAddress";
                        };
                    };
                }, {
                    readonly name: "rootVersion";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "UInt53";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "package";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "MovePackage";
                };
                readonly args: readonly [{
                    readonly name: "address";
                    readonly type: {
                        readonly kind: "NON_NULL";
                        readonly ofType: {
                            readonly kind: "SCALAR";
                            readonly name: "SuiAddress";
                        };
                    };
                }, {
                    readonly name: "version";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "UInt53";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "packageByName";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "MovePackage";
                };
                readonly args: readonly [{
                    readonly name: "name";
                    readonly type: {
                        readonly kind: "NON_NULL";
                        readonly ofType: {
                            readonly kind: "SCALAR";
                            readonly name: "String";
                        };
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "packageVersions";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "MovePackageConnection";
                    };
                };
                readonly args: readonly [{
                    readonly name: "address";
                    readonly type: {
                        readonly kind: "NON_NULL";
                        readonly ofType: {
                            readonly kind: "SCALAR";
                            readonly name: "SuiAddress";
                        };
                    };
                }, {
                    readonly name: "after";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "before";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "filter";
                    readonly type: {
                        readonly kind: "INPUT_OBJECT";
                        readonly name: "MovePackageVersionFilter";
                    };
                }, {
                    readonly name: "first";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "last";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "packages";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "MovePackageConnection";
                    };
                };
                readonly args: readonly [{
                    readonly name: "after";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "before";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "filter";
                    readonly type: {
                        readonly kind: "INPUT_OBJECT";
                        readonly name: "MovePackageCheckpointFilter";
                    };
                }, {
                    readonly name: "first";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "last";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "protocolConfig";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "ProtocolConfigs";
                    };
                };
                readonly args: readonly [{
                    readonly name: "protocolVersion";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "UInt53";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "resolveSuinsAddress";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "Address";
                };
                readonly args: readonly [{
                    readonly name: "domain";
                    readonly type: {
                        readonly kind: "NON_NULL";
                        readonly ofType: {
                            readonly kind: "SCALAR";
                            readonly name: "String";
                        };
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "serviceConfig";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "ServiceConfig";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "transactionBlock";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "TransactionBlock";
                };
                readonly args: readonly [{
                    readonly name: "digest";
                    readonly type: {
                        readonly kind: "NON_NULL";
                        readonly ofType: {
                            readonly kind: "SCALAR";
                            readonly name: "String";
                        };
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "transactionBlocks";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "TransactionBlockConnection";
                    };
                };
                readonly args: readonly [{
                    readonly name: "after";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "before";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "filter";
                    readonly type: {
                        readonly kind: "INPUT_OBJECT";
                        readonly name: "TransactionBlockFilter";
                    };
                }, {
                    readonly name: "first";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "last";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "scanLimit";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "type";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "MoveType";
                    };
                };
                readonly args: readonly [{
                    readonly name: "type";
                    readonly type: {
                        readonly kind: "NON_NULL";
                        readonly ofType: {
                            readonly kind: "SCALAR";
                            readonly name: "String";
                        };
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "typeByName";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "MoveType";
                    };
                };
                readonly args: readonly [{
                    readonly name: "name";
                    readonly type: {
                        readonly kind: "NON_NULL";
                        readonly ofType: {
                            readonly kind: "SCALAR";
                            readonly name: "String";
                        };
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "verifyZkloginSignature";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "ZkLoginVerifyResult";
                    };
                };
                readonly args: readonly [{
                    readonly name: "author";
                    readonly type: {
                        readonly kind: "NON_NULL";
                        readonly ofType: {
                            readonly kind: "SCALAR";
                            readonly name: "SuiAddress";
                        };
                    };
                }, {
                    readonly name: "bytes";
                    readonly type: {
                        readonly kind: "NON_NULL";
                        readonly ofType: {
                            readonly kind: "SCALAR";
                            readonly name: "Base64";
                        };
                    };
                }, {
                    readonly name: "intentScope";
                    readonly type: {
                        readonly kind: "NON_NULL";
                        readonly ofType: {
                            readonly kind: "ENUM";
                            readonly name: "ZkLoginIntentScope";
                        };
                    };
                }, {
                    readonly name: "signature";
                    readonly type: {
                        readonly kind: "NON_NULL";
                        readonly ofType: {
                            readonly kind: "SCALAR";
                            readonly name: "Base64";
                        };
                    };
                }];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "RandomnessStateCreateTransaction";
            readonly fields: readonly [{
                readonly name: "_";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "Boolean";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "RandomnessStateUpdateTransaction";
            readonly fields: readonly [{
                readonly name: "epoch";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "Epoch";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "randomBytes";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "Base64";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "randomnessObjInitialSharedVersion";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "UInt53";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "randomnessRound";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "UInt53";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "Receiving";
            readonly fields: readonly [{
                readonly name: "address";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "SuiAddress";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "digest";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "object";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "Object";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "version";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "UInt53";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "Result";
            readonly fields: readonly [{
                readonly name: "cmd";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "ix";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "Int";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "SafeMode";
            readonly fields: readonly [{
                readonly name: "enabled";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "Boolean";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "gasSummary";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "GasCostSummary";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "ServiceConfig";
            readonly fields: readonly [{
                readonly name: "defaultPageSize";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "enabledFeatures";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "LIST";
                        readonly ofType: {
                            readonly kind: "NON_NULL";
                            readonly ofType: {
                                readonly kind: "ENUM";
                                readonly name: "Feature";
                            };
                        };
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "isEnabled";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "Boolean";
                    };
                };
                readonly args: readonly [{
                    readonly name: "feature";
                    readonly type: {
                        readonly kind: "NON_NULL";
                        readonly ofType: {
                            readonly kind: "ENUM";
                            readonly name: "Feature";
                        };
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "maxDbQueryCost";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "maxMoveValueDepth";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "maxMultiGetObjectsKeys";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "maxOutputNodes";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "maxPageSize";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "maxQueryDepth";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "maxQueryNodes";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "maxQueryPayloadSize";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "maxScanLimit";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "maxTransactionIds";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "maxTransactionPayloadSize";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "maxTypeArgumentDepth";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "maxTypeArgumentWidth";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "maxTypeNodes";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "mutationTimeoutMs";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "requestTimeoutMs";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "Shared";
            readonly fields: readonly [{
                readonly name: "initialSharedVersion";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "UInt53";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "SharedInput";
            readonly fields: readonly [{
                readonly name: "address";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "SuiAddress";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "initialSharedVersion";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "UInt53";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "mutable";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "Boolean";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "SharedObjectCancelled";
            readonly fields: readonly [{
                readonly name: "address";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "SuiAddress";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "version";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "UInt53";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "SharedObjectDelete";
            readonly fields: readonly [{
                readonly name: "address";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "SuiAddress";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "mutable";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "Boolean";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "version";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "UInt53";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "SharedObjectRead";
            readonly fields: readonly [{
                readonly name: "address";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "SuiAddress";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "digest";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "object";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "Object";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "version";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "UInt53";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "SplitCoinsTransaction";
            readonly fields: readonly [{
                readonly name: "amounts";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "LIST";
                        readonly ofType: {
                            readonly kind: "NON_NULL";
                            readonly ofType: {
                                readonly kind: "UNION";
                                readonly name: "TransactionArgument";
                            };
                        };
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "coin";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "UNION";
                        readonly name: "TransactionArgument";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "ENUM";
            readonly name: "StakeStatus";
            readonly enumValues: readonly [{
                readonly name: "ACTIVE";
                readonly isDeprecated: false;
            }, {
                readonly name: "PENDING";
                readonly isDeprecated: false;
            }, {
                readonly name: "UNSTAKED";
                readonly isDeprecated: false;
            }];
        }, {
            readonly kind: "OBJECT";
            readonly name: "StakeSubsidy";
            readonly fields: readonly [{
                readonly name: "balance";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "BigInt";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "currentDistributionAmount";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "BigInt";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "decreaseRate";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "Int";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "distributionCounter";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "Int";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "periodLength";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "Int";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "StakedSui";
            readonly fields: readonly [{
                readonly name: "activatedEpoch";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "Epoch";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "address";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "SuiAddress";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "balance";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "Balance";
                };
                readonly args: readonly [{
                    readonly name: "type";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "balances";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "BalanceConnection";
                    };
                };
                readonly args: readonly [{
                    readonly name: "after";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "before";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "first";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "last";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "bcs";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "Base64";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "coins";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "CoinConnection";
                    };
                };
                readonly args: readonly [{
                    readonly name: "after";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "before";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "first";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "last";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "type";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "contents";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "MoveValue";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "defaultSuinsName";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "String";
                };
                readonly args: readonly [{
                    readonly name: "format";
                    readonly type: {
                        readonly kind: "ENUM";
                        readonly name: "DomainFormat";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "digest";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "String";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "display";
                readonly type: {
                    readonly kind: "LIST";
                    readonly ofType: {
                        readonly kind: "NON_NULL";
                        readonly ofType: {
                            readonly kind: "OBJECT";
                            readonly name: "DisplayEntry";
                        };
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "dynamicField";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "DynamicField";
                };
                readonly args: readonly [{
                    readonly name: "name";
                    readonly type: {
                        readonly kind: "NON_NULL";
                        readonly ofType: {
                            readonly kind: "INPUT_OBJECT";
                            readonly name: "DynamicFieldName";
                        };
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "dynamicFields";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "DynamicFieldConnection";
                    };
                };
                readonly args: readonly [{
                    readonly name: "after";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "before";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "first";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "last";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "dynamicObjectField";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "DynamicField";
                };
                readonly args: readonly [{
                    readonly name: "name";
                    readonly type: {
                        readonly kind: "NON_NULL";
                        readonly ofType: {
                            readonly kind: "INPUT_OBJECT";
                            readonly name: "DynamicFieldName";
                        };
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "estimatedReward";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "BigInt";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "hasPublicTransfer";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "Boolean";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "objects";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "MoveObjectConnection";
                    };
                };
                readonly args: readonly [{
                    readonly name: "after";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "before";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "filter";
                    readonly type: {
                        readonly kind: "INPUT_OBJECT";
                        readonly name: "ObjectFilter";
                    };
                }, {
                    readonly name: "first";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "last";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "owner";
                readonly type: {
                    readonly kind: "UNION";
                    readonly name: "ObjectOwner";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "poolId";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "SuiAddress";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "previousTransactionBlock";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "TransactionBlock";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "principal";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "BigInt";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "receivedTransactionBlocks";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "TransactionBlockConnection";
                    };
                };
                readonly args: readonly [{
                    readonly name: "after";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "before";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "filter";
                    readonly type: {
                        readonly kind: "INPUT_OBJECT";
                        readonly name: "TransactionBlockFilter";
                    };
                }, {
                    readonly name: "first";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "last";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "scanLimit";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "requestedEpoch";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "Epoch";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "stakeStatus";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "ENUM";
                        readonly name: "StakeStatus";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "stakedSuis";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "StakedSuiConnection";
                    };
                };
                readonly args: readonly [{
                    readonly name: "after";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "before";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "first";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "last";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "status";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "ENUM";
                        readonly name: "ObjectKind";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "storageRebate";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "BigInt";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "suinsRegistrations";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "SuinsRegistrationConnection";
                    };
                };
                readonly args: readonly [{
                    readonly name: "after";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "before";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "first";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "last";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "version";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "UInt53";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [{
                readonly kind: "INTERFACE";
                readonly name: "IMoveObject";
            }, {
                readonly kind: "INTERFACE";
                readonly name: "IObject";
            }, {
                readonly kind: "INTERFACE";
                readonly name: "IOwner";
            }];
        }, {
            readonly kind: "OBJECT";
            readonly name: "StakedSuiConnection";
            readonly fields: readonly [{
                readonly name: "edges";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "LIST";
                        readonly ofType: {
                            readonly kind: "NON_NULL";
                            readonly ofType: {
                                readonly kind: "OBJECT";
                                readonly name: "StakedSuiEdge";
                            };
                        };
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "nodes";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "LIST";
                        readonly ofType: {
                            readonly kind: "NON_NULL";
                            readonly ofType: {
                                readonly kind: "OBJECT";
                                readonly name: "StakedSui";
                            };
                        };
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "pageInfo";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "PageInfo";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "StakedSuiEdge";
            readonly fields: readonly [{
                readonly name: "cursor";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "node";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "StakedSui";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "StorageFund";
            readonly fields: readonly [{
                readonly name: "nonRefundableBalance";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "BigInt";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "totalObjectStorageRebates";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "BigInt";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "StoreExecutionTimeObservationsTransaction";
            readonly fields: readonly [{
                readonly name: "_";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "Boolean";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "SCALAR";
            readonly name: "String";
        }, {
            readonly kind: "SCALAR";
            readonly name: "SuiAddress";
        }, {
            readonly kind: "OBJECT";
            readonly name: "SuinsRegistration";
            readonly fields: readonly [{
                readonly name: "address";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "SuiAddress";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "balance";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "Balance";
                };
                readonly args: readonly [{
                    readonly name: "type";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "balances";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "BalanceConnection";
                    };
                };
                readonly args: readonly [{
                    readonly name: "after";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "before";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "first";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "last";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "bcs";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "Base64";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "coins";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "CoinConnection";
                    };
                };
                readonly args: readonly [{
                    readonly name: "after";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "before";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "first";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "last";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "type";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "contents";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "MoveValue";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "defaultSuinsName";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "String";
                };
                readonly args: readonly [{
                    readonly name: "format";
                    readonly type: {
                        readonly kind: "ENUM";
                        readonly name: "DomainFormat";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "digest";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "String";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "display";
                readonly type: {
                    readonly kind: "LIST";
                    readonly ofType: {
                        readonly kind: "NON_NULL";
                        readonly ofType: {
                            readonly kind: "OBJECT";
                            readonly name: "DisplayEntry";
                        };
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "domain";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "dynamicField";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "DynamicField";
                };
                readonly args: readonly [{
                    readonly name: "name";
                    readonly type: {
                        readonly kind: "NON_NULL";
                        readonly ofType: {
                            readonly kind: "INPUT_OBJECT";
                            readonly name: "DynamicFieldName";
                        };
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "dynamicFields";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "DynamicFieldConnection";
                    };
                };
                readonly args: readonly [{
                    readonly name: "after";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "before";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "first";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "last";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "dynamicObjectField";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "DynamicField";
                };
                readonly args: readonly [{
                    readonly name: "name";
                    readonly type: {
                        readonly kind: "NON_NULL";
                        readonly ofType: {
                            readonly kind: "INPUT_OBJECT";
                            readonly name: "DynamicFieldName";
                        };
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "hasPublicTransfer";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "Boolean";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "objects";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "MoveObjectConnection";
                    };
                };
                readonly args: readonly [{
                    readonly name: "after";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "before";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "filter";
                    readonly type: {
                        readonly kind: "INPUT_OBJECT";
                        readonly name: "ObjectFilter";
                    };
                }, {
                    readonly name: "first";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "last";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "owner";
                readonly type: {
                    readonly kind: "UNION";
                    readonly name: "ObjectOwner";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "previousTransactionBlock";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "TransactionBlock";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "receivedTransactionBlocks";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "TransactionBlockConnection";
                    };
                };
                readonly args: readonly [{
                    readonly name: "after";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "before";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "filter";
                    readonly type: {
                        readonly kind: "INPUT_OBJECT";
                        readonly name: "TransactionBlockFilter";
                    };
                }, {
                    readonly name: "first";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "last";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "scanLimit";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "stakedSuis";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "StakedSuiConnection";
                    };
                };
                readonly args: readonly [{
                    readonly name: "after";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "before";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "first";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "last";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "status";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "ENUM";
                        readonly name: "ObjectKind";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "storageRebate";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "BigInt";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "suinsRegistrations";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "SuinsRegistrationConnection";
                    };
                };
                readonly args: readonly [{
                    readonly name: "after";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "before";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "first";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "last";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "version";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "UInt53";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [{
                readonly kind: "INTERFACE";
                readonly name: "IMoveObject";
            }, {
                readonly kind: "INTERFACE";
                readonly name: "IObject";
            }, {
                readonly kind: "INTERFACE";
                readonly name: "IOwner";
            }];
        }, {
            readonly kind: "OBJECT";
            readonly name: "SuinsRegistrationConnection";
            readonly fields: readonly [{
                readonly name: "edges";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "LIST";
                        readonly ofType: {
                            readonly kind: "NON_NULL";
                            readonly ofType: {
                                readonly kind: "OBJECT";
                                readonly name: "SuinsRegistrationEdge";
                            };
                        };
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "nodes";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "LIST";
                        readonly ofType: {
                            readonly kind: "NON_NULL";
                            readonly ofType: {
                                readonly kind: "OBJECT";
                                readonly name: "SuinsRegistration";
                            };
                        };
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "pageInfo";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "PageInfo";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "SuinsRegistrationEdge";
            readonly fields: readonly [{
                readonly name: "cursor";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "node";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "SuinsRegistration";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "SystemParameters";
            readonly fields: readonly [{
                readonly name: "durationMs";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "BigInt";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "maxValidatorCount";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "Int";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "minValidatorCount";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "Int";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "minValidatorJoiningStake";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "BigInt";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "stakeSubsidyStartEpoch";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "UInt53";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "validatorLowStakeGracePeriod";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "BigInt";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "validatorLowStakeThreshold";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "BigInt";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "validatorVeryLowStakeThreshold";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "BigInt";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "UNION";
            readonly name: "TransactionArgument";
            readonly possibleTypes: readonly [{
                readonly kind: "OBJECT";
                readonly name: "GasCoin";
            }, {
                readonly kind: "OBJECT";
                readonly name: "Input";
            }, {
                readonly kind: "OBJECT";
                readonly name: "Result";
            }];
        }, {
            readonly kind: "OBJECT";
            readonly name: "TransactionBlock";
            readonly fields: readonly [{
                readonly name: "bcs";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "Base64";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "digest";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "String";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "effects";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "TransactionBlockEffects";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "expiration";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "Epoch";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "gasInput";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "GasInput";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "kind";
                readonly type: {
                    readonly kind: "UNION";
                    readonly name: "TransactionBlockKind";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "sender";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "Address";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "signatures";
                readonly type: {
                    readonly kind: "LIST";
                    readonly ofType: {
                        readonly kind: "NON_NULL";
                        readonly ofType: {
                            readonly kind: "SCALAR";
                            readonly name: "Base64";
                        };
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "TransactionBlockConnection";
            readonly fields: readonly [{
                readonly name: "edges";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "LIST";
                        readonly ofType: {
                            readonly kind: "NON_NULL";
                            readonly ofType: {
                                readonly kind: "OBJECT";
                                readonly name: "TransactionBlockEdge";
                            };
                        };
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "nodes";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "LIST";
                        readonly ofType: {
                            readonly kind: "NON_NULL";
                            readonly ofType: {
                                readonly kind: "OBJECT";
                                readonly name: "TransactionBlock";
                            };
                        };
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "pageInfo";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "PageInfo";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "TransactionBlockEdge";
            readonly fields: readonly [{
                readonly name: "cursor";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "node";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "TransactionBlock";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "TransactionBlockEffects";
            readonly fields: readonly [{
                readonly name: "balanceChanges";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "BalanceChangeConnection";
                    };
                };
                readonly args: readonly [{
                    readonly name: "after";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "before";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "first";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "last";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "bcs";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "Base64";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "checkpoint";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "Checkpoint";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "dependencies";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "DependencyConnection";
                    };
                };
                readonly args: readonly [{
                    readonly name: "after";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "before";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "first";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "last";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "epoch";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "Epoch";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "errors";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "String";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "events";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "EventConnection";
                    };
                };
                readonly args: readonly [{
                    readonly name: "after";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "before";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "first";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "last";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "gasEffects";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "GasEffects";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "lamportVersion";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "UInt53";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "objectChanges";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "ObjectChangeConnection";
                    };
                };
                readonly args: readonly [{
                    readonly name: "after";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "before";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "first";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "last";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "status";
                readonly type: {
                    readonly kind: "ENUM";
                    readonly name: "ExecutionStatus";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "timestamp";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "DateTime";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "transactionBlock";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "TransactionBlock";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "unchangedSharedObjects";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "UnchangedSharedObjectConnection";
                    };
                };
                readonly args: readonly [{
                    readonly name: "after";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "before";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "first";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "last";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "INPUT_OBJECT";
            readonly name: "TransactionBlockFilter";
            readonly inputFields: readonly [{
                readonly name: "function";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "String";
                };
            }, {
                readonly name: "kind";
                readonly type: {
                    readonly kind: "ENUM";
                    readonly name: "TransactionBlockKindInput";
                };
            }, {
                readonly name: "afterCheckpoint";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "UInt53";
                };
            }, {
                readonly name: "atCheckpoint";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "UInt53";
                };
            }, {
                readonly name: "beforeCheckpoint";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "UInt53";
                };
            }, {
                readonly name: "affectedAddress";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "SuiAddress";
                };
            }, {
                readonly name: "sentAddress";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "SuiAddress";
                };
            }, {
                readonly name: "inputObject";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "SuiAddress";
                };
            }, {
                readonly name: "changedObject";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "SuiAddress";
                };
            }, {
                readonly name: "transactionIds";
                readonly type: {
                    readonly kind: "LIST";
                    readonly ofType: {
                        readonly kind: "NON_NULL";
                        readonly ofType: {
                            readonly kind: "SCALAR";
                            readonly name: "String";
                        };
                    };
                };
            }];
            readonly isOneOf: false;
        }, {
            readonly kind: "UNION";
            readonly name: "TransactionBlockKind";
            readonly possibleTypes: readonly [{
                readonly kind: "OBJECT";
                readonly name: "AuthenticatorStateUpdateTransaction";
            }, {
                readonly kind: "OBJECT";
                readonly name: "ChangeEpochTransaction";
            }, {
                readonly kind: "OBJECT";
                readonly name: "ConsensusCommitPrologueTransaction";
            }, {
                readonly kind: "OBJECT";
                readonly name: "EndOfEpochTransaction";
            }, {
                readonly kind: "OBJECT";
                readonly name: "GenesisTransaction";
            }, {
                readonly kind: "OBJECT";
                readonly name: "ProgrammableTransactionBlock";
            }, {
                readonly kind: "OBJECT";
                readonly name: "RandomnessStateUpdateTransaction";
            }];
        }, {
            readonly kind: "ENUM";
            readonly name: "TransactionBlockKindInput";
            readonly enumValues: readonly [{
                readonly name: "SYSTEM_TX";
                readonly isDeprecated: false;
            }, {
                readonly name: "PROGRAMMABLE_TX";
                readonly isDeprecated: false;
            }];
        }, {
            readonly kind: "UNION";
            readonly name: "TransactionInput";
            readonly possibleTypes: readonly [{
                readonly kind: "OBJECT";
                readonly name: "OwnedOrImmutable";
            }, {
                readonly kind: "OBJECT";
                readonly name: "Pure";
            }, {
                readonly kind: "OBJECT";
                readonly name: "Receiving";
            }, {
                readonly kind: "OBJECT";
                readonly name: "SharedInput";
            }];
        }, {
            readonly kind: "OBJECT";
            readonly name: "TransactionInputConnection";
            readonly fields: readonly [{
                readonly name: "edges";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "LIST";
                        readonly ofType: {
                            readonly kind: "NON_NULL";
                            readonly ofType: {
                                readonly kind: "OBJECT";
                                readonly name: "TransactionInputEdge";
                            };
                        };
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "nodes";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "LIST";
                        readonly ofType: {
                            readonly kind: "NON_NULL";
                            readonly ofType: {
                                readonly kind: "UNION";
                                readonly name: "TransactionInput";
                            };
                        };
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "pageInfo";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "PageInfo";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "TransactionInputEdge";
            readonly fields: readonly [{
                readonly name: "cursor";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "node";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "UNION";
                        readonly name: "TransactionInput";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "INPUT_OBJECT";
            readonly name: "TransactionMetadata";
            readonly inputFields: readonly [{
                readonly name: "sender";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "SuiAddress";
                };
            }, {
                readonly name: "gasPrice";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "UInt53";
                };
            }, {
                readonly name: "gasObjects";
                readonly type: {
                    readonly kind: "LIST";
                    readonly ofType: {
                        readonly kind: "NON_NULL";
                        readonly ofType: {
                            readonly kind: "INPUT_OBJECT";
                            readonly name: "ObjectRef";
                        };
                    };
                };
            }, {
                readonly name: "gasBudget";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "UInt53";
                };
            }, {
                readonly name: "gasSponsor";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "SuiAddress";
                };
            }];
            readonly isOneOf: false;
        }, {
            readonly kind: "OBJECT";
            readonly name: "TransferObjectsTransaction";
            readonly fields: readonly [{
                readonly name: "address";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "UNION";
                        readonly name: "TransactionArgument";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "inputs";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "LIST";
                        readonly ofType: {
                            readonly kind: "NON_NULL";
                            readonly ofType: {
                                readonly kind: "UNION";
                                readonly name: "TransactionArgument";
                            };
                        };
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "TypeOrigin";
            readonly fields: readonly [{
                readonly name: "definingId";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "SuiAddress";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "module";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "struct";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "SCALAR";
            readonly name: "UInt53";
        }, {
            readonly kind: "UNION";
            readonly name: "UnchangedSharedObject";
            readonly possibleTypes: readonly [{
                readonly kind: "OBJECT";
                readonly name: "SharedObjectCancelled";
            }, {
                readonly kind: "OBJECT";
                readonly name: "SharedObjectDelete";
            }, {
                readonly kind: "OBJECT";
                readonly name: "SharedObjectRead";
            }];
        }, {
            readonly kind: "OBJECT";
            readonly name: "UnchangedSharedObjectConnection";
            readonly fields: readonly [{
                readonly name: "edges";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "LIST";
                        readonly ofType: {
                            readonly kind: "NON_NULL";
                            readonly ofType: {
                                readonly kind: "OBJECT";
                                readonly name: "UnchangedSharedObjectEdge";
                            };
                        };
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "nodes";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "LIST";
                        readonly ofType: {
                            readonly kind: "NON_NULL";
                            readonly ofType: {
                                readonly kind: "UNION";
                                readonly name: "UnchangedSharedObject";
                            };
                        };
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "pageInfo";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "PageInfo";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "UnchangedSharedObjectEdge";
            readonly fields: readonly [{
                readonly name: "cursor";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "node";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "UNION";
                        readonly name: "UnchangedSharedObject";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "UpgradeTransaction";
            readonly fields: readonly [{
                readonly name: "currentPackage";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "SuiAddress";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "dependencies";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "LIST";
                        readonly ofType: {
                            readonly kind: "NON_NULL";
                            readonly ofType: {
                                readonly kind: "SCALAR";
                                readonly name: "SuiAddress";
                            };
                        };
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "modules";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "LIST";
                        readonly ofType: {
                            readonly kind: "NON_NULL";
                            readonly ofType: {
                                readonly kind: "SCALAR";
                                readonly name: "Base64";
                            };
                        };
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "upgradeTicket";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "UNION";
                        readonly name: "TransactionArgument";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "Validator";
            readonly fields: readonly [{
                readonly name: "address";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "Address";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "apy";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "Int";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "atRisk";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "UInt53";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "commissionRate";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "Int";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "credentials";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "ValidatorCredentials";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "description";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "String";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "exchangeRates";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "MoveObject";
                };
                readonly args: readonly [];
                readonly isDeprecated: true;
            }, {
                readonly name: "exchangeRatesSize";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "UInt53";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "exchangeRatesTable";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "Owner";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "gasPrice";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "BigInt";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "imageUrl";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "String";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "name";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "String";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "nextEpochCommissionRate";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "Int";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "nextEpochCredentials";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "ValidatorCredentials";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "nextEpochGasPrice";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "BigInt";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "nextEpochStake";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "BigInt";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "operationCap";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "MoveObject";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "pendingPoolTokenWithdraw";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "BigInt";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "pendingStake";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "BigInt";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "pendingTotalSuiWithdraw";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "BigInt";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "poolTokenBalance";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "BigInt";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "projectUrl";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "String";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "reportRecords";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "AddressConnection";
                    };
                };
                readonly args: readonly [{
                    readonly name: "after";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "before";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "first";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "last";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "rewardsPool";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "BigInt";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "stakingPool";
                readonly type: {
                    readonly kind: "OBJECT";
                    readonly name: "MoveObject";
                };
                readonly args: readonly [];
                readonly isDeprecated: true;
            }, {
                readonly name: "stakingPoolActivationEpoch";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "UInt53";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "stakingPoolId";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "SuiAddress";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "stakingPoolSuiBalance";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "BigInt";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "votingPower";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "Int";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "ValidatorConnection";
            readonly fields: readonly [{
                readonly name: "edges";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "LIST";
                        readonly ofType: {
                            readonly kind: "NON_NULL";
                            readonly ofType: {
                                readonly kind: "OBJECT";
                                readonly name: "ValidatorEdge";
                            };
                        };
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "nodes";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "LIST";
                        readonly ofType: {
                            readonly kind: "NON_NULL";
                            readonly ofType: {
                                readonly kind: "OBJECT";
                                readonly name: "Validator";
                            };
                        };
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "pageInfo";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "PageInfo";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "ValidatorCredentials";
            readonly fields: readonly [{
                readonly name: "netAddress";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "String";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "networkPubKey";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "Base64";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "p2PAddress";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "String";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "primaryAddress";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "String";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "proofOfPossession";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "Base64";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "protocolPubKey";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "Base64";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "workerAddress";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "String";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "workerPubKey";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "Base64";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "ValidatorEdge";
            readonly fields: readonly [{
                readonly name: "cursor";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "node";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "Validator";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "OBJECT";
            readonly name: "ValidatorSet";
            readonly fields: readonly [{
                readonly name: "activeValidators";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "OBJECT";
                        readonly name: "ValidatorConnection";
                    };
                };
                readonly args: readonly [{
                    readonly name: "after";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "before";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "String";
                    };
                }, {
                    readonly name: "first";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }, {
                    readonly name: "last";
                    readonly type: {
                        readonly kind: "SCALAR";
                        readonly name: "Int";
                    };
                }];
                readonly isDeprecated: false;
            }, {
                readonly name: "inactivePoolsId";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "SuiAddress";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "inactivePoolsSize";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "Int";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "pendingActiveValidatorsId";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "SuiAddress";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "pendingActiveValidatorsSize";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "Int";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "pendingRemovals";
                readonly type: {
                    readonly kind: "LIST";
                    readonly ofType: {
                        readonly kind: "NON_NULL";
                        readonly ofType: {
                            readonly kind: "SCALAR";
                            readonly name: "Int";
                        };
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "stakingPoolMappingsId";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "SuiAddress";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "stakingPoolMappingsSize";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "Int";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "totalStake";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "BigInt";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "validatorCandidatesId";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "SuiAddress";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "validatorCandidatesSize";
                readonly type: {
                    readonly kind: "SCALAR";
                    readonly name: "Int";
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }, {
            readonly kind: "ENUM";
            readonly name: "ZkLoginIntentScope";
            readonly enumValues: readonly [{
                readonly name: "TRANSACTION_DATA";
                readonly isDeprecated: false;
            }, {
                readonly name: "PERSONAL_MESSAGE";
                readonly isDeprecated: false;
            }];
        }, {
            readonly kind: "OBJECT";
            readonly name: "ZkLoginVerifyResult";
            readonly fields: readonly [{
                readonly name: "errors";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "LIST";
                        readonly ofType: {
                            readonly kind: "NON_NULL";
                            readonly ofType: {
                                readonly kind: "SCALAR";
                                readonly name: "String";
                            };
                        };
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }, {
                readonly name: "success";
                readonly type: {
                    readonly kind: "NON_NULL";
                    readonly ofType: {
                        readonly kind: "SCALAR";
                        readonly name: "Boolean";
                    };
                };
                readonly args: readonly [];
                readonly isDeprecated: false;
            }];
            readonly interfaces: readonly [];
        }];
        readonly directives: readonly [];
    };
};
export { introspection };
