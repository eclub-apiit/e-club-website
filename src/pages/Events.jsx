import { useState, useMemo } from "react";
import {
  Search,
  X,
  Layers,
  ArrowRight,
  Images,
  LayoutGrid,
  CalendarDays,
  MapPin,
  ArrowUpRight,
  Clock,
} from "lucide-react";

import Container from "../components/ui/Container";
import Reveal from "../components/ui/Reveal";
import EventModal from "../components/sections/events/EventModal";
import SignatureMotif from "../components/ui/SignatureMotif";
import { EVENTS, ACADEMIC_TERMS } from "../data/events";

export default function Events() {
  const [selectedTerm, setSelectedTerm] = useState("2024-2025");
  const [viewMode, setViewMode] = useState("grid"); // "grid" | "timeline"
  const [search, setSearch] = useState("");
  const [activeModalEvent, setActiveModalEvent] = useState(null);

  // Lookbook curated snapshot photos for the top strip
  const lookbookPhotos = [
    { src: "/events/2026/Empower Her - 1.jpg", title: "Empower Her Forum", term: "2025–26", id: "empower-her-2026" },
    { src: "/events/2025/Sandbox 2.0.jpg", title: "SANDBOX 2.0 Grand Finale", term: "2024–25", id: "sandbox-2-0-2025" },
    { src: "/events/2026/Icebreaker.jpg", title: "Freshers' Icebreaker", term: "2025–26", id: "icebreaker-2026" },
    { src: "/events/2025/Voices of Her 2025.png", title: "Voices of Her", term: "2024–25", id: "voices-of-her-2025" },
    { src: "/events/2025/Startup Pulse.png", title: "Startup Pulse", term: "2024–25", id: "startup-pulse-2025" },
    { src: "/events/2026/Cal Workshop.jpg", title: "CAL Investment Masterclass", term: "2025–26", id: "cal-workshop-2026" },
    { src: "/events/2025/Mati Strokes.png", title: "Mati Strokes Studio", term: "2024–25", id: "mati-strokes-2025" },
    { src: "/events/2024/Sandbox 01 - 2024.png", title: "Sandbox Interschool Day 01", term: "2023–24", id: "sandbox-day-01-2024" },
    { src: "/events/2024/FoodFest 2024.png", title: "FoodFest Fun Fair", term: "2023–24", id: "foodfest-fun-fair-2024" },
    { src: "/events/2024/Her Story 2024.png", title: "Project HerStory", term: "2023–24", id: "project-herstory-2024" },
    { src: "/events/2023/Startup Summit 2023 - 1.png", title: "Start-Up Summit 2023", term: "2022–23", id: "startup-summit-2023" },
    { src: "/events/2023/AGM 2022-23 - 1.png", title: "E-Club Revival AGM", term: "2022–23", id: "agm-2022-2023" },
  ];

  // Filtered Events (no category filter)
  const filteredEvents = useMemo(() => {
    const query = search.trim().toLowerCase();
    return EVENTS.filter((ev) => {
      if (selectedTerm !== "all" && ev.academicYear !== selectedTerm) return false;
      if (query) {
        const hit =
          ev.title.toLowerCase().includes(query) ||
          ev.description?.toLowerCase().includes(query) ||
          ev.speaker?.toLowerCase().includes(query) ||
          ev.location?.toLowerCase().includes(query) ||
          ev.tag?.toLowerCase().includes(query);
        if (!hit) return false;
      }
      return true;
    });
  }, [selectedTerm, search]);

  const spotlightEvents = useMemo(() => {
    const featured = filteredEvents.filter((event) => event.featured);
    if (featured.length > 0) return featured.slice(0, 2);
    return filteredEvents.slice(0, 1);
  }, [filteredEvents]);

  const getTermCount = (termId) => {
    if (termId === "all") return EVENTS.length;
    return EVENTS.filter((e) => e.academicYear === termId).length;
  };

  return (
    <div className="min-h-screen bg-[#fcfbf9] text-ink font-sans selection:bg-gold selection:text-dark-green">

      {/* ================================================================ */}
      {/* HERO + LOOKBOOK STRIP                                             */}
      {/* ================================================================ */}
      <header className="relative overflow-hidden bg-[#07251c] pt-32 pb-16 sm:pt-36 sm:pb-20 text-white">
        <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none" />
        <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-teal/20 blur-3xl pointer-events-none" />
        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-gold/15 blur-3xl pointer-events-none" />
        <SignatureMotif
          tone="light"
          className="pointer-events-none absolute right-10 top-12 hidden w-[420px] opacity-15 lg:block"
        />

        <Container className="relative">
          <div className="max-w-3xl">
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-white">
              Events
            </h1>

            <p className="mt-4 text-base sm:text-lg leading-relaxed text-white/80 max-w-2xl font-normal">
              A curated record of national pitching competitions, industry masterclasses, founder panels and student venture initiatives - 2023 to 2026.
            </p>
          </div>

          {/* Lookbook Strip */}
          <div className="mt-10 overflow-x-auto pb-2 no-scrollbar">
            <div className="flex gap-4 min-w-max">
              {lookbookPhotos.map((photo, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    const match = EVENTS.find((e) => e.id === photo.id);
                    if (match) setActiveModalEvent(match);
                  }}
                  className="group relative h-44 w-64 sm:h-48 sm:w-72 cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-black/40 shadow-md transition-all duration-300 hover:border-gold/60 hover:-translate-y-1 hover:shadow-xl"
                >
                  <img
                    src={photo.src}
                    alt={photo.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-3 flex items-end justify-between">
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-gold-light">
                        {photo.term}
                      </span>
                      <h4 className="text-xs font-bold text-white leading-snug mt-0.5 line-clamp-1">
                        {photo.title}
                      </h4>
                    </div>
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-transform group-hover:scale-110 group-hover:bg-gold group-hover:text-dark-green">
                      <ArrowUpRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </header>

      {/* ================================================================ */}
      {/* CONTROL BAR: TERMS, VIEW MODE, SEARCH                            */}
      {/* ================================================================ */}
      <section className="sticky top-16 z-30 border-b border-stone-200/70 bg-[#fcfbf9]/95 backdrop-blur-md sm:top-20 py-3.5 shadow-sm">
        <Container>
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* Term Pills */}
            <div className="inline-flex flex-wrap gap-1 rounded-xl bg-stone-200/70 p-1">
              {[
                ...ACADEMIC_TERMS,
                { id: "all", label: "All Years" },
              ].map((term) => {
                const active = selectedTerm === term.id;
                const count = getTermCount(term.id);
                return (
                  <button
                    key={term.id}
                    type="button"
                    onClick={() => setSelectedTerm(term.id)}
                    className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all ${
                      active
                        ? "bg-dark-green text-white shadow-sm"
                        : "text-stone-600 hover:text-ink hover:bg-stone-300/50"
                    }`}
                  >
                    <span>{term.label}</span>
                    <span
                      className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                        active ? "bg-white/20 text-gold-light" : "bg-stone-300/80 text-stone-700"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* View Switcher + Search */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="inline-flex rounded-lg bg-stone-200/70 p-1">
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  title="Grid View"
                  className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                    viewMode === "grid"
                      ? "bg-white text-dark-green shadow-sm font-semibold"
                      : "text-stone-600 hover:text-ink"
                  }`}
                >
                  <LayoutGrid className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Grid</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("timeline")}
                  title="Timeline View"
                  className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                    viewMode === "timeline"
                      ? "bg-white text-dark-green shadow-sm font-semibold"
                      : "text-stone-600 hover:text-ink"
                  }`}
                >
                  <Clock className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Timeline</span>
                </button>
              </div>

              {/* Search */}
              <div className="relative flex-1 sm:w-60">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-stone-400" />
                <input
                  id="event-search"
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search events..."
                  className="w-full rounded-lg border border-stone-200 bg-white py-1.5 pl-8 pr-7 text-xs text-ink placeholder:text-stone-400 focus:border-dark-green focus:outline-none focus:ring-1 focus:ring-dark-green/20"
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-ink"
                  >
                    <X className="h-3 w-3" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ================================================================ */}
      {/* SPOTLIGHT - leading event for the selected term                   */}
      {/* ================================================================ */}
      {spotlightEvents.length > 0 && !search && (
        <section className="py-8 sm:py-10 bg-white border-b border-stone-200/60">
          <Container>
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                {spotlightEvents[0].academicYear}
              </p>
              <span className="text-[11px] font-medium text-stone-400 italic">Featured stories</span>
            </div>

            <div className={`grid gap-5 ${spotlightEvents.length > 1 ? "lg:grid-cols-2" : ""}`}>
              {spotlightEvents.map((spotlightEvent) => (
                <article
                  key={spotlightEvent.id}
                  onClick={() => setActiveModalEvent(spotlightEvent)}
                  className="group relative cursor-pointer overflow-hidden rounded-2xl border border-stone-200 bg-dark-green text-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:border-gold/40"
                >
                  <div className="flex h-full flex-col lg:grid lg:grid-cols-12 lg:items-stretch gap-0">
                    {/* Image */}
                    <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto lg:col-span-7 overflow-hidden bg-black/40">
                      <img
                        src={spotlightEvent.coverImage}
                        alt={spotlightEvent.title}
                        className={`h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${
                          spotlightEvent.title === "The Way Forward" ? "object-top" : ""
                        }`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent lg:hidden" />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col justify-between gap-4 p-5 sm:p-6 lg:col-span-5 bg-gradient-to-br from-[#0b3d2e] to-[#07251c] min-h-0">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 text-xs text-gold-light font-medium">
                          <CalendarDays className="h-3.5 w-3.5" />
                          <span>{spotlightEvent.date}</span>
                          <span>&middot;</span>
                          <MapPin className="h-3.5 w-3.5" />
                          <span className="truncate">{spotlightEvent.location}</span>
                        </div>

                        <h2 className="mt-3 text-xl font-bold tracking-tight text-white sm:text-2xl leading-snug group-hover:text-gold-light transition-colors">
                          {spotlightEvent.title}
                        </h2>

                        {spotlightEvent.subtitle && (
                          <p className="mt-2 text-sm font-medium text-teal-light">
                            {spotlightEvent.subtitle}
                          </p>
                        )}

                        <p className="mt-3 text-xs sm:text-sm leading-relaxed text-white/80 line-clamp-3 sm:line-clamp-4 font-normal">
                          {spotlightEvent.description}
                        </p>
                      </div>

                      <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                        <span className="text-xs font-semibold text-gold-light group-hover:underline">
                          Full story &amp; photos
                        </span>
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition-transform group-hover:translate-x-1 group-hover:bg-gold group-hover:text-dark-green">
                          <ArrowRight className="h-4 w-4" />
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* ================================================================ */}
      {/* MAIN DISPLAY: GRID OR TIMELINE                                   */}
      {/* ================================================================ */}
      <main className="py-12 sm:py-16">
        <Container>
          {filteredEvents.length === 0 ? (
            <div className="mx-auto max-w-sm rounded-2xl border border-dashed border-stone-300 bg-white p-10 text-center">
              <Layers className="mx-auto h-8 w-8 text-stone-400" />
              <h3 className="mt-3 text-base font-bold text-ink">No events found</h3>
              <p className="mt-1 text-xs text-stone-500">
                Try a different keyword or select another academic year.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setSelectedTerm("all");
                }}
                className="mt-4 inline-flex rounded-lg bg-dark-green px-4 py-1.5 text-xs font-semibold text-white hover:bg-teal-dark transition-colors"
              >
                Clear Filters
              </button>
            </div>
          ) : viewMode === "grid" ? (

            /* EDITORIAL GRID */
            <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {filteredEvents.map((event) => (
                <Reveal key={event.id} direction="up">
                  <article
                    onClick={() => setActiveModalEvent(event)}
                    className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl bg-white border border-stone-100 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-stone-200"
                  >
                    {/* Photo */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
                      <img
                        src={event.coverImage}
                        alt={event.title}
                        loading="lazy"
                              decoding="async"
                        className={`h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 ${
                          event.title === "The Way Forward" ? "object-top" : ""
                        }`}
                      />
                      <div className="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/10" />

                      {/* Term badge */}
                      <span className="absolute top-3 right-3 rounded-full bg-black/50 px-2.5 py-0.5 text-[10px] font-medium text-white backdrop-blur-md">
                        {event.academicYear}
                      </span>

                      {/* Multi-photo indicator */}
                      {event.images?.length > 1 && (
                        <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1 rounded-md bg-black/60 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm">
                          <Images className="h-2.5 w-2.5 text-gold-light" />
                          <span>{event.images.length} photos</span>
                        </div>
                      )}
                    </div>

                    {/* Body */}
                    <div className="flex flex-1 flex-col p-5">
                      {/* Date & Location */}
                      <div className="flex items-center gap-1.5 text-[11px] text-stone-400">
                        <CalendarDays className="h-3 w-3 shrink-0" />
                        <span>{event.date}</span>
                        <span className="text-stone-300">&middot;</span>
                        <MapPin className="h-3 w-3 shrink-0" />
                        <span className="truncate">{event.location}</span>
                      </div>

                      {/* Title */}
                      <h3 className="mt-2.5 text-[15px] font-bold text-ink leading-snug group-hover:text-dark-green transition-colors line-clamp-2">
                        {event.title}
                      </h3>

                      {/* Subtitle */}
                      {event.subtitle && (
                        <p className="mt-1 text-xs text-stone-500 line-clamp-1">
                          {event.subtitle}
                        </p>
                      )}

                      {/* Speaker */}
                      {event.speaker && (
                        <p className="mt-2 text-xs text-teal-dark font-medium truncate">
                          With {event.speaker}
                        </p>
                      )}

                      {/* Description */}
                      <p className="mt-3 text-xs leading-relaxed text-stone-500 line-clamp-3 flex-1">
                        {event.description}
                      </p>

                      {/* Footer */}
                      <div className="mt-4 flex items-center justify-between border-t border-stone-100 pt-3">
                        <span className="text-xs font-semibold text-dark-green group-hover:text-teal transition-colors">
                          Read more
                        </span>
                        <ArrowRight className="h-3.5 w-3.5 text-dark-green transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>

          ) : (

            /* COMPACT TIMELINE */
            <div className="mx-auto max-w-2xl">
              <div className="mb-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-stone-200" />
                <span className="text-[11px] font-bold uppercase tracking-widest text-stone-400">
                  {selectedTerm === "all" ? "All Years" : selectedTerm}
                </span>
                <div className="h-px flex-1 bg-stone-200" />
              </div>

              <div className="relative">
                {/* Vertical spine */}
                <div className="absolute left-[11px] top-0 bottom-0 w-px bg-stone-200" />

                <div className="space-y-1">
                  {filteredEvents.map((event, idx) => (
                    <Reveal key={event.id} direction="up" delay={0.03 * (idx % 6)}>
                      <div
                        onClick={() => setActiveModalEvent(event)}
                        className="group relative flex cursor-pointer items-start gap-5 rounded-xl px-3 py-3.5 transition-all duration-200 hover:bg-stone-50"
                      >
                        {/* Node */}
                        <div className="relative z-10 mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-stone-200 bg-white group-hover:border-dark-green group-hover:bg-dark-green transition-all duration-200">
                          <span className="h-1.5 w-1.5 rounded-full bg-stone-300 group-hover:bg-gold transition-colors" />
                        </div>

                        {/* Content row */}
                        <div className="flex flex-1 items-center justify-between gap-4 min-w-0">
                          <div className="min-w-0">
                            <p className="text-[11px] font-medium text-stone-400">
                              {event.date}
                              {event.location && (
                                <span className="ml-2 text-stone-300">&middot; {event.location}</span>
                              )}
                            </p>
                            <h4 className="mt-0.5 text-sm font-semibold text-ink leading-snug group-hover:text-dark-green transition-colors line-clamp-1">
                              {event.title}
                            </h4>
                            {event.subtitle && (
                              <p className="mt-0.5 text-[11px] text-stone-400 line-clamp-1">{event.subtitle}</p>
                            )}
                          </div>

                          {/* Thumbnail */}
                          <div className="hidden sm:block h-14 w-20 shrink-0 overflow-hidden rounded-lg bg-stone-100">
                            <img
                              src={event.coverImage}
                              alt={event.title}
                              loading="lazy"
                              decoding="async"
                              className={`h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 ${
                                event.title === "The Way Forward" ? "object-top" : ""
                              }`}
                            />
                          </div>
                        </div>

                        {/* Arrow */}
                        <ArrowRight className="hidden sm:block h-3.5 w-3.5 shrink-0 text-stone-300 transition-all group-hover:text-dark-green group-hover:translate-x-0.5 mt-3" />
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          )}
        </Container>
      </main>

      {/* MODAL */}
      {activeModalEvent && (
        <EventModal
          event={activeModalEvent}
          onClose={() => setActiveModalEvent(null)}
        />
      )}
    </div>
  );
}

