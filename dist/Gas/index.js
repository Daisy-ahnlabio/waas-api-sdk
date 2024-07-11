"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchSuggestedGasFees = exports.fetchGasPrice = exports.estimateGasFee = void 0;
var estimateGasFee_1 = require("./estimateGasFee");
Object.defineProperty(exports, "estimateGasFee", { enumerable: true, get: function () { return __importDefault(estimateGasFee_1).default; } });
var fetchGasPrice_1 = require("./fetchGasPrice");
Object.defineProperty(exports, "fetchGasPrice", { enumerable: true, get: function () { return __importDefault(fetchGasPrice_1).default; } });
var fetchSuggestedGasFees_1 = require("./fetchSuggestedGasFees");
Object.defineProperty(exports, "fetchSuggestedGasFees", { enumerable: true, get: function () { return __importDefault(fetchSuggestedGasFees_1).default; } });
//# sourceMappingURL=index.js.map