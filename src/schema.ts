import { join } from 'path';
import { applyMiddleware } from 'graphql-middleware';
import { makeSchema } from 'nexus';
import { nexusPrisma } from 'nexus-plugin-prisma';
import * as types from './graphql';
import { permissions } from './utils/auth';

export const schema = applyMiddleware(makeSchema({
  types,
  plugins: [nexusPrisma()],
  outputs: {
    schema: join(__dirname, '..', 'schema.graphql'),
    typegen: join(__dirname, '..', 'nexus.ts')
  },
  contextType: {
    module: join(__dirname, './context.ts'),
    alias: 'Context',
    export: 'Context'
  },
  sourceTypes: {
    modules: [
      {
        module: '@prisma/client',
        alias: 'client',
      }
    ],
  },
  shouldGenerateArtifacts: process.argv.includes('--nexusTypegen'),
}), permissions);