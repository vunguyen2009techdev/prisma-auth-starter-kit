import { allow, deny, rule, shield } from 'graphql-shield';
import { getUserId } from './index';

const isAuthenticated = rule({ cache: "no_cache" })(
  async (_, __, ctx) => {
    const userId = getUserId(ctx);
    return Boolean(userId);
  }
);

const isPostOwner = rule({ cache: "no_cache" })(
  async(_, { id }, ctx) => {
    const userId = getUserId(ctx);
    const author = await ctx.db.post.findUnique({
      where: {
        id: Number(id)
      }
    }).author();

    return userId === author?.id;
  }
);

export const permissions = shield({
  Query: {
    drafts: isAuthenticated,
    feed: isAuthenticated,
    filterPosts: isAuthenticated,
    me: isAuthenticated,
    post: isAuthenticated,
  },
  Mutation: {
    login: allow,
    createDraft: isAuthenticated,
    deletePost: isPostOwner,
    publish: isPostOwner,
    signup: allow
  },
  User: allow,
  Post: allow,
  AuthPayload: allow
},
{
  fallbackRule: deny,
  allowExternalErrors: true
});
