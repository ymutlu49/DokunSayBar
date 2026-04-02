type OscillatorShape = "sine" | "triangle" | "sawtooth" | "square";

let audioContext: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  try {
    if (!audioContext) {
      const AC = window.AudioContext || (window as any).webkitAudioContext;
      if (AC) audioContext = new AC();
    }
    return audioContext;
  } catch {
    return null;
  }
}

export function playTone(
  frequency: number,
  duration: number,
  volume = 0.1,
  type: OscillatorShape = "sine"
): void {
  const ctx = getAudioContext();
  if (!ctx) return;
  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = type;
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);
    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);
  } catch {
    // Audio not available
  }
}

const NOTE_FREQUENCIES = [262, 294, 330, 349, 392, 440, 494, 523, 587, 659];

export const sfx = {
  snap: () => playTone(800, 0.08, 0.12),
  place: () => playTone(440, 0.06, 0.06),
  flip: () => playTone(500, 0.12, 0.08, "triangle"),
  rotate: () => playTone(600, 0.1, 0.08, "triangle"),
  remove: () => playTone(200, 0.15, 0.06, "sawtooth"),
  note: (value: number) => {
    const freq = NOTE_FREQUENCIES[Math.min(value, 10) - 1] || 262;
    playTone(freq, 0.3, 0.15, "triangle");
  },
};
