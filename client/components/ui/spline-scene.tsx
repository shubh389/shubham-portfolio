import { useState, useEffect, memo } from "react";
import { motion } from "framer-motion";

// Lazy load Spline to avoid SSR issues
const SplineComponent = memo(() => {
  const [SplineReact, setSplineReact] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    // Dynamic import to avoid SSR issues
    const loadSpline = () => {
      import("@splinetool/react-spline")
        .then((module) => {
          setSplineReact(() => module.default);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to load Spline:", err);
          if (retryCount < 2) {
            setTimeout(() => {
              setRetryCount((prev) => prev + 1);
              loadSpline();
            }, 1000);
          } else {
            setError(true);
            setLoading(false);
          }
        });
    };

    loadSpline();
  }, [retryCount]);

  if (loading) {
    return (
      <div className="absolute inset-0 bg-black flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (error || !SplineReact) {
    return null; // Return null to show fallback
  }

  return (
    <div className="absolute inset-0">
      <SplineReact
        scene="https://my.spline.design/reactiveorbcopy-HDoiEa1F6nIXGa3vNXY3nL1Y/"
        style={{
          width: "100%",
          height: "100%",
          background: "transparent",
        }}
        onLoad={() => {
          console.log("Spline scene loaded successfully");
          setError(false);
        }}
        onError={(error: any) => {
          console.error("Spline scene error:", error);
          setError(true);
        }}
        onLoadStart={() => {
          console.log("Spline scene loading started");
        }}
      />
    </div>
  );
});

SplineComponent.displayName = "SplineComponent";

export default SplineComponent;
