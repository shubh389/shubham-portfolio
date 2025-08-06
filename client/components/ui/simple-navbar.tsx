import { motion } from "framer-motion";
import { Button } from "./button";
import { MobileNav } from "./mobile-nav";
import {
  Mail,
  Download,
  Home,
  User,
  Code,
  Briefcase,
  MessageCircle,
} from "lucide-react";

interface SimpleNavbarProps {
  activeSection: string;
  isScrolled: boolean;
  scrollToSection: (section: string) => void;
  scrollYProgress: any;
}

export function SimpleNavbar({
  activeSection,
  isScrolled,
  scrollToSection,
  scrollYProgress,
}: SimpleNavbarProps) {
  const navigationItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "about", label: "About", icon: User },
    { id: "skills", label: "Skills", icon: Code },
    { id: "projects", label: "Projects", icon: Briefcase },
    { id: "contact", label: "Contact", icon: MessageCircle },
  ];

  return (
    <>
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 z-50"
        style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
      />

      {/* Simple Navigation */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? "bg-black/90 backdrop-blur-xl border-b border-white/10"
            : "bg-transparent"
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Simple Logo */}
            <motion.div
              className="cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection("home")}
            >
              <span className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                Shubham
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative text-sm font-medium transition-all duration-300 ${
                    activeSection === item.id
                      ? "text-cyan-400"
                      : "text-white/70 hover:text-white"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>{item.label}</span>

                  {/* Active indicator */}
                  {activeSection === item.id && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500"
                      layoutId="activeIndicator"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4">
              {/* Contact Button */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden sm:block"
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="border-cyan-500/50 text-cyan-400 hover:text-white bg-transparent hover:border-cyan-400"
                  onClick={() => scrollToSection("contact")}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  <span className="hidden lg:inline">Let's Talk</span>
                  <span className="lg:hidden">Talk</span>
                </Button>
              </motion.div>

              {/* Download Resume Button */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden lg:block"
              >
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white border-0"
                  onClick={() => {
                    const resumeUrl =
                      "https://drive.google.com/file/d/14GcraK0sTYmhmjIkgrTdSmlfSflMX6fs/view?usp=sharing";
                    const link = document.createElement("a");
                    link.href = resumeUrl;
                    link.download = "Shubham_Dev_Resume.pdf";
                    link.target = "_blank";
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Resume
                </Button>
              </motion.div>

              {/* Mobile Navigation */}
              <MobileNav
                activeSection={activeSection}
                scrollToSection={scrollToSection}
              />
            </div>
          </div>
        </div>
      </motion.nav>
    </>
  );
}
