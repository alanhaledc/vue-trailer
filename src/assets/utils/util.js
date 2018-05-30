export function updateTime(time) {
  let offsetTime = Date.now() - time
  let ret
  if (offsetTime <= 864000) {
    ret = '今天'
  } else if (offsetTime > 864000 && offsetTime <= 2 * 86400000) {
    ret = '昨天'
  } else if (offsetTime > 2 * 86400000 && offsetTime <= 3 * 86400000) {
    ret = '前天'
  } else {
    let date = new Date(time)
    ret = formatDate(date, 'yyyy-MM-dd')
  }

  return ret
}

function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    // Number+''=String
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let obj = {
    'M+': date.getMonth() + 1,
    'd+': date.getDay(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let key in obj) {
    if (new RegExp(`(${key})`).test(fmt)) {
      let str = obj[key] + ''
      fmt = fmt.replace(RegExp.$1, padLeftZero(str))
    }
  }
  return fmt
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length)
}
