import {
  Autocomplete,
  Container,
  FormControl,
  Grid,
  InputLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  styled,
  Switch,
  TextField,
  ThemeProvider,
} from "@mui/material";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import { capitalize, groupBy, lowerCase, omitBy, upperCase } from "lodash";
import { useCallback, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { NORMALISED_DATA, PlantEntry } from "../utils/get-normalised-data";

import { createTheme } from "@mui/material";
import { fontTheme } from "../global-themes";
import { phytoMatterGreenColor } from "../global-constants";

const IconStyle = styled("img")({
  width: 150,
  marginRight: 50,
  marginLeft: 50,
});

type PlantFilters = {
  latin_name: string;
  contaminant: string;
  vegetation_type: string;
  hardiness_zone: string;
  soil: string;
  shade: string;
};

export function PlantsView() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedView = searchParams.get("view") || "grid";
  const filters: PlantFilters = useMemo(
    () => ({
      latin_name: searchParams.get("latin_name") || "",
      contaminant: searchParams.get("contaminant") || "",
      vegetation_type: searchParams.get("vegetation_type") || "",
      hardiness_zone: searchParams.get("hardiness_zone") || "",
      soil: searchParams.get("soil") || "",
      shade: searchParams.get("shade") || "",
    }),
    [searchParams],
  );
  const updateFilters = useCallback(
    (update: Partial<PlantFilters>) => {
      setSearchParams(
        omitBy(
          {
            ...filters,
            view: selectedView,
            ...update,
          },
          (v) => !v,
        ),
      );
    },
    [filters, selectedView, setSearchParams],
  );
  const displayData = useMemo(
    () =>
      NORMALISED_DATA.filter((e) => {
        return (
          (!filters.latin_name ||
            lowerCase(e.latin_name).includes(lowerCase(filters.latin_name))) &&
          (!filters.contaminant ||
            e.contaminants.some((c) => c.name === filters.contaminant)) &&
          (!filters.hardiness_zone ||
            e.hardiness_zone === filters.hardiness_zone) &&
          (!filters.shade || e.shade === filters.shade) &&
          (!filters.soil || e.soil === filters.soil) &&
          (!filters.vegetation_type ||
            e.vegetation_type === filters.vegetation_type)
        );
      }),
    [filters],
  );
  const byVegetationType = useMemo(
    () => Object.entries(groupBy(displayData, "vegetation_type")),
    [displayData],
  );

  return (
    <div
      style={{
        backgroundColor: phytoMatterGreenColor,
        paddingTop: 150,
        minHeight: "100vh",
      }}
    >
      <Container>
        <Controls
          displayData={displayData}
          filters={filters}
          updateFilters={updateFilters}
          selectedView={selectedView}
          setSelectedView={(view) => setSearchParams({ view })}
          clearFilters={() => setSearchParams({})}
        />
      </Container>
      <Container style={{ marginTop: 50 }}>
        {selectedView === "grid" ? (
          <Grid
            container
            spacing={2}
            alignItems="start"
            justifyContent="center"
            style={{ margin: 0 }}
          >
            {[...byVegetationType].map(([vegType, plants]) => (
              <Grid key={vegType} item xs={6} md={3}>
                <List
                  dense={true}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setSearchParams({
                      view: "list",
                      vegetation_type: plants[0].vegetation_type,
                    });
                  }}
                >
                  <ListItemIcon>
                    <IconStyle src={`/icons/${vegType}.png`} />
                  </ListItemIcon>
                </List>
              </Grid>
            ))}
          </Grid>
        ) : (
          [...byVegetationType].map(([vegType, plants]) => (
            <Grid container spacing={2} sx={{ mb: 5 }}>
              <Grid item xs={2} justifyContent={"flex-start"}>
                <IconStyle src={`/icons/${lowerCase(vegType)}.png`} />
              </Grid>
              <Grid item xs={10}>
                <List sx={{ width: "100%", paddingLeft: 10 }} key={vegType}>
                  {plants.map((plant, index) => (
                    <ListItem disablePadding key={plant.id}>
                      <ThemeProvider theme={fontTheme}>
                        <ListItemText
                          primary={
                            <Link
                              to={`/plants/${plant.id}`}
                              style={{ color: "black", textDecoration: "none" }}
                            >
                              {capitalize(plant.latin_name)}
                            </Link>
                          }
                        />
                      </ThemeProvider>
                    </ListItem>
                  ))}
                </List>
              </Grid>
            </Grid>
          ))
        )}
      </Container>
    </div>
  );
}

function Controls({
  displayData,
  filters,
  updateFilters,
  selectedView,
  setSelectedView,
  clearFilters,
}: {
  displayData: PlantEntry[];
  filters: PlantFilters;
  selectedView: string;
  setSelectedView: (v: string) => void;
  updateFilters: (f: Partial<PlantFilters>) => void;
  clearFilters: () => void;
}) {
  const uniqueContaminants = useMemo(
    () =>
      [
        ...new Set(
          displayData.flatMap((e) => e.contaminants).map((c) => c.name),
        ),
      ]
        .sort()
        .filter(Boolean),
    [displayData],
  );
  const uniqueHardiness = useMemo(
    () =>
      [...new Set(displayData.flatMap((e) => e.hardiness_zone))]
        .sort()
        .filter(Boolean),
    [displayData],
  );
  const uniqueSoil = useMemo(
    () =>
      [...new Set(displayData.flatMap((e) => e.soil))].sort().filter(Boolean),
    [displayData],
  );
  const uniqueShade = useMemo(
    () =>
      [...new Set(displayData.flatMap((e) => e.shade))].sort().filter(Boolean),
    [displayData],
  );
  const uniqueType = useMemo(
    () =>
      [...new Set(displayData.flatMap((e) => e.vegetation_type))]
        .sort()
        .filter(Boolean),
    [displayData],
  );

  return (
    <Grid container spacing={2}>
      <Grid item xs={6} md={3}>
        <GridViewOutlinedIcon />
        <Switch
          checked={selectedView === "list"}
          onClick={() => {
            if (selectedView === "grid") {
              setSelectedView("list");
              return;
            }
            clearFilters();
            setSelectedView("grid");
          }}
        />
        <FormatListBulletedOutlinedIcon />
      </Grid>
      {selectedView === "list" && (
        <>
          <Grid item xs={6} md={3}>
            <Autocomplete
              disablePortal
              freeSolo
              options={displayData.map((option) => option.latin_name)}
              sx={{ width: 300, maxWidth: "100%" }}
              onInputChange={(_, val) => updateFilters({ latin_name: val })}
              renderInput={(params) => (
                <TextField {...params} label="Latin Name" />
              )}
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <FormControl fullWidth sx={{ width: 300, maxWidth: "100%" }}>
              <InputLabel id="demo-simple-select-type">Type</InputLabel>
              <Select
                labelId="demo-simple-select-type"
                value={filters.vegetation_type}
                label="Type"
                onChange={(e) =>
                  updateFilters({ vegetation_type: e.target.value as string })
                }
              >
                <MenuItem value={""}>All</MenuItem>
                {uniqueType.map((c) => (
                  <MenuItem key={c} value={c}>
                    {capitalize(c)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} md={3}>
            <FormControl fullWidth sx={{ width: 300, maxWidth: "100%" }}>
              <InputLabel id="demo-simple-select-contaminant">
                Contaminant
              </InputLabel>
              <Select
                labelId="demo-simple-select-contaminant"
                value={filters.contaminant}
                label="Contaminant"
                onChange={(e) =>
                  updateFilters({ contaminant: e.target.value as string })
                }
              >
                <MenuItem value={""}>All</MenuItem>
                {uniqueContaminants.map((c) => (
                  <MenuItem key={c} value={c}>
                    {capitalize(c)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} md={3}>
            <FormControl fullWidth sx={{ width: 300, maxWidth: "100%" }}>
              <InputLabel id="demo-simple-select-hardiness">
                Hardiness
              </InputLabel>
              <Select
                labelId="demo-simple-select-hardiness"
                value={filters.hardiness_zone}
                label="Hardiness Zone"
                onChange={(e) =>
                  updateFilters({ hardiness_zone: e.target.value as string })
                }
              >
                <MenuItem value={""}>All</MenuItem>
                {uniqueHardiness.map((c) => (
                  <MenuItem key={c} value={c}>
                    {capitalize(c)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} md={3}>
            <FormControl fullWidth sx={{ width: 300, maxWidth: "100%" }}>
              <InputLabel id="demo-simple-select-soil">Soil</InputLabel>
              <Select
                labelId="demo-simple-select-soil"
                value={filters.soil}
                label="Soil"
                onChange={(e) =>
                  updateFilters({ soil: e.target.value as string })
                }
              >
                <MenuItem value={""}>All</MenuItem>
                {uniqueSoil.map((c) => (
                  <MenuItem key={c} value={c}>
                    {upperCase(c)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} md={3}>
            <FormControl fullWidth sx={{ width: 300, maxWidth: "100%" }}>
              <InputLabel id="demo-simple-select-shade">Shade</InputLabel>
              <Select
                labelId="demo-simple-select-shade"
                value={filters.shade}
                label="Shade"
                onChange={(e) =>
                  updateFilters({ shade: e.target.value as string })
                }
              >
                <MenuItem value={""}>All</MenuItem>
                {uniqueShade.map((c) => (
                  <MenuItem key={c} value={c}>
                    {upperCase(c)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </>
      )}
    </Grid>
  );
}
