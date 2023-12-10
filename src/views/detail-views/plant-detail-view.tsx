import React from "react";
import {
  Chip,
  Container,
  Grid,
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
import { Link, useParams } from "react-router-dom";
import { NORMALISED_PHYTO_DATA } from "../../utils/get-normalised-phyto-data";

import { capitalize, keyBy, snakeCase } from "lodash";
import {
  IconStyle,
  phytoMatterBlackColor,
  phytoMatterGreenColor,
  phytoMatterYellowColor,
} from "../../global-constants";
import { PlantDetailSeasonDescriptions } from "../../components/plant-detail-season-descriptions";
import { PlantDetailInfo } from "../../components/plant-detail-info";

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
          <Grid item xs={6} md={3}>
            <Typography variant="h4" gutterBottom color={phytoMatterBlackColor}>
              {plant.genus} {plant.species}
            </Typography>
            <Typography
              variant="subtitle1"
              gutterBottom
              color={phytoMatterBlackColor}
            >
              {plant.cultivar}
            </Typography>
            <Typography
              variant="subtitle1"
              gutterBottom
              color={phytoMatterBlackColor}
            >
              <i>{plant.category}</i>
            </Typography>
          </Grid>
          <Grid item xs={6} md={3}>
            {plant.image ? (
              <img src={plant.image} alt={""} />
            ) : (
              <IconStyle src={`/icons/${snakeCase(plant.category)}.png`} />
            )}
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
          <PlantDetailInfo plant={plant} />
          <PlantDetailSeasonDescriptions plant={plant} />
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
