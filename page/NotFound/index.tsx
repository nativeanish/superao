import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { Link } from "@heroui/react";
import SuperAO from "../../Image/SuperAO";

export default function NotFound() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const glowAnimation = useAnimation();

  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  useEffect(() => {
    glowAnimation.start({
      opacity: [0.5, 1, 0.5],
      scale: [1, 1.2, 1],
      transition: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    });
  }, [glowAnimation]);

  return (
    <div className="relative min-h-screen bg-neutral-800 overflow-hidden flex items-center justify-center px-4">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Interactive glow effect */}
      <motion.div
        className="absolute rounded-full mix-blend-screen filter blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(200,200,200,0.3) 0%, rgba(50,50,50,0) 70%)",
          width: "600px",
          height: "600px",
          left: mousePosition.x - 300,
          top: mousePosition.y - 300,
        }}
        animate={glowAnimation}
      />

      {/* Content */}
      <div className="relative text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-9xl font-extrabold text-neutral-200 tracking-widest mb-8">
            4<span className="text-neutral-400">0</span>4
          </h1>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <p className="text-2xl text-neutral-400 mb-8">
            Oops! The page you're looking for doesn't exist.
          </p>
          <Link
            href="/"
            className="relative inline-block group focus:outline-none focus:ring focus:ring-neutral-400"
          >
            <span className="absolute inset-0 transition-transform translate-x-1 translate-y-1 bg-neutral-600 group-hover:translate-y-0 group-hover:translate-x-0"></span>
            <span className="relative block px-8 py-3 text-lg font-semibold text-neutral-200 bg-neutral-800 border-2 border-current">
              Return Home
            </span>
          </Link>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-neutral-500 text-sm">
        SuperAO
        <SuperAO />
      </div>
    </div>
  );
}
