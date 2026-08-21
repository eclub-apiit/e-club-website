import { Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/layout/ScrollToTop";
import { ScrollProgressBar } from "./components/ui/ProgressIndicator";
import { ToastProvider } from "./components/ui/Toast";
import CursorGlow from "./components/ui/CursorGlow";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Events from "./pages/Events";
import Newsletter from "./pages/Newsletter";
import Contact from "./pages/Contact";

import SandboxLayout from "./components/sandbox/layout/SandboxLayout";
import SandboxHome from "./pages/sandbox/Home";
import SandboxAbout from "./pages/sandbox/About";
import SandboxAboutEditions from "./pages/sandbox/AboutEditions";
import SandboxAboutTeam from "./pages/sandbox/AboutTeam";
import SandboxContact from "./pages/sandbox/Contact";
import SandboxFaqs from "./pages/sandbox/Faqs";
import SandboxSponsors from "./pages/sandbox/Sponsors";
import SandboxWhatWeOffer from "./pages/sandbox/WhatWeOffer";

function App() {
  return (
    <ToastProvider>
      <ScrollToTop />
      <ScrollProgressBar />
      <CursorGlow />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/events" element={<Events />} />
          <Route path="/newsletter" element={<Newsletter />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        <Route path="/sandbox" element={<SandboxLayout />}>
          <Route index element={<SandboxHome />} />
          <Route path="about" element={<SandboxAbout />} />
          <Route path="about/editions" element={<SandboxAboutEditions />} />
          <Route path="about/team" element={<SandboxAboutTeam />} />
          <Route path="contact" element={<SandboxContact />} />
          <Route path="faqs" element={<SandboxFaqs />} />
          <Route path="sponsors" element={<SandboxSponsors />} />
          <Route path="what-we-offer" element={<SandboxWhatWeOffer />} />
        </Route>
      </Routes>
    </ToastProvider>
  );
}

export default App;
