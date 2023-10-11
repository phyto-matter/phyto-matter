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
    <Container style={{ marginTop: 20 }}>
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid>
          <Link to="/">
            <img
              alt={""}
              style={{ width: 200, marginRight: 50 }}
              src={"/pm-logo.png"}
            />
          </Link>
        </Grid>
        <Grid>
          <StyledButton variant="outlined" onClick={() => navigate("/plants")}>
            PLANTS
          </StyledButton>
        </Grid>
        <Grid>
          <StyledButton
            variant="outlined"
            onClick={() => navigate("/contaminants")}
          >
            CONTAMINANTS
          </StyledButton>
        </Grid>
        {/*<Grid>
          <StyledButton variant="outlined"  onClick={() => navigate("/materials")}>
            MATERIALS
          </StyledButton>
        </Grid>*/}
        <Grid>
          <StyledButton
            variant="outlined"
            onClick={() => navigate("/calculator")}
            style={{
              borderRadius: "50%",
              height: 65,
            }}
          >
            <img
              alt={""}
              style={{
                width: 35,
              }}
              src={"/calculator.png"}
            />
          </StyledButton>
        </Grid>
      </Grid>
    </Container>
  );
}
