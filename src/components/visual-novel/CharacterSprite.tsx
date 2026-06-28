import { motion, AnimatePresence } from 'framer-motion';

interface CharacterSpriteProps {
  characterId: string;
  expression: string;
  position: 'left' | 'center' | 'right';
  isActive?: boolean;
}

const POSITION_MAP = {
  left: 'left-[10%] md:left-[15%]',
  center: 'left-1/2 -translate-x-1/2',
  right: 'right-[10%] md:right-[15%]',
} as const;

export function CharacterSprite({
  characterId,
  expression,
  position,
  isActive = true,
}: CharacterSpriteProps) {
  const src = `/assets/characters/${characterId}/${characterId}_${expression}.png`;

  return (
    <div className={`absolute bottom-0 z-10 ${POSITION_MAP[position]} pointer-events-none`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={`${characterId}-${expression}`}
          className="pointer-events-none origin-bottom"
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: isActive ? 1 : 0.5,
            y: 0,
            filter: isActive ? 'brightness(1)' : 'brightness(0.6)',
          }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <img
            src={src}
            alt=""
            className="h-[95vh] max-h-[950px] w-auto object-contain object-bottom translate-y-[12%] drop-shadow-2xl"
            style={{
              maskImage: 'linear-gradient(to bottom, black 78%, transparent 95%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 78%, transparent 95%)',
            }}
            draggable={false}
            onError={(e) => {
              const target = e.currentTarget;
              if (!target.src.endsWith('_neutral.png')) {
                target.src = `/assets/characters/${characterId}/${characterId}_neutral.png`;
              } else {
                target.style.display = 'none';
              }
            }}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
