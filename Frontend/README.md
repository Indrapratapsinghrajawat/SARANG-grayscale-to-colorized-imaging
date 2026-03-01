# SAR-RANG Frontend

The SAR-RANG frontend is a React-based web application that enables users to upload grayscale Synthetic Aperture Radar (SAR) images and obtain scientifically meaningful colorized outputs using our trained Pix2Pix Conditional GAN model.

This frontend serves as the user interface layer of the SAR-RANG system and communicates with Supabase Edge Functions for inference and form handling.

---

## Overview

The frontend is designed to:

- Provide an intuitive SAR image upload and preview interface
- Display before/after transformation examples
- Communicate with deployed inference endpoints
- Offer research blogs and technical documentation
- Support responsive design for desktop and mobile

The system is optimized for research demonstration, academic presentation, and deployment.

---

## Architecture

The frontend interacts with the backend as follows:

User Upload
↓
Supabase Edge Function (colorize-sar)
↓
Hugging Face Inference Endpoint (Custom .pth Model)
↓
Colorized Output (Base64 Image)
↓
Frontend Display + Download

All secrets are securely handled via Supabase Vault.

---

## Tech Stack

| Layer           | Technology                                     |
| --------------- | ---------------------------------------------- |
| Framework       | React 18 + TypeScript                          |
| Build Tool      | Vite                                           |
| Styling         | Tailwind CSS + shadcn/ui                       |
| Routing         | React Router v6                                |
| State Handling  | React Hooks                                    |
| Animations      | GSAP + Lenis                                   |
| 3D Hero Section | Three.js (@react-three/fiber + drei)           |
| Charts          | Recharts                                       |
| Backend Client  | Supabase JS SDK                                |
| Form Handling   | Supabase Edge Function (Web3Forms integration) |

---

## Folder Structure

frontend/
│
├── public/
├── src/
│ ├── assets/ # Images, examples, logo
│ ├── components/ # Reusable UI & layout components
│ ├── data/ # Blog & article content
│ ├── hooks/ # Custom React hooks
│ ├── integrations/
│ │ └── supabase/ # Supabase client configuration
│ ├── pages/ # Route-level components
│ ├── App.tsx
│ └── main.tsx
│
├── supabase/ # Edge functions
│ ├── config.toml
│ └── functions/
│ ├── colorize-sar/
│ └── send-contact/
│
├── package.json
├── vite.config.ts
└── .env.example

---

## Environment Variables

Create a `.env` file based on `.env.example`:

VITE_SUPABASE_URL=https://<your-project-id>.supabase.co
VITE_SUPABASE_ANON_KEY=<your-anon-key>

⚠️ Never commit `.env` files containing real credentials.

---

## Required Backend Secrets

Set these in your Supabase project:

HF_MODEL_API_KEY=your_huggingface_api_key
WEB3FORMS_ACCESS_KEY=your_web3forms_key

Use Supabase CLI:

supabase secrets set HF_MODEL_API_KEY=your_key
supabase secrets set WEB3FORMS_ACCESS_KEY=your_key

---

## Installation

### 1️⃣ Clone Repository

git clone https://github.com/Aryansahu04/SAR-RANG.git
cd SAR-RANG/Frontend

### 2️⃣ Install Dependencies

npm install

### 3️⃣ Configure Environment Variables

cp .env.example .env

Fill in your Supabase credentials.

### 4️⃣ Run Development Server

npm run dev

App will run at:

http://localhost:8080

---

## Running Edge Functions Locally

If using Supabase CLI:

supabase start
supabase functions serve

This allows local testing of:

- `colorize-sar`
- `send-contact`

---

## Key Pages

| Route            | Description                        |
| ---------------- | ---------------------------------- |
| `/`              | Animated landing page with 3D hero |
| `/sar-rang/demo` | Upload and colorize SAR images     |
| `/about`         | Model architecture & evaluation    |
| `/articles`      | Research paper summaries           |
| `/blogs`         | Educational content                |
| `/contact`       | Contact form                       |

---

## Image Handling

- Accepted formats: PNG, JPG, TIFF
- Maximum size: 10MB
- Images converted to Base64 before sending to backend

---

## Performance Considerations

- Lazy-loaded routes
- Mobile-optimized 3D mode
- Conditional animation rendering
- Responsive layout using Tailwind breakpoints

---

## Deployment

### Production Build

npm run build

Outputs:

dist/

Deploy `dist/` to:

- Vercel
- Netlify
- Cloudflare Pages
- Any static hosting provider

Ensure Supabase project is configured correctly.

---

## Security Notes

- API keys stored only in Supabase Vault
- No secrets exposed in frontend
- Public Edge Functions configured with `--no-verify-jwt` where required
- Environment variables prefixed with `VITE_` are safe for frontend exposure

---

## Future Enhancements

- Drag-to-compare image slider
- Batch image inference
- Model selection (multiple checkpoints)
- Real-time progress feedback
- Authentication-based usage tracking

---
