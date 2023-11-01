import { styled } from "@mui/material";

export const phytoMatterYellowColor = "#F0D66B";

export const phytoMatterGreenColor = "#6CDA98";

export const phytoMatterBrownColor = "#AE8E5E";

export const phytoMatterBlackColor = "#323232";
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

export const IconStyle = styled("img")({
  width: 150,
  marginRight: 50,
  marginLeft: 50,
});

export const SoilDescription =
  "L = light (sandy), M = medium, H = heavy (clay)";

export const MoistureDescription = "D = dry, M = Moist, We = wet, Wa = water";

export const ShadeDescription = "F = full shade, S = semi-shade, N = no shade";

export const HardinessDescription = "Based on USDA";
