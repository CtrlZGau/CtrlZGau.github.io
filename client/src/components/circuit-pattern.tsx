import { motion } from "framer-motion";

export default function CircuitPattern() {
  return (
    <div className="absolute inset-0 opacity-10">
      <svg
        className="w-full h-full"
        viewBox="0 0 1000 1000"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Circuit board pattern */}
        <defs>
          <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <rect width="100" height="100" fill="transparent" />
            <g stroke="url(#circuitGradient)" strokeWidth="1" fill="none">
              <path d="M10,10 L90,10 L90,90 L10,90 Z" />
              <path d="M30,30 L70,30 L70,70 L30,70 Z" />
              <circle cx="20" cy="20" r="3" fill="hsl(48, 85%, 49%)" />
              <circle cx="80" cy="80" r="3" fill="hsl(48, 85%, 49%)" />
              <path d="M50,10 L50,90" />
              <path d="M10,50 L90,50" />
            </g>
          </pattern>
          
          <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(48, 85%, 49%)" stopOpacity="0.3" />
            <stop offset="50%" stopColor="hsl(48, 85%, 49%)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="hsl(48, 85%, 49%)" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        
        <rect width="100%" height="100%" fill="url(#circuit)" />
        
        {/* Animated circuit lines */}
        <motion.g
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "loop" }}
        >
          <path
            d="M0,500 Q250,400 500,500 T1000,500"
            stroke="hsl(48, 85%, 49%)"
            strokeWidth="2"
            fill="none"
            opacity="0.6"
          />
          <path
            d="M500,0 Q400,250 500,500 T500,1000"
            stroke="hsl(48, 85%, 49%)"
            strokeWidth="2"
            fill="none"
            opacity="0.6"
          />
        </motion.g>
      </svg>
    </div>
  );
}
