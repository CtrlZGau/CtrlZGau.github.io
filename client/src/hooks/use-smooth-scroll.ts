import { useCallback } from "react";

export function useSmoothScroll() {
  const scrollToSection = useCallback((href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const navHeight = 64; // Height of the navigation bar
      const elementTop = element.getBoundingClientRect().top + window.pageYOffset;
      
      window.scrollTo({
        top: elementTop - navHeight,
        behavior: 'smooth'
      });
    }
  }, []);

  return scrollToSection;
}
