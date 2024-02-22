import React, { useMemo } from "react";
import {
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { NORMALISED_PHYTO_DATA } from "../../utils/get-normalised-phyto-data";

import { capitalize, snakeCase, uniqBy } from "lodash";
import {
  IconStyle,
  phytoMatterBlackColor,
  phytoMatterGreenColor,
} from "../../global-constants";
import { PlantDetailSeasonDescriptions } from "../../components/plant-detail-season-descriptions";
import { PlantDetailInfo } from "../../components/plant-detail-info";
import { getPlantRates } from "../../hooks/use-plant-suggestions";
import { NORMALISED_MATTER_DATA } from "../../utils/get-normalised-matter-data";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

export function PlantDetailView() {
  const { id } = useParams();
  const [plant, results] = useMemo(() => {
    const p = NORMALISED_PHYTO_DATA.filter((_) => _.id === id);

    return [p[0], getPlantRates(p)];
  }, [id]);
  const references = useMemo(
    () =>
      uniqBy(
        results.flatMap((_) => _.references),
        "reference",
      ),
    [results],
  );
  const materials = useMemo(
    () => NORMALISED_MATTER_DATA.filter((_) => _.plant_genus === plant?.genus),
    [plant],
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
        paddingBottom: 20,
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
                      <b>Contaminant</b>
                    </TableCell>
                    <TableCell>
                      <b>Tissue type</b>
                    </TableCell>
                    <TableCell>
                      <b>Removal Rate</b>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {results.map((suggestion) => (
                    <TableRow>
                      <TableCell>
                        <Link to={`/contaminants/${suggestion.contaminantId}`}>
                          {suggestion.contaminant}
                        </Link>
                      </TableCell>
                      <TableCell>
                        {capitalize(suggestion.tissue_type)}
                      </TableCell>
                      <TableCell>
                        {suggestion.upper_rate
                          ? suggestion.lower_rate
                            ? `${suggestion.lower_rate.toLocaleString()} - ${suggestion.upper_rate.toLocaleString()} mg/kg`
                            : `${suggestion.upper_rate.toLocaleString()} mg/kg`
                          : "No data"}{" "}
                        <sup>
                          {suggestion.references.map(
                            (r) =>
                              `(${
                                references.findIndex(
                                  (_) => _.reference === r.reference,
                                ) + 1
                              })`,
                          )}
                        </sup>
                      </TableCell>
                    </TableRow>
                  ))}
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
                        <b>Reference</b>
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
                          {ref.reference}
                      </TableCell>
                      <TableCell>
                        <a href={ref.link} target="_blank" rel="noreferrer">
                          Link <OpenInNewIcon style={{ height: 11, width: 11 }}/>
                        </a>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom color={phytoMatterBlackColor}>
              Related Materials
            </Typography>
            <TableContainer sx={{ maxHeight: 400 }} component={Paper}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography
                        style={{ color: phytoMatterBlackColor, fontSize: 14 }}
                      >
                        <b>Name</b>
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
                        <b>Function</b>
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {materials.map((ref, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <Link to={`/materials/${ref.id}`}>{ref.name}</Link>
                      </TableCell>
                      <TableCell>{ref.type.join(", ")}</TableCell>
                      <TableCell>{ref.function.join(", ")}</TableCell>
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
