interface SecureChannelInfo {
    channelid: string;
    secretKey: string;
}
/**
 * Retrieves secure channel information.
 * @async
 * @function getSecureChannel
 * @returns {Promise<SecureChannelInfo>} - Promise that resolves to the secure channel information.
 * @throws {Error} - Throws an error if channel creation fails or decryption errors occur.
 */
declare const getSecureChannel: () => Promise<SecureChannelInfo>;
/**
 * Encrypts a given string.
 * @async
 * @function encrypt
 * @param {string} plain - String to be encrypted.
 * @returns {Promise<string>} - Promise that resolves to the encrypted string.
 */
declare const encrypt: (plain: string) => Promise<string>;
/**
 * Decrypts a given encrypted text.
 * @async
 * @function decrypt
 * @param {string} encrypted - Encrypted text to decrypt.
 * @param {string} secretKey - Shared secret key used for decryption.
 * @returns {Promise<string>} - Promise that resolves to the decrypted string.
 */
declare const decrypt: (encrypted: string, secretKey: string) => Promise<string>;
export { getSecureChannel, encrypt, decrypt };
