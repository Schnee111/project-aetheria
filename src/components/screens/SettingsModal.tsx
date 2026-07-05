import { motion, AnimatePresence } from 'framer-motion';
import { X, Volume2, Gauge, Home, Globe, Eye, EyeOff } from 'lucide-react';
import { useSettingsStore, TEXT_SPEED_MS, type Language } from '../../stores/settingsStore';
import { useLocalization } from '../../hooks/useLocalization';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGoHome: () => void;
}

function VolumeControls() {
  const bgmVolume = useSettingsStore((s) => s.bgmVolume);
  const sfxVolume = useSettingsStore((s) => s.sfxVolume);
  const voiceVolume = useSettingsStore((s) => s.voiceVolume);
  const setBgmVolume = useSettingsStore((s) => s.setBgmVolume);
  const setSfxVolume = useSettingsStore((s) => s.setSfxVolume);
  const setVoiceVolume = useSettingsStore((s) => s.setVoiceVolume);

  const sliders = [
    { label: 'BGM', value: bgmVolume, setter: setBgmVolume },
    { label: 'SFX', value: sfxVolume, setter: setSfxVolume },
    { label: 'Voice', value: voiceVolume, setter: setVoiceVolume },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-[10px] font-bold text-[#8D84B8] uppercase tracking-[0.2em]">
        <Volume2 size={12} className="text-[#F5A400]" />
        <span>Volume</span>
      </div>
      <div className="space-y-3">
        {sliders.map(({ label, value, setter }) => (
          <div key={label} className="flex items-center gap-3">
            <span className="text-[10px] font-bold text-[#6B6190] uppercase tracking-widest w-10">{label}</span>
            <div className="flex-1 relative h-5 flex items-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full h-[2px] bg-white/[0.06] rounded-full" />
              </div>
              <div className="absolute inset-0 flex items-center">
                <div
                  className="h-[2px] bg-[#F5A400] rounded-full transition-all duration-100"
                  style={{ width: `${value * 100}%` }}
                />
              </div>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={value}
                onChange={(e) => setter(parseFloat(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div
                className="absolute w-2.5 h-2.5 bg-white rounded-full shadow-[0_0_8px_rgba(245,164,0,0.4)] pointer-events-none transition-all duration-100"
                style={{ left: `calc(${value * 100}% - 5px)` }}
              />
            </div>
            <span className="text-[9px] font-mono text-[#6B6190] w-7 text-right">
              {Math.round(value * 100)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TimelineToggle() {
  const showTimeline = useSettingsStore((s) => s.showTimeline);
  const setShowTimeline = useSettingsStore((s) => s.setShowTimeline);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-[10px] font-bold text-[#8D84B8] uppercase tracking-[0.2em]">
        <Eye size={12} className="text-[#F5A400]" />
        <span>Debug</span>
      </div>
      <button
        onClick={() => setShowTimeline(!showTimeline)}
        className={`w-full py-2.5 px-4 text-[10px] font-bold tracking-[0.15em] uppercase transition-all duration-200 rounded flex items-center justify-center gap-2 ${
          showTimeline
            ? 'bg-[#F5A400] text-[#08070D] shadow-[0_0_12px_rgba(245,164,0,0.25)]'
            : 'bg-white/[0.04] text-[#6B6190] hover:text-[#C8BDF0] hover:bg-white/[0.06] border border-white/[0.06]'
        }`}
      >
        {showTimeline ? <Eye size={12} /> : <EyeOff size={12} />}
        Timeline Scrubber {showTimeline ? 'ON' : 'OFF'}
      </button>
    </div>
  );
}

const textSpeedLabels: Record<Language, Record<string, string>> = {
  en: { slow: 'Slow', normal: 'Normal', fast: 'Fast', instant: 'Instant' },
  id: { slow: 'Lambat', normal: 'Normal', fast: 'Cepat', instant: 'Instan' },
};

const languageLabels: { value: Language; label: string }[] = [
  { value: 'en', label: 'EN' },
  { value: 'id', label: 'ID' },
];

export function SettingsModal({ isOpen, onClose, onGoHome }: SettingsModalProps) {
  const { textSpeed, setTextSpeed, language, setLanguage } = useSettingsStore();
  const { t } = useLocalization();

  const speeds = Object.keys(TEXT_SPEED_MS) as Array<keyof typeof TEXT_SPEED_MS>;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 z-50 bg-[#06050A]/90 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="absolute inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-[320px] max-h-[85vh] bg-[#0A0910]/95 backdrop-blur-xl border border-white/[0.06] rounded-lg overflow-hidden flex flex-col"
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              transition={{ type: 'spring', damping: 30, stiffness: 400 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.04] flex-shrink-0">
                <h3 className="text-[11px] font-bold text-[#C8BDF0] tracking-[0.3em] uppercase">
                  {t('settings.title')}
                </h3>
                <button
                  onClick={onClose}
                  className="p-1 text-[#6B6190] hover:text-white transition-colors"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Body */}
              <div className="px-4 py-3 space-y-4 overflow-y-auto flex-1 min-h-0">
                {/* Language */}
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-[#8D84B8] uppercase tracking-[0.2em]">
                    <Globe size={12} className="text-[#F5A400]" />
                    <span>{t('settings.language')}</span>
                  </div>
                  <div className="flex gap-1.5">
                    {languageLabels.map((lang) => (
                      <button
                        key={lang.value}
                        onClick={() => setLanguage(lang.value)}
                        className={`flex-1 py-2 px-3 text-[10px] font-bold tracking-[0.15em] uppercase transition-all duration-200 rounded ${
                          language === lang.value
                            ? 'bg-[#F5A400] text-[#08070D] shadow-[0_0_12px_rgba(245,164,0,0.25)]'
                            : 'bg-white/[0.04] text-[#6B6190] hover:text-[#C8BDF0] hover:bg-white/[0.06] border border-white/[0.06]'
                        }`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Separator */}
                <div className="h-px bg-white/[0.04]" />

                {/* Text Speed */}
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-[#8D84B8] uppercase tracking-[0.2em]">
                    <Gauge size={12} className="text-[#F5A400]" />
                    <span>{t('settings.textSpeed')}</span>
                  </div>
                  <div className="flex gap-1.5">
                    {speeds.map((speed) => (
                      <button
                        key={speed}
                        onClick={() => setTextSpeed(speed)}
                        className={`flex-1 py-2 px-1.5 text-[9px] font-bold tracking-[0.1em] uppercase transition-all duration-200 rounded ${
                          textSpeed === speed
                            ? 'bg-[#F5A400] text-[#08070D] shadow-[0_0_12px_rgba(245,164,0,0.25)]'
                            : 'bg-white/[0.04] text-[#6B6190] hover:text-[#C8BDF0] hover:bg-white/[0.06] border border-white/[0.06]'
                        }`}
                      >
                        {textSpeedLabels[language][speed]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Separator */}
                <div className="h-px bg-white/[0.04]" />

                {/* Volume */}
                <VolumeControls />

                {/* Separator */}
                <div className="h-px bg-white/[0.04]" />

                {/* Debug */}
                <TimelineToggle />
              </div>

              {/* Footer */}
              <div className="px-4 py-2.5 border-t border-white/[0.04] flex-shrink-0">
                <button
                  onClick={onGoHome}
                  className="w-full py-2.5 px-4 text-[10px] font-bold tracking-[0.2em] uppercase text-[#6B6190] hover:text-[#C8BDF0] bg-white/[0.03] hover:bg-white/[0.05] border border-white/[0.06] hover:border-white/[0.1] rounded transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <Home size={12} />
                  {t('settings.backToMenu')}
                </button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
