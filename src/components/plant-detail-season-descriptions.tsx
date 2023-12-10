import {
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { phytoMatterBlackColor, StyledAvatar } from "../global-constants";
import EmojiNatureIcon from "@mui/icons-material/EmojiNature";
import LightModeIcon from "@mui/icons-material/LightMode";
import SpaIcon from "@mui/icons-material/Spa";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import React from "react";
import { PlantEntry } from "../utils/get-normalised-phyto-data";

export function PlantDetailSeasonDescriptions({
  plant,
}: {
  plant: PlantEntry;
}) {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6} md={3}>
          <List>
            <ListItem>
              <ListItemAvatar>
                <StyledAvatar>
                  <EmojiNatureIcon />
                </StyledAvatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography style={{ color: phytoMatterBlackColor }}>
                    Spring
                  </Typography>
                }
                secondary={"yellow flowers"}
              />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={6} md={3}>
          <List>
            <ListItem>
              <ListItemAvatar>
                <StyledAvatar>
                  <LightModeIcon />
                </StyledAvatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography style={{ color: phytoMatterBlackColor }}>
                    Summer
                  </Typography>
                }
                secondary={"upright orange, red, yellow flowers\n"}
              />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={6} md={3}>
          <List>
            <ListItem>
              <ListItemAvatar>
                <StyledAvatar>
                  <SpaIcon />
                </StyledAvatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography style={{ color: phytoMatterBlackColor }}>
                    Fall
                  </Typography>
                }
                secondary={"upright orange, red, yellow flowers\n"}
              />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={6} md={3}>
          <List>
            <ListItem>
              <ListItemAvatar>
                <StyledAvatar>
                  <AcUnitIcon />
                </StyledAvatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography style={{ color: phytoMatterBlackColor }}>
                    Winter
                  </Typography>
                }
                secondary={"multi-stemmed shrub. foliage can persist in winter"}
              />
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </>
  );
}
