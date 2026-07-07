import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSettingsStore } from '../../stores';

interface DisclaimerScreenProps {
  onComplete: () => void;
}

export function DisclaimerScreen({ onComplete }: DisclaimerScreenProps) {
  const language = useSettingsStore((s) => s.language);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Show the "Click to continue" prompt after 4 seconds to give them time to read
    const timer = setTimeout(() => {
      setShowPrompt(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className="absolute inset-0 z-50 flex items-center justify-center bg-[#06050A] font-body cursor-pointer"
      onClick={onComplete}
    >
      <motion.div
        className="flex max-w-2xl flex-col items-center gap-6 px-8 text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <div className="text-[11px] font-black uppercase tracking-[0.28em] text-[#F5A400]">
          {language === 'id' ? 'Catatan Pengalaman Bermain' : 'Experience Notice'}
        </div>
        
        <p className="text-base font-medium leading-relaxed text-[#BEB5D7] md:text-lg">
          {language === 'id' 
            ? 'Khusus pada Chapter 1 ini, keseluruhan cerita akan berjalan secara penuh otomatis layaknya sebuah video sinematik.'
            : 'Specifically for Chapter 1, the entire story will run fully automatically like a cinematic video.'}
        </p>
        
        <p className="text-sm font-normal leading-relaxed text-[#8D84B8] md:text-base">
          {language === 'id'
            ? 'Lepaskan tanganmu dari layar. Duduklah dengan santai, pasang volume terbaikmu, dan nikmati pertunjukannya. Kamu tidak perlu melakukan interaksi apapun kecuali saat diperhadapkan pada pilihan cerita.'
            : 'Take your hands off the screen. Sit back, turn up your volume, and enjoy the show. You do not need to interact at all unless presented with a story choice.'}
        </p>
      </motion.div>

      <AnimatePresence>
        {showPrompt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute bottom-12 text-[11px] uppercase tracking-[0.2em] text-[#8D84B8] animate-pulse"
          >
            {language === 'id' ? '- Klik di mana saja untuk memulai -' : '- Click anywhere to begin -'}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
