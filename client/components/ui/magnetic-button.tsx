import { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Button } from "./button";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: "default" | "outline";
  size?: "sm" | "default" | "lg";
  magnetic?: boolean;
  glowColor?: string;
}

export function MagneticButton({
  children,
  className = "",
  onClick,
  variant = "default",
  size = "lg",
  magnetic = true,
  glowColor = "#00ffff",
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 300, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  useEffect(() => {
    const element = ref.current;
    if (!element || !magnetic) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      // Magnetic attraction when within range
      if (distance < 150) {
        const magneticForce = Math.max(0, 1 - distance / 150);
        x.set(deltaX * magneticForce * 0.3);
        y.set(deltaY * magneticForce * 0.3);
        setMousePosition({ x: deltaX, y: deltaY });
      } else {
        x.set(0);
        y.set(0);
      }
    };

    const handleMouseEnter = () => {
      setIsHovering(true);
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      x.set(0);
      y.set(0);
      setMousePosition({ x: 0, y: 0 });
    };

    document.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [x, y, magnetic]);

  return (
    <motion.div
      style={{ x: springX, y: springY }}
      className="relative inline-block"
    >
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={`relative overflow-hidden transition-all duration-300 ${className}`}
        onClick={onClick}
        {...props}
      >
        {/* Background glow effect */}
        <motion.div
          className="absolute inset-0 rounded-lg opacity-0"
          animate={{
            opacity: isHovering ? 0.3 : 0,
            scale: isHovering ? 1.1 : 1,
          }}
          transition={{ duration: 0.3 }}
          style={{
            background: `radial-gradient(circle at center, ${glowColor}, transparent 70%)`,
            filter: "blur(8px)",
          }}
        />

        {/* Ripple effect on hover */}
        {isHovering && (
          <motion.div
            className="absolute inset-0 rounded-lg"
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{
              scale: [0, 1.5],
              opacity: [0.5, 0],
            }}
            transition={{ duration: 0.6, repeat: Infinity }}
            style={{
              background: `radial-gradient(circle, ${glowColor}22, transparent 50%)`,
            }}
          />
        )}

        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0 opacity-0"
          animate={{
            opacity: isHovering ? [0, 0.3, 0] : 0,
            x: isHovering ? ["-100%", "100%"] : 0,
          }}
          transition={{
            duration: 1.5,
            repeat: isHovering ? Infinity : 0,
            repeatDelay: 1,
            ease: "easeInOut",
          }}
          style={{
            background: `linear-gradient(90deg, transparent, ${glowColor}44, transparent)`,
          }}
        />

        {/* Content with relative positioning */}
        <span className="relative z-10 flex items-center justify-center">
          {children}
        </span>

        {/* Particle burst effect */}
        {isHovering && (
          <>
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full"
                style={{
                  backgroundColor: glowColor,
                  left: "50%",
                  top: "50%",
                }}
                initial={{
                  scale: 0,
                  x: 0,
                  y: 0,
                  opacity: 1,
                }}
                animate={{
                  scale: [0, 1, 0],
                  x: Math.cos((i / 6) * Math.PI * 2) * 30,
                  y: Math.sin((i / 6) * Math.PI * 2) * 30,
                  opacity: [1, 1, 0],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: "easeOut",
                }}
              />
            ))}
          </>
        )}
      </Button>

      {/* External glow ring */}
      <motion.div
        className="absolute inset-0 rounded-lg pointer-events-none"
        animate={{
          scale: isHovering ? 1.2 : 1,
          opacity: isHovering ? 0.6 : 0,
        }}
        transition={{ duration: 0.3 }}
        style={{
          boxShadow: `0 0 30px ${glowColor}66`,
          border: `1px solid ${glowColor}44`,
        }}
      />

      {/* Magnetic field visualization */}
      {magnetic && isHovering && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            left: "50%",
            top: "50%",
            x: "-50%",
            y: "-50%",
          }}
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute border rounded-full opacity-20"
              style={{
                borderColor: glowColor,
                width: 60 + i * 30,
                height: 60 + i * 30,
                left: "50%",
                top: "50%",
                x: "-50%",
                y: "-50%",
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.1, 0.2],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}

// Enhanced button with sound effect simulation
export function SoundButton({ children, soundType = "click", ...props }: any) {
  const [isPlaying, setIsPlaying] = useState(false);

  const playSound = () => {
    setIsPlaying(true);
    // Simulate sound effect with visual feedback
    setTimeout(() => setIsPlaying(false), 200);
  };

  return (
    <MagneticButton
      {...props}
      onClick={() => {
        playSound();
        props.onClick?.();
      }}
      className={`${props.className} relative`}
    >
      {children}

      {/* Sound visualization */}
      {isPlaying && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ scale: 1, opacity: 0.8 }}
          animate={{
            scale: [1, 1.5, 2],
            opacity: [0.8, 0.4, 0],
          }}
          transition={{ duration: 0.3 }}
          style={{
            border: "2px solid #00ffff",
            borderRadius: "inherit",
          }}
        />
      )}
    </MagneticButton>
  );
}
