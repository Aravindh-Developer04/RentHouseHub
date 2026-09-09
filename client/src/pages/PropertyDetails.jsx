import React from "react";
import { useParams, Link } from "react-router-dom";
import { properties } from "../data/properties";
import { BedDouble, Bath, Maximize, MapPin, ArrowLeft } from "lucide-react";

export default function PropertyDetails() {
  const { id } = useParams();
  const property = properties.find(p => p.id === Number(id));

  if (!property) return <main className="page container"><h1>Property not found</h1></main>;

  return (
    <main className="page">
      <div className="container">
        <Link to="/properties" className="back"><ArrowLeft size={17}/> Back to properties</Link>
        <div className="details-grid">
          <img className="details-image" src={property.image} alt={property.title} />
          <div className="details-info">
            <span className="rent-badge">For Rent</span>
            <h1>{property.title}</h1>
            <p className="location"><MapPin size={18}/> {property.location}</p>
            <div className="details-price">₹{property.price.toLocaleString("en-IN")} <small>/month</small></div>
            <div className="details-meta">
              <span><BedDouble/> {property.beds} Bedrooms</span>
              <span><Bath/> {property.baths} Bathrooms</span>
              <span><Maximize/> {property.area}</span>
            </div>
            <p className="details-description">A comfortable and well-maintained rental property in a convenient location. Contact the owner to schedule a visit and check availability.</p>
            <button className="btn btn-primary full">Request Booking</button>
          </div>
        </div>
      </div>
    </main>
  );
}