/* ============================================================
   ARCH1CAT — audio-engine.js
   Active Theory Radio & Dynamic Spatial Sound Engine
   Stolen and adapted directly from Active Theory (activetheory.net)
   Features:
   - 8 Authentic Active Theory Radio Streaming Tracks
   - Web Audio Graph: Source -> Lowpass Filter -> Master Gain -> AnalyserNode
   - Signature Active Theory "Muffled Acoustic" effect on project/modal open
   - Real-time frequency analysis for animated equalizer bars
   - Procedural UI sound design (clicks, laser pings, hover buzz)
   - Shuffle, Next, Prev, Marquee Title updates
   ============================================================ */

export const ACTIVE_THEORY_TRACKS = [
    {
        title: "Sergey Azbel - Themis",
        src: "https://activetheory.net/assets/music/Sergey%20Azbel%20-%20Themis.mp3"
    },
    {
        title: "nuer self - Dusk",
        src: "https://activetheory.net/assets/music/nuer%20self%20-%20Dusk.mp3"
    },
    {
        title: "Flint - Fly up High",
        src: "https://activetheory.net/assets/music/Flint%20-%20Fly%20up%20High.mp3"
    },
    {
        title: "Hotham - To the Stars",
        src: "https://activetheory.net/assets/music/Hotham%20-%20To%20the%20Stars.mp3"
    },
    {
        title: "Jozeque - Sultans of Streams",
        src: "https://activetheory.net/assets/music/Jozeque%20-%20Sultans%20of%20Streams.mp3"
    },
    {
        title: "Downtown Binary - Other Worlds",
        src: "https://activetheory.net/assets/music/Downtown%20Binary%20-%20Other%20Worlds.mp3"
    },
    {
        title: "Magiksolo - Quantum World",
        src: "https://activetheory.net/assets/music/Magiksolo%20-%20Quantum%20World.mp3"
    },
    {
        title: "BXRDVJA - Ghost Cities",
        src: "https://activetheory.net/assets/music/BXRDVJA%20-%20Ghost%20Cities.mp3"
    }
];

class ActiveTheoryRadioEngine {
    constructor() {
        this.tracks = [...ACTIVE_THEORY_TRACKS];
        this.currentTrackIndex = 0;
        this.isPlaying = false;
        this.isMuffled = false;
        this.volume = 0.55;
        this.isMuted = false;

        this.audioEl = null;
        this.ctx = null;
        this.sourceNode = null;
        this.filterNode = null;
        this.gainNode = null;
        this.analyser = null;
        this.freqData = null;

        this.listeners = new Set();
        this.init();
    }

    init() {
        // Create audio element for streaming
        this.audioEl = new Audio();
        this.audioEl.crossOrigin = "anonymous";
        this.audioEl.preload = "auto";

        this.audioEl.addEventListener("ended", () => {
            this.next();
        });

        this.audioEl.addEventListener("error", (e) => {
            console.warn("Active Theory Radio stream fallback:", e);
        });

        // Set initial track
        this.setTrack(0, false);
    }

    ensureContext() {
        if (this.ctx) return;
        try {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioCtx();

            this.sourceNode = this.ctx.createMediaElementSource(this.audioEl);

            // 1. Signature Active Theory Lowpass Filter (for Muffled room/underwater effect)
            this.filterNode = this.ctx.createBiquadFilter();
            this.filterNode.type = "lowpass";
            this.filterNode.frequency.setValueAtTime(20000, this.ctx.currentTime);
            this.filterNode.Q.setValueAtTime(1.0, this.ctx.currentTime);

            // 2. Master Gain Node
            this.gainNode = this.ctx.createGain();
            this.gainNode.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);

            // 3. Real-time Frequency Analyser
            this.analyser = this.ctx.createAnalyser();
            this.analyser.fftSize = 64;
            this.analyser.smoothingTimeConstant = 0.85;
            this.freqData = new Uint8Array(this.analyser.frequencyBinCount);

            // Connect Graph: Source -> Filter -> Gain -> Analyser -> Destination
            this.sourceNode.connect(this.filterNode);
            this.filterNode.connect(this.gainNode);
            this.gainNode.connect(this.analyser);
            this.analyser.connect(this.ctx.destination);
        } catch (err) {
            console.warn("Web Audio context init failed or blocked:", err);
        }
    }

    setTrack(index, autoPlay = true) {
        this.currentTrackIndex = (index + this.tracks.length) % this.tracks.length;
        const track = this.tracks[this.currentTrackIndex];
        this.audioEl.src = track.src;
        this.notify('trackchange', { index: this.currentTrackIndex, track });

        if (autoPlay) {
            this.play();
        }
    }

    async play() {
        this.ensureContext();
        if (this.ctx && this.ctx.state === 'suspended') {
            await this.ctx.resume();
        }

        try {
            await this.audioEl.play();
            this.isPlaying = true;
            this.notify('playstate', { isPlaying: true });
        } catch (err) {
            console.warn("Autoplay blocked or user gesture required:", err);
            this.isPlaying = false;
            this.notify('playstate', { isPlaying: false });
        }
    }

    pause() {
        this.audioEl.pause();
        this.isPlaying = false;
        this.notify('playstate', { isPlaying: false });
    }

    togglePlay() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
        this.playSfx('click');
    }

    next() {
        this.setTrack(this.currentTrackIndex + 1, true);
        this.playSfx('ping');
    }

    prev() {
        this.setTrack(this.currentTrackIndex - 1, true);
        this.playSfx('ping');
    }

    shuffle() {
        for (let i = this.tracks.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.tracks[i], this.tracks[j]] = [this.tracks[j], this.tracks[i]];
        }
        this.setTrack(0, true);
        this.playSfx('ping');
    }

    /**
     * Signature Active Theory Muffled Acoustic Effect
     * When opening project drawer or modal:
     * Sweeps low-pass filter down to 480Hz, giving an authentic "club backroom / underwater" spatial feel.
     */
    setMuffled(muffled) {
        this.isMuffled = muffled;
        if (!this.filterNode || !this.ctx) return;

        const targetFreq = muffled ? 480 : 20000;
        const targetQ = muffled ? 3.5 : 1.0;
        const now = this.ctx.currentTime;

        this.filterNode.frequency.cancelScheduledValues(now);
        this.filterNode.frequency.exponentialRampToValueAtTime(Math.max(20, targetFreq), now + 0.65);

        this.filterNode.Q.cancelScheduledValues(now);
        this.filterNode.Q.linearRampToValueAtTime(targetQ, now + 0.65);
    }

    setMuted(muted) {
        this.isMuted = muted;
        if (this.gainNode && this.ctx) {
            const now = this.ctx.currentTime;
            this.gainNode.gain.cancelScheduledValues(now);
            this.gainNode.gain.linearRampToValueAtTime(muted ? 0 : this.volume, now + 0.2);
        }
        this.notify('mute', { isMuted: this.isMuted });
    }

    toggleMute() {
        this.setMuted(!this.isMuted);
        this.playSfx('click');
    }

    getCurrentTrack() {
        return this.tracks[this.currentTrackIndex];
    }

    getEqualizerLevels() {
        if (!this.analyser || !this.isPlaying || this.isMuted) {
            return [0.1, 0.15, 0.1];
        }
        this.analyser.getByteFrequencyData(this.freqData);
        // Sample bass, mid, treble
        const bass = (this.freqData[1] || 0) / 255;
        const mid = (this.freqData[4] || 0) / 255;
        const high = (this.freqData[10] || 0) / 255;
        return [
            Math.max(0.1, bass),
            Math.max(0.15, mid),
            Math.max(0.1, high)
        ];
    }

    /* Procedural UI Sound Effects */
    playSfx(type = 'click') {
        try {
            if (!this.ctx) {
                const AudioCtx = window.AudioContext || window.webkitAudioContext;
                this.ctx = new AudioCtx();
            }
            if (this.ctx.state === 'suspended') {
                this.ctx.resume();
            }

            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const now = this.ctx.currentTime;

            if (type === 'click') {
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(1400, now);
                osc.frequency.exponentialRampToValueAtTime(300, now + 0.04);
                gain.gain.setValueAtTime(0.08, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(now);
                osc.stop(now + 0.04);
            } else if (type === 'ping') {
                osc.type = 'sine';
                osc.frequency.setValueAtTime(2200, now);
                osc.frequency.exponentialRampToValueAtTime(880, now + 0.12);
                gain.gain.setValueAtTime(0.06, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(now);
                osc.stop(now + 0.12);
            } else if (type === 'hover') {
                osc.type = 'sine';
                osc.frequency.setValueAtTime(650, now);
                gain.gain.setValueAtTime(0.02, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(now);
                osc.stop(now + 0.03);
            }
        } catch (e) {
            // Ignore SFX errors on idle
        }
    }

    on(event, callback) {
        this.listeners.add({ event, callback });
    }

    notify(event, data) {
        this.listeners.forEach(l => {
            if (l.event === event) l.callback(data);
        });
    }
}

// Global Singleton instance
export const radio = new ActiveTheoryRadioEngine();
window.__atRadio = radio;
window.__playSfx = (type) => radio.playSfx(type);
