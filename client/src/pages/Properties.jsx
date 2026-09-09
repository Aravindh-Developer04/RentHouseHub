import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

export default function Properties() {
  const [searchParams] = useSearchParams();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://renthousehub.rf.gd/api/get-properties.php")
      .then((response) => response.json())
      .then((data) => {
        console.log("Properties API:", data);

        if (!data.success) {
          setError(data.message || "Failed to load properties");
          return;
        }

        const requestedLocation = (searchParams.get("location") || "")
          .trim()
          .toLowerCase();
        const requestedType = (searchParams.get("type") || "Any type")
          .trim();
        const requestedPrice = (searchParams.get("price") || "Any price")
          .trim();

        const filteredProperties = (data.properties || []).filter(
          (property) => {
            const locationMatch =
              requestedLocation === "" ||
              (property.location || "")
                .toLowerCase()
                .includes(requestedLocation);

            const typeMatch = matchesType(property, requestedType);
            const priceMatch = matchesPrice(property, requestedPrice);

            return locationMatch && typeMatch && priceMatch;
          }
        );

        setProperties(filteredProperties);
      })
      .catch((err) => {
        console.error("Properties Error:", err);
        setError("Unable to connect to server");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [searchParams]);

  if (loading) {
    return (
      <div style={loadingStyle}>
        <h2>Loading properties...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={loadingStyle}>
        <h2>{error}</h2>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "70vh",
        padding: "40px 20px",
        background: "#f7f9fc",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "auto",
        }}
      >
        <h1>Available Properties</h1>

        <p style={{ color: "#666", marginBottom: "30px" }}>
          Find your perfect rental home.
        </p>

        {properties.length === 0 ? (
          <div>
            <h3>No properties available.</h3>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "25px",
            }}
          >
            {properties.map((property) => (
              <div
                key={property.id}
                style={{
                  background: "white",
                  borderRadius: "14px",
                  overflow: "hidden",
                  boxShadow:
                    "0 5px 20px rgba(0,0,0,0.08)",
                }}
              >
                {/* IMAGE */}
                {property.image ? (
  <img
    src={`https://renthousehub.rf.gd/${property.image}`}
    alt={property.title}
    style={{
      width: "100%",
      height: "210px",
      objectFit: "cover",
    }}
  />
) : (
  <div
    style={{
      height: "210px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#eee",
      color: "#777",
    }}
  >
    No Image
  </div>
)}

                {/* DETAILS */}
                <div style={{ padding: "20px" }}>
                  <h2 style={{ marginTop: 0 }}>
                    {property.title}
                  </h2>

                  <p style={{ color: "#666" }}>
                    📍 {property.location}
                  </p>

                  <p>
                    <strong>₹{property.price}</strong>{" "}
                    / month
                  </p>

                  <p>
                    🛏 {property.bedrooms} Bedrooms
                    {" • "}
                    🚿 {property.bathrooms} Bathrooms
                  </p>

                  <p>
                    📐 {property.area} sq.ft
                  </p>

                  <Link
                    to={`/property/${property.id}`}
                    style={{
                      display: "inline-block",
                      marginTop: "10px",
                      padding: "10px 18px",
                      background: "#111827",
                      color: "white",
                      textDecoration: "none",
                      borderRadius: "8px",
                    }}
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function matchesType(property, requestedType) {
  if (!requestedType || requestedType === "Any type") {
    return true;
  }

  const requestedBedroom = normalizeBedroom(requestedType);
  if (!requestedBedroom) {
    return true;
  }

  return Number(property.bedrooms) === requestedBedroom;
}

function normalizeBedroom(value) {
  const normalized = String(value)
    .trim()
    .toLowerCase();

  if (normalized === "1 rk") return 1;
  if (normalized === "1 bhk") return 1;
  if (normalized === "2 bhk") return 2;
  if (normalized === "3 bhk") return 3;
  if (normalized === "4 bhk") return 4;

  return null;
}

function matchesPrice(property, requestedPrice) {
  if (!requestedPrice || requestedPrice === "Any price") {
    return true;
  }

  const price = Number(property.price) || 0;

  if (requestedPrice === "Below ₹10,000") {
    return price < 10000;
  }

  if (requestedPrice === "₹10,000 - ₹20,000") {
    return price >= 10000 && price <= 20000;
  }

  if (requestedPrice === "₹20,000 - ₹30,000") {
    return price >= 20000 && price <= 30000;
  }

  if (requestedPrice === "Above ₹30,000") {
    return price > 30000;
  }

  return true;
}

const loadingStyle = {
  minHeight: "70vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
