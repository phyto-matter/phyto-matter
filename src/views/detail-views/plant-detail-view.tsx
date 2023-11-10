import React from "react";
import {
  Chip,
  Container,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import ParkIcon from "@mui/icons-material/Park";
import LayersIcon from "@mui/icons-material/Layers";
import HardwareIcon from "@mui/icons-material/Hardware";
import WaterfallChartIcon from "@mui/icons-material/WaterfallChart";
import { Link, useParams } from "react-router-dom";
import { NORMALISED_PHYTO_DATA } from "../../utils/get-normalised-phyto-data";

import { capitalize, keyBy, snakeCase } from "lodash";
import {
  HardinessDescription,
  IconStyle,
  MoistureDescription,
  phytoMatterBlackColor,
  phytoMatterGreenColor,
  phytoMatterYellowColor,
  SoilDescription,
  StyledAvatar,
} from "../../global-constants";

export function PlantDetailView() {
  const { id } = useParams();
  const plant = NORMALISED_PHYTO_DATA.find((_) => _.id === id);
  const references = Object.values(
    keyBy(
      (plant?.contaminants ?? [])
        .flatMap((_) => _.removal_rates)
        .map((_) => _.reference),
      "reference",
    ),
  );

  if (!plant) {
    return (
      <Container>
        <Typography variant="h2" gutterBottom>
          Not Found
        </Typography>
      </Container>
    );
  }

  return (
    <div
      style={{
        backgroundColor: phytoMatterGreenColor,
        paddingTop: 150,
        minHeight: "100vh",
      }}
    >
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom color={phytoMatterBlackColor}>
              {plant.genus} ({plant.common_name})
            </Typography>
            <Typography
              variant="subtitle1"
              gutterBottom
              color={phytoMatterBlackColor}
            >
              {plant.genus}, {plant.species}
            </Typography>
            <Grid container>
              <Grid item xs={6}>
                {plant.image ? (
                  <img src={plant.image} alt={""} />
                ) : (
                  <IconStyle src={`/icons/${snakeCase(plant.category)}.png`} />
                )}
              </Grid>
              <Grid item xs={6}>
                <List
                  sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: phytoMatterGreenColor,
                  }}
                >
                  <ListItem>
                    <ListItemAvatar>
                      <StyledAvatar>
                        <ParkIcon />
                      </StyledAvatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography style={{ color: phytoMatterBlackColor }}>
                          Vegetation Type
                        </Typography>
                      }
                      secondary={capitalize(plant.category)}
                    />
                  </ListItem>
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
                        <Tooltip
                          title={SoilDescription}
                          placement="bottom-start"
                        >
                          <span>{plant.soil_type}</span>
                        </Tooltip>
                      }
                    />
                  </ListItem>
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
                        <Tooltip
                          title={HardinessDescription}
                          placement="bottom-start"
                        >
                          <span>{plant.us_hardiness_zone}</span>
                        </Tooltip>
                      }
                    />
                  </ListItem>
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
                        <Tooltip
                          title={MoistureDescription}
                          placement="bottom-start"
                        >
                          <span>{plant.moisture}</span>
                        </Tooltip>
                      }
                    />
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <TableContainer sx={{ maxHeight: 400 }} component={Paper}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography
                        style={{ color: phytoMatterBlackColor, fontSize: 14 }}
                      >
                        <b>Contaminant</b>
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        style={{ color: phytoMatterBlackColor, fontSize: 14 }}
                      >
                        <b>Tissue type</b>
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        style={{ color: phytoMatterBlackColor, fontSize: 14 }}
                      >
                        <b>Removal Rate</b>
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {plant.contaminants.flatMap((c) =>
                    c.removal_rates.map((r) => (
                      <TableRow>
                        <TableCell>
                          <Link to={`/contaminants/${c.id}`}>
                            <Tooltip
                              title={capitalize(c.abbreviation)}
                              placement="right"
                            >
                              <Chip
                                label={capitalize(c.name)}
                                size="small"
                                variant="outlined"
                                sx={{
                                  backgroundColor: phytoMatterYellowColor,
                                  borderColor: phytoMatterYellowColor,
                                }}
                              />
                            </Tooltip>
                          </Link>
                        </TableCell>
                        <TableCell>{capitalize(c.tissue_type)}</TableCell>
                        <TableCell>
                          {r.removal_rate
                            ? r.removal_rate.toLocaleString()
                            : "No data"}{" "}
                          mg/kg
                          <sup>
                            (
                            {references.findIndex(
                              (_) => _.reference === r.reference.reference,
                            ) + 1}
                            )
                          </sup>
                        </TableCell>
                      </TableRow>
                    )),
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom color={phytoMatterBlackColor}>
              References
            </Typography>
            <TableContainer sx={{ maxHeight: 400 }} component={Paper}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography
                        style={{ color: phytoMatterBlackColor, fontSize: 14 }}
                      >
                        <b>#</b>
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        style={{ color: phytoMatterBlackColor, fontSize: 14 }}
                      >
                        <b>Title</b>
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        style={{ color: phytoMatterBlackColor, fontSize: 14 }}
                      >
                        <b>Type</b>
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        style={{ color: phytoMatterBlackColor, fontSize: 14 }}
                      >
                        <b>Source</b>
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {references.map((ref, i) => (
                    <TableRow>
                      <TableCell>{i + 1}</TableCell>
                      <TableCell>{ref.title}</TableCell>
                      <TableCell>{ref.type}</TableCell>
                      <TableCell>
                        <a href={ref.link} target="_blank" rel="noreferrer">
                          {ref.reference}
                        </a>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
