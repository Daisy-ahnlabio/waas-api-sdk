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
const qs_1 = __importDefault(require("qs"));
const chalk_1 = __importDefault(require("chalk"));
const Gas_1 = require("../Gas");
const axios_1 = __importDefault(require("axios"));
const postSign = (accessToken, network, type, additionalData = {}, signatureJson, // signatureJson을 string으로 처리
hash, nonce, uid, wid, sid) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postData = Object.assign({ uid,
            wid,
            sid,
            type,
            network, from: sid, hashHex: hash, nonce }, additionalData);
        if (["LEGACY", "EIP1559"].includes(type)) {
            if (type === "LEGACY") {
                const gasInfo = yield (0, Gas_1.fetchGasPrice)(accessToken, network);
                if (gasInfo) {
                    postData.gasPrice = gasInfo.gasPrice;
                    postData.gasLimit = gasInfo.gasLimit;
                }
            }
            if (type === "EIP1559") {
                const gasInfo = yield (0, Gas_1.fetchSuggestedGasFees)(accessToken, network);
                if (gasInfo) {
                    postData.maxPriorityFeePerGas = gasInfo.maxPriorityFeePerGas;
                    postData.maxFeePerGas = gasInfo.maxFeePerGas;
                }
            }
        }
        const enhancedSignatureJson = {
            signstr: signatureJson.sign_str,
        };
        // qs.stringify를 사용하여 쿼리 문자열 생성
        let formBody = qs_1.default.stringify(postData);
        // enhancedSignatureJson을 JSON 문자열로 변환하여 직접 추가
        formBody += `&signatureJson=${encodeURIComponent(JSON.stringify(enhancedSignatureJson))}`;
        const response = yield axios_1.default.post(`${process.env.REACT_APP_WAASURL}/wapi/v2/sign/post`, formBody, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Bearer ${accessToken}`,
            },
        });
        if (response.status === 200) {
            console.log(chalk_1.default.green("postSign Response:"), chalk_1.default.blue(JSON.stringify(response.data, null, 2)));
            return response.data;
        }
        else {
            console.error(chalk_1.default.red(`Failed. HTTP Status: ${response.status}`));
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
exports.default = postSign;
