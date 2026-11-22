/* ============================================================================
   ARCH1CAT HYDRA-V6 — data/architect-kb.js
   Autonomous Intent & Knowledge Responder for ChatDOM ("Ask me anything...")
   Supports EN, UA, and RU queries with instant zero-latency project actions
   ============================================================================ */

export function queryArchitectAI(rawQuery, lang = 'en') {
  const q = (rawQuery || '').trim().toLowerCase();
  const isUk = lang === 'uk';

  if (!q || q === 'prometheus') {
    return {
      reply: isUk
        ? 'Привіт! Я нейро-індекс arch1cat (Керя). Навчений на 11 бойових системах: Cloudflare Edge CRM, 3D WebGL GLSL, OSINT, автономних AI-агентах та Kotlin. Напиши "yotei", "webgl", "стек" або "контакт".'
        : 'ARCH1CAT NEURAL INDEX ONLINE. Trained on 11 production systems spanning Cloudflare Workers/D1, custom WebGL2 GLSL engines, OSINT telemetry, and native Kotlin. Try "yotei", "webgl", "stack", or "contact".'
    };
  }

  if (/^(contact|контакт|связь|зв'язок|телеграм|telegram|hire|заказ|замовити|почта|email)/.test(q)) {
    return {
      openContact: true,
      reply: isUk
        ? 'Відкриваю прямий канал зв’язку з arch1cat (@Archi_____cat) · GitHub: l2bote4game.'
        : 'Opening direct encrypted channel to arch1cat (@Archi_____cat) · GitHub: l2bote4game.'
    };
  }

  if (/yotei|недвиж|нерухом|crm|realt|риелт|рієлт|d1|proptech/.test(q)) {
    return {
      filterCategory: 'websites',
      focusSlug: 'yotei-crm',
      reply: isUk
        ? 'YOTEI CRM (yotei.com.ua) — флагманська Proptech система на Cloudflare Workers + D1 SQL + R2 + KV (Next.js 16 / vinext). 1:1 паритет з RealtSoft, 3-рівнева таксономія та тримовний інтерфейс.'
        : 'YOTEI CRM (yotei.com.ua) — flagship enterprise Proptech SaaS running on Cloudflare Workers, D1 distributed SQL, R2 & KV (Next.js 16 / vinext) with 1:1 RealtSoft CRM parity.'
    };
  }

  if (/wardogs|баллист|баліст|gis|гіс|raymarch|dem|tactical|тактич/.test(q)) {
    return {
      filterCategory: 'webgl',
      focusSlug: 'wardogs-3d',
      reply: isUk
        ? 'WARDOGS 3D — тактична WebGL 2.0 ГІС платформа: субметровий DEM raymarching висот, 360° аналіз перекриття рельєфу (viewshed) та балістичні дуги артилерії на 60 FPS.'
        : 'WARDOGS 3D — real-time WebGL 2.0 tactical GIS: sub-meter DEM terrain raymarching, 360° viewshed occlusion shaders, MIL-dot optics, and 3D artillery ballistics at 60 FPS.'
    };
  }

  if (/vovk|вовк|техно|rempobut|fixora|ремонт|харків|харьков/.test(q)) {
    return {
      filterCategory: 'websites',
      focusSlug: 'technovovk',
      reply: isUk
        ? 'ТехноVovk та Fixora — два комерційні портали сервісного центру в Харкові з живим прокладанням маршрутів Google Maps (авто/транспорт) та інтерактивним калькулятором ремонту.'
        : 'TechnoVovk & Fixora — commercial Kharkiv repair portals featuring live Google Maps car/transit routing, itemized repair cost calculators, and high-conversion mobile UX.'
    };
  }

  if (/monitor|osint|cyber|кібер|кибер|спутник|супутник|threat/.test(q)) {
    return {
      filterCategory: 'ai',
      focusSlug: 'world-monitor',
      reply: isUk
        ? 'WORLD MONITOR — глобальна OSINT-система моніторингу загроз: супутникові орбіти, радіочастотні аномалії та потокова AI-класифікація кіберінцидентів.'
        : 'WORLD MONITOR — global OSINT & cyber telemetry suite aggregating live satellite tracks, RF signal anomalies, and edge-routed incident streams.'
    };
  }

  if (/foil|card|визит|візит|prepress|препрес|cmyk|золот/.test(q)) {
    return {
      filterCategory: 'websites',
      focusSlug: 'yotei-prepress',
      reply: isUk
        ? 'YOTEI FOIL LAB — шоурум комерційного препресу (#B01, #B02, #P01–#P05) з каліброваним фоном слонової кістки, фізикою гарячої золотої фольги та безшовними Boolean-векторами.'
        : 'YOTEI FOIL LAB — commercial CMYK + Hot Gold Foil prepress showroom (#B01, #B02, #P01–#P05) with calibrated ivory stocks and seamless Boolean vector emblems.'
    };
  }

  if (/vulcan|3d print|друк|печат|abs|petg|carbon/.test(q)) {
    return {
      filterCategory: 'webgl',
      focusSlug: 'vulcan-3d',
      reply: isUk
        ? 'VULCAN 3D LAB — інтерактивна студія 3D-друку з переглядом моделей у браузері та прорахунком конструкційних полімерів (ABS, PETG, Nylon, Carbon).'
        : 'VULCAN 3D LAB — interactive additive manufacturing configurator with 3D model inspection and polymer calculation (ABS, PETG, Nylon, Carbon-Fiber).'
    };
  }

  if (/kotlin|android|mobile|мобайл|wifi|gym|match|игра|гра/.test(q)) {
    return {
      filterCategory: 'mobile',
      reply: isUk
        ? 'Фільтрую мобільні та Kotlin системи: OpenGym APK (WebAuthn Passkeys), WiFi RF Scanner (спектрограф 2.4/5GHz на Jetpack Compose) та кастомний ігровий рушій Cats Match-3.'
        : 'Filtering Native Android & Kotlin systems: OpenGym APK (WebAuthn Passkeys), WiFi RF Scanner (2.4/5GHz Jetpack Compose spectrum radar), and Cats Match-3.'
    };
  }

  if (/ai|agent|hermes|matrix|llm|нейро|агент/.test(q)) {
    return {
      filterCategory: 'ai',
      focusSlug: 'ai-matrix',
      reply: isUk
        ? 'Фокусую AI та OSINT екосистему: Frontier AI Matrix (щоденний радар токенів/добу та бенчмарків LLM), World Monitor та крипто-очищувач Metadata Cleaner.'
        : 'Focusing AI & Security works: Frontier AI Matrix (daily normalized tokens/day & benchmark comparator), World Monitor OSINT, and Metadata Cleaner.'
    };
  }

  if (/webgl|three|shader|шейдер|3d|glsl/.test(q)) {
    return {
      filterCategory: 'webgl',
      reply: isUk
        ? 'Цей сайт працює на модульному WebGL2 рушії ARCH1CAT HYDRA-V6: 2D GPU Navier-Stokes MouseFluid, FBO рефракція матового стекла, 40 позвонків, 80 ланок ланцюга та 65 536 боке-частинок.'
        : 'This stage runs ARCH1CAT HYDRA-V6 WebGL2: 2D Navier-Stokes MouseFluid FBO, dual-pass frosted glass radialBlur refraction, 40 instanced vertebrae, 80 chain links & 65k bokeh particles.'
    };
  }

  if (/stack|стек|who|кто|хто|arch1cat|керя|автор/.test(q)) {
    return {
      filterCategory: 'all',
      reply: isUk
        ? 'arch1cat (Керя) — Chief System & UX Architect. Стек: Cloudflare Workers, D1, R2, KV, Next.js 16, Prisma, Three.js WebGL2 / GLSL, автономна оркестрація Hermes Agent та нативний Kotlin.'
        : 'arch1cat (Kerya) — Chief System & UX Architect. Core stack: Cloudflare Workers, D1, R2, KV, Next.js 16, Prisma, Three.js WebGL2 / GLSL shaders, Hermes multi-agent systems & native Kotlin.'
    };
  }

  return {
    filterCategory: 'all',
    reply: isUk
      ? `Запит "${rawQuery}" проіндексовано. Показано всі 11 систем у 3D-спіралі — крути колесо миші, клікай на матову скляну панель проєкту або напиши "yotei", "wardogs", "ai", "контакт".`
      : `Indexed "${rawQuery}" across 11 systems. Scroll the 3D helix, click any frosted glass project slab to enter its refraction cube, or ask about "yotei", "wardogs", "stack", or "contact".`
  };
}
