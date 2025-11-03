import React from "react";
import { motion } from "motion/react";
import type { IconType } from "react-icons";

export interface IconItem {
  icon: IconType;
  href?: string;
  ariaLabel?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

interface FadingIconProps {
  icon: IconType;
  /** URL to navigate to when clicked (optional) */
  href?: string;
  /** Optional click handler (prevents default if used) */
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  /** Animation delay in seconds (default: 0) */
  delay?: number;
  /** Fade duration in seconds (default: 0.6) */
  duration?: number;
  /** Distance to move up during fade in px (default: 20) */
  moveDistance?: number;
  /** Icon size in pixels (default: 24) */
  size?: number;
  /** Additional CSS classes */
  className?: string;
  /** Aria label for accessibility */
  ariaLabel?: string;
}

export default function FadingIcon({
  icon: Icon,
  href,
  onClick,
  delay = 0,
  duration = 0.6,
  moveDistance = 20,
  size = 24,
  className = "",
  ariaLabel,
}: FadingIconProps) {
  const openInNewTab = !!href && !href.startsWith("mailto:") && !href.startsWith("/");

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e);
      if (e.defaultPrevented) return;
    }

    if (href?.startsWith("mailto:")) {
      e.preventDefault();
      window.location.href = href;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: moveDistance }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      whileHover={{
        scale: 1.1,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.95 }}
    >
      <a
        href={href}
        onClick={handleClick}
        target={href ? (openInNewTab ? "_blank" : "_self") : undefined}
        rel={openInNewTab ? "noopener noreferrer" : undefined}
        aria-label={ariaLabel}
        className={`inline-flex items-center justify-center text-white/70 hover:text-white transition-colors ${className}`}
      >
        <Icon size={size} />
      </a>
    </motion.div>
  );
}

interface FadingIconsGroupProps {
  /** Array of icon configurations */
  icons: IconItem[];
  /** Base delay between each icon in seconds (default: 0.1) */
  staggerDelay?: number;
  /** Initial delay before first icon in seconds (default: 0) */
  initialDelay?: number;
  /** Fade duration for all icons (default: 0.6) */
  duration?: number;
  /** Distance to move up during fade in px (default: 20) */
  moveDistance?: number;
  /** Icon size in pixels (default: 24) */
  size?: number;
  /** Gap between icons (Tailwind class, default: "gap-6") */
  gap?: string;
  /** Additional CSS classes for container */
  className?: string;
  /** Additional CSS classes for each icon (passed to each anchor) */
  iconClassName?: string;
}

/**
 * Group component for displaying multiple fading icons with staggered animation
 */
export function FadingIconsGroup({
  icons,
  staggerDelay = 0.1,
  initialDelay = 0,
  duration = 0.6,
  moveDistance = 20,
  size = 24,
  gap = "gap-6",
  className = "",
  iconClassName = "",
}: FadingIconsGroupProps) {
  return (
    <div className={`flex items-center ${gap} ${className}`}>
      {icons.map((iconConfig, index) => (
        <FadingIcon
          key={iconConfig.href ?? index}
          icon={iconConfig.icon}
          href={iconConfig.href}
          onClick={iconConfig.onClick}
          ariaLabel={iconConfig.ariaLabel}
          delay={initialDelay + index * staggerDelay}
          duration={duration}
          moveDistance={moveDistance}
          size={size}
          className={iconClassName}
        />
      ))}
    </div>
  );
}