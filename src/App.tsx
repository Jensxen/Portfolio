import DarkVeil from "./components/DarkVeil";
import { FadingIconsGroup } from "@/components/FadingIcons";
import TargetCursor from "@/components/TargetCursor";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiMail } from "react-icons/hi";
import { useRef } from "react";
import { useIsMobile } from "@/lib/hooks";

export default function App() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const isMobile = useIsMobile();

  return (
    <div
      ref={scrollRef}
      className="relative min-h-screen w-screen overflow-auto overflow-x-hidden bg-black"
    >
      <TargetCursor
        targetSelector=".cursor-target"
        spinDuration={2}
        hideDefaultCursor={true}
      />

      {/* Logo in top-left */}
      <a
        href="/"
        className="fixed top-4 left-4 z-20 w-[3.45rem] h-[3.45rem] cursor-target"
        aria-label="Home logo"
      >
        <img
          src="/logo.png"
          alt="Logo"
          className="w-full h-full object-contain"
          style={{ filter: " brightness(1)" }}
        />
      </a>

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

      <main className="relative z-10 p-8">
        {/* Social Icons */}
        <div className={`fixed z-10 ${isMobile ? 'left-1/2 bottom-8 -translate-x-1/2' : 'left-1/2 top-1/2 -translate-x-1/2 translate-y-1/2'}`}>
          <FadingIconsGroup
            icons={[
              {
                icon: FaGithub,
                href: "https://github.com/Jensxen",
                ariaLabel: "Jensxen Git",
              },
              {
                icon: FaLinkedin,
                href: "https://www.linkedin.com/in/marcus-a-jensen",
                ariaLabel: "LinkedIn",
              },
              {
                icon: HiMail,
                href: "mailto:marcusjensen.privat@gmail.com",
                ariaLabel: "Contact me",
              },
            ]}
            staggerDelay={isMobile ? 0.15 : 0.3}
            initialDelay={isMobile ? 0.3 : 0.7}
            moveDistance={isMobile ? 30 : 60}
            size={isMobile ? 28 : 40}
            gap={isMobile ? "gap-6" : "gap-8"}
            iconClassName="cursor-target"
          />
        </div>
      </main>
    </div>
  );
}
