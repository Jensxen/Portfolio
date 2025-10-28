import DarkVeil from "./components/DarkVeil";
import ASCIIText from "./components/ASCIIText";
import { useRef } from "react";

export default function App() {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  return (
    /* Added bg-black to prevent white flash during loading */
    <div
      ref={scrollRef}
      className="relative min-h-screen w-screen overflow-auto overflow-x-hidden bg-black"
    >
      {/* Full-viewport DarkVeil background */}
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

      {/* Your page content */}
      <main className="relative z-10 p-8">
        <h1 className="text-3xl font-bold mb-4"></h1>

        {/* ASCII Text Component - centered and larger */}
        <div className="fixed inset-0 flex items-center justify-center z-20">
          <ASCIIText
            text="Welcome"
            textFontSize={50}
            asciiFontSize={12}
            textColor="#ffffff"
          />
        </div>

        {/* Positioned absolutely with pointer-events-none to allow Dither mouse interaction */}
        <section
          className="absolute top-20 left-0 right-0 overflow-hidden w-screen z-5 pointer-events-none"
          style={{ maxWidth: "100vw" }}
        >
        </section>
      </main>
    </div>
  );
}
