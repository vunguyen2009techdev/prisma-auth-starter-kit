import { intArg, queryType, nonNull, nullable, stringArg } from 'nexus';
import { getUserId } from '../utils';

export const Query = queryType({
  definition(t) {
    t.nullable.field('me', {
      type: 'User',
      resolve: async(_, __, ctx) => {
        const userId = getUserId(ctx);

        const user = await ctx.db.user.findUnique({
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
      }
    })

    t.list.field('drafts', {
      type: 'Post',
      resolve(_, __, ctx) {
        return ctx.db.post.findMany({ where: { published: false }, include: { author: true } })
      }
    })

    t.list.field('feed', {
      type: 'Post',
      resolve(_, __, ctx) {
        return ctx.db.post.findMany({ where: { published: true }, include: { author: true } })
      }
    })

    t.nullable.field('post', {
      type: 'Post',
      args: {
        id: nonNull(intArg())
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
    })

    t.list.field('filterPosts', {
      type: 'Post',
      args: {
        searchString: nullable(stringArg())
      },
      resolve: async (_, args, ctx) => {
        const { searchString } = args;

        return await ctx.db.post.findMany({
          where: {
            OR: [
              {
                title: {
                  contains: searchString ?? undefined,
                }
              },
              {
                content: {
                  contains: searchString ?? undefined
                }
              }
            ]
          }
        });
      }
    })
  }
});