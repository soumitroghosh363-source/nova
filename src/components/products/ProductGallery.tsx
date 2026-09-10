import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { placeholderImage } from "../../lib/placeholder";

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

const ProductGallery = ({ images, productName }: ProductGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const goTo = (index: number) => {
    setActiveIndex((index + images.length) % images.length);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") goTo(activeIndex + 1);
    if (e.key === "ArrowLeft") goTo(activeIndex - 1);
  };
  return (
    <div>
      {/* Main image */}
      <div
        className="relative aspect-square rounded-clay bg-surface border border-border overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-accent"
        tabIndex={0}
        role="group"
        aria-label={`${productName} image gallery, image ${activeIndex + 1} of ${images.length}`}
        onKeyDown={handleKeyDown}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={activeIndex}
            src={placeholderImage(images[activeIndex], 900, 900)}
            alt={`${productName}, view ${activeIndex + 1} of ${images.length}`}
            className="w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          />
        </AnimatePresence>

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => goTo(activeIndex - 1)}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-background transition-colors"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => goTo(activeIndex + 1)}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-background transition-colors"
            >
              →
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3 mt-4">
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`View image ${index + 1} of ${images.length}`}
              aria-current={index === activeIndex}
              className={`w-16 h-16 rounded-clay overflow-hidden border transition-all ${
                index === activeIndex
                  ? "border-accent ring-2 ring-accent/30"
                  : "border-border opacity-60 hover:opacity-100"
              }`}
            >
              <img
                src={placeholderImage(image, 100, 100)}
                alt=""
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export { ProductGallery };
