/* ============================================================
   ARCH1CAT — audio-engine.js
   Procedural Web Audio Engine: Generative Synth + Interactive SFX
   Zero external audio assets. Zero copyright.
   Exposes:
   - window.__deckAudio (Generative ambient synth scheduler)
   - window.__playSfx(type) (Interactive UI & 3D sound effects)
   ============================================================ */

const TRACKS = [
    {
        name: 'KYIV NIGHTBUS',
        bpm: 84,
        scale: [220, 261.63, 293.66, 329.63, 392], // A minor pentatonic
        root: 110,
        padType: 'triangle', arpType: 'sine', bassType: 'sawtooth',
    },
    {
        name: 'LUSION VOID PROTOCOL',
        bpm: 96,
        scale: [146.83, 174.61, 196, 220, 261.63], // D dorian
        root: 73.42,
        padType: 'sawtooth', arpType: 'square', bassType: 'triangle',
    },
    {
        name: 'SOLAR QUANTUM DRIFT',
        bpm: 72,
        scale: [164.81, 196, 174.61, 207.65, 246.94], // E phrygian
        root: 82.41,
        padType: 'sine', arpType: 'triangle', bassType: 'sine',
    },
    {
        name: 'KYIV VOLYA // CARILLON 30.52E',
        bpm: 90,
        scale: [220, 246.94, 261.63, 293.66, 329.63, 349.23, 392], // Ukrainian Dorian
        root: 110,
        padType: 'triangle', arpType: 'square', bassType: 'sawtooth',
    },
];

let ctx = null;
let master = null;
let sfxGain = null;
let analyser = null;
let comp = null;
let playing = false;
let trackIdx = 0;
let volume = (() => {
    const v = parseFloat(localStorage.getItem('arch_vol'));
    return Number.isFinite(v) ? Math.min(1, Math.max(0, v)) : 0.6;
})();
let sfxMuted = localStorage.getItem('arch_sfx_mute') === '1';

let nextNoteTime = 0;
let step = 0;
let schedTimer = null;
const LOOKAHEAD_MS = 100;
const STEP_SEC = () => (60 / TRACKS[trackIdx].bpm) / 4; // 16th notes

function ensureCtx() {
    if (ctx) return;
    try {
        ctx = new (window.AudioContext || window.webkitAudioContext)();
        master = ctx.createGain();
        master.gain.value = volume * 0.55;

        sfxGain = ctx.createGain();
        sfxGain.gain.value = sfxMuted ? 0 : 0.7;

        analyser = ctx.createAnalyser();
        analyser.fftSize = 256;
        analyser.smoothingTimeConstant = 0.78;

        comp = ctx.createDynamicsCompressor();
        comp.threshold.value = -18;
        comp.ratio.value = 4;

        master.connect(analyser);
        sfxGain.connect(analyser);
        analyser.connect(comp);
        comp.connect(ctx.destination);
    } catch (err) {
        console.warn('AudioContext init blocked until user interaction', err);
    }
}

/* ------------------------------------------------------------
   Procedural Sound Effects (SFX)
   ------------------------------------------------------------ */
window.__playSfx = function (type) {
    if (sfxMuted) return;
    ensureCtx();
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume();

    const t = ctx.currentTime;

    if (type === 'click') {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, t);
        osc.frequency.exponentialRampToValueAtTime(240, t + 0.06);

        g.gain.setValueAtTime(0.08, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.06);

        osc.connect(g);
        g.connect(sfxGain);
        osc.start(t);
        osc.stop(t + 0.07);
    } else if (type === 'hover') {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(1900, t);
        osc.frequency.linearRampToValueAtTime(2400, t + 0.018);

        g.gain.setValueAtTime(0.018, t);
        g.gain.exponentialRampToValueAtTime(0.0005, t + 0.02);

        osc.connect(g);
        g.connect(sfxGain);
        osc.start(t);
        osc.stop(t + 0.022);
    } else if (type === 'theme') {
        // Dual-tone cyber chime
        [520, 880, 1320].forEach((freq, idx) => {
            const osc = ctx.createOscillator();
            const g = ctx.createGain();
            osc.type = 'sine';
            const offset = idx * 0.04;
            osc.frequency.setValueAtTime(freq, t + offset);
            osc.frequency.exponentialRampToValueAtTime(freq * 1.4, t + offset + 0.12);

            g.gain.setValueAtTime(0, t + offset);
            g.gain.linearRampToValueAtTime(0.06, t + offset + 0.02);
            g.gain.exponentialRampToValueAtTime(0.001, t + offset + 0.16);

            osc.connect(g);
            g.connect(sfxGain);
            osc.start(t + offset);
            osc.stop(t + offset + 0.18);
        });
    } else if (type === 'pulse') {
        // Deep sub-bass resonant boom
        const osc = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const g = ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(140, t);
        osc.frequency.exponentialRampToValueAtTime(32, t + 0.55);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(380, t);
        filter.frequency.exponentialRampToValueAtTime(60, t + 0.55);

        g.gain.setValueAtTime(0.24, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.58);

        osc.connect(filter);
        filter.connect(g);
        g.connect(sfxGain);

        osc.start(t);
        osc.stop(t + 0.6);
    }
};

/* ------------------------------------------------------------
   Generative Music Sequencer
   ------------------------------------------------------------ */
function voice(type, freq, t0, dur, vol, filterFreq) {
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t0);
    let node = osc;
    if (filterFreq) {
        const f = ctx.createBiquadFilter();
        f.type = 'lowpass';
        f.frequency.setValueAtTime(filterFreq, t0);
        osc.connect(f);
        node = f;
    }
    g.gain.setValueAtTime(0, t0);
    g.gain.linearRampToValueAtTime(vol, t0 + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    node.connect(g);
    g.connect(master);
    osc.start(t0);
    osc.stop(t0 + dur + 0.05);
}

function hat(t0) {
    const len = ctx.sampleRate * 0.05;
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / len);
    const src = ctx.createBufferSource();
    src.buffer = buf;
    const hp = ctx.createBiquadFilter();
    hp.type = 'highpass';
    hp.frequency.value = 7000;
    const g = ctx.createGain();
    g.gain.value = 0.04;
    src.connect(hp);
    hp.connect(g);
    g.connect(master);
    src.start(t0);
}

function scheduleStep(s, t0) {
    const tr = TRACKS[trackIdx];
    const bar = Math.floor(s / 16);

    // pad chord every 2 bars
    if (s % 32 === 0) {
        const base = tr.scale[(bar * 2) % tr.scale.length] / 2;
        voice(tr.padType, base, t0, STEP_SEC() * 30, 0.05, 900);
        voice(tr.padType, base * 1.5, t0, STEP_SEC() * 30, 0.04, 900);
        voice(tr.padType, base * 1.25, t0, STEP_SEC() * 30, 0.03, 900);
    }
    // arp on 16ths
    if (s % 2 === 0 || Math.random() > 0.7) {
        const deg = tr.scale[(s * 3 + bar) % tr.scale.length];
        const oct = (s % 8 < 4) ? 1 : 2;
        voice(tr.arpType, deg * oct, t0, 0.16, 0.05, 2400);
    }
    // bass root each half-bar
    if (s % 8 === 0) {
        voice(tr.bassType, tr.root, t0, STEP_SEC() * 6, 0.085, 400);
    }
    // hats on off-beats
    if (s % 4 === 2) hat(t0);
}

function scheduler() {
    while (nextNoteTime < ctx.currentTime + 0.12) {
        scheduleStep(step, nextNoteTime);
        nextNoteTime += STEP_SEC();
        step++;
    }
}

function emitState() {
    window.dispatchEvent(new CustomEvent('deckaudostate', {
        detail: { playing, trackIdx, name: TRACKS[trackIdx].name, bpm: TRACKS[trackIdx].bpm },
    }));
}

window.__deckAudio = {
    play() {
        ensureCtx();
        if (ctx.state === 'suspended') ctx.resume();
        if (playing) return;
        playing = true;
        step = 0;
        nextNoteTime = ctx.currentTime + 0.06;
        schedTimer = setInterval(scheduler, LOOKAHEAD_MS);
        emitState();
    },
    pause() {
        if (!playing) return;
        playing = false;
        clearInterval(schedTimer);
        schedTimer = null;
        emitState();
    },
    toggle() {
        playing ? this.pause() : this.play();
    },
    next(dir = 1) {
        trackIdx = (trackIdx + dir + TRACKS.length) % TRACKS.length;
        step = 0;
        emitState();
    },
    setVolume(v) {
        volume = Math.min(1, Math.max(0, v));
        try { localStorage.setItem('arch_vol', String(volume)); } catch (_) {}
        if (master) master.gain.setTargetAtTime(volume * 0.55, ctx.currentTime, 0.05);
    },
    getVolume() { return volume; },
    isPlaying() { return playing; },
    trackInfo() { return { ...TRACKS[trackIdx], index: trackIdx }; },
    getAnalyser() { return analyser; },
};

document.addEventListener('visibilitychange', () => {
    if (document.hidden && playing) window.__deckAudio.pause();
});
