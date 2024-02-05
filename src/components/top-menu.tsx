import {
  Box,
  Button,
  ButtonProps,
  Container,
  Grid,
  Menu,
  MenuItem,
  styled,
  useMediaQuery,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";

const StyledButton = styled(Button)<ButtonProps>((theme) => ({
  variant: "text",
  color: "black",
  borderColor: "black",
  margin: 20,
  height: 36,
  backgroundPosition: "center",
  backgroundSize: "cover",
  "&:hover": {
    backgroundColor: "transparent",
  },
}));

export function TopMenu() {
  const navigate = useNavigate();
  const location = useLocation();

  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  let checkDeviceSize = isSmallDevice ? "space-between" : "center";

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
        <Grid container alignItems="center" justifyContent={checkDeviceSize}>
          <Grid item xs={3}>
            <Link to="/">
              <img
                alt={""}
                style={{ width: 200, marginRight: 50 }}
                src={"/icons/pm-logo.png"}
              />
            </Link>
          </Grid>
          {isSmallDevice ? (
            <Grid item xs={2}>
              <StyledButton
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                style={{ width: 100 }}
                sx={{
                  "&:hover": {
                    backgroundColor: "gainsboro",
                  },
                }}
              >
                Menu
              </StyledButton>
              <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <MenuItem onClick={handleClose} style={{ height: 60 }}>
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
                </MenuItem>
                <MenuItem onClick={handleClose} style={{ height: 60 }}>
                  <StyledButton
                    disableRipple
                    onClick={() => navigate("/contaminants")}
                    style={{
                      width: 180,
                      backgroundImage: location.pathname.startsWith(
                        "/contaminants",
                      )
                        ? "url(/icons/contam-yellow-title.png)"
                        : "url(/icons/contam-title.png)",
                    }}
                  ></StyledButton>
                </MenuItem>
                <MenuItem onClick={handleClose} style={{ height: 60 }}>
                  <StyledButton
                    disableRipple
                    onClick={() => navigate("/materials")}
                    style={{
                      width: 130,
                      backgroundImage: location.pathname.startsWith(
                        "/materials",
                      )
                        ? "url(/icons/materials-brown-title.png)"
                        : "url(/icons/materials-title.png)",
                    }}
                  ></StyledButton>
                </MenuItem>
              </Menu>
            </Grid>
          ) : (
            <>
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
                    backgroundImage: location.pathname.startsWith(
                      "/contaminants",
                    )
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
            </>
          )}
          <Grid item xs={3} sm={1}>
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
