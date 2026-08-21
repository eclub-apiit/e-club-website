import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "../../lib/cn";
import Button from "../ui/Button";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/events", label: "Events" },
  { to: "/newsletter", label: "Newsletter" },
  { to: "/contact", label: "Contact" },
];

// Only these routes open on a full-bleed dark hero, so only they can start
// with a transparent navbar — every other page needs the solid navbar from
// scroll position zero, or its white/dark-green text has nothing to contrast against.
const DARK_HERO_ROUTES = ["/", "/events", "/newsletter"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const hasDarkHero = DARK_HERO_ROUTES.includes(location.pathname);
  const solid = scrolled || open || !hasDarkHero;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-90 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
        solid ? "bg-white/85 shadow-[0_4px_24px_rgba(11,61,46,0.08)] backdrop-blur-xl" : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <NavLink to="/" className="flex items-center transition-transform duration-300 hover:scale-[1.03]">
          <img
            src="/eclub-logo-trimmed.png"
            alt="APIIT Entrepreneurship Club"
            className="h-9 w-auto sm:h-10"
          />
        </NavLink>

        <div className="hidden items-center gap-1 lg:flex">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                cn(
                  "relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300",
                  solid ? "text-ink-soft hover:text-dark-green" : "text-white/85 hover:text-white",
                  isActive && (solid ? "text-dark-green" : "text-white")
                )
              }
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className={cn("absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full", solid ? "bg-gold-dark" : "bg-gold")}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        <div className="hidden lg:block">
          <Button as={NavLink} to="/sandbox" variant="sandbox" size="md">
            Sandbox
          </Button>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen((o) => !o)}
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full lg:hidden",
            solid ? "text-dark-green" : "text-white"
          )}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-black/5 bg-white/95 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-6">
              {LINKS.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <NavLink
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        "block rounded-xl px-4 py-3 text-base font-medium transition-colors",
                        isActive ? "bg-teal/10 text-dark-green" : "text-ink-soft hover:bg-cream hover:text-dark-green"
                      )
                    }
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}
              <Button
                as={NavLink}
                to="/sandbox"
                variant="sandbox"
                onClick={() => setOpen(false)}
                className="mt-3 w-full justify-center"
              >
                Sandbox
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
