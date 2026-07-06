import { useState } from "react";
import { Download, Share2, Loader2 } from "lucide-react";
import { buildPdf, downloadPdf, sharePdf, fileNameFor } from "../utils/pdf";

export default function ActionBar({ printableRef, client, itemsCount }) {
  const [busy, setBusy] = useState(null); // "download" | "share" | null
  const [message, setMessage] = useState("");

  const disabled = itemsCount === 0 || busy !== null;

  const handleDownload = async () => {
    setBusy("download");
    setMessage("");
    try {
      const pdf = await buildPdf(printableRef.current);
      downloadPdf(pdf, fileNameFor(client));
      setMessage("PDF downloaded.");
    } catch (e) {
      setMessage("Could not create the PDF. Please try again.");
    } finally {
      setBusy(null);
    }
  };

  const handleShare = async () => {
    setBusy("share");
    setMessage("");
    try {
      const pdf = await buildPdf(printableRef.current);
      const result = await sharePdf(pdf, fileNameFor(client));
      setMessage(
        result === "shared"
          ? "Choose WhatsApp from the share sheet to send it."
          : "Sharing isn't supported here — the PDF was downloaded instead."
      );
    } catch (e) {
      if (e?.name !== "AbortError") {
        setMessage("Could not share the PDF. Please try again.");
      }
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="sticky bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-4 py-3 shadow-[0_-4px_12px_rgba(0,0,0,0.06)]">
      {message && (
        <p className="text-xs text-center text-slate-500 mb-2">{message}</p>
      )}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={handleDownload}
          disabled={disabled}
          className="flex-1 flex items-center justify-center gap-2 rounded-xl border-2 border-navy-900 text-navy-900 font-semibold py-3 disabled:opacity-40 active:bg-navy-50"
        >
          {busy === "download" ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <Download size={18} />
          )}
          PDF
        </button>
        <button
          type="button"
          onClick={handleShare}
          disabled={disabled}
          className="flex-[2] flex items-center justify-center gap-2 rounded-xl bg-rust-500 text-white font-semibold py-3 disabled:opacity-40 active:bg-rust-600"
        >
          {busy === "share" ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <Share2 size={18} />
          )}
          Share to WhatsApp
        </button>
      </div>
    </div>
  );
}
