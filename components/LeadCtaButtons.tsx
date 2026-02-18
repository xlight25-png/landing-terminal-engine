"use client";

import { useMemo, useState } from "react";

type Props = {
  phoneRaw: string;
  phonePretty: string;
  address: string;
  mapsHref: string;
};

function getUtm(search: string) {
  const p = new URLSearchParams(search);
  const keys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
  const out: Record<string, string> = {};
  for (const k of keys) {
    const v = p.get(k);
    if (v) out[k] = v;
  }
  return out;
}

export default function LeadCtaButtons({ phoneRaw, phonePretty, address, mapsHref }: Props) {
  const [open, setOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState<null | "ok" | "err">(null);
  const [errorText, setErrorText] = useState<string>("");

  const utm = useMemo(() => {
    if (typeof window === "undefined") return {};
    return getUtm(window.location.search);
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    setDone(null);
    setErrorText("");

    const form = e.currentTarget;
    const fd = new FormData(form);

    const payload = {
      name: String(fd.get("name") ?? "").trim(),
      phone: String(fd.get("phone") ?? "").trim(),
      car: String(fd.get("car") ?? "").trim(),
      problem: String(fd.get("problem") ?? "").trim(),
      preferredTime: String(fd.get("preferredTime") ?? "").trim(),
      // антиспам (должно быть пусто)
      company: String(fd.get("company") ?? "").trim(),
      utm,
      pageUrl: typeof window !== "undefined" ? window.location.href : "",
    };

    if (!payload.phone || payload.phone.length < 8) {
      setSending(false);
      setDone("err");
      setErrorText("Укажи телефон (минимум 8 символов).");
      return;
    }

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setDone("err");
        setErrorText(data?.error || "Не удалось отправить. Попробуй позвонить.");
      } else {
        setDone("ok");
        form.reset();
      }
    } catch {
      setDone("err");
      setErrorText("Сеть/сервер не ответили. Попробуй позвонить.");
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      {/* HERO CTA (как было) */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center justify-center rounded-2xl bg-zinc-900 px-5 py-3 text-sm font-semibold text-white hover:bg-zinc-800"
        >
          Оставить заявку
        </button>

        <a
          href={`tel:${phoneRaw}`}
          className="inline-flex items-center justify-center rounded-2xl border border-zinc-200 bg-white px-5 py-3 text-sm font-semibold text-zinc-900 hover:bg-zinc-50"
        >
          Позвонить: {phonePretty}
        </a>
      </div>

      {/* STICKY BAR (только мобилка) */}
      <div className="fixed inset-x-0 bottom-0 z-[90] sm:hidden">
        <div className="mx-auto max-w-6xl px-4 pb-[calc(env(safe-area-inset-bottom)+12px)]">
          <div className="rounded-2xl border border-zinc-200 bg-white/95 p-2 shadow-lg backdrop-blur">
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setOpen(true)}
                className="inline-flex items-center justify-center rounded-xl bg-zinc-900 px-3 py-3 text-sm font-semibold text-white active:scale-[0.99]"
              >
                Заявка
              </button>
              <a
                href={`tel:${phoneRaw}`}
                className="inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-white px-3 py-3 text-sm font-semibold text-zinc-900 active:scale-[0.99]"
              >
                Позвонить
              </a>
              <a
                href={mapsHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-white px-3 py-3 text-sm font-semibold text-zinc-900 active:scale-[0.99]"
              >
                Маршрут
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 z-[100]">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="w-full max-w-lg rounded-3xl border border-zinc-200 bg-white p-5 shadow-xl">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-lg font-semibold">Заявка на диагностику</div>
                  <div className="mt-1 text-sm text-zinc-600">
                    {address}. Ответим и сориентируем по симптомам.
                  </div>
                </div>
                <button
                  className="rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm hover:bg-zinc-100"
                  onClick={() => setOpen(false)}
                >
                  ✕
                </button>
              </div>

              {done === "ok" ? (
                <div className="mt-5 rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                  <div className="text-sm font-semibold">Заявка отправлена ✅</div>
                  <div className="mt-1 text-sm text-zinc-600">
                    Если нужно срочно — лучше сразу позвонить.
                  </div>
                  <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                    <a
                      href={`tel:${phoneRaw}`}
                      className="inline-flex items-center justify-center rounded-2xl bg-zinc-900 px-5 py-3 text-sm font-semibold text-white hover:bg-zinc-800"
                    >
                      Позвонить
                    </a>
                    <button
                      onClick={() => setOpen(false)}
                      className="inline-flex items-center justify-center rounded-2xl border border-zinc-200 bg-white px-5 py-3 text-sm font-semibold text-zinc-900 hover:bg-zinc-50"
                    >
                      Закрыть
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="mt-5 grid gap-3">
                  {/* honeypot */}
                  <input name="company" className="hidden" tabIndex={-1} autoComplete="off" />

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className="text-xs text-zinc-600">Имя</label>
                      <input
                        name="name"
                        className="mt-1 w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none focus:border-zinc-400"
                        placeholder="Как к вам обращаться"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-zinc-600">Телефон *</label>
                      <input
                        name="phone"
                        required
                        inputMode="tel"
                        className="mt-1 w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none focus:border-zinc-400"
                        placeholder="+7 ___ ___-__-__"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-zinc-600">Авто (по желанию)</label>
                    <input
                      name="car"
                      className="mt-1 w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none focus:border-zinc-400"
                      placeholder="Например: Kia Rio 1.6, 2016"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-zinc-600">Симптомы *</label>
                    <textarea
                      name="problem"
                      required
                      className="mt-1 min-h-[110px] w-full resize-none rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none focus:border-zinc-400"
                      placeholder="Например: стук на холодную, жрёт масло, перегрев, дымит…"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-zinc-600">Когда удобно (по желанию)</label>
                    <input
                      name="preferredTime"
                      className="mt-1 w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none focus:border-zinc-400"
                      placeholder="Сегодня после 18:00 / завтра утром и т.д."
                    />
                  </div>

                  {done === "err" && (
                    <div className="rounded-2xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                      {errorText || "Ошибка отправки."}
                    </div>
                  )}

                  <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                    <button
                      disabled={sending}
                      className="inline-flex items-center justify-center rounded-2xl bg-zinc-900 px-5 py-3 text-sm font-semibold text-white hover:bg-zinc-800 disabled:opacity-60"
                      type="submit"
                    >
                      {sending ? "Отправляем…" : "Отправить заявку"}
                    </button>
                    <a
                      href={`tel:${phoneRaw}`}
                      className="inline-flex items-center justify-center rounded-2xl border border-zinc-200 bg-white px-5 py-3 text-sm font-semibold text-zinc-900 hover:bg-zinc-50"
                    >
                      Лучше позвонить
                    </a>
                  </div>

                  <div className="text-xs text-zinc-500">
                    Нажимая “Отправить”, вы соглашаетесь на обработку обращения для связи.
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
