
export default (date, format) => {
  var result = format
  for (var key in fmt) {
    result = result.replace(key, fmt[key](new Date(date)))
  }
  return result
}

export const fmt = {
  "yyyy": date => date.getFullYear() + '',
  "MM": date => ('0' + (date.getMonth() + 1)).slice(-2),
  "dd": date => ('0' + date.getDate()).slice(-2),
  "hh": date => ('0' + date.getHours()).slice(-2),
  "mm": date => ('0' + date.getMinutes()).slice(-2),
  "ss": date => ('0' + date.getSeconds()).slice(-2)
}

