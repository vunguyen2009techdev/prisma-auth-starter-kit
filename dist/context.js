"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContext = void 0;
const client_1 = require("@prisma/client");
const db = new client_1.PrismaClient();
function createContext(req) {
    return Object.assign(Object.assign({}, req), { db });
}
exports.createContext = createContext;
//# sourceMappingURL=context.js.map