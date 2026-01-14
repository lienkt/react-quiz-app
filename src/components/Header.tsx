import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router";

function Header() {
  const navigate = useNavigate();

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            ></IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, cursor: "pointer" }}
              onClick={() => navigate("/dashboard")}
            >
              QUIZ APP
            </Typography>
            <Button color="inherit" onClick={() => navigate("/leader-board")}>
              Leaderboard
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}

export default Header;
