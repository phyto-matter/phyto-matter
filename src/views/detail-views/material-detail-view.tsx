import {
  Container,
  Divider,
  Box,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import {
  phytoMatterBlackColor,
  phytoMatterBrownColor,
  StyledAvatar,
} from "../../global-constants";
import { capitalize, startCase } from "lodash";
import React from "react";
import { NORMALISED_MATTER_DATA } from "../../utils/get-normalised-matter-data";
import { Link, useParams } from "react-router-dom";
import ParkIcon from "@mui/icons-material/Park";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import ConstructionIcon from "@mui/icons-material/Construction";
import HomeIcon from "@mui/icons-material/Home";
import CarpenterIcon from "@mui/icons-material/Carpenter";
import LinkIcon from "@mui/icons-material/Link";

export function MaterialDetailView() {
  const { id } = useParams();
  const results = NORMALISED_MATTER_DATA.find((_) => _.id === id);

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
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Typography variant="h4" gutterBottom>
              {results.name}
            </Typography>
            <Typography
              variant="subtitle1"
              gutterBottom
              color={phytoMatterBlackColor}
            ></Typography>
            <List>
              <ListItem>
                <ListItemAvatar>
                  <StyledAvatar>
                    <LocalFloristIcon />
                  </StyledAvatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography style={{ color: phytoMatterBlackColor }}>
                      Plant
                    </Typography>
                  }
                  secondary={capitalize(
                    results.plant_species
                      ? `${results.plant_genus} ${results.plant_genus}`
                      : results.plant_genus,
                  )}
                />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <StyledAvatar>
                    <HomeIcon />
                  </StyledAvatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography style={{ color: phytoMatterBlackColor }}>
                      Category
                    </Typography>
                  }
                  secondary={capitalize(results.type.join(", "))}
                />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <StyledAvatar>
                    <CarpenterIcon />
                  </StyledAvatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography style={{ color: phytoMatterBlackColor }}>
                      Material Function
                    </Typography>
                  }
                  secondary={capitalize(results.function.join(", "))}
                />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <StyledAvatar>
                    <ConstructionIcon />
                  </StyledAvatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography style={{ color: phytoMatterBlackColor }}>
                      Processing
                    </Typography>
                  }
                  secondary={capitalize(results.processing.join(", "))}
                />
              </ListItem>
            </List>
          </Grid>

          <Grid item xs={12} sm={6} md={8} lg={9}>
            <Typography variant="h4" gutterBottom>
              Projects
            </Typography>
            {results.projects.map((project) => (
              <Container
                sx={{
                  bgcolor: "background.paper",
                  marginBottom: 2,
                  paddingTop: 2,
                  paddingBottom: 2,
                }}
              >
                <Grid container>
                  <Grid item xs={12} md={8}>
                    <List>
                      <ListItemText
                        primary={
                          <Typography
                            variant="h6"
                            style={{ color: phytoMatterBlackColor }}
                          >
                            <b>{project.title}</b>
                          </Typography>
                        }
                        secondary={startCase(project.author)}
                      />
                      <ListItemText
                        primary={
                          <Typography style={{ color: phytoMatterBlackColor }}>
                            {project.about}
                          </Typography>
                        }
                      />
                      {project.comment ? (
                        <ListItemText
                          sx={{
                            marginTop: 4,
                          }}
                          primary={
                            <Typography
                              variant="subtitle1"
                              style={{ color: phytoMatterBlackColor }}
                            >
                              Comment on phytoremediation process:
                            </Typography>
                          }
                          secondary={capitalize(results.type.join(", "))}
                        />
                      ) : (
                        <></>
                      )}
                      <Box>
                        <Divider
                          style={{
                            margin: 10,
                          }}
                        />
                        <Grid container>
                          <Grid item xs={3} md={2}>
                            <StyledAvatar>
                              <LinkIcon />
                            </StyledAvatar>
                          </Grid>
                          <Grid item xs={9} md={10} style={{ marginTop: 5 }}>
                            <Link
                              to={project.link}
                              rel="noopener noreferrer"
                              target="_blank"
                              style={{
                                color: phytoMatterBlackColor,
                                cursor: "pointer",
                              }}
                            >
                              Project Link
                            </Link>
                          </Grid>
                        </Grid>
                      </Box>
                    </List>
                  </Grid>
                  <Grid item xs={12} md={4} zeroMinWidth>
                    <img src={project.image} alt={""} width={200} />
                  </Grid>
                </Grid>
              </Container>
            ))}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
