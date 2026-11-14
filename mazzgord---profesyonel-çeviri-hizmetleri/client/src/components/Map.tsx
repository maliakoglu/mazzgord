import { cn } from "@/lib/utils";

interface MapViewProps {
  className?: string;
}

export function MapView({ className }: MapViewProps) {
  return (
    <div
      className={cn("flex min-h-[200px] flex-col items-center justify-center gap-2 rounded-xl border border-border bg-card p-6 text-center", className)}
      role="note"
      aria-label="Hizmet alanı"
    >
      <p className="text-sm text-muted-foreground">Hizmet alanı</p>
      <p className="text-lg font-semibold text-foreground">Pamukkale / Denizli</p>
    </div>
  );
}
