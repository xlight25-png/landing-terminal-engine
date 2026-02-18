// app/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import type { ReactNode } from "react";
import LeadCtaButtons from "@/components/LeadCtaButtons";

export const metadata: Metadata = {
  title: "Терминал — капремонт двигателя в Челябинске с онлайн-контролем",
  description:
    "Капитальный ремонт двигателя с прозрачными этапами в приложении: дефектовка, фото/видео, запчасти, сроки. Гарантия 6 месяцев или 10 000 км. Челябинск, Запорожская 8. +79049724641",
};

const PHONE_RAW = "+79049724641";
const PHONE_PRETTY = "+7 (904) 972-46-41";
const ADDRESS = "Челябинск, Запорожская 8";

const MAPS_HREF =
  "https://yandex.ru/maps/?text=" + encodeURIComponent("Челябинск Запорожская 8");

// === Пути к картинкам (поменяй здесь, если названия другие) ===
const IMG = {
  hero: "/images/hero.webp",
  workshop1: "/images/workshop-1.webp",
  workshop2: "/images/workshop-2.webp",
  app1: "/images/app-1.webp",
  app2: "/images/app-2.webp",
  app3: "/images/app-3.webp",
};

function Section({
  id,
  title,
  subtitle,
  children,
}: {
  id?: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="py-14 sm:py-16">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        {(title || subtitle) && (
          <div className="mb-8 sm:mb-10">
            {title && (
              <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-3 max-w-2xl text-pretty text-sm text-zinc-600 sm:text-base">
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-700 shadow-sm">
      {children}
    </span>
  );
}

function Card({
  title,
  text,
  icon,
}: {
  title: string;
  text: string;
  icon?: string;
}) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-zinc-900 text-white">
          <span className="text-sm">{icon ?? "✓"}</span>
        </div>
        <div>
          <h3 className="text-sm font-semibold sm:text-base">{title}</h3>
          <p className="mt-1 text-sm text-zinc-600">{text}</p>
        </div>
      </div>
    </div>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  return (
    <details className="group rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
      <summary className="cursor-pointer list-none select-none">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-sm font-semibold sm:text-base">{q}</h3>
          <span className="rounded-xl border border-zinc-200 bg-zinc-50 px-2 py-1 text-xs text-zinc-700 group-open:hidden">
            +
          </span>
          <span className="hidden rounded-xl border border-zinc-200 bg-zinc-50 px-2 py-1 text-xs text-zinc-700 group-open:inline">
            –
          </span>
        </div>
      </summary>
      <p className="mt-3 text-sm text-zinc-600">{a}</p>
    </details>
  );
}

function ImgFill({
  src,
  alt,
  priority,
  sizes,
  className,
}: {
  src: string;
  alt: string;
  priority?: boolean;
  sizes: string;
  className?: string;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={className ?? "object-cover"}
    />
  );
}

export default function Page() {
  return (
   <main className="min-h-screen bg-zinc-50 text-zinc-900 pb-24 sm:pb-0">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-900 text-white">
              <span className="text-sm font-semibold">T</span>
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold">Терминал</div>
              <div className="text-xs text-zinc-600">
                Капремонт двигателя • Челябинск
              </div>
            </div>
          </div>

          <nav className="hidden items-center gap-5 text-sm text-zinc-700 sm:flex">
            <a className="hover:text-zinc-900" href="#app">
              Приложение
            </a>
            <a className="hover:text-zinc-900" href="#steps">
              Этапы
            </a>
            <a className="hover:text-zinc-900" href="#price">
              Стоимость
            </a>
            <a className="hover:text-zinc-900" href="#faq">
              FAQ
            </a>
            <a
              className="rounded-xl bg-zinc-900 px-4 py-2 text-white hover:bg-zinc-800"
              href={`tel:${PHONE_RAW}`}
            >
              Позвонить
            </a>
          </nav>

          <a
            className="sm:hidden rounded-xl bg-zinc-900 px-4 py-2 text-sm text-white hover:bg-zinc-800"
            href={`tel:${PHONE_RAW}`}
          >
            Позвонить
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(24,24,27,0.08),transparent_55%)]" />
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <div className="flex flex-wrap gap-2">
                <Badge>Гарантия: 6 месяцев или 10 000 км</Badge>
                <Badge>Фото/видео дефектовки</Badge>
                <Badge>Этапы работ в приложении</Badge>
              </div>

              <h1 className="mt-5 text-balance text-3xl font-semibold tracking-tight sm:text-5xl">
                Капремонт двигателя с онлайн-контролем этапов
              </h1>
              <p className="mt-4 max-w-xl text-pretty text-sm text-zinc-600 sm:text-base">
                Вы видите весь процесс ремонта в приложении: статусы, медиа по
                дефектам, список запчастей и сроки. Прозрачно — как заказ пиццы,
                только про двигатель.
              </p>

             <LeadCtaButtons
  phoneRaw={PHONE_RAW}
  phonePretty={PHONE_PRETTY}
  address={ADDRESS}
  mapsHref={MAPS_HREF}
/>


              <div className="mt-6 grid gap-3 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm sm:grid-cols-2">
                <div>
                  <div className="text-xs text-zinc-600">Телефон</div>
                  <a
                    className="text-sm font-semibold hover:underline"
                    href={`tel:${PHONE_RAW}`}
                  >
                    {PHONE_PRETTY}
                  </a>
                </div>
                <div>
                  <div className="text-xs text-zinc-600">Адрес</div>
                  <a
                    className="text-sm font-semibold hover:underline"
                    href={MAPS_HREF}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {ADDRESS}
                  </a>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-3xl border border-zinc-200 bg-white p-3 shadow-sm">
                <div className="overflow-hidden rounded-2xl">
                  <div className="relative h-[320px] w-full sm:h-[420px]">
                    <ImgFill
                      src={IMG.hero}
                      alt="Терминал — ремонт двигателя"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                    <div className="text-xs text-zinc-600">Ключевая фишка</div>
                    <div className="mt-1 text-sm font-semibold">
                      Прозрачность: этапы + медиа + запчасти
                    </div>
                  </div>
                  <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                    <div className="text-xs text-zinc-600">Гарантия</div>
                    <div className="mt-1 text-sm font-semibold">
                      6 месяцев или 10 000 км
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <Badge>Ясная смета после дефектовки</Badge>
                <Badge>Согласование работ</Badge>
                <Badge>Сроки по запчастям</Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why */}
      <Section
        title="Почему так спокойнее"
        subtitle="Капремонт — это всегда про доверие. Мы снимаем нерв за счёт прозрачности и фиксированных правил."
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card
            icon="📷"
            title="Фото и видео дефектовки"
            text="Показываем, что именно сломано и почему это нужно менять."
          />
          <Card
            icon="📲"
            title="Этапы работ в приложении"
            text="Статусы в реальном времени: что сделано, что делаем дальше."
          />
          <Card
            icon="🧾"
            title="Запчасти и сроки"
            text="Список запчастей, что заказано и когда ожидается."
          />
          <Card
            icon="🧠"
            title="Согласование до работ"
            text="Никаких “сюрпризов” — все ключевые решения согласуются."
          />
          <Card
            icon="🛡️"
            title="Гарантия"
            text="6 месяцев или 10 000 км — по понятным условиям."
          />
          <Card
            icon="🧰"
            title="Узкая специализация"
            text="Фокус на сложных работах по двигателям, а не “всё подряд”."
          />
        </div>
      </Section>

      {/* App */}
      <Section
        id="app"
        title="Как выглядит приложение"
        subtitle="Лучше реальные скрины (даже 2–3 штуки сильно поднимают доверие)."
      >
        <div className="grid gap-4 lg:grid-cols-3">
          {[
            {
              src: IMG.app1,
              title: "Этапы ремонта",
              desc: "Понятный статус, что сейчас происходит.",
            },
            {
              src: IMG.app2,
              title: "Медиа по дефектам",
              desc: "Фото/видео и комментарии мастера.",
            },
            {
              src: IMG.app3,
              title: "Запчасти и сроки",
              desc: "Что заказано и когда будет.",
            },
          ].map((x) => (
            <div
              key={x.src}
              className="rounded-3xl border border-zinc-200 bg-white p-3 shadow-sm"
            >
              <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50">
                <div className="relative h-[260px] w-full sm:h-[320px]">
                  <ImgFill
                    src={x.src}
                    alt={x.title}
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="p-4">
                <div className="text-sm font-semibold">{x.title}</div>
                <div className="mt-1 text-sm text-zinc-600">{x.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Steps */}
      <Section
        id="steps"
        title="Этапы работы"
        subtitle="Понятный процесс, чтобы вы заранее понимали, что и когда происходит."
      >
        <div className="grid gap-4 lg:grid-cols-2">
          {[
            {
              n: "01",
              t: "Приём и первичная диагностика",
              d: "Фиксируем симптомы, историю, согласуем план дефектовки.",
            },
            {
              n: "02",
              t: "Дефектовка",
              d: "Разбор и осмотр. Фото/видео проблемных мест в приложении.",
            },
            {
              n: "03",
              t: "Смета и согласование",
              d: "Обсуждаем варианты: минимум/оптимум/максимум по ремонту.",
            },
            {
              n: "04",
              t: "Запчасти и сроки",
              d: "Формируем список запчастей, показываем статусы поставки.",
            },
            {
              n: "05",
              t: "Ремонт и сборка",
              d: "Пошагово выполняем работы, обновляем статусы и медиа.",
            },
            {
              n: "06",
              t: "Выдача и гарантия",
              d: "Финальный контроль, рекомендации по обкатке, гарантия 6 мес / 10 000 км.",
            },
          ].map((s) => (
            <div
              key={s.n}
              className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-zinc-900 px-3 py-2 text-xs font-semibold text-white">
                  {s.n}
                </div>
                <div>
                  <div className="text-sm font-semibold sm:text-base">{s.t}</div>
                  <div className="mt-1 text-sm text-zinc-600">{s.d}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Cases */}
      <Section
        title="Примеры кейсов"
        subtitle="Позже заменим заглушки на реальные: марка/двигатель, симптомы, что нашли, что сделали, итог."
      >
        <div className="grid gap-4 lg:grid-cols-3">
          {[
            {
              t: "Кейс 1 — стук/масложор",
              d: "Симптомы → дефектовка → список работ → что увидел клиент в приложении.",
            },
            {
              t: "Кейс 2 — перегрев",
              d: "Симптомы → дефектовка → причины → какие запчасти → сроки.",
            },
            {
              t: "Кейс 3 — падение компрессии",
              d: "Симптомы → замеры → дефектовка → ремонт → гарантия.",
            },
          ].map((c) => (
            <div
              key={c.t}
              className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm"
            >
              <div className="text-sm font-semibold">{c.t}</div>
              <p className="mt-2 text-sm text-zinc-600">{c.d}</p>

              <div className="mt-4 overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50">
                <div className="relative h-40 w-full">
                  <ImgFill
                    src={IMG.workshop2}
                    alt="Фото из сервиса"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Price */}
      <Section
        id="price"
        title="Стоимость"
        subtitle="Точную цену честно можно назвать только после дефектовки. Но мы заранее объясняем, что влияет на смету."
      >
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="text-xs text-zinc-600">Подход</div>
            <div className="mt-2 text-lg font-semibold">
              Сначала дефектовка → потом фиксируем смету
            </div>
            <p className="mt-3 text-sm text-zinc-600">
              После осмотра показываем медиа, список работ и запчастей. Любые изменения согласуются.
            </p>

            <div className="mt-5 rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm font-semibold">Гарантия</div>
              <div className="mt-1 text-sm text-zinc-700">
                6 месяцев или 10 000 км пробега
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                className="inline-flex items-center justify-center rounded-2xl bg-zinc-900 px-5 py-3 text-sm font-semibold text-white hover:bg-zinc-800"
                href={`tel:${PHONE_RAW}`}
              >
                Уточнить цену по симптомам
              </a>
              <a
                className="inline-flex items-center justify-center rounded-2xl border border-zinc-200 bg-white px-5 py-3 text-sm font-semibold text-zinc-900 hover:bg-zinc-50"
                href="#faq"
              >
                Частые вопросы
              </a>
            </div>
          </div>

          <div className="grid gap-4">
            <Card
              icon="⚙️"
              title="Что влияет на цену"
              text="Объём повреждений, необходимость расточки/шлифовки, состояние ГБЦ, навесное, расходники."
            />
            <Card
              icon="🧩"
              title="Запчасти"
              text="Оригинал/аналог, сроки поставки, возможность выбора вариантов под бюджет."
            />
            <Card
              icon="🕒"
              title="Сроки"
              text="Зависят от объёма работ и наличия деталей. В приложении видно прогресс и ожидания."
            />
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faq" title="FAQ" subtitle="Коротко и по делу — чтобы не было неопределённости.">
        <div className="grid gap-4 lg:grid-cols-2">
          <FAQItem
            q="Какая гарантия на капремонт?"
            a="Гарантия 6 месяцев или 10 000 км пробега. Условия прозрачные, обсуждаем при оформлении."
          />
          <FAQItem
            q="Можно ли без “сюрпризов” по цене?"
            a="Да. Мы фиксируем смету после дефектовки. Если вскрывается дополнительный дефект — показываем медиа и согласуем решение до работ."
          />
          <FAQItem
            q="Я буду видеть фото/видео дефектовки?"
            a="Да. В приложении публикуем фото/видео и комментарии по критичным моментам."
          />
          <FAQItem
            q="Как я узнаю, что с запчастями?"
            a="В приложении будет список запчастей и статусы: что заказано и когда ожидается."
          />
          <FAQItem
            q="Сколько длится ремонт?"
            a="Зависит от объёма работ и наличия запчастей. После дефектовки дадим прогноз, а в приложении видно прогресс."
          />
          <FAQItem
            q="Можно ли приехать и обсудить на месте?"
            a="Да. Приезжайте: Челябинск, Запорожская 8. Лучше предварительно позвонить и записаться."
          />
        </div>
      </Section>

      {/* Contacts */}
      <section className="border-t border-zinc-200 bg-white py-14">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Контакты
              </h2>
              <p className="mt-3 max-w-xl text-sm text-zinc-600 sm:text-base">
                Запишем на диагностику, ответим по симптомам и объясним процесс. Чем
                точнее описываете проблему — тем быстрее сориентируем.
              </p>

              <div className="mt-6 grid gap-3 rounded-3xl border border-zinc-200 bg-zinc-50 p-6">
                <div>
                  <div className="text-xs text-zinc-600">Телефон</div>
                  <a
                    className="text-base font-semibold hover:underline"
                    href={`tel:${PHONE_RAW}`}
                  >
                    {PHONE_PRETTY}
                  </a>
                </div>
                <div>
                  <div className="text-xs text-zinc-600">Адрес</div>
                  <a
                    className="text-base font-semibold hover:underline"
                    href={MAPS_HREF}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {ADDRESS}
                  </a>
                </div>
                <div className="pt-2">
                  <a
                    className="inline-flex w-full items-center justify-center rounded-2xl bg-zinc-900 px-5 py-3 text-sm font-semibold text-white hover:bg-zinc-800 sm:w-auto"
                    href={`tel:${PHONE_RAW}`}
                  >
                    Позвонить и записаться
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-zinc-200 bg-white p-3 shadow-sm">
              <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50">
                <iframe
                  title="Карта"
                  src={
                    "https://yandex.ru/map-widget/v1/?text=" +
                    encodeURIComponent("Челябинск Запорожская 8")
                  }
                  className="h-[360px] w-full"
                  loading="lazy"
                />
              </div>
              <p className="mt-3 text-xs text-zinc-500">
                Если виджет не загрузится — откройте карту по ссылке в адресе выше.
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-zinc-200 pt-6 text-xs text-zinc-500 sm:flex-row sm:items-center">
            <div>© {new Date().getFullYear()} Терминал • Капремонт двигателя</div>
            <div className="flex flex-wrap gap-3">
              <a className="hover:text-zinc-700" href="#app">
                Приложение
              </a>
              <a className="hover:text-zinc-700" href="#steps">
                Этапы
              </a>
              <a className="hover:text-zinc-700" href="#price">
                Стоимость
              </a>
              <a className="hover:text-zinc-700" href="#faq">
                FAQ
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
