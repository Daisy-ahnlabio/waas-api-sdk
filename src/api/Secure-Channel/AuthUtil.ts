import axios from "axios";
import CryptoJS from "crypto-js";
import { ec as EC } from "elliptic";
import queryString from "querystring";

interface SecureChannelInfo {
  channelid: string;
  secretKey: string;
}

interface AbcCreateSecureChannelResponse {
  channelid: string;
  publickey: string;
  encrypted: string;
}

const ec = new EC("p256");

let cachedSecureChannel: SecureChannelInfo | null = null;

/**
 * Retrieves secure channel information.
 * @async
 * @function getSecureChannel
 * @returns {Promise<SecureChannelInfo>} - Promise that resolves to the secure channel information.
 * @throws {Error} - Throws an error if channel creation fails or decryption errors occur.
 */
const getSecureChannel = async (): Promise<SecureChannelInfo> => {
  if (cachedSecureChannel) {
    return cachedSecureChannel;
  }

  const mykey = ec.genKeyPair();
  const pubkey = mykey.getPublic().encode("hex", false);

  const response = await axios.post(
    `${process.env.REACT_APP_WAASURL}/secure/channel/create`,
    queryString.stringify({
      pubkey,
      plain: "testplaintext",
    }),
    {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }
  );

  if (response.status !== 200) {
    throw new Error(
      `Security channel creation failed with status: ${response.status}`
    );
  }

  const { channelid, publickey, encrypted } =
    response.data as AbcCreateSecureChannelResponse;
  const serverKey = ec.keyFromPublic(publickey, "hex");
  const sharedSecret = serverKey.getPublic().mul(mykey.getPrivate()).getX();
  const secretKey = sharedSecret.toString(16).padStart(64, "0");

  cachedSecureChannel = { channelid, secretKey };

  const decryptedText = await decrypt(encrypted, secretKey);
  if (decryptedText !== "testplaintext") {
    throw new Error("Decryption error");
  }

  return cachedSecureChannel;
};

/**
 * Encrypts a given string.
 * @async
 * @function encrypt
 * @param {string} plain - String to be encrypted.
 * @returns {Promise<string>} - Promise that resolves to the encrypted string.
 */
const encrypt = async (plain: string): Promise<string> => {
  const { secretKey } = await getSecureChannel();
  const key = CryptoJS.enc.Hex.parse(secretKey.substring(0, 32));
  const iv = CryptoJS.enc.Hex.parse(secretKey.substring(32));

  const encrypted = CryptoJS.AES.encrypt(plain, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  return encrypted.toString();
};

/**
 * Decrypts a given encrypted text.
 * @async
 * @function decrypt
 * @param {string} encrypted - Encrypted text to decrypt.
 * @param {string} secretKey - Shared secret key used for decryption.
 * @returns {Promise<string>} - Promise that resolves to the decrypted string.
 */
const decrypt = async (
  encrypted: string,
  secretKey: string
): Promise<string> => {
  const key = CryptoJS.enc.Hex.parse(secretKey.substring(0, 32));
  const iv = CryptoJS.enc.Hex.parse(secretKey.substring(32));

  const decrypted = CryptoJS.AES.decrypt(encrypted, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  return decrypted.toString(CryptoJS.enc.Utf8);
};

export { getSecureChannel, encrypt, decrypt };
