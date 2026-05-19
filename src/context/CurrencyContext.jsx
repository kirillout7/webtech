import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { fetchRates, formatPrice } from "../api/external";
import { useLocalStorage } from "../hooks/useLocalStorage";

/**
 * Контекст валюты.
 *
 * • Загружает курсы валют через публичный API exchangerate-api.com
 *   при первом монтировании приложения.
 * • Хранит текущую выбранную валюту (USD/EUR/RUB) в localStorage —
 *   она восстанавливается при перезагрузке.
 * • Даёт функцию format(usd) для отображения цены в выбранной валюте.
 *
 * Это закрывает пункт 12 ТЗ: «Работа с запросами (отображение курсов валют)».
 */

const CurrencyContext = createContext(null);

const SUPPORTED = ["USD", "EUR", "RUB"];

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useLocalStorage("apple:currency", "USD");
  const [rates, setRates] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Загружаем курсы при первом рендере.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchRates();
        if (!cancelled) setRates(data);
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
          // Резервные курсы — на случай если API недоступно.
          setRates({ USD: 1, EUR: 0.92, RUB: 92, GBP: 0.79, CNY: 7.2 });
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  /** Отформатировать долларовую цену в текущей валюте. */
  const format = useCallback(
    (usd) => {
      const rate = rates?.[currency];
      return formatPrice(usd, currency, rate);
    },
    [currency, rates],
  );

  /** Сменить валюту с проверкой, что она в списке поддерживаемых. */
  const changeCurrency = useCallback(
    (next) => {
      if (SUPPORTED.includes(next)) setCurrency(next);
    },
    [setCurrency],
  );

  const value = useMemo(
    () => ({
      currency,
      changeCurrency,
      supported: SUPPORTED,
      rates,
      loading,
      error,
      format,
    }),
    [currency, changeCurrency, rates, loading, error, format],
  );

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) {
    throw new Error("useCurrency должен использоваться внутри <CurrencyProvider>");
  }
  return ctx;
}
