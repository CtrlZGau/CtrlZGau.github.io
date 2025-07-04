import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Particles from "@/components/particles";
import Typewriter from "@/components/typewriter";
import CircuitPattern from "@/components/circuit-pattern";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";

export default function HeroSection() {
  const scrollToSection = useSmoothScroll();

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <CircuitPattern />
      <Particles />
      
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-mono font-bold mb-4">
            <span className="text-primary animate-flicker">~/</span>
            <Typewriter text="Alex_Robotics" />
            <span className="text-primary typewriter-cursor">|</span>
          </h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-xl md:text-2xl text-muted-foreground mb-6"
          >
            Robotics Engineer & AI Developer
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Building the future with autonomous systems, machine learning, and cutting-edge robotics technology.
          </motion.p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2 }}
          className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
        >
          <Button
            onClick={() => scrollToSection("#projects")}
            className="px-8 py-3 bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 animate-glow"
          >
            View My Work
          </Button>
          
          <Button
            onClick={() => scrollToSection("#contact")}
            variant="outline"
            className="px-8 py-3 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 transform hover:scale-105"
          >
            Get In Touch
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
