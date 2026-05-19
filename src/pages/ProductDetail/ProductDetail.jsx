import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { findProductById, getRelatedProducts } from "../../data/products";
import { ProductCard } from "../../components/ProductCard/ProductCard";
import { useCart } from "../../context/CartContext";
import { useFavorites } from "../../context/FavoritesContext";
import { useCurrency } from "../../context/CurrencyContext";
import styles from "./ProductDetail.module.css";

/**
 * Страница товара.
 *
 * Здесь пользователь:
 *  - выбирает цвет (если есть)
 *  - выбирает объём памяти (если есть)
 *  - меняет количество (+/−)
 *  - добавляет в корзину
 *  - переключает картинку в галерее
 *  - переключает избранное
 *
 * Состояние выбора (selectedColor / selectedStorage / quantity / activeImage)
 * — это локальный useState для этой страницы.
 */
export function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { format } = useCurrency();

  // Находим товар по id из URL
  const product = useMemo(() => findProductById(id), [id]);

  // Все хуки должны вызываться до early-return — поэтому условный JSX внизу
  const [selectedColor, setSelectedColor] = useState(
    product?.colors?.[0]?.name ?? null,
  );
  const [selectedStorage, setSelectedStorage] = useState(
    product?.storage?.[0] ?? null,
  );
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [showAddedToast, setShowAddedToast] = useState(false);

  const related = useMemo(
    () => (product ? getRelatedProducts(product, 4) : []),
    [product],
  );

  if (!product) {
    return (
      <div className={`container ${styles.errorBox}`}>
        <h1>Товар не найден</h1>
        <p>Возможно, его уже сняли с продажи. Попробуйте каталог.</p>
        <Link to="/" className={styles.linkBtn}>
          В каталог
        </Link>
      </div>
    );
  }

  const favorite = isFavorite(product.id);

  const handleAddToCart = () => {
    addToCart(product, {
      color: selectedColor,
      storage: selectedStorage,
      qty: quantity,
    });
    // Показываем "Добавлено" на 2 секунды
    setShowAddedToast(true);
    setTimeout(() => setShowAddedToast(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, {
      color: selectedColor,
      storage: selectedStorage,
      qty: quantity,
    });
    navigate("/cart");
  };

  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : null;

  return (
    <div className={`container ${styles.page}`}>
      <button
        type="button"
        className={styles.back}
        onClick={() => navigate(-1)}
      >
        ← Назад
      </button>

      <div className={styles.head}>
        {/* Галерея слева */}
        <div className={styles.gallery}>
          <div className={styles.mainImage}>
            <img src={product.gallery[activeImage]} alt={product.title} />
            {product.isNew && (
              <span className={styles.badgeNew}>Новинка</span>
            )}
            {discount && (
              <span className={styles.badgeDiscount}>−{discount}%</span>
            )}
          </div>
          {product.gallery.length > 1 && (
            <div className={styles.thumbs}>
              {product.gallery.map((src, index) => (
                <button
                  type="button"
                  key={src}
                  className={`${styles.thumb} ${index === activeImage ? styles.thumbActive : ""}`}
                  onClick={() => setActiveImage(index)}
                  aria-label={`Фото ${index + 1}`}
                >
                  <img src={src} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Информация о товаре справа */}
        <div className={styles.info}>
          <span className={styles.eyebrow}>{product.subtitle}</span>
          <h1 className={styles.title}>{product.title}</h1>

          {/* Рейтинг */}
          <div className={styles.rating}>
            <div className={styles.stars}>
              {/* Звёзды через .map() — снова метод массива */}
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={
                    star <= Math.round(product.rating)
                      ? styles.starFull
                      : styles.starEmpty
                  }
                >
                  ★
                </span>
              ))}
            </div>
            <span className={styles.ratingValue}>{product.rating}</span>
            <span className={styles.ratingCount}>({product.reviews} отзывов)</span>
          </div>

          {/* Цена */}
          <div className={styles.priceBox}>
            <span className={styles.price}>{format(product.price)}</span>
            {product.oldPrice && (
              <span className={styles.oldPrice}>{format(product.oldPrice)}</span>
            )}
          </div>

          {/* Цвет */}
          {product.colors?.length > 0 && (
            <div className={styles.option}>
              <label className={styles.optionLabel}>
                Цвет: <strong>{selectedColor}</strong>
              </label>
              <div className={styles.colorList}>
                {product.colors.map((c) => (
                  <button
                    type="button"
                    key={c.name}
                    className={`${styles.colorBtn} ${selectedColor === c.name ? styles.colorBtnActive : ""}`}
                    style={{ "--swatch": c.hex }}
                    onClick={() => setSelectedColor(c.name)}
                    aria-label={c.name}
                    title={c.name}
                  >
                    <span
                      className={styles.colorSwatch}
                      style={{ backgroundColor: c.hex }}
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Объём памяти */}
          {product.storage?.length > 0 && (
            <div className={styles.option}>
              <label className={styles.optionLabel}>Объём памяти</label>
              <div className={styles.storageList}>
                {product.storage.map((s) => (
                  <button
                    type="button"
                    key={s}
                    className={`${styles.storageBtn} ${selectedStorage === s ? styles.storageBtnActive : ""}`}
                    onClick={() => setSelectedStorage(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Количество */}
          <div className={styles.option}>
            <label className={styles.optionLabel}>Количество</label>
            <div className={styles.qtyControl}>
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                disabled={quantity <= 1}
              >
                −
              </button>
              <span>{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                disabled={quantity >= product.stock}
              >
                +
              </button>
            </div>
            <span className={styles.stock}>
              {product.stock > 0
                ? `В наличии: ${product.stock} шт.`
                : "Нет в наличии"}
            </span>
          </div>

          {/* Кнопки */}
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.primaryBtn}
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              В корзину
            </button>
            <button
              type="button"
              className={styles.buyBtn}
              onClick={handleBuyNow}
              disabled={product.stock === 0}
            >
              Купить
            </button>
            <button
              type="button"
              className={`${styles.favBtn} ${favorite ? styles.favBtnActive : ""}`}
              onClick={() => toggleFavorite(product.id)}
              aria-label="В избранное"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill={favorite ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>
          </div>

          {/* Краткие тезисы */}
          {product.highlights?.length > 0 && (
            <ul className={styles.highlights}>
              {product.highlights.map((h) => (
                <li key={h}>
                  <span className={styles.checkmark}>✓</span>
                  {h}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Описание + характеристики */}
      <div className={styles.body}>
        <section className={styles.description}>
          <h2>Описание</h2>
          <p>{product.description}</p>
        </section>

        <section className={styles.specs}>
          <h2>Характеристики</h2>
          <dl>
            {/* Object.entries даёт пары [key, value] — отличный пример работы с объектом через массивы */}
            {Object.entries(product.specs).map(([key, value]) => (
              <div key={key} className={styles.specRow}>
                <dt>{key}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>

      {/* Похожие товары */}
      {related.length > 0 && (
        <section className={styles.related}>
          <h2>Похожие товары</h2>
          <div className={styles.relatedGrid}>
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Тост */}
      {showAddedToast && (
        <div className={styles.toast}>
          ✓ Добавлено в корзину
        </div>
      )}
    </div>
  );
}
