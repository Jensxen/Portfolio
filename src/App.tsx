import DarkVeil from "./components/DarkVeil";
import { FadingIconsGroup } from "@/components/FadingIcons";
import TargetCursor from "@/components/TargetCursor";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiMail } from "react-icons/hi";
import { useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/lib/hooks";
import { Analytics } from "@vercel/analytics/react"


export default function App() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const isMobile = useIsMobile();

  const [allowed, setAllowed] = useState<boolean | null>(null);
  useEffect(() => {
    const p =
      typeof window !== "undefined"
        ? window.location.pathname.replace(/\/+$/, "")
        : "";
    setAllowed(p === "/personal");
  }, []);

  if (allowed === null) return null;

  const socialIcons = [
    {
      icon: FaGithub,
      href: allowed ? "https://github.com/Jensxen" : "#",
      ariaLabel: allowed ? "Jensxen Git" : "GitHub (placeholder)",
    },
    {
      icon: FaLinkedin,
      href: allowed ? "https://www.linkedin.com/in/marcus-a-jensen" : "#",
      ariaLabel: allowed ? "LinkedIn" : "LinkedIn (placeholder)",
    },
    {
      icon: HiMail,
      href: allowed ? "mailto:marcusjensen.privat@gmail.com" : "#",
      ariaLabel: allowed ? "Contact me" : "Contact (placeholder)",
    },
  ];

  return (
    <div
      ref={scrollRef}
      className="relative w-screen overflow-auto overflow-x-hidden bg-black"
      style={{
        // Three-value fallback chain for max Safari compatibility:
        // 1. 100vh  — universal baseline
        // 2. -webkit-fill-available — iOS Safari 12-14 (pre-dvh)
        // 3. 100dvh — modern: excludes collapsible browser chrome
        minHeight: "100vh",
        // @ts-expect-error — non-standard but required for older Safari
        WebkitMinHeight: "-webkit-fill-available",
      }}
    >
      <TargetCursor
        targetSelector=".cursor-target"
        spinDuration={3}
        hideDefaultCursor={true}
      />

      {/* Logo — offset by safe-area-inset-top so it clears the notch */}
      <a
        href="/"
        className="fixed z-20 cursor-target flex items-center justify-center"
        aria-label="Home logo"
        style={{
          top: "max(1rem, calc(env(safe-area-inset-top) + 0.5rem))",
          left: "max(1rem, calc(env(safe-area-inset-left) + 0.5rem))",
        }}
      >
        <svg
          viewBox="0 0 964.25709 743.22518"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Logo"
          style={{
            filter: "brightness(1)",
            width: isMobile ? "48px" : "60px",
            height: isMobile ? "37px" : "46px",
          }}
        >
          <polygon
            fill="#fff"
            points="964.25709 0 964.25709 180.7845 824.03804 180.7845 613.12137 391.69976 783.86066 562.44068 964.25709 562.44068 964.25709 743.22518 703.5059 743.22518 141.0226 180.7845 0 180.7845 0 0 221.37736 0 482.53032 261.11861 743.68328 0 964.25709 0"
          />
          <polygon
            fill="#fff"
            points="642.83806 743.22518 382.08687 743.22518 0 361.16726 0 220.95884 120.93391 220.95884 642.83806 743.22518"
          />
          <polygon
            fill="#fff"
            points="321.41903 743.22518 60.66784 743.22518 0 682.56194 0 542.35351 120.93391 542.35351 321.41903 743.22518"
          />
        </svg>
      </a>

      {/* Dark Veil Background */}
      <div className="fixed inset-0 z-0">
        <DarkVeil
          hueShift={0}
          noiseIntensity={0.05}
          scanlineIntensity={0.85}
          speed={1}
          scanlineFrequency={5}
          warpAmount={0.3}
          resolutionScale={isMobile ? 0.6 : 1}
        />
      </div>

      <main className="relative z-10">
        {/* Social Icons
            On mobile: horizontally centred, above the home-bar (safe-area-inset-bottom).
            On desktop: vertically centred, horizontally centred. */}
        <div
          className={`fixed z-10 ${
            isMobile
              ? "left-1/2 -translate-x-1/2"
              : "left-1/2 top-1/2 -translate-x-1/2 translate-y-1/2"
          }`}
          style={
            isMobile
              ? {
                  bottom:
                    "max(2rem, calc(env(safe-area-inset-bottom) + 1.5rem))",
                }
              : undefined
          }
        >
          <FadingIconsGroup
            icons={socialIcons}
            staggerDelay={isMobile ? 0.15 : 0.3}
            initialDelay={isMobile ? 0.3 : 0.7}
            moveDistance={isMobile ? 30 : 60}
            size={isMobile ? 28 : 40}
            gap={isMobile ? "gap-6" : "gap-8"}
            iconClassName="cursor-target"
          />
        </div>
      </main>

      <Analytics />
    </div>
  );
}
