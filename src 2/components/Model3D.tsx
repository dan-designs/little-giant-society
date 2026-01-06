import React, { useEffect, useRef } from 'react';

interface Model3DProps {
  src: string;
  alt: string;
}

const Model3D: React.FC<Model3DProps> = ({ src, alt }) => {
  const viewerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const modelViewer = viewerRef.current;
    if (!modelViewer) return;

    // === CONFIGURATION (Derived from User Script) ===
    const maxRotation = 50;
    const easeFactor = 0.05;
    const resetEaseFactor = 0.02;
    const idleRotationSpeed = 0.0;
    const momentumDecay = 0.93;
    const idleDelay = 1000000000000; // Effectively disabled idle
    const idleOrbitLimit = 0;
    const defaultPosition = { x: 45, y: 75 };
    
    // State variables
    let target = { ...defaultPosition };
    let current = { ...defaultPosition };
    let velocity = { x: 0, y: 0 };
    let isHovering = false;
    let lastInputTime = Date.now();
    let isVisible = true;
    let idleDirection = 1;
    let animationFrameId: number;

    const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

    const handleMouseEnter = () => { isHovering = true; };
    const handleMouseLeave = () => {
      isHovering = false;
      target = { ...defaultPosition };
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!isHovering || !isVisible) return;

      const x = ((event.clientX / window.innerWidth) - 0.5) * 2;
      const y = ((event.clientY / window.innerHeight) - 0.5) * 2;

      target.x = clamp(defaultPosition.x + (x * maxRotation), defaultPosition.x - maxRotation, defaultPosition.x + maxRotation);
      target.y = clamp(defaultPosition.y + (-y * maxRotation), defaultPosition.y - maxRotation, defaultPosition.y + maxRotation);
      lastInputTime = Date.now();
    };

    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };

    // Animation Loop
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const ease = isHovering ? easeFactor : resetEaseFactor;

      // Idle logic (active only if idleDelay is reached, effectively disabled by high value)
      if (!isHovering && Date.now() - lastInputTime > idleDelay) {
         target.x += idleRotationSpeed * idleDirection;

          if (target.x >= defaultPosition.x + idleOrbitLimit) {
            target.x = defaultPosition.x + idleOrbitLimit;
            idleDirection = -1;
          } else if (target.x <= defaultPosition.x - idleOrbitLimit) {
            target.x = defaultPosition.x - idleOrbitLimit;
            idleDirection = 1;
          }
          target.y = defaultPosition.y;
      }

      velocity.x += (target.x - current.x) * ease;
      velocity.y += (target.y - current.y) * ease;

      velocity.x *= momentumDecay;
      velocity.y *= momentumDecay;

      current.x += velocity.x;
      current.y += velocity.y;

      // Update attributes safely
      // @ts-ignore
      if (modelViewer) {
         modelViewer.setAttribute('camera-orbit', `${current.x.toFixed(2)}deg ${current.y.toFixed(2)}deg auto`);
      }
    };

    // Attach Listeners
    modelViewer.addEventListener('mouseenter', handleMouseEnter);
    modelViewer.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Start loop
    animate();

    return () => {
      // Cleanup
      if (modelViewer) {
          modelViewer.removeEventListener('mouseenter', handleMouseEnter);
          modelViewer.removeEventListener('mouseleave', handleMouseLeave);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    // @ts-ignore
    <model-viewer
      ref={viewerRef}
      src={src}
      alt={alt}
      auto-rotate="false"
      camera-controls
      disable-zoom
      interaction-prompt="none"
      style={{ 
        width: '100%', 
        height: '100%', 
        backgroundColor: 'transparent',
        '--poster-color': 'transparent' 
      } as React.CSSProperties}
      camera-orbit="45deg 75deg auto"
    >
    {/* @ts-ignore */}
    </model-viewer>
  );
};

export default Model3D;