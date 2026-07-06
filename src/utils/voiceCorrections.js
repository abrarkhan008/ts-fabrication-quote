// Common words in the railing / fabrication business that the browser's
// speech engine sometimes mishears. Add more pairs any time you notice
// a word coming out wrong on your phone.
//
// Format: [ what the mic often hears (lowercase) , what it should become ]
const CORRECTIONS = [
  ["stainless steel", "Stainless Steel"],
  ["ss", "SS"],
  ["s s", "SS"],
  ["three sixteen", "316"],
  ["three o four", "304"],
  ["three zero four", "304"],
  ["sqft", "Sqft"],
  ["square feet", "Sqft"],
  ["square foot", "Sqft"],
  ["sq ft", "Sqft"],
  ["brass", "Brass"],
  ["antique brass", "Antique Brass"],
  ["powder coating", "Powder Coating"],
  ["powder coated", "Powder Coated"],
  ["glass railing", "Glass Railing"],
  ["hand rail", "Handrail"],
  ["hand rails", "Handrails"],
  ["ms", "MS"],
  ["m s", "MS"],
  ["gi", "GI"],
  ["g i", "GI"],
  ["balcony", "Balcony"],
  ["staircase", "Staircase"],
  ["stair case", "Staircase"],
  ["grill", "Grill"],
  ["grille", "Grill"],
  ["gate", "Gate"],
  ["fabrication", "Fabrication"],
  ["welding", "Welding"],
  ["nose", "Nosing"],
  ["nosing", "Nosing"],
  ["baluster", "Baluster"],
  ["balusters", "Balusters"],
  ["newel post", "Newel Post"],
  ["mirror finish", "Mirror Finish"],
  ["matt finish", "Matt Finish"],
  ["matte finish", "Matt Finish"],
];

// Capitalise the first letter of every sentence, keep the rest as spoken.
function capitalizeSentence(text) {
  return text.replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
}

// Runs the raw speech-to-text transcript through the correction list and
// tidies up spacing/capitalisation so the field looks professionally typed.
export function applyVoiceCorrections(rawText) {
  if (!rawText) return "";
  let text = rawText.trim();

  // Sort longer phrases first so "antique brass" wins over "brass".
  const sorted = [...CORRECTIONS].sort((a, b) => b[0].length - a[0].length);

  for (const [wrong, right] of sorted) {
    const pattern = new RegExp(`\\b${wrong.replace(/\s+/g, "\\s+")}\\b`, "gi");
    text = text.replace(pattern, right);
  }

  text = text.replace(/\s+/g, " ").trim();
  text = capitalizeSentence(text);
  return text;
}
