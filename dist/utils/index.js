"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserId = exports.APP_SECRET = void 0;
exports.APP_SECRET = 'appsecret321';
const jsonwebtoken_1 = require("jsonwebtoken");
;
function getUserId(context) {
    var _a;
    const Authorization = context.req.get('Authorization');
    const verifiedToken = jsonwebtoken_1.verify(Authorization, exports.APP_SECRET);
    return (_a = verifiedToken) === null || _a === void 0 ? void 0 : _a.userId;
}
exports.getUserId = getUserId;
//# sourceMappingURL=index.js.map