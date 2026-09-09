
import React, { useState } from "react";
import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { House, Menu, X } from "lucide-react";
import "./Navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const closeMenu = () => {
    setOpen(false);
  };

  const goToSection = (section) => {
    setOpen(false);

    navigate("/");

    setTimeout(() => {
      const element = document.getElementById(section);

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
        });
      }
    }, 300);
  };

  return (
    <header className="navbar">
      <div className="container nav-inner">

        <Link to="/" className="brand" onClick={closeMenu}>
          <span className="brand-icon">
            <House size={22} />
          </span>
          RentHouseHub
        </Link>

        <button
          className="menu-btn"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>

        <nav className={open ? "nav-links open" : "nav-links"}>

          <NavLink to="/" onClick={closeMenu}>
            Home
          </NavLink>

          <NavLink to="/properties" onClick={closeMenu}>
            Properties
          </NavLink>

         
        

<button
            type="button"
            className="nav-section-btn"
            onClick={() => {
              if (location.pathname === "/") {
                goToSection("about");
              } else {
                navigate("/about");
              }
            }}
          >
            About
          </button>

          <button
            type="button"
            className="nav-section-btn"
            onClick={() => goToSection("contact")}
          >
            Contact
          </button>

          <span className="nav-spacer"></span>

          <NavLink
            to="/login"
            className="login-link"
            onClick={closeMenu}
          >
            Login
          </NavLink>

          <Link
            to="/register"
            className="btn btn-dark"
            onClick={closeMenu}
          >
            Sign Up
          </Link>

        </nav>
      </div>
    </header>
  );
}
