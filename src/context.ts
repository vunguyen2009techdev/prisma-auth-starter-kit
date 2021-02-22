import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

export interface Context {
  db: PrismaClient,
  req: any,
}

export function createContext(req: Context) {
  return {
    ...req,
    db,
  }
}