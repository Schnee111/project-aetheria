import { useEffect, useState } from 'react';
import { RotateCw } from 'lucide-react';

export function RotatePrompt() {
  const [isPortrait, setIsPortrait] = useState(false);

  useEffect(() => {
    const check = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
    };
    check();
    window.addEventListener('resize', check);
    window.addEventListener('orientationchange', () => {
      setTimeout(check, 100);
    });
    return () => {
      window.removeEventListener('resize', check);
      window.removeEventListener('orientationchange', check);
    };
  }, []);

  if (!isPortrait) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-[#06050A] flex flex-col items-center justify-center gap-6 select-none">
      <RotateCw size={48} className="text-[#F5A400] animate-[spin_2s_linear_infinite]" />
      <div className="text-center px-8">
        <h2 className="text-white text-lg font-bold tracking-[0.2em] uppercase mb-2">
          Rotate Your Device
        </h2>
        <p className="text-[#8D84B8] text-sm">
          Please rotate to landscape for the best experience.
        </p>
      </div>
    </div>
  );
}
