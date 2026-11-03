// ─────────────────────────────────────────────────────────────
//  JobGroup – edit THIS file only to wire up real WhatsApp contacts.
// ─────────────────────────────────────────────────────────────
window.JOBGROUP = {
  // Default WhatsApp number (international format, no + or spaces, e.g. "2348012345678").
  // Used for "Post a Job" and for any state that has no number below.
  // PLACEHOLDER – replace before going live.
  postNumber: "2340000000000",

  // One WhatsApp number per state.  Key = state name, Value = number in international
  // format (no + or spaces).  Example:  "Abia": "23480111...",
  // Leave a value empty ("") to fall back to postNumber.
  numbers: {
    "Abia": "",
    "Adamawa": "",
    "Akwa Ibom": "",
    "Anambra": "",
    "Bauchi": "",
    "Bayelsa": "",
    "Benue": "",
    "Borno": "",
    "Cross River": "",
    "Delta": "",
    "Ebonyi": "",
    "Edo": "",
    "Ekiti": "",
    "Enugu": "",
    "FCT": "",
    "Gombe": "",
    "Imo": "",
    "Jigawa": "",
    "Kaduna": "",
    "Kano": "",
    "Katsina": "",
    "Kebbi": "",
    "Kogi": "",
    "Kwara": "",
    "Lagos": "",
    "Nasarawa": "",
    "Niger": "",
    "Ogun": "",
    "Ondo": "",
    "Osun": "",
    "Oyo": "",
    "Plateau": "",
    "Rivers": "",
    "Sokoto": "",
    "Taraba": "",
    "Yobe": "",
    "Zamfara": "",
  },

  // Optional: a WhatsApp group invite link per state.  If set, it is used instead of the
  // number above when someone taps that state.  Example:
  // "Oyo": "https://chat.whatsapp.com/XXXXXXXXXXXX",
  groups: {
  },
};
