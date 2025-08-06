import { useEffect, useState, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";

interface CursorState {
  x: number;
  y: number;
  isHovering: boolean;
  isClicking: boolean;
  hoverType: "default" | "button" | "link" | "text";
}

export function CustomCursor() {
  const [cursorState, setCursorState] = useState<CursorState>({
    x: 0,
    y: 0,
    isHovering: false,
    isClicking: false,
    hoverType: "default",
  });

  const [trailPositions, setTrailPositions] = useState<
    Array<{ x: number; y: number; id: number }>
  >([]);
  const trailIdRef = useRef(0);
  
  // Mobile detection state
  const [isMobile, setIsMobile] = useState(false);

  // Motion values for smooth cursor movement
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  // Spring animation for smooth following
  const springConfig = { damping: 25, stiffness: 700, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Enhanced mobile detection
  useEffect(() => {
    const checkMobile = () => {
      const hasTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth <= 768;
      const isMobileUserAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      return hasTouchScreen || isSmallScreen || isMobileUserAgent;
    };

    setIsMobile(checkMobile());

    const handleResize = () => {
      setIsMobile(checkMobile());
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  useEffect(() => {
    // Don't show cursor on mobile devices to prevent interference with Spline animations
    if (isMobile) {
      // Restore default cursor for mobile and ensure no interference
      document.body.style.cursor = "auto";
      return;
    }

    const updateCursor = (e: MouseEvent) => {
      setCursorState((prev) => ({
        ...prev,
        x: e.clientX,
        y: e.clientY,
      }));

      // Update motion values for smooth animation
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      // Add trail position with unique ID
      const newTrailPosition = {
        x: e.clientX,
        y: e.clientY,
        id: trailIdRef.current++,
      };

      setTrailPositions((prev) => {
        const newTrail = [newTrailPosition, ...prev.slice(0, 4)];
        return newTrail;
      });
    };

    const handleMouseDown = () => {
      setCursorState((prev) => ({ ...prev, isClicking: true }));
    };

    const handleMouseUp = () => {
      setCursorState((prev) => ({ ...prev, isClicking: false }));
    };

    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      let hoverType: CursorState["hoverType"] = "default";

      if (target.tagName === "BUTTON" || target.closest("button")) {
        hoverType = "button";
      } else if (target.tagName === "A" || target.closest("a")) {
        hoverType = "link";
      } else if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.closest("input, textarea")
      ) {
        hoverType = "text";
      }

      setCursorState((prev) => ({
        ...prev,
        isHovering: hoverType !== "default",
        hoverType,
      }));
    };

    const handleMouseLeave = () => {
      setCursorState((prev) => ({
        ...prev,
        isHovering: false,
        hoverType: "default",
      }));
    };

    // Add event listeners
    document.addEventListener("mousemove", updateCursor);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    // Add hover detection for interactive elements
    const interactiveElements = document.querySelectorAll(
      'button, a, input, textarea, [role="button"]',
    );
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    // Hide default cursor
    document.body.style.cursor = "none";

    return () => {
      document.removeEventListener("mousemove", updateCursor);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);

      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });

      document.body.style.cursor = "auto";
    };
  }, [cursorX, cursorY, isMobile]);

  // Clean up old trail positions
  useEffect(() => {
    const interval = setInterval(() => {
      setTrailPositions((prev) => prev.slice(-6));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const getCursorVariants = () => {
    const base = {
      width: cursorState.isHovering ? 60 : 20,
      height: cursorState.isHovering ? 60 : 20,
      scale: cursorState.isClicking ? 0.8 : 1,
      opacity: 1,
    };

    switch (cursorState.hoverType) {
      case "button":
        return {
          ...base,
          backgroundColor: "rgba(6, 182, 212, 0.8)",
          border: "2px solid rgba(6, 182, 212, 1)",
          width: 50,
          height: 50,
        };
      case "link":
        return {
          ...base,
          backgroundColor: "rgba(139, 92, 246, 0.8)",
          border: "2px solid rgba(139, 92, 246, 1)",
          width: 40,
          height: 40,
        };
      case "text":
        return {
          ...base,
          backgroundColor: "rgba(236, 72, 153, 0.8)",
          border: "2px solid rgba(236, 72, 153, 1)",
          width: 30,
          height: 30,
        };
      default:
        return {
          ...base,
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
        };
    }
  };

  return (
    <>
      {/* Only render cursor on desktop devices to prevent Spline animation interference */}
      {!isMobile && (
        <>
          {/* Trail particles */}
          <AnimatePresence>
            {trailPositions.map((pos, index) => (
              <motion.div
                key={pos.id}
                className="fixed pointer-events-none z-[9999]"
                initial={{
                  opacity: 0.8,
                  scale: 1,
                  x: pos.x - 3,
                  y: pos.y - 3,
                }}
                animate={{
                  opacity: 0,
                  scale: 0.2,
                  x: pos.x - 3,
                  y: pos.y - 3,
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.8,
                  ease: "easeOut",
                  delay: index * 0.03,
                }}
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background:
                    cursorState.hoverType === "button"
                      ? "radial-gradient(circle, rgba(6, 182, 212, 0.8), transparent)"
                      : cursorState.hoverType === "link"
                        ? "radial-gradient(circle, rgba(139, 92, 246, 0.8), transparent)"
                        : cursorState.hoverType === "text"
                          ? "radial-gradient(circle, rgba(236, 72, 153, 0.8), transparent)"
                          : "radial-gradient(circle, rgba(255, 255, 255, 0.6), transparent)",
                  boxShadow: "0 0 10px rgba(0, 255, 255, 0.3)",
                }}
              />
            ))}
          </AnimatePresence>

          {/* Main cursor */}
          <motion.div
            className="fixed pointer-events-none z-[10000] rounded-full mix-blend-difference"
            style={{
              left: cursorXSpring,
              top: cursorYSpring,
              x: "-50%",
              y: "-50%",
            }}
            animate={getCursorVariants()}
            transition={{
              type: "spring",
              damping: 20,
              stiffness: 300,
              mass: 0.8,
            }}
          >
            {/* Inner glow */}
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                boxShadow: cursorState.isHovering
                  ? cursorState.hoverType === "button"
                    ? "0 0 30px rgba(6, 182, 212, 0.8), inset 0 0 20px rgba(6, 182, 212, 0.3)"
                    : cursorState.hoverType === "link"
                      ? "0 0 30px rgba(139, 92, 246, 0.8), inset 0 0 20px rgba(139, 92, 246, 0.3)"
                      : cursorState.hoverType === "text"
                        ? "0 0 30px rgba(236, 72, 153, 0.8), inset 0 0 20px rgba(236, 72, 153, 0.3)"
                        : "0 0 20px rgba(255, 255, 255, 0.5), inset 0 0 10px rgba(255, 255, 255, 0.2)"
                  : "0 0 15px rgba(255, 255, 255, 0.3), inset 0 0 8px rgba(255, 255, 255, 0.1)",
              }}
              transition={{ duration: 0.2 }}
            />

            {/* Magnetic attraction indicator */}
            {cursorState.isHovering && (
              <motion.div
                className="absolute inset-0 rounded-full border-2"
                initial={{ scale: 1, opacity: 0 }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0, 0.6, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  borderColor:
                    cursorState.hoverType === "button"
                      ? "rgba(6, 182, 212, 0.6)"
                      : cursorState.hoverType === "link"
                        ? "rgba(139, 92, 246, 0.6)"
                        : cursorState.hoverType === "text"
                          ? "rgba(236, 72, 153, 0.6)"
                          : "rgba(255, 255, 255, 0.4)",
                }}
              />
            )}

            {/* Click ripple effect */}
            {cursorState.isClicking && (
              <motion.div
                className="absolute inset-0 rounded-full border-2"
                initial={{ scale: 1, opacity: 0.8 }}
                animate={{
                  scale: 3,
                  opacity: 0,
                }}
                transition={{ duration: 0.6 }}
                style={{
                  borderColor:
                    cursorState.hoverType === "button"
                      ? "rgba(6, 182, 212, 1)"
                      : cursorState.hoverType === "link"
                        ? "rgba(139, 92, 246, 1)"
                        : cursorState.hoverType === "text"
                          ? "rgba(236, 72, 153, 1)"
                          : "rgba(255, 255, 255, 0.8)",
                }}
              />
            )}
          </motion.div>

          {/* Outer cursor ring */}
          <motion.div
            className="fixed pointer-events-none z-[9998] rounded-full border opacity-30"
            style={{
              left: cursorX,
              top: cursorY,
              x: "-50%",
              y: "-50%",
            }}
            animate={{
              width: cursorState.isHovering ? 80 : 40,
              height: cursorState.isHovering ? 80 : 40,
              borderColor:
                cursorState.hoverType === "button"
                  ? "rgba(6, 182, 212, 0.5)"
                  : cursorState.hoverType === "link"
                    ? "rgba(139, 92, 246, 0.5)"
                    : cursorState.hoverType === "text"
                      ? "rgba(236, 72, 153, 0.5)"
                      : "rgba(255, 255, 255, 0.3)",
            }}
            transition={{
              type: "spring",
              damping: 30,
              stiffness: 200,
              mass: 1,
            }}
          />
        </>
      )}
    </>
  );
}

// Hook to detect if device supports hover (desktop)
export function useSupportsCursor() {
  const [supportsCursor, setSupportsCursor] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    setSupportsCursor(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setSupportsCursor(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return supportsCursor;
}
