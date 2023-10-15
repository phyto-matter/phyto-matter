import {
  Autocomplete,
  Chip,
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
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import { capitalize, groupBy, lowerCase, omitBy, uniqBy } from "lodash";
import React, { useCallback, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  ContaminantEntry,
  NORMALISED_DATA,
} from "../utils/get-normalised-data";

type ContaminantFilters = {
  name: string;
  category: string;
};

export function ContaminantsView() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedView = searchParams.get("view") || "grid";
  const filters: ContaminantFilters = useMemo(
    () => ({
      name: searchParams.get("name") || "",
      category: searchParams.get("category") || "",
    }),
    [searchParams],
  );
  const updateFilters = useCallback(
    (update: Partial<ContaminantFilters>) => {
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
  const allContaminants = useMemo(
    () =>
      uniqBy(
        NORMALISED_DATA.flatMap((e) => e.contaminants),
        "name",
      ),
    [],
  );
  const displayData = useMemo(
    () =>
      allContaminants.filter((e) => {
        return (
          (!filters.name ||
            lowerCase(e.name).includes(lowerCase(filters.name))) &&
          (!filters.category ||
            lowerCase(e.category).includes(lowerCase(filters.category)))
        );
      }),
    [allContaminants, filters],
  );
  const byType = useMemo(
    () => Object.entries(groupBy(displayData, "category")),
    [displayData],
  );

  return (
    <div
      style={{
        backgroundColor: "#EDBD16",
        paddingTop: 150,
        minHeight: "100vh",
      }}
    >
      <Container>
        <Controls
          filters={filters}
          updateFilters={updateFilters}
          clearFilters={() => setSearchParams({})}
          displayData={displayData}
          selectedView={selectedView}
          setSelectedView={(view) => {
            setSearchParams({ view });
          }}
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
            {[...byType].map(([contType, contaminants]) => (
              <Grid key={contType} item xs={6} md={3}>
                <List
                  dense={true}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setSearchParams({
                      view: "list",
                      category: contaminants[0].category,
                    });
                  }}
                >
                  <ListItem>
                    <ListItemText
                      primary={
                        <Typography variant="h5" sx={{ font: "vollkorn" }}>
                          {capitalize(contaminants[0].category)}
                        </Typography>
                      }
                    />
                  </ListItem>
                </List>
              </Grid>
            ))}
          </Grid>
        ) : (
          [...byType].map(([contType, contaminants]) => (
            <List sx={{ width: "100%" }} key={contType}>
              {contaminants.map((contaminant, index) => (
                <ListItem disablePadding key={contaminant.id}>
                  <ListItemIcon>
                    {index === 0 ? (
                      <Chip
                        label={capitalize(contaminants[0].category)}
                        sx={{ mr: 2 }}
                      />
                    ) : (
                      <Chip
                        label={contaminants[0].category}
                        sx={{ visibility: "hidden", mr: 2 }}
                      />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Link to={`/contaminants/${contaminant.id}`}>
                        {capitalize(contaminant.name)}
                      </Link>
                    }
                  />
                </ListItem>
              ))}
            </List>
          ))
        )}
      </Container>
    </div>
  );
}

function Controls({
  filters,
  updateFilters,
  clearFilters,
  displayData,
  selectedView,
  setSelectedView,
}: {
  filters: ContaminantFilters;
  updateFilters: (u: Partial<ContaminantFilters>) => void;
  clearFilters: () => void;
  displayData: ContaminantEntry[];
  selectedView: string;
  setSelectedView: (v: string) => void;
}) {
  const uniqueType = useMemo(
    () =>
      [...new Set(displayData.flatMap((e) => e.category))]
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
              options={displayData.map((option) => option.name)}
              sx={{ width: 300 }}
              onInputChange={(_, val) => updateFilters({ name: val })}
              renderInput={(params) => <TextField {...params} label="Name" />}
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-type">Type</InputLabel>
              <Select
                labelId="demo-simple-select-type"
                value={filters.category}
                label="Type"
                onChange={(e) =>
                  updateFilters({ category: e.target.value as string })
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
        </>
      )}
    </Grid>
  );
}
