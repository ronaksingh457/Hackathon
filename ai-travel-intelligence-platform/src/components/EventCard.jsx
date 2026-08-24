import { CalendarDays, Clock, MapPin, Tag } from "lucide-react";
import SourceBadge from "./SourceBadge";

export default function EventCard({ event }) {
  return (
    <article className="event-card">
      <div className="event-card-category">
        <Tag size={12} /> {event.category}
      </div>
      <h4>{event.title}</h4>
      <div className="event-meta">
        <span><CalendarDays size={13} /> {event.date}</span>
        <span><Clock size={13} /> {event.time}</span>
        <span><MapPin size={13} /> {event.location}</span>
      </div>
      <SourceBadge source={event.source} timestamp={event.timestamp} demo={event.demo} />
    </article>
  );
}
