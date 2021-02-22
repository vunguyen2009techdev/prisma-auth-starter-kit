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
exports.Mutation = exports.InputUserType = void 0;
const nexus_1 = require("nexus");
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const utils_1 = require("./../utils");
const utils_2 = require("./../utils");
exports.InputUserType = nexus_1.inputObjectType({
    name: 'InputUserType',
    definition(t) {
        t.string('name'),
            t.nonNull.string('email'),
            t.nonNull.string('password');
    }
});
exports.Mutation = nexus_1.mutationType({
    definition(t) {
        t.field('signup', {
            type: 'AuthPayload',
            args: {
                input: nexus_1.nonNull(nexus_1.arg({ type: 'InputUserType' }))
            },
            resolve: (_, args, ctx) => __awaiter(this, void 0, void 0, function* () {
                const { name, email, password } = args === null || args === void 0 ? void 0 : args.input;
                const hashedPassword = yield bcrypt_1.hash(password, 10);
                const user = yield ctx.db.user.create({
                    data: {
                        name,
                        email,
                        password: hashedPassword,
                    }
                });
                return {
                    token: jsonwebtoken_1.sign({ userId: user.id }, utils_1.APP_SECRET),
                    user,
                };
            })
        });
        t.field('login', {
            type: 'AuthPayload',
            args: {
                email: nexus_1.nonNull(nexus_1.stringArg()),
                password: nexus_1.nonNull(nexus_1.stringArg()),
            },
            resolve: (_, args, ctx) => __awaiter(this, void 0, void 0, function* () {
                const { email, password } = args;
                const user = yield ctx.db.user.findUnique({
                    where: { email }
                });
                if (!user) {
                    throw new Error(`No user found with email: ${email}`);
                }
                const passwordParse = yield bcrypt_1.compare(password, user.password);
                if (!passwordParse) {
                    throw new Error("Invalid password");
                }
                return {
                    token: jsonwebtoken_1.sign({ userId: user.id }, utils_1.APP_SECRET),
                    user,
                };
            })
        });
        t.field('createDraft', {
            type: 'Post',
            args: {
                title: nexus_1.nonNull(nexus_1.stringArg()),
                content: nexus_1.nonNull(nexus_1.stringArg())
            },
            resolve: (_, args, ctx) => __awaiter(this, void 0, void 0, function* () {
                const { title, content } = args;
                const userId = utils_2.getUserId(ctx);
                if (!userId) {
                    throw new Error("Could not authenticate user.");
                }
                const post = yield ctx.db.post.create({
                    data: {
                        title,
                        content,
                        published: false,
                        author: {
                            connect: {
                                id: Number(userId)
                            }
                        }
                    },
                    include: {
                        author: true
                    }
                });
                
                return post;
            })
        }),
            t.field('deletePost', {
                type: 'Post',
                args: {
                    id: nexus_1.nonNull(nexus_1.intArg()),
                },
                resolve: (_, args, ctx) => __awaiter(this, void 0, void 0, function* () {
                    const { id } = args;
                    const deletePost = yield ctx.db.post.delete({
                        where: { id }
                    });

                    return deletePost;
                })
            }),
            t.field('publish', {
                type: 'Post',
                args: {
                    id: nexus_1.nonNull(nexus_1.intArg())
                },
                resolve: (_, args, ctx) => __awaiter(this, void 0, void 0, function* () {
                    const { id } = args;
                    const updated = yield ctx.db.post.update({
                        where: { id },
                        data: {
                            published: true,
                        }
                    });
                    return updated;
                })
            });
    }
});
//# sourceMappingURL=Mutation.js.map