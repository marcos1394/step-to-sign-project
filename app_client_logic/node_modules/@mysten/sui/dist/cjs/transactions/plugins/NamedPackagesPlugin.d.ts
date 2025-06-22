import type { BuildTransactionOptions } from '../resolve.js';
import type { TransactionDataBuilder } from '../TransactionData.js';
import type { NamedPackagesOverrides } from '../../experimental/mvr.js';
export type NamedPackagesPluginOptions = {
    /**
     * The URL of the MVR API to use for resolving names.
     */
    url: string;
    /**
     * The number of names to resolve in each batch request.
     * Needs to be calculated based on the GraphQL query limits.
     */
    pageSize?: number;
    /**
     * Local overrides for the resolution plugin. Pass this to pre-populate
     * the cache with known packages / types (especially useful for local or CI testing).
     *
     * The type cache expects ONLY first-level types to ensure the cache is more composable.
     *
     * 	Expected format example:
     *  {
     * 		packages: {
     * 			'@framework/std': '0x1234',
     * 		},
     * 		types: {
     * 			'@framework/std::string::String': '0x1234::string::String',
     * 		},
     * 	}
     *
     */
    overrides?: NamedPackagesOverrides;
};
/**
 * @experimental This plugin is in experimental phase and there might be breaking changes in the future
 *
 * Adds named resolution so that you can use .move names in your transactions.
 * e.g. `@org/app::type::Type` will be resolved to `0x1234::type::Type`.
 * This plugin will resolve all names & types in the transaction block.
 *
 * To install this plugin globally in your app, use:
 * ```
 * Transaction.registerGlobalSerializationPlugin("namedPackagesPlugin", namedPackagesPlugin({ suiGraphQLClient }));
 * ```
 *
 * You can also define `overrides` to pre-populate name resolutions locally (removes the GraphQL request).
 */
export declare const namedPackagesPlugin: (options?: NamedPackagesPluginOptions) => (transactionData: TransactionDataBuilder, buildOptions: BuildTransactionOptions, next: () => Promise<void>) => Promise<void>;
export declare function getClient(options: BuildTransactionOptions): import("../../experimental/core.js").ClientWithCoreApi;
