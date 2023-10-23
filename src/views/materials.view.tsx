import { Container } from "@mui/material";
import { NORMALISED_MATTER_DATA } from "../utils/get-normalised-matter-data";

export function MaterialsView() {
  return (
    <Container
      maxWidth={false}
      sx={{
        padding: 3,
      }}
      style={{
        backgroundColor: "#9A7744",
        paddingTop: 150,
        paddingLeft: 150,
        paddingRight: 150,
        minHeight: "100vh",
      }}
    >
      <h3>{NORMALISED_MATTER_DATA.length} Materials</h3>
      <pre>{JSON.stringify(NORMALISED_MATTER_DATA, null, 2)}</pre>
    </Container>
  );
}
