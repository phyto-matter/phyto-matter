import { Container } from "@mui/material";
import { NORMALISED_MATTER_DATA } from "../utils/get-normalised-matter-data";

export function MaterialsView() {
  return (
    <Container
      style={{
        backgroundColor: "#EDBD16",
        paddingTop: 150,
        minHeight: "100vh",
      }}
    >
      <h3>{NORMALISED_MATTER_DATA.length} Materials</h3>
      <pre>{JSON.stringify(NORMALISED_MATTER_DATA, null, 2)}</pre>
    </Container>
  );
}
