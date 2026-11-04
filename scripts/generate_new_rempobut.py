import os

html_content = '''<!DOCTYPE html>
<html lang="uk" class="scroll-smooth">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
  <title>ТехноVovk Харків — Сервісний центр ремонту побутової техніки (пр. Героїв Харкова, 35)</title>
  <meta name="description" content="Сервісний центр ТЕХНОVOVK у Харкові. Терміновий ремонт пральних машин, холодильників, мікрохвильовок, кавомашин, пилососів, мультиварок, духовок. Виїзд майстра: 063 881 2785. Адреса: пр. Героїв Харкова, 35." />
  
  <link rel="icon" href="assets/images/technovovk-logo.jpg" type="image/jpeg" />
  
  <!-- Modern Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;700;800&family=Space+Grotesk:wght@600;700;800;900&display=swap" rel="stylesheet">

  <style>
    :root {
      --bg-dark: #080c14;
      --bg-card: #0f1624;
      --bg-card-hover: #162034;
      --bg-input: #131c2d;
      --border-color: rgba(255, 255, 255, 0.08);
      --border-accent: rgba(249, 115, 22, 0.3);
      --orange: #f97316;
      --orange-light: #fb923c;
      --orange-glow: rgba(249, 115, 22, 0.25);
      --amber: #f59e0b;
      --cyan: #38bdf8;
      --emerald: #10b981;
      --text-main: #f8fafc;
      --text-muted: #94a3b8;
      --font-display: 'Space Grotesk', -apple-system, sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
      --font-body: 'Inter', -apple-system, sans-serif;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      background-color: var(--bg-dark);
      color: var(--text-main);
      font-family: var(--font-body);
      line-height: 1.5;
      overflow-x: hidden;
      background-image: 
        radial-gradient(circle at 15% 15%, rgba(249, 115, 22, 0.06) 0%, transparent 40%),
        radial-gradient(circle at 85% 65%, rgba(56, 189, 248, 0.04) 0%, transparent 40%),
        linear-gradient(to bottom, rgba(8, 12, 20, 0.95), rgba(8, 12, 20, 0.98)),
        radial-gradient(#1e293b 1px, transparent 1px);
      background-size: 100% 100%, 100% 100%, 100% 100%, 32px 32px;
    }

    h1, h2, h3, h4, .font-heading {
      font-family: var(--font-display);
      letter-spacing: -0.02em;
    }

    .font-mono {
      font-family: var(--font-mono);
    }

    .container {
      width: 100%;
      max-width: 1280px;
      margin: 0 auto;
      padding: 0 20px;
    }

    /* Glow utilities */
    .glow-orange {
      box-shadow: 0 0 25px var(--orange-glow);
    }
    .text-gradient {
      background: linear-gradient(135deg, #fff 30%, var(--orange-light) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .text-orange { color: var(--orange); }
    .text-amber { color: var(--amber); }
    .text-cyan { color: var(--cyan); }
    .text-emerald { color: var(--emerald); }

    /* Buttons */
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 12px 24px;
      border-radius: 9999px;
      font-family: var(--font-display);
      font-size: 13px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      text-decoration: none;
      cursor: pointer;
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      border: 1px solid transparent;
    }
    .btn-primary {
      background: linear-gradient(135deg, #ea580c, #f97316);
      color: #fff;
      box-shadow: 0 4px 20px rgba(234, 88, 12, 0.4);
    }
    .btn-primary:hover {
      background: linear-gradient(135deg, #f97316, #fb923c);
      box-shadow: 0 6px 28px rgba(249, 115, 22, 0.6);
      transform: translateY(-2px);
    }
    .btn-secondary {
      background: rgba(255, 255, 255, 0.05);
      border-color: rgba(255, 255, 255, 0.12);
      color: #fff;
      backdrop-filter: blur(8px);
    }
    .btn-secondary:hover {
      background: rgba(255, 255, 255, 0.1);
      border-color: var(--orange);
      color: var(--orange-light);
      transform: translateY(-2px);
    }
    .btn-sm {
      padding: 8px 16px;
      font-size: 11px;
    }

    /* Top Utility Bar */
    .top-bar {
      background: rgba(10, 15, 25, 0.95);
      border-bottom: 1px solid var(--border-color);
      font-size: 12px;
      padding: 8px 0;
      position: relative;
      z-index: 60;
    }
    .top-bar-inner {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 10px;
    }

    /* Main Navigation */
    .header {
      position: sticky;
      top: 0;
      z-index: 50;
      background: rgba(8, 12, 20, 0.88);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border-bottom: 1px solid var(--border-color);
      padding: 14px 0;
      transition: all 0.3s ease;
    }
    .header-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
    }
    .brand-logo {
      display: flex;
      align-items: center;
      gap: 12px;
      text-decoration: none;
      color: inherit;
    }
    .logo-badge {
      width: 44px;
      height: 44px;
      border-radius: 12px;
      overflow: hidden;
      border: 2px solid rgba(249, 115, 22, 0.4);
      background: #000;
      box-shadow: 0 0 15px rgba(249, 115, 22, 0.3);
      flex-shrink: 0;
    }
    .logo-badge img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    .brand-text b {
      display: block;
      font-family: var(--font-display);
      font-size: 20px;
      font-weight: 900;
      line-height: 1;
      letter-spacing: -0.01em;
    }
    .brand-text span {
      display: block;
      font-family: var(--font-mono);
      font-size: 10px;
      color: var(--orange);
      letter-spacing: 0.1em;
      text-transform: uppercase;
      margin-top: 2px;
    }

    .nav-menu {
      display: flex;
      align-items: center;
      gap: 24px;
      list-style: none;
    }
    .nav-menu a {
      color: var(--text-muted);
      text-decoration: none;
      font-size: 13px;
      font-weight: 600;
      letter-spacing: 0.02em;
      transition: color 0.2s;
    }
    .nav-menu a:hover {
      color: var(--orange-light);
    }

    /* Cards & Containers */
    .card {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: 20px;
      padding: 24px;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      position: relative;
      overflow: hidden;
    }
    .card:hover {
      border-color: rgba(249, 115, 22, 0.35);
      background: var(--bg-card-hover);
      transform: translateY(-3px);
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
    }

    /* Badge */
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 12px;
      border-radius: 9999px;
      font-size: 11px;
      font-weight: 700;
      font-family: var(--font-mono);
      letter-spacing: 0.05em;
      text-transform: uppercase;
      background: rgba(249, 115, 22, 0.12);
      border: 1px solid rgba(249, 115, 22, 0.3);
      color: var(--orange-light);
    }
    .badge-cyan {
      background: rgba(56, 189, 248, 0.1);
      border-color: rgba(56, 189, 248, 0.25);
      color: var(--cyan);
    }
    .badge-emerald {
      background: rgba(16, 185, 129, 0.1);
      border-color: rgba(16, 185, 129, 0.25);
      color: var(--emerald);
    }

    /* Section padding */
    .section {
      padding: 80px 0;
      position: relative;
    }
    .section-title {
      font-size: clamp(28px, 4.5vw, 44px);
      font-weight: 800;
      line-height: 1.15;
      margin-bottom: 14px;
    }
    .section-desc {
      color: var(--text-muted);
      font-size: 15px;
      max-width: 600px;
      line-height: 1.6;
    }

    /* Interactive Filter Tabs */
    .filter-tabs {
      display: flex;
      align-items: center;
      gap: 8px;
      overflow-x: auto;
      padding-bottom: 8px;
      margin: 30px 0 24px;
      scrollbar-width: none;
    }
    .filter-tabs::-webkit-scrollbar { display: none; }
    .filter-tab {
      padding: 8px 18px;
      border-radius: 9999px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.08);
      color: var(--text-muted);
      font-family: var(--font-display);
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
      white-space: nowrap;
      transition: all 0.2s;
    }
    .filter-tab:hover {
      background: rgba(255, 255, 255, 0.1);
      color: #fff;
    }
    .filter-tab.active {
      background: var(--orange);
      color: #fff;
      border-color: var(--orange);
      box-shadow: 0 0 15px var(--orange-glow);
    }

    /* Fault Finder Box */
    .diagnostic-box {
      background: linear-gradient(145deg, #0f172a, #080c14);
      border: 1px solid rgba(249, 115, 22, 0.25);
      border-radius: 24px;
      padding: 32px;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
      position: relative;
    }

    .device-pills {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
      gap: 10px;
      margin: 18px 0;
    }
    .device-pill {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid var(--border-color);
      border-radius: 14px;
      padding: 12px 10px;
      text-align: center;
      cursor: pointer;
      transition: all 0.2s;
      font-size: 12px;
      font-weight: 600;
    }
    .device-pill:hover {
      border-color: var(--orange-light);
      background: rgba(249, 115, 22, 0.08);
      transform: translateY(-2px);
    }
    .device-pill.selected {
      background: rgba(249, 115, 22, 0.16);
      border-color: var(--orange);
      color: #fff;
      box-shadow: 0 0 16px rgba(249, 115, 22, 0.3);
    }

    .symptom-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin: 14px 0 24px;
    }
    .symptom-chip {
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid var(--border-color);
      padding: 8px 14px;
      border-radius: 9999px;
      font-size: 12px;
      cursor: pointer;
      transition: all 0.2s;
    }
    .symptom-chip:hover {
      border-color: rgba(255, 255, 255, 0.3);
      color: #fff;
    }
    .symptom-chip.selected {
      background: var(--cyan);
      border-color: var(--cyan);
      color: #04121e;
      font-weight: 700;
      box-shadow: 0 0 14px rgba(56, 189, 248, 0.4);
    }

    /* Diagnosis Output Card */
    .diagnostic-result {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(56, 189, 248, 0.2);
      border-radius: 18px;
      padding: 24px;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
      align-items: center;
    }

    /* Service Catalog Grid */
    .services-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 24px;
      margin-top: 30px;
    }
    .service-img-box {
      height: 180px;
      border-radius: 14px;
      overflow: hidden;
      margin-bottom: 16px;
      position: relative;
    }
    .service-img-box img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.4s ease;
    }
    .card:hover .service-img-box img {
      transform: scale(1.05);
    }
    .service-price-tag {
      position: absolute;
      bottom: 10px;
      right: 10px;
      background: rgba(8, 12, 20, 0.85);
      backdrop-filter: blur(8px);
      padding: 4px 10px;
      border-radius: 8px;
      font-family: var(--font-mono);
      font-size: 12px;
      font-weight: 800;
      color: var(--orange-light);
      border: 1px solid rgba(249, 115, 22, 0.3);
    }

    /* Calculator Box */
    .calc-card {
      background: linear-gradient(145deg, #0d1422, #070a12);
      border: 1px solid rgba(249, 115, 22, 0.25);
      border-radius: 24px;
      padding: 36px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 36px;
    }
    @media (max-width: 860px) {
      .calc-card { grid-template-columns: 1fr; }
    }
    .calc-control {
      margin-bottom: 20px;
    }
    .calc-label {
      display: block;
      font-family: var(--font-mono);
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--text-muted);
      margin-bottom: 8px;
    }
    .calc-select, .calc-input {
      width: 100%;
      background: var(--bg-input);
      border: 1px solid var(--border-color);
      color: #fff;
      padding: 12px 16px;
      border-radius: 12px;
      font-family: inherit;
      font-size: 14px;
      font-weight: 600;
      outline: none;
      transition: border-color 0.2s;
    }
    .calc-select:focus, .calc-input:focus {
      border-color: var(--orange);
    }

    .calc-summary {
      background: rgba(249, 115, 22, 0.04);
      border: 1px solid rgba(249, 115, 22, 0.15);
      border-radius: 20px;
      padding: 28px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .total-price {
      font-family: var(--font-display);
      font-size: 48px;
      font-weight: 900;
      color: var(--orange-light);
      line-height: 1;
      margin: 12px 0 6px;
    }

    /* Modal */
    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.85);
      backdrop-filter: blur(12px);
      display: none;
      align-items: center;
      justify-content: center;
      z-index: 100;
      padding: 20px;
    }
    .modal-overlay.active {
      display: flex;
    }
    .modal-window {
      background: var(--bg-card);
      border: 1px solid rgba(249, 115, 22, 0.4);
      box-shadow: 0 25px 60px rgba(0, 0, 0, 0.8);
      border-radius: 24px;
      width: 100%;
      max-width: 520px;
      padding: 36px;
      position: relative;
    }
    .modal-close {
      position: absolute;
      top: 18px;
      right: 18px;
      background: rgba(255, 255, 255, 0.08);
      border: none;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      color: #fff;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .modal-close:hover {
      background: rgba(255, 255, 255, 0.2);
    }

    /* Districts Grid */
    .districts-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      gap: 14px;
      margin-top: 24px;
    }
    .district-item {
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid var(--border-color);
      border-radius: 14px;
      padding: 14px 18px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      transition: all 0.2s;
    }
    .district-item:hover {
      border-color: rgba(56, 189, 248, 0.4);
      background: rgba(56, 189, 248, 0.04);
      transform: translateX(4px);
    }

    /* Responsive */
    @media (max-width: 768px) {
      .nav-menu { display: none; }
      .section { padding: 50px 0; }
    }
  </style>
</head>
<body>

  <!-- Top Utility Bar with Real Google Maps Listing & Hours -->
  <div class="top-bar">
    <div class="container top-bar-inner">
      <div style="display:flex; align-items:center; gap:16px; flex-wrap:wrap;">
        <span style="display:flex; align-items:center; gap:6px;">
          <span style="width:8px; height:8px; border-radius:50%; background:var(--emerald); display:inline-block; box-shadow:0 0 8px var(--emerald);"></span>
          <strong>Пн-Сб 09:00 – 17:00</strong> (Майстерні та виїзди)
        </span>
        <a href="https://maps.app.goo.gl/ZJYEg6JSiCwZZdsa7" target="_blank" rel="noopener noreferrer" style="color:var(--text-muted); text-decoration:none; display:flex; align-items:center; gap:4px;">
          <span>📍 проспект Героїв Харкова, 35, Харків (61050)</span>
          <span style="color:var(--orange);">↗</span>
        </a>
      </div>

      <div style="display:flex; align-items:center; gap:14px;">
        <a href="../" style="color:var(--text-muted); text-decoration:none; font-family:var(--font-mono); font-size:11px;">← arch1cat.site</a>
        <a href="../fixora/" style="color:var(--amber); text-decoration:none; font-family:var(--font-mono); font-size:11px;">⚡ Fixora (Жовтий прототип)</a>
      </div>
    </div>
  </div>

  <!-- Main Navigation Header -->
  <header class="header">
    <div class="container header-inner">
      <a href="#hero" class="brand-logo">
        <div class="logo-badge">
          <img src="assets/images/technovovk-logo.jpg" alt="ТехноVovk Logo" />
        </div>
        <div class="brand-text">
          <b>ТЕХНО<span class="text-orange">VOVK</span></b>
          <span>СЕРВІСНИЙ ЦЕНТР ХАРКІВ</span>
        </div>
      </a>

      <nav class="nav-menu">
        <a href="#diagnostic">Діагностика</a>
        <a href="#services">Послуги</a>
        <a href="#calculator">Калькулятор цін</a>
        <a href="#districts">Райони виїзду</a>
        <a href="#about">Про сервіс</a>
        <a href="#contact">Контакти</a>
      </nav>

      <div style="display:flex; align-items:center; gap:14px;">
        <a href="tel:+380638812785" style="display:flex; flex-direction:column; align-items:flex-end; text-decoration:none;">
          <span style="font-size:10px; font-family:var(--font-mono); color:var(--orange); text-transform:uppercase;">Гаряча лінія</span>
          <span style="font-family:var(--font-display); font-size:16px; font-weight:800; color:#fff;">063 881 2785</span>
        </a>
        <button onclick="openBookingModal()" class="btn btn-primary btn-sm">
          <span>Викликати майстра ↗</span>
        </button>
      </div>
    </div>
  </header>

  <!-- Hero Section -->
  <section id="hero" class="section" style="padding-top:50px; padding-bottom:70px;">
    <div class="container">
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:40px; align-items:center;">
        
        <div>
          <div class="badge" style="margin-bottom:16px;">
            <span>🐺 ТЕХНОVOVK — МИ ПРАЦЮЄМО ДЛЯ ХАРКІВ'ЯН</span>
          </div>

          <h1 class="section-title text-gradient">
            РЕМОНТ ПОБУТОВОЇ ТЕХНІКИ У ХАРКОВІ.
          </h1>

          <p style="font-size:16px; color:#cbd5e1; line-height:1.6; margin-bottom:24px;">
            Щодня допомагаємо харків’янам ремонтувати техніку замість того, щоб одразу купувати нову. Проводимо діагностику та ремонт пральних машин, холодильників No Frost, мікрохвильовок, кавомашин, духовок, пилососів, мультиварок та електроніки.
          </p>

          <div style="display:flex; gap:12px; flex-wrap:wrap; margin-bottom:32px;">
            <button onclick="openBookingModal()" class="btn btn-primary">
              <span>Терміновий виклик (45 хв) ↗</span>
            </button>
            <a href="#diagnostic" class="btn btn-secondary">
              <span>Експрес-діагностика ↓</span>
            </a>
          </div>

          <!-- Trust Counters -->
          <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:16px; border-top:1px solid var(--border-color); pt-6; padding-top:20px;">
            <div>
              <div class="font-heading" style="font-size:24px; font-weight:900; color:var(--orange-light);">15 400+</div>
              <div style="font-size:11px; color:var(--text-muted); font-family:var(--font-mono);">Відремонтованих приладів</div>
            </div>
            <div>
              <div class="font-heading" style="font-size:24px; font-weight:900; color:var(--cyan);">0 грн</div>
              <div style="font-size:11px; color:var(--text-muted); font-family:var(--font-mono);">Діагностика при ремонті</div>
            </div>
            <div>
              <div class="font-heading" style="font-size:24px; font-weight:900; color:var(--emerald);">5.0 ⭐</div>
              <div style="font-size:11px; color:var(--text-muted); font-family:var(--font-mono);">Оцінка на Google Maps</div>
            </div>
          </div>
        </div>

        <!-- Hero Visual Showcase -->
        <div style="position:relative;">
          <div style="position:relative; border-radius:24px; overflow:hidden; border:1px solid rgba(249, 115, 22, 0.3); box-shadow:0 20px 60px rgba(0,0,0,0.7); max-height:480px;">
            <img src="assets/images/workshop-hero.jpg" alt="Сервісний центр ТехноVovk Харків" style="width:100%; height:480px; object-fit:cover; display:block;" />
            <div style="position:absolute; inset:0; background:linear-gradient(to top, rgba(8,12,20,0.9) 0%, transparent 60%);"></div>

            <!-- Floating Badge: Master Location -->
            <div style="position:absolute; bottom:20px; left:20px; right:20px; background:rgba(15,22,36,0.92); backdrop-filter:blur(12px); border:1px solid rgba(255,255,255,0.1); border-radius:16px; padding:16px; display:flex; align-items:center; justify-content:space-between;">
              <div style="display:flex; align-items:center; gap:12px;">
                <div style="width:40px; height:40px; border-radius:10px; background:var(--orange); display:flex; align-items:center; justify-content:center; font-size:18px;">🛠️</div>
                <div>
                  <div style="font-size:13px; font-weight:800; color:#fff;">пр. Героїв Харкова, 35</div>
                  <div style="font-size:11px; color:var(--text-muted);">Майстри на чергуванні в усіх районах</div>
                </div>
              </div>
              <a href="tel:+380638812785" class="badge badge-emerald" style="text-decoration:none;">063 881 2785</a>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- FEATURE 1: Interactive Diagnostic Fault Finder (Інтерактивна експрес-діагностика) -->
  <section id="diagnostic" class="section" style="background:rgba(255,255,255,0.01); border-top:1px solid var(--border-color); border-bottom:1px solid var(--border-color);">
    <div class="container">
      <div style="text-align:center; max-width:700px; margin:0 auto 30px;">
        <div class="badge badge-cyan" style="margin-bottom:10px;">ІНТЕРАКТИВНИЙ АСИСТЕНТ ПОЛОМОК</div>
        <h2 class="section-title">Експрес-діагностика несправності онлайн</h2>
        <p class="section-desc" style="margin:0 auto;">Оберіть прилад та симптом — система миттєво визначить вірогідну причину поломки, терміни усунення та вартість робіт.</p>
      </div>

      <div class="diagnostic-box">
        <label class="calc-label">Крок 1. Оберіть тип побутової техніки:</label>
        <div class="device-pills" id="diag-devices">
          <!-- Rendered via JS -->
        </div>

        <label class="calc-label" style="margin-top:20px;">Крок 2. Який симптом ви помітили?</label>
        <div class="symptom-chips" id="diag-symptoms">
          <!-- Rendered via JS -->
        </div>

        <!-- Result Box -->
        <div class="diagnostic-result" id="diag-result">
          <!-- Rendered via JS -->
        </div>
      </div>
    </div>
  </section>

  <!-- FEATURE 2: Filterable Appliance Services Catalog -->
  <section id="services" class="section">
    <div class="container">
      <div style="display:flex; justify-content:space-between; align-items:flex-end; flex-wrap:wrap; gap:16px;">
        <div>
          <div class="badge" style="margin-bottom:10px;">КАТАЛОГ ПОСЛУГ ТА ПРАЙС-ЛИСТ</div>
          <h2 class="section-title">Яку техніку ми ремонтуємо у Харкові</h2>
          <p class="section-desc">Офіційні модулі, заводські схеми діагностики та власний склад із 8 000+ сертифікованих запчастин.</p>
        </div>
        <div style="font-family:var(--font-mono); font-size:12px; color:var(--emerald);">
          ✓ Письмова гарантія на кожну заміну
        </div>
      </div>

      <!-- Category Filter Pills -->
      <div class="filter-tabs" id="catalog-filters">
        <button class="filter-tab active" data-filter="all">Всі прилади (10)</button>
        <button class="filter-tab" data-filter="large">Велика побутова</button>
        <button class="filter-tab" data-filter="kitchen">Кухонна техніка</button>
        <button class="filter-tab" data-filter="small">Дрібна техніка</button>
        <button class="filter-tab" data-filter="electronics">Плати та модулі</button>
      </div>

      <!-- Services Grid -->
      <div class="services-grid" id="services-container">
        <!-- Rendered via JS -->
      </div>
    </div>
  </section>

  <!-- FEATURE 3: Advanced Live Repair Cost Calculator -->
  <section id="calculator" class="section" style="background:rgba(255,255,255,0.015); border-top:1px solid var(--border-color); border-bottom:1px solid var(--border-color);">
    <div class="container">
      <div style="text-align:center; max-width:700px; margin:0 auto 36px;">
        <div class="badge badge-emerald" style="margin-bottom:10px;">ПРОЗОРА ЦІНА ДО ПОЧАТКУ РОБІТ</div>
        <h2 class="section-title">Калькулятор вартості ремонту в реальному часі</h2>
        <p class="section-desc" style="margin:0 auto;">Сконфігуруйте параметри замовлення та зафіксуйте гарантовану ціну зі знижкою 15% на виїзд майстра.</p>
      </div>

      <div class="calc-card">
        <!-- Left: Config Options -->
        <div>
          <div class="calc-control">
            <label class="calc-label">1. Тип побутового приладу</label>
            <select id="calc-device" class="calc-select" onchange="calculatePrice()">
              <option value="washer">Пральна або сушильна машина</option>
              <option value="fridge">Холодильник / Морозильна камера</option>
              <option value="dishwasher">Посудомийна машина</option>
              <option value="coffee">Кавомашина (зернова / ріжкова)</option>
              <option value="microwave">Мікрохвильова піч (НВЧ)</option>
              <option value="cooktop">Духова шафа / Варильна плита</option>
              <option value="boiler">Бойлер / Водонагрівач</option>
              <option value="vacuum">Пилосос / Робот-пилосос</option>
              <option value="multicooker">Мультиварка / Кухонний комбайн</option>
              <option value="board">Електронна плата керування</option>
            </select>
          </div>

          <div class="calc-control">
            <label class="calc-label">2. Складність ремонту</label>
            <select id="calc-complexity" class="calc-select" onchange="calculatePrice()">
              <option value="light">Простий: чистка, датчики, ущільнювачі, кнопки</option>
              <option value="medium" selected>Середній: помпа, ТЕН, клапан, термостат, патрубок</option>
              <option value="heavy">Капітальний: підшипники, компресор, перепрошивка плати</option>
            </select>
          </div>

          <div class="calc-control">
            <label class="calc-label">3. Комплектуючі</label>
            <select id="calc-parts" class="calc-select" onchange="calculatePrice()">
              <option value="oem">Оригінальні комплектуючі заводу (OEM)</option>
              <option value="analog">Сертифікований європейський аналог (Економ)</option>
            </select>
          </div>

          <div class="calc-control">
            <label class="calc-label">4. Терміновість виїзду</label>
            <select id="calc-urgency" class="calc-select" onchange="calculatePrice()">
              <option value="std">Стандартний візит на узгоджений час</option>
              <option value="urgent">Терміновий аварійний виїзд (до 45 хв)</option>
            </select>
          </div>
        </div>

        <!-- Right: Live Cost Breakdown -->
        <div class="calc-summary">
          <div>
            <span class="badge badge-cyan">РОЗРАХУНОК ТЕХНОВОВК</span>
            <div style="font-size:12px; font-family:var(--font-mono); color:var(--text-muted); margin-top:8px;">Орієнтовна вартість ремонту:</div>
            <div class="total-price" id="calc-total-display">~650 ₴</div>

            <div style="border-top:1px solid rgba(255,255,255,0.1); padding-top:14px; margin-top:14px; font-size:13px; space-y:8px;">
              <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
                <span style="color:var(--text-muted);">Робота інженера:</span>
                <span id="calc-labor-cost" style="font-weight:700;">350 ₴</span>
              </div>
              <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
                <span style="color:var(--text-muted);">Комплектуючі та деталі:</span>
                <span id="calc-parts-cost" style="font-weight:700;">від 300 ₴</span>
              </div>
              <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
                <span style="color:var(--text-muted);">Повна діагностика:</span>
                <span style="color:var(--emerald); font-weight:700;">0 ₴ (БЕЗКОШТОВНО)</span>
              </div>
              <div style="display:flex; justify-content:space-between;">
                <span style="color:var(--text-muted);">Офіційна гарантія:</span>
                <span style="font-weight:700;">12 місяців на бланку</span>
              </div>
            </div>
          </div>

          <div style="margin-top:24px;">
            <button onclick="bookWithCalculatedPrice()" class="btn btn-primary" style="width:100%;">
              <span>Зафіксувати ціну та викликати майстра ↗</span>
            </button>
            <div style="text-align:center; font-size:11px; color:var(--text-muted); margin-top:8px;">
              Жодних прихованих доплат після завершення роботи
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- FEATURE 4: Interactive Kharkiv District Coverage -->
  <section id="districts" class="section">
    <div class="container">
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:36px; align-items:center;">
        <div>
          <div class="badge badge-cyan" style="margin-bottom:12px;">ЛОКАЦІЯ ТА ЧЕРГУВАННЯ</div>
          <h2 class="section-title">Працюємо по всьому Харкову та передмістю</h2>
          <p style="color:#cbd5e1; font-size:15px; line-height:1.6; margin-bottom:18px;">
            Головна майстерня розташована за адресою: <strong>м. Харків, проспект Героїв Харкова, 35 (61050)</strong>. Мобільні інженери чергують у кожному районі міста, маючи при собі повний набір діагностичного обладнання та ходових запчастин.
          </p>

          <div class="districts-grid">
            <div class="district-item">
              <div><b>Салтівка</b><div style="font-size:11px; color:var(--text-muted);">602, 533, Північна</div></div>
              <span class="badge badge-emerald">~35 хв</span>
            </div>
            <div class="district-item">
              <div><b>Олексіївка</b><div style="font-size:11px; color:var(--text-muted);">пр. Перемоги, Клочківська</div></div>
              <span class="badge badge-emerald">~40 хв</span>
            </div>
            <div class="district-item">
              <div><b>Центр & Шевченківський</b><div style="font-size:11px; color:var(--text-muted);">Сумська, пр. Науки</div></div>
              <span class="badge badge-emerald">~25 хв</span>
            </div>
            <div class="district-item">
              <div><b>Холодна Гора</b><div style="font-size:11px; color:var(--text-muted);">Полтавський Шлях, Баварія</div></div>
              <span class="badge badge-emerald">~35 хв</span>
            </div>
            <div class="district-item">
              <div><b>Нові Будинки & ХТЗ</b><div style="font-size:11px; color:var(--text-muted);">пр. Героїв Харкова, Немишля</div></div>
              <span class="badge badge-emerald">~25 хв</span>
            </div>
            <div class="district-item">
              <div><b>Передмістя</b><div style="font-size:11px; color:var(--text-muted);">Пісочин, Дергачі, Покотилівка</div></div>
              <span class="badge badge-cyan">~50 хв</span>
            </div>
          </div>
        </div>

        <!-- Google Maps Callout Box -->
        <div class="card" style="border-color:rgba(249,115,22,0.3); padding:32px;">
          <div style="display:flex; align-items:center; gap:16px; margin-bottom:20px;">
            <div style="width:52px; height:52px; border-radius:14px; background:#000; border:2px solid var(--orange); overflow:hidden; flex-shrink:0;">
              <img src="assets/images/technovovk-logo.jpg" alt="" style="width:100%; height:100%; object-fit:cover;" />
            </div>
            <div>
              <h3 style="font-size:20px; font-weight:800;">Сервісний центр ТЕХНОVOVK</h3>
              <div style="font-size:12px; color:var(--text-muted);">Рейтинг 5.0 на Google Картах на основі сотень відгуків</div>
            </div>
          </div>

          <div style="background:rgba(255,255,255,0.03); border-radius:14px; padding:18px; margin-bottom:20px; font-size:13px; line-height:1.6;">
            <div>📍 <strong>Адреса:</strong> проспект Героїв Харкова, 35, Харків, 61050</div>
            <div>📞 <strong>Телефон:</strong> 063 881 2785</div>
            <div>🕒 <strong>Режим роботи:</strong> Понеділок – Субота 09:00 – 17:00</div>
            <div>🏠 <strong>Послуга:</strong> Виїзд майстра додому + прийом у майстерні</div>
          </div>

          <a href="https://maps.app.goo.gl/ZJYEg6JSiCwZZdsa7" target="_blank" rel="noopener noreferrer" class="btn btn-secondary" style="width:100%;">
            <span>Відкрити в додатку Google Maps ↗</span>
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- About Section -->
  <section id="about" class="section" style="border-top:1px solid var(--border-color);">
    <div class="container">
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:40px; align-items:center;">
        <div style="border-radius:24px; overflow:hidden; border:1px solid var(--border-color); max-height:460px;">
          <img src="assets/images/technician-about.jpg" alt="Майстер ТехноVovk" style="width:100%; height:460px; object-fit:cover; display:block;" />
        </div>

        <div>
          <div class="badge" style="margin-bottom:12px;">ФІЛОСОФІЯ СЕРВІСУ</div>
          <h2 class="section-title">Чому ми ремонтуємо замість купівлі нової?</h2>
          <p style="color:#cbd5e1; font-size:15px; line-height:1.6; margin-bottom:18px;">
            Сучасна побутова техніка збирається надійними вузлами. Коли прилад зупиняється, у 90% випадків з ладу виходить лише один компонент: нагрівальний ТЕН, пускове реле, щітки двигуна чи зношений сальник.
          </p>
          <p style="color:#94a3b8; font-size:14px; line-height:1.6; margin-bottom:24px;">
            Заміна цієї деталі повертає приладу заводський ресурс на роки наперед — за ціну, що становить лише 10-20% від вартості нового аналогічного приладу в магазині. Ми проводимо чесну діагностику і не нав'язуємо зайвих робіт.
          </p>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px;">
            <div class="card" style="padding:16px;">
              <div style="font-size:20px; font-weight:800; color:var(--orange-light);">01</div>
              <div style="font-weight:700; font-size:13px; margin:4px 0;">Без переплат</div>
              <div style="font-size:11px; color:var(--text-muted);">Фіксуємо прайс до початку розбирання техніки.</div>
            </div>
            <div class="card" style="padding:16px;">
              <div style="font-size:20px; font-weight:800; color:var(--cyan);">02</div>
              <div style="font-weight:700; font-size:13px; margin:4px 0;">Гарантія до 1 року</div>
              <div style="font-size:11px; color:var(--text-muted);">Офіційний акт із печаткою на бланку сервісу.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Real Reviews Section -->
  <section id="reviews" class="section" style="background:rgba(255,255,255,0.01); border-top:1px solid var(--border-color);">
    <div class="container">
      <div style="text-align:center; max-width:600px; margin:0 auto 36px;">
        <div class="badge badge-emerald" style="margin-bottom:10px;">РЕАЛЬНІ ВІДГУКИ ХАРКІВ'ЯН</div>
        <h2 class="section-title">Що про нас кажуть клієнти</h2>
        <p class="section-desc" style="margin:0 auto;">Відгуки мешканців Харкова з Google Maps, чию техніку ми повернули до ідеального стану.</p>
      </div>

      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(320px, 1fr)); gap:20px;">
        <div class="card">
          <div style="color:var(--amber); margin-bottom:8px;">★★★★★</div>
          <p style="font-size:14px; color:#e2e8f0; line-height:1.6; margin-bottom:14px;">
            «Пральна машина LG перестала зливати воду, зависла з повним баком. Майстер приїхав через 40 хвилин на Салтівку, вилучив монету з крильчатки помпи і все налагодив. Швидко, чесно і недорого. Дякую!»
          </p>
          <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid var(--border-color); padding-top:10px;">
            <div><b>Олександр М.</b><div style="font-size:11px; color:var(--text-muted);">вул. Валентинівська, Салтівка</div></div>
            <span class="badge badge-emerald">Ремонт помпи</span>
          </div>
        </div>

        <div class="card">
          <div style="color:var(--amber); margin-bottom:8px;">★★★★★</div>
          <p style="font-size:14px; color:#e2e8f0; line-height:1.6; margin-bottom:14px;">
            «Холодильник Samsung No Frost перестав охолоджувати верхню камеру. Інженер ТехноVovk оперативно приїхав на пр. Героїв Харкова, перевірив датчик відтайки, замінив за годину. Ціна точна за прайсом!»
          </p>
          <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid var(--border-color); padding-top:10px;">
            <div><b>Вікторія Д.</b><div style="font-size:11px; color:var(--text-muted);">пр. Героїв Харкова</div></div>
            <span class="badge badge-cyan">Датчик No Frost</span>
          </div>
        </div>

        <div class="card">
          <div style="color:var(--amber); margin-bottom:8px;">★★★★★</div>
          <p style="font-size:14px; color:#e2e8f0; line-height:1.6; margin-bottom:14px;">
            «Здали кавомашину DeLonghi — перестала молоти зерна і протікала вода в піддон. Зробили повне ТО, декальцинацію та заміну кілець за 1 день. Працює як нова з магазину!»
          </p>
          <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid var(--border-color); padding-top:10px;">
            <div><b>Сергій К.</b><div style="font-size:11px; color:var(--text-muted);">Олексіївка</div></div>
            <span class="badge badge-emerald">ТО Кавомашини</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer id="contact" style="background:#05080f; border-top:1px solid var(--border-color); padding:60px 0 30px;">
    <div class="container">
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:40px; margin-bottom:40px;">
        
        <div>
          <div style="display:flex; align-items:center; gap:12px; margin-bottom:16px;">
            <div style="width:40px; height:40px; border-radius:10px; overflow:hidden; border:2px solid var(--orange); background:#000;">
              <img src="assets/images/technovovk-logo.jpg" alt="" style="width:100%; height:100%; object-fit:cover;" />
            </div>
            <b style="font-family:var(--font-display); font-size:20px;">ТЕХНО<span class="text-orange">VOVK</span></b>
          </div>
          <p style="font-size:13px; color:var(--text-muted); line-height:1.6; margin-bottom:16px;">
            Сервісний центр ремонту побутової техніки в Харкові. Офіційна гарантія, кваліфіковані інженери та виїзд майстра в будь-який район міста.
          </p>
          <div style="font-family:var(--font-mono); font-size:12px; color:var(--emerald);">
            ● Приймаємо заявки щодня
          </div>
        </div>

        <div>
          <h4 style="font-size:14px; text-transform:uppercase; font-family:var(--font-mono); color:var(--orange-light); margin-bottom:16px;">Контакти у Харкові</h4>
          <div style="font-size:13px; color:#cbd5e1; space-y:8px; line-height:1.8;">
            <div>📍 <strong>Адреса:</strong> проспект Героїв Харкова, 35 (61050)</div>
            <div>📞 <strong>Телефон:</strong> <a href="tel:+380638812785" style="color:#fff; text-decoration:none; font-weight:700;">063 881 2785</a></div>
            <div>🕒 <strong>Графік:</strong> Пн-Сб 09:00 – 17:00 (Виїзди майстрів до 20:00)</div>
            <div>✉️ <strong>E-mail:</strong> service@technovovk.kh.ua</div>
          </div>
        </div>

        <div>
          <h4 style="font-size:14px; text-transform:uppercase; font-family:var(--font-mono); color:var(--cyan); margin-bottom:16px;">Швидка навігація</h4>
          <div style="display:flex; flex-direction:column; gap:8px; font-size:13px;">
            <a href="#diagnostic" style="color:var(--text-muted); text-decoration:none;">Експрес-діагностика несправностей</a>
            <a href="#calculator" style="color:var(--text-muted); text-decoration:none;">Калькулятор вартості робіт</a>
            <a href="#services" style="color:var(--text-muted); text-decoration:none;">Каталог техніки з цінами</a>
            <a href="#districts" style="color:var(--text-muted); text-decoration:none;">Райони чергування майстрів</a>
            <a href="../fixora/" style="color:var(--amber); text-decoration:none;">⚡ Fixora (Альтернативний жовтий дизайн)</a>
            <a href="../" style="color:#fff; text-decoration:none;">← Повернутися на arch1cat.site</a>
          </div>
        </div>

      </div>

      <div style="border-top:1px solid var(--border-color); padding-top:20px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; font-size:12px; color:var(--text-muted); font-family:var(--font-mono);">
        <div>© 2026 Сервісний центр ТЕХНОVOVK. Всі права захищено. Харків, Україна.</div>
        <div>Розробка та дизайн: arch1cat.site</div>
      </div>
    </div>
  </footer>

  <!-- Booking Modal Window -->
  <div class="modal-overlay" id="booking-modal">
    <div class="modal-window">
      <button class="modal-close" onclick="closeBookingModal()">✕</button>

      <div style="margin-bottom:20px;">
        <span class="badge badge-emerald">ОНЛАЙН ЗАЯВКА</span>
        <h3 style="font-size:22px; font-weight:800; margin-top:8px;">Викликати інженера ТехноVovk</h3>
        <p style="font-size:12px; color:var(--text-muted); margin-top:4px;">Диспетчер зв'яжеться з вами протягом 3-5 хвилин для уточнення деталей.</p>
      </div>

      <form id="modal-form" onsubmit="handleFormSubmit(event)">
        <div style="margin-bottom:14px;">
          <label class="calc-label">Ваше ім'я</label>
          <input type="text" id="m-name" class="calc-input" placeholder="Олександр або Наталія" required />
        </div>

        <div style="margin-bottom:14px;">
          <label class="calc-label">Номер телефону</label>
          <input type="tel" id="m-phone" class="calc-input" placeholder="063 881 2785 або +380..." required />
        </div>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:14px;">
          <div>
            <label class="calc-label">Тип техніки</label>
            <select id="m-device" class="calc-select">
              <option>Пральна машина</option>
              <option>Холодильник</option>
              <option>Кавомашина</option>
              <option>Мікрохвильовка</option>
              <option>Пилосос</option>
              <option>Мультиварка</option>
              <option>Духова шафа / Плита</option>
              <option>Бойлер</option>
              <option>Електронна плата</option>
            </select>
          </div>
          <div>
            <label class="calc-label">Район Харкова</label>
            <select id="m-district" class="calc-select">
              <option>Салтівка</option>
              <option>Олексіївка</option>
              <option>Центр / Шевченківський</option>
              <option>Холодна Гора</option>
              <option>Павлове Поле</option>
              <option>Нові Будинки / ХТЗ</option>
              <option>Передмістя</option>
            </select>
          </div>
        </div>

        <div style="margin-bottom:20px;">
          <label class="calc-label">Що саме трапилося? (за бажанням)</label>
          <input type="text" id="m-issue" class="calc-input" placeholder="Наприклад: не крутить барабан, код помилки..." />
        </div>

        <button type="submit" class="btn btn-primary" style="width:100%; padding:14px;">
          <span>Підтвердити виклик майстра ↗</span>
        </button>

        <div id="modal-success" style="display:none; text-align:center; padding:16px; margin-top:14px; background:rgba(16,185,129,0.15); border:1px solid var(--emerald); border-radius:12px; color:#fff; font-size:13px; font-weight:700;">
          ✓ Заявку прийнято! Майстер телефонує...
        </div>
      </form>
    </div>
  </div>

  <!-- Interactive JavaScript Engine -->
  <script>
    // 1. Data Models for Services
    const SERVICES_DATA = [
      {
        id: 'washer',
        category: 'large',
        title: 'Ремонт пральних та сушильних машин',
        desc: 'Заміна підшипників, насосів, нагрівальних ТЕНів, амортизаторів, ліквідація шуму та вібрації на віджимі.',
        price: 'від 350 ₴',
        time: '30-60 хв',
        image: 'assets/images/washer-modern.jpg',
        tags: ['Bosch', 'Samsung', 'LG', 'Whirlpool']
      },
      {
        id: 'fridge',
        category: 'large',
        title: 'Ремонт холодильників та морозильників No Frost',
        desc: 'Усунення витоків фреону R600a, заміна інверторних компресорів, датчиків відтайки, вентиляторів та заслінок.',
        price: 'від 450 ₴',
        time: '45-90 хв',
        image: 'assets/images/fridge-modern.jpg',
        tags: ['Samsung', 'Liebherr', 'Bosch', 'Beko']
      },
      {
        id: 'coffee',
        category: 'small',
        title: 'Ремонт та сервіс кавомашин',
        desc: 'Промивання від накипу, заміна ущільнювачів, перебирання заварювального блоку, ремонт гідросистеми та жорен.',
        price: 'від 350 ₴',
        time: '1-2 дні',
        image: 'assets/images/coffee-modern.jpg',
        tags: ['DeLonghi', 'Philips', 'Saeco', 'Jura']
      },
      {
        id: 'microwave',
        category: 'kitchen',
        title: 'Ремонт мікрохвильових печей (НВЧ)',
        desc: 'Заміна магнетрона, високовольтного конденсатора, діода, слюдяної пластини, ремонт сенсорних панелей.',
        price: 'від 250 ₴',
        time: '30-45 хв',
        image: 'assets/images/microwave-modern.jpg',
        tags: ['Samsung', 'LG', 'Panasonic', 'Gorenje']
      },
      {
        id: 'vacuum',
        category: 'small',
        title: 'Ремонт пилососів та роботів-пилососів',
        desc: 'Заміна двигунів турбіни, лідарів, акумуляторів, чистка плати після потрапляння вологи, заміна щіток.',
        price: 'від 280 ₴',
        time: '1 день',
        image: 'assets/images/vacuum-modern.jpg',
        tags: ['Xiaomi', 'Roborock', 'Dyson', 'Samsung']
      },
      {
        id: 'multicooker',
        category: 'kitchen',
        title: 'Ремонт мультиварок та кухонних комбайнів',
        desc: 'Заміна термозапобіжників, нагрівального диску, клапанів тиску, датчиків кришки та системних плат.',
        price: 'від 220 ₴',
        time: '40 хв',
        image: 'assets/images/multicooker-modern.jpg',
        tags: ['Redmond', 'Moulinex', 'Philips', 'Tefal']
      },
      {
        id: 'dishwasher',
        category: 'large',
        title: 'Ремонт посудомийних машин',
        desc: 'Ліквідація протікань Aquastop (E15), ремонт циркуляційного насоса, нагрівального блоку, чистка тракту.',
        price: 'від 400 ₴',
        time: '1 година',
        image: 'assets/images/dishwasher-modern.jpg',
        tags: ['Bosch', 'Siemens', 'Electrolux', 'Beko']
      },
      {
        id: 'cooktop',
        category: 'kitchen',
        title: 'Ремонт духових шаф та індукційних плит',
        desc: 'Заміна конфорок, силових транзисторів індукції, перемикачів режимів, термостатів конвекції та скла.',
        price: 'від 380 ₴',
        time: '1 година',
        image: 'assets/images/cooktop-modern.jpg',
        tags: ['Electrolux', 'Bosch', 'Gorenje', 'Hansa']
      },
      {
        id: 'boiler',
        category: 'large',
        title: 'Чистка та ремонт бойлерів',
        desc: 'Очищення від вапняного накипу, заміна магнієвого анода, «сухих» та «мокрих» ТЕНів, зворотних клапанів.',
        price: 'від 300 ₴',
        time: '1 година',
        image: 'assets/images/boiler-modern.jpg',
        tags: ['Atlantic', 'Ariston', 'Tesy', 'Garanterm']
      },
      {
        id: 'board',
        category: 'electronics',
        title: 'Ремонт електронних модулів та плат',
        desc: 'Компонентний ремонт плат керування, перепрошивка мікроконтролерів, заміна реле, симісторів та живлення.',
        price: 'від 450 ₴',
        time: '1 день',
        image: 'assets/images/board-modern.jpg',
        tags: ['Всі бренди', 'Діагностика осцилографом']
      }
    ];

    // 2. Diagnostic Assistant Data
    const DIAGNOSTIC_MAP = {
      washer: {
        name: '🧺 Пральна машина',
        symptoms: [
          { text: 'Гримить на віджимі', cause: 'Знос підшипникового вузла або пошкодження сальника', price: 'від 650 ₴', time: '1.5 год' },
          { text: 'Не зливає воду', cause: 'Засмічення зливного фільтра або поломка помпи зливу', price: 'від 350 ₴', time: '30 хв' },
          { text: 'Не нагріває воду', cause: 'Перегорання трубчастого ТЕНу або вихід з ладу датчика NTC', price: 'від 450 ₴', time: '40 хв' },
          { text: 'Вибиває автомат', cause: 'Пробій ТЕНу на корпус або коротке замикання в фільтрі перешкод', price: 'від 400 ₴', time: '45 хв' },
          { text: 'Блимає помилка', cause: 'Збій датчика рівня (пресостата) або модуля керування', price: 'від 450 ₴', time: '1 год' }
        ]
      },
      fridge: {
        name: '🧊 Холодильник',
        symptoms: [
          { text: 'Не охолоджує верхня камера', cause: 'Перемерзання каналу No Frost, поломка датчика відтайки чи заслінки', price: 'від 550 ₴', time: '1 год' },
          { text: 'Працює без зупинки', cause: 'Мікровитік фреону або втрата продуктивності компресора', price: 'від 750 ₴', time: '1.5 год' },
          { text: 'Намерзає шуба в камері', cause: 'Знос магнітного ущільнювача дверей або ТЕНу випарника', price: 'від 400 ₴', time: '45 хв' },
          { text: 'Клацає і не запускається', cause: 'Вихід з ладу пускозахисного реле компресора', price: 'від 450 ₴', time: '30 хв' }
        ]
      },
      coffee: {
        name: '☕ Кавомашина',
        symptoms: [
          { text: 'Не меле зерна', cause: 'Блокування або знос жорен кавомолки', price: 'від 380 ₴', time: '1 день' },
          { text: 'Кава тече повільно / капає', cause: 'Сильне накипоутворення в гідротракті або засмічення крема-клапана', price: 'від 350 ₴', time: '1 день' },
          { text: 'Вода в піддоні', cause: 'Знос кілець заварювального вузла чи тефлонової трубки бойлера', price: 'від 300 ₴', time: '1 день' }
        ]
      },
      microwave: {
        name: '⚡ Мікрохвильовка',
        symptoms: [
          { text: 'Крутить, але не гріє', cause: 'Перегорання високовольтного запобіжника або вихід магнетрона з ладу', price: 'від 300 ₴', time: '30 хв' },
          { text: 'Іскрить всередині', cause: 'Прогорання слюдяної пластини та ковпачка магнетрона', price: 'від 250 ₴', time: '20 хв' },
          { text: 'Не крутиться тарілка', cause: 'Вихід з ладу мікромотора піддону або поломка муфти', price: 'від 220 ₴', time: '25 хв' }
        ]
      },
      vacuum: {
        name: '🧹 Пилосос',
        symptoms: [
          { text: 'Пахне горілим / гуде', cause: 'Знос графітових щіток або заклинювання підшипника крильчатки двигуна', price: 'від 350 ₴', time: '1 день' },
          { text: 'Робот кружляє на місці', cause: 'Забруднення або поломка оптичного датчика падіння / лідара', price: 'від 300 ₴', time: '1 день' },
          { text: 'Швидко розряджається', cause: 'Деградація акумуляторних елементів 18650 у батареї', price: 'від 450 ₴', time: '1 день' }
        ]
      }
    };

    let selectedDiagDevice = 'washer';
    let selectedDiagSymptomIndex = 0;

    // Render Diagnostic Devices
    function initDiagnostic() {
      const devContainer = document.getElementById('diag-devices');
      devContainer.innerHTML = '';

      Object.keys(DIAGNOSTIC_MAP).forEach(key => {
        const item = DIAGNOSTIC_MAP[key];
        const btn = document.createElement('div');
        btn.className = `device-pill ${key === selectedDiagDevice ? 'selected' : ''}`;
        btn.textContent = item.name;
        btn.onclick = () => {
          selectedDiagDevice = key;
          selectedDiagSymptomIndex = 0;
          initDiagnostic();
        };
        devContainer.appendChild(btn);
      });

      // Render Symptoms
      const sympContainer = document.getElementById('diag-symptoms');
      sympContainer.innerHTML = '';
      const currentSymptoms = DIAGNOSTIC_MAP[selectedDiagDevice].symptoms;

      currentSymptoms.forEach((s, idx) => {
        const chip = document.createElement('div');
        chip.className = `symptom-chip ${idx === selectedDiagSymptomIndex ? 'selected' : ''}`;
        chip.textContent = s.text;
        chip.onclick = () => {
          selectedDiagSymptomIndex = idx;
          initDiagnostic();
        };
        sympContainer.appendChild(chip);
      });

      // Render Result Card
      const res = currentSymptoms[selectedDiagSymptomIndex];
      const resContainer = document.getElementById('diag-result');
      resContainer.innerHTML = `
        <div>
          <div style="font-size:11px; font-family:var(--font-mono); color:var(--orange-light); text-transform:uppercase;">Діагностичний висновок</div>
          <div style="font-size:16px; font-weight:800; color:#fff; margin-top:4px;">${res.cause}</div>
        </div>
        <div>
          <div style="font-size:11px; font-family:var(--font-mono); color:var(--text-muted); text-transform:uppercase;">Час усунення</div>
          <div style="font-size:15px; font-weight:700; color:var(--cyan); margin-top:2px;">⏱️ ${res.time}</div>
        </div>
        <div>
          <div style="font-size:11px; font-family:var(--font-mono); color:var(--text-muted); text-transform:uppercase;">Вартість робіт</div>
          <div style="font-size:18px; font-weight:900; color:var(--emerald); margin-top:2px;">${res.price}</div>
        </div>
        <div style="text-align:right;">
          <button onclick="bookSpecificIssue('${DIAGNOSTIC_MAP[selectedDiagDevice].name}', '${res.cause}')" class="btn btn-primary btn-sm">
            <span>Викликати майстра ↗</span>
          </button>
        </div>
      `;
    }

    // Render Services Grid
    function renderServices(filter = 'all') {
      const container = document.getElementById('services-container');
      container.innerHTML = '';

      const filtered = filter === 'all' 
        ? SERVICES_DATA 
        : SERVICES_DATA.filter(s => s.category === filter);

      filtered.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
          <div class="service-img-box">
            <img src="${item.image}" alt="${item.title}" />
            <div class="service-price-tag">${item.price}</div>
          </div>
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
            <span class="badge" style="font-size:10px;">${item.time}</span>
            <span style="font-size:11px; color:var(--emerald); font-weight:700;">✓ Запчастини в наявності</span>
          </div>
          <h3 style="font-size:18px; font-weight:800; margin-bottom:8px; line-height:1.3;">${item.title}</h3>
          <p style="font-size:13px; color:var(--text-muted); line-height:1.6; margin-bottom:16px;">${item.desc}</p>
          <div style="display:flex; flex-wrap:wrap; gap:6px; margin-bottom:18px;">
            ${item.tags.map(t => `<span style="font-size:11px; padding:2px 8px; border-radius:6px; background:rgba(255,255,255,0.05); color:#cbd5e1;">${t}</span>`).join('')}
          </div>
          <button onclick="openBookingModal('${item.title}')" class="btn btn-secondary btn-sm" style="width:100%; justify-content:space-between;">
            <span>Замовити ремонт</span>
            <span>↗</span>
          </button>
        `;
        container.appendChild(card);
      });
    }

    // Filter Buttons
    document.querySelectorAll('#catalog-filters .filter-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('#catalog-filters .filter-tab').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderServices(btn.dataset.filter);
      });
    });

    // Price Calculator Logic
    function calculatePrice() {
      const dev = document.getElementById('calc-device').value;
      const comp = document.getElementById('calc-complexity').value;
      const parts = document.getElementById('calc-parts').value;
      const urg = document.getElementById('calc-urgency').value;

      let baseLabor = 350;
      let partsCost = 300;

      if (dev === 'fridge' || dev === 'dishwasher') baseLabor = 450;
      if (dev === 'microwave' || dev === 'multicooker') baseLabor = 250;
      if (dev === 'board') baseLabor = 500;

      if (comp === 'light') { baseLabor *= 0.8; partsCost = 150; }
      if (comp === 'heavy') { baseLabor *= 1.6; partsCost = 800; }

      if (parts === 'oem') partsCost *= 1.35;
      if (urg === 'urgent') baseLabor += 150;

      const total = Math.round(baseLabor + partsCost);
      document.getElementById('calc-total-display').textContent = `~${total} ₴`;
      document.getElementById('calc-labor-cost').textContent = `${Math.round(baseLabor)} ₴`;
      document.getElementById('calc-parts-cost').textContent = `від ${Math.round(partsCost)} ₴`;
    }

    function bookWithCalculatedPrice() {
      const devText = document.getElementById('calc-device').selectedOptions[0].text;
      const priceText = document.getElementById('calc-total-display').textContent;
      openBookingModal(`${devText} (прораховано ${priceText})`);
    }

    function bookSpecificIssue(device, issue) {
      openBookingModal(`${device}: ${issue}`);
    }

    // Modal Control
    function openBookingModal(prefillIssue = '') {
      const modal = document.getElementById('booking-modal');
      modal.classList.add('active');
      if (prefillIssue) {
        document.getElementById('m-issue').value = prefillIssue;
      }
    }

    function closeBookingModal() {
      document.getElementById('booking-modal').classList.remove('active');
      document.getElementById('modal-success').style.display = 'none';
    }

    function handleFormSubmit(e) {
      e.preventDefault();
      const success = document.getElementById('modal-success');
      success.style.display = 'block';
      setTimeout(() => {
        closeBookingModal();
        e.target.reset();
      }, 2500);
    }

    // Initialize on load
    document.addEventListener('DOMContentLoaded', () => {
      initDiagnostic();
      renderServices('all');
      calculatePrice();
    });
  </script>

</body>
</html>
'''

with open('rempobut/index.html', 'w', encoding='utf-8') as f:
    f.write(html_content)

print('Generated brand-new bespoke rempobut/index.html!')
