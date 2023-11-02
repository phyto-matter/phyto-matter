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
  TextField,
  ThemeProvider,
} from "@mui/material";
import {
  MatterEntry,
  NORMALISED_MATTER_DATA,
} from "../utils/get-normalised-matter-data";
import { IconStyle, phytoMatterBrownColor } from "../global-constants";
import {
  capitalize,
  groupBy,
  lowerCase,
  omitBy,
  snakeCase,
  uniq,
} from "lodash";
import { useCallback, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { fontTheme } from "../global-themes";
import { MaterialFilters } from "../global-types";
import ArrowRightRoundedIcon from "@mui/icons-material/ArrowRightRounded";

export function MaterialsView() {
  const [searchParams, setSearchParams] = useSearchParams();
  const filters: MaterialFilters = useMemo(
    () => ({
      name: searchParams.get("common_name") || "",
      category: searchParams.get("category") || "",
      plant_genus: searchParams.get("plant_genus") || "",
      material_function: searchParams.get("building_material_function") || "",
      processing: searchParams.get("processing") || "",
    }),
    [searchParams],
  );

  const allUniqueCategories = uniq(
    NORMALISED_MATTER_DATA.flatMap((e) => e.category),
  );
  const allMaterialsByCommonName = NORMALISED_MATTER_DATA.flatMap(
    (e) => e.common_name,
  );
  const byCategory = useMemo(
    () => Object.entries(groupBy(NORMALISED_MATTER_DATA, "category")),
    [NORMALISED_MATTER_DATA],
  );

  const updateFilters = useCallback(
    (update: Partial<MaterialFilters>) => {
      setSearchParams(
        omitBy(
          {
            ...filters,
            ...update,
          },
          (v) => !v,
        ),
      );
    },
    [filters, setSearchParams],
  );
  const displayData = useMemo(
    () =>
      NORMALISED_MATTER_DATA.filter((e) => {
        return (
          (!filters.name ||
            lowerCase(e.common_name).includes(lowerCase(filters.category))) &&
          (!filters.category || e.category.includes(filters.category)) &&
          (!filters.plant_genus || e.plant_genus === filters.plant_genus) &&
          (!filters.material_function ||
            e.material_function.includes(filters.material_function)) &&
          (!filters.processing || e.processing.includes(filters.processing))
        );
      }),
    [filters],
  );

  return (
    <div
      style={{
        backgroundColor: phytoMatterBrownColor,
        paddingTop: 150,
        minHeight: "100vh",
      }}
    >
      <Container
        style={{
          position: "fixed",
          backgroundColor: phytoMatterBrownColor,
          zIndex: 2,
          left: 0,
          right: 0,
          top: 130,
          paddingTop: 20,
        }}
      >
        <Controls
          displayData={displayData}
          filters={filters}
          updateFilters={updateFilters}
          setSelectedView={(view) => setSearchParams({ view })}
          clearFilters={() => setSearchParams({})}
        />
      </Container>
      <Container style={{ marginTop: 50 }}>
        <Grid
          container
          spacing={2}
          alignItems="start"
          justifyContent="center"
          style={{ margin: 0 }}
        >
          {[...byCategory].map(([category, materials]) => (
            <Grid key={category} item xs={6} md={2}>
              <List dense={true}>
                <ListItemIcon>
                  <IconStyle src={`/icons/${snakeCase(category)}.png`} />
                </ListItemIcon>
              </List>
              <Grid item xs={10}>
                <List sx={{ width: "100%", paddingLeft: 10 }} key={category}>
                  {materials.map((material, index) => (
                    <ListItem disablePadding key={material.id}>
                      <ArrowRightRoundedIcon />
                      <ThemeProvider theme={fontTheme}>
                        <ListItemText
                          primary={
                            <Link
                              to={`/materials/${material.id}`}
                              style={{
                                color: "black",
                                textDecoration: "none",
                              }}
                            >
                              {capitalize(material.common_name)}
                            </Link>
                          }
                        />
                      </ThemeProvider>
                    </ListItem>
                  ))}
                </List>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

function Controls({
  displayData,
  filters,
  updateFilters,
  setSelectedView,
  clearFilters,
}: {
  displayData: MatterEntry[];
  filters: MaterialFilters;
  setSelectedView: (v: string) => void;
  updateFilters: (f: Partial<MaterialFilters>) => void;
  clearFilters: () => void;
}) {
  const uniqueProjects = useMemo(
    () =>
      [...new Set(displayData.flatMap((e) => e.projects).map((c) => c.title))]
        .sort()
        .filter(Boolean),
    [displayData],
  );
  const uniquePlantGenus = useMemo(
    () =>
      [...new Set(displayData.flatMap((e) => e.plant_genus))]
        .sort()
        .filter(Boolean),
    [displayData],
  );
  const uniqueFuncion = useMemo(
    () =>
      [...new Set(displayData.flatMap((e) => e.material_function))]
        .sort()
        .filter(Boolean),
    [displayData],
  );
  const uniqueProcessing = useMemo(
    () =>
      [...new Set(displayData.flatMap((e) => e.processing))]
        .sort()
        .filter(Boolean),
    [displayData],
  );

  return (
    <Grid container spacing={2}>
      <Grid item xs={6} md={3}>
        <Autocomplete
          disablePortal
          freeSolo
          options={displayData.map((option) => option.common_name)}
          sx={{ width: 300, maxWidth: "100%" }}
          onInputChange={(_, val) => updateFilters({ name: val })}
          renderInput={(params) => (
            <TextField {...params} label="Common Name" />
          )}
        />
      </Grid>
      <Grid item xs={6} md={3}>
        <Autocomplete
          disablePortal
          freeSolo
          options={displayData.map((option) => option.plant_genus)}
          sx={{ width: 300, maxWidth: "100%" }}
          onInputChange={(_, val) => updateFilters({ plant_genus: val })}
          renderInput={(params) => (
            <TextField {...params} label="Plant Genus" />
          )}
        />
      </Grid>
      <Grid item xs={6} md={3}>
        <FormControl fullWidth sx={{ width: 300, maxWidth: "100%" }}>
          <InputLabel id="demo-simple-select-contaminant">
            Building Material Function
          </InputLabel>
          <Select
            labelId="demo-simple-select-contaminant"
            value={filters.material_function}
            label="Material Funcion"
            onChange={(e) =>
              updateFilters({ material_function: e.target.value as string })
            }
          >
            <MenuItem value={""}>All</MenuItem>
            {uniqueFuncion.map((c) => (
              <MenuItem key={c} value={c}>
                {capitalize(c)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6} md={3}>
        <FormControl fullWidth sx={{ width: 300, maxWidth: "100%" }}>
          <InputLabel id="demo-simple-select-hardiness">Processing</InputLabel>
          <Select
            labelId="demo-simple-select-hardiness"
            value={filters.processing}
            label="Processing"
            onChange={(e) =>
              updateFilters({ processing: e.target.value as string })
            }
          >
            <MenuItem value={""}>All</MenuItem>
            {uniqueProcessing.map((c) => (
              <MenuItem key={c} value={c}>
                {capitalize(c)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
}
