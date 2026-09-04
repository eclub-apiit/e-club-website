import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { HeroCtaProvider } from "../ui/HeroCtaContext";

export default function SandboxLayout() {
  useEffect(() => {
    document.documentElement.classList.add("sandbox-scrollbar");
    return () => document.documentElement.classList.remove("sandbox-scrollbar");
  }, []);

  return (
    <div className="sandbox-scope flex min-h-screen flex-col bg-slate-950 text-slate-300 font-sans antialiased selection:bg-[#7C3AED] selection:text-white">
      <HeroCtaProvider>
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </HeroCtaProvider>
    </div>
  );
}
