import {
  Container,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useCallback, useMemo, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { NORMALISED_DATA } from "../utils/get-normalised-data";
import { InputRow } from "../components/input-row";
import { usePlantSuggestions } from "../hooks/use-plant-suggestions";
import { Link, useSearchParams } from "react-router-dom";
import { capitalize, uniqBy } from "lodash";
import { TimelineChart } from "../components/timeline-chart";

type TableRowEntry = {
  contaminant: string;
  concentration: number;
};

const ENTRIES_KEY = "entries";
const ENTRIES_SEPARATOR = ":";

export function CalculatorView() {
  const [searchParams, setSearchParams] = useSearchParams();
  const setTableRows = useCallback(
    (rows: TableRowEntry[]) => {
      setSearchParams({
        [ENTRIES_KEY]: rows.map(({ contaminant, concentration }) =>
          [contaminant, concentration].join(ENTRIES_SEPARATOR),
        ),
      });
    },
    [setSearchParams],
  );
  const tableRows = useMemo(
    () =>
      searchParams
        .getAll(ENTRIES_KEY)
        .map((_) => _.split(ENTRIES_SEPARATOR))
        .map(
          ([contaminant, concentration]): TableRowEntry => ({
            contaminant,
            concentration: Number(concentration) || 0,
          }),
        ),
    [searchParams],
  );
  const [isAdding, setIsAdding] = useState(false);
  const suggestions = usePlantSuggestions(tableRows.map((_) => _.contaminant));
  const references = useMemo(
    () =>
      uniqBy(
        suggestions.flatMap((_) => _.references),
        "reference",
      ),
    [suggestions],
  );
  const uniqueContaminant = useMemo(
    () =>
      [
        ...new Set(
          NORMALISED_DATA.flatMap((plant) => plant.contaminants).flatMap(
            (e) => e.name,
          ),
        ),
      ]
        .filter(Boolean)
        .filter(
          (name) => !tableRows.some(({ contaminant }) => contaminant === name),
        )
        .sort((a, b) => a.localeCompare(b)),
    [tableRows],
  );

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Contaminant</TableCell>
                  <TableCell align="right">Concentration</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tableRows.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{capitalize(row.contaminant)}</TableCell>
                    <TableCell align="right">
                      {row.concentration.toLocaleString()}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        onClick={() =>
                          setTableRows(tableRows.filter((_, i) => i !== index))
                        }
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
                {isAdding && (
                  <InputRow
                    contaminants={uniqueContaminant}
                    onAdd={(newRow) => {
                      setTableRows([...tableRows, newRow]);
                      setIsAdding(false);
                    }}
                    onCancel={() => setIsAdding(false)}
                  />
                )}
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell align="right">
                    <IconButton
                      disabled={isAdding}
                      onClick={() => setIsAdding(true)}
                    >
                      <AddIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
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
                    <b>Plant</b>
                  </TableCell>
                  <TableCell>
                    <b>Vegetation type</b>
                  </TableCell>
                  <TableCell>
                    <b>Removal Rate</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {suggestions.map((suggestion) => (
                  <TableRow>
                    <TableCell>
                      <Link to={`/contaminants/${suggestion.contaminantId}`}>
                        {suggestion.contaminant}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Link to={`/plants/${suggestion.plantId}`}>
                        {suggestion.plant}
                      </Link>
                    </TableCell>
                    <TableCell>
                      {capitalize(suggestion.vegetation_type)}
                    </TableCell>
                    <TableCell>
                      {suggestion.lower_rate && suggestion.upper_rate
                        ? `${suggestion.lower_rate.toLocaleString()} - ${suggestion.upper_rate.toLocaleString()} mg/kg`
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
          <TimelineChart />
        </Grid>
        <Grid item xs={12}>
          {" "}
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
