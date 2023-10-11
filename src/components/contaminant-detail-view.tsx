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
  Typography,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import {
  ContaminantEntry,
  NORMALISED_DATA,
  PlantEntry,
} from "../utils/get-normalised-data";
import { capitalize, keyBy } from "lodash";

export function ContaminantDetailView() {
  const { id } = useParams();
  const results = NORMALISED_DATA.flatMap((p) =>
    p.contaminants.map((c): [ContaminantEntry, PlantEntry] => [c, p]),
  ).filter(([c, p]) => c.id === id);
  const references = Object.values(
    keyBy(
      results
        .map(([c]) => c)
        .flatMap((_) => _.removal_rates)
        .map((_) => _.reference),
      "reference",
    ),
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

  const [contaminant] = results[0];

  return (
    <Container sx={{ padding: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            {capitalize(contaminant.name)}{" "}
            <Chip label={contaminant.symbol} variant="outlined" />
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
                {results.flatMap(([c, p]) =>
                  c.removal_rates.map((r) => (
                    <TableRow>
                      <TableCell>
                        <Link to={`/plants/${p.id}`}>{p.latin_name}</Link>
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
                    <b>Author</b>
                  </TableCell>
                  <TableCell>
                    <b>Year</b>
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
                    <TableCell>{ref.author}</TableCell>
                    <TableCell>{ref.year}</TableCell>
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
  );
}
