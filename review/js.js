// 处理异步请求并重试
function retry(asyncRequest, times) {
  return asyncRequest()
    .then(res => {
      console.log(res)
    })
    .catch(error => {
      times--
      if (times === 0) {
        throw new Error(error)
      } else {
        retry(asyncRequest, times)
      }
    })
}