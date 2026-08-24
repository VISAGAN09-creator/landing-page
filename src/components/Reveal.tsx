import { useEffect, useState } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variant?: 'up' | 'line';
  threshold?: number;
};

export default function Reveal({ children, className = '', delay = 0, variant = 'up', threshold = 0.2 }: Props) {
  const { ref, inView } = useScrollReveal<HTMLDivElement>({ threshold });
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const base = variant === 'line' ? 'reveal-line' : 'reveal-up';
  const state = mounted && inView ? 'is-visible' : '';

  return (
    <div
      ref={ref}
      className={`${base} ${state} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
