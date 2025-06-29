'use client';

import { useEffect, useRef, useState } from 'react';

export default function ScrollSection({ children, id, className = '' }) {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            setIsLeaving(false);
          } else {
            // Check if the section is leaving the viewport
            const rect = entry.boundingClientRect;
            if (rect.top > 0) {
              // Section is going up (leaving from bottom)
              setIsLeaving(true);
            } else {
              // Section is going down (leaving from top)
              setIsLeaving(true);
            }
            // Keep visible for a moment before hiding
            setTimeout(() => {
              if (!entry.isIntersecting) {
                setIsVisible(false);
              }
            }, 300);
          }
        });
      },
      {
        threshold: 0.3, // Trigger when 30% of section is visible
        rootMargin: '-10% 0px -10% 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const getAnimationClasses = () => {
    if (!isVisible) {
      return 'opacity-0 translate-y-20 scale-95';
    }
    if (isLeaving) {
      return 'opacity-50 translate-y-10 scale-98';
    }
    return 'opacity-100 translate-y-0 scale-100';
  };

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`${className} transition-all duration-1000 ease-out transform ${getAnimationClasses()}`}
    >
      {children}
    </section>
  );
} 