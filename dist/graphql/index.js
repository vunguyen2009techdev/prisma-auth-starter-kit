"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthPayload = exports.Post = exports.User = exports.Mutation = exports.Query = exports.DateScalar = void 0;
const nexus_1 = require("nexus");
const language_1 = require("graphql/language");
// import { GraphQLDate } from 'graphql-iso-date';
exports.DateScalar = nexus_1.scalarType({
    name: 'Date',
    asNexusMethod: 'date',
    description: 'Date custom scalar type',
    parseValue(value) {
        return new Date(value);
    },
    serialize(value) {
        return value;
    },
    parseLiteral(ast) {
        if (ast.kind === language_1.Kind.INT) {
            return new Date(ast.value);
        }
        return null;
    },
});
// export const GQLDate = asNexusMethod(GraphQLDate, 'date')
// import * as Query  from './Query';
// import * as Mutation from './Mutation';
// import * as User from './User';
// import * as Post from './Post';
// import * as AuthPayload from './AuthPayload';
// export {
//   Query,
//   Mutation,
//   User,
//   Post,
//   AuthPayload,
// }
exports.Query = __importStar(require("./Query"));
exports.Mutation = __importStar(require("./Mutation"));
exports.User = __importStar(require("./User"));
exports.Post = __importStar(require("./Post"));
exports.AuthPayload = __importStar(require("./AuthPayload"));
//# sourceMappingURL=index.js.map