import Image from "next/image";
import SkillPage from "@/app/skill_page";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Home() {
  return (
    <ProtectedRoute>
      <SkillPage/>
    </ProtectedRoute>
  );
}
