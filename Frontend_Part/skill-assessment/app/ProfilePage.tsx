"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import Navbar from "./Navbar";
import { useAuth } from "./context/authContext";

// TypeScript interfaces
interface UserProfile {
  name?: string;
  email?: string;
  role?: string;
  avatar?: string;
}

interface ProfilePageProps {
  userProfile: UserProfile;
  setUserProfile: (data: UserProfile) => Promise<void>;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({
  userProfile,
  setUserProfile,
  darkMode,
  toggleDarkMode,
}) => {
  const { token } = useAuth();
  const [avatar, setAvatar] = useState<string>(userProfile?.avatar || "");
  const [name, setName] = useState<string>(userProfile?.name || "");
  const [role, setRole] = useState<string>(userProfile?.role || "");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  useEffect(() => {
    if (userProfile) {
      setName(userProfile.name || "");
      setRole(userProfile.role || "");
      setAvatar(userProfile.avatar || "");
    }
  }, [userProfile]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }

      if (!file.type.startsWith("image/")) {
        toast.error("Please upload an image file");
        return;
      }

      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = async () => {
    try {
      setIsSubmitting(true);

      if (!name.trim()) {
        toast.error("Name is required");
        return;
      }

      if (name.length > 50) {
        toast.error("Name should be less than 50 characters");
        return;
      }

      if (role && role.length > 50) {
        toast.error("Role should be less than 50 characters");
        return;
      }

      const profileData: UserProfile = {
        name: name.trim(),
        role: role.trim(),
        avatar: avatarFile || avatar,
        email: userProfile.email, // Preserve the email
      };

      await setUserProfile(profileData);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to update profile"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isSubmitting) {
      handleSaveChanges();
    }
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900" : "bg-gray-50"
      } transition-colors duration-200`}
    >
      <Navbar
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        toggleMobileMenu={toggleMobileMenu}
        mobileMenuOpen={mobileMenuOpen}
      />

      <div className="py-6 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <Card
          className={`${
            darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
          } shadow-lg rounded-lg transition-colors duration-200`}
        >
          <CardHeader>
            <CardTitle className="text-xl font-bold">Your Profile</CardTitle>
            <CardDescription
              className={darkMode ? "text-gray-300" : "text-gray-600"}
            >
              Manage your personal information and settings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row items-center space-y-6 sm:space-y-0 sm:space-x-8 mb-8">
              <div className="relative group">
                <img
                  src={avatar || "/default-avatar.png"}
                  alt="User Avatar"
                  className="w-32 h-32 rounded-full border-4 border-primary object-cover transition-transform duration-200 group-hover:scale-105"
                />
                <label className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                  <span className="text-white text-sm">Edit</span>
                </label>
              </div>
              <div className="text-center sm:text-left">
                <h2
                  className={`${
                    darkMode ? "text-white" : "text-gray-800"
                  } text-2xl font-semibold`}
                >
                  {name}
                </h2>
                <p
                  className={`${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  } mb-2`}
                >
                  {userProfile?.email}
                </p>
                <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  {role}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label
                  className={`block text-sm font-medium ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  } mb-1`}
                >
                  Name *
                </label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className={`mt-1 w-full ${
                    darkMode ? "bg-gray-700 text-white" : ""
                  }`}
                  placeholder="Enter your name"
                  maxLength={50}
                  required
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-medium ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  } mb-1`}
                >
                  Email
                </label>
                <Input
                  value={userProfile?.email}
                  className={`mt-1 w-full bg-gray-100 cursor-not-allowed ${
                    darkMode ? "text-gray-400" : ""
                  }`}
                  disabled
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-medium ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  } mb-1`}
                >
                  Role
                </label>
                <Input
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className={`mt-1 w-full ${
                    darkMode ? "bg-gray-700 text-white" : ""
                  }`}
                  placeholder="Enter your role"
                  maxLength={50}
                />
              </div>

              <Button
                onClick={handleSaveChanges}
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white hover:bg-blue-700 transition-all mt-4 flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;