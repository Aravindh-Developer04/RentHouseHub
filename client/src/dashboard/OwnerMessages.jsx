import React from "react";

export default function OwnerMessages() {
  return (
    <div className="owner-page">

      <div className="owner-page-header">
        <div>
          <h1>Messages</h1>
          <p>Messages from tenants</p>
        </div>
      </div>

      <div className="empty-box">
        <h2>No Messages</h2>
        <p>
          Tenant messages will appear here.
        </p>
      </div>

    </div>
  );
}
