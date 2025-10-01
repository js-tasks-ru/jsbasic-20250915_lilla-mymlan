function getMinMax(str) {
  let arr = str.split(' ').filter(item => isFinite(item));

  let result = {
  min: Math.min(...arr),
  max: Math.max(...arr)
  }
  return result
}
