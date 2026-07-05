import { motion, AnimatePresence } from 'framer-motion';
import { isVideoAsset } from '../../utils/assetResolver';

interface BackgroundProps {
  src: string;
  alt?: string;
}

export function Background({ src, alt = 'Background' }: BackgroundProps) {
  const isVideo = isVideoAsset(src);

  return (
    <AnimatePresence>
      <motion.div
        key={src}
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {isVideo ? (
          <video
            src={src}
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          />
        ) : (
          <motion.img
            src={src}
            alt={alt}
            className="w-full h-full object-cover"
            draggable={false}
            loading="eager"
            initial={{ scale: 1 }}
            animate={{ scale: 1.05 }}
            transition={{ duration: 15, ease: 'linear' }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 via-transparent to-navy-900/30" />
      </motion.div>
    </AnimatePresence>
  );
}
