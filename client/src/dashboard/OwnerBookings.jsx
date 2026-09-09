import React from "react";

export default function OwnerBookings() {
  return (
    <div className="owner-page">

      <div className="owner-page-header">
        <div>
          <h1>Bookings</h1>
          <p>Manage your property bookings</p>
        </div>
      </div>

      <div className="empty-box">
        <h2>No Bookings Yet</h2>
        <p>
          Your property booking requests will appear here.
        </p>
      </div>

    </div>
  );
}
