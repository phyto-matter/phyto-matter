export function allValid(
  toTest: string,
  validation: { [key: string]: string },
) {
  const values = Object.values(validation);

  return toTest
    .split(",")
    .map((_) => _.trim().toLowerCase())
    .every((t) => values.includes(t));
}

export function allValidOrEmpty(
  toTest: string,
  validation: { [key: string]: string },
) {
  return !toTest || allValid(toTest, validation);
}
