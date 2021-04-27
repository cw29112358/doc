// 最长子序列
function longestSubsequence(s) {
    const length = s.length
    let res = 0
    let temp = ''
    for (let i = 0; i < length; i++) {
      if (temp.indexOf(s[i]) === -1) {
        temp += s[i]
        res = Math.max(res, temp.length)
      } else {
        temp = temp.slice(temp.indexOf(s[i]) + 1)
        temp += s[i]
      }
    }
    return res
  }

// 请求并发控制
function limitLoad(urls, handler, limit, callback) {
    let count = urls.length
    const sequence = Array.prototype.slice.call(urls)
    let promises = []
  
    promises = sequence.splice(0, limit).map((url, index) =>
      handler(url).then(() => {
        count--
        if (count === 0) return callback()
        return index
      }),
    )
    ;(async function loop() {
      for (let i = 0, len = sequence.length; i < len; i++) {
        const index = await Promise.race(promises)
        promises[index] = handler(sequence[i]).then(() => {
          count--
          if (count === 0) callback()
          return index
        })
      }
    })()
}

/**
 * 全排列
 * [1,2,3] => [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
 */
const res = []
const temp = []
function permute(nums) {
  for (let i = 0, len = nums.length; i < len; i++) {
    temp.push(nums[i])
    const copy = Array.prototype.slice.call(nums)
    copy.splice(i, 1)
    if (copy.length > 0) {
      permute(copy)
    } else {
      res.push(JSON.parse(JSON.stringify(temp)))
    }
    temp.pop()
  }
  return res
}