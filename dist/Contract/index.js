"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ethCallLegacy = exports.ethCallEIP1559 = exports.ethCall = void 0;
var ethCall_1 = require("./ethCall");
Object.defineProperty(exports, "ethCall", { enumerable: true, get: function () { return __importDefault(ethCall_1).default; } });
var ethCallEIP1559_1 = require("./ethCallEIP1559");
Object.defineProperty(exports, "ethCallEIP1559", { enumerable: true, get: function () { return __importDefault(ethCallEIP1559_1).default; } });
var ethCallLegacy_1 = require("./ethCallLegacy");
Object.defineProperty(exports, "ethCallLegacy", { enumerable: true, get: function () { return __importDefault(ethCallLegacy_1).default; } });
//# sourceMappingURL=index.js.map