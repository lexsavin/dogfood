import "./styles.css";
import cn from "classnames";

function Header({ children, user }) {
  return (
    <header className={cn("header", "cover")}>
      <div className="container">
        <div className="wrapper">
          {children}
          <div className={cn("userInfo")}>
            {user?.email && <div>{user?.email}</div>}
            {user?.name && <div>{user?.name}</div>}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
