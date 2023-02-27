import s from "./styles.module.css";
import cn from "classnames";
import { ReactComponent as FavoriteIcon } from "./img/favorites.svg";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CardContext } from "../../context/cardContext";
import { UserContext } from "../../context/userContext";

function Header({ children }) {
  const { favorites } = useContext(CardContext);
  const { user: currentUser } = useContext(UserContext);

  return (
    <header className={cn(s.header, "cover")}>
      <div className="container">
        <div className={s.header__wrapper}>
          {children}
          <div className={s.userInfo}>
            {currentUser?.email && <div>{currentUser?.email}</div>}
            {currentUser?.name && <div>{currentUser?.name}</div>}
          </div>
          <div className={s.iconsMenu}>
            <Link className={s.favoritesLink} to="/favorites">
              <FavoriteIcon />
              {favorites.length !== 0 && (
                <span className={s.iconBubble}>{favorites.length}</span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
