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
const sendVerificationCode = (email, lang = "en", template = "verify") => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(`${process.env.REACT_APP_BASEURL}/member/mail-service/${email}/sendcode`, {
            params: { lang, template },
        });
        if (response.status === 200) {
            console.log(chalk_1.default.green("Verification code sent successfully."));
        }
        else {
            console.error(chalk_1.default.red("Unexpected response status: "), response.status);
            throw new Error(`Unexpected response status: ${response.status}`);
        }
    }
    catch (error) {
        if (axios_1.default.isAxiosError(error)) {
            if (error.response) {
                console.error(chalk_1.default.red(`Error: ${error.message}`), chalk_1.default.red(`HTTP Status: ${error.response.status}`), chalk_1.default.red(`Response Data: ${JSON.stringify(error.response.data)}`));
                throw new Error(error.response.data.msg || error.message);
            }
            else if (error.request) {
                console.error(chalk_1.default.red(`Error: ${error.message}`), chalk_1.default.red("No response received from the server."));
                throw new Error("No response received from the server.");
            }
            else {
                console.error(chalk_1.default.red(`Error: ${error.message}`), chalk_1.default.red("An error occurred while setting up the request."));
                throw new Error("An error occurred while setting up the request.");
            }
        }
        else {
            console.error(chalk_1.default.red(`Error: ${error.message}`), chalk_1.default.red("An unknown error occurred."));
            throw new Error("An unknown error occurred.");
        }
    }
});
exports.default = sendVerificationCode;
