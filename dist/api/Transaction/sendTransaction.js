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
const axios_1 = __importDefault(require("axios"));
const sendTransaction = (accessToken, network, serializedTx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = qs_1.default.stringify({
            signedSerializeTx: serializedTx,
            network: network,
        });
        const response = yield axios_1.default.post(`${process.env.REACT_APP_WAASURL}/wapi/v2/transactions/raw-tx/send`, data, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        if (response.status === 200) {
            console.log(chalk_1.default.green("Transaction sent successfully:"), chalk_1.default.blue(response.data.result));
            return response.data.result;
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
exports.default = sendTransaction;