import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Button } from "@/components/ui/button"; // For optional Prev/Next buttons
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselProps {
  slides: React.ReactNode[]; // Array of React nodes to be rendered as slides
  options?: Parameters<typeof useEmblaCarousel>[0];
  showArrows?: boolean;
  autoplayDelay?: number;
}

const Carousel: React.FC<CarouselProps> = ({
  slides,
  options = { loop: true },
  showArrows = true,
  autoplayDelay = 4000,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay({ delay: autoplayDelay, stopOnInteraction: false })]);

  console.log("Rendering Carousel with", slides.length, "slides.");

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  if (!slides || slides.length === 0) {
    return <div className="text-center p-4">No slides to display.</div>;
  }

  return (
    <div className="relative overflow-hidden" ref={emblaRef}>
      <div className="flex">
        {slides.map((slide, index) => (
          <div className="flex-[0_0_100%] min-w-0" key={index}>
            {slide}
          </div>
        ))}
      </div>

      {showArrows && emblaApi && (
        <>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 rounded-full opacity-75 hover:opacity-100"
            onClick={scrollPrev}
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 rounded-full opacity-75 hover:opacity-100"
            onClick={scrollNext}
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </>
      )}
      {/* Optional: Add dot indicators here */}
    </div>
  );
};
export default Carousel;