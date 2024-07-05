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
/*
  Example Call:
  1. Type Example:
    const type = "LEGACY"; // Replace with the actual type of sign request
    
  2. Additional Data Example:
    const additionalData = {
      to: "0xReceiverAddressHere",
      value: "1000000000000000000", // 1 ETH in wei
      data: "0x" // Optional data field
    };
    
  3. Function Call:
    const signatureJson = { sign_str: "signature_string_here" };
    const hash = "keccak_hash_here";
    const nonce = "nonce_value_here";
    const network = "network_name_here";

    postSign(type, additionalData, signatureJson, hash, nonce).then(responseData => {
      if (responseData !== null) {
        console.log("postSign Response:", responseData);
      } else {
        console.log("Failed to post sign request.");
      }
    });

  Function Description:
  - type: Type of sign request
  - additionalData: Additional data for the sign request (e.g., to, value, data)
  - signatureJson: Signature JSON data (string)
  - hash: Keccak hash of the data
  - nonce: Transaction nonce
  - accessToken: API access token (Retrieved from `token.json`)
  - uid: User ID (Retrieved from `token.json`)
  - wid: Wallet ID (Retrieved from `token.json`)
  - sid: Session ID (Retrieved from `token.json`)
  - network: Network type (Retrieved from `token.json`)
  - response.data: Response data from the post sign API
*/
/*
  예제 호출 방법:
  1. 유형 예제:
    const type = "LEGACY"; // 실제 서명 요청 유형으로 대체
    
  2. 추가 데이터 예제:
    const additionalData = {
      to: "0xReceiverAddressHere",
      value: "1000000000000000000", // 1 ETH를 wei로 표시
      data: "0x" // 선택적 데이터 필드
    };
    
  3. 함수 호출:
    const signatureJson = { sign_str: "signature_string_here" };
    const hash = "keccak_hash_here";
    const nonce = "nonce_value_here";

    postSign(type, additionalData, signatureJson, hash, nonce).then(responseData => {
      if (responseData !== null) {
        console.log("postSign Response:", responseData);
      } else {
        console.log("Failed to post sign request.");
      }
    });

  함수 설명:
  - type: 서명 요청 유형
  - additionalData: 서명 요청에 필요한 추가 데이터 (예: to, value, data)
  - signatureJson: 서명 JSON 데이터 (문자열)
  - hash: 데이터의 Keccak 해시
  - nonce: 트랜잭션의 nonce
  - accessToken: API 접근 토큰 (`token.json`에서 가져옴)
  - uid: 사용자 ID (`token.json`에서 가져옴)
  - wid: 지갑 ID (`token.json`에서 가져옴)
  - sid: 세션 ID (`token.json`에서 가져옴)
  - network: 네트워크 유형 (`token.json`에서 가져옴)
  - response.data: 포스트 서명 API의 응답 데이터
*/
