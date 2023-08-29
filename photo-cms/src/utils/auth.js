import { TOKEN_TIME_STAMP, TOKEN_TIME_DURATION } from "../constants";
import { getItem, setItem } from "./storage";
/**
 * 时效token:
 *  1. 用户登录时，记录当前登录时间
 *  2. 指定一个失效时长
 *  3. 接口调用时，根据档期那时间对比登录时间，看是否超过了失效时长
 */
export function getTimeStamp() {
  return getItem(TOKEN_TIME_STAMP);
}

export function setTimeStamp() {
  setItem(TOKEN_TIME_STAMP, Date.now());
}

export function isTokenTimeout() {
    const currentTime = Date.now()
    const timeStamp = getTimeStamp()
    return (currentTime - timeStamp) > TOKEN_TIME_DURATION
}
