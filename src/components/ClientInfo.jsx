import MicButton from "./MicButton";

export default function ClientInfo({ client, setClient }) {
  const update = (field) => (value) =>
    setClient((prev) => ({ ...prev, [field]: value }));

  return (
    <div className="bg-white px-4 py-5 sm:px-6 space-y-4 border-b border-slate-200">
      <div>
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          To
        </label>
        <div className="mt-1 flex items-center gap-2">
          <input
            type="text"
            value={client.name}
            onChange={(e) => update("name")(e.target.value)}
            placeholder="Client / company name"
            className="flex-1 rounded-lg border border-slate-300 px-3 py-2.5 text-[15px] focus:outline-none focus:ring-2 focus:ring-navy-800 focus:border-navy-800"
          />
          <MicButton
            onResult={(text) =>
              update("name")((client.name ? client.name + " " : "") + text)
            }
            className="w-11 h-11"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Date
          </label>
          <input
            type="date"
            value={client.date}
            onChange={(e) => update("date")(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-[15px] focus:outline-none focus:ring-2 focus:ring-navy-800 focus:border-navy-800"
          />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Quotation No.
          </label>
          <input
            type="text"
            value={client.quoteNo}
            onChange={(e) => update("quoteNo")(e.target.value)}
            placeholder="e.g. TSF-014"
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-[15px] focus:outline-none focus:ring-2 focus:ring-navy-800 focus:border-navy-800"
          />
        </div>
      </div>

      <div>
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Sub (what the enquiry was about)
        </label>
        <div className="mt-1 flex items-center gap-2">
          <input
            type="text"
            value={client.subject}
            onChange={(e) => update("subject")(e.target.value)}
            placeholder="e.g. SS railing for staircase"
            className="flex-1 rounded-lg border border-slate-300 px-3 py-2.5 text-[15px] focus:outline-none focus:ring-2 focus:ring-navy-800 focus:border-navy-800"
          />
          <MicButton
            onResult={(text) =>
              update("subject")(
                (client.subject ? client.subject + " " : "") + text
              )
            }
            className="w-11 h-11"
          />
        </div>
      </div>
    </div>
  );
}
