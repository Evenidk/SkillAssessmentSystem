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
import { useTheme } from "./context/themeContext";

interface UserProfile {
  name?: string;
  email?: string;
  role?: string;
  avatar?: string;
}

interface ProfilePageProps {
  userProfile: UserProfile;
  setUserProfile: (data: UserProfile) => Promise<void>;
}

const ProfilePage: React.FC<ProfilePageProps> = ({
  userProfile,
  setUserProfile,
}) => {
  const { token } = useAuth();
  const { theme, setTheme } = useTheme();
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
        email: userProfile.email,
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
    <div className="min-h-screen bg-background">
      <Navbar
        toggleMobileMenu={toggleMobileMenu}
        mobileMenuOpen={mobileMenuOpen}
      />

      <div className="py-6 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold">Your Profile</CardTitle>
            <CardDescription>
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
                <label className="absolute bottom-0 right-0 bg-primary text-primary-foreground p-2 rounded-full cursor-pointer hover:bg-primary/90 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                  <span className="text-sm">Edit</span>
                </label>
              </div>
              <div className="text-center sm:text-left">
                <h2 className="text-2xl font-semibold text-foreground">
                  {name}
                </h2>
                <p className="text-muted-foreground mb-2">
                  {userProfile?.email}
                </p>
                <p className="text-muted-foreground">{role}</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Name *
                </label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter your name"
                  maxLength={50}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Email
                </label>
                <Input
                  value={userProfile?.email}
                  className="bg-muted cursor-not-allowed"
                  disabled
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Role
                </label>
                <Input
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter your role"
                  maxLength={50}
                />
              </div>

              <Button
                onClick={handleSaveChanges}
                disabled={isSubmitting}
                className="w-full"
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
