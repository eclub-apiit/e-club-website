import React, { useState, useRef, useCallback, useEffect } from 'react';
import ScrollReveal from '../ui/ScrollReveal';
import { Mail, MapPin, Phone } from 'lucide-react';
import emailjs from '@emailjs/browser';

/* ── EmailJS config (client-safe public values) ── */
const PUBLIC_KEY =
  import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? "fZnlxxM2a1mGpbnz7";
const SERVICE_ID =
  import.meta.env.VITE_EMAILJS_SERVICE_ID ?? "service_d7mdajw";
const TEMPLATE_ID =
  import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? "template_i0kzwdh";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const POSITION_OPTIONS = [
  "Student",
  "Teacher",
  "School Coordinator",
  "Sponsor",
  "Other",
];

const ADDRESS =
  'Asia Pacific Institute of Information Technology, No. 388 Union Place, Colombo 02, Sri Lanka';

/* ── Chevron SVG data-URI for select ── */
const CHEVRON_SVG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%237a7086' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`;

/* ── Shared inline styles ── */
const labelStyle = {
  display: "block",
  fontSize: "13.5px",
  fontWeight: 600,
  color: "#e7ddf0",
  marginBottom: "8px",
};

const inputBaseStyle = {
  width: "100%",
  background: "rgba(10,5,15,0.40)",
  border: "1px solid rgba(255,255,255,0.10)",
  borderRadius: "12px",
  padding: "13px 15px",
  color: "#fff",
  fontSize: "14px",
  outline: "none",
  transition: "border-color 0.2s, box-shadow 0.2s",
};

const focusRing = {
  borderColor: "rgba(236,72,153,0.55)",
  boxShadow: "0 0 0 3px rgba(236,72,153,0.15)",
};

const errorBorder = {
  borderColor: "rgba(251,113,133,0.45)",
};

const errorTextStyle = {
  fontSize: "12.5px",
  color: "#fb7185",
  marginTop: "4px",
};

/* ── Component ── */
export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    schoolCompany: "",
    position: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [banner, setBanner] = useState(null); // "success" | "error" | null
  const [focusedField, setFocusedField] = useState(null);

  const bannerRef = useRef(null);
  const fieldRefs = useRef({});

  /* Initialise EmailJS once */
  const initRef = useRef(false);
  useEffect(() => {
    if (!initRef.current) {
      emailjs.init({ publicKey: PUBLIC_KEY });
      initRef.current = true;
    }
  }, []);

  const handleAddressClick = (e) => {
    e.preventDefault();
    const q = encodeURIComponent(ADDRESS);
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const url = isIOS
      ? `https://maps.apple.com/?q=${q}`
      : `https://www.google.com/maps/search/?api=1&query=${q}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  /* Clear error on a field as user edits */
  const handleChange = useCallback((field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }, []);

  /* Validate & submit */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setBanner(null);

    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Please enter your name.";
    if (!form.position) newErrors.position = "Please select a position.";
    if (!form.email.trim() || !EMAIL_RE.test(form.email.trim()))
      newErrors.email = "Please enter a valid email address.";
    if (!form.message.trim()) newErrors.message = "Please enter a message.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      /* Focus first invalid field */
      const order = ["name", "schoolCompany", "position", "email", "message"];
      for (const f of order) {
        if (newErrors[f] && fieldRefs.current[f]) {
          fieldRefs.current[f].focus();
          break;
        }
      }
      return;
    }

    setErrors({});
    setSending(true);

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
        name: form.name.trim(),
        school_company: form.schoolCompany.trim(),
        position: form.position,
        email: form.email.trim(),
        message: form.message.trim(),
      });

      setBanner("success");
      setForm({ name: "", schoolCompany: "", position: "", email: "", message: "" });
      /* Scroll banner into view */
      setTimeout(() => {
        bannerRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 60);
    } catch {
      setBanner("error");
    } finally {
      setSending(false);
    }
  };

  /* ── helpers for inline focus/error styles ── */
  const fieldStyle = (field) => {
    const base = { ...inputBaseStyle };
    if (errors[field]) Object.assign(base, errorBorder);
    if (focusedField === field) Object.assign(base, focusRing);
    return base;
  };

  const selectStyle = (field) => {
    const base = {
      ...inputBaseStyle,
      appearance: "none",
      WebkitAppearance: "none",
      MozAppearance: "none",
      backgroundImage: CHEVRON_SVG,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "right 14px center",
      backgroundSize: "16px 16px",
      paddingRight: "40px",
      cursor: "pointer",
      color: form.position ? "#fff" : "#7a7086",
    };
    if (errors[field]) Object.assign(base, errorBorder);
    if (focusedField === field) Object.assign(base, focusRing);
    return base;
  };

  return (
    <section
      className="pt-32 pb-24 min-h-screen"
      style={{
        background:
          'radial-gradient(720px 620px at 12% 12%, rgba(122,61,104,0.42) 0%, rgba(122,61,104,0) 60%), radial-gradient(780px 680px at 88% 88%, rgba(168,113,150,0.30) 0%, rgba(168,113,150,0) 60%), linear-gradient(180deg, #2A1523 0%, #3c1c33 50%, #2A1523 100%)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-coolvetica font-normal text-white tracking-normal mb-6">
              CONTACT <span className="text-[#a64d79]">US</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Have questions about Sandbox? Want to partner with us? Reach out and our team will get back to you.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <ScrollReveal direction="left" className="min-w-0">
            <div className="bg-[rgba(122,79,176,0.10)] backdrop-blur-sm p-8 rounded-3xl border border-[rgba(183,155,221,0.28)] h-full">
              <h3 className="text-2xl font-bold text-white mb-8 font-display">Get in Touch</h3>

              <div className="space-y-8">
                {/* Email */}
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-[#a64d79]/20 flex items-center justify-center flex-shrink-0 mr-4">
                    <Mail className="w-6 h-6 text-[#a64d79]" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Email</h4>
                    <a href="mailto:Sandbox@apiit.lk" className="text-slate-400 hover:text-white transition-colors">
                      Sandbox@apiit.lk
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-[#a64d79]/20 flex items-center justify-center flex-shrink-0 mr-4">
                    <Phone className="w-6 h-6 text-[#a64d79]" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Phone</h4>
                    <a href="tel:+94777683333" className="text-slate-400 hover:text-white transition-colors">
                      077 768 3333
                    </a>
                    <p className="text-slate-400 text-base">Tyanna Franchesca Avory</p>
                    <p className="text-slate-400 text-sm">Secretary</p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-[#a64d79]/20 flex items-center justify-center flex-shrink-0 mr-4">
                    <MapPin className="w-6 h-6 text-[#a64d79]" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Location</h4>
                    <a href="#" onClick={handleAddressClick} className="text-slate-400 hover:text-white transition-colors cursor-pointer">Entrepreneurship Club, Asia Pacific Institute of Information Technology,<br/>No. 388 Union Place, Colombo 02, Sri Lanka</a>
                  </div>
                </div>

              </div>
            </div>
          </ScrollReveal>

          {/* Contact Form */}
          <ScrollReveal direction="right" delay={200} className="min-w-0">
            <form
              noValidate
              onSubmit={handleSubmit}
              className="bg-[rgba(122,79,176,0.10)] backdrop-blur-sm p-8 rounded-3xl border border-[rgba(183,155,221,0.28)] shadow-2xl h-full"
            >
              {/* ── Banners ── */}
              {banner === "success" && (
                <div
                  ref={bannerRef}
                  role="status"
                  className="contact-banner-animate"
                  style={{
                    background: "rgba(16,185,129,0.12)",
                    border: "1px solid rgba(52,211,153,0.45)",
                    borderRadius: "14px",
                    padding: "15px 16px",
                    marginBottom: "18px",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px",
                  }}
                >
                  {/* Checkmark icon */}
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#34d399"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ flexShrink: 0, marginTop: "1px" }}
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <div>
                    <p style={{ color: "#fff", fontWeight: 700, fontSize: "14px", margin: 0 }}>
                      Your message was sent successfully!
                    </p>
                    <p style={{ color: "#c7f9e5", fontSize: "13.5px", margin: "2px 0 0" }}>
                      Thanks, the Sandbox team will get back to you soon.
                    </p>
                  </div>
                </div>
              )}
              {banner === "error" && (
                <div
                  ref={bannerRef}
                  role="alert"
                  className="contact-banner-animate"
                  style={{
                    background: "rgba(244,63,94,0.10)",
                    border: "1px solid rgba(251,113,133,0.45)",
                    borderRadius: "14px",
                    padding: "15px 16px",
                    marginBottom: "18px",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px",
                  }}
                >
                  {/* Alert icon */}
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#fb7185"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ flexShrink: 0, marginTop: "1px" }}
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  <div>
                    <p style={{ color: "#fff", fontWeight: 700, fontSize: "14px", margin: 0 }}>
                      Couldn&apos;t send your message.
                    </p>
                    <p style={{ color: "#fca5a5", fontSize: "13.5px", margin: "2px 0 0" }}>
                      Please email us directly at Sandbox@apiit.lk.
                    </p>
                  </div>
                </div>
              )}

              {/* ── Fields ── */}
              <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                {/* 1. Your Name */}
                <div>
                  <label htmlFor="contact-name" style={labelStyle}>
                    Your Name
                  </label>
                  <input
                    ref={(el) => (fieldRefs.current.name = el)}
                    type="text"
                    id="contact-name"
                    required
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "err-name" : undefined}
                    placeholder="Your Name"
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    style={fieldStyle("name")}
                  />
                  {errors.name && (
                    <p id="err-name" style={errorTextStyle}>
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* 2. School/Company & Position — side by side */}
                <div className="contact-two-col">
                  {/* School / Company */}
                  <div>
                    <label htmlFor="contact-school-company" style={labelStyle}>
                      School / Company
                    </label>
                    <input
                      ref={(el) => (fieldRefs.current.schoolCompany = el)}
                      type="text"
                      id="contact-school-company"
                      aria-invalid={!!errors.schoolCompany}
                      aria-describedby={errors.schoolCompany ? "err-schoolCompany" : undefined}
                      placeholder="School or Company"
                      value={form.schoolCompany}
                      onChange={(e) => handleChange("schoolCompany", e.target.value)}
                      onFocus={() => setFocusedField("schoolCompany")}
                      onBlur={() => setFocusedField(null)}
                      style={fieldStyle("schoolCompany")}
                    />
                    {errors.schoolCompany && (
                      <p id="err-schoolCompany" style={errorTextStyle}>
                        {errors.schoolCompany}
                      </p>
                    )}
                  </div>

                  {/* 3. Position */}
                  <div>
                    <label htmlFor="contact-position" style={labelStyle}>
                      Position
                    </label>
                    <select
                      ref={(el) => (fieldRefs.current.position = el)}
                      id="contact-position"
                      required
                      aria-invalid={!!errors.position}
                      aria-describedby={errors.position ? "err-position" : undefined}
                      value={form.position}
                      onChange={(e) => handleChange("position", e.target.value)}
                      onFocus={() => setFocusedField("position")}
                      onBlur={() => setFocusedField(null)}
                      style={selectStyle("position")}
                    >
                      <option value="" disabled hidden>
                        Select one…
                      </option>
                      {POSITION_OPTIONS.map((opt) => (
                        <option key={opt} value={opt} style={{ color: "#fff", background: "#1a0d1e" }}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    {errors.position && (
                      <p id="err-position" style={errorTextStyle}>
                        {errors.position}
                      </p>
                    )}
                  </div>
                </div>

                {/* 4. Your Email */}
                <div>
                  <label htmlFor="contact-email" style={labelStyle}>
                    Your Email
                  </label>
                  <input
                    ref={(el) => (fieldRefs.current.email = el)}
                    type="email"
                    id="contact-email"
                    required
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "err-email" : undefined}
                    placeholder="Enter a valid email"
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    style={fieldStyle("email")}
                  />
                  {errors.email && (
                    <p id="err-email" style={errorTextStyle}>
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* 5. Message */}
                <div>
                  <label htmlFor="contact-message" style={labelStyle}>
                    Message
                  </label>
                  <textarea
                    ref={(el) => (fieldRefs.current.message = el)}
                    id="contact-message"
                    required
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "err-message" : undefined}
                    placeholder="How can we help you?"
                    value={form.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                    style={{
                      ...fieldStyle("message"),
                      minHeight: "120px",
                      resize: "vertical",
                    }}
                  />
                  {errors.message && (
                    <p id="err-message" style={errorTextStyle}>
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Send button */}
                <button
                  type="submit"
                  disabled={sending}
                  className="contact-send-btn"
                  style={{
                    width: "100%",
                    padding: "14px 0",
                    borderRadius: "14px",
                    background: "linear-gradient(135deg, #b83f7d, #ff5ba3)",
                    border: "none",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: "15px",
                    cursor: sending ? "progress" : "pointer",
                    opacity: sending ? 0.6 : 1,
                    boxShadow: "0 4px 20px rgba(236,72,153,0.25)",
                    transition: "transform 0.2s, box-shadow 0.2s, opacity 0.2s",
                    outline: "none",
                    minHeight: "48px",
                  }}
                >
                  {sending ? "Sending…" : "Send Message"}
                </button>
              </div>
            </form>
          </ScrollReveal>
        </div>
      </div>

      {/* ── Scoped styles ── */}
      <style>{`
        .contact-two-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        @media (max-width: 520px) {
          .contact-two-col {
            grid-template-columns: 1fr;
          }
        }

        /* Placeholder color for inputs/textarea */
        input::placeholder,
        textarea::placeholder {
          color: #7a7086;
        }

        /* Send button hover (not disabled) */
        .contact-send-btn:not(:disabled):hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 24px rgba(236, 72, 153, 0.35);
        }
        .contact-send-btn:focus-visible {
          box-shadow: 0 0 0 3px rgba(236, 72, 153, 0.3),
            0 4px 20px rgba(236, 72, 153, 0.25);
        }

        /* Banner animation */
        .contact-banner-animate {
          animation: bannerIn 0.35s ease-out both;
        }
        @keyframes bannerIn {
          from {
            opacity: 0;
            transform: translateY(-6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .contact-banner-animate {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
