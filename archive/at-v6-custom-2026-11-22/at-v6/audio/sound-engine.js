/* ============================================================================
   ARCH1CAT HYDRA-V6 — audio/sound-engine.js
   Active Theory MusicPlayerDOM (8 Tracks + Procedural Synthwave Fallback),
   WebAudio 480Hz Lowpass Muffle on WorkDetail/Contact & Tactile UI Micro-SFX
   ============================================================================ */

import { bus } from '../core/state-bus.js';

const PLAYLIST = [
  { title: '01. SERGEY AZBEL - THEMIS', url: 'https://storage.googleapis.com/activetheory-v6.appspot.com/media/audio/songs/01_SergeyAzbel_Themis.mp3' },
  { title: '02. KINO STUDIO - DUSK', url: 'https://storage.googleapis.com/activetheory-v6.appspot.com/media/audio/songs/02_KinoStudio_Dusk.mp3' },
  { title: '03. SOUNDROLL - FLY UP HIGH', url: 'https://storage.googleapis.com/activetheory-v6.appspot.com/media/audio/songs/03_Soundroll_FlyupHigh.mp3' },
  { title: '04. COLOR PARADE - TO THE STARS', url: 'https://storage.googleapis.com/activetheory-v6.appspot.com/media/audio/songs/04_ColorParade_ToTheStars.mp3' },
  { title: '05. DIMA KRAVCENKO - SULTANS OF STREAMS', url: 'https://storage.googleapis.com/activetheory-v6.appspot.com/media/audio/songs/05_DimaKravcenko_SultansofStreams.mp3' },
  { title: '06. KINO STUDIO - OTHER WORLDS', url: 'https://storage.googleapis.com/activetheory-v6.appspot.com/media/audio/songs/06_KinoStudio_OtherWorlds.mp3' },
  { title: '07. VECTOR SEVEN - QUANTUM WORLD', url: 'https://storage.googleapis.com/activetheory-v6.appspot.com/media/audio/songs/07_VectorSeven_QuantumWorld.mp3' },
  { title: '08. KINO STUDIO - GHOST CITIES', url: 'https://storage.googleapis.com/activetheory-v6.appspot.com/media/audio/songs/08_KinoStudio_GhostCities.mp3' }
];

const CHORD_SETS = [
  [110.0, 164.81, 220.0, 261.63],
  [98.0, 146.83, 196.0, 246.94],
  [87.31, 130.81, 174.61, 220.0],
  [110.0, 130.81, 196.0, 293.66]
];

export class SoundEngine {
  constructor() {
    this.ctx = null;
    this.filterNode = null;
    this.masterGain = null;
    this.audioEl = null;
    this.synthOscs = [];
    this.usingFallbackSynth = false;

    this.playing = false;
    this.muffled = false;
    this.trackIndex = 0;

    this.playerWrap = document.getElementById('music-player-dom');
    this.marqueeSpanA = document.getElementById('music-track-a');
    this.marqueeSpanB = document.getElementById('music-track-b');
    this.prevBtn = document.getElementById('music-prev-btn');
    this.nextBtn = document.getElementById('music-next-btn');

    this.updateTickerLabels();
    this.bindControls();
    this.bindBus();
  }

  ensureContext() {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') this.ctx.resume().catch(() => {});
      return;
    }
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    this.ctx = new AC();
    this.filterNode = this.ctx.createBiquadFilter();
    this.filterNode.type = 'lowpass';
    this.filterNode.frequency.value = this.muffled ? 480 : 19500;
    this.filterNode.Q.value = this.muffled ? 3.2 : 0.8;

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.value = 0.34;
    this.filterNode.connect(this.masterGain);
    this.masterGain.connect(this.ctx.destination);
  }

  startStreamOrFallback() {
    this.ensureContext();
    if (!this.ctx) return;

    if (!this.audioEl) {
      this.audioEl = new Audio();
      this.audioEl.crossOrigin = 'anonymous';
      this.audioEl.preload = 'auto';
      this.audioEl.addEventListener('ended', () => this.stepTrack(1));
      this.audioEl.addEventListener('error', () => this.activateFallbackSynth());
      try {
        const src = this.ctx.createMediaElementSource(this.audioEl);
        src.connect(this.filterNode);
      } catch (_) {
        this.activateFallbackSynth();
        return;
      }
    }

    if (this.usingFallbackSynth) {
      this.setSynthChord(this.trackIndex);
      return;
    }

    this.audioEl.src = PLAYLIST[this.trackIndex].url;
    this.audioEl.play().catch(() => this.activateFallbackSynth());
  }

  activateFallbackSynth() {
    if (!this.ctx || this.synthOscs.length > 0) return;
    this.usingFallbackSynth = true;
    const chord = CHORD_SETS[this.trackIndex % CHORD_SETS.length];
    const padGain = this.ctx.createGain();
    padGain.gain.value = 0.08;
    padGain.connect(this.filterNode);

    this.synthOscs = chord.map((freq, idx) => {
      const osc = this.ctx.createOscillator();
      osc.type = idx % 2 === 0 ? 'sawtooth' : 'triangle';
      osc.frequency.value = freq;
      osc.detune.value = (idx - 1.5) * 7;
      osc.connect(padGain);
      osc.start();
      return osc;
    });
  }

  setSynthChord(idx) {
    if (!this.ctx || this.synthOscs.length === 0) return;
    const chord = CHORD_SETS[idx % CHORD_SETS.length];
    const now = this.ctx.currentTime;
    this.synthOscs.forEach((osc, i) => {
      osc.frequency.exponentialRampToValueAtTime(chord[i], now + 0.45);
    });
  }

  toggleAudio() {
    this.playing = !this.playing;
    bus.set('audio/playing', this.playing);

    if (this.playerWrap) {
      this.playerWrap.classList.toggle('is-visible', this.playing);
    }

    if (this.playing) {
      this.startStreamOrFallback();
      if (this.masterGain && this.ctx) {
        this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
        this.masterGain.gain.setTargetAtTime(0.34, this.ctx.currentTime, 0.18);
      }
      this.playTick(680, 0.05);
    } else if (this.ctx && this.masterGain) {
      this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
      this.masterGain.gain.setTargetAtTime(0.0001, this.ctx.currentTime, 0.12);
      if (this.audioEl && !this.usingFallbackSynth) this.audioEl.pause();
    }
  }

  stepTrack(dir) {
    this.trackIndex = (this.trackIndex + dir + PLAYLIST.length) % PLAYLIST.length;
    this.updateTickerLabels();
    if (this.playing) this.startStreamOrFallback();
    this.playTick(dir > 0 ? 780 : 540, 0.045);
  }

  updateTickerLabels() {
    const label = `${PLAYLIST[this.trackIndex].title}   //   `;
    if (this.marqueeSpanA) this.marqueeSpanA.textContent = label;
    if (this.marqueeSpanB) this.marqueeSpanB.textContent = label;
  }

  setMuffled(muffled) {
    this.muffled = muffled;
    bus.set('audio/muffled', muffled);
    if (!this.ctx || !this.filterNode) return;
    const now = this.ctx.currentTime;
    this.filterNode.frequency.cancelScheduledValues(now);
    this.filterNode.Q.cancelScheduledValues(now);
    this.filterNode.frequency.exponentialRampToValueAtTime(muffled ? 480 : 19500, now + 0.55);
    this.filterNode.Q.linearRampToValueAtTime(muffled ? 3.4 : 0.8, now + 0.55);
  }

  playTick(freq = 620, dur = 0.035) {
    if (!this.ctx || !this.playing) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.55, now + dur);
    g.gain.setValueAtTime(0.045, now);
    g.gain.exponentialRampToValueAtTime(0.0001, now + dur);
    osc.connect(g);
    g.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + dur + 0.01);
  }

  bindControls() {
    this.prevBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.stepTrack(-1);
    });
    this.nextBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.stepTrack(1);
    });
  }

  bindBus() {
    const syncMuffle = () => {
      const shouldMuffle = Boolean(bus.get('work/project')) || Boolean(bus.get('ui/contact'));
      this.setMuffled(shouldMuffle);
    };
    bus.on('work/project', (proj) => {
      syncMuffle();
      this.playTick(proj ? 340 : 520, 0.08);
    });
    bus.on('ui/contact', () => syncMuffle());
    bus.listen('sfx/hover', () => this.playTick(840, 0.025));
    bus.listen('sfx/click', () => this.playTick(520, 0.045));
  }

  get currentFilterFrequency() {
    return this.filterNode ? this.filterNode.frequency.value : (this.muffled ? 480 : 19500);
  }
}
