import { Layout } from "@/components/layout/Layout";
import { FlaskConical, Mountain, CloudRain, Scan, TreePine, Waves, MapPin, TrendingUp, CheckCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const applications = [
  {
    icon: Mountain,
    title: "Landslide Detection & Monitoring",
    description: "Colorized SAR images reveal subtle terrain deformations and slope instabilities that are difficult to detect in grayscale. Researchers can quickly identify potential landslide zones by analyzing color-coded elevation changes and soil moisture patterns.",
    benefits: ["Early warning system development", "Risk zone mapping", "Post-event damage assessment"],
  },
  {
    icon: CloudRain,
    title: "Flood-Prone Area Identification",
    description: "SAR's ability to penetrate clouds makes it invaluable for flood monitoring. Colorization enhances the distinction between water bodies, saturated soil, and dry land, enabling rapid flood extent mapping during disasters.",
    benefits: ["Real-time flood mapping", "Drainage pattern analysis", "Urban flood risk assessment"],
  },
  {
    icon: TreePine,
    title: "Vegetation & Forest Monitoring",
    description: "Track deforestation, forest health, and biomass changes through enhanced SAR imagery. Colorized outputs help distinguish between different vegetation types and detect illegal logging activities.",
    benefits: ["Deforestation tracking", "Carbon stock estimation", "Biodiversity monitoring"],
  },
  {
    icon: Waves,
    title: "Coastal Erosion Analysis",
    description: "Monitor shoreline changes and coastal erosion patterns with enhanced visual clarity. The colorization helps researchers track sediment movement and predict future erosion zones.",
    benefits: ["Shoreline change detection", "Sediment transport analysis", "Coastal infrastructure planning"],
  },
  {
    icon: Scan,
    title: "Soil Erosion Detection",
    description: "Identify areas of soil degradation and erosion through color-enhanced radar imagery. The system preserves texture information critical for accurate soil analysis while improving visual interpretability.",
    benefits: ["Agricultural land assessment", "Erosion hotspot identification", "Conservation planning"],
  },
  {
    icon: MapPin,
    title: "Terrain Change Monitoring",
    description: "Continuous monitoring of terrain changes including subsidence, uplift, and surface deformation. Colorized SAR enables researchers to detect millimeter-level changes over time.",
    benefits: ["Mining impact assessment", "Urban subsidence tracking", "Volcanic activity monitoring"],
  },
];

const sdgGoals = [
  {
    number: "13",
    title: "Climate Action",
    description: "Supporting climate monitoring and disaster preparedness through enhanced SAR interpretation.",
  },
  {
    number: "11",
    title: "Sustainable Cities",
    description: "Enabling better urban planning and infrastructure resilience through terrain analysis.",
  },
  {
    number: "15",
    title: "Life on Land",
    description: "Monitoring ecosystems, forests, and land degradation for environmental protection.",
  },
];

const Researchers = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        
        <div className="container mx-auto px-4 relative z-10">
          <Button variant="ghost" className="mb-8 text-muted-foreground hover:text-foreground" asChild>
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-primary/20 mb-8 animate-fade-up stagger-1">
              <FlaskConical className="h-4 w-4 text-primary" />
              <span className="text-sm text-primary">Research Applications</span>
            </div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-up stagger-2">
              SAR Colorization for{" "}
              <span className="text-gradient">
                Scientific Research
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mb-8 animate-fade-up stagger-3">
              Empowering researchers and scientists with enhanced visual interpretation of SAR imagery 
              for environmental monitoring, disaster management, and climate action initiatives.
            </p>

            <div className="flex flex-wrap gap-3 animate-fade-up stagger-4">
              {["All-Weather Monitoring", "Day & Night Imaging", "Texture Preservation"].map((tag) => (
                <span key={tag} className="px-4 py-2 rounded-full text-sm bg-primary/10 text-primary border border-primary/20">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Colorization Matters */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Why <span className="text-gradient">Colorization</span> Matters
            </h2>
            <p className="text-muted-foreground">
              Traditional grayscale SAR images require specialized training to interpret. Our CGAN-based 
              colorization transforms complex radar data into intuitive visual representations while 
              preserving the scientific integrity of the original imagery.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="glass rounded-2xl p-6 text-center card-hover">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-display font-semibold mb-2">Faster Analysis</h3>
              <p className="text-sm text-muted-foreground">
                Reduce interpretation time from hours to minutes with color-coded terrain features.
              </p>
            </div>

            <div className="glass rounded-2xl p-6 text-center card-hover">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Scan className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-display font-semibold mb-2">Preserved Accuracy</h3>
              <p className="text-sm text-muted-foreground">
                Maintains radar-specific features like speckle and texture for scientific validity.
              </p>
            </div>

            <div className="glass rounded-2xl p-6 text-center card-hover">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-display font-semibold mb-2">Validated Results</h3>
              <p className="text-sm text-muted-foreground">
                Evaluated using Q4, NRMSE, and SAM metrics for quantitative assessment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Applications Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Research <span className="text-gradient">Applications</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover how colorized SAR imagery accelerates research across environmental science, 
              disaster management, and earth observation domains.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {applications.map((app, index) => (
              <div key={index} className="glass rounded-2xl p-6 card-hover group">
                <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors w-fit mb-4">
                  <app.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold mb-3">{app.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{app.description}</p>
                <ul className="space-y-2">
                  {app.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SDG Alignment */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Supporting <span className="text-gradient">UN SDGs</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our research aligns with the United Nations Sustainable Development Goals, 
              contributing to global efforts in climate action and environmental protection.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {sdgGoals.map((sdg, index) => (
              <div key={index} className="glass rounded-2xl p-8 text-center card-hover">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center border border-primary/30">
                  <span className="font-display text-2xl font-bold text-primary">SDG {sdg.number}</span>
                </div>
                <h3 className="font-display text-xl font-semibold mb-3">{sdg.title}</h3>
                <p className="text-sm text-muted-foreground">{sdg.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="glass rounded-3xl p-12 text-center max-w-4xl mx-auto border-primary/20">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Interested in Collaboration?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              We welcome collaboration with research institutions and organizations working on 
              environmental monitoring and disaster management using SAR imagery.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" asChild>
                <Link to="/contact">Contact Our Team</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/articles">Read Our Research</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Researchers;
