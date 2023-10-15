import { Button, ButtonProps, Container, Grid, styled } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const StyledButton = styled(Button)<ButtonProps>((theme) => ({
  color: "black",
  borderColor: "black",
  margin: 20,
}));

export function TopMenu() {
  const navigate = useNavigate();

  return (
    <Container
      style={{
        padding: 20,
        height: 130,
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: "white",
        zIndex: 2,
      }}
    >
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid>
          <Link to="/">
            <img
              alt={""}
              style={{ width: 200, marginRight: 50 }}
              src={"/icons/logo.png"}
            />
          </Link>
        </Grid>
        <Grid>
          <StyledButton
            variant="text"
            onClick={() => navigate("/plants")}
            style={{
              height: 36,
              width: 100,
              backgroundImage: "url(/icons/plants.png)",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          ></StyledButton>
        </Grid>
        <Grid>
          <StyledButton
            variant="text"
            onClick={() => navigate("/contaminants")}
            style={{
              height: 36,
              width: 180,
              backgroundImage: "url(/icons/contam.png)",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          ></StyledButton>
        </Grid>
        {/*<Grid>
          <StyledButton variant="outlined"  onClick={() => navigate("/materials")}>
            MATERIALS
          </StyledButton>
        </Grid>*/}
        <Grid>
          <StyledButton
            variant="text"
            onClick={() => navigate("/calculator")}
            style={{
              height: 65,
              backgroundImage: "url(/icons/calculator.png)",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          ></StyledButton>
        </Grid>
      </Grid>
    </Container>
  );
}
