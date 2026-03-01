import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ArchitectureDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  image?: string;
  
}
const architectureCaptions: Record<string, string> = {
  "U-Net Generator":
    "The generator converts SAR grayscale input into a color image using encoder–decoder feature reconstruction.",

  "PatchGAN Discriminator":
    "The discriminator evaluates small image patches to ensure local textures and radar patterns look realistic.",

  "IHS Fusion":
    "IHS fusion preserves SAR brightness while learning meaningful color mapping for supervised training.",
};

export const ArchitectureDialog = ({
  open,
  onOpenChange,
  title,
  image,
}: ArchitectureDialogProps) => {
  if (!image) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-display text-center">
            {title}
          </DialogTitle>    

          <p className="text-sm text-muted-foreground text-center mt-2 px-4">
            {architectureCaptions[title] ?? ""}
          </p>
        </DialogHeader>

        <div className="flex justify-center items-center mt-4">
          <img
            src={image}
            alt={title}
            className="rounded-xl shadow-lg max-h-[75vh] object-contain"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};