const utility = require('utility')

const successResponse = data => {
  return {
    success: true,
    result: data
  }
}

const failResponse = msg => {
  return {
    success: false,
    message: msg
  }
}

const md5Pwd = (pwd) => {
  const salt = 'hale_vue_koa_mongoose_#$%^&*!@'
  return utility.md5(utility.md5(pwd + salt))
}

module.exports = {
  successResponse,
  failResponse,
  md5Pwd
}
