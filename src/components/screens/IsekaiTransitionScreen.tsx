import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSfx } from '../../hooks';

interface IsekaiTransitionScreenProps {
  onComplete: () => void;
}

const CINEMATIC_TEXTS = [
  'Di antara retakan ruang dan sisa kesadaran Bumi...',
  'Jiwa didefragmentasi, dipetakan ulang ke sistem baru...',
  'Membuka repositori takdir di bawah langit Aetheria.'
];

const BOOT_LOGS = [
  { text: '>>> INIT SOUL_TRANSIT_PROTOCOL v2.0.4-RELEASE...', type: 'header' },
  { text: '[ OK ] Earth.lnk successfully unmounted. Purging memory cache...', type: 'ok' },
  { text: '[ INFO ] Connecting to Aetheria Local Gateway (IP: 127.0.0.1:8000)...', type: 'info' },
  { text: '[ OK ] Connection established. Latency: 0.02ms.', type: 'ok' },
  { text: '[ LOAD ] Binding interface: [System Architect] -> [Magitech Engineer]...', type: 'load' },
  { text: '[ OK ] Core magic matrix initialized (Type: Null Element, RAM: 16GB).', type: 'ok' },
  { text: '[ INFO ] Allocating workshop workspace: Aeterna\'s Magitech Fix...', type: 'info' },
  { text: '[ LOAD ] Deploying soul container: Aeterna (ID: 0x7FFA8E9B)...', type: 'load' },
  { text: '>>> SYSTEM BOOT SUCCESSFUL. READY FOR DEPLOYMENT.', type: 'success' },
];

export function IsekaiTransitionScreen({ onComplete }: IsekaiTransitionScreenProps) {
  const [textIndex, setTextIndex] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [progressPercent, setProgressPercent] = useState(0);
  const [phase, setPhase] = useState<'intro' | 'booting' | 'reloading' | 'flash'>('intro');
  const { play: playSfx } = useSfx();

  useEffect(() => {
    // 1. Play magic sound effect immediately
    playSfx('/assets/audio/sfx/magic_portal.ogg');

    // 2. Cinematic Text timing
    const textTimer1 = setTimeout(() => setTextIndex(1), 2200);
    const textTimer2 = setTimeout(() => setTextIndex(2), 4600);

    // 3. Phase Transitions
    const phaseTimer1 = setTimeout(() => setPhase('booting'), 1000);
    const phaseTimer2 = setTimeout(() => setPhase('reloading'), 5800);
    const phaseTimer3 = setTimeout(() => setPhase('flash'), 7400);

    // 4. Trigger completion
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 9000);

    return () => {
      clearTimeout(textTimer1);
      clearTimeout(textTimer2);
      clearTimeout(phaseTimer1);
      clearTimeout(phaseTimer2);
      clearTimeout(phaseTimer3);
      clearTimeout(completeTimer);
    };
  }, [onComplete, playSfx]);

  // Handle typing terminal logs
  useEffect(() => {
    if (phase !== 'booting') return;

    let logIndex = 0;
    const logInterval = setInterval(() => {
      if (logIndex < BOOT_LOGS.length) {
        const item = BOOT_LOGS[logIndex]!;
        setLogs((prev) => [...prev, item.text]);
        setProgressPercent(Math.floor(((logIndex + 1) / BOOT_LOGS.length) * 100));
        
        // Play soft typing sfx for each log line
        playSfx('/assets/audio/sfx/keyboard_press.mp3');
        logIndex++;
      } else {
        clearInterval(logInterval);
      }
    }, 450);

    return () => clearInterval(logInterval);
  }, [phase, playSfx]);

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-between bg-[#030712] overflow-hidden p-8 font-mono select-none">
      {/* Background Cyber-Magic Matrix & Grid */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Dark radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.06)_0%,rgba(3,7,18,1)_80%)]" />
        
        {/* Perspective grid representing space-time warp */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #10B981 1px, transparent 1px), linear-gradient(to bottom, #10B981 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            transform: 'perspective(500px) rotateX(60deg) translateY(-30%) scale(1.5)',
          }}
        />

        {/* Floating cyber circuit circles rotating behind terminal */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.08]">
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full border border-[#10B981] border-dashed"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute w-[450px] h-[450px] rounded-full border-2 border-indigo-500 border-dotted"
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute w-[300px] h-[300px] rounded-full border border-cyan-500"
            style={{ borderImage: 'linear-gradient(to right, #06B6D4, #8B5CF6) 1' }}
            animate={{ rotate: 180 }}
            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          />
        </div>
      </div>

      {/* Top Section: Loading Progress Header */}
      <div className="w-full max-w-2xl relative z-10 flex justify-between items-center text-xs text-[#10B981]/60 border-b border-[#10B981]/20 pb-2">
        <div>SYS_REBOOT: SPIRIT_TRANSIT</div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
          <span>STATUS: DEPLOYING ({progressPercent}%)</span>
        </div>
      </div>

      {/* Middle Section: Floating Terminal + Subtitles */}
      <div className="w-full max-w-2xl flex-1 flex flex-col justify-center gap-8 relative z-10 py-6">
        {/* Magitech Defragmentation Terminal */}
        <AnimatePresence>
          {phase !== 'intro' && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="w-full bg-[#030712]/90 border border-[#10B981]/30 rounded-xl p-5 shadow-[0_0_40px_rgba(16,185,129,0.08)] backdrop-blur-md text-left flex flex-col justify-between h-72"
            >
              {/* Terminal Logs */}
              <div className="overflow-y-auto font-mono text-[11px] md:text-[12px] leading-relaxed space-y-1.5 text-[#10B981] pr-2 scrollbar-thin">
                {logs.map((log, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className={
                      log.startsWith('[ OK ]')
                        ? 'text-cyan-400 font-semibold'
                        : log.startsWith('>>>')
                        ? 'text-emerald-400 font-bold'
                        : 'text-indigo-300'
                    }
                  >
                    {log}
                  </motion.div>
                ))}
              </div>

              {/* Graphical Boot Progress Bar */}
              <div className="border-t border-[#10B981]/20 pt-4 mt-2">
                <div className="flex justify-between text-[10px] text-[#10B981]/50 mb-1">
                  <span>SECURE_BOOT_SIGNATURE: APPROVED_BY_AETHERIA_SYSTEM</span>
                  <span>{progressPercent}%</span>
                </div>
                <div className="w-full h-1.5 bg-[#10B981]/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-emerald-500 via-[#10B981] to-cyan-400"
                    style={{ width: `${progressPercent}%` }}
                    transition={{ ease: 'easeInOut' }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Subtitles Overlay */}
        <div className="h-16 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={textIndex}
              initial={{ opacity: 0, filter: 'blur(6px)', y: 10 }}
              animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              exit={{ opacity: 0, filter: 'blur(6px)', y: -10 }}
              transition={{ duration: 0.8 }}
              className="text-[#FAFAFA] font-heading text-base md:text-lg lg:text-xl font-light text-center tracking-wider max-w-xl leading-relaxed drop-shadow-[0_0_8px_rgba(250,250,250,0.3)]"
            >
              {CINEMATIC_TEXTS[textIndex]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Section: Footer Metadata */}
      <div className="w-full max-w-2xl relative z-10 flex justify-between items-center text-[10px] text-[#10B981]/40 border-t border-[#10B981]/10 pt-2">
        <span>MEM_ALLOC: OK (BLOCK_0x00FF8E)</span>
        <span>AETHERIA MAGIC ARCHITECTURE ENG_v2.0</span>
      </div>

      {/* Warp Speed Particles Flying from Center */}
      {phase !== 'intro' && (
        <div className="absolute inset-0 pointer-events-none z-0">
          {[...Array(16)].map((_, i) => {
            const angle = (i * 360) / 16 + Math.random() * 10;
            const rad = (angle * Math.PI) / 180;
            const targetX = Math.cos(rad) * 120;
            const targetY = Math.sin(rad) * 120;
            return (
              <motion.div
                key={i}
                className="absolute w-[2px] h-[15px] bg-[#10B981]/60"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: `translate(-50%, -50%) rotate(${angle + 90}deg)`,
                }}
                animate={{
                  x: [0, `${targetX}vw`],
                  y: [0, `${targetY}vh`],
                  opacity: [0, 0.8, 0],
                  scaleY: [1, 3, 1],
                }}
                transition={{
                  duration: Math.random() * 1.5 + 1.2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: 'easeIn',
                }}
              />
            );
          })}
        </div>
      )}

      {/* Extreme Supernova White Flash Transition */}
      {phase === 'flash' && (
        <motion.div
          className="absolute inset-0 bg-white z-50 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1] }}
          transition={{ duration: 1.8, times: [0, 0.7, 1], ease: 'easeInOut' }}
        />
      )}
    </div>
  );
}
