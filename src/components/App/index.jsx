import { useState, useEffect, useCallback } from "react";
import Header from "../Header";
import Logo from "../Logo";
import Search from "../Search";
import SearchInfo from "../SearchInfo";
import Footer from "../Footer";
import Modal from "../Modal";
import api from "../../utils/api";
import useDebounce from "../../hooks/useDebounce";
import { Login } from "../Login";
import { Register } from "../Register";
import { isLiked } from "../../utils/product";
import { Route, Routes, useLocation } from "react-router-dom";
import { StartPage } from "../../pages/StartPage";
import { CatalogPage } from "../../pages/CatalogPage";
import { ProductPage } from "../../pages/ProductPage";
import { FaqPage } from "../../pages/FAQPage";
import { FavoritePage } from "../../pages/FavoritePage";
import { NotFoundPage } from "../../pages/NotFoundPage";
import { UserContext } from "../../context/userContext";
import { CardContext } from "../../context/cardContext";
import "./styles.css";
import styled from "@emotion/styled";
import { stylesMain } from "./styles.js";
import { getTokenLocalStorage } from "../../utils/token";

const StyledMain = styled("main")(stylesMain);

function App() {
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(getTokenLocalStorage());

  const debounceSearchQuery = useDebounce(searchQuery, 500);

  const location = useLocation();

  const backgroundLocation = location.state?.backgroundLocation;

  const initialPath = location.state?.initialPath;

  const isPathNotFound =
    location.pathname !== "/" &&
    !location.pathname.startsWith("/product") &&
    !location.pathname.startsWith("/faq") &&
    !location.pathname.startsWith("/favorites") &&
    !location.pathname.startsWith("/login") &&
    !location.pathname.startsWith("/register");

  const handleRequest = useCallback(() => {
    setIsLoading(true);

    api
      .search(searchQuery, token)
      .then((searchResult) => {
        setCards(searchResult);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }, [searchQuery, token]);

  useEffect(() => {
    if (!token) return;

    setIsLoading(true);

    Promise.all([api.getProductList(token), api.getUserInfo(token)])
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
  }, [token]);

  useEffect(() => {
    if (!token) return;

    handleRequest();
  }, [debounceSearchQuery, token]);

  const handleFormSubmit = (inputText) => {
    setSearchQuery(inputText);
    handleRequest();
  };

  const handleInputChange = (inputValue) => {
    setSearchQuery(inputValue);
  };

  const handleProductLike = useCallback(
    (product) => {
      const liked = isLiked(product.likes, currentUser._id);
      return api
        .changeLikeProduct(product._id, liked, token)
        .then((updateCard) => {
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
    [currentUser, cards, token]
  );

  return (
    <UserContext.Provider
      value={{ token, setToken, user: currentUser, setCurrentUser, isLoading }}
    >
      <CardContext.Provider
        value={{ cards, setCards, favorites, handleLike: handleProductLike }}
      >
        <Header>
          <>
            <Logo className="logo logo_place_header" href="/" />
            {!(
              (location.pathname.startsWith("/") && !token) ||
              location.pathname.startsWith("/product") ||
              location.pathname.startsWith("/faq") ||
              location.pathname.startsWith("/favorites")
            ) && (
              <Search onSubmit={handleFormSubmit} onInput={handleInputChange} />
            )}
          </>
        </Header>
        <StyledMain isPathNotFound={isPathNotFound}>
          <SearchInfo searchText={searchQuery} />
          <Routes
            location={
              (backgroundLocation && {
                ...backgroundLocation,
                pathname: initialPath,
              }) ||
              location
            }
          >
            <Route index element={token ? <CatalogPage /> : <StartPage />} />
            <Route
              path="/product/:productId"
              element={<ProductPage isLoading={isLoading} />}
            />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/favorites" element={<FavoritePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          {backgroundLocation && (
            <Routes>
              <Route
                path="/login"
                element={
                  <Modal>
                    <Login />
                  </Modal>
                }
              />
              <Route
                path="/register"
                element={
                  <Modal>
                    <Register />
                  </Modal>
                }
              />
            </Routes>
          )}
        </StyledMain>
        <Footer />
      </CardContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
