import { useState, useEffect } from "react";

interface TypewriterProps {
  text: string;
  speed?: number;
  delay?: number;
}

export default function Typewriter({ text, speed = 150, delay = 1000 }: TypewriterProps) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const startTyping = () => {
      if (currentIndex < text.length) {
        const timeout = setTimeout(() => {
          setDisplayText(prev => prev + text[currentIndex]);
          setCurrentIndex(prev => prev + 1);
        }, speed);
        return () => clearTimeout(timeout);
      }
    };

    const initialDelay = setTimeout(startTyping, delay);
    return () => clearTimeout(initialDelay);
  }, [currentIndex, text, speed, delay]);

  return <span>{displayText}</span>;
}
