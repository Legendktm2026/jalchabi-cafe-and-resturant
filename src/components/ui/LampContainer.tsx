import React from 'react';
import { motion } from 'motion/react';

interface LampContainerProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

export const LampContainer: React.FC<LampContainerProps> = ({
  children,
  className = '',
  glowColor = '#dfb86c',
}) => {
  return (
    <div
      className={`relative flex min-h-[380px] md:min-h-[460px] flex-col items-center justify-center overflow-hidden bg-[#070e0c] w-full z-0 ${className}`}
    >
      <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0 overflow-hidden">
        {/* Left Conical Light Beam */}
        <motion.div
          initial={{ opacity: 0.5, width: '15rem' }}
          whileInView={{ opacity: 1, width: '30rem' }}
          transition={{
            delay: 0.1,
            duration: 0.9,
            ease: 'easeInOut',
          }}
          viewport={{ once: true }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto right-1/2 h-56 overflow-visible w-[30rem] bg-gradient-conic from-[#dfb86c] via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
        >
          <div className="absolute w-[100%] left-0 bg-[#070e0c] h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute w-40 h-[100%] left-0 bg-[#070e0c] bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>

        {/* Right Conical Light Beam */}
        <motion.div
          initial={{ opacity: 0.5, width: '15rem' }}
          whileInView={{ opacity: 1, width: '30rem' }}
          transition={{
            delay: 0.1,
            duration: 0.9,
            ease: 'easeInOut',
          }}
          viewport={{ once: true }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto left-1/2 h-56 w-[30rem] bg-gradient-conic from-transparent via-transparent to-[#dfb86c] text-white [--conic-position:from_290deg_at_center_top]"
        >
          <div className="absolute w-40 h-[100%] right-0 bg-[#070e0c] bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute w-[100%] right-0 bg-[#070e0c] h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>

        {/* Center Top Ambient Mask */}
        <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-[#070e0c] blur-2xl" />
        <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md" />

        {/* Glowing Conical Ambient Orb */}
        <div
          className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full opacity-40 blur-3xl"
          style={{ backgroundColor: glowColor }}
        />

        {/* Core Glowing Lamp Bulb Bar */}
        <motion.div
          initial={{ width: '8rem' }}
          whileInView={{ width: '16rem' }}
          transition={{
            delay: 0.1,
            duration: 0.9,
            ease: 'easeInOut',
          }}
          viewport={{ once: true }}
          className="absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full bg-[#e5c378] blur-2xl"
        />

        {/* Horizontal Laser Line Accent */}
        <motion.div
          initial={{ width: '15rem' }}
          whileInView={{ width: '30rem' }}
          transition={{
            delay: 0.1,
            duration: 0.9,
            ease: 'easeInOut',
          }}
          viewport={{ once: true }}
          className="absolute inset-auto z-50 h-0.5 w-[30rem] -translate-y-[7rem] bg-gradient-to-r from-transparent via-[#dfb86c] to-transparent shadow-[0_0_20px_#dfb86c]"
        />

        <div className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-[#070e0c]" />
      </div>

      {/* Content Placed Directly Beneath the Light */}
      <div className="relative z-50 flex -translate-y-20 flex-col items-center px-5 text-center">
        {children}
      </div>
    </div>
  );
};
