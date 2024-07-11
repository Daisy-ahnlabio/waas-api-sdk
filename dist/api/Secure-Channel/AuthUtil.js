"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrypt = exports.encrypt = exports.getSecureChannel = void 0;
const axios_1 = __importDefault(require("axios"));
const crypto_js_1 = __importDefault(require("crypto-js"));
const elliptic_1 = require("elliptic");
const querystring_1 = __importDefault(require("querystring"));
const ec = new elliptic_1.ec("p256");
let cachedSecureChannel = null;
/**
 * Retrieves secure channel information.
 * @async
 * @function getSecureChannel
 * @returns {Promise<SecureChannelInfo>} - Promise that resolves to the secure channel information.
 * @throws {Error} - Throws an error if channel creation fails or decryption errors occur.
 */
const getSecureChannel = () => __awaiter(void 0, void 0, void 0, function* () {
    if (cachedSecureChannel) {
        return cachedSecureChannel;
    }
    const mykey = ec.genKeyPair();
    const pubkey = mykey.getPublic().encode("hex", false);
    const response = yield axios_1.default.post(`${process.env.REACT_APP_WAASURL}/secure/channel/create`, querystring_1.default.stringify({
        pubkey,
        plain: "testplaintext",
    }), {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    if (response.status !== 200) {
        throw new Error(`Security channel creation failed with status: ${response.status}`);
    }
    const { channelid, publickey, encrypted } = response.data;
    const serverKey = ec.keyFromPublic(publickey, "hex");
    const sharedSecret = serverKey.getPublic().mul(mykey.getPrivate()).getX();
    const secretKey = sharedSecret.toString(16).padStart(64, "0");
    cachedSecureChannel = { channelid, secretKey };
    const decryptedText = yield decrypt(encrypted, secretKey);
    if (decryptedText !== "testplaintext") {
        throw new Error("Decryption error");
    }
    return cachedSecureChannel;
});
exports.getSecureChannel = getSecureChannel;
/**
 * Encrypts a given string.
 * @async
 * @function encrypt
 * @param {string} plain - String to be encrypted.
 * @returns {Promise<string>} - Promise that resolves to the encrypted string.
 */
const encrypt = (plain) => __awaiter(void 0, void 0, void 0, function* () {
    const { secretKey } = yield getSecureChannel();
    const key = crypto_js_1.default.enc.Hex.parse(secretKey.substring(0, 32));
    const iv = crypto_js_1.default.enc.Hex.parse(secretKey.substring(32));
    const encrypted = crypto_js_1.default.AES.encrypt(plain, key, {
        iv,
        mode: crypto_js_1.default.mode.CBC,
        padding: crypto_js_1.default.pad.Pkcs7,
    });
    return encrypted.toString();
});
exports.encrypt = encrypt;
/**
 * Decrypts a given encrypted text.
 * @async
 * @function decrypt
 * @param {string} encrypted - Encrypted text to decrypt.
 * @param {string} secretKey - Shared secret key used for decryption.
 * @returns {Promise<string>} - Promise that resolves to the decrypted string.
 */
const decrypt = (encrypted, secretKey) => __awaiter(void 0, void 0, void 0, function* () {
    const key = crypto_js_1.default.enc.Hex.parse(secretKey.substring(0, 32));
    const iv = crypto_js_1.default.enc.Hex.parse(secretKey.substring(32));
    const decrypted = crypto_js_1.default.AES.decrypt(encrypted, key, {
        iv,
        mode: crypto_js_1.default.mode.CBC,
        padding: crypto_js_1.default.pad.Pkcs7,
    });
    return decrypted.toString(crypto_js_1.default.enc.Utf8);
});
exports.decrypt = decrypt;
