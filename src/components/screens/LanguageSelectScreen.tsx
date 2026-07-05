import { motion } from 'framer-motion';
import { Globe, ChevronRight } from 'lucide-react';
import type { Language } from '../../stores/settingsStore';

interface LanguageSelectScreenProps {
  onSelect: (lang: Language) => void;
}

const languages: { value: Language; label: string; sub: string }[] = [
  { value: 'en', label: 'English', sub: 'Play in English' },
  { value: 'id', label: 'Indonesia', sub: 'Main dalam Bahasa Indonesia' },
];

export function LanguageSelectScreen({ onSelect }: LanguageSelectScreenProps) {
  return (
    <div className="absolute inset-0 select-none overflow-hidden bg-[#06050A] font-body text-[#F8F4FF] antialiased">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-[#F5A400]/[0.04] blur-[120px]" />
      </div>

      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center">
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="mb-6 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.28em] text-[#8D84B8]">
            <Globe size={14} className="text-[#F5A400]" />
            Select Language
          </div>

          <h2
            className="font-heading font-medium text-white mb-10"
            style={{
              fontSize: 'clamp(28px, 4vw, 42px)',
              lineHeight: 1.2,
              textShadow: '0 8px 32px rgba(0,0,0,0.5)',
            }}
          >
            Choose Your Language
          </h2>

          <div className="flex flex-col gap-3 w-[280px] max-w-full">
            {languages.map((lang, i) => (
              <motion.button
                key={lang.value}
                onClick={() => onSelect(lang.value)}
                className="flex h-14 w-full items-center justify-between rounded-md bg-white/[0.06] px-5 text-sm font-black uppercase tracking-[0.14em] text-[#F8F4FF] backdrop-blur-sm transition-colors hover:bg-white/[0.1] border border-white/[0.06] hover:border-[#F5A400]/30"
                whileHover={{ x: 3 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex flex-col items-start">
                  <span className="text-[15px] font-bold">{lang.label}</span>
                  <span className="text-[10px] font-normal normal-case tracking-normal text-[#6B6190]">{lang.sub}</span>
                </div>
                <ChevronRight size={18} className="text-[#A78BFA]" />
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
