/* ============================================================
   ARCHIVE//01 · SIGNAL DECK — audio-engine.js
   Generative 3-track synth engine with analyser tap.
   Zero assets, zero copyright. Web Audio clock scheduler.
   Exposes window.__deckAudio
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
        name: 'EMBER PROTOCOL',
        bpm: 96,
        scale: [146.83, 174.61, 196, 220, 261.63], // D dorian-ish
        root: 73.42,
        padType: 'sawtooth', arpType: 'square', bassType: 'triangle',
    },
    {
        name: 'CAT TRANSMISSION',
        bpm: 72,
        scale: [164.81, 196, 174.61, 207.65, 246.94], // E phrygian-ish
        root: 82.41,
        padType: 'sine', arpType: 'triangle', bassType: 'sine',
    },
];

let ctx = null;
let master = null;
let analyser = null;
let comp = null;
let playing = false;
let trackIdx = 0;
let volume = (() => {
    const v = parseFloat(localStorage.getItem('arch_vol'));
    return Number.isFinite(v) ? Math.min(1, Math.max(0, v)) : 0.6;
})();
let nextNoteTime = 0;
let step = 0;
let schedTimer = null;
const LOOKAHEAD_MS = 100;
const STEP_SEC = () => (60 / TRACKS[trackIdx].bpm) / 4; // 16th notes

function ensureCtx() {
    if (ctx) return;
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    master = ctx.createGain();
    master.gain.value = volume * 0.55;
    analyser = ctx.createAnalyser();
    analyser.fftSize = 256;
    analyser.smoothingTimeConstant = 0.78;
    comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -18;
    comp.ratio.value = 4;
    master.connect(analyser);
    analyser.connect(comp);
    comp.connect(ctx.destination);
}

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
    g.gain.value = 0.05;
    src.connect(hp); hp.connect(g); g.connect(master);
    src.start(t0);
}

function scheduleStep(s, t0) {
    const tr = TRACKS[trackIdx];
    const bar = Math.floor(s / 16);

    // pad chord every 2 bars (root, +3rd-ish, +5th from scale)
    if (s % 32 === 0) {
        const base = tr.scale[(bar * 2) % tr.scale.length] / 2;
        voice(tr.padType, base, t0, STEP_SEC() * 30, 0.05, 900);
        voice(tr.padType, base * 1.5, t0, STEP_SEC() * 30, 0.04, 900);
        voice(tr.padType, base * 1.25, t0, STEP_SEC() * 30, 0.03, 900);
    }
    // arp on 16ths, patterned
    if (s % 2 === 0 || Math.random() > 0.7) {
        const deg = tr.scale[(s * 3 + bar) % tr.scale.length];
        const oct = (s % 8 < 4) ? 1 : 2;
        voice(tr.arpType, deg * oct, t0, 0.16, 0.055, 2600);
    }
    // bass root each half-bar
    if (s % 8 === 0) {
        voice(tr.bassType, tr.root, t0, STEP_SEC() * 6, 0.09, 400);
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
    toggle() { playing ? this.pause() : this.play(); },
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
