import { useEffect, useState } from "react";
import { fetchAppleNews } from "../../api/external";
import { Loader } from "../../components/Loader/Loader";
import styles from "./News.module.css";

/**
 * Страница "Новости".
 *
 * Подгружает RSS-фид Apple Newsroom и отображает последние новости.
 * Закрывает пункт 12 ТЗ — «Работа с запросами (лента новостей)».
 *
 * Запрос делается при первом монтировании страницы через useEffect.
 * Пока идёт загрузка — показываем спиннер; если ошибка — сообщение
 * с возможностью повторить.
 */
export function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchAppleNews(8);
        if (!cancelled) setNews(data);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  // Хелпер для форматирования даты в человеческом виде
  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className={`container ${styles.page}`}>
      <header className={styles.header}>
        <h1 className={styles.title}>Новости Apple</h1>
        <p className={styles.subtitle}>
          Последние анонсы и события из Apple Newsroom.
        </p>
      </header>

      {loading && <Loader label="Загружаем новости..." />}

      {error && !loading && (
        <div className={styles.error}>
          <p>Не удалось загрузить новости: {error}</p>
          <button
            type="button"
            className={styles.retryBtn}
            onClick={() => window.location.reload()}
          >
            Попробовать снова
          </button>
        </div>
      )}

      {!loading && !error && news.length > 0 && (
        <div className={styles.grid}>
          {news.map((item) => (
            <a
              key={item.link}
              href={item.link}
              target="_blank"
              rel="noreferrer"
              className={styles.card}
            >
              {item.thumbnail && (
                <div className={styles.imageWrap}>
                  <img src={item.thumbnail} alt="" loading="lazy" />
                </div>
              )}
              <div className={styles.body}>
                <time className={styles.date}>{formatDate(item.date)}</time>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                {item.description && (
                  <p className={styles.cardDescription}>
                    {item.description}
                    {item.description.length >= 200 && "..."}
                  </p>
                )}
                <span className={styles.readMore}>Читать дальше →</span>
              </div>
            </a>
          ))}
        </div>
      )}

      {!loading && !error && news.length === 0 && (
        <p className={styles.empty}>Сейчас новостей нет. Загляните позже.</p>
      )}
    </div>
  );
}
