import { useRef, useState } from "react";
import QuoteHeader from "./components/QuoteHeader";
import ClientInfo from "./components/ClientInfo";
import ItemsTable from "./components/ItemsTable";
import TermsFooter from "./components/TermsFooter";
import ActionBar from "./components/ActionBar";
import PrintableQuote from "./components/PrintableQuote";

const today = () => new Date().toISOString().slice(0, 10);

export default function App() {
  const [sqftLabel, setSqftLabel] = useState("Apx Sqft");
  const [rateLabel, setRateLabel] = useState("Per SQFT");
  const [client, setClient] = useState({
    name: "",
    date: today(),
    quoteNo: "",
    subject: "",
  });

  const [items, setItems] = useState([]);
  const [transport, setTransport] = useState("");

  const [terms, setTerms] = useState({
    contactName: "Arasu",
    contactPhone: "8660332757",
  });

  const printableRef = useRef(null);

  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      <div className="flex-1 w-full max-w-md mx-auto bg-white shadow-sm">
        <QuoteHeader />
        <ClientInfo client={client} setClient={setClient} />
        <ItemsTable
          items={items}
          setItems={setItems}
          transport={transport}
          setTransport={setTransport}
          sqftLabel={sqftLabel}
          setSqftLabel={setSqftLabel}
          rateLabel={rateLabel}
          setRateLabel={setRateLabel}
        />
        <TermsFooter terms={terms} setTerms={setTerms} />
      </div>

      <div className="max-w-md mx-auto w-full">
        <ActionBar
          printableRef={printableRef}
          client={client}
          itemsCount={items.length}
        />
      </div>

      {/* Off-screen, full-size layout used only to generate the PDF. */}
      <div style={{ position: "fixed", top: 0, left: "-9999px" }}>
        <PrintableQuote
          ref={printableRef}
          client={client}
          items={items}
          terms={terms}
          transport={transport}
          sqftLabel={sqftLabel}
          rateLabel={rateLabel}
        />
      </div>
    </div>
  );
}
