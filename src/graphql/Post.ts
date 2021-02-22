
import { objectType } from 'nexus';

export const Post = objectType({
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
    })
  }
});