// Декоративная анимированная сцена для хиро-блока: звёзды, луна и слои гор с эффектом параллакса.
// Чистый SVG + CSS-анимация, без внешних библиотек и картинок.
export default function MountainScene() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      {/* звёзды */}
      <div className="absolute inset-0">
        {STARS.map((s, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              top: `${s.top}%`,
              left: `${s.left}%`,
              width: s.size,
              height: s.size,
              opacity: 0.5,
              animation: `tc-twinkle ${s.dur}s ease-in-out ${s.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* луна / солнце с мягким свечением */}
      <div
        className="absolute rounded-full"
        style={{
          top: '8%',
          right: '10%',
          width: 90,
          height: 90,
          background: 'radial-gradient(circle at 35% 35%, #EFFDF5, #22C55E 70%)',
          boxShadow: '0 0 60px 10px rgba(34,197,94,0.35)',
        }}
      />

      {/* слои гор — каждый едет со своей скоростью, создавая параллакс */}
      <svg className="absolute bottom-0 left-0 w-[200%] h-[45%]" style={{ animation: 'tc-drift-slow 40s linear infinite' }} viewBox="0 0 1600 300" preserveAspectRatio="none">
        <polygon points="0,300 0,180 220,60 420,190 620,90 900,200 1150,70 1400,210 1600,120 1600,300" fill="#0F2340" opacity="0.9" />
      </svg>
      <svg className="absolute bottom-0 left-0 w-[200%] h-[38%]" style={{ animation: 'tc-drift-mid 26s linear infinite' }} viewBox="0 0 1600 260" preserveAspectRatio="none">
        <polygon points="0,260 0,150 260,40 480,160 720,60 980,170 1240,50 1450,150 1600,90 1600,260" fill="#123A22" opacity="0.95" />
      </svg>
      <svg className="absolute bottom-0 left-0 w-[200%] h-[28%]" style={{ animation: 'tc-drift-fast 16s linear infinite' }} viewBox="0 0 1600 200" preserveAspectRatio="none">
        <polygon points="0,200 0,120 300,20 560,130 820,30 1080,140 1340,40 1600,110 1600,200" fill="#0B1220" />
      </svg>

      {/* плавные облака */}
      <div className="absolute rounded-full bg-white/5" style={{ top: '18%', left: '-10%', width: 260, height: 60, animation: 'tc-cloud 60s linear infinite' }} />
      <div className="absolute rounded-full bg-white/5" style={{ top: '30%', left: '-20%', width: 180, height: 44, animation: 'tc-cloud 80s linear infinite 10s' }} />

      <style>{`
        @keyframes tc-twinkle { 0%, 100% { opacity: 0.15; } 50% { opacity: 0.9; } }
        @keyframes tc-drift-slow { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes tc-drift-mid  { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes tc-drift-fast { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes tc-cloud { from { transform: translateX(0); } to { transform: translateX(140vw); } }
      `}</style>
    </div>
  );
}

const STARS = Array.from({ length: 40 }, (_, i) => ({
  top: (i * 37) % 60,
  left: (i * 53) % 100,
  size: (i % 3) + 1,
  dur: 2 + (i % 4),
  delay: (i % 5) * 0.4,
}));
