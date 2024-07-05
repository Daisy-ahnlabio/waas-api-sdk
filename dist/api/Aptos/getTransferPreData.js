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
const axios_1 = __importDefault(require("axios"));
const chalk_1 = __importDefault(require("chalk"));
const getTransferPreData = (accessToken, network, sender, receiver, amount) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.post(`${process.env.REACT_APP_WAASURL}/wapi/v2/aptos/transfer/pre`, {
            sender,
            receiver,
            amount,
            network,
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        if (response.status === 200) {
            console.log(chalk_1.default.green("Successfully retrieved transfer pre-data"));
            console.log(chalk_1.default.green("Transfer Pre-Data:"), chalk_1.default.blue(JSON.stringify(response.data, null, 2)));
            return response.data;
        }
        else {
            console.error(chalk_1.default.red(`Failed. HTTP Status: ${response.status}`));
            return null;
        }
    }
    catch (error) {
        console.error(chalk_1.default.red("Failed to get transfer pre-data:"), chalk_1.default.yellow(error.message));
        return null;
    }
});
exports.default = getTransferPreData;
