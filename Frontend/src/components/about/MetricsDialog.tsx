import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

interface MetricsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/* ================= TRAINING DATA ================= */

const trainingData = [
  { epoch: 181, gan: 1.28, l1: 0.119 },
  { epoch: 200, gan: 1.10, l1: 0.115 },
  { epoch: 250, gan: 1.05, l1: 0.113 },
  { epoch: 300, gan: 0.90, l1: 0.110 },
  { epoch: 330, gan: 0.71, l1: 0.108 },
];

/* ===== TEMP DEMO QUALITY METRICS (replace later) ===== */
const FINAL_GAN = 0.71;
const FINAL_L1 = 0.108;
const FINAL_SSIM = 0.91;   // replace later
const FINAL_PSNR = 27.8;   // replace later

export const MetricsDialog = ({ open, onOpenChange }: MetricsDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">

        <DialogHeader>
          <DialogTitle className="font-display text-2xl">
            Understanding Model Performance
          </DialogTitle>
          <DialogDescription>
            Visual explanation of how the model learns realism, accuracy and final image quality.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-10 mt-6">

          {/* ================= METRIC EXPLANATIONS ================= */}
          <div className="glass rounded-xl p-6 space-y-4">
            <h3 className="font-display font-semibold text-lg">
              What Do These Metrics Mean?
            </h3>

            <div className="grid md:grid-cols-2 gap-4 text-sm">

              <div className="p-4 rounded-lg bg-background/50">
                <p className="font-semibold text-indigo-500">GAN Loss (Realism)</p>
                <p className="text-muted-foreground mt-1">
                  Shows how realistic the generated satellite image looks. Lower values mean the AI
                  can successfully fool the critic network into believing the image is real.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-background/50">
                <p className="font-semibold text-green-500">L1 Loss (Reconstruction Accuracy)</p>
                <p className="text-muted-foreground mt-1">
                  Measures pixel-level similarity to the ground truth image. Lower values mean better color and structure accuracy.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-background/50">
                <p className="font-semibold text-amber-500">SSIM (Structural Similarity)</p>
                <p className="text-muted-foreground mt-1">
                  Measures how similar the shapes, textures and structures are to the real image.
                  Higher values (closer to 1) indicate very natural looking results.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-background/50">
                <p className="font-semibold text-blue-500">PSNR (Image Quality)</p>
                <p className="text-muted-foreground mt-1">
                  Measures overall reconstruction quality. Higher values mean cleaner images with fewer visual errors.
                </p>
              </div>

            </div>
          </div>

          {/* ================= GAN LOSS GRAPH ================= */}
          <div className="glass rounded-xl p-6">
            <h3 className="font-display font-semibold text-lg mb-2">
              Image Realism Learning
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              The decrease in GAN loss shows the model is learning to generate more realistic images over time.
            </p>

            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trainingData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="epoch" label={{ value: "Epoch", position: "insideBottom", offset: -5 }} />
                  <YAxis label={{ value: "GAN Loss", angle: -90, position: "insideLeft" }} />
                  <Tooltip formatter={(value: number) => value.toFixed(4)} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="gan"
                    stroke="#6366f1"
                    strokeWidth={3}
                    dot={false}
                    name="Realism Improvement"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* ================= L1 LOSS GRAPH ================= */}
          <div className="glass rounded-xl p-6">
            <h3 className="font-display font-semibold text-lg mb-2">
              Reconstruction Accuracy Learning
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              The decrease in L1 loss shows the generated images are getting closer to the real images.
            </p>

            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trainingData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="epoch" label={{ value: "Epoch", position: "insideBottom", offset: -5 }} />
                  <YAxis label={{ value: "L1 Loss", angle: -90, position: "insideLeft" }} />
                  <Tooltip formatter={(value: number) => value.toFixed(4)} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="l1"
                    stroke="#22c55e"
                    strokeWidth={3}
                    dot={false}
                    name="Accuracy Improvement"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* ================= FINAL SUMMARY CARDS ================= */}
          <div className="grid sm:grid-cols-4 gap-6">

            <div className="glass rounded-xl p-6 text-center">
              <p className="text-sm text-muted-foreground">Realism Score</p>
              <p className="text-3xl font-bold text-indigo-500 mt-2">{FINAL_GAN}</p>
              <p className="text-xs text-muted-foreground mt-1">Lower is better</p>
            </div>

            <div className="glass rounded-xl p-6 text-center">
              <p className="text-sm text-muted-foreground">Accuracy Score</p>
              <p className="text-3xl font-bold text-green-500 mt-2">{FINAL_L1}</p>
              <p className="text-xs text-muted-foreground mt-1">Lower is better</p>
            </div>

            <div className="glass rounded-xl p-6 text-center">
              <p className="text-sm text-muted-foreground">SSIM</p>
              <p className="text-3xl font-bold text-amber-500 mt-2">{FINAL_SSIM}</p>
              <p className="text-xs text-muted-foreground mt-1">Higher is better</p>
            </div>

            <div className="glass rounded-xl p-6 text-center">
              <p className="text-sm text-muted-foreground">PSNR</p>
              <p className="text-3xl font-bold text-blue-500 mt-2">{FINAL_PSNR}</p>
              <p className="text-xs text-muted-foreground mt-1">Higher is better</p>
            </div>

          </div>

        </div>
      </DialogContent>
    </Dialog>
  );
};