import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import {
  EMAIL_REGEXP,
  PASSWORD_REGEXP,
  VALIDATE_CONFIG,
} from "../../utils/constants";
import { Form } from "../Form";
import { FormButton } from "../FormButton";
import { FormInput } from "../FormInput";
import api from "../../utils/api";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { setTokenLocalStorage } from "../../utils/token";

export const Login = () => {
  const location = useLocation();
  const initialPath = location.state?.initialPath;
  const { setToken } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const navigate = useNavigate();

  const handleClickRegistrationButton = (e) => {
    e.preventDefault();
    navigate("/dogfood/register", {
      replace: true,
      state: { backgroundLocation: location, initialPath },
    });
  };

  const handleSubmitSignIn = (data) => {
    api.signIn(data).then(({ token }) => {
      setTokenLocalStorage(token);
      setToken(token);
      navigate("/dogfood");
    });
  };

  const emailRegister = register("email", {
    required: {
      value: true,
      message: VALIDATE_CONFIG.requiredMessage,
    },
    pattern: {
      value: EMAIL_REGEXP,
      message: VALIDATE_CONFIG.emailMessage,
    },
  });

  const passwordRegister = register("password", {
    required: {
      value: true,
      message: VALIDATE_CONFIG.requiredMessage,
    },
    pattern: {
      value: PASSWORD_REGEXP,
      message: VALIDATE_CONFIG.passwordMesssage,
    },
  });

  return (
    <Form title="Вход" handleFormSubmit={handleSubmit(handleSubmitSignIn)}>
      <FormInput
        {...emailRegister}
        id="email"
        type="text"
        placeholder="Email"
      />
      {errors?.email && (
        <p className="errorMessage">{errors?.email?.message}</p>
      )}

      <FormInput
        {...passwordRegister}
        id="password"
        type="password"
        placeholder="Пароль"
      />
      {errors?.password && (
        <p className="errorMessage">{errors?.password?.message}</p>
      )}

      <FormButton type="submit" color="yellow">
        Войти
      </FormButton>
      <FormButton
        color="white"
        type="button"
        onClick={handleClickRegistrationButton}
      >
        Регистрация
      </FormButton>
    </Form>
  );
};
