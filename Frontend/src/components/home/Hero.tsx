import { useEffect, useRef, lazy, Suspense } from "react";
import { ArrowRight, Radar, Cpu, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useMagnetic } from "@/hooks/useGsapAnimations";

const SolarSystem = lazy(() =>
  import("@/components/three/SolarSystem").then((m) => ({ default: m.SolarSystem }))
);

export const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const flowRef = useRef<HTMLDivElement>(null);
  const magneticBtn = useMagnetic();

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 2.5 });

      if (titleRef.current) {
        const spans = titleRef.current.querySelectorAll(".hero-word");
        tl.fromTo(
          spans,
          { y: 80, opacity: 0, rotateX: 40 },
          { y: 0, opacity: 1, rotateX: 0, duration: 1, stagger: 0.08, ease: "power3.out" }
        );
      }

      tl.fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.5"
      );

      if (ctaRef.current) {
        tl.fromTo(
          ctaRef.current.children,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: "power3.out" },
          "-=0.4"
        );
      }

      if (flowRef.current) {
        const cards = flowRef.current.querySelectorAll(".flow-card");
        const arrows = flowRef.current.querySelectorAll(".flow-arrow");
        tl.fromTo(cards,
          { scale: 0.8, opacity: 0, y: 30 },
          { scale: 1, opacity: 1, y: 0, stagger: 0.15, duration: 0.6, ease: "back.out(1.7)" },
          "-=0.3"
        );
        tl.fromTo(arrows,
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, stagger: 0.1, duration: 0.3, ease: "power2.out" },
          "-=0.4"
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Three.js Solar System Background */}
      <Suspense fallback={null}>
        <SolarSystem />
      </Suspense>

      {/* Fallback gradient */}
      <div className="absolute inset-0 bg-gradient-hero z-[0]" style={{ opacity: 0.4 }} />

      {/* Noise grain */}
      <div className="absolute inset-0 noise-grain z-[1]" />

      {/* Vignette */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 40%, hsl(222 98% 5%) 100%)",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <br />
          <br />
          <h1
            ref={titleRef}
            className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
            style={{ perspective: "600px" }}
          >
            <span className="hero-word inline-block" style={{ opacity: 0 }}>SAR</span>{" "}
            <span className="hero-word inline-block" style={{ opacity: 0 }}>Image</span>{" "}
            <span className="hero-word inline-block relative" style={{ opacity: 0 }}>
              <span className="text-gradient">Colorization</span>
            </span>
            <br />
            <span className="hero-word inline-block" style={{ opacity: 0 }}>Using</span>{" "}
            <span className="hero-word inline-block" style={{ opacity: 0 }}>Deep</span>{" "}
            <span className="hero-word inline-block" style={{ opacity: 0 }}>Learning</span>
          </h1>

          <p
            ref={subtitleRef}
            className="text-lg md:text-xl max-w-2xl mx-auto mb-8"
            style={{ opacity: 0, color: "rgba(255,255,255,0.7)" }}
          >
            Transform grayscale Synthetic Aperture Radar images into meaningful colorized visuals using
            Pix2Pix-based Conditional GANs improving interpretability for disaster monitoring,
            environmental analysis, and defense applications.
          </p>

          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <div ref={magneticBtn}>
              <Button variant="hero" size="xl" asChild>
                <a href="/sar-rang/demo" target="_blank" rel="noopener noreferrer">
                  Try SAR-RANG
                  <ArrowRight className="h-5 w-5" />
                </a>
              </Button>
            </div>
            <Button variant="outline" size="xl" asChild style={{ opacity: 0 }}>
              <Link to="/contact">Get in Touch</Link>
            </Button>
          </div>

          <div ref={flowRef}>
            <p className="text-sm text-muted-foreground mb-6">How It Works</p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
              <div className="flow-card glass rounded-2xl p-6 w-48 card-hover" style={{ opacity: 0 }}>
                <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-secondary flex items-center justify-center">
                  <Radar className="h-8 w-8 text-muted-foreground" />
                </div>
                <p className="font-medium text-sm">Grayscale SAR</p>
                <p className="text-xs text-muted-foreground">Input Image</p>
              </div>

              <ArrowRight className="flow-arrow h-6 w-6 text-primary hidden md:block" style={{ opacity: 0 }} />
              <div className="flow-arrow h-6 w-px bg-primary md:hidden" style={{ opacity: 0 }} />

              <div className="flow-card glass rounded-2xl p-6 w-48 card-hover hover:border-primary/30 hover:glow-cyan transition-all duration-500" style={{ opacity: 0 }}>
                <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Cpu className="h-8 w-8 text-primary" />
                </div>
                <p className="font-medium text-sm">CGAN Model</p>
                <p className="text-xs text-muted-foreground">Pix2Pix Processing</p>
              </div>

              <ArrowRight className="flow-arrow h-6 w-6 text-primary hidden md:block" style={{ opacity: 0 }} />
              <div className="flow-arrow h-6 w-px bg-primary md:hidden" style={{ opacity: 0 }} />

              <div className="flow-card glass rounded-2xl p-6 w-48 card-hover" style={{ opacity: 0 }}>
                <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <Image className="h-8 w-8 text-accent" />
                </div>
                <p className="font-medium text-sm">Colorized SAR</p>
                <p className="text-xs text-muted-foreground">Enhanced Output</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
