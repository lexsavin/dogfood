import { useState, useEffect, useCallback } from "react";
import Header from "../Header";
import Logo from "../Logo";
import Search from "../Search";
import SearchInfo from "../SearchInfo";
import Footer from "../Footer";
import api from "../../utils/api";
import useDebounce from "../../hooks/useDebounce";
import { isLiked } from "../../utils/product";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { CatalogPage } from "../../pages/CatalogPage";
import { ProductPage } from "../../pages/ProductPage";
import { FaqPage } from "../../pages/FAQPage";
import { FavoritePage } from "../../pages/FavoritePage";
import { NotFoundPage } from "../../pages/NotFoundPage";
import { UserContext } from "../../context/userContext";
import { CardContext } from "../../context/cardContext";
import "./styles.css";

function App() {
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const debounceSearchQuery = useDebounce(searchQuery, 500);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleRequest = useCallback(() => {
    setIsLoading(true);

    api
      .search(searchQuery)
      .then((searchResult) => {
        setCards(searchResult);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }, [searchQuery]);

  useEffect(() => {
    setIsLoading(true);

    Promise.all([api.getProductList(), api.getUserInfo()])
      .then(([productsData, userData]) => {
        setCurrentUser(userData);
        setCards(productsData.products);
        const favoriteProducts = productsData.products.filter((item) =>
          isLiked(item.likes, userData._id)
        );
        setFavorites((prevSate) => favoriteProducts);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    handleRequest();
  }, [debounceSearchQuery]);

  const handleFormSubmit = (inputText) => {
    navigate("/");
    setSearchQuery(inputText);
    handleRequest();
  };

  const handleInputChange = (inputValue) => {
    setSearchQuery(inputValue);
  };

  const handleProductLike = useCallback(
    (product) => {
      const liked = isLiked(product.likes, currentUser._id);
      return api.changeLikeProduct(product._id, liked).then((updateCard) => {
        const newProducts = cards.map((cardState) => {
          return cardState._id === updateCard._id ? updateCard : cardState;
        });

        if (!liked) {
          setFavorites((prevState) => [...prevState, updateCard]);
        } else {
          setFavorites((prevState) =>
            prevState.filter((card) => card._id !== updateCard._id)
          );
        }

        setCards(newProducts);
        return updateCard;
      });
    },
    [currentUser, cards]
  );

  return (
    <UserContext.Provider value={{ user: currentUser, isLoading }}>
      <CardContext.Provider
        value={{ cards, favorites, handleLike: handleProductLike }}
      >
        <Header>
          <>
            <Logo className="logo logo_place_header" href="/" />
            {!pathname.startsWith("/product") && (
              <Search onSubmit={handleFormSubmit} onInput={handleInputChange} />
            )}
          </>
        </Header>
        <main className="content container">
          <SearchInfo searchText={searchQuery} />
          <Routes>
            <Route index element={<CatalogPage />} />
            <Route
              path="/product/:productId"
              element={<ProductPage isLoading={isLoading} />}
            />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/favorites" element={<FavoritePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </CardContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
