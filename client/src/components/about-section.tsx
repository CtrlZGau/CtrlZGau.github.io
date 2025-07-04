import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Bot, Brain, Cpu } from "lucide-react";

export default function AboutSection() {
  const features = [
    {
      icon: Bot,
      title: "Robotics Engineering",
      description: "Specialized in autonomous navigation, computer vision, and robotic manipulation systems with 5+ years of experience."
    },
    {
      icon: Brain,
      title: "Machine Learning",
      description: "Developing AI algorithms for perception, decision-making, and adaptive control in robotic systems."
    },
    {
      icon: Cpu,
      title: "Embedded Systems",
      description: "Expert in real-time systems, sensor integration, and hardware-software co-design for robotic applications."
    }
  ];

  const stats = [
    { value: "15+", label: "Projects" },
    { value: "5+", label: "Years Exp." },
    { value: "3", label: "Patents" }
  ];

  return (
    <section id="about" className="py-20 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-mono font-bold mb-4">
            <span className="text-primary">&lt;</span>About<span className="text-primary">/&gt;</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Passionate about creating intelligent machines that can help solve real-world problems
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="bg-card border-primary/20 hover:border-primary/40 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <feature.icon className="text-primary text-2xl mr-3" size={28} />
                      <h3 className="text-xl font-semibold">{feature.title}</h3>
                    </div>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=600"
                alt="Robotics workspace with advanced equipment"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent rounded-2xl" />
            </div>
            
            <Card className="absolute -bottom-6 left-6 right-6 bg-card border-primary/20 shadow-xl">
              <CardContent className="p-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  {stats.map((stat, index) => (
                    <div key={index}>
                      <div className="text-2xl font-bold text-primary">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
