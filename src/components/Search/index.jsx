import "./styles.css";
import { ReactComponent as SearchIcon } from "./ic-search.svg";

function Search({ onSubmit, onInput }) {
  const handleInput = (e) => {
    onInput(e.target.value);
  };
  return (
    <form className="search" onSubmit={onSubmit}>
      <input
        type="text"
        className="search__input"
        placeholder="Поиск"
        onInput={handleInput}
      />
      <button className="search__btn">
        <SearchIcon />
      </button>
    </form>
  );
}

export default Search;
