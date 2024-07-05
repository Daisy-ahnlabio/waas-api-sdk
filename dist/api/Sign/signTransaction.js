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
exports.signTransaction = void 0;
const qs_1 = __importDefault(require("qs"));
const chalk_1 = __importDefault(require("chalk"));
const AuthUtil_1 = require("../Secure-Channel/AuthUtil");
const fetchGasPrice_1 = __importDefault(require("../Gas/fetchGasPrice"));
const fetchSuggestedGasFees_1 = __importDefault(require("../Gas/fetchSuggestedGasFees"));
const axios_1 = __importDefault(require("axios"));
function signTransaction(accessToken, network, type, to, pvencstr, encryptDevicePassword, uid, wid, sid, value, message) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { channelid } = yield (0, AuthUtil_1.getSecureChannel)();
            const encryptedWid = yield (0, AuthUtil_1.encrypt)(wid);
            const encryptedPvencstr = yield (0, AuthUtil_1.encrypt)(pvencstr);
            const encryptedDevicePassword = yield (0, AuthUtil_1.encrypt)(encryptDevicePassword);
            // 초기 payload 설정
            let payload = {
                to,
                from: sid,
                network: network,
                uid,
                wid: encryptedWid,
                sid,
                pvencstr: encryptedPvencstr,
                encryptDevicePassword: encryptedDevicePassword,
                value,
                type,
                message,
            };
            if (type === "LEGACY") {
                const gasInfo = yield (0, fetchGasPrice_1.default)(accessToken, network);
                if (gasInfo) {
                    payload = Object.assign(Object.assign({}, payload), { gasPrice: gasInfo.gasPrice, gasLimit: gasInfo.gasLimit });
                }
            }
            else if (type === "EIP1559") {
                const gasInfo = yield (0, fetchSuggestedGasFees_1.default)(accessToken, network);
                if (gasInfo) {
                    payload = Object.assign(Object.assign({}, payload), { maxPriorityFeePerGas: gasInfo.maxPriorityFeePerGas, maxFeePerGas: gasInfo.maxFeePerGas });
                }
            }
            const signResponse = yield axios_1.default.post(`${process.env.REACT_APP_WAASURL}/wapi/v2/sign`, qs_1.default.stringify(payload), {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Secure-Channel": channelid,
                },
            });
            if (signResponse.status === 200) {
                console.log(chalk_1.default.green("Transaction signed successfully:"), chalk_1.default.blue(JSON.stringify(signResponse.data, null, 2)));
                const { serializedTx } = signResponse.data;
                return serializedTx;
            }
            else {
                console.error(chalk_1.default.red(`Failed. HTTP Status: ${signResponse.status}`));
                return null;
            }
        }
        catch (error) {
            if (error.response) {
                console.error(chalk_1.default.red(`Error: ${error.message}`), chalk_1.default.red(`HTTP Status: ${error.response.status}`), chalk_1.default.red(`Response Data: ${JSON.stringify(error.response.data)}`));
            }
            else if (error.request) {
                console.error(chalk_1.default.red(`Error: ${error.message}`), chalk_1.default.red("No response received from the server."));
            }
            else {
                console.error(chalk_1.default.red(`Error: ${error.message}`), chalk_1.default.red("An error occurred while setting up the request."));
            }
            return null;
        }
    });
}
exports.signTransaction = signTransaction;
exports.default = signTransaction;
