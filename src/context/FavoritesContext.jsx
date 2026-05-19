import { createContext, useCallback, useContext, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useAuth } from "./AuthContext";

/**
 * Контекст избранного (Wishlist).
 *
 * Хранится в localStorage по ключу, который зависит от имени пользователя.
 * Это значит, что у каждого пользователя свой список, а после выхода
 * мы переключаемся на гостевой ключ.
 *
 * favorites — массив id товаров (хранить нужно немного, поэтому только id).
 */

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const { user } = useAuth();
  const storageKey = `apple:favorites:${user?.name ?? "guest"}`;
  const [favorites, setFavorites] = useLocalStorage(storageKey, []);

  /** Проверка: есть ли товар в избранном. */
  const isFavorite = useCallback(
    (id) => favorites.includes(id),
    [favorites],
  );

  /** Переключатель избранного (использует методы some/filter). */
  const toggleFavorite = useCallback(
    (id) => {
      setFavorites((prev) => {
        if (prev.some((favId) => favId === id)) {
          return prev.filter((favId) => favId !== id);
        }
        return [...prev, id];
      });
    },
    [setFavorites],
  );

  /** Очистить весь список. */
  const clearFavorites = useCallback(() => setFavorites([]), [setFavorites]);

  const value = useMemo(
    () => ({
      favorites,
      isFavorite,
      toggleFavorite,
      clearFavorites,
      count: favorites.length,
    }),
    [favorites, isFavorite, toggleFavorite, clearFavorites],
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) {
    throw new Error(
      "useFavorites должен использоваться внутри <FavoritesProvider>",
    );
  }
  return ctx;
}
