/**
 *
 * @param {*} email 邮箱校验
 * @returns
 */
export const validateemail = (email) => {
  const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return reg.test(email)
}
/**
  * 手机号校验
  */
export const validatemobile = (mobile) => {
  const reg = /^(?:(?:\+|00)86)?1\d{10}$/
  return reg.test(mobile)
}
