import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, MessageCircle, Phone, Mail } from "lucide-react";
import { Button } from "./button";

export function FloatingActionButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const actions = [
    {
      icon: ArrowUp,
      label: "Back to top",
      onClick: scrollToTop,
      color: "from-cyan-500 to-blue-600",
    },
    {
      icon: MessageCircle,
      label: "Contact",
      onClick: scrollToContact,
      color: "from-purple-500 to-pink-600",
    },
    {
      icon: Mail,
      label: "Email",
      onClick: () => window.open("mailto:shubhamdev9128@gmail.com"),
      color: "from-green-500 to-emerald-600",
    },
    {
      icon: Phone,
      label: "Call",
      onClick: () => window.open("tel:+919128364783"),
      color: "from-orange-500 to-red-600",
    },
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <div className="relative">
            {/* Action Buttons */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="absolute bottom-16 right-0 space-y-3"
                >
                  {actions.map((action, index) => (
                    <motion.div
                      key={action.label}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <span className="bg-black/80 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap backdrop-blur-sm">
                        {action.label}
                      </span>
                      <Button
                        size="icon"
                        onClick={action.onClick}
                        className={`bg-gradient-to-r ${action.color} hover:scale-110 transition-transform duration-200 shadow-lg`}
                      >
                        <action.icon className="h-5 w-5" />
                      </Button>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Main FAB */}
            <motion.button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-14 h-14 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-white hover:scale-110 backdrop-blur-sm"
              whileHover={{ rotate: 180 }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                animate={{ rotate: isExpanded ? 45 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <MessageCircle className="h-6 w-6" />
              </motion.div>
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
