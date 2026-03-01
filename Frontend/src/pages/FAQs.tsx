import { Layout } from "@/components/layout/Layout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
const faqs = [
  {
    question: "What is SAR image colorization?",
    answer:
      "SAR image colorization is the process of adding meaningful color information to grayscale Synthetic Aperture Radar images. Unlike arbitrary colorization, scientific SAR colorization uses deep learning to assign colors based on radar backscatter properties, terrain characteristics, and contextual understanding from training data.",
  },
  {
    question: "How is this different from SAR-to-optical translation?",
    answer:
      "SAR colorization adds color while preserving radar-specific features like speckle, shadows, and texture. SAR-to-optical translation attempts to simulate what an optical sensor would capture, often losing radar-unique information and introducing domain-shift artifacts. Our approach maintains scientific validity while improving visual interpretability.",
  },
  {
    question: "Is scientific information preserved during colorization?",
    answer:
      "Yes. Our SAR-RANG model is specifically designed to preserve radar-specific information. We use IHS fusion for ground truth generation (keeping original SAR intensity) and evaluate using metrics like SAM (Spectral Angle Mapper) that measure information preservation alongside visual quality metrics.",
  },
  {
    question: "What are the real-world applications?",
    answer:
      "Colorized SAR images are valuable for: (1) Disaster monitoring - faster assessment of floods, landslides, and earthquakes; (2) Environmental analysis - tracking deforestation, soil erosion, and agricultural changes; (3) Defense surveillance - improved situational awareness for terrain analysis and movement detection; (4) Research - making SAR data accessible to non-radar experts.",
  },
  {
    question: "Why use Conditional GANs for this task?",
    answer:
      "Conditional GANs (specifically Pix2Pix) are ideal because they learn a mapping conditioned on input images. The generator produces colorized outputs while the discriminator ensures realistic local textures. This adversarial training produces sharper, more coherent results than traditional regression approaches.",
  },
  {
    question: "What makes SAR imagery special?",
    answer:
      "SAR uses active radar pulses to image the Earth, providing: (1) All-weather capability - radar penetrates clouds and light rain; (2) Day-and-night operation - doesn't need sunlight; (3) Unique information - surface texture, moisture content, and structure. This makes SAR irreplaceable for continuous monitoring.",
  },
  {
    question: "How is the model evaluated?",
    answer:
      "The model is evaluated using both training and image quality metrics. GAN loss measures how realistic the generated images appear, while L1 loss measures reconstruction accuracy compared to the reference image. For quantitative validation, SSIM evaluates structural similarity and PSNR measures overall image quality. Together, these metrics ensure the output is visually realistic and structurally consistent.",
  },
];
const FAQs = () => {
  return (
    <Layout>
      <section className="pt-24 pb-16 relative">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Frequently Asked <span className="text-gradient">Questions</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Common questions about SAR colorization, our methodology, and the technology behind our SAR-RANG.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="glass rounded-2xl px-6 border-border/50 data-[state=open]:border-primary/30"
                >
                  <AccordionTrigger className="text-left font-display font-semibold hover:text-primary py-6">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-6">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </Layout>
  );
};
export default FAQs;
