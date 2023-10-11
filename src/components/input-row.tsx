import React, { useState } from "react";
import {
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  MenuItem,
  Select,
  TableCell,
  TableRow,
} from "@mui/material";
import { capitalize } from "lodash";
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";

export function InputRow({
  contaminants,
  onAdd,
  onCancel,
}: {
  contaminants: string[];
  onAdd: (c: { contaminant: string; concentration: number }) => void;
  onCancel: () => void;
}) {
  const [contaminant, setSelected] = useState<string>(contaminants[0]);
  const [concentration, setConcentration] = useState<number>(0);

  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell component="th" scope="row">
        <FormControl fullWidth>
          <Select
            labelId="demo-simple-select-name"
            value={contaminant}
            onChange={(e) => setSelected(e.target.value as string)}
          >
            {contaminants.map((c) => (
              <MenuItem key={c} value={c}>
                {capitalize(c)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </TableCell>
      <TableCell align="right">
        <FormControl fullWidth>
          <Input
            placeholder="Concentration"
            type="number"
            inputProps={{ min: 0 }}
            onChange={(e) => {
              setConcentration(Number(e.target.value));
            }}
            endAdornment={<InputAdornment position="end">mg/kg</InputAdornment>}
          />
        </FormControl>
      </TableCell>
      <TableCell scope="row">
        <IconButton
          disabled={!(contaminant && concentration)}
          onClick={() => onAdd({ contaminant, concentration })}
        >
          <CheckIcon />
        </IconButton>
        <IconButton onClick={onCancel}>
          <CancelIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
