import { useEffect, useRef, useState } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

type Props = {
  src: string;
  alt: string;
  className?: string;
  parallax?: number;
  delay?: number;
};

export default function ImageReveal({ src, alt, className = '', parallax = 0, delay = 0 }: Props) {
  const { ref, inView } = useScrollReveal<HTMLDivElement>({ threshold: 0.15 });
  const imgRef = useRef<HTMLImageElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (parallax === 0) return;
    let raf = 0;
    const onScroll = () => {
      raf = requestAnimationFrame(() => {
        const node = ref.current;
        if (!node) return;
        const rect = node.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const dist = (window.innerHeight / 2 - center) / window.innerHeight;
        setOffset(dist * parallax);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [parallax, ref]);

  return (
    <div ref={ref} className={`image-reveal ${inView ? 'is-visible' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading="eager"
        style={{ transform: `translateY(${offset}px) scale(${inView ? 1 : 1.05})` }}
      />
    </div>
  );
}
