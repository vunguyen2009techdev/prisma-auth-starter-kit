import { arg, inputObjectType, intArg, mutationType, nonNull, stringArg } from "nexus";
import { hash, compare } from 'bcrypt';
import { sign } from "jsonwebtoken";
import { APP_SECRET } from './../utils';
import { getUserId } from './../utils';

export const InputUserType = inputObjectType({
  name: 'InputUserType',
  definition(t) {
    t.string('name'),
    t.nonNull.string('email'),
    t.nonNull.string('password')
  }
});

export const Mutation = mutationType({
  definition(t) {
    t.field('signup', {
      type: 'AuthPayload',
      args: {
        input: nonNull(arg({type: 'InputUserType'}))
      },
      resolve: async (_, args, ctx) => {
        const { name, email, password } = args?.input;
        const hashedPassword = await hash(password, 10);

        const user = await ctx.db.user.create({
          data: {
            name,
            email,
            password: hashedPassword,
          }
        });

        return {
          token: sign({ userId: user.id }, APP_SECRET),
          user,
        }
      }
    })

    t.field('login', {
      type: 'AuthPayload',
      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      resolve: async (_, args, ctx) => {
        const { email, password } = args;
        const user = await ctx.db.user.findUnique({
          where: { email }
        });

        if (!user) {
          throw new Error(`No user found with email: ${email}`);
        }

        const passwordParse = await compare(password, user.password);
        if (!passwordParse) {
          throw new Error("Invalid password");
        }

        return {
          token: sign({ userId: user.id }, APP_SECRET),
          user,
        }
      }
    })

    t.field('createDraft', {
      type: 'Post',
      args: {
        title: nonNull(stringArg()),
        content: nonNull(stringArg())
      },
      resolve: async (_, args, ctx) => {
        const { title, content } = args;
        const userId = getUserId(ctx);
        
        if (!userId) {
          throw new Error("Could not authenticate user.");
        }

        const post = await ctx.db.post.create({
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
      }
    }),

    t.field('deletePost', {
      type: 'Post',
      args: {
        id: nonNull(intArg()),
      },
      resolve: async (_, args, ctx) => {
        const { id } = args;
        const deletePost = await ctx.db.post.delete({
          where: { id }
        });
        
        return deletePost;
      }
    }),

    t.field('publish', {
      type: 'Post',
      args: {
        id: nonNull(intArg())
      },
      resolve: async(_, args, ctx) => {
        const { id } = args;
        const updated = await ctx.db.post.update({
          where: { id },
          data: {
            published: true,
          }
        });

        return updated;
      }
    })
  }
});