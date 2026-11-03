import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Controla um trilho com scroll horizontal nativo (scroll-snap).
 * Mantém o estado das setas sincronizado com a posição do scroll.
 */
export function useCarousel<T extends HTMLElement>(itemCount: number) {
  const trackRef = useRef<T>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const update = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const maxScroll = track.scrollWidth - track.clientWidth;
    setCanPrev(track.scrollLeft > 1);
    setCanNext(track.scrollLeft < maxScroll - 1);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    track.scrollLeft = 0;
    update();
    track.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(track);

    return () => {
      track.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, [update, itemCount]);

  /** Avança ou volta uma "página" (a largura visível do trilho). */
  const scroll = useCallback((direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * track.clientWidth, behavior: "smooth" });
  }, []);

  return {
    trackRef,
    canPrev,
    canNext,
    prev: () => scroll(-1),
    next: () => scroll(1),
  };
}
