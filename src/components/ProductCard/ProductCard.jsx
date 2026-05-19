import { Link } from "react-router-dom";
import { useFavorites } from "../../context/FavoritesContext";
import { useCurrency } from "../../context/CurrencyContext";
import styles from "./ProductCard.module.css";

/**
 * Карточка товара в каталоге — свёрстана по макету Figma (Main.pdf):
 * изображение, название и блок цены («сразу» + рассрочка на 10 платежей).
 *
 * Клик по карточке открывает страницу товара. Кнопка-сердце добавляет
 * или убирает товар из избранного — это одна из интерактивных функций
 * (пункт 6 ТЗ). preventDefault/stopPropagation не дают сработать переходу.
 */
export function ProductCard({ product }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { format } = useCurrency();
  const favorite = isFavorite(product.id);

  const handleFavorite = (event) => {
    event.preventDefault();
    event.stopPropagation();
    toggleFavorite(product.id);
  };

  // Скидка в процентах, если у товара есть старая цена.
  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : null;

  // Цена «в рассрочку» — 10 равных платежей (как «em até 10x» в макете).
  const installment = Math.round(product.price / 10);

  return (
    <Link to={`/product/${product.id}`} className={styles.card}>
      <div className={styles.imageWrap}>
        <img src={product.image} alt={product.title} loading="lazy" />

        {discount && <span className={styles.discount}>−{discount}%</span>}

        <button
          type="button"
          className={`${styles.favBtn} ${favorite ? styles.favBtnActive : ""}`}
          onClick={handleFavorite}
          aria-label={favorite ? "Убрать из избранного" : "В избранное"}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill={favorite ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>

      <div className={styles.body}>
        <h3 className={styles.title}>{product.title}</h3>

        <div className={styles.priceBlock}>
          <div className={styles.priceRow}>
            <span className={styles.price}>{format(product.price)}</span>
            <span className={styles.priceNote}>сразу</span>
            {product.oldPrice && (
              <span className={styles.oldPrice}>
                {format(product.oldPrice)}
              </span>
            )}
          </div>
          <p className={styles.installment}>
            или 10 платежей по {format(installment)} без процентов
          </p>
        </div>
      </div>
    </Link>
  );
}
