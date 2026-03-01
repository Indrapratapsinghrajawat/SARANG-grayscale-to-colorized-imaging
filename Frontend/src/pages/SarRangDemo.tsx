import { useState, useRef } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Upload, Download, Loader2, AlertCircle, ImageIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import example1Grayscale from "@/assets/grayscale-1.png";
import example1Colorized from "@/assets/coloured-1.png";
import example2Grayscale from "@/assets/grayscale-2.png";
import example2Colorized from "@/assets/coloured-2.png";
import example3Grayscale from "@/assets/grayscale-3.png";
import example3Colorized from "@/assets/coloured-3.png";
import example4Grayscale from "@/assets/grayscale-4.png";
import example4Colorized from "@/assets/coloured-4.png";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/tiff"];
const ACCEPTED_EXTENSIONS = ".png,.jpg,.jpeg,.tiff,.tif";

const GALLERY_EXAMPLES = [
  {
    grayscale: example1Grayscale,
    colorized: example1Colorized,
    title: "Class 1  Grassland",
    description:
      "Moderate radar backscatter from vegetation produces soft tonal mapping, highlighting natural cover regions.",
  },
  {
    grayscale: example2Grayscale,
    colorized: example2Colorized,
    title: "Class 2  Urban Area",
    description:
      "Strong reflections from buildings and structures generate high-intensity responses mapped to colors.",
  },
  {
    grayscale: example3Grayscale,
    colorized: example3Colorized,
    title: "Class 3  Barren Land",
    description:
      "Low texture and uniform reflectance regions are assigned neutral tones for minimal surface complexity.",
  },
  {
    grayscale: example4Grayscale,
    colorized: example4Colorized,
    title: "Class 4  Agricultural Land",
    description:
      "Periodic crop patterns create repeating radar signatures resulting in structured color variations.",
  },
];

const SarRangDemo = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (f: File): string | null => {
    if (!ACCEPTED_TYPES.includes(f.type) && !f.name.match(/\.(tiff?|png|jpe?g)$/i)) {
      return "Invalid file format. Please upload a PNG, JPG, or TIFF image.";
    }
    if (f.size > MAX_FILE_SIZE) {
      return `File size exceeds 10 MB limit (${(f.size / 1024 / 1024).toFixed(1)} MB).`;
    }
    return null;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setResult(null);
    const selected = e.target.files?.[0];
    if (!selected) return;

    const validationError = validateFile(selected);
    if (validationError) {
      setError(validationError);
      setFile(null);
      setPreview(null);
      return;
    }

    setFile(selected);
    const reader = new FileReader();
    reader.onload = (ev) => setPreview(ev.target?.result as string);
    reader.readAsDataURL(selected);
  };

  const handleProcess = async () => {
    if (!file) return;
    setError(null);
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('image', file);

      const { data, error: fnError } = await supabase.functions.invoke('colorize-sar', {
        body: formData,
      });

      if (fnError) {
        throw new Error(fnError.message || 'Processing failed');
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      const imageUrl = data?.imageUrl;
      if (!imageUrl) {
        throw new Error('No colorized image returned from the API.');
      }

      setResult(imageUrl);
    } catch (err: any) {
      setError(err.message || "An error occurred while processing the image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!result) return;
    const a = document.createElement("a");
    a.href = result;
    a.download = `colorized-${file?.name || "result.png"}`;
    a.click();
  };

  return (
    <Layout>
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Title */}
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-4 text-center">
            SAR-RANG: SAR Image Colorization
          </h1>

          {/* Disclaimer */}
          <div className="glass rounded-xl p-4 mb-10 border border-primary/20">
            <p className="text-sm text-muted-foreground text-center leading-relaxed">
              <strong className="text-foreground">Disclaimer:</strong> This system performs SAR image colorization to enhance interpretability. It does not generate optical imagery and preserves radar-specific characteristics.
            </p>
          </div>

           {/* Instructions */}
           <div className="mb-10">
             <h2 className="font-display text-2xl font-semibold mb-5">Instructions</h2>
              <ol className="list-decimal list-inside space-y-3 text-base text-muted-foreground leading-relaxed">
               <li>Upload a grayscale SAR image (PNG, JPG, or TIFF).</li>
               <li>Ensure the image is radiometrically calibrated and normalized SAR data.</li>
               <li>Click <strong className="text-foreground">Process Image</strong> to run the SAR-RANG model.</li>
               <li>Review the output and download the colorized result.</li>
             </ol>
           </div>

           {/* Gallery */}
          <div className="mb-14">
            <h2 className="font-display text-2xl font-semibold mb-3">
              Example Transformations
            </h2>

            <p className="text-base text-muted-foreground mb-10 leading-relaxed max-w-2xl">
              Below examples demonstrate how SAR-RANG assigns meaningful color representations
              based on radar reflectance characteristics rather than hallucinated optical imagery.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
              {GALLERY_EXAMPLES.map((example, idx) => (
                <div key={idx} className="space-y-4">

                  <div>
                    <p className="text-lg font-semibold text-foreground">{example.title}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {example.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Grayscale */}
                    <div className="text-center">
                      <p className="text-s text-muted-foreground mb-1">SAR Input</p>
                      <div className="glass rounded-xl p-2">
                        <img
                          src={example.grayscale}
                          alt={`Grayscale ${example.title}`}
                          className="rounded-lg h-64 w-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Colorized */}
                    <div className="text-center">
                      <p className="text-s text-muted-foreground mb-1">Colorized Output</p>
                      <div className="glass rounded-xl p-2">
                        <img
                          src={example.colorized}
                          alt={`Colorized ${example.title}`}
                          className="rounded-lg h-64 w-full object-cover"
                        />
                      </div>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>

          {/* Upload Area */}
          <div className="mb-8">
            <input
              ref={fileInputRef}
              type="file"
              accept={ACCEPTED_EXTENSIONS}
              onChange={handleFileChange}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full glass rounded-xl border-2 border-dashed border-border/60 hover:border-primary/50 transition-colors p-10 flex flex-col items-center gap-3 cursor-pointer"
            >
              <Upload className="h-8 w-8 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {file ? file.name : "Click to upload a grayscale SAR image"}
              </span>
              <span className="text-xs text-muted-foreground/60">
                PNG, JPG, or TIFF — Max 10 MB
              </span>
            </button>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 text-destructive text-sm mb-6 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Input Preview */}
          {preview && (
            <div className="mb-8">
              <p className="text-sm font-medium mb-2">Input Preview</p>
              <div className="glass rounded-xl p-2 inline-block">
                <img src={preview} alt="Uploaded SAR input" className="max-h-64 rounded-lg" />
              </div>
            </div>
          )}

          {/* Process Button */}
          {file && !result && (
            <div className="mb-10">
              <Button
                variant="hero"
                size="lg"
                onClick={handleProcess}
                disabled={loading}
                className="w-full sm:w-auto"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Processing…
                  </>
                ) : (
                  <>
                    <ImageIcon className="h-5 w-5" />
                    Process Image
                  </>
                )}
              </Button>
            </div>
          )}

          {/* Result */}
          {result && (
            <div className="space-y-4">
              <h2 className="font-display text-lg font-semibold">Colorized Output</h2>
              <div className="glass rounded-xl p-2 inline-block">
                <img src={result} alt="Colorized SAR output" className="max-h-80 rounded-lg" />
              </div>
              <div>
                <Button variant="outline" size="lg" onClick={handleDownload}>
                  <Download className="h-5 w-5" />
                  Download Result
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default SarRangDemo;
