import { forwardRef } from "react";
const banner = "/header-banner.jpg";

const inr = (n) =>
  n || n === 0
    ? Number(n).toLocaleString("en-IN", { maximumFractionDigits: 2 })
    : "";

// Fixed at A4 pixel width (96dpi) so html2canvas always produces the
// same crisp, print-accurate result no matter the screen size it's
// generated on.
const PrintableQuote = forwardRef(
  ({ client, items, terms, transport, sqftLabel, rateLabel }, ref) => {
    const itemsTotal = items.reduce(
      (sum, i) => sum + (parseFloat(i.total) || 0),
      0,
    );

    const transportCharge = parseFloat(transport) || 0;

    const grandTotal = itemsTotal + transportCharge;
    const rows =
      items.length > 0
        ? items
        : [{ id: "blank", particulars: "", sqft: "", rate: "", total: "" }];

    return (
      <div
        ref={ref}
        style={{ width: "794px", fontFamily: "'Calibri','Inter',sans-serif" }}
        className="bg-white text-slate-900"
      >
        <img
          src="/header-banner.jpg"
          alt="TS Fabrication"
          style={{ width: "100%", display: "block" }}
        />

        <div
          style={{
            paddingTop: "0px", // or 5px if you want a tiny gap
            paddingLeft: "40px",
            paddingRight: "40px",
            paddingBottom: "40px",
          }}
        >
          <p style={{ fontWeight: 700, fontSize: 15 }}>To ; {client.name}</p>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 4,
            }}
          >
            <div />
            <p style={{ fontWeight: 700, fontSize: 15 }}>
              Date:{" "}
              {client.date
                ? new Date(client.date).toLocaleDateString("en-IN")
                : ""}
            </p>
          </div>

          <p style={{ fontWeight: 700, fontSize: 15, marginTop: 10 }}>
            Dear Sir/ madam
          </p>
          <p
            style={{
              fontWeight: 700,
              fontSize: 15,
              textDecoration: "underline",
            }}
          >
            Sub: {client.subject}
          </p>

          <p style={{ fontSize: 14, marginTop: 8 }}>
            Thank you very much for your Enquire regarding
            <br />
            We would like to quote our most competitive rate as under.
          </p>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: 14,
              fontSize: 14,
            }}
          >
            <thead>
              <tr style={{ background: "#f4f4f4" }}>
                {[
                  "SL.NO",
                  "Particulars",
                  sqftLabel || "Apx Sqft",
                  rateLabel || "Per SQFT",
                  "Total Amount",
                ].map((h, i) => (
                  <th
                    key={h}
                    style={{
                      border: "1px solid #333",
                      padding: "8px 10px",
                      fontWeight: 700,
                      textAlign: i === 1 ? "left" : "center",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((item, idx) => (
                <tr key={item.id}>
                  <td
                    style={{
                      border: "1px solid #333",
                      padding: "10px",
                      textAlign: "center",
                      verticalAlign: "top",
                    }}
                  >
                    {items.length > 0 ? idx + 1 : ""}
                  </td>
                  <td
                    style={{
                      border: "1px solid #333",
                      padding: "10px",
                      verticalAlign: "top",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {item.particulars}
                  </td>
                  <td
                    style={{
                      border: "1px solid #333",
                      padding: "10px",
                      textAlign: "center",
                      verticalAlign: "top",
                    }}
                  >
                    {item.sqft}
                  </td>
                  <td
                    style={{
                      border: "1px solid #333",
                      padding: "10px",
                      textAlign: "center",
                      verticalAlign: "top",
                    }}
                  >
                    {item.rate ? inr(item.rate) : ""}
                  </td>
                  <td
                    style={{
                      border: "1px solid #333",
                      padding: "10px",
                      textAlign: "right",
                      verticalAlign: "top",
                    }}
                  >
                    {item.total !== "" ? inr(item.total) : ""}
                  </td>
                </tr>
              ))}
              {/* pad with a couple of blank rows so short quotes still look like a proper table */}
              {/* {items.length > 0 &&
              Array.from({ length: Math.max(0, 3 - items.length) }).map(
                (_, i) => (
                  <tr key={`pad-${i}`}>
                    <td style={{ border: "1px solid #333", padding: "16px" }} />
                    <td style={{ border: "1px solid #333", padding: "16px" }} />
                    <td style={{ border: "1px solid #333", padding: "16px" }} />
                    <td style={{ border: "1px solid #333", padding: "16px" }} />
                    <td style={{ border: "1px solid #333", padding: "16px" }} />
                  </tr>
                ),
              )} */}
              {/* <tr>
                <td
                  colSpan={4}
                  style={{
                    border: "1px solid #333",
                    padding: "10px",
                    textAlign: "right",
                    fontWeight: 700,
                  }}
                >
                  Transport
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    border: "1px solid #333",
                    padding: "10px",
                    textAlign: "right",
                  }}
                >
                  ₹ {inr(transportCharge)}
                </td>

                <td
                  colSpan={4}
                  style={{
                    border: "1px solid #333",
                    padding: "10px",
                    textAlign: "right",
                    fontWeight: 700,
                  }}
                >
                  Grand Total
                </td>
                <td
                  style={{
                    border: "1px solid #333",
                    padding: "10px",
                    textAlign: "right",
                    fontWeight: 700,
                  }}
                >
                  ₹ {inr(grandTotal)}
                </td>
              </tr> */}
              {/* Transport Row */}
              <tr>
                <td
                  colSpan={4}
                  style={{
                    border: "1px solid #333",
                    padding: "10px",
                    textAlign: "right",
                    fontWeight: "bold",
                  }}
                >
                  Transport
                </td>

                <td
                  style={{
                    border: "1px solid #333",
                    padding: "10px",
                    textAlign: "right",
                  }}
                >
                  ₹ {inr(transportCharge)}
                </td>
              </tr>

              {/* Grand Total Row */}
              <tr>
                <td
                  colSpan={4}
                  style={{
                    border: "1px solid #333",
                    padding: "10px",
                    textAlign: "right",
                    fontWeight: "bold",
                    fontSize: "15px",
                  }}
                >
                  Grand Total
                </td>

                <td
                  style={{
                    border: "1px solid #333",
                    padding: "10px",
                    textAlign: "right",
                    fontWeight: "bold",
                    fontSize: "15px",
                  }}
                >
                  ₹ {inr(grandTotal)}
                </td>
              </tr>
            </tbody>
          </table>

          <div style={{ marginTop: 20 }}>
            <p
              style={{
                fontWeight: 700,
                fontSize: 14,
                textDecoration: "underline",
              }}
            >
              Terms &amp; Conditions
            </p>
            <p style={{ fontSize: 13.5, marginTop: 6 }}>
              ➢ GST @ 18% will be extra for materials
            </p>
            <p style={{ fontSize: 13.5 }}>
              ➢ Payments – 60% Advance along with order, 30% against delivery of
              materials &amp;
            </p>
            <p style={{ fontSize: 13.5 }}>
              Balance immediately after installation.
            </p>
            <p style={{ fontSize: 13.5 }}>
              ➢ Work completion – by 15Days receipt of P.O. along with advance.
            </p>
            <p style={{ fontSize: 13.5 }}>
              ➢ Kindly call up <b>Mr. {terms.contactName}.</b> (
              {terms.contactPhone}) to Confirm the Order.
            </p>
            <p style={{ fontSize: 13.5, fontWeight: 700, marginTop: 4 }}>
              Note: Quotation is valid for 7 Days from the date issue.
            </p>
          </div>
        </div>
      </div>
    );
  },
);

export default PrintableQuote;
