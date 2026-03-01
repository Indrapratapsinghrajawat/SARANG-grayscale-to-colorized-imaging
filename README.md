# SAR-RANG — SAR Image Colorization Platform

> A research-focused web platform for SAR image colorization using a custom-trained Pix2Pix Conditional GAN model deployed for inference via Hugging Face.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Model](#model)
- [Project Structure](#project-structure)
- [Model Weights](#model-Weights)
- [Pages & Routing](#pages--routing)
- [Backend (Edge Functions)](#backend-edge-functions)
- [Environment Variables & Secrets](#environment-variables--secrets)
- [Getting Started](#getting-started)
- [Deployment](#deployment)
- [License](#license)

---

## Overview

**SAR-RANG** is a web application that enables users to colorize grayscale SAR satellite images using a deep-learning pipeline. The platform also serves as a knowledge hub with blogs, research articles, FAQs, and information pages for researchers and defense professionals.

---

## Features

| Feature                    | Description                                                                                    |
| -------------------------- | ---------------------------------------------------------------------------------------------- |
| **SAR Image Colorization** | Upload a grayscale SAR image and receive a colorized output from our trained Pix2Pix GAN model |
| **Example Gallery**        | Side-by-side before/after examples across land-cover classes                                   |
| **Blogs & Articles**       | Educational content on SAR, deep learning, and radar colorization                              |
| **Contact Form**           | Sends messages via Web3Forms                                                                   |
| **Cinematic Loader**       | First-visit animated orbital loader (GSAP + Three.js)                                          |
| **Smooth Scrolling**       | Lenis-powered smooth scroll with GSAP ScrollTrigger animations                                 |
| **Solar System Hero**      | Interactive Three.js hero background with mouse parallax                                       |
| **Responsive**             | Fully responsive with mobile-simplified 3D mode                                                |

---

## Tech Stack

| Layer             | Technology                           |
| ----------------- | ------------------------------------ |
| Framework         | React 18 + TypeScript                |
| Build Tool        | Vite                                 |
| Styling           | Tailwind CSS + shadcn/ui             |
| Animations        | GSAP (ScrollTrigger) + Lenis         |
| 3D Graphics       | Three.js (@react-three/fiber + drei) |
| Backend           | Supabase Edge Functions (Deno)       |
| Forms             | Web3Forms API                        |
| Model Training    | PyTorch (Pix2Pix Conditional GAN)    |
| Inference Hosting | Hugging Face Inference Endpoint      |

---

## Model

The colorization model is a custom-trained Pix2Pix Conditional GAN implemented in PyTorch.

- Generator: U-Net architecture
- Discriminator: PatchGAN
- Loss Function: Adversarial Loss + L1 Reconstruction Loss
- Output: Scientifically meaningful color mapping based on SAR backscatter properties

The trained weights are exported as a `.pth` checkpoint and deployed for inference using a Hugging Face endpoint.

The model does **not** generate optical imagery — it learns a reflectance-to-color mapping preserving radar characteristics.

---

## Project Structure

```
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── animations/
│   │   ├── about/
│   │   ├── home/
│   │   ├── layout/
│   │   ├── three/
│   │   └── ui/
│   ├── data/
│   ├── hooks/
│   ├── integrations/supabase/
│   ├── pages/
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── supabase/
│   ├── config.toml
│   └── functions/
│       ├── colorize-sar/
│       └── send-contact/
└── .env.example
```

---

## Model Weights

The trained model checkpoint is provided in this repository:
model/sar-rang-generator.pth
This file contains the learned weights of the Pix2Pix generator network and can be used for local inference or fine-tuning.

> Note: Due to GitHub file size limits, large checkpoints may be stored using Git LFS.

---

## Pages & Routing

| Route             | Page           | Description                                                       |
| ----------------- | -------------- | ----------------------------------------------------------------- |
| `/`               | Home           | Hero with solar-system animation, audience cards, specializations |
| `/about`          | About          | Model architecture, evaluation metrics                            |
| `/blogs`          | Blogs          | Blog listing                                                      |
| `/blogs/:slug`    | Blog Detail    | Individual blog post                                              |
| `/articles`       | Articles       | Research article listing                                          |
| `/articles/:slug` | Article Detail | Individual article                                                |
| `/faqs`           | FAQs           | Frequently asked questions                                        |
| `/contact`        | Contact        | Contact form (powered by Web3Forms)                               |
| `/researchers`    | Researchers    | Information for researchers                                       |
| `/defense`        | Defense        | Defense & military applications                                   |
| `/sar-rang/demo`  | Colorize       | Upload & colorize SAR images                                      |

---

## Backend (Edge Functions)

### `colorize-sar`

- **Purpose:** Receives an uploaded SAR image, sends it to the deployed inference model, and returns a base64 colorized result.
- **Inference Source:** Custom trained model (.pth) hosted via Hugging Face endpoint
- **Auth:** Public (no JWT required)
- **Required Secret:** `HF_MODEL_API_KEY`

### `send-contact`

- **Purpose:** Receives contact form submissions and forwards them to Web3Forms.
- **Auth:** Public (no JWT required).
- **Required Secret:** `WEB3FORMS_ACCESS_KEY`

---

## Environment Variables & Secrets

### Frontend (`.env`)

These are automatically configured when using Lovable Cloud. For self-hosting, copy `.env.example` and fill in:

| Variable                        | Description                                               |
| ------------------------------- | --------------------------------------------------------- |
| `VITE_SUPABASE_PROJECT_ID`      | Your Supabase project ID                                  |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Supabase anon/public key                                  |
| `VITE_SUPABASE_URL`             | Supabase project URL (`https://<project-id>.supabase.co`) |

### Backend Secrets (Supabase Vault)

These must be set as Supabase secrets (via CLI or dashboard) for edge functions to work:

| Secret                      | Required By    | How to Obtain                             |
| --------------------------- | -------------- | ----------------------------------------- |
| `HF_MODEL_API_KEY`          | `colorize-sar` | Deploy the model → Get access key         |
| `WEB3FORMS_ACCESS_KEY`      | `send-contact` | Sign up at web3forms.com → Get access key |
| `SUPABASE_URL`              | Auto-provided  | Automatically set by Supabase             |
| `SUPABASE_ANON_KEY`         | Auto-provided  | Automatically set by Supabase             |
| `SUPABASE_SERVICE_ROLE_KEY` | Auto-provided  | Automatically set by Supabase             |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- A Supabase project

### Installation

```bash
# 1. Clone the repository
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env with your Supabase credentials

# 4. Set Supabase secrets (for edge functions)
npx supabase secrets set HF_MODEL_API_KEY=your_key_here
npx supabase secrets set WEB3FORMS_ACCESS_KEY=your_key_here

# 5. Start the dev server
npm run dev
```

The app will be available at `http://localhost:8080`.

### Running Edge Functions Locally

```bash
# Start Supabase locally
npx supabase start

# Serve edge functions
npx supabase functions serve
```

---

## Deployment

### Self-Hosted

1. Build the frontend: `npm run build`
2. Deploy the `dist/` folder to any static host (Vercel, Netlify, Cloudflare Pages, Lovable, etc.)
3. Deploy the provided `.pth` model checkpoint to a Hugging Face Inference Endpoint (or run locally with PyTorch) and configure the `HF_MODEL_API_KEY`.
4. Deploy edge functions to your Supabase project: `npx supabase functions deploy`
5. Ensure all secrets are configured in your Supabase project.

---
