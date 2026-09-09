import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, MapPin, BedDouble, Bath } from "lucide-react";

export default function MyProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetch("http://localhost/RentHouseHub/api/get-properties.php")
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          const myProperties = data.properties.filter(
            (property) =>
              Number(property.owner_id) === Number(user?.id)
          );

          setProperties(myProperties);
        }
      })
      .catch((error) => {
        console.error("Properties error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="owner-page">

      <div className="owner-page-header">
        <div>
          <h1>My Properties</h1>
          <p>Manage your properties</p>
        </div>

        <Link
          to="/add-property"
          className="btn btn-primary"
        >
          <Plus size={18} />
          Add Property
        </Link>
      </div>

      {loading ? (
        <div className="empty-box">
          Loading properties...
        </div>
      ) : properties.length === 0 ? (
        <div className="empty-box">
          <h2>No Properties Yet</h2>
          <p>You haven't added any properties.</p>

          <Link
            to="/add-property"
            className="btn btn-primary"
          >
            Add Your First Property
          </Link>
        </div>
      ) : (
        <div className="property-grid">

          {properties.map((property) => (
            <div
              className="owner-property-card"
              key={property.id}
            >

              {property.image ? (
                <img
                  src={`http://localhost/RentHouseHub/${property.image}`}
                  alt={property.title}
                />
              ) : (
                <div className="property-no-image">
                  No Image
                </div>
              )}

              <div className="owner-property-content">

                <h2>{property.title}</h2>

                <p className="property-location">
                  <MapPin size={16} />
                  {property.location}
                </p>

                <h3>
                  ₹{property.price}
                  <span>/ month</span>
                </h3>

                <div className="property-info">
                  <span>
                    <BedDouble size={16} />
                    {property.bedrooms} Beds
                  </span>

                  <span>
                    <Bath size={16} />
                    {property.bathrooms} Baths
                  </span>

                  <span>
                    {property.area} sq.ft
                  </span>
                </div>

                <Link
                  to={`/property/${property.id}`}
                  className="view-property"
                >
                  View Property
                </Link>

              </div>
            </div>
          ))}

        </div>
      )}

    </div>
  );
}
