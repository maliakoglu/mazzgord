import { cn } from "@/lib/utils";

interface MapViewProps {
  className?: string;
  initialCenter?: { lat: number; lng: number };
  initialZoom?: number;
  onMapReady?: (map: any) => void;
}

export function MapView({
  className,
  initialCenter = { lat: 37.7470977, lng: 29.0954121 },
  initialZoom = 12,
}: MapViewProps) {
  const { lat, lng } = initialCenter;
  const embedUrl = `https://www.google.com/maps?q=${lat},${lng}&z=${initialZoom}&output=embed`;

  return (
    <iframe
      src={embedUrl}
      className={cn("w-full h-[500px] border-0", className)}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title="Mazzgord Konum"
    />
  );
}
