import type { ObjectResponseError } from '../client/index.js';
export declare class SuiClientError extends Error {
}
export declare class ObjectError extends SuiClientError {
    code: string;
    constructor(code: string, message: string);
    static fromResponse(response: ObjectResponseError, objectId?: string): ObjectError;
}
