import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Bot, Brain, Eye, ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  link: string;
}

export default function BlogSection() {
  const { data: posts, isLoading, error } = useQuery<BlogPost[]>({
    queryKey: ['/api/blog/posts'],
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const mockPosts = [
    {
      id: "1",
      title: "The Future of Autonomous Navigation",
      excerpt: "Exploring advanced SLAM algorithms and their impact on next-generation autonomous systems...",
      date: "Dec 15, 2023",
      category: "Robotics",
      link: "#"
    },
    {
      id: "2",
      title: "Machine Learning in Robotics",
      excerpt: "How reinforcement learning is revolutionizing robot behavior and decision-making processes...",
      date: "Dec 10, 2023",
      category: "AI/ML",
      link: "#"
    },
    {
      id: "3",
      title: "Real-time Object Detection",
      excerpt: "Optimizing YOLO and other detection models for real-time robotics applications...",
      date: "Dec 5, 2023",
      category: "Computer Vision",
      link: "#"
    }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Robotics":
        return Bot;
      case "AI/ML":
        return Brain;
      case "Computer Vision":
        return Eye;
      default:
        return Bot;
    }
  };

  const displayPosts = error ? mockPosts : (posts || []);

  return (
    <section id="blog" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-mono font-bold mb-4">
            <span className="text-primary">&lt;</span>Blog<span className="text-primary">/&gt;</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Latest insights on robotics, AI, and emerging technologies
          </p>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="bg-card border-primary/20">
                <CardContent className="p-6">
                  <div className="animate-pulse">
                    <div className="h-4 bg-muted rounded w-1/3 mb-3"></div>
                    <div className="h-6 bg-muted rounded w-3/4 mb-3"></div>
                    <div className="h-4 bg-muted rounded w-full mb-2"></div>
                    <div className="h-4 bg-muted rounded w-2/3 mb-4"></div>
                    <div className="h-4 bg-muted rounded w-1/4"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayPosts.map((post, index) => {
              const IconComponent = getCategoryIcon(post.category);
              return (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-card border-primary/20 hover:border-primary/40 transition-all duration-300 transform hover:scale-105 h-full">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="flex items-center mb-3">
                        <IconComponent className="text-primary mr-2" size={20} />
                        <Badge variant="secondary" className="bg-primary/20 text-primary">
                          {post.category}
                        </Badge>
                      </div>
                      
                      <h3 className="text-xl font-semibold mb-3 hover:text-primary transition-colors duration-300">
                        {post.title}
                      </h3>
                      
                      <p className="text-muted-foreground mb-4 flex-grow">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between mt-auto">
                        <span className="text-sm text-muted-foreground">{post.date}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-primary hover:text-primary hover:bg-primary/10"
                          asChild
                        >
                          <a href={post.link} target="_blank" rel="noopener noreferrer">
                            Read More <ArrowRight size={16} className="ml-1" />
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.article>
              );
            })}
          </div>
        )}
        
        <div className="text-center mt-12">
          <Button
            variant="outline"
            className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            asChild
          >
            <a href="#" target="_blank" rel="noopener noreferrer">
              <ExternalLink size={16} className="mr-2" />
              View All Posts on Bear Blog
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
