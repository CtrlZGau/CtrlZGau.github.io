import { useSmoothScroll } from "@/hooks/use-smooth-scroll";

export default function Footer() {
  const scrollToSection = useSmoothScroll();

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Blog", href: "#blog" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <footer className="bg-background border-t border-primary/20 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="font-mono font-bold text-primary text-2xl mb-4">
            &lt;RoboTech/&gt;
          </div>
          <p className="text-muted-foreground mb-6">
            Building the future with intelligent robotics and AI
          </p>
          <div className="flex justify-center space-x-6 mb-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                {item.name}
              </button>
            ))}
          </div>
          <div className="border-t border-primary/20 pt-8">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} RoboTech Portfolio. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
