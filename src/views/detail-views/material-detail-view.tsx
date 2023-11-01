import { Container, Grid, Typography } from "@mui/material";
import {
  phytoMatterBlackColor,
  phytoMatterBrownColor,
} from "../../global-constants";
import { capitalize, keyBy } from "lodash";
import React from "react";
import { NORMALISED_MATTER_DATA } from "../../utils/get-normalised-matter-data";
import { useParams } from "react-router-dom";

export function MaterialDetailView() {
  const { id } = useParams();
  const results = NORMALISED_MATTER_DATA.find((_) => _.id === id);
  const projects = Object.values(
    keyBy((results?.projects ?? []).flatMap((_) => _)),
  );

  if (!results) {
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
        backgroundColor: phytoMatterBrownColor,
        paddingTop: 150,
        minHeight: "100vh",
      }}
    >
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>
              {results.common_name}
            </Typography>
            <Typography
              variant="subtitle1"
              gutterBottom
              color={phytoMatterBlackColor}
            >
              {}
            </Typography>
          </Grid>
        </Grid>
      </Container>
      ;
    </div>
  );
}
