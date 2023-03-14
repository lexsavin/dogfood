import { useContext, useState } from "react";
import CardList from "../../components/CardList";
import Sort from "../../components/Sort";
import { CardContext } from "../../context/cardContext";

const tabs = [
  { id: "all", title: "Все товары" },
  {
    id: "cheap",
    title: "Сначала дешёвые",
  },
  {
    id: "low",
    title: "Сначала дорогие",
  },
  {
    id: "sale",
    title: "По скидке",
  },
];

const sortСallbacks = {
  cheap: (cards) =>
    [...cards].sort((a, b) => a.price - a.discount - (b.price - b.discount)),
  low: (cards) =>
    [...cards].sort((a, b) => b.price - b.discount - (a.price - a.discount)),
  sale: (cards) => cards.filter((card) => card.discount > 0),
};

export const CatalogPage = () => {
  const { cards } = useContext(CardContext);
  const [selectedSort, setSelectedSort] = useState("all");

  const sortedCards =
    selectedSort === "all" ? cards : sortСallbacks[selectedSort](cards);

  const handleChangeSort = (tabId) => setSelectedSort(tabId);

  return (
    <>
      <Sort
        tabs={tabs}
        selectedSort={selectedSort}
        onChangeSort={handleChangeSort}
      />
      <div className="content__cards">
        <CardList cards={sortedCards} />
      </div>
    </>
  );
};
