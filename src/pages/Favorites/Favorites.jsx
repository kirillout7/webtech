import { useMemo } from "react";
import { Link } from "react-router-dom";
import { PRODUCTS } from "../../data/products";
import { ProductCard } from "../../components/ProductCard/ProductCard";
import { useFavorites } from "../../context/FavoritesContext";
import { useAuth } from "../../context/AuthContext";
import styles from "./Favorites.module.css";

/**
 * Страница "Избранное". Защищена через ProtectedRoute.
 *
 * Здесь нет фильтров — просто список товаров, которые пользователь добавил
 * (поскольку фильтрация уже доступна в каталоге). Зато есть кнопка
 * "Очистить всё" и переход к каталогу, если пусто.
 */
export function Favorites() {
  const { user } = useAuth();
  const { favorites, clearFavorites } = useFavorites();

  // Находим объекты товаров по их id из массива favorites.
  // .map + filter(Boolean) — на случай если id из старой версии БД пропал.
  const favoriteProducts = useMemo(
    () =>
      favorites
        .map((id) => PRODUCTS.find((p) => p.id === id))
        .filter(Boolean),
    [favorites],
  );

  return (
    <div className={`container ${styles.page}`}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Избранное</h1>
          <p className={styles.subtitle}>
            {user?.name}, здесь хранятся товары, которые вам понравились.
          </p>
        </div>
        {favoriteProducts.length > 0 && (
          <button
            type="button"
            className={styles.clearBtn}
            onClick={() => {
              if (window.confirm("Удалить все товары из избранного?")) {
                clearFavorites();
              }
            }}
          >
            Очистить всё
          </button>
        )}
      </header>

      {favoriteProducts.length === 0 ? (
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>♡</div>
          <h2>Пока пусто</h2>
          <p>
            Нажимайте на сердечко в карточках товаров — они появятся здесь.
          </p>
          <Link to="/" className={styles.cta}>
            Открыть каталог
          </Link>
        </div>
      ) : (
        <>
          <p className={styles.count}>
            Всего товаров: {favoriteProducts.length}
          </p>
          <div className={styles.grid}>
            {favoriteProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
