import { Trash2, Plus } from "lucide-react";
import MicButton from "./MicButton";

const inr = (n) =>
  n || n === 0
    ? Number(n).toLocaleString("en-IN", { maximumFractionDigits: 2 })
    : "";

export default function ItemsTable({ items, setItems }) {
  const updateItem = (id, field, value) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const next = { ...item, [field]: value };
        if (field === "sqft" || field === "rate") {
          if (item.autoTotal !== false) {
            const sqft = parseFloat(field === "sqft" ? value : item.sqft) || 0;
            const rate = parseFloat(field === "rate" ? value : item.rate) || 0;
            next.total = sqft && rate ? sqft * rate : "";
          }
        }
        if (field === "total") {
          next.autoTotal = false;
        }
        return next;
      })
    );
  };

  const addRow = () => {
    setItems((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        particulars: "",
        sqft: "",
        rate: "",
        total: "",
        autoTotal: true,
      },
    ]);
  };

  const removeRow = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const grandTotal = items.reduce((sum, i) => sum + (parseFloat(i.total) || 0), 0);

  return (
    <div className="bg-white px-4 sm:px-6 py-5 border-b border-slate-200">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500 mb-3">
        Items
      </h2>

      <div className="space-y-3">
        {items.map((item, idx) => (
          <div
            key={item.id}
            className="rounded-xl border border-slate-200 bg-slate-50 p-3 relative"
          >
            <div className="flex items-start gap-2">
              <span className="mt-2.5 text-xs font-bold text-navy-800 w-5 shrink-0">
                {idx + 1}
              </span>
              <textarea
                value={item.particulars}
                onChange={(e) => updateItem(item.id, "particulars", e.target.value)}
                placeholder="Describe the item — grade, finish, location..."
                rows={2}
                className="flex-1 resize-none rounded-lg border border-slate-300 px-3 py-2 text-[15px] focus:outline-none focus:ring-2 focus:ring-navy-800 focus:border-navy-800"
              />
              <MicButton
                onResult={(text) =>
                  updateItem(
                    item.id,
                    "particulars",
                    (item.particulars ? item.particulars + " " : "") + text
                  )
                }
                className="w-10 h-10 mt-0.5"
              />
            </div>

            <div className="grid grid-cols-3 gap-2 mt-2 ml-7">
              <div>
                <label className="text-[11px] font-medium text-slate-500">
                  Apx Sqft
                </label>
                <input
                  type="number"
                  inputMode="decimal"
                  value={item.sqft}
                  onChange={(e) => updateItem(item.id, "sqft", e.target.value)}
                  placeholder="0"
                  className="mt-0.5 w-full rounded-lg border border-slate-300 px-2 py-2 text-[15px] focus:outline-none focus:ring-2 focus:ring-navy-800 focus:border-navy-800"
                />
              </div>
              <div>
                <label className="text-[11px] font-medium text-slate-500">
                  Per Sqft (₹)
                </label>
                <input
                  type="number"
                  inputMode="decimal"
                  value={item.rate}
                  onChange={(e) => updateItem(item.id, "rate", e.target.value)}
                  placeholder="0"
                  className="mt-0.5 w-full rounded-lg border border-slate-300 px-2 py-2 text-[15px] focus:outline-none focus:ring-2 focus:ring-navy-800 focus:border-navy-800"
                />
              </div>
              <div>
                <label className="text-[11px] font-medium text-slate-500">
                  Total (₹)
                </label>
                <input
                  type="number"
                  inputMode="decimal"
                  value={item.total}
                  onChange={(e) => updateItem(item.id, "total", e.target.value)}
                  placeholder="0"
                  className="mt-0.5 w-full rounded-lg border border-slate-300 px-2 py-2 text-[15px] font-semibold text-navy-900 focus:outline-none focus:ring-2 focus:ring-navy-800 focus:border-navy-800"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => removeRow(item.id)}
              aria-label="Remove item"
              className="absolute top-2 right-2 text-slate-400 active:text-rust-600 p-1"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>

      {items.length === 0 && (
        <p className="text-sm text-slate-400 text-center py-6">
          No items yet. Tap "Add Item" to start the quotation.
        </p>
      )}

      <button
        type="button"
        onClick={addRow}
        className="mt-4 w-full flex items-center justify-center gap-2 rounded-lg border-2 border-dashed border-navy-300 text-navy-800 font-semibold py-3 active:bg-navy-50"
      >
        <Plus size={18} /> Add Item
      </button>

      {items.length > 0 && (
        <div className="mt-4 flex items-center justify-between rounded-lg bg-navy-900 text-white px-4 py-3">
          <span className="font-semibold">Grand Total</span>
          <span className="text-lg font-bold">₹ {inr(grandTotal)}</span>
        </div>
      )}
    </div>
  );
}
