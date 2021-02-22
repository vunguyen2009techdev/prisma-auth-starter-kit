"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const nexus_1 = require("nexus");
exports.User = nexus_1.objectType({
    name: 'User',
    definition(t) {
        t.id('id'),
            t.string('name'),
            t.string('email'),
            t.list.field('posts', {
                type: 'Post'
            });
    }
});
//# sourceMappingURL=User.js.map