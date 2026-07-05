import { motion, AnimatePresence } from 'framer-motion';
import {
  getCharacterImageOffsetClass,
  getCharacterImageSizeClass,
} from './characterSizing';
import { resolveCharacterSrc } from '../../utils/assetResolver';

interface CharacterSpriteProps {
  characterId: string;
  expression: string;
  position: 'left' | 'center' | 'right';
}

const POSITION_MAP = {
  left: 'left-0 justify-center md:justify-start md:pl-[15%]',
  center: 'left-0 justify-center',
  right: 'left-0 justify-center md:justify-end md:pr-[15%]',
} as const;

export function CharacterSprite({
  characterId,
  expression,
  position,
}: CharacterSpriteProps) {
  const src = resolveCharacterSrc(characterId, expression);
  const imageSizeClass = getCharacterImageSizeClass(characterId);
  const imageOffsetClass = getCharacterImageOffsetClass(characterId);

  return (
    <div
      className={`absolute bottom-[5.75rem] sm:bottom-[6.25rem] md:bottom-0 z-10 flex w-full items-end ${POSITION_MAP[position]} pointer-events-none`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={`${characterId}-${expression}`}
          className="pointer-events-none origin-bottom"
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
            filter: 'brightness(1)',
          }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <img
            src={src}
            alt=""
            className={`${imageSizeClass} max-w-none object-contain object-bottom ${imageOffsetClass} drop-shadow-2xl`}
            style={{
              maskImage: 'linear-gradient(to bottom, black 82%, transparent 98%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 82%, transparent 98%)',
            }}
            draggable={false}
            onError={(e) => {
              const target = e.currentTarget;
              const fallbackSrc = resolveCharacterSrc(characterId, 'neutral');
              const fallbackUrl = new URL(fallbackSrc, window.location.href).href;
              if (target.currentSrc !== fallbackUrl && target.src !== fallbackUrl) {
                target.src = fallbackSrc;
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
