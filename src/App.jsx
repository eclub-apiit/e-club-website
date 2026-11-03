import { lazy, Suspense } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import ScrollToTop from "./components/layout/ScrollToTop";

// Direct summit visits only load the event experience, not the club and Sandbox pages.
const ClubRoutes = lazy(() => import("./ClubRoutes"));
const SummitPage = lazy(() => import("./features/summit/SummitPage"));

export default function App() {
  const { pathname, search, hash } = useLocation();
  const isSummit = pathname.startsWith("/convergence-summit-2026");
  return <>
    <ScrollToTop />
    <Suspense fallback={<div role="status" style={{ minHeight: "100svh", background: isSummit ? "#061719" : "#fafaf8", color: isSummit ? "#a7eccd" : "#0b3d2e", display: "grid", placeItems: "center", fontFamily: "sans-serif" }}>{isSummit ? "Entering Convergence…" : "Loading E-Club…"}</div>}>
      <Routes>
        <Route path="/convergence-summit-2026/*" element={pathname === "/convergence-summit-2026/" ? <SummitPage /> : <Navigate to={{ pathname: "/convergence-summit-2026/", search, hash }} replace />} />
        <Route path="/*" element={<ClubRoutes />} />
      </Routes>
    </Suspense>
  </>;
}
