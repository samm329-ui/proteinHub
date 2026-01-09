"use client";

import React, { useRef, useEffect, useState } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

const TOTAL_FRAMES = 40;

const framePath = (frame: number) => `/protein-sequence/frame_${String(frame).padStart(3, '0')}.png`;

const preloadImages = (frameCount: number): Promise<HTMLImageElement[]> => {
  const promises = [];
  for (let i = 0; i < frameCount; i++) {
    promises.push(new Promise((resolve, reject) => {
      const img = new Image();
      img.src = framePath(i);
      img.onload = () => resolve(img);
      img.onerror = reject;
    }));
  }
  return Promise.all(promises as Promise<HTMLImageElement>[]);
};

const lerp = (start: number, end: number, amt: number) => (1 - amt) * start + amt * end;

export default function ProteinScroll() {
  const [isLoading, setIsLoading] = useState(true);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start start', 'end end'],
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, TOTAL_FRAMES - 1]);
  const animatedFrameIndex = useRef(0);

  useEffect(() => {
    preloadImages(TOTAL_FRAMES)
      .then(setImages)
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (isLoading || !images.length) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d', { willReadFrequently: false });
    if (!context) return;

    let animationFrameId: number;

    const render = () => {
      const currentScrollFrame = frameIndex.get();
      animatedFrameIndex.current = lerp(animatedFrameIndex.current, currentScrollFrame, 0.05);
      
      const frameToDraw = Math.round(animatedFrameIndex.current);
      const img = images[frameToDraw];

      if (img) {
        scaleImageToCanvas(canvas, context, img);
      }

      animationFrameId = requestAnimationFrame(render);
    };
    
    const handleResize = () => {
      const frameToDraw = Math.round(animatedFrameIndex.current);
      const img = images[frameToDraw];
      if (canvas && context && img) {
        scaleImageToCanvas(canvas, context, img);
      }
    };

    window.addEventListener('resize', handleResize);
    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isLoading, images, frameIndex]);

  const scaleImageToCanvas = (
    canvas: HTMLCanvasElement, 
    ctx: CanvasRenderingContext2D, 
    img: HTMLImageElement
  ) => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const hRatio = canvas.width / img.width;
    const vRatio = canvas.height / img.height;
    const ratio = Math.min(hRatio, vRatio, 1.5);

    const centerShiftX = (canvas.width - img.width * ratio) / 2;
    const centerShiftY = (canvas.height - img.height * ratio) / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, img.width, img.height, centerShiftX, centerShiftY, img.width * ratio, img.height * ratio);
  }

  const opacityText1 = useTransform(scrollYProgress, [0, 0.1, 0.25], [1, 1, 0]);
  const opacityText2 = useTransform(scrollYProgress, [0.25, 0.3, 0.55], [0, 1, 0]);
  const opacityText3 = useTransform(scrollYProgress, [0.55, 0.6, 0.85], [0, 1, 0]);
  const opacityText4 = useTransform(scrollYProgress, [0.85, 0.9, 1], [0, 1, 1]);

  return (
    <div ref={scrollRef} className="relative h-[400vh] w-full">
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/20 border-t-white"></div>
        </div>
      )}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
        
        <div className="pointer-events-none absolute inset-0 z-10">
            <motion.div style={{ opacity: opacityText1 }} className="flex h-full flex-col items-center justify-center space-y-4 text-center">
                <h1 className="text-5xl font-bold text-white/90 md:text-7xl">Protein Zone</h1>
                <p className="text-xl text-white/60 md:text-2xl">Fuel Your Strength</p>
            </motion.div>
            
            <motion.div style={{ opacity: opacityText2 }} className="flex h-full w-full items-center justify-start px-8 md:px-24">
                <h2 className="text-4xl font-semibold text-white/90 md:text-6xl">Ultra-Clean Formula</h2>
            </motion.div>

            <motion.div style={{ opacity: opacityText3 }} className="flex h-full w-full items-center justify-end px-8 text-right md:px-24">
                <div>
                    <h2 className="text-4xl font-semibold text-white/90 md:text-6xl">High Protein.</h2>
                    <h2 className="text-4xl font-semibold text-white/90 md:text-6xl">Zero Compromise.</h2>
                </div>
            </motion.div>

            <motion.div style={{ opacity: opacityText4 }} className="flex h-full flex-col items-center justify-center space-y-4 text-center">
                <h2 className="text-4xl font-semibold text-white/90 md:text-6xl">Build Muscle. Recover Faster.</h2>
            </motion.div>
        </div>
      </div>
    </div>
  );
}
