import { useContext } from "react";
import { useCallback } from "react";
import { useParams } from "react-router-dom";
import { NotFound } from "../../components/NotFound";
import { Product } from "../../components/Product";
import Spinner from "../../components/Spinner";
import { CardContext } from "../../context/cardContext";
import { UserContext } from "../../context/userContext";
import { useApi } from "../../hooks/useApi";
import api from "../../utils/api";

export const ProductPage = () => {
  const { productId } = useParams();
  const { handleLike } = useContext(CardContext);
  const { token } = useContext(UserContext);

  const handleGetProduct = useCallback(
    () => api.getProductById(productId, token),
    [productId, token]
  );

  const {
    data: product,
    setData: setProduct,
    loading: isLoading,
    error: errorState,
  } = useApi(handleGetProduct);

  const handleProductLike = useCallback(() => {
    handleLike(product).then((updateProduct) => {
      setProduct(updateProduct);
    });
  }, [product, handleLike, setProduct]);

  return (
    <div className="container container_inner">
      <div className="content__cards">
        {isLoading ? (
          <Spinner />
        ) : (
          !errorState && (
            <Product
              {...product}
              setProduct={setProduct}
              onProductLike={handleProductLike}
            />
          )
        )}
        {!isLoading && errorState && <NotFound />}
      </div>
    </div>
  );
};
