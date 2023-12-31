import {
  Box,
  Button,
  ButtonProps,
  Container,
  Grid,
  styled,
} from "@mui/material";
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
    <Box
      style={{
        height: 130,
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: "white",
        zIndex: 3,
      }}
    >
      <Container>
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item xs={3}>
            <Link to="/">
              <img
                alt={""}
                style={{ width: 200, marginRight: 50 }}
                src={"/icons/pm-logo.png"}
              />
            </Link>
          </Grid>
          <Grid item xs={2}>
            <StyledButton
              disableRipple
              onClick={() => navigate("/plants")}
              style={{
                width: 100,
                backgroundImage: location.pathname.startsWith("/plants")
                  ? "url(/icons/plants-green.png)"
                  : "url(/icons/plants-title.png)",
              }}
            ></StyledButton>
          </Grid>
          <Grid item xs={3}>
            <StyledButton
              disableRipple
              onClick={() => navigate("/contaminants")}
              style={{
                width: 180,
                backgroundImage: location.pathname.startsWith("/contaminants")
                  ? "url(/icons/contam-yellow-title.png)"
                  : "url(/icons/contam-title.png)",
              }}
            ></StyledButton>
          </Grid>
          <Grid item xs={3}>
            <StyledButton
              disableRipple
              onClick={() => navigate("/materials")}
              style={{
                width: 130,
                backgroundImage: location.pathname.startsWith("/materials")
                  ? "url(/icons/materials-brown-title.png)"
                  : "url(/icons/materials-title.png)",
              }}
            ></StyledButton>
          </Grid>
          <Grid item xs={1}>
            <StyledButton
              disableRipple
              onClick={() => navigate("/calculator")}
              style={{
                height: 65,
                backgroundImage: location.pathname.startsWith("/calculator")
                  ? "url(/icons/calculator-filled-title.png)"
                  : "url(/icons/calculator-title.png)",
              }}
            ></StyledButton>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
