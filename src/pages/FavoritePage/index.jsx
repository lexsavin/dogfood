import { useContext } from "react";
import CardList from "../../components/CardList";
import { ContentHeader } from "../../components/ContentHeader";
import { CardContext } from "../../context/cardContext";

export const FavoritePage = () => {
  const { favorites } = useContext(CardContext);
  return (
    <>
      <ContentHeader title="Избранное" />
      <div className="content__cards">
        <CardList cards={favorites} />
      </div>
    </>
  );
};
