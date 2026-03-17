import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const NAIL_IMG = "https://cdn.poehali.dev/projects/8518642b-db48-4903-91e1-30e4d960eaff/files/9c44ab41-811c-40df-a704-71e67959154e.jpg";

const slides = [
  { id: 0, label: "Титул" },
  { id: 1, label: "Концепция" },
  { id: 2, label: "Рынок" },
  { id: 3, label: "Услуги" },
  { id: 4, label: "Финансы" },
  { id: 5, label: "Контакты" },
];

const services = [
  { name: "Классический маникюр", price: "от 800 ₽", time: "45 мин", tag: "Базовый" },
  { name: "Аппаратный маникюр", price: "от 1 200 ₽", time: "60 мин", tag: "Популярный" },
  { name: "Покрытие гель-лак", price: "от 1 500 ₽", time: "75 мин", tag: "Хит" },
  { name: "Наращивание гелем", price: "от 3 500 ₽", time: "120 мин", tag: "Премиум" },
  { name: "Nail-art дизайн", price: "от 500 ₽", time: "30 мин", tag: "Доп." },
  { name: "СПА-уход для рук", price: "от 1 800 ₽", time: "90 мин", tag: "Люкс" },
];

const pricing = [
  { segment: "Эконом", range: "600–1 200 ₽", desc: "Базовые процедуры без покрытия", share: 20 },
  { segment: "Средний", range: "1 200–2 500 ₽", desc: "Покрытие + дизайн, основной поток", share: 55 },
  { segment: "Премиум", range: "2 500–6 000 ₽", desc: "Наращивание, арт, СПА-комплексы", share: 25 },
];

const financials = [
  { month: "Янв", rev: 180, cost: 140 },
  { month: "Фев", rev: 220, cost: 150 },
  { month: "Мар", rev: 280, cost: 160 },
  { month: "Апр", rev: 320, cost: 170 },
  { month: "Май", rev: 380, cost: 175 },
  { month: "Июн", rev: 420, cost: 180 },
];

const maxRev = Math.max(...financials.map((f) => f.rev));

export default function Index() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [visible, setVisible] = useState(true);

  const goTo = (idx: number) => {
    if (animating || idx === current) return;
    setAnimating(true);
    setVisible(false);
    setTimeout(() => {
      setCurrent(idx);
      setVisible(true);
      setAnimating(false);
    }, 350);
  };

  const next = () => goTo(Math.min(current + 1, slides.length - 1));
  const prev = () => goTo(Math.max(current - 1, 0));

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [current]);

  return (
    <div className="presentation-root">
      {/* Navigation */}
      <nav className="pres-nav">
        {slides.map((s) => (
          <button
            key={s.id}
            className={`pres-nav-dot ${current === s.id ? "active" : ""}`}
            onClick={() => goTo(s.id)}
            title={s.label}
          >
            <span className="dot-label">{s.label}</span>
          </button>
        ))}
      </nav>

      {/* Slide Area */}
      <main className={`pres-slide ${visible ? "slide-visible" : "slide-hidden"}`}>
        {current === 0 && <Slide0 />}
        {current === 1 && <Slide1 />}
        {current === 2 && <Slide2 />}
        {current === 3 && <Slide3 />}
        {current === 4 && <Slide4 />}
        {current === 5 && <Slide5 />}
      </main>

      {/* Arrows */}
      <div className="pres-arrows">
        <button className="arrow-btn" onClick={prev} disabled={current === 0}>
          <Icon name="ChevronLeft" size={22} />
        </button>
        <span className="slide-counter">{current + 1} / {slides.length}</span>
        <button className="arrow-btn" onClick={next} disabled={current === slides.length - 1}>
          <Icon name="ChevronRight" size={22} />
        </button>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Montserrat:wght@300;400;500;600;700;800;900&display=swap');

        :root {
          --bg: #0a0a0f;
          --surface: #12121a;
          --card: #1a1a26;
          --border: rgba(255,255,255,0.07);
          --pink: #ff3d8a;
          --pink-light: #ff85b8;
          --gold: #f5c842;
          --gold-light: #fde68a;
          --lilac: #c084fc;
          --text: #f0f0f8;
          --muted: rgba(240,240,248,0.5);
          --radius: 16px;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .presentation-root {
          min-height: 100vh;
          background: var(--bg);
          font-family: 'Montserrat', sans-serif;
          color: var(--text);
          display: flex;
          flex-direction: column;
          position: relative;
          overflow-x: hidden;
        }

        /* Ambient bg blobs */
        .presentation-root::before {
          content: '';
          position: fixed;
          top: -200px; left: -200px;
          width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(255,61,138,0.12) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }
        .presentation-root::after {
          content: '';
          position: fixed;
          bottom: -150px; right: -150px;
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(192,132,252,0.1) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        .pres-nav {
          position: fixed;
          top: 24px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 8px;
          background: rgba(255,255,255,0.04);
          backdrop-filter: blur(12px);
          border: 1px solid var(--border);
          border-radius: 50px;
          padding: 6px 12px;
          z-index: 100;
        }

        .pres-nav-dot {
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px 10px;
          border-radius: 50px;
          color: var(--muted);
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.5px;
          transition: all 0.2s;
        }
        .pres-nav-dot:hover { color: var(--text); background: rgba(255,255,255,0.06); }
        .pres-nav-dot.active { background: var(--pink); color: #fff; }
        .dot-label { pointer-events: none; }

        .pres-slide {
          flex: 1;
          padding: 100px 48px 100px;
          position: relative;
          z-index: 1;
          transition: opacity 0.35s ease, transform 0.35s ease;
        }
        .slide-visible { opacity: 1; transform: translateY(0); }
        .slide-hidden { opacity: 0; transform: translateY(16px); }

        .pres-arrows {
          position: fixed;
          bottom: 28px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          gap: 16px;
          z-index: 100;
        }

        .arrow-btn {
          background: rgba(255,255,255,0.06);
          border: 1px solid var(--border);
          color: var(--text);
          width: 44px; height: 44px;
          border-radius: 50%;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.2s;
          backdrop-filter: blur(8px);
        }
        .arrow-btn:hover:not(:disabled) { background: var(--pink); border-color: var(--pink); }
        .arrow-btn:disabled { opacity: 0.25; cursor: default; }

        .slide-counter {
          font-size: 12px;
          color: var(--muted);
          font-weight: 500;
          min-width: 50px;
          text-align: center;
        }

        /* Shared slide components */
        .slide-wrap {
          max-width: 1100px;
          margin: 0 auto;
        }

        .chip {
          display: inline-block;
          padding: 4px 14px;
          border-radius: 50px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          margin-bottom: 16px;
        }
        .chip-pink { background: rgba(255,61,138,0.15); color: var(--pink); border: 1px solid rgba(255,61,138,0.3); }
        .chip-gold { background: rgba(245,200,66,0.12); color: var(--gold); border: 1px solid rgba(245,200,66,0.3); }
        .chip-lilac { background: rgba(192,132,252,0.12); color: var(--lilac); border: 1px solid rgba(192,132,252,0.3); }

        .slide-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(42px, 5vw, 72px);
          font-weight: 600;
          line-height: 1.05;
          letter-spacing: -1px;
          margin-bottom: 8px;
        }
        .slide-subtitle {
          font-size: 15px;
          color: var(--muted);
          font-weight: 400;
          line-height: 1.6;
          max-width: 560px;
        }

        .grad-text {
          background: linear-gradient(135deg, var(--pink), var(--gold));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .glass-card {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 24px;
          position: relative;
          overflow: hidden;
        }
        .glass-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
        }

        .divider {
          width: 60px; height: 2px;
          background: linear-gradient(90deg, var(--pink), var(--gold));
          border-radius: 2px;
          margin: 20px 0;
        }

        /* Slide 0 — Title */
        .s0-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
          min-height: calc(100vh - 200px);
        }
        .s0-eyebrow {
          font-size: 11px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--pink);
          font-weight: 700;
          margin-bottom: 20px;
        }
        .s0-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(56px, 6vw, 96px);
          font-weight: 600;
          line-height: 0.95;
          letter-spacing: -2px;
          margin-bottom: 28px;
        }
        .s0-meta {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: 32px;
        }
        .s0-meta-item {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 13px;
          color: var(--muted);
        }
        .s0-meta-item strong { color: var(--text); font-weight: 600; }
        .s0-meta-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--pink);
          flex-shrink: 0;
        }
        .s0-img-wrap {
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          aspect-ratio: 4/5;
          box-shadow: 0 40px 80px rgba(255,61,138,0.2), 0 0 0 1px var(--border);
        }
        .s0-img-wrap img {
          width: 100%; height: 100%;
          object-fit: cover;
        }
        .s0-img-overlay {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          background: linear-gradient(0deg, rgba(10,10,15,0.9) 0%, transparent 60%);
          padding: 28px;
        }
        .s0-badge {
          background: linear-gradient(135deg, var(--pink), #c0392b);
          color: #fff;
          font-size: 12px;
          font-weight: 700;
          padding: 8px 16px;
          border-radius: 50px;
          display: inline-block;
          letter-spacing: 0.5px;
        }

        /* Slide 1 — Concept */
        .s1-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 48px;
          margin-top: 40px;
          align-items: start;
        }
        .concept-pillars {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .pillar {
          display: flex;
          gap: 16px;
          align-items: flex-start;
          padding: 20px;
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 12px;
          transition: border-color 0.2s;
        }
        .pillar:hover { border-color: rgba(255,61,138,0.3); }
        .pillar-icon {
          width: 44px; height: 44px;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          font-size: 20px;
        }
        .pillar-text h4 { font-size: 14px; font-weight: 700; margin-bottom: 4px; }
        .pillar-text p { font-size: 12px; color: var(--muted); line-height: 1.5; }
        .mission-card {
          padding: 32px;
          background: linear-gradient(135deg, rgba(255,61,138,0.08), rgba(192,132,252,0.08));
          border: 1px solid rgba(255,61,138,0.2);
          border-radius: 20px;
        }
        .mission-quote {
          font-family: 'Cormorant Garamond', serif;
          font-size: 28px;
          font-style: italic;
          line-height: 1.4;
          color: var(--text);
          margin-bottom: 20px;
        }
        .mission-stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-top: 24px;
        }
        .mstat {
          text-align: center;
          padding: 16px;
          background: rgba(255,255,255,0.04);
          border-radius: 10px;
          border: 1px solid var(--border);
        }
        .mstat-val {
          font-size: 28px;
          font-weight: 800;
          background: linear-gradient(135deg, var(--pink), var(--gold));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .mstat-label { font-size: 11px; color: var(--muted); margin-top: 2px; }

        /* Slide 2 — Market */
        .market-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-top: 40px;
        }
        .market-card {
          padding: 28px;
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          position: relative;
          overflow: hidden;
        }
        .market-card::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 3px;
        }
        .market-card.mc1::after { background: linear-gradient(90deg, var(--pink), #ff85b8); }
        .market-card.mc2::after { background: linear-gradient(90deg, var(--gold), var(--gold-light)); }
        .market-card.mc3::after { background: linear-gradient(90deg, var(--lilac), #e9d5ff); }
        .market-num {
          font-size: 48px;
          font-weight: 900;
          line-height: 1;
          margin-bottom: 8px;
        }
        .market-num.c-pink { color: var(--pink); }
        .market-num.c-gold { color: var(--gold); }
        .market-num.c-lilac { color: var(--lilac); }
        .market-label { font-size: 13px; font-weight: 600; margin-bottom: 6px; }
        .market-desc { font-size: 12px; color: var(--muted); line-height: 1.5; }

        .audience-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-top: 20px;
        }
        .audience-item {
          padding: 16px 20px;
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--border);
          border-radius: 10px;
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 13px;
          font-weight: 500;
        }
        .audience-icon { font-size: 22px; }

        /* Slide 3 — Services */
        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-top: 36px;
        }
        .service-card {
          padding: 22px;
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 14px;
          transition: all 0.2s;
          position: relative;
        }
        .service-card:hover {
          border-color: rgba(255,61,138,0.4);
          transform: translateY(-3px);
          box-shadow: 0 16px 40px rgba(255,61,138,0.1);
        }
        .svc-tag {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          padding: 3px 10px;
          border-radius: 50px;
          background: rgba(255,61,138,0.12);
          color: var(--pink);
          border: 1px solid rgba(255,61,138,0.2);
          display: inline-block;
          margin-bottom: 12px;
        }
        .svc-name { font-size: 15px; font-weight: 700; margin-bottom: 6px; }
        .svc-price { font-size: 20px; font-weight: 800; color: var(--pink); }
        .svc-time { font-size: 11px; color: var(--muted); margin-top: 4px; display: flex; align-items: center; gap: 4px; }

        .pricing-section { margin-top: 32px; }
        .pricing-title {
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 16px;
        }
        .pricing-rows { display: flex; flex-direction: column; gap: 10px; }
        .pricing-row {
          display: grid;
          grid-template-columns: 120px 1fr 60px;
          gap: 16px;
          align-items: center;
          padding: 14px 18px;
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 10px;
        }
        .pr-seg { font-size: 13px; font-weight: 700; }
        .pr-desc { font-size: 12px; color: var(--muted); }
        .pr-range { font-size: 13px; font-weight: 700; color: var(--gold); text-align: right; }
        .pr-bar-wrap { grid-column: 1/-1; height: 4px; background: rgba(255,255,255,0.06); border-radius: 4px; margin-top: -4px; }
        .pr-bar { height: 100%; border-radius: 4px; background: linear-gradient(90deg, var(--gold), var(--pink)); }

        /* Slide 4 — Finance */
        .finance-layout {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 40px;
          margin-top: 36px;
          align-items: start;
        }
        .chart-title {
          font-size: 13px;
          font-weight: 700;
          color: var(--muted);
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 20px;
        }
        .bar-chart { display: flex; align-items: flex-end; gap: 12px; height: 200px; }
        .bar-group { flex: 1; display: flex; gap: 3px; align-items: flex-end; position: relative; }
        .bar-col { flex: 1; border-radius: 4px 4px 0 0; transition: opacity 0.2s; cursor: default; }
        .bar-col:hover { opacity: 0.85; }
        .bar-rev { background: linear-gradient(180deg, var(--pink), rgba(255,61,138,0.4)); }
        .bar-cost { background: linear-gradient(180deg, rgba(192,132,252,0.7), rgba(192,132,252,0.2)); }
        .bar-label {
          position: absolute;
          bottom: -22px; left: 50%;
          transform: translateX(-50%);
          font-size: 11px;
          color: var(--muted);
          white-space: nowrap;
        }
        .chart-legend {
          display: flex;
          gap: 20px;
          margin-top: 36px;
          font-size: 12px;
          color: var(--muted);
        }
        .legend-dot {
          width: 10px; height: 10px;
          border-radius: 2px;
          display: inline-block;
          margin-right: 6px;
        }

        .invest-cards { display: flex; flex-direction: column; gap: 12px; }
        .invest-card {
          padding: 16px 20px;
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .ic-name { font-size: 13px; font-weight: 600; }
        .ic-sum { font-size: 16px; font-weight: 800; }
        .ic-sum.c-pink { color: var(--pink); }
        .ic-sum.c-gold { color: var(--gold); }
        .ic-sum.c-lilac { color: var(--lilac); }
        .total-invest {
          margin-top: 8px;
          padding: 18px 20px;
          background: linear-gradient(135deg, rgba(255,61,138,0.1), rgba(245,200,66,0.08));
          border: 1px solid rgba(255,61,138,0.25);
          border-radius: 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .ti-label { font-size: 14px; font-weight: 700; }
        .ti-val { font-size: 24px; font-weight: 900; background: linear-gradient(135deg, var(--pink), var(--gold)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }

        /* Slide 5 — Contacts */
        .contacts-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
          min-height: calc(100vh - 200px);
        }
        .contact-items { display: flex; flex-direction: column; gap: 16px; margin-top: 32px; }
        .contact-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 18px 22px;
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 12px;
          transition: border-color 0.2s;
        }
        .contact-item:hover { border-color: rgba(255,61,138,0.3); }
        .contact-icon {
          width: 44px; height: 44px;
          border-radius: 10px;
          background: rgba(255,61,138,0.1);
          border: 1px solid rgba(255,61,138,0.2);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          color: var(--pink);
        }
        .contact-label { font-size: 11px; color: var(--muted); text-transform: uppercase; letter-spacing: 1px; }
        .contact-val { font-size: 14px; font-weight: 600; margin-top: 2px; }

        .thanks-block { text-align: center; padding: 48px 40px; }
        .thanks-emoji { font-size: 64px; display: block; margin-bottom: 20px; }
        .thanks-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 48px;
          font-weight: 600;
          margin-bottom: 12px;
        }
        .thanks-sub { font-size: 15px; color: var(--muted); line-height: 1.6; }

        @media (max-width: 768px) {
          .pres-slide { padding: 90px 20px 90px; }
          .s0-layout, .s1-grid, .contacts-layout { grid-template-columns: 1fr; gap: 32px; }
          .s0-img-wrap { display: none; }
          .market-grid, .services-grid { grid-template-columns: 1fr 1fr; }
          .audience-row { grid-template-columns: 1fr; }
          .finance-layout { grid-template-columns: 1fr; }
          .pricing-row { grid-template-columns: 1fr 1fr; }
          .pr-range { text-align: left; }
        }
      `}</style>
    </div>
  );
}

/* ─── SLIDE 0: Титульная ─── */
function Slide0() {
  return (
    <div className="slide-wrap s0-layout">
      <div>
        <div className="s0-eyebrow">Бизнес-план · 2026</div>
        <div className="s0-title">
          <span className="grad-text">NAILS</span>
          <br />
          <span style={{ color: "var(--text)" }}>PRO</span>
          <br />
          <span style={{ color: "var(--lilac)", fontStyle: "italic", fontSize: "0.6em" }}>Studio</span>
        </div>
        <p style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.7, maxWidth: 440 }}>
          Современная маникюрная студия с уникальным подходом к сервису и дизайну ногтей
        </p>
        <div className="s0-meta">
          <div className="s0-meta-item">
            <div className="s0-meta-dot" />
            <span>Проект: <strong>Маникюр</strong></span>
          </div>
          <div className="s0-meta-item">
            <div className="s0-meta-dot" />
            <span>Формат: <strong>Маникюрная студия</strong></span>
          </div>

          <div className="s0-meta-item">
            <div className="s0-meta-dot" />
            <span>Окупаемость: <strong>6 месяцев</strong></span>
          </div>
        </div>
      </div>
      <div className="s0-img-wrap">
        <img src={NAIL_IMG} alt="Маникюр" />
        <div className="s0-img-overlay">
          <div className="s0-badge">✦ Premium Nail Studio</div>
        </div>
      </div>
    </div>
  );
}

/* ─── SLIDE 1: Концепция ─── */
function Slide1() {
  return (
    <div className="slide-wrap">
      <div className="chip chip-pink">Концепция проекта</div>
      <h1 className="slide-title">Идея & <span className="grad-text">Миссия</span></h1>
      <div className="divider" />
      <div className="s1-grid">
        <div className="concept-pillars">
          {[
            { icon: "💎", title: "Премиум-сервис", desc: "Персональный подход к каждому клиенту, уютная атмосфера и внимание к деталям на каждом этапе", bg: "rgba(255,61,138,0.1)" },
            { icon: "🎨", title: "Авторский дизайн", desc: "Эксклюзивные nail-art работы, трендовые коллекции сезона и индивидуальные образы по запросу", bg: "rgba(192,132,252,0.1)" },
            { icon: "🌿", title: "Безопасность", desc: "Только сертифицированные материалы, строгая стерилизация инструментов, гипоаллергенные покрытия", bg: "rgba(245,200,66,0.1)" },
            { icon: "⚡", title: "Быстро и удобно", desc: "Онлайн-запись 24/7, точный тайминг без ожиданий, напоминания и программа лояльности", bg: "rgba(255,61,138,0.08)" },
          ].map((p) => (
            <div className="pillar" key={p.title}>
              <div className="pillar-icon" style={{ background: p.bg }}>{p.icon}</div>
              <div className="pillar-text">
                <h4>{p.title}</h4>
                <p>{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div>
          <div className="mission-card">
            <p className="mission-quote">"Красота начинается с деталей — мы делаем их идеальными"</p>
            <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6 }}>
              NAILS PRO Studio — это пространство, где профессиональный маникюр сочетается с атмосферой заботы. Мы создаём не просто красивые ногти — мы создаём впечатления.
            </p>
            <div className="mission-stats">
              <div className="mstat">
                <div className="mstat-val">3</div>
                <div className="mstat-label">мастера в старте</div>
              </div>
              <div className="mstat">
                <div className="mstat-val">50+</div>
                <div className="mstat-label">услуг в меню</div>
              </div>
              <div className="mstat">
                <div className="mstat-val">5★</div>
                <div className="mstat-label">целевой рейтинг</div>
              </div>
              <div className="mstat">
                <div className="mstat-val">12ч</div>
                <div className="mstat-label">график работы</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── SLIDE 2: Рынок ─── */
function Slide2() {
  return (
    <div className="slide-wrap">
      <div className="chip chip-gold">Анализ рынка</div>
      <h1 className="slide-title">Рынок & <span className="grad-text">Аудитория</span></h1>
      <div className="divider" />
      <div className="market-grid">
        <div className="market-card mc1">
          <div className="market-num c-pink">₽280<span style={{ fontSize: 24 }}>млрд</span></div>
          <div className="market-label">Объём рынка РФ</div>
          <div className="market-desc">Рынок бьюти-услуг России растёт на 12–15% в год. Маникюр — одна из самых востребованных услуг</div>
        </div>
        <div className="market-card mc2">
          <div className="market-num c-gold">68<span style={{ fontSize: 24 }}>%</span></div>
          <div className="market-label">Женщины 20–45 лет</div>
          <div className="market-desc">Основная платёжеспособная аудитория, регулярно пользующаяся маникюрными услугами</div>
        </div>
        <div className="market-card mc3">
          <div className="market-num c-lilac">2,5x</div>
          <div className="market-label">Рост спроса за 5 лет</div>
          <div className="market-desc">Спрос на premium-маникюр вырос в 2.5 раза. Клиенты готовы платить за качество и сервис</div>
        </div>
      </div>
      <div className="audience-row" style={{ marginTop: 28 }}>
        {[
          { icon: "👩‍💼", label: "Деловые женщины 28–45" },
          { icon: "👩‍🎓", label: "Студентки 18–27 лет" },
          { icon: "🤱", label: "Молодые мамы 25–40" },
          { icon: "💍", label: "Невесты и мероприятия" },
          { icon: "👨", label: "Мужской маникюр" },
          { icon: "🌟", label: "Корпоративные клиенты" },
        ].map((a) => (
          <div className="audience-item" key={a.label}>
            <span className="audience-icon">{a.icon}</span>
            <span>{a.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── SLIDE 3: Услуги ─── */
function Slide3() {
  return (
    <div className="slide-wrap">
      <div className="chip chip-lilac">Услуги & Цены</div>
      <h1 className="slide-title">Прайс & <span className="grad-text">Позиционирование</span></h1>
      <div className="divider" />
      <div className="services-grid">
        {services.map((s) => (
          <div className="service-card" key={s.name}>
            <div className="svc-tag">{s.tag}</div>
            <div className="svc-name">{s.name}</div>
            <div className="svc-price">{s.price}</div>
            <div className="svc-time">
              <Icon name="Clock" size={12} />
              {s.time}
            </div>
          </div>
        ))}
      </div>
      <div className="pricing-section">
        <div className="pricing-title">Стратегия ценообразования</div>
        <div className="pricing-rows">
          {pricing.map((p) => (
            <div key={p.segment} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <div className="pricing-row">
                <div className="pr-seg">{p.segment}</div>
                <div className="pr-desc">{p.desc}</div>
                <div className="pr-range">{p.range}</div>
              </div>
              <div className="pr-bar-wrap">
                <div className="pr-bar" style={{ width: `${p.share}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── SLIDE 4: Финансы ─── */
function Slide4() {
  return (
    <div className="slide-wrap">
      <div className="chip chip-gold">Финансовый план</div>
      <h1 className="slide-title">Прогнозы & <span className="grad-text">Инвестиции</span></h1>
      <div className="divider" />
      <div className="finance-layout">
        <div>
          <div className="chart-title">Выручка vs Расходы (тыс. ₽) · 6 месяцев</div>
          <div className="bar-chart">
            {financials.map((f) => (
              <div className="bar-group" key={f.month}>
                <div
                  className="bar-col bar-rev"
                  style={{ height: `${(f.rev / maxRev) * 100}%` }}
                  title={`Выручка: ${f.rev}к`}
                />
                <div
                  className="bar-col bar-cost"
                  style={{ height: `${(f.cost / maxRev) * 100}%` }}
                  title={`Расходы: ${f.cost}к`}
                />
                <div className="bar-label">{f.month}</div>
              </div>
            ))}
          </div>
          <div className="chart-legend">
            <span><span className="legend-dot" style={{ background: "var(--pink)" }} />Выручка</span>
            <span><span className="legend-dot" style={{ background: "var(--lilac)" }} />Расходы</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginTop: 28 }}>
            {[
              { label: "Выручка (6 мес)", val: "1,8 млн ₽", color: "var(--pink)" },
              { label: "Прибыль (6 мес)", val: "~520 тыс.", color: "var(--gold)" },
              { label: "Рентабельность", val: "28–35%", color: "var(--lilac)" },
            ].map((m) => (
              <div key={m.label} className="glass-card" style={{ textAlign: "center" }}>
                <div style={{ fontSize: 22, fontWeight: 900, color: m.color }}>{m.val}</div>
                <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 4 }}>{m.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div style={{
            marginTop: 12,
            padding: "18px 20px",
            background: "linear-gradient(135deg, rgba(34,197,94,0.12), rgba(245,200,66,0.08))",
            border: "1px solid rgba(34,197,94,0.35)",
            borderRadius: 12,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#4ade80" }}>
                ✅ Единовременная финансовая помощь
              </div>
              <div style={{ fontSize: 22, fontWeight: 900, color: "#4ade80" }}>120 000 ₽</div>
            </div>
            <div style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.6, marginBottom: 10 }}>
              Проект полностью реализуется в рамках выделенной суммы — все статьи расходов покрываются без превышения бюджета.
            </div>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 14px",
              background: "rgba(34,197,94,0.08)",
              borderRadius: 8,
              border: "1px solid rgba(34,197,94,0.2)",
              fontSize: 12,
              fontWeight: 700,
              color: "#4ade80",
            }}>
              <Icon name="CheckCircle" size={16} />
              Бюджет соблюдён · Остаток: 0 ₽ · Превышения нет
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── SLIDE 5: Контакты ─── */
function Slide5() {
  return (
    <div className="slide-wrap contacts-layout">
      <div>
        <div className="chip chip-pink">Контакты</div>
        <h1 className="slide-title">Свяжитесь <span className="grad-text">с нами</span></h1>
        <div className="divider" />
        <p className="slide-subtitle">
          Готовы обсудить детали проекта, условия партнёрства и инвестиционные возможности. Будем рады вашему звонку или сообщению!
        </p>
        <div className="contact-items">
          {[
            { icon: "Phone", label: "Телефон", val: "+7 (XXX) XXX-XX-XX" },
            { icon: "Mail", label: "E-mail", val: "info@nailspro.ru" },
            { icon: "MapPin", label: "Адрес", val: "Ваш город, ул. Примерная, 1" },
            { icon: "Instagram", label: "Instagram", val: "@nailspro_studio" },
          ].map((c) => (
            <div className="contact-item" key={c.label}>
              <div className="contact-icon">
                <Icon name={c.icon} fallback="CircleAlert" size={18} />
              </div>
              <div>
                <div className="contact-label">{c.label}</div>
                <div className="contact-val">{c.val}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="thanks-block glass-card">
        <span className="thanks-emoji">💅</span>
        <div className="thanks-title">
          <span className="grad-text">Спасибо</span>
          <br />
          за внимание!
        </div>
        <p className="thanks-sub">
          NAILS PRO Studio — инвестиция в красоту, которая всегда востребована.<br /><br />
          Вместе создадим пространство, где каждая клиентка чувствует себя особенной.
        </p>
        <div style={{ marginTop: 28, padding: "14px 20px", background: "rgba(255,61,138,0.08)", borderRadius: 10, border: "1px solid rgba(255,61,138,0.2)", fontSize: 13, color: "var(--pink)", fontWeight: 600, letterSpacing: 0.5 }}>
          ✦ Окупаемость: 6 месяцев ✦ ROI: 35%+
        </div>
      </div>
    </div>
  );
}