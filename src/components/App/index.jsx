import { useState, useEffect } from "react";
import CardList from "../CardList";
import Footer from "../Footer";
import Header from "../Header";
import Logo from "../Logo";
import Search from "../Search";
import SeachInfo from "../SeachInfo";
import api from "../../utils/api";
import useDebounce from "../../hooks/useDebounce";
import { isLiked } from "../../utils/product";
import "./styles.css";

function App() {
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  const debounceSearchQuery = useDebounce(searchQuery, 500);

  const handleRequest = () => {
    api
      .search(debounceSearchQuery)
      .then((searchResult) => {
        setCards(searchResult);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    Promise.all([api.getProductList(), api.getUserInfo()])
      .then(([productsData, userData]) => {
        setCurrentUser(userData);
        setCards(productsData.products);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    handleRequest();
  }, [debounceSearchQuery]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleRequest();
  };

  const handleInputChange = (inputValue) => {
    setSearchQuery(inputValue);
  };

  function handleProductLike(product) {
    const liked = isLiked(product.likes, currentUser._id);

    api.changeLikeProduct(product._id, liked).then((newCard) => {
      const newProducts = cards.map((cardState) => {
        return cardState._id === newCard._id ? newCard : cardState;
      });

      setCards(newProducts);
    });
  }

  return (
    <>
      <Header user={currentUser}>
        <>
          <Logo className="logo logo_place_header" href="/" />
          <Search onSubmit={handleFormSubmit} onInput={handleInputChange} />
        </>
      </Header>
      <main className="content container">
        <SeachInfo searchCount={cards.length} searchText={searchQuery} />
        <div className="content__cards">
          <CardList
            goods={cards}
            onProductLike={handleProductLike}
            currentUser={currentUser}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
