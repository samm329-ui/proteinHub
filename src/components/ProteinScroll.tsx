
"use client";

import React, { useRef, useEffect, useState } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const TOTAL_FRAMES = 40;

const framePath = (frame: number) =>
  `https://xizgjjkyqpzyuwxcgcuk.supabase.co/storage/v1/object/public/asset/png/ezgif-frame-${(
    frame + 1
  )
    .toString()
    .padStart(3, '0')}.jpg`;


const preloadImages = (frameCount: number): Promise<HTMLImageElement[]> => {
  const promises = [];
  for (let i = 0; i < frameCount; i++) {
    promises.push(new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous"; // Required for canvas with external images
      img.src = framePath(i);
      img.onload = () => resolve(img);
      img.onerror = (e) => reject(`Failed to load image: ${framePath(i)}`);
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
      .catch((error) => {
        console.error("Error preloading images:", error);
      })
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (isLoading || !images.length) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d', { willReadFrequently: true });
    if (!context) return;

    let animationFrameId: number;

    const render = () => {
      const currentScrollFrame = frameIndex.get();
      animatedFrameIndex.current = lerp(animatedFrameIndex.current, currentScrollFrame, 0.1);
      
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
    const ratio = Math.max(hRatio, vRatio);

    const centerShiftX = (canvas.width - img.width * ratio) / 2;
    const centerShiftY = (canvas.height - img.height * ratio) / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, img.width, img.height, centerShiftX, centerShiftY, img.width * ratio, img.height * ratio);
  }

  const opacityText1 = useTransform(scrollYProgress, [0, 0.05, 0.2], [1, 1, 0]);
  const saturation = useTransform(scrollYProgress, [0, 0.8, 1], [0, 1, 1]);
  const blur = useTransform(scrollYProgress, [0.28, 0.33, 0.9, 1], [0, 0, 0, 0]);
  
  const smokeOpacity = useTransform(scrollYProgress, [0.2, 0.25, 1], [0, 0.6, 0.6]);
  const smokeX = useTransform(scrollYProgress, [0.2, 1], ['-100%', '100%']);
  const textOpacityPrimary = useTransform(scrollYProgress, [0.28, 0.33, 1], [0, 1, 1]);
  const textOpacitySecondary = useTransform(scrollYProgress, [0.34, 0.38, 1], [0, 1, 1]);
  const buttonOpacity = useTransform(scrollYProgress, [0.4, 0.45, 1], [0, 1, 1]);

  return (
    <div ref={scrollRef} className="relative h-[400vh] w-full">
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/20 border-t-white"></div>
        </div>
      )}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <motion.canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
          style={{ filter: useTransform(
            [saturation, blur],
            ([s, b]) => `saturate(${s}) blur(${b}px)`
          ) }}
        />
        <div className="absolute inset-0 z-0 bg-black/40"></div>
        <div 
          className="absolute inset-0 z-1"
          style={{
            background: 'radial-gradient(ellipse at bottom right, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 50%)'
          }}
        />
        <div 
          className="absolute inset-0 z-1"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(0,0,0,0) 40%, rgba(0,0,0,0.7) 100%)'
          }}
        />
        
        <div className="absolute inset-0 z-10 text-white/90">
            <motion.div style={{ opacity: opacityText1 }} className="flex h-full flex-col items-center justify-end pb-32 space-y-4 text-center">
                <h1 className="text-5xl font-bold text-white md:text-7xl font-headline">Protein Zone</h1>
                <p className="text-lg text-white/80 md:text-xl font-body" style={{fontFamily: "'Montserrat', sans-serif", fontWeight: 500}}>Fuel Your Strength</p>
            </motion.div>

            <motion.div 
              className="absolute inset-0 flex items-center justify-center"
              suppressHydrationWarning
            >
              <motion.div 
                className="absolute inset-0"
                style={{
                  opacity: smokeOpacity,
                  background: 'radial-gradient(ellipse at bottom right, rgba(20,20,20,0.7) 0%, rgba(15,15,15,0) 70%)',
                  filter: 'blur(40px)',
                  transform: 'translateY(10%)'
                }}
              />
              <div className="relative w-full max-w-3xl px-8 text-left">
                <motion.h2 style={{ opacity: textOpacityPrimary }} className="text-4xl font-semibold md:text-6xl font-headline text-white/90">
                  Strength is built.<br/>Not borrowed.
                </motion.h2>
                <motion.p style={{ opacity: textOpacitySecondary }} className="mt-4 text-lg text-white/60 md:text-xl">
                  What you feed your body decides how far it goes.
                </motion.p>
                <motion.div style={{ opacity: buttonOpacity }} className="mt-8">
                  <Button
                    suppressHydrationWarning
                    variant="outline"
                    className="border-white/25 bg-transparent text-white/75 hover:bg-white/10 hover:text-white transition-all duration-300"
                  >
                    Fuel Your Body
                  </Button>
                </motion.div>
              </div>
            </motion.div>
        </div>
      </div>
    </div>
  );
}
