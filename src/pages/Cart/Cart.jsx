import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useCurrency } from "../../context/CurrencyContext";
import { useAuth } from "../../context/AuthContext";
import styles from "./Cart.module.css";

/**
 * Страница корзины.
 *
 * Что умеет:
 *   - показать все товары в корзине;
 *   - менять количество (+/−);
 *   - удалять позиции;
 *   - очистить всю корзину;
 *   - оформить заказ (форма с именем/телефоном/адресом и валидацией);
 *
 * Форма оформления заказа — это закрытие требования о пользовательской
 * форме (пункт 7 ТЗ), плюс ещё одна форма (вторая в проекте после Login).
 */
export function Cart() {
  const { items, removeFromCart, updateQty, clearCart, totalCount, totalPrice } = useCart();
  const { format } = useCurrency();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Состояние формы оформления заказа
  const [showCheckout, setShowCheckout] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || "",
    phone: "",
    address: "",
    delivery: "courier",
    payment: "card",
  });
  const [touched, setTouched] = useState(false);
  // null — заказ ещё не оформлен; число — номер оформленного заказа
  const [orderNumber, setOrderNumber] = useState(null);

  // Валидация формы
  const errors = validateOrder(form);
  const hasErrors = Object.keys(errors).length > 0;

  const handleField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setTouched(true);
    if (hasErrors) return;
    // Имитация оформления: генерируем номер заказа, очищаем корзину
    setOrderNumber(Math.floor(10000 + Math.random() * 90000));
    clearCart();
  };

  // Экран после оформления заказа
  if (orderNumber !== null) {
    return (
      <div className={`container ${styles.page}`}>
        <div className={styles.success}>
          <div className={styles.successIcon}>✓</div>
          <h1>Заказ оформлен!</h1>
          <p>
            Спасибо за покупку{user ? `, ${user.name}` : ""}! Мы свяжемся с
            вами в течение часа для подтверждения. Номер заказа:{" "}
            <strong>#{orderNumber}</strong>
          </p>
          <div className={styles.successActions}>
            <Link to="/" className={styles.primaryBtn}>
              На главную
            </Link>
            <Link to="/" className={styles.secondaryBtn}>
              Продолжить покупки
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Пустая корзина
  if (items.length === 0) {
    return (
      <div className={`container ${styles.page}`}>
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>🛒</div>
          <h1>Ваша корзина пуста</h1>
          <p>Самое время добавить что-нибудь полезное.</p>
          <Link to="/" className={styles.primaryBtn}>
            В каталог
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`container ${styles.page}`}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Корзина</h1>
          <p className={styles.subtitle}>Товаров: {totalCount}</p>
        </div>
        <button
          type="button"
          className={styles.clearBtn}
          onClick={() => {
            if (window.confirm("Очистить корзину полностью?")) clearCart();
          }}
        >
          Очистить корзину
        </button>
      </header>

      <div className={styles.layout}>
        {/* Список товаров */}
        <div className={styles.list}>
          {items.map((item, index) => (
            <div
              key={`${item.id}-${item.color}-${item.storage}-${index}`}
              className={styles.row}
            >
              <Link to={`/product/${item.id}`} className={styles.rowImage}>
                <img src={item.image} alt={item.title} />
              </Link>

              <div className={styles.rowInfo}>
                <Link to={`/product/${item.id}`} className={styles.rowTitle}>
                  {item.title}
                </Link>
                <div className={styles.rowMeta}>
                  {item.color && <span>Цвет: {item.color}</span>}
                  {item.storage && <span>Память: {item.storage}</span>}
                </div>
                <div className={styles.rowPrice}>{format(item.price)}</div>
              </div>

              <div className={styles.rowQty}>
                <button
                  type="button"
                  onClick={() =>
                    updateQty(item.id, item.color, item.storage, item.qty - 1)
                  }
                >
                  −
                </button>
                <span>{item.qty}</span>
                <button
                  type="button"
                  onClick={() =>
                    updateQty(item.id, item.color, item.storage, item.qty + 1)
                  }
                >
                  +
                </button>
              </div>

              <div className={styles.rowSubtotal}>
                {format(item.price * item.qty)}
              </div>

              <button
                type="button"
                className={styles.removeBtn}
                onClick={() => removeFromCart(item.id, item.color, item.storage)}
                aria-label="Удалить"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* Сайдбар с суммой и оформлением */}
        <aside className={styles.summary}>
          <h2>Итого</h2>
          <div className={styles.summaryRow}>
            <span>Товаров</span>
            <span>{totalCount} шт.</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Подытог</span>
            <span>{format(totalPrice)}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Доставка</span>
            <span className={styles.free}>Бесплатно</span>
          </div>
          <div className={styles.divider} />
          <div className={styles.summaryTotal}>
            <span>К оплате</span>
            <span>{format(totalPrice)}</span>
          </div>

          {!showCheckout ? (
            <button
              type="button"
              className={styles.primaryBtn}
              onClick={() => {
                if (!isAuthenticated) {
                  // Если не залогинены — отправляем на /login,
                  // а после входа вернёмся обратно в корзину
                  navigate("/login", { state: { from: { pathname: "/cart" } } });
                  return;
                }
                setShowCheckout(true);
              }}
            >
              Оформить заказ
            </button>
          ) : (
            <form className={styles.checkoutForm} onSubmit={handleSubmit}>
              <h3>Данные доставки</h3>

              <Field
                label="Ваше имя"
                value={form.name}
                onChange={(v) => handleField("name", v)}
                error={touched ? errors.name : null}
                placeholder="например, Иван Петров"
              />
              <Field
                label="Телефон"
                value={form.phone}
                onChange={(v) => handleField("phone", v)}
                error={touched ? errors.phone : null}
                placeholder="+7 999 123-45-67"
              />
              <Field
                label="Адрес доставки"
                value={form.address}
                onChange={(v) => handleField("address", v)}
                error={touched ? errors.address : null}
                placeholder="Город, улица, дом, квартира"
              />

              <div className={styles.radioGroup}>
                <p className={styles.radioLabel}>Способ доставки</p>
                <label>
                  <input
                    type="radio"
                    name="delivery"
                    value="courier"
                    checked={form.delivery === "courier"}
                    onChange={(e) => handleField("delivery", e.target.value)}
                  />
                  <span>Курьер до двери (бесплатно)</span>
                </label>
                <label>
                  <input
                    type="radio"
                    name="delivery"
                    value="pickup"
                    checked={form.delivery === "pickup"}
                    onChange={(e) => handleField("delivery", e.target.value)}
                  />
                  <span>Самовывоз из Apple Store</span>
                </label>
              </div>

              <div className={styles.radioGroup}>
                <p className={styles.radioLabel}>Способ оплаты</p>
                <label>
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={form.payment === "card"}
                    onChange={(e) => handleField("payment", e.target.value)}
                  />
                  <span>Картой онлайн</span>
                </label>
                <label>
                  <input
                    type="radio"
                    name="payment"
                    value="cash"
                    checked={form.payment === "cash"}
                    onChange={(e) => handleField("payment", e.target.value)}
                  />
                  <span>Наличными при получении</span>
                </label>
              </div>

              <button type="submit" className={styles.primaryBtn}>
                Подтвердить заказ
              </button>
              <button
                type="button"
                className={styles.cancelBtn}
                onClick={() => setShowCheckout(false)}
              >
                Назад
              </button>
            </form>
          )}
        </aside>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, error }) {
  return (
    <label className={styles.field}>
      <span className={styles.fieldLabel}>{label}</span>
      <input
        type="text"
        className={`${styles.input} ${error ? styles.inputError : ""}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      {error && <span className={styles.fieldError}>{error}</span>}
    </label>
  );
}

function validateOrder(form) {
  const errors = {};
  if (!form.name?.trim() || form.name.trim().length < 2) {
    errors.name = "Введите имя (минимум 2 символа)";
  }
  // Простейшая проверка телефона: минимум 10 цифр
  const digits = (form.phone || "").replace(/\D/g, "");
  if (digits.length < 10) {
    errors.phone = "Введите корректный номер телефона";
  }
  if (!form.address?.trim() || form.address.trim().length < 5) {
    errors.address = "Адрес слишком короткий";
  }
  return errors;
}
