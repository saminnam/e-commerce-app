import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Building,
  Hash,
  Pencil,
  Trash2,
  Save,
  X,
  LogOut,
} from "lucide-react";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const savedProfile = localStorage.getItem("profile");
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  const updateProfile = async () => {
    localStorage.setItem("profile", JSON.stringify(profile));
    await axios.post("http://localhost:5000/api/profile", profile);
    alert("✅ Profile updated successfully");
    setIsEditing(false);
  };

  const deleteProfile = async () => {
    const confirmDelete = window.confirm(
      "⚠️ Are you sure you want to delete your profile?"
    );

    if (!confirmDelete) return;

    localStorage.removeItem("profile");
    await axios.delete("http://localhost:5000/api/profile");

    setProfile({
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
    });

    setIsEditing(false);
    alert("🗑️ Profile deleted successfully");
  };

  // 🔴 LOGOUT HANDLER
  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (!confirmLogout) return;

    logout();
    navigate("/login", { replace: true });
  };

  const fields = [
    { key: "name", icon: User, placeholder: "Full Name" },
    { key: "email", icon: Mail, placeholder: "Email Address" },
    { key: "phone", icon: Phone, placeholder: "Phone Number" },
    { key: "address", icon: MapPin, placeholder: "Address" },
    { key: "city", icon: Building, placeholder: "City" },
    { key: "postalCode", icon: Hash, placeholder: "Postal Code" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">👤 My Profile</h2>

          <div className="flex gap-3">
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 text-yellow-600 hover:text-yellow-700 font-medium"
              >
                <Pencil size={18} /> Edit
              </button>
            )}

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-500 hover:text-red-600 font-medium"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>
        </div>

        {/* Inputs */}
        <div className="space-y-4">
          {fields.map(({ key, icon: Icon, placeholder }) => (
            <div
              key={key}
              className={`flex items-center gap-3 border rounded-lg px-4 py-3 ${
                isEditing
                  ? "border-yellow-400 bg-white"
                  : "border-gray-200 bg-gray-50"
              }`}
            >
              <Icon className="text-gray-500" size={20} />
              <input
                type="text"
                placeholder={placeholder}
                value={profile[key]}
                disabled={!isEditing}
                onChange={(e) =>
                  setProfile({ ...profile, [key]: e.target.value })
                }
                className={`w-full bg-transparent outline-none text-gray-700 ${
                  !isEditing && "cursor-not-allowed"
                }`}
              />
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-8">
          {isEditing ? (
            <>
              <button
                onClick={updateProfile}
                className="flex-1 flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-lg font-semibold"
              >
                <Save size={18} /> Save
              </button>

              <button
                onClick={() => setIsEditing(false)}
                className="flex-1 flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg font-semibold"
              >
                <X size={18} /> Cancel
              </button>
            </>
          ) : (
            <button
              onClick={deleteProfile}
              className="flex-1 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-semibold"
            >
              <Trash2 size={18} /> Delete Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
