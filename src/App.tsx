import Dither from '@/components/Dither'

export default function App() {
  return (
    <div className="relative min-h-screen">
      {/* Full-viewport Dither background */}
      <div className="fixed inset-0 -z-10">
        <Dither
          waveColor={[0.5, 0.5, 0.5]}
          disableAnimation={false}
          enableMouseInteraction={true}
          mouseRadius={0.3}
          colorNum={4}
          waveAmplitude={0.3}
          waveFrequency={3}
          waveSpeed={0.05}
        />
      </div>

      {/* Your page content */}
      <main className="relative z-10 p-8">
        <h1 className="text-3xl font-bold mb-4">Hello — Tailwind Test</h1>
        ...
      </main>
    </div>
  )
}