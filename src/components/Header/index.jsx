import s from "./styles.module.css";
import cn from "classnames";
import { ReactComponent as FavoriteIcon } from "./img/favorites.svg";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CardContext } from "../../context/cardContext";
import { UserContext } from "../../context/userContext";
import { Button } from "@mui/material";
import { clearTokenLocalStorage } from "../../utils/token";

function Header({ children }) {
  const { favorites, setCards } = useContext(CardContext);
  const {
    token,
    setToken,
    user: currentUser,
    setCurrentUser,
  } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <header className={cn(s.header, "cover")}>
      <div className="container">
        <div className={s.header__wrapper}>
          {children}
          <div className={s.userInfo}>
            {currentUser?.email && <div>{currentUser?.email}</div>}
            {currentUser?.name && <div>{currentUser?.name}</div>}
            {token && (
              <Button
                sx={{
                  textTransform: "none",
                  color: "black",
                  borderColor: "black",
                  borderRadius: "55px",
                }}
                onClick={() => {
                  clearTokenLocalStorage();
                  setToken(null);
                  setCurrentUser(null);
                  setCards([]);
                  navigate("/");
                }}
                variant="outlined"
              >
                Выйти
              </Button>
            )}
          </div>
          <div className={s.iconsMenu}>
            {token && (
              <Link className={s.favoritesLink} to="/favorites">
                <FavoriteIcon />
                {favorites.length !== 0 && (
                  <span className={s.iconBubble}>{favorites.length}</span>
                )}
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
