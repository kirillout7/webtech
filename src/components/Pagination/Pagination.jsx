import styles from "./Pagination.module.css";

/**
 * Постраничная навигация каталога — по макету Figma (Main.pdf).
 *
 * props:
 *   page      — текущая страница (от 1);
 *   pageCount — всего страниц;
 *   onChange  — колбэк смены страницы.
 *
 * Кнопки страниц строятся через .map() по массиву номеров.
 */
export function Pagination({ page, pageCount, onChange }) {
  if (pageCount <= 1) return null;

  // Массив номеров страниц [1..pageCount].
  const pages = Array.from({ length: pageCount }, (_, index) => index + 1);

  const goTo = (next) => {
    const clamped = Math.min(Math.max(1, next), pageCount);
    if (clamped !== page) onChange(clamped);
  };

  const isLast = page >= pageCount;

  return (
    <nav className={styles.pagination} aria-label="Страницы каталога">
      {pages.map((number) => (
        <button
          key={number}
          type="button"
          className={`${styles.page} ${
            number === page ? styles.pageActive : ""
          }`}
          onClick={() => goTo(number)}
          aria-current={number === page ? "page" : undefined}
        >
          {number}
        </button>
      ))}

      <button
        type="button"
        className={styles.arrow}
        onClick={() => goTo(page + 1)}
        disabled={isLast}
        aria-label="Следующая страница"
      >
        ›
      </button>
      <button
        type="button"
        className={styles.arrow}
        onClick={() => goTo(pageCount)}
        disabled={isLast}
        aria-label="Последняя страница"
      >
        »
      </button>
    </nav>
  );
}
