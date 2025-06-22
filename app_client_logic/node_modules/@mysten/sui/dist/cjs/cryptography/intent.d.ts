import { bcs } from '../bcs/index.js';
export type IntentScope = Exclude<keyof typeof bcs.IntentScope.$inferType, '$kind'>;
/**
 * Inserts a domain separator for a message that is being signed
 */
export declare function messageWithIntent(scope: IntentScope, message: Uint8Array): Uint8Array<ArrayBufferLike>;
