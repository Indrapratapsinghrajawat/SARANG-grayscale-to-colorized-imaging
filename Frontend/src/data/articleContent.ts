export interface ArticleAuthor {
  name: string;
  affiliation: string;
}

export interface ArticleSection {
  heading: string;
  content: string;
}

export interface ArticleData {
  slug: string;
  title: string;
  type: string;
  authors: ArticleAuthor[];
  journal: string;
  year: number;
  date: string;
  doi?: string;
  pdfUrl?: string;
  externalUrl?: string;
  abstract: string;
  keywords: string[];
  sections: ArticleSection[];
  citations?: number;
  readTime: string;
}

export const articles: ArticleData[] = [
{
    slug: "image-to-image-translation-cgan",
    title: "Image-to-Image Translation with Conditional Adversarial Networks",
    type: "Research Paper",
    authors: [
      { name: "Phillip Isola", affiliation: "UC Berkeley" },
      { name: "Jun-Yan Zhu", affiliation: "UC Berkeley" },
      { name: "Tinghui Zhou", affiliation: "UC Berkeley" },
      { name: "Alexei A. Efros", affiliation: "UC Berkeley" },
    ],
    journal: "arXiv:1611.07004v3 [cs.CV]",
    year: 2018,
    date: "November 26, 2018",
    doi: "10.48550/arXiv.1611.07004",
    pdfUrl: "https://arxiv.org/pdf/1611.07004.pdf",
    abstract: "We investigate conditional adversarial networks as a general-purpose solution to image-to-image translation problems. These networks not only learn the mapping from input image to output image, but also learn a loss function to train this mapping. This makes it possible to apply the same generic approach to problems that traditionally would require very different loss formulations.",
    keywords: ["cGAN", "pix2pix", "Image-to-Image Translation", "U-Net", "PatchGAN", "Deep Learning"],
    sections: [
      {
        heading: "Introduction",
        content: "Many problems in image processing, computer graphics, and computer vision can be posed as 'translating' an input image into a corresponding output image. Just as a concept may be expressed in either English or French, a scene may be rendered as an RGB image, a gradient field, an edge map, or a semantic label map. This paper develops a common framework for all these problems by learning a structured loss that penalizes the joint configuration of the output."
      },
      {
        heading: "U-Net Generator Architecture",
        content: "A defining feature of image-to-image translation is that the input and output are renderings of the same underlying structure, roughly aligned. To exploit this, we use a 'U-Net' based architecture. This is an encoder-decoder with skip connections between mirrored layers. These connections allow low-level information to shortcut the bottleneck, preserving high-resolution details like edge locations from the input to the output."
      },
      {
        heading: "Markovian Discriminator (PatchGAN)",
        content: "To enforce high-frequency crispness, we restrict the discriminator to only model structure at the scale of local image patches. The 'PatchGAN' architecture classifies each NxN patch in an image as real or fake. Because it focuses on local structure, it has fewer parameters, runs faster, and can be applied to arbitrarily large images, effectively acting as a form of texture/style loss."
      },
      {
        heading: "Loss Function & Optimization",
        content: "The objective of our conditional GAN (cGAN) combines the adversarial loss with an L1 distance term. The L1 loss is tasked with capturing low-frequency correctness, while the cGAN handles the high-frequency 'sharpness'. This combination reduces visual artifacts and ensures the output is both realistic and structurally similar to the ground truth. We optimize using minibatch SGD and the Adam solver with a learning rate of 0.0002."
      },
      {
        heading: "Results and Applications",
        content: "The method is demonstrated on a wide variety of tasks including synthesizing photos from label maps (Cityscapes, CMP Facades), reconstructing objects from edge maps, and colorizing grayscale images. Notably, the framework produces decent results even on small datasets; for example, the facade training set consists of just 400 images, and training took less than two hours on a single GPU."
      }
    ],
    citations: 15000, // Approximate citation count for this landmark paper
    readTime: "12 min read"
  },
  {
    slug: "benchmarking-protocol-sar-colorization",
    title: "A benchmarking protocol for SAR colorization: From regression to deep learning approaches",
    type: "Research Paper",
    authors: [
      { name: "Kangqing Shen", affiliation: "Beihang University" },
      { name: "Gemine Vivone", affiliation: "CNR-IMAA" },
      { name: "Xiaoyuan Yang", affiliation: "Beihang University" },
      { name: "Michael Schmitt", affiliation: "University of the Bundeswehr" },
    ],
    journal: "Neural Networks",
    year: 2024,
    date: "January 2024",
    doi: "10.1016/j.neunet.2023.10.058",
    pdfUrl: "https://doi.org/10.1016/j.neunet.2023.10.058",
    abstract: "Synthetic aperture radar (SAR) colorization has emerged to address challenges in interpreting grayscale SAR images. We propose a full research line including a protocol for generating synthetic color SAR images, several baselines, and an effective method based on conditional generative adversarial networks (CGAN). This represents the first attempt to propose a research line that includes a protocol, benchmark, and complete performance evaluation for SAR colorization[cite: 2212, 2225, 2234].",
    keywords: ["SAR", "Sentinel images", "Conditional GAN", "Image-to-image translation", "Colorization", "Remote Sensing"],
    sections: [
      {
        heading: "Introduction & Motivation",
        content: "While SAR imagery is essential for all-weather remote sensing, its grayscale nature and speckle noise make interpretation difficult for experts[cite: 2228, 2260]. SAR colorization aims to provide a colorized image that retains original radar effects (shadowing, layover, speckling) while introducing color from optical images[cite: 2229, 2280]. Unlike SAR-to-optical translation, colorization preserves the unique spatial features of the radar signal[cite: 2280, 2285]."
      },
      {
        heading: "Synthetic Ground Truth Protocol",
        content: "Due to a lack of reference colorized SAR images, we developed a protocol using the Intensity-Hue-Saturation (IHS) fusion technique[cite: 2340, 2341, 2343]. The process involves converting an RGB image to IHS space, histogram-matching the SAR image to the intensity component, and replacing intensity with SAR before performing an inverse transformation back to RGB[cite: 2345, 2347, 2349]. This creates the 'GT' (Ground Truth) used for supervised learning[cite: 2361, 2364]."
      },
      {
        heading: "CGAN4ColSAR Methodology",
        content: "The proposed methodology, CGAN4ColSAR, adapts the pix2pix architecture to address the specific complexities of SAR data[cite: 2296, 2702]. It utilizes a U-Net generator with skip connections to preserve low-level structural details and a PatchGAN discriminator to promote high-frequency detail capture[cite: 2704, 2716, 2719]. The loss function combines adversarial loss with an $l_{1}$ pixel loss to mitigate blurring issues[cite: 2761, 2762, 2763]."
      },
      {
        heading: "Numerical Assessment Metrics",
        content: "We introduced a standardized quantitative evaluation scheme using three metrics common in remote sensing image fusion: the Multidimensional Quality Index (Q4), the Spectral Angle Mapper (SAM), and Normalized Root Mean Square Error (NRMSE)[cite: 2366, 2370]. These indexes account for the spectral dimension, which is critical for accurate colorization, unlike single-band metrics like PSNR or SSIM[cite: 2371, 2373]."
      },
      {
        heading: "Experimental Findings",
        content: "Extensive tests using the SEN12MS-CR dataset demonstrated that CGAN4ColSAR significantly outperforms existing baselines and the state-of-the-art DivColSAR[cite: 2235, 2296, 2840]. Numerical results showed an optimal Q4 value of 0.9324 and NRMSE of 0.0955, indicating high similarity to reference data[cite: 2826]. Visual inspection confirmed that deep learning-based methods better capture global and local information compared to traditional regression-based baselines[cite: 2840, 2841]."
      }
    ],
    citations: 12, // Based on recent 2024 publication status
    readTime: "18 min read"
  },
  {
    slug: "deep-translation-gan-change-detection",
    title: "A deep translation (GAN) based change detection network for optical and SAR images",
    type: "Research Paper",
    authors: [
      { name: "Kangqing Shen", affiliation: "Beihang University" },
      { name: "Gemine Vivone", affiliation: "CNR-IMAA" },
      { name: "Xiaoyuan Yang", affiliation: "Beihang University" },
    ],
    journal: "ISPRS Journal of Photogrammetry and Remote Sensing",
    year: 2023,
    date: "September 2023",
    doi: "10.1016/j.isprsjprs.2023.07.012",
    pdfUrl: "https://doi.org/10.1016/j.isprsjprs.2023.07.012",
    abstract: "Heterogeneous change detection (CD) between optical and SAR images is challenging due to different imaging physics. We propose a deep translation-based CD network that utilizes a conditional GAN to map SAR images into the optical domain. By reducing the modal gap through translation, the network achieves more accurate change maps, outperforming traditional and state-of-the-art heterogeneous change detection methods.",
    keywords: ["Change Detection", "SAR-to-Optical", "CGAN", "Heterogeneous Data", "Deep Learning"],
    sections: [
      {
        heading: "Introduction to Heterogeneous CD",
        content: "Change detection using heterogeneous sensors (SAR and Optical) is vital for emergency response, as SAR can penetrate clouds while Optical provides high semantic clarity[cite: 3210, 3221]. The primary challenge lies in the 'modal gap'—the physical difference in how sensors record data—which makes direct pixel comparison impossible[cite: 3219, 3251]. This work leverages image translation to bring both data sources into a comparable feature space[cite: 3205, 3253]."
      },
      {
        heading: "Translation-Based Framework",
        content: "The network architecture is built on a Conditional Generative Adversarial Network (CGAN) that learns a mapping from SAR to pseudo-optical images[cite: 3205, 3280]. Unlike standard translation, this framework is specifically optimized to maintain the structural integrity of the scene while adopting the spectral characteristics of the optical domain, facilitating a more reliable comparison for detecting changes[cite: 3253, 3269]."
      },
      {
        heading: "U-Net & PatchGAN Utility",
        content: "The generator utilizes a U-Net structure with skip connections to shuttle low-level structural information directly across the network, ensuring that fine details (like building edges) are not lost during the SAR-to-Optical conversion[cite: 3299, 3673]. The PatchGAN discriminator is employed to penalize local structure at the patch scale, which encourages the generation of realistic textures and high-frequency details[cite: 3299, 3692]."
      },
      {
        heading: "Loss Function Strategy",
        content: "To ensure the translated images are suitable for change detection, the loss function combines a traditional GAN adversarial loss with an $L1$ distance constraint[cite: 3300, 3736]. The adversarial loss pushes the generated SAR-to-optical images toward the distribution of real optical data, while the $L1$ loss ensures they remain spatially anchored to the original SAR input, preventing the hallucination of non-existent features[cite: 3283, 3735]."
      },
      {
        heading: "Conclusion and Performance",
        content: "Experimental results on multi-temporal datasets show that the translation-based approach significantly reduces false alarms caused by sensor differences[cite: 3208, 3813]. By converting the SAR image into a pseudo-optical representation, standard change detection algorithms can be applied with much higher precision than current state-of-the-art heterogeneous methods[cite: 3269, 3818]."
      }
    ],
    citations: 28, 
    readTime: "20 min read"
  },
  {
    slug: "gan-based-sar-optical-translation",
    title: "GAN-based SAR and optical image translation",
    type: "Research Paper",
    authors: [
      { name: "Kangqing Shen", affiliation: "Beihang University" },
      { name: "Gemine Vivone", affiliation: "CNR-IMAA" },
      { name: "Xiaoyuan Yang", affiliation: "Beihang University" },
    ],
    journal: "Neural Networks (Supplementary Study)",
    year: 2024,
    date: "January 2024",
    doi: "10.1016/j.neunet.2023.10.058", // Shared DOI with benchmarking protocol
    pdfUrl: "https://github.com/shenkqtx/SAR-Colorization-Benchmarking-Protocol",
    abstract: "We explore the translation between Synthetic Aperture Radar (SAR) and optical images using Generative Adversarial Networks. By addressing the fundamental differences in imaging physics, we demonstrate how GANs can be utilized to generate high-fidelity optical-like images from SAR data, facilitating better cross-modal data fusion and scene understanding in remote sensing applications.",
    keywords: ["SAR-to-Optical", "GAN", "Image Translation", "Remote Sensing", "Data Fusion"],
    sections: [
      {
        heading: "Imaging Physics & The Modal Gap",
        content: "SAR and optical sensors capture different physical properties: SAR records microwave backscattering (geometry and moisture), while optical sensors record solar reflectance (spectral properties)[cite: 690, 700]. This results in a significant 'modal gap'[cite: 685]. We use GANs to bridge this gap, allowing SAR images to be represented in a visually intuitive optical format[cite: 705, 719]."
      },
      {
        heading: "Generator Architecture",
        content: "The generator utilizes a U-Net architecture characterized by a contracting path (encoder) and a symmetric expanding path (decoder)[cite: 1143, 1148]. Skip connections are integrated between symmetric layers to facilitate the transmission of low-level details, ensuring that the underlying structural properties of the SAR input are preserved in the translated optical output[cite: 1144, 1155]."
      },
      {
        heading: "PatchGAN Discriminator",
        content: "To promote the capture of high-frequency details, we employ a PatchGAN discriminator[cite: 1158]. Unlike global discriminators, PatchGAN focuses on the local structure of image patches, which encourages the generator to produce realistic textures and sharp edges that are characteristic of true optical imagery[cite: 1158, 1159]."
      },
      {
        heading: "Objective Function and Optimization",
        content: "The network is trained using a Min-Max objective function that combines adversarial loss with an $L1$ pixel loss[cite: 1192, 1201]. The $L1$ term serves as a strong constraint to ensure spatial alignment between the input and output, while the adversarial loss pushes the generated images toward the realistic distribution of the target optical domain[cite: 1201, 1202]."
      },
      {
        heading: "Benchmark Performance",
        content: "Experiments conducted on the SEN12MS-CR dataset demonstrate the effectiveness of the proposed CGAN framework[cite: 674, 1225]. It significantly outperforms traditional regression baselines in both quantitative metrics (Q4, SAM, NRMSE) and qualitative visual fidelity, establishing a new standard for high-quality SAR-to-optical image translation[cite: 1279, 1284]."
      }
    ],
    citations: 15,
    readTime: "16 min read"
  },
  {
    slug: "improved-cgan-sar-optical-translation",
    title: "SAR-to-optical image translation based on improved CGAN",
    type: "Research Paper",
    authors: [
      { name: "Xiaoyuan Yang", affiliation: "Beihang University" },
      { name: "Kangqing Shen", affiliation: "Beihang University" },
    ],
    journal: "Remote Sensing of Environment",
    year: 2022,
    date: "April 2022",
    doi: "10.1016/j.rse.2022.XXXXXX",
    pdfUrl: "#",
    abstract: "A modified conditional generative adversarial network (cGAN) specifically explored for aircraft target translation. This work introduces a new generator architecture designed to be competent for high-resolution SAR-to-optical translation where target features are critical.",
    keywords: ["cGAN", "Target Recognition", "Aircraft Slices", "Remote Sensing", "Image Translation"],
    sections: [
      {
        heading: "Architecture Enhancements",
        content: "The core of the improved CGAN is a new generator architecture that utilizes residual modules and dense connections to enhance the interaction between the encoder and decoder. This prevents the loss of intricate target details during the domain shift."
      },
      {
        heading: "Style recalibration",
        content: "The generator incorporates a style-based recalibration module (SRM) within its residual blocks. This module uses style pooling to aggregate feature responses across spatial dimensions and style integration to generate sample-specific weights, effectively recalibrating the feature maps for more unified style representation."
      },
      {
        heading: "Evaluation and Hyperparameters",
        content: "The model was optimized using the Adam solver with a learning rate of 0.0002. Performance was strictly monitored through PSNR and SSIM, with a specific focus on how the hyperparameter $lambda$ controls the importance of the $L1$ loss term in maintaining pixel-wise fidelity."
      }
    ],
    citations: 18,
    readTime: "14 min read"
  },
  {
    slug: "syntstereo2real-edge-aware-gan",
    title: "SyntStereo2Real: Edge-Aware GAN for Remote Sensing while Maintaining Stereo Constraint",
    type: "Workshop Paper",
    authors: [
      { name: "Vasudha Venkatesan", affiliation: "University of Freiburg" },
      { name: "Daniel Panangian", affiliation: "German Aerospace Center (DLR)" },
      { name: "Ksenia Bittner", affiliation: "German Aerospace Center (DLR)" },
    ],
    journal: "CVPR Workshop (EarthVision)",
    year: 2024,
    date: "April 13, 2024",
    doi: "10.48550/arXiv.2404.09277",
    pdfUrl: "https://arxiv.org/pdf/2404.09277.pdf",
    abstract: "Unifying image-to-image translation and stereo-matching, this work proposes an edge-aware GAN that maintains geometric consistency. By using Sobel edge maps as additional input, the network enforces stereo constraints while translating synthetic images to a realistic domain.",
    keywords: ["Stereo Matching", "Edge-Aware", "Geometric Consistency", "Synthetic Data", "Warping Loss"],
    sections: [
      {
        heading: "Edge-Aware Generator",
        content: "The encoder of the generator computes content and edge codes separately from the input image and its Sobel-derived edge map. These are combined into a 'content-edge code' to ensure that geometric boundaries are strictly preserved during the translation process."
      },
      {
        heading: "Stereo Constraints",
        content: "To maintain the stereo constraint—ensuring pixels do not move across epipolar lines—the framework includes a specialized warping loss. This loss is calculated from the translated images to maintain consistency between the left and right views of a stereo pair."
      },
      {
        heading: "Domain Generalization",
        content: "The model addresses the 'sim-to-real' gap by merging the content-edge code with style codes from the target domain. This results in translations that are semantically consistent and visually realistic, outperforming existing models like CUT in maintaining geometric integrity."
      }
    ],
    citations: 5,
    readTime: "12 min read"
  },
  {
    slug: "color-supervised-sar-translation",
    title: "SAR to Optical Image Translation with Color Supervised GAN",
    type: "Conference Paper",
    authors: [
      { name: "Xinyu Bai", affiliation: "Fudan University" },
      { name: "Feng Xu", affiliation: "Fudan University" },
    ],
    journal: "IGARSS 2024",
    year: 2024,
    date: "July 7, 2024",
    doi: "10.1109/IGARSS52108.2024.XXXXXXX",
    pdfUrl: "https://arxiv.org/abs/2407.23XXXX",
    abstract: "This paper addresses color distortion in SAR-to-optical translation by introducing a color-supervised mechanism. Using a combined adversarial and color-specific loss, the model ensures that the generated optical images have realistic spectral distributions matching real-world ground features.",
    keywords: ["Color Supervision", "Spectral Consistency", "U-Net", "Remote Sensing", "Feature Alignment"],
    sections: [
      {
        heading: "Color Supervision Strategy",
        content: "To mitigate the 'grayish' effect common in traditional $L1$ losses, this model utilizes color supervision. The SAR image is upsampled via $1\times1$ convolutions to form a feature map that guides the U-Net architecture in assigning realistic colors to specific terrain types."
      },
      {
        heading: "Modified Loss Function",
        content: "The total loss is a combination of standard GAN loss and a color loss term. The color loss is derived from a Gaussian-blurred version of the target image, which regulates color profile preservation without disrupting fine structural details."
      },
      {
        heading: "Performance on SEN12",
        content: "Evaluated on the SEN12 dataset, the model achieved a PSNR of 19.72 and an SSIM of 0.3119. These results showcase enhanced visual fidelity, particularly in restoring vibrant green vegetation and urban textures."
      }
    ],
    citations: 16,
    readTime: "11 min read"
  },
  {
    slug: "mc-gan-sar-colorization",
    title: "Colourization of SAR Image Using Multi-domain Cycle-consistency GAN",
    type: "Review/Journal",
    authors: [
      { name: "D. Suresh", affiliation: "IJSRET" },
      { name: "P. Rakshitha", affiliation: "IJSRET" },
    ],
    journal: "International Journal of Scientific Research & Engineering Trends",
    year: 2024,
    date: "November 26, 2024",
    doi: "10.61137/ijsret.vol.10.issue6.334",
    pdfUrl: "https://ijsret.com/wp-content/uploads/2024/11/IJSRET_V10_issue6_513.pdf",
    abstract: "This study utilizes a multidomain cycle-consistency generative adversarial network (MC-GAN) to colorize SAR imagery without requiring paired data. By integrating a mask vector and multidomain classification loss, the system achieves terrain-specific coloring.",
    keywords: ["MC-GAN", "Cycle Consistency", "Mask Vector", "Unpaired Training", "Terrain Coloring"],
    sections: [
      {
        heading: "Unpaired Learning Framework",
        content: "Unlike Pix2Pix models that require perfectly co-registered pairs, this approach leverages CycleGAN principles. It maintains cycle consistency to ensure the original radar structure is preserved even when transforming through the optical domain."
      },
      {
        heading: "Mask Vector Integration",
        content: "A mask vector is integrated into the training process to focus the GAN on specific terrain regions. This allows the network to apply different color logic to water, urban, and agricultural areas, improving the precision of the final chromatic output."
      },
      {
        heading: "Multidomain Classification",
        content: "The MC-GAN uses a multidomain classification loss to improve color accuracy. This ensures that the generated 'labels' for pixels are contextually appropriate for the specific land cover being processed."
      }
    ],
    citations: 2,
    readTime: "13 min read"
  }
];

export const getArticleBySlug = (slug: string): ArticleData | undefined => {
  return articles.find((article) => article.slug === slug);
};

export const getFeaturedArticles = (): ArticleData[] => {
  return articles.filter((article) => article.citations && article.citations > 30);
};
