import {
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
import { capitalize } from "lodash";
import React from "react";
import { NORMALISED_MATTER_DATA } from "../../utils/get-normalised-matter-data";
import { useParams } from "react-router-dom";
import ParkIcon from "@mui/icons-material/Park";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import ConstructionIcon from "@mui/icons-material/Construction";
import HomeIcon from "@mui/icons-material/Home";
import CarpenterIcon from "@mui/icons-material/Carpenter";
import Link from "@mui/material/Link";

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

          {results.projects.map((project) => (
            <Grid item xs={12} md={9}>
              <List sx={{ bgcolor: "background.paper" }}>
                <ListItem>
                  <Grid container>
                    <Grid item>
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
                              style={{ color: phytoMatterBlackColor }}
                            >
                              <b>{project.title}</b>
                            </Typography>
                          }
                          secondary={capitalize(project.author)}
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
                        <ListItemText
                          primary={
                            <Link
                              href={project.link}
                              variant="body2"
                              rel="noopener noreferrer"
                              target="_blank"
                              style={{ color: phytoMatterBlackColor }}
                            >
                              Project Link
                            </Link>
                          }
                        />
                      </List>
                    </Grid>
                    <Grid item>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          overflow: "hidden",
                        }}
                      >
                        <img src={project.image} alt={""} />
                      </div>
                    </Grid>
                  </Grid>
                </ListItem>
              </List>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}
