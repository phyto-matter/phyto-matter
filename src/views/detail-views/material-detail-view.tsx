import {
  Box,
  Container,
  Divider,
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
import { capitalize, startCase, upperCase } from "lodash";
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
        position: "fixed",
        left: 0,
        right: 0,
        minHeight: "100vh",
      }}
    >
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <Typography variant="h4" gutterBottom>
              {results.common_name}
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
                    <ParkIcon />
                  </StyledAvatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography style={{ color: phytoMatterBlackColor }}>
                      Vegetation Type
                    </Typography>
                  }
                  secondary={capitalize(results.vegetation_type)}
                />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <StyledAvatar>
                    <LocalFloristIcon />
                  </StyledAvatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography style={{ color: phytoMatterBlackColor }}>
                      Plant Species
                    </Typography>
                  }
                  secondary={results.plant_species}
                />
              </ListItem>
            </List>
          </Grid>

          <Grid item xs={12} md={9}>
            <Typography variant="h4" gutterBottom>
              Projects
            </Typography>
            <Box
              style={{
                maxHeight: "70vh",
                overflow: "auto",
              }}
            >
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
                    <Grid item xs={3}>
                      <ListItem>
                        <ListItemAvatar>
                          <StyledAvatar>
                            <HomeIcon />
                          </StyledAvatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Typography
                              style={{ color: phytoMatterBlackColor }}
                            >
                              Category
                            </Typography>
                          }
                          secondary={capitalize(results.category)}
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
                            <Typography
                              style={{ color: phytoMatterBlackColor }}
                            >
                              Material Function
                            </Typography>
                          }
                          secondary={capitalize(results.material_function)}
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
                            <Typography
                              style={{ color: phytoMatterBlackColor }}
                            >
                              Processing
                            </Typography>
                          }
                          secondary={capitalize(results.processing)}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemAvatar>
                          <StyledAvatar>
                            <LinkIcon />
                          </StyledAvatar>
                        </ListItemAvatar>
                        <ListItemText
                          secondary={
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
                          }
                        />
                      </ListItem>
                    </Grid>
                    <Divider
                      orientation="vertical"
                      variant="middle"
                      flexItem
                      sx={{ marginRight: 2 }}
                    />
                    <Grid item xs={6}>
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
                            <Typography
                              style={{ color: phytoMatterBlackColor }}
                            >
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
                            secondary={
                              <Typography
                                variant="body2"
                                style={{ color: phytoMatterBlackColor }}
                              >
                                {project.comment}
                              </Typography>
                            }
                          />
                        ) : (
                          <></>
                        )}
                      </List>
                    </Grid>
                    <Grid item xs={2} zeroMinWidth>
                      <img src={project.image} alt={""} width={200} />
                    </Grid>
                  </Grid>
                </Container>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
