import { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ChevronRight, Play } from 'lucide-react';
import { useSfx } from '../../hooks';

interface LandingScreenProps {
  hasSave: boolean;
  onStart: () => void;
  onContinue: () => void;
}

function RainOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrame = 0;
    let width = 0;
    let height = 0;
    const drops = Array.from({ length: 110 }, () => ({
      x: Math.random(),
      y: Math.random(),
      length: 18 + Math.random() * 26,
      speed: 5.5 + Math.random() * 4.5,
      opacity: 0.04 + Math.random() * 0.08,
    }));

    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = 1;

      for (const drop of drops) {
        const x = drop.x * width;
        const y = drop.y * height;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x - 1.2, y + drop.length);
        ctx.strokeStyle = `rgba(190, 210, 255, ${drop.opacity})`;
        ctx.stroke();

        drop.y += drop.speed / Math.max(height, 1);
        if (drop.y > 1.08) {
          drop.y = -0.08;
          drop.x = Math.random();
        }
      }

      animationFrame = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-[3] opacity-80"
    />
  );
}

function AmbientGlow() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[2] overflow-hidden">
      <div className="absolute -left-28 bottom-[-12%] h-[540px] w-[540px] rounded-full bg-[#F5A400]/[0.07] blur-[90px]" />
      <div className="absolute right-[8%] top-[12%] h-[520px] w-[520px] rounded-full bg-[#708EFF]/[0.045] blur-[110px]" />
      <div className="absolute right-[16%] bottom-[8%] h-[360px] w-[360px] rounded-full bg-[#EC4899]/[0.035] blur-[80px]" />
    </div>
  );
}

export function LandingScreen({ hasSave, onStart, onContinue }: LandingScreenProps) {
  const { play: playSfx } = useSfx();

  const [isLoading, setIsLoading] = useState(false);

  const preloadInitialAssets = async () => {
    try {
      await Promise.all([
        fetch('/assets/audio/sfx/rain-no-window.mp3'),
        fetch('/assets/audio/voice/chapter-1/scene-00/CH1_S00_D001.mp3'),
        fetch('/assets/backgrounds/ch1/bg_ch1_s00_aetheria_street.webp')
      ]);
    } catch (e) {
      console.warn('Initial preload failed', e);
    }
  };

  const handleStart = async () => {
    playSfx('/assets/audio/sfx/sfx_click.ogg');
    setIsLoading(true);
    await preloadInitialAssets();
    setIsLoading(false);
    onStart();
  };

  const handleContinue = async () => {
    playSfx('/assets/audio/sfx/sfx_click.ogg');
    setIsLoading(true);
    await preloadInitialAssets();
    setIsLoading(false);
    onContinue();
  };

  return (
    <div className="absolute inset-0 select-none overflow-hidden bg-[#06050A] font-body text-[#F8F4FF] antialiased">
      <motion.img
        src="/assets/backgrounds/ch1/bg_landing_aetheria_workshop.webp"
        alt=""
        className="absolute inset-0 z-0 h-full w-full object-cover object-center"
        draggable={false}
        initial={{ opacity: 0, scale: 1.035 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
      />

      <div className="absolute inset-0 z-[1] bg-[linear-gradient(90deg,rgba(6,5,10,0.82)_0%,rgba(6,5,10,0.7)_26%,rgba(6,5,10,0.34)_50%,rgba(6,5,10,0.03)_100%)]" />
      <div className="absolute inset-0 z-[1] bg-[linear-gradient(0deg,rgba(6,5,10,0.58)_0%,rgba(6,5,10,0.04)_38%,rgba(6,5,10,0.16)_100%)]" />

      <AmbientGlow />
      <RainOverlay />

      <main
        className="absolute z-10"
        style={{
          left: 'clamp(84px, 13vw, 240px)',
          top: '50%',
          transform: 'translateY(-50%)',
          width: 'min(560px, calc(100vw - 116px))',
        }}
      >
        <motion.div
          className="flex w-full max-w-[560px] flex-col"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="mb-6 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.28em] text-[#C8BDF0]">
            <BookOpen size={14} className="text-[#F5A400]" />
            Interactive Novel
          </div>

          <h1
            className="font-heading font-medium text-white"
            style={{
              fontSize: 'clamp(54px, 7vw, 96px)',
              lineHeight: 1,
              textShadow: '0 16px 44px rgba(0,0,0,0.62)',
            }}
          >
            <span className="block">Project</span>
            <span className="block text-[#F5A400]">Aetheria</span>
          </h1>

          <p className="mt-8 max-w-md text-[15px] font-medium leading-7 text-[#BEB5D7]">
            A story whispered through rain and starlight—where the hum of forgotten machinery
            carries echoes of a promise yet kept.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-[10px] font-black uppercase tracking-[0.22em] text-[#8D84B8]">
            <span>Fantasy</span>
            <span className="text-[#F5A400]/70">/</span>
            <span>Magitech</span>
            <span className="text-[#F5A400]/70">/</span>
            <span>Melancholy</span>
            <span className="text-[#F5A400]/70">/</span>
            <span>Story-Rich</span>
          </div>

          <nav className="mt-10 flex w-[300px] max-w-full flex-col gap-3">
            <TitleButton primary onClick={handleStart} disabled={isLoading}>
              <span className="flex items-center gap-3">
                <Play size={17} fill="currentColor" />
                {isLoading ? 'Loading...' : 'Start'}
              </span>
            </TitleButton>

            {hasSave && (
              <TitleButton onClick={handleContinue} disabled={isLoading}>
                <span className="flex items-center gap-3">
                  <BookOpen size={17} />
                  {isLoading ? 'Loading...' : 'Continue'}
                </span>
              </TitleButton>
            )}
          </nav>
        </motion.div>
      </main>
    </div>
  );
}

interface TitleButtonProps {
  children: ReactNode;
  onClick: () => void;
  primary?: boolean;
  disabled?: boolean;
}

function TitleButton({ children, onClick, primary = false, disabled = false }: TitleButtonProps) {
  if (primary) {
    return (
      <motion.button
        onClick={onClick}
        disabled={disabled}
        className={`flex h-12 w-full items-center justify-between rounded-md bg-[#F5A400] px-5 text-sm font-black uppercase tracking-[0.14em] text-[#08070D] shadow-[0_14px_34px_rgba(245,164,0,0.25)] transition-colors hover:bg-[#FFC247] ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        whileHover={disabled ? {} : { x: 3 }}
        whileTap={disabled ? {} : { scale: 0.98 }}
      >
        {children}
        <ChevronRight size={18} />
      </motion.button>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`flex h-12 w-full items-center justify-between rounded-md bg-white/[0.08] px-5 text-sm font-black uppercase tracking-[0.14em] text-[#F8F4FF] backdrop-blur-sm transition-colors hover:bg-white/[0.13] ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      whileHover={disabled ? {} : { x: 3 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
    >
      {children}
      <ChevronRight size={18} className="text-[#A78BFA]" />
    </motion.button>
  );
}
