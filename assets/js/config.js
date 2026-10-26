/* ============================================================
   ADVERUNE — Site Configuration
   ------------------------------------------------------------
   This is the SINGLE place to update agency contact details,
   social links and the final domain. No other file needs to be
   edited to make the WhatsApp / e-mail inquiry flow work.

   1) WhatsApp number: international format, digits only.
      Bangladesh example: "8801712345678"  (country code 880,
      then the number WITHOUT the leading 0).
   2) email: the inbox that should receive project inquiries.
   3) siteUrl: your final domain (used for canonical/OG tags are
      in index.html — update those too once the domain is live).
   4) social: full URLs. Leave "" (empty) to hide a link.
   Until values are configured, the inquiry panel shows a clear
   "not configured yet" notice instead of pretending to send.
   ============================================================ */

window.ADVERUNE_CONFIG = {
  contact: {
    whatsappNumber: "",   // e.g. "8801712345678"
    whatsappDisplay: "",   // e.g. "+880 1712-345678" (shown in the UI)
    email: ""              // e.g. "hello@adverune.com"
  },
  social: {
    facebook: "",
    instagram: "",
    linkedin: "",
    twitter: ""
  },
  siteUrl: ""              // e.g. "https://www.adverune.com"
};
