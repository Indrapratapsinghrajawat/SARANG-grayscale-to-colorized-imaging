import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Layers, GitBranch, Grid3X3, BarChart3, CheckCircle } from "lucide-react";
import { MetricsDialog } from "@/components/about/MetricsDialog";
import { ArchitectureDialog } from "@/components/about/ArchitectureDialog";

/* ================= ARCHITECTURE IMAGES ================= */
import unet from "@/assets/architecture/unet.jpeg";
import patchgan from "@/assets/architecture/patchgan.jpeg";
import ihs from "@/assets/architecture/ihs.jpeg";

/* Title → Image Mapping */
const architectureImages: Record<string, string> = {
  "U-Net Generator": unet,
  "PatchGAN Discriminator": patchgan,
  "IHS Fusion": ihs,
};

/* ================= FEATURES ================= */
const architectureFeatures = [
  {
    icon: Layers,
    title: "U-Net Generator",
    description:
      "Encoder-decoder architecture with skip connections for preserving fine spatial details and radar-specific features.",
  },
  {
    icon: Grid3X3,
    title: "PatchGAN Discriminator",
    description:
      "Evaluates image patches for local texture realism, ideal for SAR's granular speckle patterns.",
  },
  {
    icon: GitBranch,
    title: "IHS Fusion",
    description:
      "Intensity-Hue-Saturation fusion creates synthetic ground truth for training, maintaining SAR brightness.",
  },
  {
    icon: BarChart3,
    title: "Evaluation Metrics",
    description:
      "GAN, L1, SSIM and PSNR metrics verify realism, reconstruction accuracy and output quality.",
  },
];

/* ================= DIFFERENCES ================= */
const keyDifferences = [
  {
    title: "Information Preservation",
    ours: "Retains original SAR intensity, speckle patterns, and radar shadows",
    theirs: "Often loses radar-unique features during domain translation",
  },
  {
    title: "Scientific Validity",
    ours: "Colors are assigned based on actual radar backscatter properties",
    theirs: "Attempts to hallucinate what an optical sensor would capture",
  },
  {
    title: "Artifact Generation",
    ours: "Minimal artifacts due to same-domain processing",
    theirs: "Prone to domain-shift artifacts and unrealistic textures",
  },
  {
    title: "Use Case Focus",
    ours: "Enhanced interpretability for SAR analysts and researchers",
    theirs: "Aimed at replacing optical imagery (often unsuccessfully)",
  },
  {
    title: "Training Approach",
    ours: "IHS fusion preserves SAR brightness as intensity component",
    theirs: "Requires paired SAR-optical datasets with alignment issues",
  },
  {
    title: "Output Reliability",
    ours: "Consistent, predictable colorization based on learned mappings",
    theirs: "Variable results depending on atmospheric/lighting conditions in training data",
  },
];

/* ================= COMPONENT ================= */
const About = () => {
  const [metricsOpen, setMetricsOpen] = useState(false);
  const [archOpen, setArchOpen] = useState(false);
  const [selectedArch, setSelectedArch] = useState<string | null>(null);

  const handleFeatureClick = (title: string) => {
    if (title === "Evaluation Metrics") {
      setMetricsOpen(true);
      return;
    }
    setSelectedArch(title);
    setArchOpen(true);
  };

  return (
    <Layout>
      {/* HERO */}
      <section className="pt-24 pb-16 relative">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
              About <span className="text-gradient">SAR-RANG</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              A deep learning–based system that automatically converts grayscale SAR satellite images into realistic
              optical-like color images using GAN architectures and geospatial datasets.
            </p>
          </div>
        </div>
      </section>

      {/* BACKGROUND */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">

            <div className="glass rounded-2xl p-8 mb-12">
              <h2 className="font-display text-2xl font-bold mb-4">Project Background</h2>
              <p className="text-muted-foreground mb-4">
                Synthetic Aperture Radar (SAR) imagery is invaluable for Earth observation due to its all-weather,
                day-and-night imaging capabilities. However, SAR images are inherently grayscale, making visual
                interpretation challenging for non-experts and time-consuming for specialists.
              </p>
              <p className="text-muted-foreground">
                SAR-RANG applies deep learning to colorize SAR images in a scientifically meaningful way, enhancing
                interpretability while preserving radar information.
              </p>
            </div>

            {/* ARCHITECTURE */}
            <h2 className="font-display text-2xl font-bold mb-6 text-center">Model Architecture</h2>
            <div className="grid sm:grid-cols-2 gap-6 mb-12">
              {architectureFeatures.map((feature, index) => (
                <div
                  key={index}
                  onClick={() => handleFeatureClick(feature.title)}
                  className="glass rounded-2xl p-6 card-hover cursor-pointer ring-1 ring-primary/20 hover:ring-primary/60 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-primary/10">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>

                    <div>
                      <h3 className="font-display font-semibold mb-2">
                        {feature.title}
                        <span className="ml-2 text-xs text-primary">(Click to view)</span>
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* MODALS */}
            <MetricsDialog open={metricsOpen} onOpenChange={setMetricsOpen} />

            <ArchitectureDialog
              open={archOpen}
              onOpenChange={setArchOpen}
              title={selectedArch ?? ""}
              image={selectedArch ? architectureImages[selectedArch] : undefined}
            />

            {/* DIFFERENCES */}
            <div className="glass rounded-2xl p-8 border-primary/20 mt-12">
              <h2 className="font-display text-2xl font-bold mb-4">
                SAR Colorization vs SAR-to-Optical Translation
              </h2>
              <p className="text-muted-foreground mb-6">
                Our method enhances interpretability while preserving radar physics.
              </p>

              <div className="space-y-4">
                {keyDifferences.map((diff, index) => (
                  <div
                    key={index}
                    className="grid md:grid-cols-3 gap-4 p-4 rounded-xl bg-background/50 border border-border/50"
                  >
                    <div className="font-display font-semibold text-primary">
                      {diff.title}
                    </div>

                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-1 shrink-0" />
                      <span className="text-sm text-muted-foreground">
                        <span className="text-green-400 font-medium">Ours:</span> {diff.ours}
                      </span>
                    </div>

                    <div className="flex items-start gap-2">
                      <span className="h-4 w-4 text-amber-500 mt-1 shrink-0">✗</span>
                      <span className="text-sm text-muted-foreground">
                        <span className="text-amber-400 font-medium">SAR-to-Optical:</span> {diff.theirs}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;