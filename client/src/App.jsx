
import MyProperties from "./dashboard/MyProperties";
import OwnerBookings from "./dashboard/OwnerBookings";
import OwnerMessages from "./dashboard/OwnerMessages";
import OwnerProfile from "./dashboard/OwnerProfile";

import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Properties from "./pages/Properties";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PropertyDetails from "./pages/PropertyDetails";

import TenantDashboard from "./dashboard/TenantDashboard";
import OwnerDashboard from "./dashboard/OwnerDashboard";
import AddProperty from "./pages/AddProperty";


export default function App() {
  return (
    <>
      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/properties"
          element={<Properties />}
        />

        <Route
          path="/property/:id"
          element={<PropertyDetails />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard/tenant"
          element={<TenantDashboard />}
        />

        <Route
          path="/dashboard/owner"
          element={<OwnerDashboard />}
        />

        <Route
          path="/dashboard/owner/properties"
          element={<MyProperties />}
        />

        <Route
          path="/dashboard/owner/bookings"
          element={<OwnerBookings />}
        />

        <Route
          path="/dashboard/owner/messages"
          element={<OwnerMessages />}
        />

        <Route
          path="/dashboard/owner/profile"
          element={<OwnerProfile />}
        />

        <Route
          path="/add-property"
          element={<AddProperty />}
        />

      </Routes>

      <Footer />
    </>
  );
}