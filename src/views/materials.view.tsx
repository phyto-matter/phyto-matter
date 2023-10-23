import { Container } from "@mui/material";

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
    ></Container>
  );
}
