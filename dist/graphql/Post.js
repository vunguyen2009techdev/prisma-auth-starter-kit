"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const nexus_1 = require("nexus");
exports.Post = nexus_1.objectType({
    name: 'Post',
    definition(t) {
        t.id('id'),
            t.string('title'),
            t.string('content'),
            t.boolean('published'),
            t.field('createdAt', { type: 'Date' }),
            t.field('updatedAt', { type: 'Date' }),
            t.field('author', {
                type: 'User'
            });
    }
});
//# sourceMappingURL=Post.js.map