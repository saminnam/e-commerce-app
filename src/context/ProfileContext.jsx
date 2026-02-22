import { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";
import { AuthContext } from "./AuthContext";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const res = await axiosInstance.get("/profile");
      setProfile(res.data || null);
    } catch {
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (data) => {
    const res = await axiosInstance.post("/profile", data);
    setProfile(res.data); // This updates all components using useProfile()
  };

  const deleteProfile = async () => {
    await axiosInstance.delete("/profile");
    setProfile(null);
  };
  useEffect(() => {
    if (user) {
      fetchProfile();
    } else {
      setProfile(null); // Clear profile on logout
    }
  }, [user]);

  return (
    <ProfileContext.Provider
      value={{ profile, updateProfile, deleteProfile, loading }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
