"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "../app/context/authContext";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const { token, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !token) {
      router.push("/login");
    }
  }, [token, loading, router]);

  if (loading) {
    return <div>Loading...</div>; 
  }

  return token ? children : null;
}