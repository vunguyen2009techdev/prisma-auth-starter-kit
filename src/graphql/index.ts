import { scalarType, asNexusMethod } from 'nexus';
import { Kind } from 'graphql/language';
// import { GraphQLDate } from 'graphql-iso-date';

export const DateScalar = scalarType({
  name: 'Date',
  asNexusMethod: 'date',
  description: 'Date custom scalar type',
  parseValue(value) {
    return new Date(value)
  },
  serialize(value) {
    return value;
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(ast.value)
    }
    return null
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

export * as Query  from './Query';
export * as Mutation from './Mutation';
export * as User from './User';
export * as Post from './Post';
export * as AuthPayload from './AuthPayload';