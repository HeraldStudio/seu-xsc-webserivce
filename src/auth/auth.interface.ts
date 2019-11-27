import { Document } from 'mongoose';

export interface Auth extends Document {
  readonly cardnum: string;
  readonly name: string;
  readonly openId: string;
  readonly wechatSession: string,
}