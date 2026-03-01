import { Layout } from "@/components/layout/Layout";
import { Shield, Eye, Scan, Radio, Target, Map, Radar, Moon, Cloud, CheckCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const applications = [
  {
    icon: Eye,
    title: "24/7 Terrain Surveillance",
    description: "Maintain continuous situational awareness regardless of time or weather conditions. Colorized SAR imagery provides enhanced visual clarity for monitoring strategic locations and detecting changes in terrain.",
    benefits: ["Round-the-clock monitoring", "Weather-independent imaging", "Large area coverage"],
  },
  {
    icon: Target,
    title: "Bunker & Structure Detection",
    description: "Identify concealed structures, bunkers, and underground facilities through enhanced radar interpretation. The colorization reveals subtle surface anomalies that indicate hidden infrastructure.",
    benefits: ["Concealed structure identification", "Construction activity detection", "Infrastructure mapping"],
  },
  {
    icon: Map,
    title: "Movement & Activity Tracking",
    description: "Detect and track movement patterns, vehicle activity, and troop deployments using change detection in colorized SAR time-series data. Enhanced visualization makes anomalies more apparent.",
    benefits: ["Vehicle movement tracking", "Activity pattern analysis", "Change detection alerts"],
  },
  {
    icon: Radar,
    title: "Maritime Surveillance",
    description: "Monitor naval activities, ship movements, and port operations in any weather condition. SAR's ability to penetrate clouds and fog makes it ideal for maritime domain awareness.",
    benefits: ["Ship detection & tracking", "Port activity monitoring", "Maritime border security"],
  },
  {
    icon: Radio,
    title: "Communications Infrastructure Mapping",
    description: "Identify and map communication towers, radar installations, and electronic infrastructure. Colorized SAR helps distinguish different types of structures and installations.",
    benefits: ["Infrastructure cataloging", "Signal source identification", "Network mapping"],
  },
  {
    icon: Shield,
    title: "Border & Perimeter Security",
    description: "Enhanced border surveillance capabilities with all-weather, day-and-night monitoring. Detect unauthorized crossings, tunnel construction, and fence breaches through change analysis.",
    benefits: ["Border intrusion detection", "Tunnel activity identification", "Perimeter breach alerts"],
  },
];

const capabilities = [
  {
    icon: Moon,
    title: "Night Operations",
    description: "SAR imaging is independent of sunlight, enabling full operational capability during nighttime missions.",
  },
  {
    icon: Cloud,
    title: "All-Weather Imaging",
    description: "Radar waves penetrate clouds, fog, and rain, ensuring continuous surveillance regardless of weather.",
  },
  {
    icon: Scan,
    title: "Penetrating Vision",
    description: "SAR can detect features through camouflage and light vegetation cover that optical sensors cannot see.",
  },
];

const Defense = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" />
        
        <div className="container mx-auto px-4 relative z-10">
          <Button variant="ghost" className="mb-8 text-muted-foreground hover:text-foreground" asChild>
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-accent/20 mb-8 animate-fade-up stagger-1">
              <Shield className="h-4 w-4 text-accent" />
              <span className="text-sm text-accent">Defense & Surveillance</span>
            </div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-up stagger-2">
              SAR Colorization for{" "}
              <span className="text-gradient-gold">
                Defense Intelligence
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mb-8 animate-fade-up stagger-3">
              Enhancing situational awareness and tactical intelligence through advanced SAR image 
              colorization. Enable 24×7 monitoring capabilities in any weather condition.
            </p>

            <div className="flex flex-wrap gap-3 animate-fade-up stagger-4">
              {["Tactical Intelligence", "Night Operations", "All-Weather Capability"].map((tag) => (
                <span key={tag} className="px-4 py-2 rounded-full text-sm bg-accent/10 text-accent border border-accent/20">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Key Capabilities */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Strategic <span className="text-gradient-gold">Capabilities</span>
            </h2>
            <p className="text-muted-foreground">
              SAR technology provides unique advantages for defense and surveillance applications 
              that optical imaging systems cannot match.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {capabilities.map((cap, index) => (
              <div key={index} className="glass rounded-2xl p-6 text-center card-hover">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                  <cap.icon className="h-8 w-8 text-accent" />
                </div>
                <h3 className="font-display font-semibold mb-2">{cap.title}</h3>
                <p className="text-sm text-muted-foreground">{cap.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Colorization for Defense */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
                  Why <span className="text-gradient-gold">Colorization</span> Enhances Intelligence
                </h2>
                <p className="text-muted-foreground mb-6">
                  Traditional grayscale SAR images require highly trained analysts to interpret. 
                  Our CGAN-based colorization transforms complex radar data into intuitive visual 
                  representations, enabling faster decision-making and improved threat detection.
                </p>
                <ul className="space-y-4">
                  {[
                    "Reduce analyst training time and interpretation errors",
                    "Enable rapid threat assessment in time-critical situations",
                    "Improve pattern recognition for anomaly detection",
                    "Enhance collaboration with non-specialist personnel",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="glass rounded-2xl p-8 border-accent/20">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                      <Eye className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Enhanced Visual Clarity</h4>
                      <p className="text-sm text-muted-foreground">Color-coded terrain features for quick identification</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                      <Target className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Improved Target Detection</h4>
                      <p className="text-sm text-muted-foreground">Anomalies stand out clearly against colorized backgrounds</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                      <Radar className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Preserved Radar Information</h4>
                      <p className="text-sm text-muted-foreground">Original SAR data integrity maintained for analysis</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Applications Grid */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Defense <span className="text-gradient-gold">Applications</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive surveillance and intelligence capabilities enabled by enhanced SAR imagery 
              for military and security operations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {applications.map((app, index) => (
              <div key={index} className="glass rounded-2xl p-6 card-hover group">
                <div className="p-3 rounded-xl bg-accent/10 group-hover:bg-accent/20 transition-colors w-fit mb-4">
                  <app.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-display text-lg font-semibold mb-3">{app.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{app.description}</p>
                <ul className="space-y-2">
                  {app.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-accent flex-shrink-0" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Operational Advantage */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="glass rounded-3xl p-12 max-w-5xl mx-auto border-accent/20">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-display font-bold text-accent mb-2">24/7</div>
                <p className="text-sm text-muted-foreground">Continuous Monitoring</p>
              </div>
              <div>
                <div className="text-4xl font-display font-bold text-accent mb-2">100%</div>
                <p className="text-sm text-muted-foreground">Weather Independence</p>
              </div>
              <div>
                <div className="text-4xl font-display font-bold text-accent mb-2">10x</div>
                <p className="text-sm text-muted-foreground">Faster Interpretation</p>
              </div>
              <div>
                <div className="text-4xl font-display font-bold text-accent mb-2">∞</div>
                <p className="text-sm text-muted-foreground">Operational Range</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="glass rounded-3xl p-12 text-center max-w-4xl mx-auto border-accent/20">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Learn More About Our Research
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              This is an academic research project demonstrating the potential of deep learning 
              for SAR image colorization in defense applications.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="gold" asChild>
                <Link to="/contact">Contact Our Team</Link>
              </Button>
              <Button variant="outline" className="border-accent/50 text-accent hover:bg-accent/10" asChild>
                <Link to="/about">Technical Details</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Defense;
