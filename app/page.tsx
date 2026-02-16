export default function Home() {
  return (
    <main>
      <section style={{ padding: 32 }}>
        <h1 style={{ fontSize: 40, fontWeight: 700 }}>
          Капитальный ремонт двигателя в Челябинске
        </h1>
        <p style={{ marginTop: 12, fontSize: 18 }}>
          Прозрачно как «заказ пиццы»: этапы работ, фото/видео дефектовки, запчасти и сроки — в приложении.
        </p>

        <div style={{ marginTop: 16, display: "flex", gap: 12 }}>
          <a href="#lead" style={{ padding: "10px 14px", border: "1px solid #000" }}>
            Узнать стоимость
          </a>
          <a href="tel:+79000000000" style={{ padding: "10px 14px", border: "1px solid #000" }}>
            Позвонить
          </a>
        </div>
      </section>

      <section style={{ padding: 32, background: "#f6f6f6" }}>
        <h2 style={{ fontSize: 28, fontWeight: 700 }}>Почему нам доверяют</h2>
        <ul style={{ marginTop: 12, lineHeight: 1.7 }}>
          <li>Фото/видео дефектовки по факту</li>
          <li>Согласование сметы до работ</li>
          <li>Статусы и сроки в реальном времени</li>
        </ul>
      </section>

      <section id="lead" style={{ padding: 32 }}>
        <h2 style={{ fontSize: 28, fontWeight: 700 }}>Оставить заявку</h2>
        <p style={{ marginTop: 8 }}>Перезвоним и сориентируем по цене/срокам.</p>

        <form style={{ marginTop: 12, display: "grid", gap: 10, maxWidth: 360 }}>
          <input placeholder="Имя" style={{ padding: 10, border: "1px solid #ccc" }} />
          <input placeholder="Телефон" style={{ padding: 10, border: "1px solid #ccc" }} />
          <input placeholder="Авто (марка/модель/двигатель)" style={{ padding: 10, border: "1px solid #ccc" }} />
          <button type="button" style={{ padding: 10, border: "1px solid #000" }}>
            Отправить
          </button>
        </form>
      </section>

      <footer style={{ padding: 32, background: "#111", color: "#fff" }}>
        <div>Челябинск • Капремонт двигателей</div>
      </footer>
    </main>
  );
}
