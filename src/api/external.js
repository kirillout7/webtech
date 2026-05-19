
const EXCHANGE_URL = "https://open.er-api.com/v6/latest/USD";
const NEWS_RSS =
  "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.apple.com%2Fnewsroom%2Frss-feed.rss";

export async function fetchRates() {
  const res = await fetch(EXCHANGE_URL);
  if (!res.ok) throw new Error(`Ошибка курсов: ${res.status}`);
  const data = await res.json();
  if (!data.rates) throw new Error("Некорректный ответ сервиса курсов");
  return data.rates; // объект вида { EUR: 0.92, RUB: 92.4, ... }
}

export async function fetchAppleNews(limit = 6) {
  const res = await fetch(NEWS_RSS);
  if (!res.ok) throw new Error(`Ошибка новостей: ${res.status}`);
  const data = await res.json();
  if (!data.items) throw new Error("Некорректный ответ агрегатора новостей");
  return data.items.slice(0, limit).map((item) => ({
    title: item.title,
    link: item.link,
    date: item.pubDate,
    description: stripHtml(item.description).slice(0, 200),
    thumbnail: item.thumbnail || item.enclosure?.link || null,
  }));
}

function stripHtml(html) {
  return (html || "").replace(/<[^>]*>/g, "").trim();
}

export function formatPrice(usd, currency, rate) {
  if (!rate) {
    return `$${usd.toLocaleString("en-US")}`;
  }
  const value = Math.round(usd * rate);
  const symbols = { USD: "$", EUR: "€", RUB: "₽", GBP: "£", CNY: "¥" };
  const symbol = symbols[currency] ?? currency + " ";
  const formatted = value.toLocaleString("ru-RU");
  return currency === "USD" || currency === "EUR" || currency === "GBP"
    ? `${symbol}${formatted}`
    : `${formatted} ${symbol}`;
}
