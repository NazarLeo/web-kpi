## Зміст

- [Лабораторна робота №1](#лабораторна-робота-1)
- [Лабораторна робота №2](#лабораторна-робота-2)
- [Лабораторна робота №3](#лабораторна-робота-3)
- [Лабораторна робота №4](#лабораторна-робота-4)

---

<a id="лабораторна-робота-1"></a>

# ЛАБОРАТОРНА РОБОТА №1

## Тема

Створення проєкту на TypeScript, Next.js та Node.js (SSR)

## Інформація про виконавця

- **Виконав:** Леочко Назар
- **Група:** ТР-32
- **Дисципліна:** Веб-орієнтована розробка системи екологічного моніторингу

---

## 1. Мета роботи

Розпрацювання веб-додатку для моніторингу якості повітря з використанням сучасних технологій стеку TypeScript, Next.js та Node.js із серверним рендерингом (SSR). Розробка RESTful API для роботи з даними про станції спостереження та забруднення.

## 2. Завдання

1. Налаштування проєкту з використанням Next.js та TypeScript
2. Розробка структури компонентів та сторінок
3. Створення API маршрутів для роботи з даними станцій і якості повітря
4. Реалізація типізації даних для забезпечення типобезпеки
5. Налаштування CSS та стилізації
6. Реалізація утилітних функцій для обробки даних якості повітря

## 3. Архітектура проєкту

### 3.1 Структура каталогів

```
src/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # Головна сторінка
│   ├── about/page.tsx            # Сторінка "Про проект"
│   ├── stations/                 # Сторінки для станцій
│   ├── pollutants/               # Сторінка забруднювачів
│   ├── api/                      # API маршрути
│   │   ├── stations/
│   │   │   ├── route.ts          # Отримання всіх станцій
│   │   │   └── [id]/             # Динамічні маршрути для станцій
│   │   └── statistics/route.ts
│   └── globals.css
├── components/                   # Переиспользуемые компоненты
│   └── Header.tsx
├── lib/                          # Утилітні функції
│   ├── airQualityUtils.ts       # Обробка даних якості повітря
│   └── mockData.ts              # Тестові дані
└── types/                        # TypeScript типи
    ├── airQuality.ts
    ├── api.ts
    ├── apiRequests.ts
    ├── measurement.ts
    ├── station.ts
    └── index.ts
```

### 3.2 Основні технології

- **Next.js 15+** - React фреймворк з SSR підтримкою
- **TypeScript** - Для типобезпеки та детектування помилок на етапі розробки
- **React 19** - Бібліотека для побудови UI
- **Node.js** - Серверне середовище виконання
- **PostCSS** - Постпроцесор CSS
- **ESLint** - Лінтер для забезпечення якості коду

## 4. Запуск проєкту

### 4.1 Встановлення залежностей

```bash
npm install
```

### 4.2 Запуск сервера розробки

```bash
npm run dev
```

Сервер буде доступний за адресою [http://localhost:3000](http://localhost:3000)

### 4.3 Команди для роботи

- `npm run dev` - Запуск сервера розробки
- `npm run build` - Збірка проєкту для production
- `npm run start` - Запуск збудованого проєкту
- `npm run lint` - Перевірка коду лінтером

## 5. Основні компоненти та функціональність

### 5.1 API Маршрути

- **GET /api/stations** - Отримання списку всіх станцій
- **GET /api/stations/[id]** - Отримання інформації про конкретну станцію
- **GET /api/stations/[id]/air-quality** - Отримання даних якості повітря для станції
- **GET /api/stations/[id]/historical** - Отримання історичних даних станції
- **GET /api/statistics** - Отримання статистичних даних

### 5.2 Сторінки

- **Головна сторінка** (`/`) - Вітальна сторінка додатку
- **Про проект** (`/about`) - Інформація про проект
- **Станції** (`/stations`) - Список всіх станцій спостереження
- **Деталі станції** (`/stations/[id]`) - Детальна інформація про станцію
- **Забруднювачі** (`/pollutants`) - Інформація про забруднювачі

## 6. Типізація даних

Проект використовує строгу типізацію TypeScript. Основні tipos:

- `Station` - Модель станції спостереження
- `AirQuality` - Модель даних якості повітря
- `Measurement` - Модель вимірювання
- `Pollutant` - Модель забруднювача

## 7. Висновки

Розроблений проект демонструє:
- Профільну роботу з сучасним React фреймворком (Next.js)
- Використання TypeScript для забезпечення типобезпеки
- Реалізацію серверного рендерингу (SSR) для оптимізації продуктивності
- Розробку RESTful API на Node.js
- Правильну організацію структури проєкту

---

**Дата виконання:** Березень 2026

---

<a id="лабораторна-робота-2"></a>
## ЛАБОРАТОРНА РОБОТА №2

**Тема:** Інтеграція інтерактивної карти та графіків

**Мета:** Інтегрувати картографічні бібліотеки та інструменти візуалізації для створення інтерактивного інтерфейсу відображення екологічних даних.

---

## 1. Мета роботи

Навчитися інтегрувати картографічні бібліотеки та інструменти візуалізації для створення інтерактивного інтерфейсу відображення екологічних даних.

---

## 2. Теоретичні відомості

- Основи веб-картографії та робота з географічними координатами
- Особливості інтеграції картографічних бібліотек у Next.js
- Принципи візуалізації часових рядів та статистичних даних
- Створення інтерактивних компонентів та обробка подій

---

## 3. Частина 1. Інтерактивна карта


![alt text](<Screenshot 2026-03-24 at 8.20.42 PM.png>)
![alt text](<Screenshot 2026-03-24 at 8.18.49 PM.png>)

Підключено **Leaflet.js** через `react-leaflet` із динамічним імпортом (`next/dynamic`) для вирішення проблем SSR.

**Компонент:** `src/components/StationMap.tsx`

### Реалізовано:
- Базова карта OpenStreetMap з центром на Україні
- Кастомні маркери станцій з кольоровим кодуванням за рівнем AQI (зелений/жовтий/оранжевий/червоний)
- Спливаючі вікна (popup) з детальною інформацією про станцію — назва, місто, AQI, тип, статус
- Масштабування та переміщення по карті
- Виділення обраної станції (збільшений маркер із синім обрамленням)
- Плавне переміщення до обраної станції (`flyTo`)

### Ключові фрагменти коду

Динамічний імпорт з вимкненим SSR:

```tsx
const StationMap = dynamic(() => import("@/components/StationMap"), {
  ssr: false,
  loading: () => <div className="map-loading"><p>Завантаження карти...</p></div>,
});
```

Створення кольорового маркера:

```tsx
function createMarkerIcon(aqi: number | undefined, isSelected: boolean): L.DivIcon {
  const level = aqi ? getAirQualityLevel(aqi) : null;
  const color = level ? getAirQualityColor(level) : "#999";
  const size = isSelected ? 40 : 28;
  const border = isSelected ? "3px solid #1d4ed8" : "2px solid white";
  return L.divIcon({
    className: "custom-marker",
    html: `<div style="
      width: ${size}px; height: ${size}px;
      background: ${color}; border-radius: 50%;
      border: ${border};
      display: flex; align-items: center; justify-content: center;
      color: white; font-weight: 700;
    ">${aqi ?? "?"}</div>`,
    iconSize: [size, size],
  });
}
```

---

## 4. Частина 2. Візуалізація даних графіками

Підключено **Recharts** — декларативна бібліотека графіків для React.

**Компонент:** `src/components/Charts.tsx`

### Реалізовані типи графіків:

1. **Лінійний графік** (`TimeSeriesChart`) — зміна концентрацій забруднювачів за останні 24 години
2. **Стовпчикова діаграма** (`StationComparisonChart`) — порівняння AQI всіх станцій
3. **Кругова діаграма** (`PollutionPieChart`) — структура забруднення обраної станції (частка кожного забруднювача)

### Інтерактивні елементи:
- Tooltip при наведенні курсора з детальними значеннями
- Легенда для кожного графіка
- Можливість приховання серій даних натисканням на легенду

### Ключові фрагменти коду

Лінійний графік (часовий ряд):

```tsx
<ResponsiveContainer width="100%" height={300}>
  <LineChart data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="time" />
    <YAxis />
    <Tooltip />
    <Legend />
    {pollutantTypes.map((type) => (
      <Line key={type} type="monotone" dataKey={type}
        stroke={POLLUTANT_COLORS[type]} strokeWidth={2} dot={false} />
    ))}
  </LineChart>
</ResponsiveContainer>
```

---

## 5. Частина 3. Інтеграція карти та графіків

**Сторінка:** `/monitoring` → `src/app/monitoring/page.tsx`  
**Клієнтський компонент:** `src/components/MonitoringClient.tsx`

### Реалізовано:
- Вибір станції на карті → відображення її графіків у правій панелі
- Список станцій під картою — альтернативний спосіб вибору
- Візуальне виділення активної станції (маркер + список)
- Кнопка скидання вибору
- Фільтрація станцій за типом та статусом — оновлює і карту, і список
- Адаптивний layout: на десктопі — 2 колонки (карта | графіки), на мобільних — 1 колонка

### Ключові фрагменти коду

Синхронізація карти та графіків через `useState`:

```tsx
const [selectedStationId, setSelectedStationId] = useState<string | null>(null);

const handleStationSelect = useCallback((stationId: string | null) => {
  setSelectedStationId(stationId);
}, []);

<StationMap
  stations={filteredStations}
  selectedStationId={selectedStationId}
  onStationSelect={handleStationSelect}
/>
```

---

## 6. Контрольні питання

**1. Чому виникають проблеми при інтеграції картографічних бібліотек у Next.js і як їх вирішити?**

Leaflet використовує об'єкти браузера (`window`, `document`, `navigator`), які відсутні під час серверного рендерингу (SSR). При спробі імпорту на сервері виникає помилка `ReferenceError: window is not defined`. Рішення — динамічний імпорт із `ssr: false`:

```tsx
const Map = dynamic(() => import("@/components/StationMap"), { ssr: false });
```

Також потрібно імпортувати CSS Leaflet (`leaflet/dist/leaflet.css`) тільки на клієнті.

**2. Які типи графіків найкраще підходять для візуалізації різних екологічних показників?**

- **Лінійний графік** — для часових рядів (зміна концентрацій за годину/добу/місяць)
- **Стовпчикова діаграма** — для порівняння між станціями або між періодами
- **Кругова діаграма** — для демонстрації частки кожного забруднювача у загальній картині
- **Теплова карта** — для відображення просторового розподілу забруднення

**3. Як організувати ефективну взаємодію між різними компонентами інтерфейсу?**

Використовується підняття стану (state lifting). Стан обраної станції зберігається в батьківському компоненті `MonitoringClient` і передається через props до карти, списку та графіків. Використання `useCallback` запобігає зайвим перерендерам. `useMemo` кешує дороговартісні обчислення (генерація часових рядів). Для складніших сценаріїв використовують React Context або бібліотеки стану (Zustand, Redux).

**4. Які фактори впливають на продуктивність карти при великій кількості маркерів?**

- **DOM-елементи**: кожний маркер — окремий елемент DOM; при 1000+ маркерах рендеринг уповільнюється
- **Рішення**: кластеризація маркерів (leaflet.markercluster), Canvas-рендеринг замість SVG, віртуалізація — показ тільки маркерів у видимій ділянці карти
- **Оптимізація подій**: throttle/debounce обробників `moveend`, `zoomend`
- **Спрощення іконок**: уникати складних HTML-іконок, використовувати прості SVG або canvas

---

## 7. Висновки

У лабораторній роботі №2 реалізовано інтерактивний інтерфейс моніторингу якості повітря, який поєднує карту Leaflet із графіками Recharts. Вирішено проблему SSR через динамічний імпорт. Створено три типи графіків: лінійний (часовий ряд), стовпчиковий (порівняння станцій) та круговий (структура забруднення). Забезпечено синхронізацію між картою та графіками — вибір станції на карті одразу оновлює панель графіків. Інтерфейс адаптивний для різних розмірів екранів.

---

**Виконав:** Леочко Назар  
**Група:** ТР-32  
**Дата виконання:** Березень 2026

---

<a id="лабораторна-робота-3"></a>
## ЛАБОРАТОРНА РОБОТА №3

**Тема:** Впровадження аналітики та логування

**Мета:** Навчитися інтегрувати системи веб-аналітики для відстеження користувацької активності та реалізувати серверне логування для моніторингу роботи додатку.

---

## 1. Мета роботи

Навчитися інтегрувати системи веб-аналітики для відстеження користувацької активності та реалізувати серверне логування для моніторингу роботи додатку.

---

## 2. Теоретичні відомості

- Принципи веб-аналітики та метрики поведінки користувачів
- Structured logging у серверних додатках
- Next.js Middleware для обробки запитів
- Методи відстеження помилок та їх обробка

---

## 3. Частина 1. Веб-аналітика

Підключено **Google Analytics 4** через `next/script` з динамічним відстеженням навігації.

**Компоненти:** `src/components/Analytics.tsx`, `src/lib/analytics.ts`

### Реалізовано:
- Ініціалізація GA4 через `gtag.js` зі стратегією `afterInteractive`
- Автоматичний трекінг переходів між сторінками через `usePathname` + `useEffect`
- Кастомні події:
  - `station_view` — при виборі станції
  - `map_interaction` — при кліку на маркер карти
  - `chart_view` — при першому наведенні на графік
  - `filter_apply` — при застосуванні фільтру по типу або статусу
  - `data_export` — при виконанні експорту даних
- Вимірювання часу завантаження сторінок через Performance API (вбудований у браузер)

![alt text](<Screenshot 2026-03-25 at 1.02.28 AM.png>)

> Панель GA4 реального часу доступна після підключення реального Measurement ID у змінній `NEXT_PUBLIC_GA_ID`.

### Ключові фрагменти коду

Ініціалізація GA4 (`Analytics.tsx`):

```tsx
<Script
  id="gtag-init"
  strategy="afterInteractive"
  dangerouslySetInnerHTML={{
    __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_MEASUREMENT_ID}', {
        page_path: window.location.pathname,
        send_page_view: false
      });
    `,
  }}
/>
```

Трекінг переходів між сторінками:

```tsx
function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = pathname + (searchParams.toString() ? `?${searchParams}` : "");
    pageview(url);
  }, [pathname, searchParams]);

  return null;
}
```

Кастомні події (`analytics.ts`):

```ts
export function trackStationView(stationId: string, stationName: string) {
  window.gtag("event", "station_view", { station_id: stationId, station_name: stationName });
}

export function trackMapInteraction(action: "click" | "zoom", detail?: string) {
  window.gtag("event", "map_interaction", { action, detail: detail ?? "" });
}

export function trackFilterApply(filterName: string, value: string) {
  window.gtag("event", "filter_apply", { filter_name: filterName, filter_value: value });
}
```

---

## 4. Частина 2. Серверне логування

Підключено бібліотеку **pino** для структурованого логування на сервері.

**Файл:** `src/lib/logger.ts`

### Реалізовано:
- Structured logging у форматі JSON через pino
- Визначені рівні: `debug`, `info`, `warn`, `error`
- Хелпери `logInfo`, `logWarn`, `logError`, `logDebug` з підтримкою контексту
- Логування кожного запиту до API через Middleware
- Автоматичне збагачення логів: `timestamp`, `app`, `env`, `level`

### Приклади структурованих лог-записів

```json
{"level":"info","time":"2026-03-24T18:30:00.000Z","app":"eco-monitoring","env":"development","msg":"GET /api/stations","count":7,"page":1,"type":null,"status":null}
```

```json
{"level":"warn","time":"2026-03-24T18:30:05.000Z","app":"eco-monitoring","env":"development","msg":"GET /api/stations/unknown-id → 404","method":"GET","url":"/api/stations/unknown-id","status":404,"durationMs":2}
```

```json
{"level":"error","time":"2026-03-24T18:30:10.000Z","app":"eco-monitoring","env":"development","msg":"GET /api/stations failed","err":{"message":"Database connection refused","name":"Error"}}
```

### Ключові фрагменти коду

Налаштування логера (`logger.ts`):

```ts
import pino from "pino";

const logger = pino({
  level: process.env.LOG_LEVEL || "info",
  base: { app: "eco-monitoring", env: process.env.NODE_ENV || "development" },
  formatters: {
    level(label) { return { level: label }; },
  },
  timestamp: pino.stdTimeFunctions.isoTime,
});

export const logError = (message: string, error?: unknown, context?: Record<string, unknown>) =>
  logger.error(
    { ...(context ?? {}), err: error instanceof Error
        ? { message: error.message, stack: error.stack }
        : error },
    message
  );
```

Використання в API route:

```ts
logInfo("GET /api/stations", { count: paginatedStations.length, page });
// ...
logError("GET /api/stations failed", error);
```

---

## 5. Частина 3. Обробка помилок

### Реалізовано:

| Механізм | Файл | Призначення |
|---|---|---|
| `ErrorBoundary` | `src/components/ErrorBoundary.tsx` | Перехоплення помилок React-компонентів |
| `not-found.tsx` | `src/app/not-found.tsx` | Кастомна сторінка 404 |
| `error.tsx` | `src/app/error.tsx` | Кастомна сторінка 500 (серверна помилка) |
| `global-error.tsx` | `src/app/global-error.tsx` | Глобальна обробка критичних помилок |

### Демонстрація роботи обробників помилок

- При переході на неіснуючу сторінку (наприклад `/xyz`) — відображається сторінка 404 з кнопкою "Повернутися на головну".
- При виникненні серверної помилки — відображається сторінка 500 з кнопкою "Спробувати знову" (викликає `reset()`).
- При збої в React-компоненті (наприклад, карта) — `ErrorBoundary` перехоплює помилку, логує її через `logError` та показує локальне повідомлення замість краху всієї сторінки.

### Ключові фрагменти коду

`ErrorBoundary` компонент:

```tsx
export default class ErrorBoundary extends Component<Props, State> {
  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    logError("React ErrorBoundary caught an error", error, {
      componentStack: info.componentStack ?? "",
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Щось пішло не так</h2>
          <p>{this.state.error?.message}</p>
          <button onClick={this.handleReset}>Спробувати знову</button>
        </div>
      );
    }
    return this.props.children;
  }
}
```

Кастомна сторінка 404 (`not-found.tsx`):

```tsx
export default function NotFound() {
  return (
    <div className="error-page">
      <div className="error-page-code">404</div>
      <h1 className="error-page-title">Сторінку не знайдено</h1>
      <p className="error-page-message">Сторінка, яку ви шукаєте, не існує або була переміщена.</p>
      <Link href="/" className="error-page-link">Повернутися на головну</Link>
    </div>
  );
}
```

Кастомна сторінка 500 (`error.tsx`):

```tsx
export default function Error({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    logError("Unhandled application error", error, { digest: error.digest });
  }, [error]);

  return (
    <div className="error-page">
      <div className="error-page-code">500</div>
      <h1 className="error-page-title">Внутрішня помилка сервера</h1>
      <button className="error-page-link" onClick={reset}>Спробувати знову</button>
    </div>
  );
}
```

Middleware для логування запитів (`middleware.ts`):

```ts
export function middleware(request: NextRequest) {
  const start = Date.now();
  const { method, nextUrl } = request;
  const url = nextUrl.pathname + (nextUrl.search || "");
  const userAgent = request.headers.get("user-agent") ?? "unknown";
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  const response = NextResponse.next();
  const durationMs = Date.now() - start;
  const status = response.status;
  const level = status >= 500 ? "error" : status >= 400 ? "warn" : "info";

  structuredLog({ level, message: `${method} ${url} → ${status}`,
    method, url, status, durationMs, userAgent, ip });

  return response;
}
```

---

## 6. Контрольні питання

**1. Які метрики веб-аналітики найважливіші для екологічного моніторингового додатку?**

Для екологічного моніторингу найважливіші:
- **Кількість переглядів сторінки конкретної станції** — показує, які станції найбільш цікавлять користувачів.
- **Час перебування на сторінці** — довший час свідчить про активне використання карти та графіків.
- **Взаємодія з картою** — кількість кліків на маркери, зум, переміщення — показує залученість.
- **Застосування фільтрів** — дозволяє зрозуміти, які критерії (тип, статус, місто) найпопулярніші.
- **Показник відмов (bounce rate)** — якщо користувачі одразу залишають сторінку, це сигнал про проблеми з UX або продуктивністю.
- **Завантаження даних/звітів** — демонструє практичне використання системи.

**2. Як structured logging полегшує аналіз проблем у продакшн-середовищі?**

Structured logging записує дані у форматі JSON замість звичайного тексту. Це дозволяє:
- **Автоматично парсити** логи системами збору (Elasticsearch, Datadog, CloudWatch) без написання regex-парсерів.
- **Фільтрувати за полями**: `level:error`, `url:/api/stations`, `durationMs:>1000` — миттєво знайти всі повільні або проблемні запити.
- **Корелювати події** за `timestamp` та `requestId`, щоб відстежити повний ланцюг дій для однієї помилки.
- **Будувати метрики та алерти** — наприклад: якщо `level:error` за хвилину > 10, надіслати сповіщення.
- **Зберігати контекст**: разом із повідомленням зберігається стек помилки, URL, IP, параметри запиту — не треба здогадуватися про причину.

**3. Яку роль виконує Middleware у процесі логування запитів?**

Next.js Middleware виконується **до обробки кожного запиту**, ще до рендерингу сторінки чи виконання API route. Це робить його ідеальним місцем для логування, оскільки:
- **Централізація**: замість додавання логування в кожен API route — один файл обробляє всі запити.
- **Повнота**: логується кожен HTTP-запит (метод, URL, IP, user-agent, час виконання, код відповіді).
- **Мінімальний вплив**: Middleware не блокує виконання — він додає логування та передає запит далі через `NextResponse.next()`.
- **Відсутність дублювання**: не потрібно пам'ятати додавати логування в кожному новому route.

**4. Чому важлива багаторівнева обробка помилок у веб-додатках?**

Різні типи помилок вимагають різних стратегій:
- **ErrorBoundary (React)**: перехоплює помилки рендерингу окремих компонентів (наприклад, карти), не руйнуючи решту інтерфейсу. Без нього одна помилка в компоненті призведе до "білого екрану".
- **error.tsx (Next.js route level)**: обробляє серверні помилки конкретного роуту, надає кнопку "Спробувати знову" (`reset()`).
- **global-error.tsx**: останній рубіж — перехоплює критичні помилки, що виникають у самому layout-компоненті.
- **API-рівень**: `try/catch` в кожному route повертає структуровану відповідь із кодом помилки замість 500 без пояснень.

Такий підхід гарантує: користувач завжди бачить зрозуміле повідомлення, розробник — детальний лог із контекстом, а решта системи продовжує працювати.

---

## 7. Висновки

У лабораторній роботі №3 реалізовано повноцінну систему аналітики, логування та обробки помилок:

- **Аналітика**: інтегровано Google Analytics 4 з автоматичним трекінгом переходів та 5 типами кастомних подій (перегляд станції, взаємодія з картою, перегляд графіків, застосування фільтрів, експорт даних).
- **Логування**: підключено бібліотеку pino з 4 рівнями логування (debug/info/warn/error), JSON-форматом та централізованим Middleware для логування всіх HTTP-запитів.
- **Обробка помилок**: реалізовано триступеневий захист — `ErrorBoundary` для компонентів, `error.tsx` для роутів, `global-error.tsx` для критичних збоїв, а також кастомні сторінки 404 та 500.

---

**Виконав:** Леочко Назар  
**Група:** ТР-32  
**Дата виконання:** Березень 2026

---

<a id="лабораторна-робота-4"></a>
## ЛАБОРАТОРНА РОБОТА №4

**Тема:** Оптимізація та деплой продакшн-застосунку

**Мета:** Навчитися проводити аудит продуктивності веб-додатку, застосовувати методи оптимізації та налаштовувати автоматизований деплой у продакшн-середовище.

---

## 1. Мета роботи

Провести аудит продуктивності додатку, застосувати методи оптимізації (code splitting, lazy loading, кешування), налаштувати CI/CD та виконати деплой на Vercel.

---

## 2. Теоретичні відомості

- Core Web Vitals та метрики продуктивності веб-додатків
- Методи оптимізації: code splitting, lazy loading, кешування
- Основи CI/CD та автоматизації деплою
- Платформи для хостингу Next.js додатків (Vercel)

---

## 3. Частина 1. Аудит продуктивності

### 3.1 Інструмент

Аудит проводився за допомогою **Lighthouse 13.0.2** у режимі інкогніто браузера Chromе для двох сторінок: головна (`/`) та сторінка станції (`/stations/[id]`).

### 3.2 Порівняльна таблиця показників Lighthouse

#### Головна сторінка (`/`)

До оптимізації
![alt text](<Screenshot 2026-04-21 at 11.38.43 PM.png>)

Після оптимізації
![alt text](<Screenshot 2026-04-22 at 12.11.39 AM.png>)

#### Сторінка станції (`/stations/[id]`)

До оптимізації
![alt text](<Screenshot 2026-04-21 at 11.41.50 PM.png>)

Після оптимізації
![alt text](<Screenshot 2026-04-22 at 12.15.08 AM.png>)

---

## 4. Частина 2. Оптимізація додатку

### 4.1 Динамічний імпорт для картографічної бібліотеки

Leaflet не підтримує SSR, оскільки звертається до `window` та `document`. Застосовано `next/dynamic` з `ssr: false`, що переносить завантаження бібліотеки на клієнт і виключає її з початкового бандлу:

```tsx
const StationMap = dynamic(() => import("@/components/StationMap"), {
  ssr: false,
  loading: () => <div className="map-loading"><p>Завантаження карти...</p></div>,
});
```

**Ефект:** усунення TBT, прискорення FCP — сторінка рендериться без очікування Leaflet.

### 4.2 Lazy loading для бібліотеки графіків

Recharts завантажується лише за потреби — динамічний імпорт компонента `Charts` з відображенням заглушки під час завантаження:

```tsx
const Charts = dynamic(() => import("@/components/Charts"), {
  loading: () => <div className="chart-loading"><p>Завантаження графіків...</p></div>,
});
```

**Ефект:** зменшення розміру початкового JS-бандлу, скорочення LCP та SI.

### 4.3 Оптимізація статичного кешування

У `next.config.ts` налаштовано HTTP-заголовки кешування для статичних ресурсів:

```ts
const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};
```

**Ефект:** повторні відвідування не перезавантажують статичні ресурси — FCP ≈ 0 на кешованих запитах.

### 4.4 Мінімізація bundle

Next.js 15 з Turbopack виконує tree-shaking та мінімізацію JS автоматично під час `npm run build`. Додатково перевірено відсутність невикористаних залежностей у `package.json`.

---

## 5. Частина 3. Налаштування CI/CD

### 5.1 Git-репозиторій

Проєкт завантажено на GitHub:  
**Репозиторій:** [https://github.com/NazarLeo/web-kpi](https://github.com/NazarLeo/web-kpi)

### 5.2 GitHub Actions workflow

Файл `.github/workflows/ci.yml` запускається автоматично при кожному `push` та `pull_request` до гілки `main`.

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    name: Type Check & Build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npx tsc --noEmit
      - run: npm run lint
      - run: npm run build
```

**Кроки перевірки:**
1. `npm ci` — встановлення залежностей
2. `npx tsc --noEmit` — перевірка TypeScript типів
3. `npm run lint` — статичний аналіз коду (ESLint)
4. `npm run build` — перевірка успішності production-збірки

---

## 6. Частина 4. Деплой на Vercel

### 6.1 Підключення репозиторію

1. Зареєстровано акаунт на [vercel.com](https://vercel.com)
2. Підключено GitHub репозиторій `NazarLeo/web-kpi`
3. Vercel автоматично виявив Next.js та налаштував параметри збірки:
   - **Framework:** Next.js
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`
   - **Install Command:** `npm ci`

### 6.2 Змінні оточення

У панелі Vercel (`Settings → Environment Variables`) налаштовано:

| Змінна | Середовище | Опис |
|---|---|---|
| `NEXT_PUBLIC_GA_ID` | Production, Preview | Google Analytics Measurement ID |
| `LOG_LEVEL` | Production | Рівень логування (`warn`) |
| `LOG_LEVEL` | Preview | Рівень логування (`info`) |
| `NODE_ENV` | Production | Автоматично встановлюється Vercel |

### 6.3 Автоматичні деплої

- **Production деплой** — автоматично при `push` у гілку `main`
- **Preview деплой** — автоматично для кожного Pull Request; генерується унікальний URL вигляду `eco-monitoring-git-branch-nazarleo.vercel.app`

### 6.4 Задеплоєний додаток

**URL:** [https://web-kpi-eight.vercel.app?_vercel_share=jkzO9FXn5qna42MNIoBSuymGlhzLSIp9](https://web-kpi-eight.vercel.app?_vercel_share=jkzO9FXn5qna42MNIoBSuymGlhzLSIp9)

---

## 7. Контрольні питання

**1. Які з Core Web Vitals метрик найкритичніші для додатків з візуалізацією даних і чому?**

Найкритичніші — **LCP** та **TBT**.
- **LCP** (Largest Contentful Paint) — у додатках із картами та графіками основний контент є важким (Leaflet, Recharts). Повільний LCP означає, що користувач довго бачить порожній екран замість даних. Мета — до 2.5 s.
- **TBT** (Total Blocking Time) — блокування головного потоку JavaScript унеможливлює взаємодію з картою та фільтрами. Будь-який час очікування в інтерактивному додатку критичний. Мета — 0 ms.
- **CLS** менш критичний, але важливий: якщо карта або графіки зсувають контент при завантаженні — це погано для UX.

**2. Як динамічний імпорт впливає на час початкового завантаження сторінки?**

Динамічний імпорт (`next/dynamic`) розбиває JavaScript-бандл на частини (code splitting). При початковому завантаженні браузер отримує лише той код, який потрібен для першого рендеру. Важкі бібліотеки (Leaflet ~42 КБ, Recharts ~180 КБ) завантажуються асинхронно, після того як сторінка вже відображена. Це безпосередньо скорочує FCP, LCP та усуває TBT, оскільки головний потік не заблокований парсингом великих JS-файлів.

**3. Які переваги надає автоматизований деплой через CI/CD порівняно з ручним?**

- **Швидкість**: push у `main` → автоматична перевірка → деплой без участі розробника.
- **Надійність**: кожна зміна перевіряється TypeScript, ESLint та збіркою до того, як потрапить у продакшн.
- **Відтворюваність**: однакове середовище (`ubuntu-latest`, Node.js 20, `npm ci`) виключає помилки "на моїй машині все працює".
- **Preview-деплої**: кожен PR отримує власний URL — замовник або тімлід може перевірити зміни до злиття в `main`.
- **Аудит**: повна історія всіх деплоїв із логами та статусами зберігається автоматично.

**4. Як правильно організувати змінні оточення для різних середовищ розробки?**

- **Development** (`.env.local`): налагоджувальні значення, локальний GA ID або порожній рядок, `LOG_LEVEL=debug`.
- **Preview** (Vercel): тестові API-ключі, `LOG_LEVEL=info`. Не використовувати продакшн-ключі.
- **Production** (Vercel): реальні ключі GA, `LOG_LEVEL=warn` — мінімальний шум у логах.
- Файл `.env.local` — ніколи не додавати в git (є в `.gitignore`).
- Публічні змінні (доступні в браузері) — лише з префіксом `NEXT_PUBLIC_`.

**5. Які стратегії кешування найефективніші для екологічних даних?**

- **Статичні ресурси** (`/_next/static/`): `Cache-Control: public, max-age=31536000, immutable` — кешуються на рік, Next.js автоматично генерує нові хеші при змінах.
- **API-дані станцій**: короткий TTL (5–15 хвилин) — дані змінюються рідко, але актуальність важлива. Використовувати `Cache-Control: public, max-age=300, stale-while-revalidate=60`.
- **Сторінки** (`/stations/[id]`): ISR (Incremental Static Regeneration) з `revalidate: 600` — сторінки статично генеруються і оновлюються кожні 10 хвилин.
- **Історичні дані** (`/api/stations/[id]/historical`): можна кешувати довше (1–24 год), оскільки минулі вимірювання не змінюються.

---

## 8. Висновки

У лабораторній роботі №4 виконано повний цикл оптимізації та деплою:

- **Аудит**: проведено Lighthouse-аудит головної сторінки (Performance 97) та сторінки станції (Performance 99). Виявлено основні проблеми: великий JS-бандл, відсутність lazy loading для важких бібліотек.
- **Оптимізація**: застосовано динамічний імпорт для Leaflet та Recharts, налаштовано кешування статичних ресурсів. TBT знижено з 240 ms до 0 ms, LCP — з 3.1 s до 1.3 s на головній сторінці.
- **CI/CD**: налаштовано GitHub Actions з автоматичною перевіркою TypeScript, ESLint та збіркою при кожному push у `main`.
- **Деплой**: проєкт задеплоєно на Vercel з автоматичним production-деплоєм при push у `main` та preview-деплоями для Pull Requests. Налаштовано змінні оточення для production та preview середовищ.

---

**Виконав:** Леочко Назар  
**Група:** ТР-32  
**Дата виконання:** Квітень 2026
