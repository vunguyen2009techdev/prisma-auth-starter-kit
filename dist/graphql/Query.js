"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Query = void 0;
const nexus_1 = require("nexus");
const utils_1 = require("../utils");
exports.Query = nexus_1.queryType({
    definition(t) {
        t.nullable.field('me', {
            type: 'User',
            resolve: (_, __, ctx) => __awaiter(this, void 0, void 0, function* () {
                const userId = utils_1.getUserId(ctx);
                const user = yield ctx.db.user.findUnique({
                    where: {
                        id: Number(userId)
                    },
                    include: {
                        posts: {
                            include: {
                                author: {
                                    include: {
                                        posts: true
                                    }
                                }
                            }
                        },
                    }
                });
                return user;
            })
        });
        t.list.field('drafts', {
            type: 'Post',
            resolve(_, __, ctx) {
                return ctx.db.post.findMany({ where: { published: false }, include: { author: true } });
            }
        });
        t.list.field('feed', {
            type: 'Post',
            resolve(_, __, ctx) {
                return ctx.db.post.findMany({ where: { published: true }, include: { author: true } });
            }
        });
        t.nullable.field('post', {
            type: 'Post',
            args: {
                id: nexus_1.nonNull(nexus_1.intArg())
            },
            resolve(_, args, ctx) {
                const { id } = args;
                return ctx.db.post.findUnique({
                    where: {
                        id: Number(id)
                    },
                    include: {
                        author: true
                    }
                });
            }
        });
        t.list.field('filterPosts', {
            type: 'Post',
            args: {
                searchString: nexus_1.nullable(nexus_1.stringArg())
            },
            resolve: (_, args, ctx) => __awaiter(this, void 0, void 0, function* () {
                const { searchString } = args;
                return yield ctx.db.post.findMany({
                    where: {
                        OR: [
                            {
                                title: {
                                    contains: searchString !== null && searchString !== void 0 ? searchString : undefined,
                                }
                            },
                            {
                                content: {
                                    contains: searchString !== null && searchString !== void 0 ? searchString : undefined
                                }
                            }
                        ]
                    }
                });
            })
        });
    }
});
//# sourceMappingURL=Query.js.map