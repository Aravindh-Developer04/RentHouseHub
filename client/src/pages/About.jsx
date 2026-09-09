import React from "react";
import { Link } from "react-router-dom";
import { Building2, ShieldCheck, Users, MapPin } from "lucide-react";

export default function About() {
  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="about-hero-content">
          <p className="eyebrow">ABOUT US</p>
          <h1>Helping people find the right place to call home.</h1>
          <p>
            HouseRent makes renting easier by connecting trusted owners with
            modern renters in a simple, transparent, and stress-free way.
          </p>
          <Link to="/properties" className="home-btn">
            Explore Properties
          </Link>
        </div>
      </section>

      <section className="about-story container">
        <div className="about-story-text">
          <p className="eyebrow">OUR STORY</p>
          <h2>We built HouseRent to simplify rentals.</h2>
          <p>
            We noticed how difficult it was for tenants to find verified homes and
            how hard it was for owners to manage listings efficiently. HouseRent
            was created to close that gap with a smarter, cleaner experience.
          </p>
          <p>
            From local apartments to family homes, we help people discover the
            right place based on comfort, location, and affordability.
          </p>
        </div>

        <div className="about-image-card">
          <div className="about-image-box">
            <Building2 size={38} />
          </div>
        </div>
      </section>

      <section className="about-features container">
        <div className="section-heading centered">
          <div>
            <h2>Why People Trust HouseRent</h2>
            <p>Built around transparency, comfort, and convenience.</p>
          </div>
        </div>

        <div className="features">
          <Feature
            icon={<ShieldCheck />}
            title="Verified Listings"
            text="We focus on trusted, clear, and quality rental options."
          />
          <Feature
            icon={<MapPin />}
            title="Prime Locations"
            text="Explore homes in the most desirable neighborhoods and cities."
          />
          <Feature
            icon={<Users />}
            title="Friendly Support"
            text="Our platform is designed to make renting simple for everyone."
          />
        </div>
      </section>
    </div>
  );
}

function Feature({ icon, title, text }) {
  return (
    <div className="feature">
      <div className="feature-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}
