import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CATEGORIES, PRODUCTS } from "../../data/products";
import { ProductCard } from "../../components/ProductCard/ProductCard";
import { Pagination } from "../../components/Pagination/Pagination";
import { useCurrency } from "../../context/CurrencyContext";
import styles from "./Catalog.module.css";

/**
 * Каталог — главная страница приложения (макет Main.pdf).
 *
 * Категория и поисковый запрос берутся из URL (?category=&q=), ими
 * управляет шапка. На самой странице — панель «Все фильтры» (цена,
 * скидка), выпадающее меню сортировки и постраничная навигация.
 *
 * Интерактивные функции (пункт 6 ТЗ): поиск, фильтр по категории,
 * фильтр по цене, фильтр «только со скидкой», сортировка, пагинация.
 * Активно используются методы массива: filter, sort, slice, map, find.
 */

const PER_PAGE = 8; // карточек на странице
const MAX_PRICE = 3500; // верхняя граница ползунка цены (в USD)

// Варианты сортировки — массив, по нему строится выпадающее меню.
const SORT_OPTIONS = [
  { id: "popular", label: "Популярные" },
  { id: "new", label: "Сначала новинки" },
  { id: "price-asc", label: "Цена: по возрастанию" },
  { id: "price-desc", label: "Цена: по убыванию" },
  { id: "rating", label: "По рейтингу" },
];

export function Catalog() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || "all";
  const rawQuery = searchParams.get("q") || "";
  const query = rawQuery.trim().toLowerCase();

  const { format } = useCurrency();

  // Состояние страницы
  const [sortBy, setSortBy] = useState("popular");
  const [priceMax, setPriceMax] = useState(MAX_PRICE);
  const [onlyDiscount, setOnlyDiscount] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [trackedFilters, setTrackedFilters] = useState("");

  const sortRef = useRef(null);

  // При смене любого фильтра возвращаемся на первую страницу.
  // Корректировка состояния во время рендера — рекомендованный
  // React-паттерн, который не требует лишнего useEffect.
  const filterKey = `${category}|${query}|${onlyDiscount}|${priceMax}|${sortBy}`;
  if (filterKey !== trackedFilters) {
    setTrackedFilters(filterKey);
    setPage(1);
  }

  // .filter() — отбор по категории, поиску, цене и скидке
  const matched = PRODUCTS.filter((product) => {
    if (category !== "all" && product.category !== category) return false;
    if (query) {
      const haystack =
        `${product.title} ${product.subtitle} ${product.description}`.toLowerCase();
      if (!haystack.includes(query)) return false;
    }
    if (onlyDiscount && !product.oldPrice) return false;
    if (product.price > priceMax) return false;
    return true;
  });

  // .sort() по копии массива, чтобы не мутировать исходные данные
  const filtered = [...matched].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "new":
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      default:
        return b.reviews - a.reviews;
    }
  });

  // Пагинация
  const pageCount = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const safePage = Math.min(page, pageCount);
  const pageItems = filtered.slice(
    (safePage - 1) * PER_PAGE,
    safePage * PER_PAGE,
  );

  // Закрытие меню сортировки по клику вне его
  useEffect(() => {
    if (!sortOpen) return;
    const handleOutside = (event) => {
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setSortOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [sortOpen]);

  const resetFilters = () => {
    setPriceMax(MAX_PRICE);
    setOnlyDiscount(false);
  };

  const changePage = (next) => {
    setPage(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // .reduce() — считаем количество активных дополнительных фильтров
  const activeFilters = [onlyDiscount, priceMax < MAX_PRICE].reduce(
    (sum, flag) => sum + (flag ? 1 : 0),
    0,
  );

  const sortLabel = SORT_OPTIONS.find((o) => o.id === sortBy)?.label;
  const categoryLabel = CATEGORIES.find((c) => c.id === category)?.label;
  const showContext = category !== "all" || query || activeFilters > 0;

  return (
    <div className={`container ${styles.page}`}>
      {/* Контекст показываем только если активен поиск/фильтр */}
      {showContext && (
        <div className={styles.context}>
          <h1 className={styles.contextTitle}>
            {query ? `Поиск: «${rawQuery.trim()}»` : categoryLabel}
          </h1>
          <p className={styles.contextCount}>
            Найдено товаров: {filtered.length}
          </p>
        </div>
      )}

      {/* Тулбар: «Все фильтры» слева, «Сортировать» справа */}
      <div className={styles.toolbar}>
        <button
          type="button"
          className={styles.toolBtn}
          onClick={() => setFiltersOpen((open) => !open)}
          aria-expanded={filtersOpen}
        >
          Все фильтры
          {activeFilters > 0 && (
            <span className={styles.toolCount}>{activeFilters}</span>
          )}
          <span className={`${styles.caret} ${filtersOpen ? styles.caretUp : ""}`}>
            ▾
          </span>
        </button>

        <div className={styles.sort} ref={sortRef}>
          <button
            type="button"
            className={styles.toolBtn}
            onClick={() => setSortOpen((open) => !open)}
            aria-expanded={sortOpen}
          >
            Сортировать: {sortLabel}
            <span className={`${styles.caret} ${sortOpen ? styles.caretUp : ""}`}>
              ▾
            </span>
          </button>
          {sortOpen && (
            <ul className={styles.sortMenu}>
              {SORT_OPTIONS.map((option) => (
                <li key={option.id}>
                  <button
                    type="button"
                    className={`${styles.sortItem} ${
                      option.id === sortBy ? styles.sortItemActive : ""
                    }`}
                    onClick={() => {
                      setSortBy(option.id);
                      setSortOpen(false);
                    }}
                  >
                    {option.label}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Раскрывающаяся панель фильтров */}
      {filtersOpen && (
        <div className={styles.filters}>
          <div className={styles.filterField}>
            <span className={styles.filterLabel}>
              Цена: до {format(priceMax)}
            </span>
            <input
              type="range"
              min="100"
              max={MAX_PRICE}
              step="100"
              value={priceMax}
              onChange={(event) => setPriceMax(Number(event.target.value))}
              className={styles.range}
            />
          </div>

          <label className={styles.checkbox}>
            <input
              type="checkbox"
              checked={onlyDiscount}
              onChange={(event) => setOnlyDiscount(event.target.checked)}
            />
            <span>Только со скидкой</span>
          </label>

          <button
            type="button"
            className={styles.resetBtn}
            onClick={resetFilters}
            disabled={activeFilters === 0}
          >
            Сбросить
          </button>
        </div>
      )}

      {/* Сетка товаров или сообщение «ничего не нашлось» */}
      {filtered.length === 0 ? (
        <div className={styles.empty}>
          <span className={styles.emptyIcon}>🔍</span>
          <h2>Ничего не нашлось</h2>
          <p>Попробуйте изменить поисковый запрос или параметры фильтра.</p>
        </div>
      ) : (
        <>
          <div className={styles.grid}>
            {pageItems.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <Pagination
            page={safePage}
            pageCount={pageCount}
            onChange={changePage}
          />
        </>
      )}
    </div>
  );
}
