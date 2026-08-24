import { useNavigate } from "react-router-dom";
import { ArrowUpRight, MapPin } from "lucide-react";

export default function DestinationCard({ slug, name, state, image, description }) {
  const navigate = useNavigate();

  return (
    <article className="destination-card" onClick={() => navigate(`/city/${slug}`)}>
      <div className="destination-card-image-wrap">
        <img src={image} alt={`${name}, ${state}`} loading="lazy" className="destination-card-image" />
        <span className="destination-card-location-pill">
          <MapPin size={12} /> {state}
        </span>
      </div>
      <div className="destination-card-body">
        <h3>{name}</h3>
        <p>{description}</p>
        <button
          className="explore-btn"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/city/${slug}`);
          }}
        >
          Explore <ArrowUpRight size={15} />
        </button>
      </div>
    </article>
  );
}
