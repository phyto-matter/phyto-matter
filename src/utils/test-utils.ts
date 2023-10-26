export enum VALID_CATEGORIES {
  root = "roof",
  paving = "paving and bricks",
  walls = "walls",
  decor = "decor and paint",
  edges = "edges",
  furniture = "furniture",
}
export enum VALID_PROCESSING {
  dry = "dry",
  burn = "burn",
  braid = "braid",
  soak = "soak",
}
export enum VALID_FUNCTIONS {
  structure = "structure",
  filler = "filler",
  plaster = "plaster",
  reinforcement = "reinforcement",
  decor = "decor",
  paint = "paint",
}
export enum VALID_VEGETATION_TYPES {
  herbaceous = "herbaceous",
  grasses = "grasses and sedges",
  shrub = "shrub",
  tree = "tree",
}

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
