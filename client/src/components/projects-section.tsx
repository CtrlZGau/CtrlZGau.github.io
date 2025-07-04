import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, Bot, Cog, Table, Plane, User, Factory } from "lucide-react";

export default function ProjectsSection() {
  const projects = [
    {
      icon: Bot,
      title: "Autonomous Navigation Robot",
      description: "Self-navigating robot with SLAM capabilities, obstacle avoidance, and path planning using ROS and deep learning.",
      image: "https://images.unsplash.com/photo-1546776310-eef45dd6d63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
      technologies: ["Python", "ROS", "OpenCV"],
      demoLink: "#",
      codeLink: "#"
    },
    {
      icon: Cog,
      title: "Robotic Arm Manipulation",
      description: "Precision robotic arm with computer vision for object detection, grasping, and manipulation tasks.",
      image: "https://images.unsplash.com/photo-1563191911-e65f8655ebf9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
      technologies: ["C++", "MoveIt", "TensorFlow"],
      demoLink: "#",
      codeLink: "#"
    },
    {
      icon: Table,
      title: "Swarm Robotics System",
      description: "Coordinated multi-robot system with distributed decision-making and emergent behavior patterns.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
      technologies: ["Python", "Gazebo", "Multi-Agent"],
      demoLink: "#",
      codeLink: "#"
    },
    {
      icon: Plane,
      title: "Autonomous Drone Fleet",
      description: "Intelligent UAV system for surveillance, mapping, and coordinated flight operations with real-time data processing.",
      image: "https://images.unsplash.com/photo-1508614999368-9260051292e5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
      technologies: ["ArduPilot", "Python", "Computer Vision"],
      demoLink: "#",
      codeLink: "#"
    },
    {
      icon: User,
      title: "Humanoid Assistant Robot",
      description: "Social robot with natural language processing, emotion recognition, and interactive capabilities.",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
      technologies: ["NLP", "PyTorch", "Speech Recognition"],
      demoLink: "#",
      codeLink: "#"
    },
    {
      icon: Factory,
      title: "Industrial Automation",
      description: "Smart manufacturing system with predictive maintenance, quality control, and process optimization.",
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
      technologies: ["IoT", "Machine Learning", "PLC"],
      demoLink: "#",
      codeLink: "#"
    }
  ];

  return (
    <section id="projects" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-mono font-bold mb-4">
            <span className="text-primary">&lt;</span>Projects<span className="text-primary">/&gt;</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Showcasing cutting-edge robotics projects and innovative AI solutions
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="project-card bg-card border-primary/20 hover:border-primary/40 overflow-hidden">
                <div className="relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <div className="bg-primary/20 backdrop-blur-sm rounded-full p-2">
                      <project.icon className="text-primary" size={20} />
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="bg-primary/20 text-primary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-primary hover:text-primary hover:bg-primary/10"
                      asChild
                    >
                      <a href={project.demoLink} target="_blank" rel="noopener noreferrer">
                        <ExternalLink size={16} className="mr-2" />
                        Live Demo
                      </a>
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-primary hover:text-primary hover:bg-primary/10"
                      asChild
                    >
                      <a href={project.codeLink} target="_blank" rel="noopener noreferrer">
                        <Github size={16} className="mr-2" />
                        Code
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
