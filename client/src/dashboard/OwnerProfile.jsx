import React from "react";
import { User, Mail } from "lucide-react";

export default function OwnerProfile() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="owner-page">

      <div className="owner-page-header">
        <div>
          <h1>Profile</h1>
          <p>Manage your account information</p>
        </div>
      </div>

      <div className="profile-card">

        <div className="profile-avatar">
          <User size={35} />
        </div>

        <div className="profile-info">

          <div>
            <label>Name</label>
            <h3>{user?.name || "User"}</h3>
          </div>

          <div>
            <label>Email</label>

            <h3>
              <Mail size={17} />
              {user?.email || "No email"}
            </h3>
          </div>

          <div>
            <label>Account Type</label>
            <h3>Owner</h3>
          </div>

        </div>

      </div>

    </div>
  );
}
