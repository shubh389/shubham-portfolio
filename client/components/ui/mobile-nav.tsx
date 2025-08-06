import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Home,
  User,
  Code,
  Briefcase,
  Mail,
  Download,
  Github,
  Globe,
  Zap,
} from "lucide-react";
import { Button } from "./button";

interface MobileNavProps {
  activeSection: string;
  scrollToSection: (section: string) => void;
}

export function MobileNav({ activeSection, scrollToSection }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted for animations
  useEffect(() => {
    setMounted(true);
  }, []);

  // Close menu on escape key and prevent body scroll
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const navItems = [
    { 
      id: "home", 
      label: "Home", 
      icon: Home,
      description: "Welcome & Introduction"
    },
    { 
      id: "about", 
      label: "About", 
      icon: User,
      description: "My Story & Background"
    },
    { 
      id: "skills", 
      label: "Skills", 
      icon: Code,
      description: "Technologies & Expertise"
    },
    { 
      id: "projects", 
      label: "Projects", 
      icon: Briefcase,
      description: "Featured Work & Portfolio"
    },
    { 
      id: "contact", 
      label: "Contact", 
      icon: Mail,
      description: "Get In Touch"
    },
  ];

  const handleNavClick = (section: string) => {
    scrollToSection(section);
    setIsOpen(false);
  };

  if (!mounted) return null;

  return (
    <div className="lg:hidden">
      {/* Simplified Hamburger Button with Better Stability */}
      <motion.div 
        whileHover={{ scale: 1.02 }} 
        whileTap={{ scale: 0.98 }}
        className="relative"
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className={`mobile-nav-button relative z-50 w-12 h-12 transition-all duration-200 backdrop-blur-sm ${
            isOpen
              ? "bg-cyan-500/20 border border-cyan-400/50 text-cyan-300"
              : "hover:bg-white/10 text-white/90 hover:text-white border border-transparent hover:border-white/20"
          }`}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="h-6 w-6" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="h-6 w-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </motion.div>

      {/* Mobile Menu Overlay with Stable Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Simplified Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="mobile-nav-overlay fixed inset-0 bg-black/90 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Stable Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "tween",
                duration: 0.3,
                ease: "easeInOut"
              }}
              className="mobile-nav-panel fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-black/95 backdrop-blur-xl border-l border-cyan-500/20 z-50 flex flex-col"
            >
              {/* Simplified Header */}
              <div className="p-6 border-b border-white/10">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-white">Portfolio</h2>
                    <p className="text-sm text-gray-400 mt-1">Navigation</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-xs text-green-400">Online</span>
                    </div>
                    {/* Close Button */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsOpen(false)}
                      className="w-8 h-8 rounded-full bg-white/10 hover:bg-red-500/20 border border-white/20 hover:border-red-400/50 flex items-center justify-center transition-all duration-200"
                    >
                      <X className="h-4 w-4 text-white/70 hover:text-red-400" />
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Simplified Navigation Items */}
              <nav className="flex-1 p-4 overflow-y-auto">
                <div className="space-y-2">
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl text-left transition-all duration-200 ${
                        activeSection === item.id
                          ? "bg-cyan-500/20 border border-cyan-400/50 text-cyan-300"
                          : "text-white/80 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <div
                        className={`p-2 rounded-lg ${
                          activeSection === item.id
                            ? "bg-cyan-500 text-white"
                            : "bg-white/10 text-white/70"
                        }`}
                      >
                        <item.icon className="h-5 w-5" />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{item.label}</span>
                          {activeSection === item.id && (
                            <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                          )}
                        </div>
                        <p className="text-xs text-gray-400 mt-1">
                          {item.description}
                        </p>
                      </div>
                    </motion.button>
                  ))}
                </div>

                {/* Simplified Quick Actions */}
                <div className="mt-6 pt-4 border-t border-white/10">
                  <h3 className="text-sm font-medium text-gray-300 mb-3">Quick Actions</h3>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full border-white/20 text-white/80 hover:bg-white/5 hover:border-cyan-400/50"
                      onClick={() => {
                        console.log("Download CV");
                        setIsOpen(false);
                      }}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download Resume
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full border-white/20 text-white/80 hover:bg-white/5 hover:border-purple-400/50"
                      onClick={() => {
                        window.open("https://github.com/shubh389", "_blank");
                        setIsOpen(false);
                      }}
                    >
                      <Github className="h-4 w-4 mr-2" />
                      View GitHub
                    </Button>
                  </div>
                </div>
              </nav>

              {/* Simplified Footer */}
              <div className="p-4 border-t border-white/10">
                <div className="text-center space-y-3">
                  <p className="text-sm text-gray-300">Ready to collaborate?</p>
                  <Button
                    className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700"
                    onClick={() => handleNavClick("contact")}
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Get In Touch
                  </Button>
                  <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Globe className="h-3 w-3 text-green-400" />
                      <span>Remote</span>
                    </div>
                    <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                    <div className="flex items-center gap-1">
                      <Zap className="h-3 w-3 text-yellow-400" />
                      <span>Fast</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
