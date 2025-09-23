function sumSalary(salaries) {
  let sum = 0;

  for (key in salaries) {
    sum += (Number.isFinite(salaries[key])) ? salaries[key] : 0;
  }
  return sum;
}
