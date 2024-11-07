"use client";
import { useEffect, useState } from 'react';
import { useAuth } from '../context/authContext';
import { getUserProfile, updateUserProfile } from '@/lib/api';
import ProfilePage from '../ProfilePage';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import ProtectedRoute from '@/components/ProtectedRoute';

// Add TypeScript interface
interface UserProfile {
  name?: string;
  email?: string;
  role?: string;
  avatar?: string;
}

export default function Profile() {
  const { token } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [darkMode, setDarkMode] = useState(() => {
    // Check if we're in the browser and get the saved preference
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true';
    }
    return false;
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (token) {
          const profile = await getUserProfile(token);
          setUserProfile(profile);
        }
      } catch (error) {
        console.error('Failed to fetch profile:', error);
        toast.error('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  // Add dark mode toggle function
  const toggleDarkMode = () => {
    setDarkMode(prev => {
      const newValue = !prev;
      // Save the preference
      localStorage.setItem('darkMode', String(newValue));
      return newValue;
    });
  };

  const handleProfileUpdate = async (updatedProfile: UserProfile) => {
    try {
      const updated = await updateUserProfile(token, updatedProfile);
      setUserProfile(updated);
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Failed to update profile:', error);
      toast.error('Failed to update profile');
    }
  };

  // Add mobile menu toggle function
  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => !prev);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">Error loading profile</div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <ProfilePage 
        userProfile={userProfile}
        setUserProfile={handleProfileUpdate}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />
    </ProtectedRoute>
  );
}