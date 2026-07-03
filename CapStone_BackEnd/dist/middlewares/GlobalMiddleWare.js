"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalMiddleWare = void 0;
const express_validator_1 = require("express-validator");
const Utils_1 = require("../utils/Utils");
class GlobalMiddleWare {
    static checkError(req, res, next) {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return next(new Error(errors.array()[0].msg));
        }
        next();
    }
    static getToken(req) {
        const headerAuth = req.headers.authorization || req.headers.Authorization;
        if (!headerAuth || typeof headerAuth !== "string") {
            return null;
        }
        const trimmedHeader = headerAuth.trim();
        if (!trimmedHeader) {
            return null;
        }
        if (trimmedHeader.toLowerCase().startsWith("bearer ")) {
            const token = trimmedHeader.slice(7).trim();
            return token || null;
        }
        return trimmedHeader;
    }
    static async auth(req, res, next) {
        const token = GlobalMiddleWare.getToken(req);
        if (!token) {
            req.errorStatus = 401;
            return next(new Error("Authentication token is missing"));
        }
        try {
            const coded = await Utils_1.Utils.jwtVerify(token);
            req.decoded = coded;
            req.user = coded;
            return next();
        }
        catch (err) {
            req.errorStatus = 401;
            return next(new Error("Invalid or expired authentication token"));
        }
    }
    static adminRole(req, res, next) {
        const user = req.user || req.decoded;
        if (!user || user.role !== "host") {
            req.errorStatus = 401;
            return next(new Error("Unauthorized access"));
        }
        return next();
    }
}
exports.GlobalMiddleWare = GlobalMiddleWare;
