import { FlaskConical, Shield, Mountain, CloudRain, Scan, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useScrollReveal, useScaleIn } from "@/hooks/useGsapAnimations";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const researcherBenefits = [
  { icon: Mountain, text: "Landslide & soil erosion detection" },
  { icon: CloudRain, text: "Flood-prone area identification" },
  { icon: Scan, text: "Terrain change monitoring" },
];

const defenseBenefits = [
  { icon: Eye, text: "24/7 terrain surveillance" },
  { icon: Scan, text: "Bunker & structure detection" },
  { icon: Shield, text: "All-weather monitoring capability" },
];

export const AudienceCards = () => {
  const headerRef = useScrollReveal(".reveal-item", { stagger: 0.15, y: 40 });
  const cardsRef = useScaleIn(0.2);
  const dividerRef = useRef<HTMLDivElement>(null);

  // Divider grow animation
  useEffect(() => {
    if (!dividerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(dividerRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: dividerRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="py-24 relative">
      {/* Section divider */}
      <div
        ref={dividerRef}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[1px]"
        style={{
          background: "linear-gradient(90deg, transparent, hsl(180 100% 50% / 0.5), transparent)",
          transformOrigin: "center",
        }}
      />
      
      <div className="container mx-auto px-4">
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="reveal-item font-display text-3xl md:text-4xl font-bold mb-4">
            Who Benefits from <span className="text-gradient">Colorized SAR</span>?
          </h2>
          <p className="reveal-item text-muted-foreground max-w-2xl mx-auto">
            Our deep learning system serves two critical domains where visual interpretation
            of radar data can save lives and enhance security.
          </p>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Researchers Card */}
          <div className="glass rounded-2xl p-8 card-hover group">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <FlaskConical className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold">For Researchers</h3>
                <p className="text-sm text-muted-foreground">Scientists & Environmental Analysts</p>
              </div>
            </div>

            <p className="text-muted-foreground mb-6">
              Colorized SAR images enable researchers to quickly interpret terrain changes,
              slope instability, and land deformation. The enhanced visual clarity accelerates
              analysis in disaster management and environmental monitoring.
            </p>

            <ul className="space-y-3 mb-8">
              {researcherBenefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-3 text-sm">
                  <benefit.icon className="h-5 w-5 text-primary" />
                  <span>{benefit.text}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2 mb-6">
              {["SDG 13: Climate Action", "SDG 11: Sustainable Cities", "Disaster Resilience"].map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-full text-xs bg-primary/10 text-primary border border-primary/20">
                  {tag}
                </span>
              ))}
            </div>

            <Button variant="outline" className="w-full" asChild>
              <Link to="/researchers">Learn More</Link>
            </Button>
          </div>

          {/* Defense Card */}
          <div className="glass rounded-2xl p-8 card-hover group">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-xl bg-accent/10 group-hover:bg-accent/20 transition-colors">
                <Shield className="h-8 w-8 text-accent" />
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold">For Defense & Surveillance</h3>
                <p className="text-sm text-muted-foreground">Military & Intelligence Operations</p>
              </div>
            </div>

            <p className="text-muted-foreground mb-6">
              Colorized SAR improves visual clarity and situational awareness for defense applications.
              Enable 24×7 monitoring capabilities even through clouds, darkness, or adverse weather conditions.
            </p>

            <ul className="space-y-3 mb-8">
              {defenseBenefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-3 text-sm">
                  <benefit.icon className="h-5 w-5 text-accent" />
                  <span>{benefit.text}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2 mb-6">
              {["All-Weather Imaging", "Night Operations", "Tactical Intelligence"].map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-full text-xs bg-accent/10 text-accent border border-accent/20">
                  {tag}
                </span>
              ))}
            </div>

            <Button variant="outline" className="w-full border-accent/50 text-accent hover:bg-accent/10" asChild>
              <Link to="/defense">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
