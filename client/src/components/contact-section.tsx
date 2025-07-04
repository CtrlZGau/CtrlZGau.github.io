import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Clock, Github, Linkedin, Twitter, Youtube } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters")
});

type ContactForm = z.infer<typeof contactSchema>;

export default function ContactSection() {
  const { toast } = useToast();
  
  const form = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: ""
    }
  });

  const mutation = useMutation({
    mutationFn: async (data: ContactForm) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "I'll get back to you within 24 hours.",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Failed to send message",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    }
  });

  const onSubmit = (data: ContactForm) => {
    mutation.mutate(data);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "alex@robotics.dev",
      href: "mailto:alex@robotics.dev"
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+1 (555) 123-4567",
      href: "tel:+15551234567"
    },
    {
      icon: MapPin,
      title: "Location",
      value: "San Francisco, CA",
      href: "#"
    },
    {
      icon: Clock,
      title: "Response Time",
      value: "Within 24 hours",
      href: "#"
    }
  ];

  const socialLinks = [
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Youtube, href: "#", label: "YouTube" }
  ];

  return (
    <section id="contact" className="py-20 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-mono font-bold mb-4">
            <span className="text-primary">&lt;</span>Contact<span className="text-primary">/&gt;</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Let's collaborate on the next breakthrough in robotics and AI
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-card border-primary/20">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-6 text-primary">Get In Touch</h3>
                
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      placeholder="Your Name"
                      {...form.register("name")}
                      className="bg-background border-primary/30 focus:border-primary"
                    />
                    {form.formState.errors.name && (
                      <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      {...form.register("email")}
                      className="bg-background border-primary/30 focus:border-primary"
                    />
                    {form.formState.errors.email && (
                      <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      placeholder="Project Discussion"
                      {...form.register("subject")}
                      className="bg-background border-primary/30 focus:border-primary"
                    />
                    {form.formState.errors.subject && (
                      <p className="text-sm text-destructive">{form.formState.errors.subject.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      rows={5}
                      placeholder="Tell me about your project..."
                      {...form.register("message")}
                      className="bg-background border-primary/30 focus:border-primary resize-none"
                    />
                    {form.formState.errors.message && (
                      <p className="text-sm text-destructive">{form.formState.errors.message.message}</p>
                    )}
                  </div>
                  
                  <Button
                    type="submit"
                    disabled={mutation.isPending}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 animate-glow"
                  >
                    {mutation.isPending ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <Card className="bg-card border-primary/20">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-6 text-primary">Contact Information</h3>
                
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-center">
                      <info.icon className="text-primary mr-4" size={20} />
                      <div>
                        <div className="font-medium">{info.title}</div>
                        <div className="text-muted-foreground">{info.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-card border-primary/20">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-6 text-primary">Connect With Me</h3>
                
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      size="icon"
                      className="bg-primary/20 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 transform hover:scale-110"
                      asChild
                    >
                      <a href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}>
                        <social.icon size={20} />
                      </a>
                    </Button>
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
