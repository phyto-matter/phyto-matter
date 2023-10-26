import { Button, ButtonProps, Container, Grid, styled } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const StyledButton = styled(Button)<ButtonProps>((theme) => ({
  variant: "text",
  color: "black",
  borderColor: "black",
  margin: 20,
  height: 36,
  backgroundPosition: "center",
  backgroundSize: "cover",
  "&:hover": {
    backgroundColor: "white",
  },
}));

export function TopMenu() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Container
      maxWidth={false}
      style={{
        padding: 20,
        height: 130,
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: "white",
        zIndex: 3,
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
            disableRipple
            onClick={() => navigate("/plants")}
            style={{
              width: 100,
              backgroundImage: location.pathname.startsWith("/plants")
                ? "url(/icons/plants_green.png)"
                : "url(/icons/plants.png)",
            }}
          ></StyledButton>
        </Grid>
        <Grid>
          <StyledButton
            disableRipple
            onClick={() => navigate("/contaminants")}
            style={{
              width: 180,
              backgroundImage: location.pathname.startsWith("/contaminants")
                ? "url(/icons/contam_yellow.png)"
                : "url(/icons/contam.png)",
            }}
          ></StyledButton>
        </Grid>
        {
          <Grid>
            <StyledButton
              disableRipple
              onClick={() => navigate("/materials")}
              style={{
                width: 130,
                backgroundImage: location.pathname.startsWith("/materials")
                  ? "url(/icons/materials_brown.png)"
                  : "url(/icons/materials.png)",
              }}
            ></StyledButton>
          </Grid>
        }
        <Grid>
          <StyledButton
            disableRipple
            onClick={() => navigate("/calculator")}
            style={{
              height: 65,
              backgroundImage: location.pathname.startsWith("/calculator")
                ? "url(/icons/calculator-filled.png)"
                : "url(/icons/calculator.png)",
            }}
          ></StyledButton>
        </Grid>
      </Grid>
    </Container>
  );
}
