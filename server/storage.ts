import { contacts, blogPosts, users, type Contact, type InsertContact, type BlogPost, type InsertBlogPost, type User, type InsertUser } from "@shared/schema";

export interface IStorage {
  // User methods (existing)
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Contact methods
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
  
  // Blog methods
  getBlogPosts(): Promise<BlogPost[]>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contacts: Map<number, Contact>;
  private blogPosts: Map<number, BlogPost>;
  private userCurrentId: number;
  private contactCurrentId: number;
  private blogCurrentId: number;

  constructor() {
    this.users = new Map();
    this.contacts = new Map();
    this.blogPosts = new Map();
    this.userCurrentId = 1;
    this.contactCurrentId = 1;
    this.blogCurrentId = 1;
    
    // Initialize with some blog posts
    this.initializeBlogPosts();
  }

  private initializeBlogPosts() {
    const mockPosts = [
      {
        title: "The Future of Autonomous Navigation",
        excerpt: "Exploring advanced SLAM algorithms and their impact on next-generation autonomous systems...",
        content: "Full content of the blog post...",
        category: "Robotics",
        externalLink: "https://bear.blog/example-post-1",
      },
      {
        title: "Machine Learning in Robotics",
        excerpt: "How reinforcement learning is revolutionizing robot behavior and decision-making processes...",
        content: "Full content of the blog post...",
        category: "AI/ML",
        externalLink: "https://bear.blog/example-post-2",
      },
      {
        title: "Real-time Object Detection",
        excerpt: "Optimizing YOLO and other detection models for real-time robotics applications...",
        content: "Full content of the blog post...",
        category: "Computer Vision",
        externalLink: "https://bear.blog/example-post-3",
      }
    ];

    mockPosts.forEach(post => {
      const blogPost: BlogPost = {
        id: this.blogCurrentId++,
        ...post,
        publishedAt: new Date(),
      };
      this.blogPosts.set(blogPost.id, blogPost);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = this.contactCurrentId++;
    const contact: Contact = { 
      ...insertContact, 
      id, 
      createdAt: new Date() 
    };
    this.contacts.set(id, contact);
    return contact;
  }

  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values()).sort(
      (a, b) => b.publishedAt.getTime() - a.publishedAt.getTime()
    );
  }

  async createBlogPost(insertPost: InsertBlogPost): Promise<BlogPost> {
    const id = this.blogCurrentId++;
    const post: BlogPost = { 
      ...insertPost, 
      id, 
      publishedAt: new Date() 
    };
    this.blogPosts.set(id, post);
    return post;
  }
}

export const storage = new MemStorage();
