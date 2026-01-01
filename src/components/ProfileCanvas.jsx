import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const ProfileCanvas = ({ open, onClose }) => {
  const { user } = useContext(AuthContext);
  const [form, setForm] = useState(user);

  const saveProfile = async () => {
    await axios.put(
      "/api/profile/update",
      form,
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    alert("Profile updated");
  };

  return (
    open && (
      <div className="fixed right-0 top-0 w-96 h-full bg-white shadow-lg p-6">
        <button onClick={onClose}>✖</button>

        <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
        <input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} />
        <input value={form.address} onChange={e=>setForm({...form,address:e.target.value})} />
        <input value={form.city} onChange={e=>setForm({...form,city:e.target.value})} />
        <input value={form.postcode} onChange={e=>setForm({...form,postcode:e.target.value})} />

        <button onClick={saveProfile}>Save</button>
      </div>
    )
  );
};

export default ProfileCanvas;
