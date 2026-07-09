import { useState, useEffect } from "react";
import "../css/Profile.css";
import API from "../api/axios";

const initialUser = {
  name: "Ganesh",
  email: "ganesh@gmail.com",
  phone: "9876543210",
  userId: "TRD1001",
  accountType: "Paper Trading",
  balance: 50000,
  portfolio: 65000,
  profileImage: "",
};

const normalizeUser = (rawUser) => ({
  ...initialUser,
  ...rawUser,
  userId: rawUser?._id || rawUser?.id || initialUser.userId,
  accountType: rawUser?.isAdmin ? "Admin" : "Paper Trading",
  balance: rawUser?.balance ?? initialUser.balance,
  portfolio: rawUser?.portfolio ?? initialUser.portfolio,
});

export default function Profile({ user: propUser, setUser: setParentUser }) {
  const [user, setUser] = useState(() => normalizeUser(propUser));
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState("/default-avatar.png");

  useEffect(() => {
    if (propUser) {
      const normalized = normalizeUser(propUser);
      setUser(normalized);

      const emailKey = (normalized.email || "guest").toLowerCase().trim();
      const storageKey = `profileImage:${emailKey}`;
      const backendImageUrl = normalized.profileImage
        ? `http://localhost:5001${normalized.profileImage}`
        : null;

      if (backendImageUrl) {
        setProfileImage(backendImageUrl);
        localStorage.setItem(storageKey, backendImageUrl);
        return;
      }

      const savedImage = localStorage.getItem(storageKey);
      setProfileImage(savedImage || "/default-avatar.png");
    }
  }, [propUser]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("profileImage", file);

    try {
      const res = await API.post("/auth/upload-profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const imagePath = res.data?.profileImage || "/default-avatar.png";
      const fullImageUrl = `http://localhost:5001${imagePath}`;
      const updatedUser = {
        ...normalizeUser(user),
        profileImage: imagePath,
      };

      setProfileImage(fullImageUrl);
      const emailKey = (updatedUser.email || "guest").toLowerCase().trim();
      localStorage.setItem(`profileImage:${emailKey}`, fullImageUrl);
      setUser(updatedUser);
      if (setParentUser) setParentUser(updatedUser);

      alert("Profile photo updated!");
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert("Upload failed");
    }
  };

  const handleChange = (e) => {
    const updatedUser = {
      ...normalizeUser(user),
      [e.target.name]: e.target.value,
    };

    setUser(updatedUser);
    if (setParentUser) setParentUser(updatedUser);
  };

  const handleSave = () => {
    alert("Profile Updated Successfully!");
    setIsEditing(false);

    // Later we will call backend API here
  };

  const portfolioCount = Array.isArray(user?.portfolio) ? user.portfolio.length : 0;

  return (
    <div className="profile-page">

      <h1 className="profile-title">My Profile</h1>

      <div className="profile-card">

        <div className="profile-header">

         <img
  src={profileImage}
  alt="profile"
  className="profile-image"
/>
{isEditing && (
 <label className="upload-btn">
  📷 Change Photo
  <input
    type="file"
    accept="image/*"
    hidden
    onChange={handleImageChange}
  />
</label>
)}

          <div className="profile-info">

            {isEditing ? (
              <>
                <input
  className={`edit-input ${isEditing ? "edit-mode" : ""}`}
  name="name"
  value={user.name}
  onChange={handleChange}
  disabled={!isEditing}
/>

<input
  className={`edit-input ${isEditing ? "edit-mode" : ""}`}
  name="email"
  value={user.email}
  onChange={handleChange}
  disabled={!isEditing}
/>

<input
  className={`edit-input ${isEditing ? "edit-mode" : ""}`}
  name="phone"
  value={user.phone}
  onChange={handleChange}
  disabled={!isEditing}
/>
              </>
            ) : (
              <>
                <h2>{user.name}</h2>
                <p>{user.email}</p>
                <p>{user.phone}</p>
              </>
            )}

          </div>

        </div>

        <div className="profile-grid">

          <div className="profile-box">
            <strong>User ID:</strong> {user.userId}
          </div>

          <div className="profile-box">
            <strong>Account:</strong> {user.accountType}
          </div>

          <div className="profile-box">
            <strong>Balance:</strong> ₹{user.balance}
          </div>

          <div className="profile-box">
            <strong>Portfolio Items:</strong> {portfolioCount}
          </div>

        </div>

        <div style={{ marginTop: "25px" }}>

          {isEditing ? (
            <>
              <button
                className="edit-btn"
                onClick={handleSave}
              >
                Save
              </button>

              <button
                className="edit-btn"
                style={{ marginLeft: "10px", background: "#ef4444" }}
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              className="edit-btn"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </button>
          )}

        </div>

      </div>

    </div>
  );
}