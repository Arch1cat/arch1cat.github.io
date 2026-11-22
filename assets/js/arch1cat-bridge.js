/* ============================================================================
   ARCH1CAT HYDRA-V6 BRIDGE — assets/js/arch1cat-bridge.js
   Zero-Backend Local Interceptor for Active Theory V6 Native Hydra Engine:
   - Routes Google Cloud CMS JSON fetches to local /assets/cms/*.json
   - Eliminates external EEA geo-tracking & Google Analytics calls
   - Provides instant local AI Assistant threads for ChatDOM ("Ask me anything")
   ============================================================================ */
(function () {
  window._ENV_ = 'production';
  window._CMS_ = '%CMS%';
  window._UNSUPPORTED_PAGE_ = 'unsupported.html';
  window._CACHE_ = '1780406240914';
  window.UIL_STATIC_PATH = 'assets/data/uil.1780406240914.json';

  if (new URLSearchParams(window.location.search).has('qa')) {
    const origGetCtx = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (type, attrs) {
      if (type === 'webgl2' || type === 'webgl' || type === 'experimental-webgl') {
        attrs = Object.assign({}, attrs || {}, { preserveDrawingBuffer: true });
      }
      return origGetCtx.call(this, type, attrs);
    };
  }

  let lastPrompt = '';
  let lastSlug = '';

  function resolveArch1catAssistant(rawContent) {
    const q = String(rawContent || '').toLowerCase();
    lastSlug = '';

    if (/yotei|crm|realt|нерухом|недвиж|proptech|d1/.test(q)) {
      lastSlug = 'yotei-crm';
      return 'Yotei CRM (yotei.com.ua) is our flagship enterprise Proptech ecosystem built on Cloudflare Workers, distributed D1 SQL, R2 object storage, and Next.js 16 with 1:1 RealtSoft parity.';
    }
    if (/wardogs|3d|gis|ballistic|raymarch|баллист|баліст|tactical/.test(q)) {
      lastSlug = 'wardogs-3d';
      return 'WARDOGS 3D delivers real-time sub-meter DEM terrain raymarching, 360-degree viewshed occlusion analysis, MIL-dot optics, and parabolic artillery ballistics in WebGL 2.0 at 60 FPS.';
    }
    if (/vovk|вовк|techno|rempobut|fixora|ремонт|kharkiv|харків/.test(q)) {
      lastSlug = 'technovovk';
      return 'TechnoVovk & Fixora are commercial Kharkiv appliance engineering portals featuring live Google Maps car and transit route planning and dynamic fault repair calculators.';
    }
    if (/monitor|osint|cyber|satellite|спутник|супутник/.test(q)) {
      lastSlug = 'world-monitor';
      return 'World Monitor aggregates live satellite orbital tracks, RF spectrum anomalies, and automated AI cyber-incident triage into a low-latency global telemetry map.';
    }
    if (/foil|card|prepress|cmyk|визит|візит|gold/.test(q)) {
      lastSlug = 'yotei-foil-lab';
      return 'Yotei Foil Lab showcases commercial CMYK + hot-stamped gold foil business card prepress (#B01, #B02, #P01-#P05) with calibrated ivory stocks and seamless vector QR geometry.';
    }
    if (/vulcan|print|polymer|abs|petg|carbon/.test(q)) {
      lastSlug = 'vulcan-3d-lab';
      return 'Vulcan 3D Lab is an interactive additive manufacturing studio with live 3D mesh inspection and automated cost calculation across ABS, PETG, Nylon, and Carbon-Fiber.';
    }
    if (/ai|matrix|llm|hermes|agent|benchmark/.test(q)) {
      lastSlug = 'frontier-ai-matrix';
      return 'Frontier AI Matrix tracks daily normalized tokens-per-day quotas, coding & reasoning benchmarks, and zero-cost routing across modern frontier LLMs.';
    }
    if (/wifi|rf|scanner|5ghz|spectrum/.test(q)) {
      lastSlug = 'wifi-rf-scanner';
      return 'WiFi RF Scanner is a native Kotlin & Jetpack Compose diagnostic radar for real-time 2.4/5GHz channel overlap graphing, mDNS discovery, and LAN topology sweeps.';
    }
    if (/gym|passkey|webauthn|fitness|android/.test(q)) {
      lastSlug = 'opengym-apk';
      return 'OpenGym APK is a self-hosted progressive strength suite for Android featuring biometric WebAuthn passkeys, algorithmic overload curves, and offline-first sync.';
    }
    if (/clean|meta|exif|opsec|gps/.test(q)) {
      lastSlug = 'metadata-cleaner';
      return 'Metadata Cleaner strips GPS coordinates, camera serial hashes, and container signatures across batch media streams via multi-threaded FFmpeg workers.';
    }
    if (/cat|match|game|puzzle|игра|гра/.test(q)) {
      lastSlug = 'cats-match-3';
      return 'Cats Match-3 is a custom native Kotlin mobile puzzle engine with deterministic cascade solvers, spring micro-interactions, and 60 FPS particle FX.';
    }
    if (/contact|hire|telegram|телеграм|контакт|email/.test(q)) {
      return 'Direct channel to arch1cat (Kerya): Telegram @Archi_____cat · GitHub l2bote4game · Flagship prod yotei.com.ua. Click CONTACT in the top-right pill anytime.';
    }
    return 'arch1cat (Kerya) — Chief System & UX Architect. Ask me about Yotei CRM, WARDOGS 3D, World Monitor, TechnoVovk, WiFi RF Scanner, Frontier AI Matrix, or click any frosted glass card!';
  }

  function jsonResp(obj) {
    return Promise.resolve(
      new Response(JSON.stringify(obj), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      })
    );
  }

  const origFetch = window.fetch.bind(window);
  window.fetch = function (input, init) {
    const url = typeof input === 'string' ? input : (input && input.url) || '';

    if (url.includes('activetheory-v6.appspot.com/cms/')) {
      if (url.includes('/metadata-')) return origFetch('assets/cms/metadata.json');
      if (url.includes('/contact-')) return origFetch('assets/cms/contact.json');
      if (url.includes('/projects-')) return origFetch('assets/cms/projects.json');
    }

    if (url.includes('cloudfunctions.net/geo')) {
      return jsonResp({ location: { countryCode: 'US' } });
    }

    if (url.includes('backend-dot-activetheory-v6.uc.r.appspot.com/api/assistant')) {
      if (url.endsWith('/createThread')) {
        return jsonResp({ id: 'arch1cat-local-thread' });
      }
      if (url.endsWith('/createMessage')) {
        try {
          const body = init && init.body ? JSON.parse(init.body) : {};
          lastPrompt = body.content || '';
        } catch (_) {}
        return jsonResp({ message: 'ok' });
      }
      if (url.endsWith('/createRun')) {
        resolveArch1catAssistant(lastPrompt);
        return jsonResp({ slug: lastSlug });
      }
      if (url.endsWith('/listMessage')) {
        const text = resolveArch1catAssistant(lastPrompt);
        return jsonResp({ text });
      }
    }

    return origFetch(input, init);
  };
})();
