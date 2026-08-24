import { MapPin, UtensilsCrossed } from "lucide-react";

export default function FoodCard({ food }) {
  return (
    <article className="food-card" id={food.id}>
      <div className="food-card-image-wrap">
        <img src={food.image} alt={food.name} loading="lazy" className="food-card-image" />
        {food.specialty && (
          <span className="food-specialty-badge">
            <UtensilsCrossed size={11} /> Local Specialty
          </span>
        )}
      </div>
      <div className="food-card-body">
        <h4>{food.name}</h4>
        <p>{food.description}</p>
        <div className="food-card-footer">
          <span className="food-price">{food.price}</span>
          <span className="food-location">
            <MapPin size={12} /> {food.location}
          </span>
        </div>
      </div>
    </article>
  );
}
