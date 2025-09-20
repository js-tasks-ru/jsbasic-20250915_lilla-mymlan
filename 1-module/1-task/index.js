function factorial(n) {
  let res = 1;
  if (n > 1) {
    for(let i = n - 1;i > 0;i--) {
      n = n * i;
    }
    res = n;
  }
  return res;
}
