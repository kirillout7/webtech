import styles from "./Footer.module.css";

/**
 * Подвал сайта — свёрстан по макету Figma (Footer.pdf).
 *
 * Две информационные колонки со ссылками, блок «Соцсети» с иконками
 * и нижняя полоса с правовыми ссылками. Колонки рендерятся через .map().
 */

// Колонки со ссылками — данные вынесены в массив, разметка строится .map().
const LINK_COLUMNS = [
  {
    title: "Связь с нами",
    links: [
      "Поддержка клиентов",
      "Частые вопросы",
      "Заказы и доставка",
      "Возвраты",
    ],
  },
  {
    title: "О магазине",
    links: [
      "О нас",
      "Карьера",
      "Корпоративная информация",
      "Доступность",
    ],
  },
];

// Нижняя полоса с правовыми ссылками.
const LEGAL_LINKS = [
  "Конфиденциальность",
  "Карта сайта",
  "Защита интеллектуальной собственности",
  "Настройки cookie",
  "Кодекс поставщика",
];

// Соцсети — ведут на реальные внешние ресурсы.
const SOCIALS = [
  { name: "Instagram", url: "https://instagram.com", icon: InstagramIcon },
  { name: "Facebook", url: "https://facebook.com", icon: FacebookIcon },
  { name: "Pinterest", url: "https://pinterest.com", icon: PinterestIcon },
  { name: "Twitter", url: "https://twitter.com", icon: TwitterIcon },
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.top}`}>
        {LINK_COLUMNS.map((column) => (
          <div key={column.title} className={styles.column}>
            <h3 className={styles.columnTitle}>{column.title}</h3>
            <ul className={styles.linkList}>
              {column.links.map((link) => (
                <li key={link}>
                  <span className={styles.link}>{link}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className={styles.column}>
          <h3 className={styles.columnTitle}>Соцсети</h3>
          <div className={styles.socials}>
            {SOCIALS.map(({ name, url, icon: Icon }) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noreferrer"
                className={styles.social}
                aria-label={name}
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={`container ${styles.bottomInner}`}>
          {LEGAL_LINKS.map((link) => (
            <span key={link} className={styles.legalLink}>
              {link}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}

/* ===== Иконки соцсетей ===== */

function InstagramIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z" />
    </svg>
  );
}

function PinterestIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2a10 10 0 0 0-3.65 19.31c-.09-.8-.17-2.04.03-2.92.18-.78 1.18-4.97 1.18-4.97s-.3-.6-.3-1.49c0-1.4.81-2.44 1.82-2.44.86 0 1.27.64 1.27 1.41 0 .86-.55 2.15-.83 3.34-.24 1 .5 1.82 1.49 1.82 1.78 0 3.15-1.88 3.15-4.59 0-2.4-1.73-4.08-4.2-4.08-2.86 0-4.54 2.14-4.54 4.36 0 .86.33 1.79.75 2.29a.3.3 0 0 1 .07.29c-.08.32-.25 1-.28 1.14-.04.18-.15.22-.34.13-1.27-.59-2.06-2.44-2.06-3.93 0-3.2 2.32-6.13 6.7-6.13 3.52 0 6.25 2.5 6.25 5.85 0 3.49-2.2 6.3-5.26 6.3-1.03 0-1.99-.53-2.32-1.17l-.63 2.4c-.23.88-.85 1.98-1.26 2.65A10 10 0 1 0 12 2z" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 5.9c-.7.3-1.5.6-2.3.7.8-.5 1.5-1.3 1.8-2.3-.8.5-1.7.8-2.6 1a4.1 4.1 0 0 0-7 3.7A11.6 11.6 0 0 1 3.4 4.6a4.1 4.1 0 0 0 1.3 5.5c-.7 0-1.3-.2-1.9-.5v.1c0 2 1.4 3.6 3.3 4a4.1 4.1 0 0 1-1.8.1 4.1 4.1 0 0 0 3.8 2.8A8.2 8.2 0 0 1 2 18.3a11.6 11.6 0 0 0 6.3 1.8c7.5 0 11.7-6.3 11.7-11.7v-.5c.8-.6 1.5-1.3 2-2z" />
    </svg>
  );
}
