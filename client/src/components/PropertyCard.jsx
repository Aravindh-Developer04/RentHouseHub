import React from "react";
import { Link } from "react-router-dom";
import { BedDouble, Bath, Maximize, Heart } from "lucide-react";

export default function PropertyCard({ property }) {
  return (
    <article className="property-card">
      <div className="property-image">
        <img src={property.image} alt={property.title} />
        <span className="rent-badge">For Rent</span>
        <button className="heart"><Heart size={17} /></button>
      </div>
      <div className="property-body">
        <div className="price">₹{property.price.toLocaleString("en-IN")} <small>/month</small></div>
        <h3>{property.title}</h3>
        <p className="muted">{property.location}</p>
        <div className="property-meta">
          <span><BedDouble size={15} /> {property.beds} Beds</span>
          <span><Bath size={15} /> {property.baths} Baths</span>
          <span><Maximize size={15} /> {property.area}</span>
        </div>
        <Link to={`/property/${property.id}`} className="details-link">View Details →</Link>
      </div>
    </article>
  );
}