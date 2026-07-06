import { useState, useRef, useCallback, useEffect } from "react";
import { applyVoiceCorrections } from "../utils/voiceCorrections";

// Wraps the browser's built-in speech recognition so any input field can
// be filled by tapping a mic button and talking. The browser itself is
// what converts speech to correctly-spelled text — we just clean it up
// a little afterwards with applyVoiceCorrections().
export function useSpeechToText() {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setIsSupported(false);
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognitionRef.current = recognition;
  }, []);

  const listen = useCallback((onResult) => {
    const recognition = recognitionRef.current;
    if (!recognition) return;

    recognition.onresult = (event) => {
      const raw = event.results[0][0].transcript;
      onResult(applyVoiceCorrections(raw));
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    try {
      recognition.start();
      setIsListening(true);
    } catch (e) {
      // Recognition already running — ignore.
    }
  }, []);

  const stop = useCallback(() => {
    recognitionRef.current?.stop();
    setIsListening(false);
  }, []);

  return { listen, stop, isListening, isSupported };
}
