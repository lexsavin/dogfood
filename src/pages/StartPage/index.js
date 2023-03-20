import { Box, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

export const StartPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "150px",
      }}
    >
      <div>
        <h1>ВОЙДИТЕ В АККАУНТ ИЛИ ЗАРЕГИСТРИРУЙТСЬ!</h1>
      </div>
      <Box sx={{ display: "flex", gap: "10px" }}>
        <Button
          sx={{
            textTransform: "none",
            color: "black",
            borderColor: "black",
            borderRadius: "55px",
          }}
          onClick={() =>
            navigate("/login", {
              state: {
                backgroundLocation: location,
                initialPath: location.pathname,
              },
            })
          }
          variant="outlined"
        >
          Войти
        </Button>
        <Button
          sx={{
            textTransform: "none",
            color: "black",
            borderColor: "black",
            borderRadius: "55px",
          }}
          onClick={() =>
            navigate("/register", {
              state: {
                backgroundLocation: location,
                initialPath: location.pathname,
              },
            })
          }
          variant="outlined"
        >
          Регистрация
        </Button>
      </Box>
    </Box>
  );
};
