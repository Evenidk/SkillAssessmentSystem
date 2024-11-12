// app/Footer.tsx
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="flex w-full items-center justify-between px-4">
          {/* Left section - Made with love */}
          <div className="flex items-center space-x-2">
            <span className="text-sm">Made with</span>
            <Heart className="h-4 w-4 fill-red-500 text-red-500" />
            <span className="text-sm"></span>
          </div>

          {/* Middle section - Evenidk | Wish I Knew */}
          <div className="text-sm font-medium">
            Evenidk | Wish I Knew
          </div>

          {/* Right section - Copyright */}
          <div className="text-sm">
            &copy; SkillProve AI {new Date().getFullYear()}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;