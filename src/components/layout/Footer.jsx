import { Link } from "react-router-dom";
import { ArrowUp, Mail } from "lucide-react";
import Container from "../ui/Container";
import { Instagram, Linkedin, Tiktok } from "../ui/SocialIcons";
import SignatureMotif from "../ui/SignatureMotif";

const QUICK_LINKS = [
  { to: "/about", label: "About Us" },
  { to: "/events", label: "Events" },
  { to: "/sandbox", label: "Sandbox" },
  { to: "/newsletter", label: "Newsletter" },
  { to: "/contact", label: "Contact" },
];

const RESOURCES = [
  { to: "/about", label: "Our Committee" },
  { to: "/newsletter", label: "Past Issues" },
];

const SOCIALS = [
  { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/apiit_eclub/" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/company/apiit-eclub/posts/?feedView=all" },
  { icon: Tiktok, label: "TikTok", href: "https://www.tiktok.com/@apiit_eclub" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-dark-green text-white">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-70"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-gold/10 to-transparent"
      />

      <SignatureMotif
        tone="light"
        className="pointer-events-none absolute -right-10 top-10 hidden h-auto w-[420px] max-w-none opacity-[0.15] lg:block"
      />

      <p
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-10 left-1/2 w-full -translate-x-1/2 select-none whitespace-nowrap text-center text-5xl font-bold leading-none tracking-tight text-white/[0.04] sm:text-8xl md:text-9xl lg:text-[11rem] xl:text-[14rem]"
      >
        APIIT E-CLUB
      </p>

      <Container className="relative pt-24 pb-10">
        <div className="grid gap-12 border-b border-white/10 pb-12 lg:grid-cols-[1.4fr_1fr_1fr_1.4fr]">
          <div>
            <Link to="/" className="inline-flex items-center">
              <img src="/eclub-logo-trimmed.png" alt="APIIT Entrepreneurship Club" className="h-11 w-auto" />
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">
              A community for APIIT students building leadership, innovation and entrepreneurial spirit - one venture at a time.
            </p>
            <div className="mt-6 flex gap-3">
              {SOCIALS.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-300 hover:-translate-y-1 hover:bg-gold hover:text-dark-green"
                >
                  <Icon className="h-4.5 w-4.5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gold-light">Quick Links</h3>
            <ul className="mt-5 space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-sm text-white/70 transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gold-light">Resources</h3>
            <ul className="mt-5 space-y-3">
              {RESOURCES.map((link, i) => (
                <li key={link.label + i}>
                  <Link to={link.to} className="text-sm text-white/70 transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gold-light">Get in Touch</h3>
            <p className="mt-5 text-sm leading-relaxed text-white/60">
              Have a question or an idea for the club? Reach out directly.
            </p>
            <a
              href="mailto:eclub@apiit.lk"
              className="mt-4 inline-flex items-center gap-2.5 rounded-full bg-white/10 py-3 pl-5 pr-6 text-sm font-medium text-white transition-colors hover:bg-gold hover:text-dark-green"
            >
              <Mail className="h-4 w-4" />
              eclub@apiit.lk
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-6 pt-8 sm:flex-row">
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
            <p className="text-xs text-white/50">
              © {new Date().getFullYear()} APIIT Entrepreneurship Club. All rights reserved.
            </p>
            <span className="hidden h-4 w-px bg-white/15 sm:block" aria-hidden="true" />
            <div className="flex items-center gap-2 text-xs text-white/40">
              <span>A student initiative of</span>
              <img src="/apiit-logo.png" alt="APIIT" className="h-5 w-auto brightness-0 invert opacity-100" />
            </div>
          </div>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs font-medium text-white/70 transition-colors hover:border-gold hover:text-white"
          >
            Back to top <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>
      </Container>
    </footer>
  );
}
