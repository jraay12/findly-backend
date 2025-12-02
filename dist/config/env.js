"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_SECRET = exports.config = void 0;
exports.config = {
    PORT: process.env.PORT || 8000,
};
exports.JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";
