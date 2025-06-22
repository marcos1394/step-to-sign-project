import type { TypedDocumentNode } from '@graphql-typed-document-node/core';
import type { TadaDocumentNode } from 'gql.tada';
import type { DocumentNode } from 'graphql';
import { Experimental_BaseClient } from '../experimental/index.js';
import type { Experimental_SuiClientTypes } from '../experimental/index.js';
import { GraphQLTransport } from '../experimental/transports/graphql.js';
import type { TypedDocumentString } from './generated/queries.js';
export type GraphQLDocument<Result = Record<string, unknown>, Variables = Record<string, unknown>> = string | DocumentNode | TypedDocumentString<Result, Variables> | TypedDocumentNode<Result, Variables> | TadaDocumentNode<Result, Variables>;
export type GraphQLQueryOptions<Result = Record<string, unknown>, Variables = Record<string, unknown>> = {
    query: GraphQLDocument<Result, Variables>;
    operationName?: string;
    extensions?: Record<string, unknown>;
    signal?: AbortSignal;
} & (Variables extends {
    [key: string]: never;
} ? {
    variables?: Variables;
} : {
    variables: Variables;
});
export type GraphQLQueryResult<Result = Record<string, unknown>> = {
    data?: Result;
    errors?: GraphQLResponseErrors;
    extensions?: Record<string, unknown>;
};
export type GraphQLResponseErrors = Array<{
    message: string;
    locations?: {
        line: number;
        column: number;
    }[];
    path?: (string | number)[];
}>;
export interface SuiGraphQLClientOptions<Queries extends Record<string, GraphQLDocument>> {
    url: string;
    fetch?: typeof fetch;
    headers?: Record<string, string>;
    queries?: Queries;
    network?: Experimental_SuiClientTypes.Network;
    mvr?: Experimental_SuiClientTypes.MvrOptions;
}
export declare class SuiGraphQLRequestError extends Error {
}
export declare class SuiGraphQLClient<Queries extends Record<string, GraphQLDocument> = {}> extends Experimental_BaseClient {
    #private;
    core: GraphQLTransport;
    constructor({ url, fetch: fetchFn, headers, queries, network, mvr, }: SuiGraphQLClientOptions<Queries>);
    query<Result = Record<string, unknown>, Variables = Record<string, unknown>>(options: GraphQLQueryOptions<Result, Variables>): Promise<GraphQLQueryResult<Result>>;
    execute<const Query extends Extract<keyof Queries, string>, Result = Queries[Query] extends GraphQLDocument<infer R, unknown> ? R : Record<string, unknown>, Variables = Queries[Query] extends GraphQLDocument<unknown, infer V> ? V : Record<string, unknown>>(query: Query, options: Omit<GraphQLQueryOptions<Result, Variables>, 'query'>): Promise<GraphQLQueryResult<Result>>;
}
