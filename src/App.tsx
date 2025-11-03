import DarkVeil from "./components/DarkVeil";
import { FadingIconsGroup } from "@/components/FadingIcons";
import TargetCursor from "@/components/TargetCursor";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiMail } from "react-icons/hi";
import { useRef } from "react";

export default function App() {
  const scrollRef = useRef<HTMLDivElement | null>(null);

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
          src="/logo.svg"
          alt="Logo"
          className="w-full h-full"
          style={{ filter: "invert(1) brightness(0.4)" }}
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
          resolutionScale={1}
        />
      </div>

      <main className="relative z-10 p-8">
        {/* Social Icons */}
        <div className="fixed left-1/2 top-1/2 -translate-x-1/2 translate-y-1/2 z-10">
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
            staggerDelay={0.3}
            initialDelay={1}
            moveDistance={60}
            size={40}
            gap="gap-8"
            iconClassName="cursor-target"
          />
        </div>
      </main>
    </div>
  );
}
