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
exports.schema = void 0;
const path_1 = require("path");
const graphql_middleware_1 = require("graphql-middleware");
const nexus_1 = require("nexus");
const nexus_plugin_prisma_1 = require("nexus-plugin-prisma");
const types = __importStar(require("./graphql"));
exports.schema = graphql_middleware_1.applyMiddleware(nexus_1.makeSchema({
    types,
    plugins: [nexus_plugin_prisma_1.nexusPrisma()],
    outputs: {
        schema: path_1.join(__dirname, '..', 'schema.graphql'),
        typegen: path_1.join(__dirname, '..', 'nexus.ts')
    },
    contextType: {
        module: path_1.join(__dirname, './context.ts'),
        alias: 'Context',
        export: 'Context'
    },
    sourceTypes: {
        modules: [
            {
                module: '@prisma/client',
                alias: 'client',
            }
        ]
    },
    shouldGenerateArtifacts: process.argv.includes('--nexusTypegen')
}));
//# sourceMappingURL=schema.js.map