"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.signTransaction = void 0;
var qs_1 = __importDefault(require("qs"));
var chalk_1 = __importDefault(require("chalk"));
var AuthUtil_1 = require("../Secure-Channel/AuthUtil");
var fetchGasPrice_1 = __importDefault(require("../Gas/fetchGasPrice"));
var fetchSuggestedGasFees_1 = __importDefault(require("../Gas/fetchSuggestedGasFees"));
var axios_1 = __importDefault(require("axios"));
function signTransaction(accessToken, network, type, to, pvencstr, encryptDevicePassword, uid, wid, sid, value, message) {
    return __awaiter(this, void 0, void 0, function () {
        var channelid, encryptedWid, encryptedPvencstr, encryptedDevicePassword, payload, gasInfo, gasInfo, signResponse, serializedTx, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 10, , 11]);
                    return [4 /*yield*/, (0, AuthUtil_1.getSecureChannel)()];
                case 1:
                    channelid = (_a.sent()).channelid;
                    return [4 /*yield*/, (0, AuthUtil_1.encrypt)(wid)];
                case 2:
                    encryptedWid = _a.sent();
                    return [4 /*yield*/, (0, AuthUtil_1.encrypt)(pvencstr)];
                case 3:
                    encryptedPvencstr = _a.sent();
                    return [4 /*yield*/, (0, AuthUtil_1.encrypt)(encryptDevicePassword)];
                case 4:
                    encryptedDevicePassword = _a.sent();
                    payload = {
                        to: to,
                        from: sid,
                        network: network,
                        uid: uid,
                        wid: encryptedWid,
                        sid: sid,
                        pvencstr: encryptedPvencstr,
                        encryptDevicePassword: encryptedDevicePassword,
                        value: value,
                        type: type,
                        message: message,
                    };
                    if (!(type === "LEGACY")) return [3 /*break*/, 6];
                    return [4 /*yield*/, (0, fetchGasPrice_1.default)(accessToken, network)];
                case 5:
                    gasInfo = _a.sent();
                    if (gasInfo) {
                        payload = __assign(__assign({}, payload), { gasPrice: gasInfo.gasPrice, gasLimit: gasInfo.gasLimit });
                    }
                    return [3 /*break*/, 8];
                case 6:
                    if (!(type === "EIP1559")) return [3 /*break*/, 8];
                    return [4 /*yield*/, (0, fetchSuggestedGasFees_1.default)(accessToken, network)];
                case 7:
                    gasInfo = _a.sent();
                    if (gasInfo) {
                        payload = __assign(__assign({}, payload), { maxPriorityFeePerGas: gasInfo.maxPriorityFeePerGas, maxFeePerGas: gasInfo.maxFeePerGas });
                    }
                    _a.label = 8;
                case 8: return [4 /*yield*/, axios_1.default.post("".concat(process.env.REACT_APP_WAASURL, "/wapi/v2/sign"), qs_1.default.stringify(payload), {
                        headers: {
                            Authorization: "Bearer ".concat(accessToken),
                            "Content-Type": "application/x-www-form-urlencoded",
                            "Secure-Channel": channelid,
                        },
                    })];
                case 9:
                    signResponse = _a.sent();
                    if (signResponse.status === 200) {
                        console.log(chalk_1.default.green("Transaction signed successfully:"), chalk_1.default.blue(JSON.stringify(signResponse.data, null, 2)));
                        serializedTx = signResponse.data.serializedTx;
                        return [2 /*return*/, serializedTx];
                    }
                    else {
                        console.error(chalk_1.default.red("Failed. HTTP Status: ".concat(signResponse.status)));
                        return [2 /*return*/, null];
                    }
                    return [3 /*break*/, 11];
                case 10:
                    error_1 = _a.sent();
                    if (error_1.response) {
                        console.error(chalk_1.default.red("Error: ".concat(error_1.message)), chalk_1.default.red("HTTP Status: ".concat(error_1.response.status)), chalk_1.default.red("Response Data: ".concat(JSON.stringify(error_1.response.data))));
                    }
                    else if (error_1.request) {
                        console.error(chalk_1.default.red("Error: ".concat(error_1.message)), chalk_1.default.red("No response received from the server."));
                    }
                    else {
                        console.error(chalk_1.default.red("Error: ".concat(error_1.message)), chalk_1.default.red("An error occurred while setting up the request."));
                    }
                    return [2 /*return*/, null];
                case 11: return [2 /*return*/];
            }
        });
    });
}
exports.signTransaction = signTransaction;
exports.default = signTransaction;
//# sourceMappingURL=signTransaction.js.map