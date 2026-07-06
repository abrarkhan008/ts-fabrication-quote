import { Mic, MicOff } from "lucide-react";
import { useSpeechToText } from "../hooks/useSpeechToText";

export default function MicButton({ onResult, className = "" }) {
  const { listen, stop, isListening, isSupported } = useSpeechToText();

  if (!isSupported) return null;

  const handleClick = () => {
    if (isListening) {
      stop();
    } else {
      listen(onResult);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={isListening ? "Stop recording" : "Speak to fill this field"}
      className={`flex items-center justify-center rounded-full transition-all shrink-0 ${
        isListening
          ? "bg-rust-500 text-white shadow-lg shadow-rust-500/40 animate-pulse"
          : "bg-navy-900 text-white active:scale-95"
      } ${className}`}
    >
      {isListening ? <MicOff size={18} /> : <Mic size={18} />}
    </button>
  );
}
