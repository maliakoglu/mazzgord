interface GalleryModalProps {
  open: boolean;
  images: string[];
  current: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function GalleryModal({ open, images, current, onClose, onNext, onPrev }: GalleryModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center" onClick={onClose}>
      <div className="relative max-w-4xl max-h-[90vh] mx-4" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute -top-12 right-0 text-white text-3xl hover:text-gray-300">&times;</button>
        <img src={images[current]} alt="Mazzgord çeviri proje örneği galerisi - yeminli tercüme Denizli" className="max-w-full max-h-[80vh] object-contain rounded-lg" />
        {images.length > 1 && (
          <>
            <button onClick={onPrev} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl">&lsaquo;</button>
            <button onClick={onNext} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl">&rsaquo;</button>
          </>
        )}
      </div>
    </div>
  );
}
