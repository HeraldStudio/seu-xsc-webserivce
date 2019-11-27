import * as mongoose from 'mongoose';

export const AuthSchema = new mongoose.Schema({
  name: String, // 姓名 
  cardnum: String, // 一卡通号
  openId: String, // 微信公众号 OpenId
  wechatSession: String, // 微信绑定过程中会话标识符
  lastAuthTime: Number, // 最近认证时间
});