import React, { useContext } from "react";
import { UserContext } from "./UserContext.js";
import './profile.css'; // Assuming you have a CSS file for additional styles

function UserProfile() {
    const { user } = useContext(UserContext);

    if (!user) {
        return <div className="login-warning">Please log in to view your profile.</div>;
    }

    return (
        <div className="profile-container">
            <div className="profile-card shadow-sm p-4">
                <h2 className="profile-header">{user.type} Profile</h2>
                <div className="profile-details">
                    <p><strong>Username:</strong> {user.username}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;
