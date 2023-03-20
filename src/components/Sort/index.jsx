import cn from "classnames";
import "./styles.css";
import { Button } from "@mui/material";

const Sort = ({ selectedSort, tabs = [], onChangeSort }) => {
  const handleClick = (e, tab) => {
    onChangeSort(tab.id);
  };

  return (
    <div className="sort content__sort">
      {tabs.map((tab) => (
        <div
          className={cn("sort__link", {
            sort__link_selected: selectedSort === tab.id,
          })}
          key={tab.id}
          id={tab.id}
        >
          <Button
            sx={{
              textTransform: "none",
              fontSize: "14px",
              lineHeight: "20px",
              cursor: "pointer",
              color: selectedSort === tab.id ? "#1a1a1a" : "#7b8e98",
              "&:hover": {
                color: "#1a1a1a",
              },
            }}
            onClick={(e) => handleClick(e, tab)}
            variant="text"
          >
            {tab.title}
          </Button>
        </div>
      ))}
    </div>
  );
};

export default Sort;
