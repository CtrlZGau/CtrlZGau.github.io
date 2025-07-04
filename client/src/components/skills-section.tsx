import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { Cpu, Brain, Eye, Route, Network } from "lucide-react";
import { useEffect, useState } from "react";

export default function SkillsSection() {
  const [skillsRef, isVisible] = useIntersectionObserver({ threshold: 0.3 });
  const [animatedSkills, setAnimatedSkills] = useState(false);

  const skills = [
    { name: "Python & C++", percentage: 95 },
    { name: "ROS & ROS2", percentage: 90 },
    { name: "Machine Learning", percentage: 88 },
    { name: "Computer Vision", percentage: 85 },
    { name: "Embedded Systems", percentage: 82 },
    { name: "SLAM & Navigation", percentage: 87 }
  ];

  const expertise = [
    {
      icon: Cpu,
      title: "Hardware Integration",
      description: "Sensor fusion, actuator control, and real-time system design"
    },
    {
      icon: Brain,
      title: "AI & Machine Learning",
      description: "Deep learning, reinforcement learning, and neural network optimization"
    },
    {
      icon: Eye,
      title: "Computer Vision",
      description: "Object detection, tracking, and 3D reconstruction for robotics"
    },
    {
      icon: Route,
      title: "Path Planning",
      description: "Motion planning, trajectory optimization, and autonomous navigation"
    },
    {
      icon: Network,
      title: "Distributed Systems",
      description: "Multi-robot coordination, swarm intelligence, and distributed control"
    }
  ];

  useEffect(() => {
    if (isVisible && !animatedSkills) {
      setAnimatedSkills(true);
    }
  }, [isVisible, animatedSkills]);

  return (
    <section id="skills" className="py-20 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-mono font-bold mb-4">
            <span className="text-primary">&lt;</span>Skills<span className="text-primary">/&gt;</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Technical expertise across robotics, AI, and embedded systems
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12" ref={skillsRef}>
          {/* Technical Skills */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold text-primary mb-6">Technical Skills</h3>
            
            <div className="space-y-6">
              {skills.map((skill, index) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-primary font-semibold">{skill.percentage}%</span>
                  </div>
                  <Progress
                    value={animatedSkills ? skill.percentage : 0}
                    className="h-2 bg-muted"
                    indicatorClassName="bg-primary transition-all duration-1000 ease-out"
                    style={{ transitionDelay: `${index * 200}ms` }}
                  />
                </div>
              ))}
            </div>
          </motion.div>
          
          {/* Expertise Areas */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold text-primary mb-6">Expertise Areas</h3>
            
            <div className="space-y-4">
              {expertise.map((area, index) => (
                <motion.div
                  key={area.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-card border-primary/20 hover:border-primary/40 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-3">
                        <area.icon className="text-primary mr-3" size={24} />
                        <h4 className="font-semibold">{area.title}</h4>
                      </div>
                      <p className="text-muted-foreground text-sm">{area.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
