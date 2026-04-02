import type { Language } from "../types";
import { NUMBER_WORDS } from "../data/numberWords";

/** Map internal language codes to BCP 47 speech synthesis language tags */
function getLangCode(lang: Language): string {
  switch (lang) {
    case "ku": return "ku";
    case "en": return "en-US";
    case "ar": return "ar-SA";
    case "fa": return "fa-IR";
    default: return "tr-TR";
  }
}

export function speak(text: string, lang: Language, rate = 0.85): void {
  try {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = getLangCode(lang);
    utterance.rate = rate;
    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  } catch {
    // Speech synthesis not available
  }
}

export function speakNumber(value: number, lang: Language): void {
  const words = NUMBER_WORDS[lang] || NUMBER_WORDS.tr;
  const word = words[value] || String(value);
  speak(word, lang, 0.9);
}

export function cancelSpeech(): void {
  try {
    speechSynthesis.cancel();
  } catch {
    // Not available
  }
}

export interface VoiceRecognitionCallbacks {
  onResult: (transcript: string) => void;
  onError: () => void;
}

const SpeechRecognitionAPI =
  typeof window !== "undefined"
    ? (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    : null;

export function startVoiceRecognition(
  lang: Language,
  callbacks: VoiceRecognitionCallbacks
): any | null {
  if (!SpeechRecognitionAPI) return null;

  try {
    const recognition = new SpeechRecognitionAPI();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = getLangCode(lang);

    recognition.onresult = (ev: any) => {
      const transcript = ev.results[ev.results.length - 1][0].transcript
        .toLowerCase()
        .trim();
      callbacks.onResult(transcript);
    };

    recognition.onerror = () => callbacks.onError();

    recognition.onend = () => {
      try { recognition.start(); } catch { /* ignore */ }
    };

    recognition.start();
    return recognition;
  } catch {
    return null;
  }
}

export function stopVoiceRecognition(recognition: any): void {
  if (!recognition) return;
  try {
    recognition.onend = null;
    recognition.stop();
  } catch {
    // Not available
  }
}
