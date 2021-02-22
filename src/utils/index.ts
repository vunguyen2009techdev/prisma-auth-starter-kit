export const APP_SECRET = 'appsecret321';
import { ApolloError } from 'apollo-server';
import { verify } from 'jsonwebtoken';
import { Context } from '../context';

interface IVerify {
  userId?: number;
};

export function getUserId(context: Context) {
  const Authorization = context.req.get('Authorization') ?? null;
  if (!Authorization) {
    throw new ApolloError("Not Authorization", "ERROR");
  }
  const verifiedToken  = verify(Authorization, APP_SECRET);
  return (verifiedToken as IVerify)?.userId;
}