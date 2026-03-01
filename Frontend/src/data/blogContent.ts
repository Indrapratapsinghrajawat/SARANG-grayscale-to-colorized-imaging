import sarSatellite from "@/assets/blog-sar-satellite.jpg";
import radarWaves from "@/assets/blog-radar-waves.jpg";
import deepLearning from "@/assets/blog-deep-learning.jpg";
import colorization from "@/assets/blog-colorization.jpg";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  content: {
    sections: {
      heading?: string;
      paragraphs: string[];
    }[];
  };
}

export const blogPosts: BlogPost[] = [
  {
    slug: "what-is-sar",
    title: "What is Synthetic Aperture Radar (SAR)?",
    excerpt: "Understanding the fundamentals of SAR imaging technology, how radar waves create images, and why this technology is essential for all-weather Earth observation.",
    date: "Jan 15, 2026",
    readTime: "5 min read",
    category: "Fundamentals",
    image: sarSatellite,
    content: {
      sections: [
        {
          paragraphs: [
            "Synthetic Aperture Radar (SAR) is an advanced remote sensing technology that uses radar waves to create high-resolution images of the Earth's surface. Unlike optical cameras that rely on sunlight, SAR actively transmits microwave pulses and records the echoes reflected from the ground, making it capable of imaging day or night, regardless of weather conditions.",
            "The term 'synthetic aperture' refers to the technique of combining multiple radar returns collected along the satellite's flight path to simulate a much larger antenna. This clever processing trick allows SAR systems to achieve remarkably fine spatial resolution despite being mounted on satellites hundreds of kilometers above Earth.",
          ],
        },
        {
          heading: "How SAR Creates Images",
          paragraphs: [
            "When a SAR satellite passes over terrain, it continuously transmits radar pulses sideways toward the ground. These pulses interact with surface features like buildings, vegetation, water, and soil. The way these features scatter the radar energy back toward the satellite depends on their physical properties roughness, moisture content, and geometry.",
            "By precisely measuring the time delay and phase of returning signals, SAR systems can determine the distance to each point on the ground. The Doppler shift of the returns helps determine position along the flight track. Combining these measurements creates a detailed two-dimensional image of surface backscatter.",
          ],
        },
        {
          heading: "All-Weather Capability",
          paragraphs: [
            "One of SAR's most valuable characteristics is its ability to penetrate clouds, rain, and fog. Optical satellites are blind when clouds obscure the ground, but radar waves at centimeter to meter wavelengths pass through atmospheric moisture with minimal attenuation. This makes SAR indispensable for monitoring tropical regions, disaster response during storms, and polar areas with persistent cloud cover.",
            "SAR's independence from solar illumination also enables consistent imaging schedules. While optical satellites can only capture useful imagery during daylight hours, SAR can image the same location at any time, supporting time critical applications like emergency response and military surveillance.",
          ],
        },
        {
          heading: "Applications of SAR",
          paragraphs: [
            "SAR technology serves diverse applications across scientific, commercial, and defense domains. Environmental scientists use SAR to monitor deforestation, track glacial movements, and map flood extents. Geologists employ interferometric SAR (InSAR) to measure ground subsidence and volcanic deformation with millimeter precision.",
            "Maritime surveillance relies on SAR to detect ships, oil spills, and sea ice. Agriculture benefits from SAR's sensitivity to crop structure and soil moisture. Urban planners use SAR data to map infrastructure and monitor construction activity. The technology's versatility continues to expand as processing techniques advance.",
          ],
        },
      ],
    },
  },
  {
    slug: "why-sar-grayscale",
    title: "Why Are SAR Images Grayscale?",
    excerpt: "Exploring the physics behind SAR imaging and understanding why radar returns only intensity information, resulting in single-channel grayscale imagery.",
    date: "Jan 10, 2026",
    readTime: "4 min read",
    category: "Technical",
    image: radarWaves,
    content: {
      sections: [
        {
          paragraphs: [
            "When you first encounter a SAR image, you'll notice it looks nothing like the colorful photographs we're accustomed to seeing from space. SAR images appear in shades of gray, often with a distinctive grainy texture called speckle. This grayscale appearance isn't a limitation of display technology as it reflects the fundamental physics of how radar imaging works.",
            "To understand why SAR produces grayscale images, we need to contrast it with optical imaging. Cameras capture visible light, which consists of electromagnetic waves at wavelengths our eyes can perceive. Different wavelengths appear as different colors. When sunlight illuminates a scene, objects reflect various wavelengths depending on their surface properties, creating the rich color palette we see in photographs."
          ]
        },
        {
          heading: "Single-Channel Measurement",
          paragraphs: [
            "SAR systems operate fundamentally differently. A SAR sensor transmits pulses at a single microwave frequency typically in bands designated as X, C, L, or P band. When these pulses reflect off the ground, the sensor measures two things: the amplitude (strength) of the return signal and its phase (timing relative to the transmitted pulse).",
            "The amplitude measurement tells us how much energy scattered back toward the satellite. Bright pixels indicate strong backscatter from rough surfaces, urban structures, or vegetation. Dark pixels show weak returns from smooth surfaces like calm water or bare soil. But crucially, there's only one channel of intensity information no equivalent to the red, green, and blue channels that create color in optical images."
          ]
        },
        {
          heading: "The Speckle Effect",
          paragraphs: [
            "The characteristic grainy appearance of SAR images comes from a phenomenon called speckle. Unlike optical systems where each pixel receives light from a single point, SAR pixels contain returns from countless individual scatterers within the resolution cell. These scatterers' contributions add together with random phases, creating constructive and destructive interference patterns.",
            "Speckle appears as salt-and-pepper noise but actually carries information about surface properties. Experienced analysts can interpret speckle patterns to infer terrain characteristics. However, for many applications, speckle complicates interpretation and is reduced through filtering though this trades off with preserving fine details."
          ]
        },
        {
          heading: "Multi-Polarization and False Color",
          paragraphs: [
            "Some SAR systems can transmit and receive in multiple polarizations like horizontal (H) and vertical (V). By collecting HH, VV, HV, and VH polarization combinations, these systems acquire multiple intensity channels that can be combined into false-color composites. These colorized products help distinguish different surface types but don't represent true optical colors.",
            "This is where our research becomes relevant. Rather than relying on polarimetric combinations or attempting to translate SAR into optical imagery, we use deep learning to add meaningful color that enhances interpretability while preserving the unique information content of SAR data."
          ]
        }
      ]
    }
  },
  {
    slug: "gans-for-colorization",
    title: "GANs for Image Colorization: A Deep Dive",
    excerpt: "How Generative Adversarial Networks learn to add color to grayscale images, and why Conditional GANs are particularly suited for SAR colorization.",
    date: "Jan 5, 2026",
    readTime: "8 min read",
    category: "Deep Learning",
    image: deepLearning,
    content: {
      sections: [
        {
          paragraphs: [
            "Generative Adversarial Networks (GANs) have revolutionized the field of computer vision since their introduction by Ian Goodfellow in 2014. These neural network architectures learn to generate remarkably realistic images through an adversarial training process where two networks competing against each other to produce increasingly convincing results.",
            "For image colorization, GANs offer a compelling approach because they can learn complex, multi-modal mappings from grayscale to color. Unlike traditional methods that produce average or desaturated colors, GANs can generate vibrant, realistic colorizations by learning from thousands of example images."
          ]
        },
        {
          heading: "The Adversarial Framework",
          paragraphs: [
            "A GAN consists of two neural networks: a Generator and a Discriminator. The Generator's job is to create images that in our case, to add color to grayscale inputs. The Discriminator acts as a critic, trying to distinguish between real color images and the Generator's colorized outputs.",
            "During training, these networks engage in a minimax game. The Generator tries to fool the Discriminator by producing increasingly realistic colorizations. The Discriminator improves at detecting fakes. This adversarial pressure pushes both networks toward better performance, with the Generator eventually producing outputs indistinguishable from real images."
          ]
        },
        {
          heading: "Conditional GANs (cGANs)",
          paragraphs: [
            "For colorization tasks, we use Conditional GANs, which condition the generation process on input data specifically, the grayscale image we want to colorize. This conditioning ensures the output color image maintains structural correspondence with the input rather than generating arbitrary images.",
            "The Pix2Pix framework, introduced by Isola et al. in 2017, became the standard architecture for image-to-image translation tasks including colorization. It combines a conditional GAN objective with an L1 loss that encourages pixel-wise similarity between generated and target images, balancing realism with accuracy."
          ]
        },
        {
          heading: "U-Net Generator Architecture",
          paragraphs: [
            "The Generator in Pix2Pix uses a U-Net architecture, an encoder-decoder structure with skip connections. The encoder progressively downsamples the input, extracting increasingly abstract features. The decoder upsamples back to full resolution, generating the output image.",
            "Skip connections are crucial for colorization. They directly connect encoder layers to corresponding decoder layers, allowing fine details from the input to bypass the bottleneck. Without skip connections, the network would lose spatial information needed to align colors precisely with image structures."
          ]
        },
        {
          heading: "PatchGAN Discriminator",
          paragraphs: [
            "Rather than classifying entire images as real or fake, Pix2Pix uses a PatchGAN Discriminator that operates on local image patches. This design captures high frequency structure and texture, encouraging the Generator to produce sharp, detailed outputs rather than blurry averages.",
            "The PatchGAN outputs a matrix of predictions, each corresponding to a different image region. This patch based approach also makes the Discriminator more computationally efficient, as it has fewer parameters than a full-image classifier while providing dense feedback to the Generator.",
          ],
        },
        {
          heading: "Adapting GANs for SAR",
          paragraphs: [
            "Applying GANs to SAR colorization presents unique challenges. SAR images have different statistical properties than optical photographs such as speckle noise, different texture characteristics, and no ground-truth color information. Our approach addresses these challenges through specialized training data generation and loss functions designed to preserve SAR-specific features.",
            "By using synthetic ground truth created through IHS fusion techniques, we can train the network to produce colorizations that enhance interpretability while maintaining the scientific integrity of the original SAR data. This distinguishes our approach from SAR-to-optical translation, which attempts to hallucinate optical appearances and can introduce artifacts or lose radar-specific information."
          ]
        }
      ]
    }
  },
  {
    slug: "colorization-vs-translation",
    title: "Colorization vs. Translation: Key Differences",
    excerpt: "Understanding the fundamental difference between adding meaningful color to SAR and attempting to translate SAR to optical domain imagery.",
    date: "Dec 28, 2025",
    readTime: "6 min read",
    category: "Research",
    image: colorization,
    content: {
      sections: [
        {
          paragraphs: [
            "In the growing field of SAR image enhancement using deep learning, two distinct approaches have emerged: SAR colorization and SAR-to-optical translation. While these might seem similar at first glance but both produce color images from grayscale SAR inputs as they have fundamentally different goals, methodologies, and implications for downstream applications.",
            "Understanding these differences is crucial for researchers and practitioners choosing which approach suits their needs. The wrong choice could lead to misinterpretation of results or loss of valuable information encoded in the original SAR data."
          ]
        },
        {
          heading: "SAR-to-Optical Translation",
          paragraphs: [
            "SAR-to-optical translation attempts to generate synthetic optical images from SAR inputs. The goal is to produce images that look like photographs taken by optical satellites with complete with natural colors, shadows, and lighting effects that SAR cannot directly capture.",
            "This approach uses paired SAR and optical images for training, teaching the network to predict what an optical sensor would observe given SAR backscatter patterns. The appeal is obvious: optical images are easier for humans to interpret intuitively, and existing image analysis pipelines designed for optical data could potentially process the translated outputs."
          ]
        },
        {
          heading: "The Problems with Translation",
          paragraphs: [
            "However, SAR-to-optical translation faces fundamental limitations. SAR and optical sensors measure completely different physical properties. SAR captures surface roughness, geometry, and dielectric properties through backscatter. Optical sensors capture reflected sunlight, which depends on surface color, illumination angle, and atmospheric conditions.",
            "There's no deterministic mapping between these domains. The same SAR backscatter could correspond to many possible optical appearances, and vice versa. Translation networks must hallucinate information that simply isn't present in the input, leading to potential artifacts, inconsistencies, and scientifically questionable results.",
          ],
        },
        {
          heading: "SAR Colorization: A Different Philosophy",
          paragraphs: [
            "SAR colorization takes a fundamentally different approach. Rather than trying to simulate optical imagery, colorization aims to enhance the interpretability of SAR data by adding meaningful color that highlights different surface types or backscatter characteristics.",
            "The key distinction is that colorization preserves the underlying SAR information. The intensity patterns, texture, and speckle characteristics remain intact when color is added as an additional layer of information to aid human interpretation, not to replace the original data."
          ]
        },
        {
          heading: "Creating Ground Truth for Colorization",
          paragraphs: [
            "Since there's no 'true' color for SAR images, colorization approaches must define what colors are meaningful. Our method uses IHS (Intensity-Hue-Saturation) fusion with optical data to create synthetic ground truth during training. The SAR intensity is preserved while hue and saturation from corresponding optical images provide color information.",
            "This creates training targets where color enhances interpretation without contradicting the SAR measurements. The network learns to predict these enhanced colorizations from SAR-only inputs, producing outputs that look natural while remaining faithful to radar physics.",
          ],
        },
        {
          heading: "Evaluation Metrics Matter",
          paragraphs: [
            "The choice between colorization and translation also affects how we evaluate results. Translation methods often use perceptual metrics or user studies asking whether outputs look like realistic optical images. These metrics don't assess whether the results are scientifically valid.",
            "For colorization, we use metrics like Q4, NRMSE, and SAM that quantify fidelity to the ground truth colorization while ensuring SAR information is preserved. These metrics align with our goal: enhanced interpretability without sacrificing the unique information that makes SAR valuable in the first place.",
          ],
        },
        {
          heading: "Choosing the Right Approach",
          paragraphs: [
            "For applications requiring quick visual interpretation by non-experts, colorization offers clear benefits with minimal risk. The enhanced images remain grounded in SAR physics while being easier to understand.",
            "Translation might be appropriate when the goal is data augmentation or when optical-like appearances are specifically needed. However, users must understand they're viewing synthetic imagery that may not accurately represent ground conditions. For scientific analysis, defense intelligence, or disaster response where accuracy is paramount, colorization is the safer choice.",
          ],
        },
      ],
    },
  },
];

export const getBlogBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find((post) => post.slug === slug);
};
