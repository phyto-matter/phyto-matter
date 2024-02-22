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
import { capitalize, uniqBy } from "lodash";

import { phytoMatterYellowColor } from "../../global-constants";
import { getPlantRates } from "../../hooks/use-plant-suggestions";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

export function ContaminantDetailView() {
  const { id } = useParams();
  const results = getPlantRates(NORMALISED_PHYTO_DATA, id);
  const references = useMemo(
    () =>
      uniqBy(
        results.flatMap((_) => _.references),
        "reference",
      ),
    [results],
  );

  if (!results.length) {
    return (
      <Container>
        <Typography variant="h2" gutterBottom>
          Not Found
        </Typography>
      </Container>
    );
  }

  const contaminant = results[0];

  return (
    <div
      style={{
        backgroundColor: phytoMatterYellowColor,
        paddingTop: 150,
        paddingBottom: 20,
        minHeight: "100vh",
      }}
    >
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>
              {capitalize(contaminant.contaminant)} ({contaminant.abbreviation})
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              {capitalize(contaminant.category)}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <TableContainer sx={{ maxHeight: 400 }} component={Paper}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <b>Plant</b>
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
                  {results.map((suggestion, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <Link to={`/plants/${suggestion.plantId}`}>
                          {suggestion.plant}
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
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              References
            </Typography>
            <TableContainer sx={{ maxHeight: 400 }} component={Paper}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <b>#</b>
                    </TableCell>
                    <TableCell>
                      <b>Title</b>
                    </TableCell>
                    <TableCell>
                      <b>Type</b>
                    </TableCell>
                    <TableCell>
                      <b>Reference</b>
                    </TableCell>
                    <TableCell>
                      <b>Source</b>
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
                          Link  <OpenInNewIcon style={{ height: 11, width: 11 }}/>
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
