import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Github, Linkedin, Mail } from "lucide-react";
import logo from "@/assets/logo.png";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!footerRef.current) return;

    const ctx = gsap.context(() => {
      const items = footerRef.current!.querySelectorAll(".footer-reveal");
      gsap.set(items, { opacity: 0, y: 30 });
      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="border-t border-border/50 bg-card/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2 footer-reveal">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img src={logo} alt="SAR-RANG Logo" className="h-8 w-8 object-contain" />
              <span className="font-display font-bold text-lg tracking-wide">
                <span className="text-foreground">SAR</span>
                <span className="text-muted-foreground">-</span>
                <span className="bg-gradient-to-r from-primary via-accent to-gold bg-clip-text text-transparent">RANG</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-md">
              A deep learning system for SAR image colorization using Conditional GANs, designed to enhance radar imagery interpretability while preserving scientific validity.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-reveal">
            <h4 className="font-display font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {["Home", "About Us", "Blogs", "FAQs"].map((link) => (
                <li key={link}>
                  <Link
                    to={link === "Home" ? "/" : `/${link.toLowerCase().replace(" ", "-")}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-reveal">
            <h4 className="font-display font-semibold mb-4">Connect</h4>
            <div className="flex gap-3">
              <a href="https://github.com" className="p-2 rounded-lg bg-secondary hover:bg-primary/10 hover:text-primary transition-all">
                <Github className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com" className="p-2 rounded-lg bg-secondary hover:bg-primary/10 hover:text-primary transition-all">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="mailto:nebulacodexx04@gmail.com" className="p-2 rounded-lg bg-secondary hover:bg-primary/10 hover:text-primary transition-all">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-reveal border-t border-border/50 mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">© 2026 SAR-RANG. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
