import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      res.json({ success: true, contact });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Invalid form data", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Failed to send message" 
        });
      }
    }
  });

  // Get blog posts
  app.get("/api/blog/posts", async (req, res) => {
    try {
      const posts = await storage.getBlogPosts();
      
      // Transform posts to match frontend interface
      const transformedPosts = posts.map(post => ({
        id: post.id.toString(),
        title: post.title,
        excerpt: post.excerpt,
        date: post.publishedAt.toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric' 
        }),
        category: post.category,
        link: post.externalLink || "#"
      }));

      res.json(transformedPosts);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch blog posts" 
      });
    }
  });

  // Get contacts (admin endpoint)
  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch contacts" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
