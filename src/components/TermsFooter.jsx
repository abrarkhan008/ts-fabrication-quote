export default function TermsFooter({ terms, setTerms }) {
  return (
    <div className="bg-white px-4 sm:px-6 py-5">
      <h2 className="text-sm font-bold underline text-slate-800 mb-2">
        Terms &amp; Conditions
      </h2>
      <ul className="space-y-1.5 text-[14px] text-slate-700 list-none">
        <li>➢ GST @ 18% will be extra for materials</li>
        <li>
          ➢ Payments – 60% Advance along with order, 30% against delivery of
          materials &amp; Balance immediately after installation.
        </li>
        <li>➢ Work completion – by 15 Days receipt of P.O. along with advance.</li>
        <li className="flex flex-wrap items-center gap-1">
          <span>➢ Kindly call up</span>
          <input
            type="text"
            value={terms.contactName}
            onChange={(e) =>
              setTerms((p) => ({ ...p, contactName: e.target.value }))
            }
            className="font-bold border-b border-dashed border-slate-400 focus:outline-none focus:border-navy-800 bg-transparent w-28"
          />
          <span>.</span>
          <span>(</span>
          <input
            type="text"
            value={terms.contactPhone}
            onChange={(e) =>
              setTerms((p) => ({ ...p, contactPhone: e.target.value }))
            }
            className="font-bold border-b border-dashed border-slate-400 focus:outline-none focus:border-navy-800 bg-transparent w-32"
          />
          <span>) to Confirm the Order.</span>
        </li>
      </ul>
      <p className="text-[14px] font-bold text-slate-800 mt-2">
        Note: Quotation is valid for 7 Days from the date issue.
      </p>
    </div>
  );
}
