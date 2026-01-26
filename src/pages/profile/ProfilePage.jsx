import { useEffect, useState } from "react";
import { useProfile } from "../../context/ProfileContext";
import { User, Mail, Phone, MapPin, Building, Hash } from "lucide-react";

const ProfilePage = () => {
  const { profile, updateProfile, deleteProfile } = useProfile();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (profile) setForm(profile);
  }, [profile]);

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateProfile(form);
      setEditing(false);
      alert("Profile updated successfully 🎉");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your profile?")) return;
    try {
      await deleteProfile();
      setForm({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        postalCode: "",
      });
      setEditing(false);
      alert("Profile deleted successfully 🗑️");
    } catch (err) {
      console.error(err);
      alert("Failed to delete profile ❌");
    }
  };

  const fields = [
    { key: "name", label: "Full Name", icon: User, textarea: false },
    { key: "email", label: "Email Address", icon: Mail, textarea: false },
    { key: "phone", label: "Mobile Number", icon: Phone, textarea: false },
    { key: "address", label: "Address", icon: MapPin, textarea: true },
    { key: "city", label: "City", icon: Building, textarea: false },
    { key: "postalCode", label: "Postal Code", icon: Hash, textarea: false },
  ];

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-12">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold mb-6">My Profile</h2>

        <div className="space-y-5">
          {fields.map(({ key, label, icon: Icon, textarea }) => (
            <div key={key}>
              <label className="text-sm font-medium text-gray-600">{label}</label>
              <div
                className={`mt-1 flex gap-3 border rounded-lg px-4 py-3 ${
                  editing ? "border-gray-300" : "border-gray-200 bg-gray-50"
                }`}
              >
                <Icon size={18} className="text-gray-500 mt-1" />
                {textarea ? (
                  <textarea
                    rows={3}
                    value={form[key] || ""}
                    disabled={!editing}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    className="w-full resize-none outline-none bg-transparent"
                  />
                ) : (
                  <input
                    type="text"
                    value={form[key] || ""}
                    disabled={!editing}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    className="w-full outline-none bg-transparent"
                  />
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex gap-3">
          {editing ? (
            <>
              <button
                onClick={handleSave}
                disabled={loading}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-semibold"
              >
                {loading ? "Saving..." : "Save"}
              </button>
              <button
                onClick={() => setEditing(false)}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-3 rounded-xl font-semibold"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setEditing(true)}
                className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-xl font-semibold"
              >
                Edit Profile
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold"
              >
                Delete Profile
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
