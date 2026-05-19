import { createContext, useCallback, useContext, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useAuth } from "./AuthContext";



const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { user } = useAuth();
  const storageKey = `apple:cart:${user?.name ?? "guest"}`;
  const [items, setItems] = useLocalStorage(storageKey, []);


  const addToCart = useCallback(
    (product, options = {}) => {
      const color = options.color ?? product.colors?.[0]?.name ?? null;
      const storage = options.storage ?? product.storage?.[0] ?? null;
      const qty = options.qty ?? 1;

      setItems((prev) => {
        const existing = prev.find(
          (it) =>
            it.id === product.id &&
            it.color === color &&
            it.storage === storage,
        );
        if (existing) {
          return prev.map((it) =>
            it === existing ? { ...it, qty: it.qty + qty } : it,
          );
        }
        return [
          ...prev,
          {
            id: product.id,
            title: product.title,
            image: product.image,
            price: product.price,
            qty,
            color,
            storage,
          },
        ];
      });
    },
    [setItems],
  );

  const removeFromCart = useCallback(
    (id, color, storage) => {
      setItems((prev) =>
        prev.filter(
          (it) =>
            !(it.id === id && it.color === color && it.storage === storage),
        ),
      );
    },
    [setItems],
  );

  const updateQty = useCallback(
    (id, color, storage, qty) => {
      setItems((prev) => {
        if (qty <= 0) {
          return prev.filter(
            (it) =>
              !(it.id === id && it.color === color && it.storage === storage),
          );
        }
        return prev.map((it) =>
          it.id === id && it.color === color && it.storage === storage
            ? { ...it, qty }
            : it,
        );
      });
    },
    [setItems],
  );

  const clearCart = useCallback(() => setItems([]), [setItems]);


  const totalCount = useMemo(
    () => items.reduce((sum, it) => sum + it.qty, 0),
    [items],
  );
  const totalPrice = useMemo(
    () => items.reduce((sum, it) => sum + it.qty * it.price, 0),
    [items],
  );

  const value = useMemo(
    () => ({
      items,
      addToCart,
      removeFromCart,
      updateQty,
      clearCart,
      totalCount,
      totalPrice,
    }),
    [
      items,
      addToCart,
      removeFromCart,
      updateQty,
      clearCart,
      totalCount,
      totalPrice,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart должен использоваться внутри <CartProvider>");
  }
  return ctx;
}
