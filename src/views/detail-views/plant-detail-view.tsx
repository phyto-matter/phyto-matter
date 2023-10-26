import React from "react";
import {
  Avatar,
  Chip,
  Container,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  styled,
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
import { capitalize, keyBy } from "lodash";
import {
  phytoMatterGreenColor,
  phytoMatterYellowColor,
} from "../../global-constants";

const StyledAvatar = styled(Avatar)({
  backgroundColor: "black",
});

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
    <Container
      maxWidth={false}
      sx={{
        padding: 3,
      }}
      style={{
        backgroundColor: phytoMatterGreenColor,
        paddingTop: 150,
        paddingLeft: 150,
        paddingRight: 150,
        minHeight: "100vh",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            {plant.latin_name} ({plant.common_name})
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            {plant.species}, {plant.family}
          </Typography>
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
                primary="Vegetation Type"
                secondary={capitalize(plant.vegetation_type)}
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <StyledAvatar>
                  <LayersIcon />
                </StyledAvatar>
              </ListItemAvatar>
              <ListItemText primary="Soil" secondary={plant.soil} />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <StyledAvatar>
                  <HardwareIcon />
                </StyledAvatar>
              </ListItemAvatar>
              <ListItemText
                primary="Hardiness"
                secondary={plant.hardiness_zone}
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <StyledAvatar>
                  <WaterfallChartIcon />
                </StyledAvatar>
              </ListItemAvatar>
              <ListItemText primary="Moisture" secondary={plant.moisture} />
            </ListItem>
          </List>
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
                {plant.contaminants.flatMap((c) =>
                  c.removal_rates.map((r) => (
                    <TableRow>
                      <TableCell>
                        <Link to={`/contaminants/${c.id}`}>
                          <Tooltip title={capitalize(c.name)} placement="right">
                            <Chip
                              label={c.symbol}
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
