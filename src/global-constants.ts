export const phytoMatterYellowColor = "#F0D66B";

export const phytoMatterGreenColor = "#6CDA98";

export const phytoMatterBrownColor = "";

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

export const KGS_BY_VEG_TYPE = {
  [VALID_VEGETATION_TYPES.tree]: 10,
  [VALID_VEGETATION_TYPES.shrub]: 4,
  [VALID_VEGETATION_TYPES.grasses]: 2,
  [VALID_VEGETATION_TYPES.herbaceous]: 1.2,
};
