import cn from "classnames";
import s from "./styles.module.css";

export function FormButton({ children, color, ...props }) {
  return (
    <button {...props} className={cn(s.btn, s[color])}>
      {children}
    </button>
  );
}
