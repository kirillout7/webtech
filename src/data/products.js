

export const CATEGORIES = [
  { id: "all", label: "Все товары", icon: "✨" },
  { id: "iphone", label: "iPhone", icon: "📱" },
  { id: "mac", label: "Mac", icon: "💻" },
  { id: "ipad", label: "iPad", icon: "📲" },
  { id: "watch", label: "Apple Watch", icon: "⌚" },
  { id: "airpods", label: "AirPods", icon: "🎧" },
  { id: "accessories", label: "Аксессуары", icon: "🔌" },
];

export const PRODUCTS = [
  // ===== iPhone =====
  {
    id: "iphone-17-pro-max",
    category: "iphone",
    title: "iPhone 17 Pro Max",
    subtitle: "Титан. Камера про-уровня. Чип A19 Pro.",
    price: 1199,
    oldPrice: null,
    colors: [
      { name: "Cosmic Orange", hex: "#d96b3d" },
      { name: "Silver", hex: "#d8d8da" },
      { name: "Space Black", hex: "#27282a" },
    ],
    storage: ["256 ГБ", "512 ГБ", "1 ТБ", "2 ТБ"],
    image:
      "https://images.unsplash.com/photo-1696446702183-cbd13ccd24fd?w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1696446702183-cbd13ccd24fd?w=1200&q=80",
      "https://images.unsplash.com/photo-1592286927505-1def25115481?w=1200&q=80",
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=1200&q=80",
    ],
    highlights: ["6,9″ ProMotion", "A19 Pro", "Камера 48 Мп", "USB-C"],
    specs: {
      Дисплей: "6,9″ Super Retina XDR с ProMotion 120 Гц",
      Чип: "Apple A19 Pro, 6 ядер CPU, 6 ядер GPU",
      Камера: "48 Мп Fusion + 48 Мп Ultra Wide + 48 Мп Telephoto 5x",
      "Передняя камера": "18 Мп Center Stage",
      "Батарея": "До 39 часов воспроизведения видео",
      Корпус: "Титан, Ceramic Shield 2",
      Защита: "IP68",
      "Вес": "227 г",
    },
    description:
      "iPhone 17 Pro Max — флагман линейки 2025 года. Новый титановый корпус, экран 6,9 дюйма с ProMotion до 120 Гц, обновлённая система камер Pro-уровня с 48-мегапиксельным телеобъективом и 5x оптическим зумом. Чип Apple A19 Pro тащит самые требовательные игры и нейросетевые модели Apple Intelligence прямо на устройстве.",
    stock: 12,
    isNew: true,
    rating: 4.9,
    reviews: 318,
  },
  {
    id: "iphone-17-pro",
    category: "iphone",
    title: "iPhone 17 Pro",
    subtitle: "Pro-уровень в компактном размере.",
    price: 1099,
    oldPrice: null,
    colors: [
      { name: "Cosmic Orange", hex: "#d96b3d" },
      { name: "Silver", hex: "#d8d8da" },
      { name: "Space Black", hex: "#27282a" },
    ],
    storage: ["256 ГБ", "512 ГБ", "1 ТБ"],
    image:
      "https://images.unsplash.com/photo-1592286927505-1def25115481?w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1592286927505-1def25115481?w=1200&q=80",
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=1200&q=80",
    ],
    highlights: ["6,3″ ProMotion", "A19 Pro", "Камера 48 Мп", "Титан"],
    specs: {
      Дисплей: "6,3″ Super Retina XDR с ProMotion 120 Гц",
      Чип: "Apple A19 Pro",
      Камера: "48 Мп Fusion + 48 Мп Ultra Wide + 48 Мп Telephoto 5x",
      "Батарея": "До 33 часов воспроизведения видео",
      Корпус: "Титан, Ceramic Shield 2",
      Защита: "IP68",
    },
    description:
      "Вся мощь Pro в более компактном корпусе. Чип A19 Pro, тройная камера с 5x телеобъективом, дисплей ProMotion и титановый корпус с матовой поверхностью.",
    stock: 18,
    isNew: true,
    rating: 4.9,
    reviews: 412,
  },
  {
    id: "iphone-17",
    category: "iphone",
    title: "iPhone 17",
    subtitle: "Большие обновления. Доступная цена.",
    price: 799,
    oldPrice: null,
    colors: [
      { name: "Mist Blue", hex: "#b8c8d8" },
      { name: "Sage", hex: "#a8b4a3" },
      { name: "Lavender", hex: "#cdc1d8" },
      { name: "White", hex: "#f0f0f0" },
      { name: "Black", hex: "#1c1c1e" },
    ],
    storage: ["256 ГБ", "512 ГБ"],
    image:
      "https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=1200&q=80",
      "https://images.unsplash.com/photo-1574763582070-15c5d8b76d3e?w=1200&q=80",
    ],
    highlights: ["6,3″ ProMotion", "A19", "Двойная камера 48 Мп", "USB-C"],
    specs: {
      Дисплей: "6,3″ Super Retina XDR с ProMotion 120 Гц",
      Чип: "Apple A19",
      Камера: "48 Мп Fusion + 48 Мп Ultra Wide",
      "Батарея": "До 30 часов воспроизведения видео",
      Корпус: "Алюминий, Ceramic Shield 2",
      Защита: "IP68",
    },
    description:
      "Базовый iPhone впервые получил ProMotion 120 Гц, более яркий экран и чип A19 со всеми возможностями Apple Intelligence. Пять стильных цветов на выбор.",
    stock: 25,
    isNew: true,
    rating: 4.8,
    reviews: 567,
  },
  {
    id: "iphone-air",
    category: "iphone",
    title: "iPhone Air",
    subtitle: "Самый тонкий iPhone в истории.",
    price: 999,
    oldPrice: null,
    colors: [
      { name: "Sky Blue", hex: "#a9c5d8" },
      { name: "Light Gold", hex: "#dac8a0" },
      { name: "Cloud White", hex: "#ededed" },
      { name: "Space Black", hex: "#27282a" },
    ],
    storage: ["256 ГБ", "512 ГБ", "1 ТБ"],
    image:
      "https://images.unsplash.com/photo-1574763582070-15c5d8b76d3e?w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1574763582070-15c5d8b76d3e?w=1200&q=80",
    ],
    highlights: ["5,6 мм", "Титан", "A19 Pro", "ProMotion"],
    specs: {
      Дисплей: "6,5″ Super Retina XDR, ProMotion",
      Чип: "A19 Pro",
      Камера: "48 Мп Fusion",
      Толщина: "5,6 мм",
      Корпус: "Титан",
      Защита: "IP68",
    },
    description:
      "Революционный по толщине корпус из титана — всего 5,6 мм. Лёгкий, элегантный, по-настоящему премиальный. Совершенство в каждой грани.",
    stock: 7,
    isNew: true,
    rating: 4.7,
    reviews: 189,
  },
  {
    id: "iphone-17e",
    category: "iphone",
    title: "iPhone 17e",
    subtitle: "iPhone, который ты можешь себе позволить.",
    price: 599,
    oldPrice: null,
    colors: [
      { name: "White", hex: "#f0f0f0" },
      { name: "Black", hex: "#1c1c1e" },
    ],
    storage: ["128 ГБ", "256 ГБ", "512 ГБ"],
    image:
      "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=1200&q=80",
    ],
    highlights: ["6,1″ OLED", "A19", "USB-C", "Face ID"],
    specs: {
      Дисплей: "6,1″ Super Retina XDR",
      Чип: "Apple A19",
      Камера: "48 Мп Fusion",
      "Батарея": "До 26 часов воспроизведения видео",
      Защита: "IP68",
    },
    description:
      "Доступная модель в линейке iPhone 17. Полный набор современных функций: A19, отличная камера, Face ID и Apple Intelligence — по самой выгодной цене.",
    stock: 30,
    isNew: false,
    rating: 4.6,
    reviews: 234,
  },

  // ===== Mac =====
  {
    id: "macbook-pro-16-m4",
    category: "mac",
    title: 'MacBook Pro 16" M4 Max',
    subtitle: "Самый мощный Mac для профессионалов.",
    price: 3499,
    oldPrice: null,
    colors: [
      { name: "Space Black", hex: "#27282a" },
      { name: "Silver", hex: "#d8d8da" },
    ],
    storage: ["1 ТБ", "2 ТБ", "4 ТБ", "8 ТБ"],
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1200&q=80",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=1200&q=80",
    ],
    highlights: ['16,2"', "M4 Max", "До 128 ГБ RAM", "До 24 ч работы"],
    specs: {
      Дисплей: '16,2" Liquid Retina XDR, ProMotion',
      Чип: "Apple M4 Max, 16 ядер CPU, 40 ядер GPU",
      Память: "От 36 ГБ до 128 ГБ Unified Memory",
      Накопитель: "От 1 ТБ SSD",
      Аккумулятор: "До 24 часов работы",
      Порты: "3× Thunderbolt 5, HDMI, SDXC, MagSafe 3",
    },
    description:
      "Бескомпромиссный MacBook Pro для тех, кто работает с 8K-видео, машинным обучением и сложным 3D. Экран Mini-LED с ProMotion, тихая система охлаждения и до 24 часов автономности.",
    stock: 8,
    isNew: true,
    rating: 4.9,
    reviews: 142,
  },
  {
    id: "macbook-air-15-m4",
    category: "mac",
    title: 'MacBook Air 15" M4',
    subtitle: "Лёгкий, тихий, невероятно быстрый.",
    price: 1299,
    oldPrice: 1399,
    colors: [
      { name: "Midnight", hex: "#1a1c20" },
      { name: "Starlight", hex: "#e8e0cf" },
      { name: "Sky Blue", hex: "#a9c5d8" },
      { name: "Silver", hex: "#d8d8da" },
    ],
    storage: ["256 ГБ", "512 ГБ", "1 ТБ", "2 ТБ"],
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=1200&q=80",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1200&q=80",
    ],
    highlights: ['15,3"', "M4", "Без вентилятора", "До 18 ч работы"],
    specs: {
      Дисплей: '15,3" Liquid Retina',
      Чип: "Apple M4, 10 ядер CPU, 10 ядер GPU",
      Память: "От 16 ГБ до 32 ГБ",
      Накопитель: "От 256 ГБ SSD",
      Аккумулятор: "До 18 часов работы",
      Вес: "1,51 кг",
    },
    description:
      "Большой 15-дюймовый экран в невероятно тонком и лёгком корпусе. Чип M4 справится с любым повседневным сценарием, а отсутствие вентилятора означает абсолютную тишину.",
    stock: 22,
    isNew: false,
    rating: 4.8,
    reviews: 489,
  },
  {
    id: "macbook-air-13-m4",
    category: "mac",
    title: 'MacBook Air 13" M4',
    subtitle: "Идеальный Mac на каждый день.",
    price: 1099,
    oldPrice: null,
    colors: [
      { name: "Midnight", hex: "#1a1c20" },
      { name: "Starlight", hex: "#e8e0cf" },
      { name: "Sky Blue", hex: "#a9c5d8" },
      { name: "Silver", hex: "#d8d8da" },
    ],
    storage: ["256 ГБ", "512 ГБ", "1 ТБ"],
    image:
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=1200&q=80",
    ],
    highlights: ['13,6"', "M4", "1,24 кг", "До 18 ч работы"],
    specs: {
      Дисплей: '13,6" Liquid Retina',
      Чип: "Apple M4",
      Память: "От 16 ГБ",
      Накопитель: "От 256 ГБ SSD",
      Вес: "1,24 кг",
    },
    description:
      "Самый популярный Mac в обновлённом исполнении. Корпус толщиной 11,3 мм, дисплей 13,6 дюйма и весь день работы от одной зарядки.",
    stock: 35,
    isNew: false,
    rating: 4.8,
    reviews: 821,
  },
  {
    id: "imac-m4",
    category: "mac",
    title: "iMac 24″ M4",
    subtitle: "Яркий моноблок для всей семьи.",
    price: 1499,
    oldPrice: null,
    colors: [
      { name: "Blue", hex: "#6f9fd0" },
      { name: "Pink", hex: "#f0bdc6" },
      { name: "Green", hex: "#a8c8a4" },
      { name: "Silver", hex: "#d8d8da" },
      { name: "Yellow", hex: "#f5dc88" },
    ],
    storage: ["256 ГБ", "512 ГБ", "1 ТБ"],
    image:
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=1200&q=80",
    ],
    highlights: ['24"', "4,5K Retina", "M4", "Magic Keyboard"],
    specs: {
      Дисплей: '24" 4,5K Retina',
      Чип: "Apple M4",
      Память: "От 16 ГБ",
      Накопитель: "От 256 ГБ",
      "В комплекте": "Magic Keyboard, Magic Mouse",
    },
    description:
      "Тончайший моноблок толщиной 11,5 мм с яркими цветами на любой вкус. Экран 4,5K с шириной охвата P3, шесть динамиков и студийная камера.",
    stock: 14,
    isNew: false,
    rating: 4.7,
    reviews: 256,
  },
  {
    id: "mac-mini-m4",
    category: "mac",
    title: "Mac mini M4",
    subtitle: "Маленький компьютер. Огромные возможности.",
    price: 599,
    oldPrice: null,
    colors: [{ name: "Silver", hex: "#d8d8da" }],
    storage: ["256 ГБ", "512 ГБ", "1 ТБ", "2 ТБ"],
    image:
      "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=1200&q=80",
    ],
    highlights: ["12,7 см", "M4 или M4 Pro", "До 64 ГБ", "5 портов"],
    specs: {
      Чип: "Apple M4 или M4 Pro",
      Память: "От 16 до 64 ГБ",
      Накопитель: "От 256 ГБ",
      Размеры: "12,7 × 12,7 × 5 см",
      Порты: "Thunderbolt 4, USB-C, HDMI, Ethernet",
    },
    description:
      "Самый компактный Mac. Подключите свой монитор, клавиатуру и мышь — и получите полноценный десктоп для любых задач.",
    stock: 28,
    isNew: false,
    rating: 4.8,
    reviews: 612,
  },

  // ===== iPad =====
  {
    id: "ipad-pro-m4",
    category: "ipad",
    title: 'iPad Pro 13" M4',
    subtitle: "Невероятно тонкий. Невероятно мощный.",
    price: 1299,
    oldPrice: null,
    colors: [
      { name: "Space Black", hex: "#27282a" },
      { name: "Silver", hex: "#d8d8da" },
    ],
    storage: ["256 ГБ", "512 ГБ", "1 ТБ", "2 ТБ"],
    image:
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=1200&q=80",
      "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=1200&q=80",
    ],
    highlights: ['13" Tandem OLED', "M4", "5,1 мм", "Apple Pencil Pro"],
    specs: {
      Дисплей: '13" Ultra Retina XDR, Tandem OLED',
      Чип: "Apple M4",
      Толщина: "5,1 мм",
      Камера: "12 Мп Wide + LiDAR",
      Поддержка: "Apple Pencil Pro, Magic Keyboard",
    },
    description:
      "Самый тонкий продукт в истории Apple. Технология Tandem OLED обеспечивает невероятный контраст и яркость, а чип M4 справится с задачами, недоступным многим лэптопам.",
    stock: 10,
    isNew: true,
    rating: 4.9,
    reviews: 287,
  },
  {
    id: "ipad-air-m3",
    category: "ipad",
    title: 'iPad Air 11" M3',
    subtitle: "Воздушно лёгкий. Удивительно способный.",
    price: 599,
    oldPrice: 699,
    colors: [
      { name: "Space Gray", hex: "#5a5a5d" },
      { name: "Blue", hex: "#5f7ea0" },
      { name: "Purple", hex: "#8b7cb0" },
      { name: "Starlight", hex: "#e8e0cf" },
    ],
    storage: ["128 ГБ", "256 ГБ", "512 ГБ", "1 ТБ"],
    image:
      "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=1200&q=80",
    ],
    highlights: ['11"', "M3", "Apple Pencil Pro", "Touch ID"],
    specs: {
      Дисплей: '11" Liquid Retina',
      Чип: "Apple M3",
      Память: "8 ГБ",
      Touch: "ID в кнопке питания",
    },
    description:
      "Универсальный iPad для учёбы, работы и творчества. Чип M3 и поддержка Apple Pencil Pro делают его отличным выбором для большинства задач.",
    stock: 24,
    isNew: false,
    rating: 4.8,
    reviews: 643,
  },
  {
    id: "ipad-mini",
    category: "ipad",
    title: "iPad mini A17 Pro",
    subtitle: "Большие возможности. Компактный формат.",
    price: 499,
    oldPrice: null,
    colors: [
      { name: "Blue", hex: "#5f7ea0" },
      { name: "Purple", hex: "#8b7cb0" },
      { name: "Starlight", hex: "#e8e0cf" },
      { name: "Space Gray", hex: "#5a5a5d" },
    ],
    storage: ["128 ГБ", "256 ГБ", "512 ГБ"],
    image:
      "https://images.unsplash.com/photo-1623126908029-58cb08a2b272?w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1623126908029-58cb08a2b272?w=1200&q=80",
    ],
    highlights: ['8,3"', "A17 Pro", "Apple Pencil Pro", "USB-C"],
    specs: {
      Дисплей: '8,3" Liquid Retina',
      Чип: "Apple A17 Pro",
      Память: "8 ГБ",
    },
    description:
      "Самый компактный iPad помещается в одной руке, но при этом справляется с любыми задачами благодаря чипу A17 Pro и поддержке Apple Intelligence.",
    stock: 19,
    isNew: false,
    rating: 4.7,
    reviews: 421,
  },

  // ===== Apple Watch =====
  {
    id: "apple-watch-ultra-3",
    category: "watch",
    title: "Apple Watch Ultra 3",
    subtitle: "Часы для самых смелых приключений.",
    price: 799,
    oldPrice: null,
    colors: [
      { name: "Natural Titanium", hex: "#a8a298" },
      { name: "Black Titanium", hex: "#2a2a2c" },
    ],
    storage: ["64 ГБ"],
    image:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=1200&q=80",
    ],
    highlights: ["49 мм", "Титан", "Сапфировое стекло", "До 72 ч"],
    specs: {
      Дисплей: "49 мм Always-On Retina, до 3000 нит",
      Корпус: "Титан, сапфировое стекло",
      Аккумулятор: "До 72 часов в режиме энергосбережения",
      "Водозащита": "100 м",
      GPS: "Двухдиапазонный, точный",
    },
    description:
      "Самые прочные и автономные часы Apple. Созданы для дайвинга, треккинга, бега и любых экстремальных нагрузок.",
    stock: 11,
    isNew: true,
    rating: 4.9,
    reviews: 192,
  },
  {
    id: "apple-watch-series-10",
    category: "watch",
    title: "Apple Watch Series 10",
    subtitle: "Самый тонкий Apple Watch в истории.",
    price: 399,
    oldPrice: null,
    colors: [
      { name: "Jet Black", hex: "#0a0a0c" },
      { name: "Rose Gold", hex: "#c9a89c" },
      { name: "Silver", hex: "#d8d8da" },
    ],
    storage: ["64 ГБ"],
    image:
      "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=1200&q=80",
    ],
    highlights: ["46 мм", "Алюминий", "Always-On", "Sleep Apnea"],
    specs: {
      Дисплей: '"46 мм Always-On Retina',
      Корпус: "Алюминий или нержавеющая сталь",
      Аккумулятор: "До 18 часов, до 36 в режиме сбережения",
      Здоровье: "Sleep Apnea, ЭКГ, SpO₂",
    },
    description:
      "Невероятно тонкий и лёгкий. Большой экран, новые функции для здоровья, включая определение апноэ сна.",
    stock: 27,
    isNew: false,
    rating: 4.8,
    reviews: 538,
  },
  {
    id: "apple-watch-se",
    category: "watch",
    title: "Apple Watch SE",
    subtitle: "Все главные функции — по доступной цене.",
    price: 249,
    oldPrice: 279,
    colors: [
      { name: "Midnight", hex: "#1a1c20" },
      { name: "Starlight", hex: "#e8e0cf" },
      { name: "Silver", hex: "#d8d8da" },
    ],
    storage: ["32 ГБ"],
    image:
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=1200&q=80",
    ],
    highlights: ["40/44 мм", "GPS", "Crash Detection", "Алюминий"],
    specs: {
      Дисплей: "40 или 44 мм Retina",
      Корпус: "Алюминий",
      Аккумулятор: "До 18 часов",
    },
    description:
      "Стартовая модель Apple Watch с фитнес-трекером, уведомлениями и определением аварий. Лучший выбор для первых часов.",
    stock: 41,
    isNew: false,
    rating: 4.7,
    reviews: 894,
  },

  // ===== AirPods =====
  {
    id: "airpods-pro-3",
    category: "airpods",
    title: "AirPods Pro 3",
    subtitle: "Адаптивное аудио. Революционный шумодав.",
    price: 249,
    oldPrice: null,
    colors: [{ name: "White", hex: "#f0f0f0" }],
    storage: [],
    image:
      "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=1200&q=80",
      "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=1200&q=80",
    ],
    highlights: ["Шумодав", "Heart Rate", "MagSafe", "USB-C"],
    specs: {
      Чип: "Apple H3",
      Шумоподавление: "Активное + Adaptive Audio",
      Датчики: "Пульсометр",
      "Время работы": "До 6 ч с ANC, до 30 ч с кейсом",
    },
    description:
      "Лучшие наушники для повседневной жизни и тренировок. Новый чип H3, измерение пульса прямо в ухе и в два раза более эффективный шумодав.",
    stock: 50,
    isNew: true,
    rating: 4.9,
    reviews: 762,
  },
  {
    id: "airpods-4",
    category: "airpods",
    title: "AirPods 4",
    subtitle: "Удобная посадка. Кристальный звук.",
    price: 129,
    oldPrice: null,
    colors: [{ name: "White", hex: "#f0f0f0" }],
    storage: [],
    image:
      "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=1200&q=80",
    ],
    highlights: ["H2", "Adaptive Audio", "USB-C", "До 30 ч"],
    specs: {
      Чип: "Apple H2",
      Тип: "Без амбушюр",
      "Время работы": "До 30 часов с кейсом",
    },
    description:
      "Полностью обновлённый дизайн AirPods. Более удобная посадка, улучшенное звучание и поддержка Adaptive Audio даже без амбушюр.",
    stock: 60,
    isNew: false,
    rating: 4.7,
    reviews: 432,
  },
  {
    id: "airpods-max",
    category: "airpods",
    title: "AirPods Max",
    subtitle: "Премиальные накладные. Бескомпромиссный звук.",
    price: 549,
    oldPrice: 599,
    colors: [
      { name: "Midnight", hex: "#1a1c20" },
      { name: "Starlight", hex: "#e8e0cf" },
      { name: "Blue", hex: "#6f9fd0" },
      { name: "Purple", hex: "#8b7cb0" },
      { name: "Orange", hex: "#e08a4a" },
    ],
    storage: [],
    image:
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=1200&q=80",
    ],
    highlights: ["Накладные", "ANC", "USB-C", "Spatial Audio"],
    specs: {
      Чип: "Apple H1",
      Тип: "Накладные, закрытого типа",
      "Время работы": "До 20 часов с ANC",
    },
    description:
      "Накладные наушники класса премиум. Алюминиевый корпус, дышащая ткань и звук, который невозможно перепутать ни с чем.",
    stock: 9,
    isNew: false,
    rating: 4.6,
    reviews: 198,
  },

  // ===== Аксессуары =====
  {
    id: "magic-keyboard",
    category: "accessories",
    title: "Magic Keyboard с Touch ID",
    subtitle: "Тонкая, тихая, с биометрией.",
    price: 129,
    oldPrice: null,
    colors: [
      { name: "White", hex: "#f0f0f0" },
      { name: "Black", hex: "#1c1c1e" },
    ],
    storage: [],
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=1200&q=80",
    ],
    highlights: ["Touch ID", "USB-C", "Подсветка"],
    specs: {
      Подключение: "Bluetooth, USB-C",
      Раскладка: "Русская/английская",
    },
    description:
      "Тонкая беспроводная клавиатура с Touch ID для быстрой и безопасной разблокировки Mac.",
    stock: 80,
    isNew: false,
    rating: 4.7,
    reviews: 512,
  },
  {
    id: "magic-mouse",
    category: "accessories",
    title: "Magic Mouse",
    subtitle: "Multi-Touch жесты. USB-C.",
    price: 99,
    oldPrice: null,
    colors: [
      { name: "White", hex: "#f0f0f0" },
      { name: "Black", hex: "#1c1c1e" },
    ],
    storage: [],
    image:
      "https://images.unsplash.com/photo-1527814050087-3793815479db?w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1527814050087-3793815479db?w=1200&q=80",
    ],
    highlights: ["Multi-Touch", "USB-C", "До 30 дней"],
    specs: {
      Подключение: "Bluetooth, USB-C",
      "Время работы": "До месяца от одной зарядки",
    },
    description:
      "Тонкая и обтекаемая беспроводная мышь с поддержкой Multi-Touch жестов.",
    stock: 75,
    isNew: false,
    rating: 4.3,
    reviews: 678,
  },
  {
    id: "apple-pencil-pro",
    category: "accessories",
    title: "Apple Pencil Pro",
    subtitle: "Тактильный отклик. Squeeze. Barrel Roll.",
    price: 129,
    oldPrice: null,
    colors: [{ name: "White", hex: "#f0f0f0" }],
    storage: [],
    image:
      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200&q=80",
    ],
    highlights: ["Squeeze", "Barrel Roll", "Find My", "Тактильный отклик"],
    specs: {
      Совместимость: "iPad Pro M4, iPad Air M3",
      Подключение: "Magnetic, USB-C",
    },
    description:
      "Самый продвинутый Apple Pencil. Новые жесты сжатия и поворота делают творчество и заметки ещё интуитивнее.",
    stock: 45,
    isNew: false,
    rating: 4.8,
    reviews: 289,
  },
  {
    id: "airtag-4pack",
    category: "accessories",
    title: "AirTag (4 шт.)",
    subtitle: "Найдёт ключи, рюкзак и багаж.",
    price: 99,
    oldPrice: null,
    colors: [{ name: "White", hex: "#f0f0f0" }],
    storage: [],
    image:
      "https://images.unsplash.com/photo-1641894252100-aa3c14878ff2?w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1641894252100-aa3c14878ff2?w=1200&q=80",
    ],
    highlights: ["Find My", "U1 чип", "1 год работы", "IP67"],
    specs: {
      Чип: "Apple U1",
      Батарея: "CR2032, около года",
      Защита: "IP67",
    },
    description:
      "Крошечная метка, которая помогает находить ваши вещи через приложение «Локатор». Точный поиск через UWB, защита от случайного слежения.",
    stock: 100,
    isNew: false,
    rating: 4.7,
    reviews: 1284,
  },
];

/** Хелпер: найти товар по id. */
export function findProductById(id) {
  return PRODUCTS.find((p) => p.id === id) || null;
}

/** Хелпер: получить N товаров той же категории, кроме самого товара. */
export function getRelatedProducts(product, limit = 4) {
  return PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id,
  ).slice(0, limit);
}
