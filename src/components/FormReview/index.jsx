import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import api from "../../utils/api";
import { VALIDATE_CONFIG } from "../../utils/constants";
import { Form } from "../Form";
import { FormButton } from "../FormButton";
import { FormInput } from "../FormInput";
import { Rating } from "../Rating";
import { UserContext } from "../../context/userContext";

export function FormReview({
  title = "Отзыв о товаре",
  productId,
  setProduct,
}) {
  const { token } = useContext(UserContext);

  const { register, handleSubmit } = useForm({ mode: "onBlur" });
  const [rating, setRating] = useState(1);

  const sendReviewProduct = (data) => {
    api
      .createReviewProduct(productId, { ...data, rating }, token)
      .then((newProduct) => {
        setProduct && setProduct(newProduct);
      });
  };

  const textReview = register("text", {
    required: {
      value: true,
      message: VALIDATE_CONFIG.requiredMessage,
    },
  });

  return (
    <Form title={title} handleFormSubmit={handleSubmit(sendReviewProduct)}>
      <Rating rating={rating} isEditable setRating={setRating} />
      <FormInput
        {...textReview}
        id="text"
        typeinput="textarea"
        placeholder="Напишите текст отзывы"
      />
      <FormButton type="submit" color="yellow">
        Отправить отзыв
      </FormButton>
    </Form>
  );
}
