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
const dotenv_1 = __importDefault(require("dotenv"));
const axios_1 = __importDefault(require("axios"));
const AuthUtil_1 = require("../Secure-Channel/AuthUtil");
const qs_1 = __importDefault(require("qs"));
const chalk_1 = __importDefault(require("chalk"));
dotenv_1.default.config();
function login(email, password, network) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { channelid } = yield (0, AuthUtil_1.getSecureChannel)();
            const encryptedData = yield (0, AuthUtil_1.encrypt)(password);
            const data = qs_1.default.stringify({
                grant_type: "password",
                username: email,
                password: encryptedData,
                audience: process.env.REACT_APP_SERVICE_ID,
            });
            const response = yield axios_1.default.post(`${process.env.REACT_APP_BASEURL}/auth/auth-service/v2/login`, data, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Accept-Language": "ko",
                    "Secure-Channel": channelid,
                    Authorization: process.env.REACT_APP_AUTHORIZATION,
                },
            });
            if (response.status === 200) {
                const tokens = response.data;
                console.log(chalk_1.default.green("Login successful."));
                const WalletInfo = {
                    email: email,
                    network: network,
                    access_token: tokens.access_token,
                    refresh_token: tokens.refresh_token,
                };
                console.log(chalk_1.default.green("Data saved to token.json"), chalk_1.default.blue(JSON.stringify(WalletInfo, null, 2)));
            }
            else {
                console.error(chalk_1.default.red(`Login failed with status code: ${response.status}`));
            }
        }
        catch (error) {
            if (axios_1.default.isAxiosError(error)) {
                console.error(chalk_1.default.red("Login failed with Axios error:"));
                console.error(chalk_1.default.red("Status:"), chalk_1.default.red((_a = error.response) === null || _a === void 0 ? void 0 : _a.status));
                console.error(chalk_1.default.red("Status text:"), chalk_1.default.red((_b = error.response) === null || _b === void 0 ? void 0 : _b.statusText));
                console.error(chalk_1.default.red("Data:"), chalk_1.default.red(JSON.stringify((_c = error.response) === null || _c === void 0 ? void 0 : _c.data, null, 2)));
            }
            else {
                console.error(chalk_1.default.red("Login failed with error:"), chalk_1.default.red(error.message));
            }
        }
    });
}
exports.default = login;
