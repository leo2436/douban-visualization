// ajax函数将返回Promise对象:
import $ from 'jquery'

export function getData(url) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: url,
      type: 'GET',
      dataType: 'JSON',
      success: function (res) {
        resolve(res)
      },
      error: function (err) {
        reject('请求失败', err)
      }
    })
  })
}