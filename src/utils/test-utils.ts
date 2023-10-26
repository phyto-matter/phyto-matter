export const VALID_CATEGORIES = [
  "roof",
  "paving and bricks",
  "walls",
  "decor and paint",
  "edges",
  "furniture",
];
export const VALID_PROCESSING = ["dry", "burn", "braid", "soak"];
export const VALID_FUNCTIONS = [
  "structure",
  "filler",
  "plaster",
  "reinforcement",
  "decor",
  "paint",
];
export const VALID_VEGETATION_TYPES = [
  "herbaceous",
  "grasses and sedges",
  "shrub",
  "tree",
];

export function allValid(toTest: string, validation: string[]) {
  return toTest
    .split(",")
    .map((_) => _.trim().toLowerCase())
    .every((t) => validation.includes(t));
}
