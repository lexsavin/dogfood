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
import { AlertModal } from "../AlertModal";
import { useState } from "react";

export const Register = () => {
  const [showSuccessfulRegistration, setShowSuccessfulRegistration] =
    useState(false);
  const location = useLocation();
  const initialPath = location.state?.initialPath;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });
  const navigate = useNavigate();

  const handleClickLoginButton = (e) => {
    e.preventDefault();
    navigate("/dogfood/login", {
      replace: true,
      state: { backgroundLocation: location, initialPath },
    });
  };
  const handleSubmitSignUp = (data) => {
    api
      .signUp(data)
      .then(() => setShowSuccessfulRegistration(true))
      .catch((err) => console.log(err));
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

  const groupRegister = register("group", {
    required: {
      value: true,
      message: VALIDATE_CONFIG.requiredMessage,
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
    <>
      <Form
        title="Регистрация"
        handleFormSubmit={handleSubmit(handleSubmitSignUp)}
      >
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
          {...groupRegister}
          id="group"
          type="text"
          placeholder="Имя группы (введите group-10)"
        />
        {errors?.group && (
          <p className="errorMessage">{errors?.group?.message}</p>
        )}
        <FormInput
          {...passwordRegister}
          id="password"
          type="password"
          placeholder="Придумайте пароль"
        />
        {errors?.password && (
          <p className="errorMessage">{errors?.password?.message}</p>
        )}
        <p className="infoText">
          Регистрируясь на сайте, вы соглашаетесь с нашими Правилами и Политикой
          конфиденциальности и соглашаетесь на информационную рассылку.
        </p>
        <FormButton type="submit" color="yellow">
          Зарегистрироваться
        </FormButton>
        <FormButton
          color="white"
          type="button"
          onClick={handleClickLoginButton}
        >
          Войти
        </FormButton>
      </Form>
      <AlertModal
        showSuccessfulRegistration={showSuccessfulRegistration}
        setShowSuccessfulRegistration={setShowSuccessfulRegistration}
        onClickLoginButton={handleClickLoginButton}
      />
    </>
  );
};
