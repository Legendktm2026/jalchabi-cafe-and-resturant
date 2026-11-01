/**
 * Jalchabi Sensory Audio Foley Engine — High-End French Atelier Style
 * 
 * Synthesizes organic acoustic micro-interactions directly via the Web Audio API.
 * 100% Native, 0 KB external sound file downloads, zero latency, runs offline.
 */

class SoundFoleyEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
  }

  /**
   * 1. Coffee Pour / Liquid Drip Foley
   * Synthesizes warm liquid trickling into a ceramic vessel using randomized resonant bandpass filters
   */
  public playCoffeePour() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      // White/Pink noise burst
      const bufferSize = ctx.sampleRate * 0.35;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        data[i] = (lastOut + 0.02 * white) / 1.02; // Pink-ish noise filter
        lastOut = data[i];
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      // Resonant liquid filter
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(800, now);
      filter.frequency.exponentialRampToValueAtTime(1400, now + 0.3);
      filter.Q.setValueAtTime(8, now);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.12, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start(now);
      noise.stop(now + 0.35);

      // Droplet resonant harmonic ping
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1100 + Math.random() * 300, now + 0.08);
      osc.frequency.exponentialRampToValueAtTime(750, now + 0.25);

      oscGain.gain.setValueAtTime(0.06, now + 0.08);
      oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);

      osc.connect(oscGain);
      oscGain.connect(ctx.destination);
      osc.start(now + 0.08);
      osc.stop(now + 0.28);
    } catch {
      // Graceful fallback
    }
  }

  /**
   * 2. Porcelain / Terracotta Bhar Clink Foley
   * Crystalline high-frequency bell tone replicating delicate hand-turned earthenware
   */
  public playPorcelainClink() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      // Harmonic earthenware chime
      osc.frequency.setValueAtTime(2480, now);
      osc.frequency.exponentialRampToValueAtTime(2100, now + 0.22);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.09, now + 0.004);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.22);

      // Secondary overtone
      const subOsc = ctx.createOscillator();
      const subGain = ctx.createGain();
      subOsc.type = 'triangle';
      subOsc.frequency.setValueAtTime(4200, now);
      subGain.gain.setValueAtTime(0.03, now);
      subGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

      subOsc.connect(subGain);
      subGain.connect(ctx.destination);
      subOsc.start(now);
      subOsc.stop(now + 0.12);
    } catch {
      // Graceful fallback
    }
  }

  /**
   * 3. Lake Breeze & Veranda Air Foley
   * Soft, filtered ambient wind whoosh simulating twilight air blowing across the lake
   */
  public playLakeBreeze() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const bufferSize = ctx.sampleRate * 0.55;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(220, now);
      filter.frequency.exponentialRampToValueAtTime(480, now + 0.25);
      filter.frequency.exponentialRampToValueAtTime(180, now + 0.55);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.07, now + 0.2);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start(now);
      noise.stop(now + 0.55);
    } catch {
      // Graceful fallback
    }
  }

  /**
   * 4. Tactile Brass / Button Click Foley
   * Crisp, metallic micro-click for UI buttons and tabs
   */
  public playSwitchClick() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1400, now);
      osc.frequency.exponentialRampToValueAtTime(600, now + 0.04);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.04);
    } catch {
      // Graceful fallback
    }
  }

  /**
   * 5. Solid Brass Door Latch & French Door Swing Foley
   * Heavy mechanical latch click, handle release, and smooth wooden hinge swing
   */
  public playDoorOpen() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;

      // 1. Initial mechanical latch click (brass tumbler)
      const latchOsc = ctx.createOscillator();
      const latchGain = ctx.createGain();
      latchOsc.type = 'triangle';
      latchOsc.frequency.setValueAtTime(1800, now);
      latchOsc.frequency.exponentialRampToValueAtTime(320, now + 0.05);

      latchGain.gain.setValueAtTime(0.12, now);
      latchGain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

      latchOsc.connect(latchGain);
      latchGain.connect(ctx.destination);
      latchOsc.start(now);
      latchOsc.stop(now + 0.06);

      // 2. Smooth wooden / air displacement swing
      const bufferSize = ctx.sampleRate * 0.45;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(140, now + 0.04);
      filter.frequency.exponentialRampToValueAtTime(380, now + 0.25);
      filter.frequency.exponentialRampToValueAtTime(120, now + 0.45);
      filter.Q.setValueAtTime(4.0, now);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.001, now + 0.04);
      noiseGain.gain.linearRampToValueAtTime(0.08, now + 0.18);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(ctx.destination);

      noise.start(now + 0.04);
      noise.stop(now + 0.45);
    } catch {
      // Graceful fallback
    }
  }

  /**
   * 6. Real World Dimensional Portal Whoosh
   * Celestial resonant swell and acoustic air surge stepping into the open sky
   */
  public playPortalTransition() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;

      // Resonant harmonic choir/bell chime
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.4);
      osc.frequency.exponentialRampToValueAtTime(523.25, now + 0.85);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.09, now + 0.25);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.9);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.9);

      // Trigger lake breeze as outdoor ambiance rushes in
      this.playLakeBreeze();
    } catch {
      // Graceful fallback
    }
  }
}

export const soundFoley = new SoundFoleyEngine();
