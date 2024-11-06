// ProfilePage.tsx
"use client";
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";

const ProfilePage = ({ userProfile, setUserProfile, darkMode }) => {
  return (
    <div className="py-6 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <Card className="bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle>Your Profile</CardTitle>
          <CardDescription>Manage your personal information and settings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
            <img
              src={userProfile.avatar}
              alt="User Avatar"
              className="w-24 h-24 rounded-full border-2 border-primary"
            />
            <div>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                {userProfile.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">{userProfile.email}</p>
              <p className="text-gray-600 dark:text-gray-400">{userProfile.role}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
              <Input
                value={userProfile.name}
                onChange={(e) => setUserProfile({ ...userProfile, name: e.target.value })}
                className="mt-1 w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
              <Input
                value={userProfile.email}
                onChange={(e) => setUserProfile({ ...userProfile, email: e.target.value })}
                className="mt-1 w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Role</label>
              <Input
                value={userProfile.role}
                onChange={(e) => setUserProfile({ ...userProfile, role: e.target.value })}
                className="mt-1 w-full"
              />
            </div>
            <Button
              onClick={() => toast.success("Profile Updated!", { autoClose: 2000 })}
              className="w-full"
            >
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
