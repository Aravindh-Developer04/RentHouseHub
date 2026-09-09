
import React from "react";
import { House, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="footer">

      <div className="container footer-grid">

        {/* BRAND */}
        <div className="footer-column footer-about">
          <div className="brand footer-brand">
            <span className="brand-icon">
              <House size={20} />
            </span>
            RentHouseHub
          </div>

          <p>
            Find a better place to live, simply and safely.
            Discover homes that match your needs and budget.
          </p>
        </div>

        {/* EXPLORE */}
        <div className="footer-column">
          <h4>Explore</h4>

          <a href="/">Home</a>
          <a href="/properties">Properties</a>
          <a href="/#about">About Us</a>
        </div>

        {/* ACCOUNT */}
        <div className="footer-column">
          <h4>Account</h4>

          <a href="/login">Login</a>
          <a href="/register">Register</a>
        </div>

        {/* CONTACT */}
        <div className="footer-column">
          <h4>Contact Us</h4>

          <a href="tel:6374817254">
            <Phone size={16} />
            63748 17254
          </a>

          <a href="mailto:aravindh04@gmail.com">
            <Mail size={16} />
            aravindh04@gmail.com
          </a>

          <div className="footer-contact">
            <MapPin size={16} />
            <span>Chennai, Tamil Nadu</span>
          </div>
        </div>

      </div>

      {/* BOTTOM */}
      <div className="copyright">
        <p>© 2026 HouseRent. All rights reserved.</p>

        <div>
          <a href="/#about">About</a>
          <span>•</span>
          <a href="/#contact">Contact</a>
        </div>
      </div>

    </footer>
  );
}

