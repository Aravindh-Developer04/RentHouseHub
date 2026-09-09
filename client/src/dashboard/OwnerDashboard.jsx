import React from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  LayoutDashboard,
  Building2,
  CalendarDays,
  MessageSquare,
  User,
  LogOut,
  Bell,
  Plus,
  TrendingUp,
} from "lucide-react";

import { properties } from "../data/properties";

export default function OwnerDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="dashboard-layout">

      {/* SIDEBAR */}
      <aside className="sidebar">

        <Link
          to="/"
          className="brand sidebar-brand"
        >
          <span className="brand-icon">
            <Building2 />
          </span>

          HouseRent
        </Link>

        <Link to="/dashboard/owner" className="side-item active">
          <LayoutDashboard />
          <span>Dashboard</span>
        </Link>

        <Link to="/dashboard/owner/properties" className="side-item">
          <Building2 />
          <span>My Properties</span>
        </Link>

        <Link to="/dashboard/owner/bookings" className="side-item">
          <CalendarDays />
          <span>Bookings</span>
        </Link>

        <Link to="/dashboard/owner/messages" className="side-item">
          <MessageSquare />
          <span>Messages</span>
        </Link>

        <Link to="/dashboard/owner/profile" className="side-item">
          <User />
          <span>Profile</span>
        </Link>

        <Link to="/" className="side-item">
          <LogOut />
          <span>Logout</span>
        </Link>

      </aside>


      {/* MAIN CONTENT */}
      <section className="dashboard-main">

        {/* HEADER */}
        <div className="dashboard-header">

          <div>
            <h1>Welcome, {user?.name || "Owner"} 👋</h1>

            <p>
              Here's what's happening with your properties.
            </p>
          </div>

          <Bell />

        </div>


        {/* STATS */}
        <div className="stats">

          <Stat
            icon={<Building2 />}
            title="Total Properties"
            value="4"
          />

          <Stat
            icon={<CalendarDays />}
            title="Total Bookings"
            value="8"
          />

          <Stat
            icon={<TrendingUp />}
            title="Total Revenue"
            value="₹1,20,000"
          />

          <Stat
            icon={<User />}
            title="Pending Requests"
            value="2"
          />

        </div>


        {/* OWNER GRID */}
        <div className="owner-grid">

          {/* PROPERTY OVERVIEW */}
          <div className="panel">

            <div className="panel-head">

              <h2>
                Property Overview
              </h2>

              <TrendingUp />

            </div>


            <div className="fake-chart">

              <div style={{ height: "25%" }} />
              <div style={{ height: "35%" }} />
              <div style={{ height: "45%" }} />
              <div style={{ height: "55%" }} />
              <div style={{ height: "60%" }} />
              <div style={{ height: "75%" }} />
              <div style={{ height: "90%" }} />

            </div>

          </div>


          {/* RECENT BOOKINGS */}
          <div className="panel">

            <div className="panel-head">

              <h2>
                Recent Bookings
              </h2>

              <Link to="#">
                View All →
              </Link>

            </div>


            <div className="booking-list">

              {[
                "Rahul Kumar",
                "Priya Sharma",
                "Vikram Singh",
                "Sneha Reddy",
              ].map((name, i) => (

                <div
                  className="booking"
                  key={name}
                >

                  <div>

                    <strong>
                      {name}
                    </strong>

                    <span>
                      {properties[i]?.title}
                    </span>

                  </div>


                  <b
                    className={
                      i === 1
                        ? "pending"
                        : "confirmed"
                    }
                  >
                    {i === 1
                      ? "Pending"
                      : "Confirmed"}
                  </b>

                </div>

              ))}

            </div>

          </div>

        </div>


        {/* YOUR PROPERTIES */}
        <div className="dashboard-section">

          <div className="section-heading">

            <h2>
              Your Properties
            </h2>


            {/* ADD PROPERTY BUTTON */}
            <button
              className="btn btn-primary"
              onClick={() =>
                navigate("/add-property")
              }
            >

              <Plus size={16} />

              Add Property

            </button>

          </div>


          {/* PROPERTY GRID */}
          <div className="property-grid">

            {properties.map((p) => (

              <div
                className="owner-property"
                key={p.id}
              >

                <img
                  src={p.image}
                  alt={p.title}
                />

                <div>

                  <h3>
                    {p.title}
                  </h3>

                  <p>
                    {p.location}
                  </p>

                  <span className="active-tag">
                    Active
                  </span>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>

    </div>
  );
}


/* =========================
   STAT COMPONENT
========================= */

function Stat({
  icon,
  title,
  value,
}) {

  return (

    <div className="stat">

      <div className="stat-icon">
        {icon}
      </div>

      <div>

        <span>
          {title}
        </span>

        <strong>
          {value}
        </strong>

      </div>

    </div>

  );
}


/* =========================
   SIDEBAR COMPONENT
========================= */

function Side({
  icon,
  text,
  path = "#",
  active,
}) {

  return (

    <Link
      className={
        active
          ? "side-item active"
          : "side-item"
      }
      to={path}
    >

      {icon}

      <span>
        {text}
      </span>

    </Link>

  );
}
