import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { CATEGORIES } from "../../data/products";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { useFavorites } from "../../context/FavoritesContext";
import { useCurrency } from "../../context/CurrencyContext";
import { useDebounce } from "../../hooks/useDebounce";
import styles from "./Header.module.css";

/**
 * Шапка сайта — свёрстана по макету Figma (Header.pdf).
 *
 * Две строки:
 *   1) переключатель валюты · логотип «Ecommerce» · иконки (профиль,
 *      избранное, корзина) с бейджами-счётчиками;
 *   2) меню категорий (слева) и строка поиска (справа).
 *
 * Категория и поисковый запрос хранятся в URL (?category=&q=), поэтому
 * шапка управляет содержимым каталога через параметры адреса.
 */

// Короткие подписи категорий для верхнего меню (заглавными — как в макете).
const NAV_LABELS = {
  all: "Все",
  iphone: "iPhone",
  mac: "Mac",
  ipad: "iPad",
  watch: "Watch",
  airpods: "AirPods",
  accessories: "Аксессуары",
};

export function Header() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { user, isAuthenticated } = useAuth();
  const { totalCount } = useCart();
  const { count: favCount } = useFavorites();
  const { currency, supported, changeCurrency } = useCurrency();

  const activeCategory = searchParams.get("category") || "all";
  const queryParam = searchParams.get("q") || "";

  // Поле поиска — controlled. Живой поиск с задержкой через useDebounce.
  const [term, setTerm] = useState(queryParam);
  const [trackedQuery, setTrackedQuery] = useState(queryParam);
  const debouncedTerm = useDebounce(term, 350);

  // URL → поле: если запрос изменился извне (клик по категории, кнопка
  // «назад», сброс), подхватываем его. Корректировка состояния во время
  // рендера — рекомендованный React-паттерн вместо лишнего useEffect.
  if (queryParam !== trackedQuery) {
    setTrackedQuery(queryParam);
    setTerm(queryParam);
  }

  // Применить поиск: собираем новый URL каталога и переходим на него.
  const runSearch = (value) => {
    const params = new URLSearchParams();
    if (activeCategory !== "all") params.set("category", activeCategory);
    const trimmed = value.trim();
    if (trimmed) params.set("q", trimmed);
    const search = params.toString();
    navigate(search ? `/?${search}` : "/");
  };

  // Поле → URL: после паузы в наборе обновляем адрес каталога.
  useEffect(() => {
    if (debouncedTerm.trim() !== queryParam) {
      runSearch(debouncedTerm);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedTerm]);

  // Ссылка на категорию — открываем каталог этой категории «с чистого листа».
  const categoryLink = (id) => (id === "all" ? "/" : `/?category=${id}`);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.topRow}`}>
        {/* Переключатель валюты — слева */}
        <label className={styles.currency}>
          <span className={styles.srOnly}>Валюта</span>
          <select
            value={currency}
            onChange={(event) => changeCurrency(event.target.value)}
            aria-label="Валюта"
          >
            {supported.map((code) => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </select>
        </label>

        {/* Логотип — по центру */}
        <Link to="/" className={styles.logo}>
          <span className={styles.logoAccent}>Eco</span>mmerce
        </Link>

        {/* Иконки действий — справа */}
        <div className={styles.actions}>
          <Link to="/login" className={styles.iconBtn} aria-label="Профиль">
            <UserIcon />
            {isAuthenticated && (
              <span className={styles.userName}>{user.name}</span>
            )}
          </Link>

          <Link
            to="/favorites"
            className={styles.iconBtn}
            aria-label="Избранное"
          >
            <HeartIcon />
            {favCount > 0 && <span className={styles.badge}>{favCount}</span>}
          </Link>

          <Link to="/cart" className={styles.iconBtn} aria-label="Корзина">
            <BagIcon />
            {totalCount > 0 && (
              <span className={styles.badge}>{totalCount}</span>
            )}
          </Link>
        </div>
      </div>

      <div className={`container ${styles.bottomRow}`}>
        {/* Меню категорий */}
        <nav className={styles.nav} aria-label="Категории">
          {CATEGORIES.map((category) => {
            const isActive = activeCategory === category.id;
            return (
              <Link
                key={category.id}
                to={categoryLink(category.id)}
                className={`${styles.navLink} ${
                  isActive ? styles.navLinkActive : ""
                }`}
              >
                {NAV_LABELS[category.id] ?? category.label}
              </Link>
            );
          })}
        </nav>

        {/* Поиск — отдельная форма (пункт 7 ТЗ) */}
        <form
          className={styles.search}
          onSubmit={(event) => {
            event.preventDefault();
            runSearch(term);
          }}
          role="search"
        >
          <span className={styles.searchIcon} aria-hidden="true">
            <SearchIcon />
          </span>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Поиск товаров"
            value={term}
            onChange={(event) => setTerm(event.target.value)}
            aria-label="Поиск товаров"
          />
          {term && (
            <button
              type="button"
              className={styles.searchClear}
              onClick={() => setTerm("")}
              aria-label="Очистить поиск"
            >
              ✕
            </button>
          )}
        </form>
      </div>
    </header>
  );
}

/* ===== Иконки (inline SVG, без сторонних библиотек) ===== */

function UserIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}
