import cn from "classnames";
import "./styles.css";

const Sort = ({ selectedSort, tabs = [], onChangeSort }) => {
  const handleClick = (e, tab) => {
    e.preventDefault();
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
          <a onClick={(e) => handleClick(e, tab)}>{tab.title}</a>
        </div>
      ))}
    </div>
  );
};

export default Sort;
