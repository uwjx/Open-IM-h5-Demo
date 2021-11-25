import request from '@/utils/http'

//发送验证码
export function sendVerCode(data) {
  return request.post("auth/code", data);
} 

//验证验证码
export function checkVerCode(data) {
  return request.post("auth/verify", data);
} 

//注册
export function register(data) {
  return request.post("auth/password", data);
} 

//登录
export function login(data) {
  return request.post("auth/login", data);
} 
