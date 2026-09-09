import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  MapPin,
  Home as HomeIcon,
  ShieldCheck,
  Headphones,
  CalendarCheck,
  ArrowRight,
} from "lucide-react";

import PropertyCard from "../components/PropertyCard";
import { properties } from "../data/properties";

export default function Home() {
  const navigate = useNavigate();

  const [location, setLocation] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [propertyType, setPropertyType] = useState("Any type");
  const [priceRange, setPriceRange] = useState("Any price");

  // ==============================
  // LOCATION SEARCH
  // ==============================
  const searchLocations = async (value) => {
    setLocation(value);

    if (value.trim().length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    try {
      const url =
        "https://nominatim.openstreetmap.org/search" +
        "?format=json" +
        "&addressdetails=1" +
        "&countrycodes=in" +
        "&limit=10" +
        "&q=" +
        encodeURIComponent(value + ", Tamil Nadu, India");

      const response = await fetch(url, {
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Location API request failed");
      }

      const data = await response.json();

      // Tamil Nadu locations only
      const tamilNaduResults = data.filter((place) => {
        const state = place.address?.state || "";

        return (
          state.toLowerCase() === "tamil nadu" ||
          place.display_name
            .toLowerCase()
            .includes("tamil nadu")
        );
      });

      setSuggestions(tamilNaduResults);
      setShowSuggestions(tamilNaduResults.length > 0);
    } catch (error) {
      console.error("Location search error:", error);
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // ==============================
  // SELECT LOCATION
  // ==============================
  const selectLocation = (place) => {
    setLocation(place.display_name);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  // ==============================
  // SEARCH PROPERTIES
  // ==============================
  const handleSearch = () => {
    navigate(
      `/properties?location=${encodeURIComponent(
        location
      )}&type=${encodeURIComponent(
        propertyType
      )}&price=${encodeURIComponent(priceRange)}`
    );
  };

  return (
    <main>

      {/* ================= HERO ================= */}
      <section className="hero">
        <div className="hero-overlay">
          <div className="container hero-content">
            <div className="hero-copy">

              <span className="eyebrow">
                FIND YOUR PERFECT HOME
              </span>

              <h1>
                Find Your Perfect <span>Rental</span> Home
              </h1>

              <p>
                Discover the best houses, apartments and rooms
                for rent. Easy search, trusted listings, and a
                simple booking process.
              </p>

              {/* ================= SEARCH BOX ================= */}
              <div className="search-box">

                {/* LOCATION */}
                <div className="search-field location-field">
                  <MapPin size={20} />

                  <label>
                    Location

                    <input
                      type="text"
                      value={location}
                      placeholder="Search city or area"
                      onChange={(e) =>
                        searchLocations(e.target.value)
                      }
                      onFocus={() => {
                        if (suggestions.length > 0) {
                          setShowSuggestions(true);
                        }
                      }}
                    />

                    {/* LOCATION SUGGESTIONS */}
                    {showSuggestions &&
                      suggestions.length > 0 && (
                        <div className="location-suggestions">
                          {suggestions.map((place) => (
                            <div
                              className="location-suggestion"
                              key={place.place_id}
                              onClick={() =>
                                selectLocation(place)
                              }
                            >
                              <MapPin size={17} />

                              <span>
                                {place.display_name}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                  </label>
                </div>

                {/* PROPERTY TYPE */}
                <div className="search-field">
                  <HomeIcon size={20} />

                  <label>
                    Property Type

                    <select
                      value={propertyType}
                      onChange={(e) =>
                        setPropertyType(e.target.value)
                      }
                    >
                      <option>Any type</option>
                      <option>1 RK</option>
                      <option>1 BHK</option>
                      <option>2 BHK</option>
                      <option>3 BHK</option>
                      <option>4 BHK</option>
                    </select>
                  </label>
                </div>

                {/* PRICE RANGE */}
                <div className="search-field">
                  <span className="rupee">₹</span>

                  <label>
                    Price Range

                    <select
                      value={priceRange}
                      onChange={(e) =>
                        setPriceRange(e.target.value)
                      }
                    >
                      <option>Any price</option>
                      <option>Below ₹10,000</option>
                      <option>₹10,000 - ₹20,000</option>
                      <option>₹20,000 - ₹30,000</option>
                      <option>Above ₹30,000</option>
                    </select>
                  </label>
                </div>

                {/* SEARCH BUTTON */}
                <button
                  type="button"
                  className="search-btn"
                  onClick={handleSearch}
                >
                  <Search size={18} />
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= POPULAR PROPERTIES ================= */}
      <section className="section">
        <div className="container">

          <div className="section-heading">
            <div>
              <h2>Popular Properties</h2>

              <p>
                Explore our most viewed and top rated rental
                properties.
              </p>
            </div>

            <Link to="/properties">
              View All →
            </Link>
          </div>

          <div className="property-grid">
            {properties.map((p) => (
              <PropertyCard
                key={p.id}
                property={p}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE ================= */}
      <section id="about" className="why section">
        <div className="container">

          <div className="section-heading centered">
            <div>
              <h2>Why Choose HouseRent?</h2>

              <p>
                We make finding a rental home simple, safe and
                hassle-free.
              </p>
            </div>
          </div>

          <div className="features">

            <Feature
              icon={<Search />}
              title="Wide Variety"
              text="Choose from thousands of verified listings."
            />

            <Feature
              icon={<ShieldCheck />}
              title="Verified Listings"
              text="Only genuine and trusted properties."
            />

            <Feature
              icon={<Headphones />}
              title="24/7 Support"
              text="We're here to help anytime you need."
            />

            <Feature
              icon={<CalendarCheck />}
              title="Easy Booking"
              text="Book your dream home in a few clicks."
            />

          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="cta container">

        <div>
          <h2>
            Your Next Home
            <br />
            Is Just a Click Away
          </h2>

          <p>
            Join thousands of happy renters and find your
            perfect home today.
          </p>
        </div>

        <Link
          to="/properties"
          className="btn btn-white"
        >
          Get Started
          <ArrowRight size={17} />
        </Link>

      </section>

    </main>
  );
}


// ==============================
// FEATURE COMPONENT
// ==============================

function Feature({ icon, title, text }) {
  return (
    <div className="feature">

      <div className="feature-icon">
        {icon}
      </div>

      <h3>{title}</h3>

      <p>{text}</p>

    </div>
  );
}