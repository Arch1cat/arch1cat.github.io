import re

with open('rempobut/raw_webflow.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Update Title and Meta
html = re.sub(r'<title>.*?</title>', '<title>Feexaro Харків — Професійний ремонт побутової техніки вдома (Салтівка, Олексіївка, Центр)</title>', html, flags=re.DOTALL)
html = re.sub(r'<meta content=\"[^\"]*\" name=\"description\"/>', '<meta content=\"Терміновий ремонт побутової техніки вдома у Харкові. Пральні машини, холодильники No Frost, бойлери, посудомийки. Виїзд майстра за 45 хв у всі райони міста! Письмова гарантія 12 місяців.\" name=\"description\"/>', html)

# 2. Localize Assets: CSS, JS, Images
html = html.replace('https://cdn.prod.website-files.com/66fb7ffaa305fbe2c7667880/css/feexaro.webflow.shared.540f5f62e.css', 'assets/css/feexaro.css?v=6')
html = html.replace('https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=66fb7ffaa305fbe2c7667880', 'assets/js/jquery.min.js')
html = html.replace('https://cdn.prod.website-files.com/66fb7ffaa305fbe2c7667880/js/webflow.schunk.36b8fb49256177c8.js', 'assets/js/webflow.schunk.1.js')
html = html.replace('https://cdn.prod.website-files.com/66fb7ffaa305fbe2c7667880/js/webflow.schunk.069deba360a8cfd0.js', 'assets/js/webflow.schunk.2.js')
html = html.replace('https://cdn.prod.website-files.com/66fb7ffaa305fbe2c7667880/js/webflow.2ddc5b9f.a310b31fab81e0be.js', 'assets/js/webflow.js')
html = re.sub(r'https://cdn\.prod\.website-files\.com/66fb7ffaa305fbe2c7667880/([^\s\"\'\<\>\)]+)', r'assets/images/\1', html)
html = re.sub(r'https://cdn\.prod\.website-files\.com/66fb7ffaa305fbe2c76678b7/([^\s\"\'\<\>\)]+)', r'assets/images/\1', html)

# 3. Strip inline opacity:0 completely
html = re.sub(r'style=[\"\']\s*opacity\s*:\s*0\s*;?\s*[\"\']', '', html)
html = re.sub(r'style=[\"\']([^\"\']*?)\bopacity\s*:\s*0\s*;?([^\"\']*?)[\"\']', r'style="\1 \2"', html)

# 4. Remove Webflow badge
html = re.sub(r'<a[^>]*class=[\"\\\'][^\"\\\']*w-webflow-badge[^\"\\\']*[\"\\\'].*?</a>', '', html, flags=re.DOTALL)

# 5. Top Utility Bar: add Kharkiv info and links
top_bar_kharkiv = '''
<div style="background:#041f39; color:#fff; font-size:12px; font-weight:600; padding:10px 20px; border-bottom:1px solid rgba(255,255,255,0.1); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
  <div style="display:flex; align-items:center; gap:20px; flex-wrap:wrap;">
    <span>🕒 Прийом заявок: <strong>08:00 – 21:00 без вихідних</strong></span>
    <span style="opacity:0.85;">🛡️ Письмова гарантія <strong>до 12 місяців</strong></span>
    <span style="color:#008cf0;">📍 Харків: Салтівка · Олексіївка · Павлове Поле · Холодна Гора · Центр</span>
  </div>
  <div style="display:flex; align-items:center; gap:10px;">
    <a href="../" class="nav-back-pill">← arch1cat.site</a>
    <a href="../fixora/" class="nav-fixora-pill">⚡ Fixora Харків</a>
  </div>
</div>
'''
html = html.replace('<div class="header-main">', top_bar_kharkiv + '\n<div class="header-main">')

# 6. Replace Entire About Section with bulletproof, pixel-perfect 2-column layout
about_section_clean = '''
<section id="about" style="padding: 90px 20px; background: #fff;">
  <div style="max-width: 1240px; margin: 0 auto;">
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 50px; align-items: center;">
      
      <!-- Left Column: Authentic Technician Photograph with 15+ Years Badge -->
      <div style="position: relative; border-radius: 28px; overflow: hidden; box-shadow: 0 20px 45px rgba(4,31,57,0.14); min-height: 520px; background: #f0f4f8;">
        <img 
          src="assets/images/66fbc5a35f5d42386fff65f2_Home1-About-Img.jpg" 
          alt="Сервісний інженер Feexaro Харків за роботою" 
          style="width: 100%; height: 520px; object-fit: cover; object-position: center top; display: block;"
        />
        
        <!-- Curved Shape Deco at bottom-right corner -->
        <img 
          src="assets/images/66fbc54d5bba9ad12d8e4db2_Shape-img.png" 
          alt="" 
          style="position: absolute; bottom: 0; right: 0; pointer-events: none; width: 140px; opacity: 0.9;"
        />
        
        <!-- Authentic Feexaro 15+ Years Floating Badge -->
        <div style="position: absolute; bottom: 24px; left: 24px; background: #041f39; color: #fff; padding: 20px 26px; border-radius: 20px; box-shadow: 0 12px 30px rgba(0,0,0,0.35); border: 1px solid rgba(255,255,255,0.12); z-index: 10; max-width: 250px;">
          <div style="font-size: 42px; font-weight: 900; color: #008cf0; line-height: 1; letter-spacing: -0.02em;">15+</div>
          <div style="font-size: 14px; font-weight: 800; color: #fff; margin-top: 6px; line-height: 1.3;">Років надійного сервісу в Харкові</div>
          <div style="font-size: 11px; color: #94a3b8; margin-top: 4px;">Понад 32 000 успішних ремонтів</div>
        </div>
      </div>

      <!-- Right Column: Heading, Story & Checklist -->
      <div style="display: flex; flex-direction: column; gap: 20px;">
        <div style="display: inline-block;">
          <span style="background: rgba(0, 140, 240, 0.1); color: #008cf0; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; padding: 6px 14px; border-radius: 999px;">
            НАШ ДОСВІД ТА СТАНДАРТИ
          </span>
        </div>

        <h2 style="font-size: clamp(28px, 4vw, 42px); font-weight: 800; color: #041f39; line-height: 1.25; margin: 0;">
          Дбаємо про вашу техніку, <br/>
          <span style="color: #008cf0;">повертаючи затишок у харківський дім</span>
        </h2>

        <p style="font-size: 15px; line-height: 1.65; color: #5a6872; margin: 0;">
          З 2009 року сервісний центр <strong>Feexaro Харків</strong> спеціалізується на професійному відновленні пральних машин, холодильників No Frost, бойлерів, посудомийок та варильних поверхонь. Ми не використовуємо тимчасові «латки» — мобільні майстри у кожному районі Харкова мають повний арсенал оригінальних запчастин і тестерів для усунення першопричини поломки за один візит.
        </p>

        <!-- 4 Authentic Checkpoints with SVG Icons -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 14px; margin-top: 10px;">
          
          <div style="display: flex; align-items: flex-start; gap: 12px; background: #f8fafc; padding: 14px 16px; border-radius: 14px; border: 1px solid #e2e8f0;">
            <svg style="width: 20px; height: 20px; color: #008cf0; shrink: 0; margin-top: 2px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <div>
              <div style="font-size: 13px; font-weight: 800; color: #041f39;">Власний склад деталей</div>
              <div style="font-size: 11px; color: #64748b; margin-top: 2px;">8 000+ запчастин Bosch, Samsung, LG</div>
            </div>
          </div>

          <div style="display: flex; align-items: flex-start; gap: 12px; background: #f8fafc; padding: 14px 16px; border-radius: 14px; border: 1px solid #e2e8f0;">
            <svg style="width: 20px; height: 20px; color: #008cf0; shrink: 0; margin-top: 2px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <div>
              <div style="font-size: 13px; font-weight: 800; color: #041f39;">Письмова гарантія</div>
              <div style="font-size: 11px; color: #64748b; margin-top: 2px;">Офіційний акт із печаткою до 12 міс</div>
            </div>
          </div>

          <div style="display: flex; align-items: flex-start; gap: 12px; background: #f8fafc; padding: 14px 16px; border-radius: 14px; border: 1px solid #e2e8f0;">
            <svg style="width: 20px; height: 20px; color: #008cf0; shrink: 0; margin-top: 2px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <div>
              <div style="font-size: 13px; font-weight: 800; color: #041f39;">Точна діагностика</div>
              <div style="font-size: 11px; color: #64748b; margin-top: 2px;">0 грн при ремонті, цифрові тестери</div>
            </div>
          </div>

          <div style="display: flex; align-items: flex-start; gap: 12px; background: #f8fafc; padding: 14px 16px; border-radius: 14px; border: 1px solid #e2e8f0;">
            <svg style="width: 20px; height: 20px; color: #008cf0; shrink: 0; margin-top: 2px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <div>
              <div style="font-size: 13px; font-weight: 800; color: #041f39;">Охайність майстрів</div>
              <div style="font-size: 11px; color: #64748b; margin-top: 2px;">Працюємо у бахілах, повна чистота</div>
            </div>
          </div>

        </div>

        <!-- CTA Button -->
        <div style="margin-top: 14px;">
          <a href="#contact" class="button-link w-inline-block" style="display: inline-flex; align-items: center; text-decoration: none; border-radius: 999px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,140,240,0.3);">
            <div style="background-color: #041f39; color: #fff; padding: 14px 28px; font-size: 13px; font-weight: 800; text-transform: uppercase;">
              Викликати майстра
            </div>
            <div style="background-color: #008cf0; padding: 14px 16px; display: flex; align-items: center; justify-content: center;">
              <img width="12" height="12" alt="↗" src="assets/images/66fb7ffaa305fbe2c766794a_white-arrow.svg" style="display: block;"/>
            </div>
          </a>
        </div>

      </div>

    </div>
  </div>
</section>
'''

# Find and replace the old about section
html = re.sub(r'<section>\s*<div class=\"w-layout-blockcontainer container w-container\">\s*<div class=\"about-one-column.*?</div>\s*</div>\s*</div>\s*</section>', about_section_clean, html, flags=re.DOTALL)

# 7. Hero Slide H1 and Text Replacements
html = re.sub(r'Professional\s*&amp;.*?Quality Service', 'Професійний &amp;<br/>Швидкий Сервіс', html, flags=re.DOTALL)
html = html.replace('&nbsp;Trusted plumbers', 'НАДІЙНИЙ СЕРВІС ПОБУТОВОЇ ТЕХНІКИ У ХАРКОВІ')
html = html.replace('Expert plumbing, heating, and drain services with decades of experience.', 'Терміновий виїзд майстра по Харкову за 45 хвилин: Салтівка, Олексіївка, Центр, Холодна Гора. Ремонт пральних машин, холодильників No Frost, бойлерів та плит вдома.')
html = re.sub(r'Mastering the.*?art of plumbing', 'Майстри з досвідом<br/>понад 12 років', html, flags=re.DOTALL)
html = html.replace('Plumbing carried out uniquely', '100% ОРИГІНАЛЬНІ ЗАПЧАСТИНИ')
html = re.sub(r'Innovators of.*?flawless plumbing\.?', 'Діагностика 0 ₴<br/>при ремонті техніки', html, flags=re.DOTALL)
html = html.replace('The plumbing specialists', 'ВИЇЗД У ДЕНЬ ЗВЕРНЕННЯ ПО ХАРКОВУ')
html = re.sub(r'>Our Service<', '>НАШІ ПОСЛУГИ<', html)

# 8. Feature boxes
features = [
    ('Highly skilled team', 'Сертифіковані майстри'),
    ('Positive reputation', 'Бездоганна репутація'),
    ('Fast and reliable', 'Виїзд за 45 хвилин'),
    ('24/7 availability', 'Чесна фіксована ціна'),
]
for old_t, new_t in features:
    html = html.replace(old_t, new_t)
html = re.sub(r'Skilled, certified and continuously educated plumbers.*?corrupti\.', 'Досвід роботи від 7 років, атестація виробників Bosch, Samsung, LG. Швидкий виїзд у всі райони Харкова.', html)

# 9. Marquee ticker
html = re.sub(r'<div class=\"marquee-text\">Changing rooms</div>', '<div class=\"marquee-text\">ПРАЛЬНІ МАШИНИ ✦ ХОЛОДИЛЬНИКИ ✦ БОЙЛЕРИ ✦ ПОСУДОМИЙКИ ✦ ВАРИЛЬНІ ПЛИТИ ✦ ДУХОВКИ</div>', html)

# 10. Services Section
html = html.replace('Remodeling Service', 'Ремонт пральних та сушильних машин')
html = html.replace('Виїзд за 45 хвилин', 'Ремонт холодильників No Frost')
html = html.replace('Installation &amp; Replace', 'Чистка та ремонт бойлерів')
html = re.sub(r'General plumbing includes piping, toilet installation &amp; washers\.', 'Заміна підшипників, насосів, нагрівальних ТЕНів, амортизаторів, ліквідація шуму та вібрації. Від 350 ₴.', html)
html = html.replace('>More Detail<', '>Замовити ремонт ↗<')

# 11. Process Section
html = html.replace('What to Expect', 'ЯК МИ ПРАЦЮЄМО')
html = re.sub(r'Easy 4-step efficient.*?service process', 'Простий та прозорий 4-кроковий процес ремонту', html, flags=re.DOTALL)
html = html.replace('Get a quote', '01. Заявка або дзвінок')
html = html.replace('Schedule Service', '02. Виїзд та діагностика')
html = html.replace('Repairing Process', '03. Фіксація вартості')
html = html.replace('Final walkthrough', '04. Ремонт і гарантія 12 міс')
html = re.sub(r'Reliable affordable and expert plumbing services for all needs\.', 'Швидкий приїзд інженера за 45 хв, оригінальні комплектуючі та письмовий гарантійний талон.', html)

# 12. Testimonials
html = html.replace('Arnold Wilson', 'Оксана Мельничук')
html = html.replace('Anais Emmerich', 'Тарас Гринишин')
html = html.replace('Ariella Olive', 'Валерій Коваленко')
html = html.replace('Client, USA', 'м. Харків (Салтівка, 602 мкр)')

# 13. Contact & Footer
html = html.replace('+ 1(212) 255-511', '+38 (057) 750-20-26')
html = html.replace('+1 800 123 456 789', '+38 (050) 840-20-26')
html = html.replace('Get A Quate', 'Викликати майстра')
html = html.replace('Get in touch', 'ШВИДКИЙ ВИКЛИК')
html = html.replace('Get your free estimate!', 'Замовте виїзд майстра зі знижкою 15%')
html = html.replace('Fill out the form below to receive a personalized quote tailored to your needs.', 'Залиште ваш номер — черговий диспетчер зателефонує протягом 3 хвилин для узгодження візиту.')
html = html.replace('123 Plumbing St, Suite 456, Cityville, USA', 'м. Харків, вул. Сумська, 102 (виїзд по всьому місту)')
html = html.replace('info@feexaro.com', 'service@feexaro-kharkiv.ua')
html = html.replace('Reliable, skilled, and dedicated to exceptional plumbing services.', 'Спеціалізований сервісний центр із ремонту пральних машин, холодильників No Frost, посудомийок та бойлерів. Чергові майстри у кожному районі Харкова.')
html = html.replace('Subscribe to our newsletter for tips and offers.', 'Введіть номер телефону для швидкої консультації майстра:')
html = html.replace('placeholder="Your Name"', 'placeholder="Ваше ім\'я"')
html = html.replace('placeholder="Your Email"', 'placeholder="Ваш район Харкова (напр. Салтівка)"')
html = html.replace('placeholder="Your Phone Number"', 'placeholder="+38 (050) 000-00-00"')
html = html.replace('placeholder="Write Your Message"', 'placeholder="Опишіть, що трапилося з технікою..."')
html = html.replace('value="Submit Message"', 'value="Викликати майстра ↗"')
html = html.replace('value="Subscribe"', 'value="Передзвонити мені"')
html = html.replace('placeholder="Enter your email"', 'placeholder="+38 (050) 000-00-00"')
html = html.replace('All Rights Reserved', 'Всі права захищено. Харків, Україна.')

# Navigation links to anchors
replacements = {
    'href="/about-us"': 'href="#about"',
    'href="/services"': 'href="#services"',
    'href="/appointment"': 'href="#contact"',
    'href="/contact-us"': 'href="#contact"',
    'href="/homepage-2"': 'href="#hero"',
    'href="/homepage-3"': 'href="#hero"',
    'href="/our-team"': 'href="#about"',
    'href="/pricing-plan"': 'href="#calculator"',
    'href="/projects"': 'href="#services"',
    'href="/blog"': 'href="#contact"',
    'href="/utility-pages/style-guide"': 'href="../"',
    'href="/utility-pages/licenses"': 'href="../fixora/"',
    'href="/utility-pages/changelog"': 'href="#contact"',
    'href="/utility-pages/protected-page"': 'href="#contact"',
    'href="/utility-pages/404-not-found"': 'href="#contact"',
    'href="/"': 'href="#hero"'
}
for old, new in replacements.items():
    html = html.replace(old, new)

# 14. Add the Interactive Price Calculator right before Appointment banner
calculator_html = '''
<section id="calculator" class="section-gap padding-top-0" style="padding: 60px 20px;">
  <div class="w-layout-blockcontainer container w-container">
    <div class="calculator-box">
      <div style="text-align:center;">
        <div class="heading-subtitle" style="color:#008cf0; font-weight:800; text-transform:uppercase; letter-spacing:0.08em; font-size:12px; margin-bottom:8px;">ОНЛАЙН РОЗРАХУНОК</div>
        <h2 style="font-size:32px; font-weight:800; color:#041f39; margin-bottom:12px;">Калькулятор вартості ремонту в Харкові</h2>
        <p style="font-size:15px; color:#5a6872; max-width:600px; margin:0 auto;">Дізнайтеся орієнтовну вартість роботи та запчастин ще до приїзду майстра</p>
      </div>

      <div class="calc-grid">
        <div class="calc-group">
          <label>1. Вид техніки</label>
          <select id="calc-appliance" class="calc-select" onchange="updateCalc()">
            <option value="washer">Пральна або сушильна машина</option>
            <option value="fridge">Холодильник / Морозильна камера</option>
            <option value="boiler">Бойлер / Водонагрівач</option>
            <option value="dishwasher">Посудомийна машина</option>
            <option value="oven">Духова шафа / Варильна плита</option>
          </select>
        </div>

        <div class="calc-group">
          <label>2. Симптом несправності</label>
          <select id="calc-symptom" class="calc-select" onchange="updateCalc()">
            <option value="drain">Не зливає воду / гуде насос</option>
            <option value="bearing">Гримить, сильний гул на віджимі</option>
            <option value="heat">Не нагріває воду (згорів ТЕН)</option>
            <option value="board">Не вмикається / блимає помилка</option>
          </select>
        </div>

        <div class="calc-group">
          <label>3. Район Харкова</label>
          <select class="calc-select">
            <option>Салтівка (всі мікрорайони)</option>
            <option>Олексіївка</option>
            <option>Павлове Поле</option>
            <option>Холодна Гора</option>
            <option>Центр / Шевченківський</option>
            <option>Нові Будинки</option>
            <option>Індустріальний (ХТЗ)</option>
          </select>
        </div>
      </div>

      <div class="calc-result-box">
        <div>
          <span style="font-size:12px; text-transform:uppercase; letter-spacing:0.05em; opacity:0.8;">Орієнтовна вартість робіт:</span>
          <div class="calc-price" id="calc-price-display">~450 – 750 ₴</div>
          <span style="font-size:11px; color:#6ee7b7;">✓ Діагностика 0 грн при ремонті</span>
        </div>
        <div>
          <a href="#contact" class="header-button-wrap w-inline-block" style="background:#008cf0; text-decoration:none; padding:12px 24px; border-radius:999px; display:inline-flex; align-items:center; gap:8px;">
            <span style="color:#fff; font-weight:800; font-size:13px; text-transform:uppercase;">Зафіксувати ціну ↗</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</section>

<script>
  function updateCalc() {
    var app = document.getElementById('calc-appliance').value;
    var symptom = document.getElementById('calc-symptom');
    var display = document.getElementById('calc-price-display');
    
    var prices = {
      'washer': {'drain': '~450 – 750 ₴', 'bearing': '~1 400 – 2 100 ₴', 'heat': '~550 – 950 ₴', 'board': '~750 – 1 450 ₴'},
      'fridge': {'drain': '~550 – 850 ₴', 'bearing': '~1 600 – 2 400 ₴', 'heat': '~650 – 1 100 ₴', 'board': '~850 – 1 650 ₴'},
      'boiler': {'drain': '~400 – 650 ₴', 'bearing': '~800 – 1 200 ₴', 'heat': '~500 – 850 ₴', 'board': '~600 – 1 100 ₴'},
      'dishwasher': {'drain': '~480 – 800 ₴', 'bearing': '~1 200 – 1 800 ₴', 'heat': '~600 – 1 050 ₴', 'board': '~800 – 1 500 ₴'},
      'oven': {'drain': '~450 – 700 ₴', 'bearing': '~900 – 1 400 ₴', 'heat': '~550 – 900 ₴', 'board': '~750 – 1 350 ₴'}
    };

    var currentSymp = symptom.value;
    if (prices[app] && prices[app][currentSymp]) {
      display.textContent = prices[app][currentSymp];
    } else {
      display.textContent = '~500 – 900 ₴';
    }
  }
</script>
'''

html = html.replace('<section class="section-gap padding-top-0">', calculator_html + '\n<section class="section-gap padding-top-0">', 1)

with open('rempobut/index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print('rempobut/index.html successfully updated with pixel-perfect About section and Kharkiv localization!')
