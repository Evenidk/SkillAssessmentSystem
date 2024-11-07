"use client";
import React from "react";
import Link from "next/link"; // Import Link for navigation
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  User,
  Settings,
  LogOut,
  Bell,
  Sun,
  Moon,
  Menu,
  X as CloseIcon,
} from "lucide-react";
import { useAuth } from "./context/authContext";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = ({
  darkMode,
  toggleDarkMode,
  toggleMobileMenu,
  mobileMenuOpen,
}) => {
  const { token, logout } = useAuth();

  return (
    <nav className={`${darkMode ? "bg-gray-800" : "bg-white"} shadow-md`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="cursor-pointer text-2xl font-bold">
              <span className={`${darkMode ? "text-white" : "text-primary"}`}>
                SkillProve AI
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/profile">
              <Button
                variant="ghost"
                className={`${
                  darkMode
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <User className="mr-2 h-4 w-4" />
                Profile
              </Button>
            </Link>
            {/* <Link href="/settings">
              <Button
                variant="ghost"
                className={`${
                  darkMode
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
            </Link> */}

            {/* Conditional Login/Register and Logout Button */}
            {token ? (
              <Button
                variant="ghost"
                onClick={logout}
                className={`${
                  darkMode
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            ) : (
              <>
                <Link href="/login">
                  <Button
                    variant="ghost"
                    className={`${
                      darkMode
                        ? "text-gray-300 hover:text-white"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button
                    variant="ghost"
                    className={`${
                      darkMode
                        ? "text-gray-300 hover:text-white"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Register
                  </Button>
                </Link>
              </>
            )}

            <Button
              variant="ghost"
              className={`${
                darkMode
                  ? "text-gray-300 hover:text-white"
                  : "text-gray-600 hover:text-gray-900"
              } relative`}
            >
              <Bell className="h-4 w-4" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full ring-2 ring-white bg-red-400"></span>
            </Button>
            <Switch
              checked={darkMode}
              onCheckedChange={toggleDarkMode}
              className="ml-4"
              aria-label="Toggle dark mode"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Switch>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <Button
              variant="ghost"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <CloseIcon className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`${darkMode ? "bg-gray-800" : "bg-white"} md:hidden`}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link href="/profile">
                <Button
                  variant="ghost"
                  onClick={toggleMobileMenu}
                  className={`${
                    darkMode
                      ? "text-gray-300 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                  } w-full text-left flex items-center`}
                >
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Button>
              </Link>
              {/* <Link href="/settings">
                <Button
                  variant="ghost"
                  onClick={toggleMobileMenu}
                  className={`${
                    darkMode
                      ? "text-gray-300 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                  } w-full text-left flex items-center`}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Button>
              </Link> */}

              {/* Conditional Login/Register and Logout for Mobile */}
              {token ? (
                <Button
                  variant="ghost"
                  onClick={() => {
                    logout();
                    toggleMobileMenu();
                  }}
                  className={`${
                    darkMode
                      ? "text-gray-300 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                  } w-full text-left flex items-center`}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              ) : (
                <>
                  <Link href="/login">
                    <Button
                      variant="ghost"
                      onClick={toggleMobileMenu}
                      className={`${
                        darkMode
                          ? "text-gray-300 hover:text-white"
                          : "text-gray-600 hover:text-gray-900"
                      } w-full text-left flex items-center`}
                    >
                      Login
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button
                      variant="ghost"
                      onClick={toggleMobileMenu}
                      className={`${
                        darkMode
                          ? "text-gray-300 hover:text-white"
                          : "text-gray-600 hover:text-gray-900"
                      } w-full text-left flex items-center`}
                    >
                      Register
                    </Button>
                  </Link>
                </>
              )}

              <div className="flex items-center mt-2">
                <Switch
                  checked={darkMode}
                  onCheckedChange={toggleDarkMode}
                  className="mr-2"
                  aria-label="Toggle dark mode"
                >
                  <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                </Switch>
                <span className="text-gray-700 dark:text-gray-300">
                  Dark Mode
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
