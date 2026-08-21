import { CalendarDays, MapPin, Images, ArrowUpRight } from "lucide-react";
import Card from "../../ui/Card";
import Badge from "../../ui/Badge";
import Button from "../../ui/Button";
import { CATEGORY_TONES } from "../../../data/events";

export default function EventCard({ event, onSelect }) {
  const isPast = event.status === "past";
  const imageCount = event.images?.length || (event.coverImage ? 1 : 0);
  const displayImage = event.coverImage || (event.images && event.images[0]) || "/images/placeholder.jpg";

  return (
    <Card
      glow
      className="group flex h-full flex-col overflow-hidden p-0 transition-all duration-300 hover:-translate-y-1.5 cursor-pointer"
      onClick={() => onSelect?.(event)}
    >
      {/* Image Container */}
      <div className="relative h-56 w-full overflow-hidden bg-dark-green/10">
        <img
          src={displayImage}
          alt={`Photo for ${event.title}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
        />

        {/* Gradient shadow for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

        {/* Top Badges */}
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
          <Badge tone={CATEGORY_TONES[event.category] || "teal"}>{event.category}</Badge>
          {event.academicYear && (
            <span className="rounded-full border border-white/20 bg-black/40 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-md">
              {event.academicYear}
            </span>
          )}
        </div>

        {/* Bottom image metadata */}
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white">
          <span className="flex items-center gap-1.5 font-medium drop-shadow-md">
            <CalendarDays className="h-3.5 w-3.5 text-gold-light" />
            {event.date}
          </span>
          {imageCount > 1 && (
            <span className="flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-0.5 text-[11px] font-medium backdrop-blur-sm">
              <Images className="h-3 w-3 text-gold" />
              {imageCount} Photos
            </span>
          )}
        </div>
      </div>

      {/* Body Content */}
      <div className="flex flex-1 flex-col p-6">
        {/* Title */}
        <h3 className="text-lg font-bold text-ink transition-colors group-hover:text-dark-green line-clamp-2">
          {event.title}
        </h3>

        {/* Description */}
        <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-ink-soft">
          {event.description}
        </p>

        {/* Speaker / Highlight pill */}
        {event.speaker && (
          <p className="mt-4 text-xs font-medium text-teal-dark truncate">
            With {event.speaker}
          </p>
        )}

        {/* Location & Time */}
        <div className="mt-4 flex flex-col gap-1 border-t border-black/5 pt-3 text-xs text-ink-soft">
          <div className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-teal" />
            <span className="truncate">{event.location}</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-6 pt-1">
          {isPast ? (
            <Button
              variant="outline"
              size="md"
              className="w-full justify-between group-hover:border-dark-green group-hover:text-dark-green"
              onClick={(e) => {
                e.stopPropagation();
                onSelect?.(event);
              }}
            >
              <span>View Story & Photos</span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Button>
          ) : (
            <Button
              variant="primary"
              size="md"
              className="w-full justify-between"
              onClick={(e) => {
                e.stopPropagation();
                onSelect?.(event);
              }}
            >
              <span>Event Details & Register</span>
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
