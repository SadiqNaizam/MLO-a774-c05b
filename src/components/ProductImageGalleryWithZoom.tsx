import React, { useState, useRef, MouseEvent } from 'react';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils"; // For conditional class names

interface ImageInfo {
  id: string | number;
  src: string;
  alt: string;
  thumbnailSrc?: string; // Optional specific thumbnail
}

interface ProductImageGalleryWithZoomProps {
  images: ImageInfo[];
  mainImageRatio?: number; // e.g., 1 for square, 4/3, 16/9
  enableZoom?: boolean;
  zoomScale?: number;
}

const ProductImageGalleryWithZoom: React.FC<ProductImageGalleryWithZoomProps> = ({
  images,
  mainImageRatio = 1, // Default to square
  enableZoom = true,
  zoomScale = 1.75,
}) => {
  console.log("Rendering ProductImageGalleryWithZoom with", images.length, "images.");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoomCoords, setZoomCoords] = useState({ x: 0, y: 0 });
  const mainImageRef = useRef<HTMLImageElement>(null);

  if (!images || images.length === 0) {
    return (
      <div className="w-full">
        <AspectRatio ratio={mainImageRatio} className="bg-muted rounded-lg flex items-center justify-center">
          <p className="text-muted-foreground">No image available</p>
        </AspectRatio>
      </div>
    );
  }

  const currentImage = images[currentIndex];

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!mainImageRef.current || !enableZoom) return;
    const rect = mainImageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomCoords({ x, y });
  };

  const handleMouseLeave = () => {
    if (!enableZoom) return;
    // Reset zoom effect if needed, or keep transform for visual cue
    // For simplicity, we rely on the group-hover for transform
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image with Zoom */}
      <div 
        className="relative overflow-hidden rounded-lg group border"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <AspectRatio ratio={mainImageRatio}>
          <img
            ref={mainImageRef}
            src={currentImage.src}
            alt={currentImage.alt}
            className={cn(
              "object-contain w-full h-full transition-transform duration-300 ease-out",
              enableZoom && "group-hover:scale-[var(--zoom-scale)]"
            )}
            style={{ 
              transformOrigin: `${zoomCoords.x}% ${zoomCoords.y}%`,
              '--zoom-scale': zoomScale 
            } as React.CSSProperties}
            onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
          />
        </AspectRatio>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "rounded-md overflow-hidden border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                index === currentIndex ? "border-primary" : "border-transparent hover:border-muted-foreground/50"
              )}
              aria-label={`View image ${index + 1} of ${images.length}`}
            >
              <AspectRatio ratio={1}>
                <img
                  src={image.thumbnailSrc || image.src}
                  alt={`Thumbnail for ${image.alt}`}
                  className="object-cover w-full h-full"
                  onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
                />
              </AspectRatio>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
export default ProductImageGalleryWithZoom;