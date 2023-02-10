import Card from "../Card";
import "./styles.css";

const CardList = ({ goods, onProductLike, currentUser }) => {
  return (
    <div className="cards">
      {goods.map((item, index) => (
        <Card
          key={item._id}
          {...item}
          onProductLike={onProductLike}
          currentUser={currentUser}
        />
      ))}
    </div>
  );
};

export default CardList;
