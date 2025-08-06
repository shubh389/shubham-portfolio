import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./button";
import { MobileNav } from "./mobile-nav";
import { useTheme } from "@/contexts/ThemeContext";
import {
  Mail,
  Download,
  Sun,
  Moon,
  Palette,
  Zap,
  Home,
  User,
  Code,
  Briefcase,
  MessageCircle,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";

interface EnhancedNavbarProps {
  activeSection: string;
  isScrolled: boolean;
  scrollToSection: (section: string) => void;
  scrollYProgress: any;
}

export function EnhancedNavbar({
  activeSection,
  isScrolled,
  scrollToSection,
  scrollYProgress,
}: EnhancedNavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const [showSocials, setShowSocials] = useState(false);

  const navigationItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "about", label: "About", icon: User },
    { id: "skills", label: "Skills", icon: Code },
    { id: "projects", label: "Projects", icon: Briefcase },
    { id: "contact", label: "Contact", icon: MessageCircle },
  ];

  const socialLinks = [
    { icon: Github, href: "#", label: "GitHub", color: "hover:text-gray-600" },
    {
      icon: Linkedin,
      href: "#",
      label: "LinkedIn",
      color: "hover:text-blue-600",
    },
    {
      icon: Twitter,
      href: "#",
      label: "Twitter",
      color: "hover:text-blue-400",
    },
  ];

  return (
    <>
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 z-50"
        style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
      />

      {/* Enhanced Navigation */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-700 ${
          isScrolled
            ? theme === "dark"
              ? "bg-black/95 backdrop-blur-2xl border-b border-white/10 shadow-2xl shadow-cyan-500/5"
              : "bg-white/95 backdrop-blur-2xl border-b border-black/10 shadow-2xl shadow-black/5"
            : "bg-transparent"
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="max-w-8xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20">
            {/* Enhanced Logo */}
            <motion.div
              className="relative group cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection("home")}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-xl blur-md opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                animate={{
                  background:
                    theme === "dark"
                      ? "linear-gradient(to right, #06b6d4, #a855f7)"
                      : "linear-gradient(to right, #0891b2, #9333ea)",
                }}
              />

              <div className="relative flex items-center gap-2 p-2 rounded-xl">
                <motion.div
                  className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Zap className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-white" />
                </motion.div>

                <div className="flex flex-col">
                  <motion.span
                    className={`text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent`}
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    style={{
                      backgroundSize: "200% 200%",
                    }}
                  >
                    Shubham
                  </motion.span>
                  <span
                    className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-600"} font-light tracking-wider`}
                  >
                    Developer
                  </span>
                </div>

                {/* Availability indicator */}
                <motion.div
                  className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white shadow-lg"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.8, 1, 0.8],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  title="Available for work"
                />
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center">
              <div className="flex items-center space-x-1 bg-gradient-to-r from-white/5 to-white/10 dark:from-gray-800/50 dark:to-gray-700/50 backdrop-blur-sm rounded-2xl p-1 border border-white/10">
                {navigationItems.map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`relative px-4 py-2.5 text-sm font-medium transition-all duration-300 rounded-xl group flex items-center gap-2 ${
                      activeSection === item.id
                        ? "text-white"
                        : theme === "dark"
                          ? "text-gray-300 hover:text-white"
                          : "text-gray-600 hover:text-gray-900"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Active background */}
                    {activeSection === item.id && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl shadow-lg"
                        layoutId="activeNavBg"
                        initial={false}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      />
                    )}

                    {/* Hover background */}
                    <motion.div
                      className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                        theme === "dark"
                          ? "bg-gradient-to-r from-cyan-500/20 to-purple-500/20"
                          : "bg-gradient-to-r from-cyan-500/10 to-purple-500/10"
                      }`}
                    />

                    <item.icon className="h-4 w-4 relative z-10" />
                    <span className="relative z-10">{item.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* Theme Toggle */}
              <motion.button
                onClick={toggleTheme}
                className={`relative p-2 sm:p-2.5 lg:p-3 rounded-xl transition-all duration-500 group ${
                  theme === "dark"
                    ? "bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700"
                    : "bg-gray-100/50 hover:bg-gray-200/50 border border-gray-200"
                } backdrop-blur-sm`}
                whileHover={{ scale: 1.05, rotate: 15 }}
                whileTap={{ scale: 0.95 }}
                title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              >
                <motion.div
                  className="relative w-5 h-5 sm:w-6 sm:h-6"
                  initial={false}
                  animate={{ rotate: theme === "dark" ? 0 : 180 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  <AnimatePresence mode="wait">
                    {theme === "dark" ? (
                      <motion.div
                        key="moon"
                        initial={{ opacity: 0, rotate: -90 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        exit={{ opacity: 0, rotate: 90 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0"
                      >
                        <Moon className="w-full h-full text-blue-400" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="sun"
                        initial={{ opacity: 0, rotate: -90 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        exit={{ opacity: 0, rotate: 90 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0"
                      >
                        <Sun className="w-full h-full text-yellow-500" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Theme indicator glow */}
                <motion.div
                  className={`absolute inset-0 rounded-xl ${
                    theme === "dark" ? "bg-blue-400/20" : "bg-yellow-400/20"
                  } opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm`}
                />
              </motion.button>

              {/* Social Links Toggle */}
              <motion.button
                onClick={() => setShowSocials(!showSocials)}
                className={`hidden sm:block relative p-2 sm:p-2.5 lg:p-3 rounded-xl transition-all duration-300 group ${
                  theme === "dark"
                    ? "bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700"
                    : "bg-gray-100/50 hover:bg-gray-200/50 border border-gray-200"
                } backdrop-blur-sm`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Palette
                  className={`w-4 h-4 sm:w-5 sm:h-5 ${
                    theme === "dark" ? "text-purple-400" : "text-purple-600"
                  }`}
                />
              </motion.button>

              {/* Social Links Dropdown */}
              <AnimatePresence>
                {showSocials && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: -10 }}
                    className={`absolute top-full right-0 mt-2 p-2 rounded-xl ${
                      theme === "dark"
                        ? "bg-gray-900/95 border-gray-700"
                        : "bg-white/95 border-gray-200"
                    } border backdrop-blur-xl shadow-2xl`}
                  >
                    <div className="flex gap-2">
                      {socialLinks.map((social, index) => (
                        <motion.a
                          key={index}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`p-2 rounded-lg transition-colors duration-200 ${
                            theme === "dark"
                              ? "hover:bg-gray-800 text-gray-400"
                              : "hover:bg-gray-100 text-gray-600"
                          } ${social.color}`}
                          whileHover={{ scale: 1.1, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <social.icon className="w-4 h-4" />
                        </motion.a>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Contact Button */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden sm:block"
              >
                <Button
                  variant="outline"
                  size="sm"
                  className={`relative overflow-hidden group text-xs sm:text-sm px-3 sm:px-4 lg:px-6 ${
                    theme === "dark"
                      ? "border-cyan-500/50 text-cyan-400 hover:text-white bg-transparent hover:border-cyan-400"
                      : "border-cyan-600/50 text-cyan-600 hover:text-white bg-transparent hover:border-cyan-500"
                  }`}
                  onClick={() => scrollToSection("contact")}
                >
                  <motion.div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
                  <Mail className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 relative z-10" />
                  <span className="relative z-10 hidden lg:inline">
                    Let's Talk
                  </span>
                  <span className="relative z-10 lg:hidden">Talk</span>
                </Button>
              </motion.div>

              {/* Download CV Button */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden md:block"
              >
                <Button
                  size="sm"
                  className="relative overflow-hidden bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white border-0 group text-xs sm:text-sm px-3 sm:px-4 lg:px-6"
                  onClick={() => {
                    console.log("Download CV");
                  }}
                >
                  <motion.div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" />
                  <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 relative z-10" />
                  <span className="relative z-10 hidden lg:inline">Resume</span>
                  <span className="relative z-10 lg:hidden">CV</span>
                </Button>
              </motion.div>

              {/* Enhanced Mobile Navigation */}
              <MobileNav
                activeSection={activeSection}
                scrollToSection={scrollToSection}
              />
            </div>
          </div>
        </div>

        {/* Enhanced Navigation Progress Bar */}
        <motion.div
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 shadow-lg"
          style={{
            width: `${(navigationItems.findIndex((item) => item.id === activeSection) + 1) * (100 / navigationItems.length)}%`,
          }}
          initial={{ width: "0%" }}
          animate={{
            width: `${(navigationItems.findIndex((item) => item.id === activeSection) + 1) * (100 / navigationItems.length)}%`,
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </motion.nav>
    </>
  );
}
