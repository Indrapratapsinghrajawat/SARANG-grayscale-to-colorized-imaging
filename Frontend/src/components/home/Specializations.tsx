import { Radio, Brain, Globe, AlertTriangle } from "lucide-react";
import { useScrollReveal, useScaleIn } from "@/hooks/useGsapAnimations";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const specializations = [
  {
    icon: Radio,
    title: "SAR Image Processing",
    description: "Specialized techniques for handling radar imagery, including speckle noise preservation and texture-aware processing.",
  },
  {
    icon: Brain,
    title: "Deep Learning & GANs",
    description: "Conditional Generative Adversarial Networks optimized for SAR-specific colorization without domain translation artifacts.",
  },
  {
    icon: Globe,
    title: "Remote Sensing",
    description: "Earth observation applications leveraging all-weather, day-and-night SAR imaging capabilities.",
  },
  {
    icon: AlertTriangle,
    title: "Disaster Intelligence",
    description: "Rapid interpretation tools for emergency response, environmental monitoring, and defense surveillance.",
  },
];

export const Specializations = () => {
  const headerRef = useScrollReveal(".reveal-item", { stagger: 0.15, y: 40 });
  const cardsRef = useScaleIn(0.12);
  const dividerRef = useRef<HTMLDivElement>(null);

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
    <section className="py-24 relative" style={{ background: "hsl(222 80% 6% / 0.5)" }}>
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
            Our <span className="text-gradient">Specializations</span>
          </h2>
          <p className="reveal-item text-muted-foreground max-w-2xl mx-auto">
            This research integrates multiple domains to deliver a robust SAR colorization system
            that maintains scientific integrity while improving visual interpretability.
          </p>
        </div>

        <div ref={cardsRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {specializations.map((spec, index) => (
            <div
              key={index}
              className="glass rounded-2xl p-6 card-hover group text-center"
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <spec.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-display font-semibold mb-2">{spec.title}</h3>
              <p className="text-sm text-muted-foreground">{spec.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
