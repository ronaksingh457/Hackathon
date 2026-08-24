import { Star, MapPin, ArrowUpRight } from "lucide-react";

export default function PlaceCard({ place }) {
  return (
    <article className="place-card" id={place.id}>
      <div className="place-card-image-wrap">
        <img src={place.image} alt={place.name} loading="lazy" className="place-card-image" />
        <span className="place-card-category">{place.category}</span>
      </div>
      <div className="place-card-body">
        <div className="place-card-title-row">
          <h4>{place.name}</h4>
          <span className="place-card-rating">
            <Star size={13} fill="currentColor" /> {place.rating}
          </span>
        </div>
        <p>{place.description}</p>
        <div className="place-card-footer">
          <span className="place-card-location">
            <MapPin size={13} /> {place.location}
          </span>
          <button className="explore-btn-sm">
            Explore <ArrowUpRight size={13} />
          </button>
        </div>
      </div>
    </article>
  );
}
