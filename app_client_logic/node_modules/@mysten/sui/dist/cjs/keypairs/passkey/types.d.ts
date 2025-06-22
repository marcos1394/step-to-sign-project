/**
 * The value returned from navigator.credentials.get()
 */
export interface AuthenticationCredential extends PublicKeyCredential {
    response: AuthenticatorAssertionResponse;
}
/**
 * The value returned from navigator.credentials.create()
 */
export interface RegistrationCredential extends PublicKeyCredential {
    response: AuthenticatorAttestationResponse;
}
