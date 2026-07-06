import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// Renders the given DOM node (the hidden PrintableQuote) to a single-page
// (or multi-page, if it's long) A4 PDF and returns a jsPDF instance.
export async function buildPdf(node) {
  const canvas = await html2canvas(node, {
    scale: 2,
    useCORS: true,
    backgroundColor: "#ffffff",
  });

  const imgData = canvas.toDataURL("image/jpeg", 0.95);

  const pdf = new jsPDF({ unit: "pt", format: "a4" });
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  const imgWidth = pageWidth;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  let heightLeft = imgHeight;
  let position = 0;

  pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
  heightLeft -= pageHeight;

  while (heightLeft > 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  }

  return pdf;
}

export function fileNameFor(client) {
  const safeName = (client.name || "Quotation").replace(/[^a-z0-9]+/gi, "_");
  const date = client.date || new Date().toISOString().slice(0, 10);
  return `TS_Fabrication_Quote_${safeName}_${date}.pdf`;
}

export function downloadPdf(pdf, fileName) {
  pdf.save(fileName);
}

// Tries the native share sheet (which lists WhatsApp on Android/iOS).
// Falls back to a plain download if the browser/device doesn't support
// sharing files.
export async function sharePdf(pdf, fileName) {
  const blob = pdf.output("blob");
  const file = new File([blob], fileName, { type: "application/pdf" });

  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    await navigator.share({
      files: [file],
      title: "TS Fabrication Quotation",
      text: "Please find the quotation attached.",
    });
    return "shared";
  }

  downloadPdf(pdf, fileName);
  return "downloaded";
}
