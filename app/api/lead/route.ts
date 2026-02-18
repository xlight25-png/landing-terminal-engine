import { NextResponse } from "next/server";

type LeadPayload = {
  name?: string;
  phone?: string;
  car?: string;
  problem?: string;
  preferredTime?: string;
  company?: string; // honeypot (должно быть пусто)
  utm?: Record<string, string>;
  pageUrl?: string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as LeadPayload;

    // антиспам: если поле заполнено — молча “успех”
    if (body.company && body.company.length > 0) {
      return NextResponse.json({ ok: true });
    }

    const token = process.env.TG_BOT_TOKEN;
    const chatId = process.env.TG_CHAT_ID;

    if (!token || !chatId) {
      return NextResponse.json(
        { error: "Не настроены TG_BOT_TOKEN / TG_CHAT_ID" },
        { status: 500 }
      );
    }

    const name = (body.name || "").trim();
    const phone = (body.phone || "").trim();
    const car = (body.car || "").trim();
    const problem = (body.problem || "").trim();
    const preferredTime = (body.preferredTime || "").trim();
    const pageUrl = (body.pageUrl || "").trim();
    const utm = body.utm || {};

    if (!phone || phone.length < 8 || !problem) {
      return NextResponse.json(
        { error: "Телефон и симптомы обязательны." },
        { status: 400 }
      );
    }

    const utmText = Object.keys(utm).length
      ? Object.entries(utm)
          .map(([k, v]) => `${k}: ${v}`)
          .join("\n")
      : "—";

    const text =
      `🛠️ Новая заявка (лендинг)\n\n` +
      `Имя: ${name || "—"}\n` +
      `Телефон: ${phone}\n` +
      `Авто: ${car || "—"}\n` +
      `Симптомы: ${problem}\n` +
      `Когда удобно: ${preferredTime || "—"}\n\n` +
      `UTM:\n${utmText}\n\n` +
      `Страница: ${pageUrl || "—"}`;

    const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        disable_web_page_preview: true,
      }),
    });

    if (!tgRes.ok) {
      const t = await tgRes.text().catch(() => "");
      return NextResponse.json(
        { error: "Telegram API error", details: t.slice(0, 300) },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}
