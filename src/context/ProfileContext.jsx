import { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
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
    setProfile(res.data);
  };

  const deleteProfile = async () => {
    await axiosInstance.delete("/profile");
    setProfile(null);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <ProfileContext.Provider
      value={{ profile, updateProfile, deleteProfile, loading }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
