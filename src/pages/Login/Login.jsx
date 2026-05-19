import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styles from "./Login.module.css";

/**
 * Страница входа и регистрации (пункт 11 ТЗ — авторизация).
 *
 * Одна форма с двумя режимами — «Вход» и «Регистрация», режим хранится
 * в локальном состоянии mode. После успешного входа пользователь
 * возвращается туда, откуда пришёл (например, в корзину), либо в каталог.
 *
 * Авторизация целиком клиентская — данные хранятся в LocalStorage,
 * пароль сохраняется в виде SHA-256 хеша (см. src/context/AuthContext.jsx).
 */
export function Login() {
  const { login, register, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from?.pathname || "/";

  const [mode, setMode] = useState("login"); // 'login' | 'register'
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState(false);
  const [serverError, setServerError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const errors = validate(name, password);
  const hasErrors = Object.keys(errors).length > 0;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setTouched(true);
    setServerError("");
    if (hasErrors) return;

    setSubmitting(true);
    const action = mode === "login" ? login : register;
    const result = await action(name, password);
    setSubmitting(false);

    if (result.ok) {
      navigate(redirectTo, { replace: true });
    } else {
      setServerError(result.error || "Что-то пошло не так");
    }
  };

  // Уже вошли — показываем карточку аккаунта вместо формы.
  if (user) {
    return (
      <div className={`container ${styles.page}`}>
        <div className={styles.card}>
          <h1 className={styles.title}>Вы вошли</h1>
          <p className={styles.muted}>
            Аккаунт: <strong>{user.name}</strong>
          </p>
          {user.createdAt && (
            <p className={styles.muted}>
              Регистрация: {new Date(user.createdAt).toLocaleString("ru-RU")}
            </p>
          )}
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.primaryBtn}
              onClick={() => navigate("/")}
            >
              В каталог
            </button>
            <button
              type="button"
              className={styles.secondaryBtn}
              onClick={() => {
                logout();
                navigate("/");
              }}
            >
              Выйти
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`container ${styles.page}`}>
      <div className={styles.card}>
        <div className={styles.tabs}>
          <button
            type="button"
            className={`${styles.tab} ${mode === "login" ? styles.tabActive : ""}`}
            onClick={() => {
              setMode("login");
              setServerError("");
            }}
          >
            Вход
          </button>
          <button
            type="button"
            className={`${styles.tab} ${
              mode === "register" ? styles.tabActive : ""
            }`}
            onClick={() => {
              setMode("register");
              setServerError("");
            }}
          >
            Регистрация
          </button>
        </div>

        <h1 className={styles.title}>
          {mode === "login" ? "С возвращением" : "Создать аккаунт"}
        </h1>
        <p className={styles.subtitle}>
          {mode === "login"
            ? "Войдите, чтобы видеть избранное и оформлять заказы."
            : "Зарегистрируйтесь, чтобы сохранять корзину и избранное."}
        </p>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <Field
            label="Имя пользователя"
            name="username"
            value={name}
            onChange={setName}
            placeholder="например, ivan"
            error={touched ? errors.name : null}
            autoFocus
          />
          <Field
            label="Пароль"
            name="password"
            type="password"
            value={password}
            onChange={setPassword}
            placeholder="минимум 4 символа"
            error={touched ? errors.password : null}
          />

          {serverError && (
            <div className={styles.serverError}>{serverError}</div>
          )}

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={submitting}
          >
            {submitting
              ? "Подождите..."
              : mode === "login"
                ? "Войти"
                : "Зарегистрироваться"}
          </button>

          <p className={styles.note}>
            {mode === "login" ? (
              <>
                Нет аккаунта?{" "}
                <button
                  type="button"
                  className={styles.linkBtn}
                  onClick={() => {
                    setMode("register");
                    setServerError("");
                  }}
                >
                  Зарегистрируйтесь
                </button>
              </>
            ) : (
              <>
                Уже есть аккаунт?{" "}
                <button
                  type="button"
                  className={styles.linkBtn}
                  onClick={() => {
                    setMode("login");
                    setServerError("");
                  }}
                >
                  Войдите
                </button>
              </>
            )}
          </p>
        </form>
      </div>
    </div>
  );
}

/** Переиспользуемое поле формы. */
function Field({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  error,
  autoFocus,
}) {
  return (
    <label className={styles.field}>
      <span className={styles.fieldLabel}>{label}</span>
      <input
        className={`${styles.input} ${error ? styles.inputError : ""}`}
        type={type}
        name={name}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        autoComplete={type === "password" ? "current-password" : "username"}
      />
      {error && <span className={styles.errorText}>{error}</span>}
    </label>
  );
}

/** Валидация полей формы. */
function validate(name, password) {
  const errors = {};
  if (!name.trim()) {
    errors.name = "Введите имя";
  } else if (name.trim().length < 2) {
    errors.name = "Минимум 2 символа";
  }
  if (!password) {
    errors.password = "Введите пароль";
  } else if (password.length < 4) {
    errors.password = "Минимум 4 символа";
  }
  return errors;
}
