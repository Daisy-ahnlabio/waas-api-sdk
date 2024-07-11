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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var AuthUtil_1 = require("../Secure-Channel/AuthUtil");
var qs_1 = __importDefault(require("qs"));
var chalk_1 = __importDefault(require("chalk"));
function login(email, password) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function () {
        var channelid, encryptedData, data, response, tokens, WalletInfo, error_1;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, (0, AuthUtil_1.getSecureChannel)()];
                case 1:
                    channelid = (_d.sent()).channelid;
                    return [4 /*yield*/, (0, AuthUtil_1.encrypt)(password)];
                case 2:
                    encryptedData = _d.sent();
                    data = qs_1.default.stringify({
                        grant_type: "password",
                        username: email,
                        password: encryptedData,
                        audience: process.env.REACT_APP_SERVICE_ID,
                    });
                    return [4 /*yield*/, axios_1.default.post("".concat(process.env.REACT_APP_WAASURL, "/auth/auth-service/v2/login"), data, {
                            headers: {
                                "Content-Type": "application/x-www-form-urlencoded",
                                "Accept-Language": "ko",
                                "Secure-Channel": channelid,
                                Authorization: process.env.REACT_APP_AUTHORIZATION,
                            },
                        })];
                case 3:
                    response = _d.sent();
                    if (response.status === 200) {
                        tokens = response.data;
                        console.log(chalk_1.default.green("Login successful."));
                        WalletInfo = {
                            email: email,
                            access_token: tokens.access_token,
                            refresh_token: tokens.refresh_token,
                        };
                        console.log(chalk_1.default.blue(JSON.stringify(WalletInfo, null, 2)));
                        return [2 /*return*/, WalletInfo];
                    }
                    else {
                        console.error(chalk_1.default.red("Login failed with status code: ".concat(response.status)));
                    }
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _d.sent();
                    if (axios_1.default.isAxiosError(error_1)) {
                        console.error(chalk_1.default.red("Login failed with Axios error:"));
                        console.error(chalk_1.default.red("Status:"), chalk_1.default.red((_a = error_1.response) === null || _a === void 0 ? void 0 : _a.status));
                        console.error(chalk_1.default.red("Status text:"), chalk_1.default.red((_b = error_1.response) === null || _b === void 0 ? void 0 : _b.statusText));
                        console.error(chalk_1.default.red("Data:"), chalk_1.default.red(JSON.stringify((_c = error_1.response) === null || _c === void 0 ? void 0 : _c.data, null, 2)));
                    }
                    else {
                        console.error(chalk_1.default.red("Login failed with error:"), chalk_1.default.red(error_1.message));
                    }
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.default = login;
//# sourceMappingURL=login.js.map