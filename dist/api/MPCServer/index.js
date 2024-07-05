"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mpcServerSign = exports.recoverShare = exports.generateShare = void 0;
var generateShare_1 = require("./generateShare");
Object.defineProperty(exports, "generateShare", { enumerable: true, get: function () { return __importDefault(generateShare_1).default; } });
var recoverShare_1 = require("./recoverShare");
Object.defineProperty(exports, "recoverShare", { enumerable: true, get: function () { return __importDefault(recoverShare_1).default; } });
var mpcServerSign_1 = require("./mpcServerSign");
Object.defineProperty(exports, "mpcServerSign", { enumerable: true, get: function () { return __importDefault(mpcServerSign_1).default; } });
