import {
  HardinessDescription,
  MoistureDescription,
  phytoMatterBlackColor,
  SoilDescription,
  StyledAvatar,
} from "../global-constants";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tooltip,
  Typography,
  Grid,
} from "@mui/material";
import LayersIcon from "@mui/icons-material/Layers";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

import HardwareIcon from "@mui/icons-material/Hardware";
import WaterfallChartIcon from "@mui/icons-material/WaterfallChart";
import LandscapeIcon from "@mui/icons-material/Landscape";
import React from "react";
import { PlantEntry } from "../utils/get-normalised-phyto-data";

export function PlantDetailInfo({ plant }: { plant: PlantEntry }) {
  return (
    <>
      <Grid container spacing={2} style={{ marginTop: 5 }}>
        <Grid item xs={6} md={3}>
          <List>
            <ListItem>
              <ListItemAvatar>
                <StyledAvatar>
                  <LayersIcon />
                </StyledAvatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography style={{ color: phytoMatterBlackColor }}>
                    Soil
                  </Typography>
                }
                secondary={
                  <span>
                    <span>{plant.soil_ph} </span>
                    <Tooltip title={SoilDescription} placement="bottom-start">
                      <HelpOutlineIcon style={{ height: 11, width: 11 }} />
                    </Tooltip>
                  </span>
                }
              />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={6} md={3}>
          <List>
            <ListItem>
              <ListItemAvatar>
                <StyledAvatar>
                  <HardwareIcon />
                </StyledAvatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography style={{ color: phytoMatterBlackColor }}>
                    Hardiness
                  </Typography>
                }
                secondary={
                  <span>
                    <span>{plant.us_hardiness_zone} </span>
                    <Tooltip
                      title={HardinessDescription}
                      placement="bottom-start"
                    >
                      <HelpOutlineIcon style={{ height: 11, width: 11 }} />
                    </Tooltip>
                  </span>
                }
              />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={6} md={3}>
          <List>
            <ListItem>
              <ListItemAvatar>
                <StyledAvatar>
                  <WaterfallChartIcon />
                </StyledAvatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography style={{ color: phytoMatterBlackColor }}>
                    Moisture
                  </Typography>
                }
                secondary={
                  <span>
                    <span>{plant.moisture} </span>
                    <Tooltip
                      title={MoistureDescription}
                      placement="bottom-start"
                    >
                      <HelpOutlineIcon style={{ height: 11, width: 11 }} />
                    </Tooltip>
                  </span>
                }
              />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={6} md={3}>
          <List>
            <ListItem>
              <ListItemAvatar>
                <StyledAvatar>
                  <LandscapeIcon />
                </StyledAvatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography style={{ color: phytoMatterBlackColor }}>
                    Geography
                  </Typography>
                }
                secondary={plant.geography !== "" ? plant.geography : "N/A"}
              />
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </>
  );
}
