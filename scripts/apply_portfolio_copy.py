import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Hero Subtitle
html = re.sub(
    r'<p class=\"hero-sub body\" data-rv=\"up\">.*?</p>',
    '<p class="hero-sub body" data-rv="up">Software as craft &amp; play. High-performance 3D WebGL architectures, autonomous AI multi-agent systems, and precision GIS telemetry.</p>',
    html
)

# 2. Hero Chips (The 4 chapters in hero foot)
hero_chips = '''<div class="chapters" id="chips">
      <div class="chip" data-chip="0" data-rv="up" data-cursor><span class="num">01</span>
        <span class="tx"><b>Thresholds</b><p>Clean system architecture &amp; zero-fluff data pipelines.</p></span></div>
      <div class="chip" data-chip="1" data-rv="up" data-cursor><span class="num">02</span>
        <span class="tx"><b>Still Gardens</b><p>Flagship interactive 3D WebGL &amp; GIS telemetry systems.</p></span></div>
      <div class="chip" data-chip="2" data-rv="up" data-cursor><span class="num">03</span>
        <span class="tx"><b>Sacred Craft</b><p>Autonomous AI multi-agent orchestration &amp; reliability.</p></span></div>
      <div class="chip" data-chip="3" data-rv="up" data-cursor><span class="num">04</span>
        <span class="tx"><b>Night Rituals</b><p>Real-time telemetry, direct channels &amp; collaboration.</p></span></div>
    </div>'''

html = re.sub(r'<div class=\"chapters\" id=\"chips\">.*?</div>\s*</div>', hero_chips + '\n  </div>', html, flags=re.DOTALL)

# 3. Chapter 01 (Sanmon Gate) Copy & Stats
ch1_copy = '''<div class="gate-grid">
    <h2 class="display h-sec" data-rv="up">Charred cypress, worn stone, one gate left open.</h2>
    <div class="gate-copy">
      <p class="lead" data-rv="up">Architecture begins where noise stops: a gate of cedar burned black, standing in its own weather. The soot is not decoration. It is how a system is engineered to survive a hundred harsh seasons, and the first thing this craft asks you to understand.</p>
      <p class="body" data-rv="up">Climb the worn steps and the digital sanctuary lifts out of the mist, paper screens lit from inside like lanterns in the mountain cold. Above the eaves a vermilion moon holds its place, patient, half hidden. Nothing here is rushed. Strict taxonomies, deterministic pipelines, and zero-fluff code.</p>
      <a class="arrowlink" href="#pathways" data-rv="fade" data-cursor>
        <span>Enter the gardens</span>
        <span class="ar"><svg viewBox="0 0 14 14" fill="none"><path d="M3 11 11 3M5 3h6v6" stroke="#dfe7e0" stroke-width="1.3"/></svg></span>
      </a>
    </div>
  </div>
  <div class="gate-stats" data-rv="up">
    <div><b>08</b><span>Core Systems</span></div>
    <div><b>100M+</b><span>Tokens Reasoned</span></div>
    <div><b>1611</b><span>Foundations Raised</span></div>
    <div><b>∞</b><span>Stillness &amp; Craft</span></div>
  </div>'''

html = re.sub(r'<div class=\"gate-grid\">.*?</div>\s*<div class=\"gate-stats\".*?</div>\s*</div>', ch1_copy, html, flags=re.DOTALL)

# 4. Chapter 03 (Sacred Craft) Headings & 5 Disciplines
ch3_curriculum = '''<div class="cur-head">
    <h2 class="display h-sec" data-rv="up">Five disciplines. Relentless execution. One quiet mind.</h2>
    <p class="body-lg" data-rv="up">Each discipline is an architecture, not a lecture. Built with strict types, rigorous QA verification gates, and deep multi-step CoT reasoning.</p>
  </div>
  <div class="cur" id="cur">
    <div class="les" data-les="0" data-cursor>
      <span class="k">01</span>
      <h3>The Hidden Gate<em class="jp">山門</em></h3>
      <p>Clean system architecture, zero-fluff data pipelines, and strict domain taxonomies.</p>
      <span class="t">Architecture</span><i class="bar"></i>
    </div>
    <div class="les" data-les="1" data-cursor>
      <span class="k">02</span>
      <h3>Borrowed Scenery<em class="jp">借景</em></h3>
      <p>Shakkei: high-end WebGL 3D shaders, real-time DEM raymarching, and spatial GIS.</p>
      <span class="t">Three.js</span><i class="bar"></i>
    </div>
    <div class="les" data-les="2" data-cursor>
      <span class="k">03</span>
      <h3>Charred Cypress<em class="jp">焼杉</em></h3>
      <p>Yakisugi: hardening codebases with automated Vitest QA gates to survive high load.</p>
      <span class="t">Reliability</span><i class="bar"></i>
    </div>
    <div class="les" data-les="3" data-cursor>
      <span class="k">04</span>
      <h3>Lantern Light<em class="jp">灯籠</em></h3>
      <p>Native Kotlin Android software: 2.4/5GHz RF diagnostics, compose UI, and passkeys.</p>
      <span class="t">Kotlin</span><i class="bar"></i>
    </div>
    <div class="les" data-les="4" data-cursor>
      <span class="k">05</span>
      <h3>The Vermilion Moon<em class="jp">朱月</em></h3>
      <p>Autonomous AI multi-agent orchestration, CoT planning, and real-time telemetry.</p>
      <span class="t">AI Systems</span><i class="bar"></i>
    </div>
  </div>'''

html = re.sub(r'<div class=\"cur-head\">.*?</div>\s*<div class=\"cur\" id=\"cur\">.*?</div>\s*</div>\s*</section>', ch3_curriculum + '\n</section>', html, flags=re.DOTALL)

# 5. Chapter 04 (Afterlight / Contact Channels)
ch4_afterlight = '''<div class="eyebrow" data-rv="fade">Chapter 04 — Signal &amp; Telemetry</div>
  <h2 class="display" data-rv="up">Afterlight</h2>
  <p class="body-lg" data-rv="up">The gate does not close behind you. Open to high-stakes 3D WebGL experiences, autonomous AI agent architectures, and real-time systems engineering.</p>
  <div style="display:flex; gap:16px; margin-top:24px; flex-wrap:wrap;">
    <a class="cta" href="https://t.me/Archi_____cat" target="_blank" rel="noopener noreferrer" data-rv="fade" data-cursor>
      <i></i><span>Telegram @Archi_____cat ↗</span>
      <svg viewBox="0 0 14 14" fill="none" width="13" height="13"><path d="M3 11 11 3M5 3h6v6" stroke="#dfe7e0" stroke-width="1.3"/></svg>
    </a>
    <a class="cta" href="https://x.com/Archi_____cat" target="_blank" rel="noopener noreferrer" data-rv="fade" data-cursor>
      <i></i><span>X @Archi_____cat ↗</span>
      <svg viewBox="0 0 14 14" fill="none" width="13" height="13"><path d="M3 11 11 3M5 3h6v6" stroke="#dfe7e0" stroke-width="1.3"/></svg>
    </a>
    <a class="cta" href="https://github.com/l2bote4game" target="_blank" rel="noopener noreferrer" data-rv="fade" data-cursor>
      <i></i><span>GitHub @l2bote4game ↗</span>
      <svg viewBox="0 0 14 14" fill="none" width="13" height="13"><path d="M3 11 11 3M5 3h6v6" stroke="#dfe7e0" stroke-width="1.3"/></svg>
    </a>
  </div>'''

html = re.sub(r'<div class=\"eyebrow\" data-rv=\"fade\">Chapter 04.*?</div>\s*<h2 class=\"display\".*?</h2>\s*<p class=\"body-lg\".*?</p>.*?<div class=\"cta-wrap\">.*?</div>', ch4_afterlight, html, flags=re.DOTALL)

# 6. Footer Content
footer_content = '''<div class="foot-grid">
    <div class="foot-brand">
      <svg viewBox="0 0 44 44" fill="none" width="34" height="34" aria-hidden="true">
        <circle cx="22" cy="25" r="8.6" fill="#e0231c" fill-opacity=".9"/>
        <path d="M5 13h34M9 18.4h26M22 8.5v27" stroke="#dfe7e0" stroke-width="1.5"/>
      </svg>
      <p>A five-chapter night walk through software craft, WebGL 2.0, and autonomous systems. Live Kyoto mountain sanctuary rendered live in WebGL.</p>
    </div>
    <div><h4>Navigation</h4><ul>
      <li><a href="#gate" data-cursor>The Sanmon</a></li>
      <li><a href="#pathways" data-cursor>Still Gardens</a></li>
      <li><a href="#lessons" data-cursor>Sacred Craft</a></li>
      <li><a href="#eternity" data-cursor>Afterlight</a></li>
    </ul></div>
    <div><h4>Core Systems</h4><ul>
      <li><a href="https://yotei.com.ua/" target="_blank" rel="noopener noreferrer" data-cursor>Yotei CRM ↗</a></li>
      <li><a href="activetheory/" data-cursor>Active Theory 1:1 ↗</a></li>
      <li><a href="fixora/" data-cursor>Fixora Харків ↗</a></li>
      <li><a href="rempobut/" data-cursor>Feexaro Сервіс ↗</a></li>
      <li><a href="3d-print/" data-cursor>VULCAN 3D Lab ↗</a></li>
    </ul></div>
    <div><h4>Signal</h4><ul>
      <li><a href="https://t.me/Archi_____cat" target="_blank" rel="noopener noreferrer" data-cursor>Telegram @Archi_____cat</a></li>
      <li><a href="https://x.com/Archi_____cat" target="_blank" rel="noopener noreferrer" data-cursor>X @Archi_____cat</a></li>
      <li><a href="https://github.com/l2bote4game" target="_blank" rel="noopener noreferrer" data-cursor>GitHub @l2bote4game</a></li>
    </ul></div>
  </div>
  <div class="foot-base">
    <span>© 2026 arch1cat — 影の道 Kage</span>
    <span class="jp">静けさは一つの技である</span>
    <span>WebGL · Three.js · Kyoto Nocturne</span>
  </div>'''

html = re.sub(r'<div class=\"foot-grid\">.*?</footer>', footer_content + '\n</footer>', html, flags=re.DOTALL)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print('Successfully applied authentic ARCH1CAT portfolio copy to index.html!')
