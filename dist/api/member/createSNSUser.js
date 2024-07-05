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
const qs_1 = __importDefault(require("qs"));
const dotenv_1 = __importDefault(require("dotenv"));
const chalk_1 = __importDefault(require("chalk"));
dotenv_1.default.config();
function createSNSUser(username, code, joinPath, socialType, overage, agree, collect, thirdparty, advertise) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = qs_1.default.stringify({
                username,
                code,
                serviceid: process.env.REACT_APP_SERVICE_ID,
                joinpath: joinPath,
                socialtype: socialType,
                overage,
                agree,
                collect,
                thirdparty,
                advertise,
            });
            const response = yield axios_1.default.post(`${process.env.REACT_APP_BASEURL}/member/user-management/v2/join`, data, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Authorization: process.env.REACT_APP_AUTHORIZATION,
                },
            });
            if (response.status === 201) {
                console.log(chalk_1.default.green("SNS user created successfully."));
            }
            else {
                console.error(chalk_1.default.red("Unexpected response status: "), response.status);
                throw new Error(`Unexpected response status: ${response.status}`);
            }
        }
        catch (error) {
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
    });
}
exports.default = createSNSUser;
