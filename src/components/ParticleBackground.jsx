import styles from './ParticleBackground.module.css'

const ORB_COLORS = [
  'radial-gradient(circle, rgba(167,139,250,0.45) 0%, transparent 70%)',
  'radial-gradient(circle, rgba(255,107,157,0.35) 0%, transparent 70%)',
  'radial-gradient(circle, rgba(78,205,196,0.35) 0%, transparent 70%)',
  'radial-gradient(circle, rgba(255,215,0,0.30) 0%, transparent 70%)',
]

const CONFIG = [
  { size: 300, top: 5,  left: 10, delay: 0,   duration: 18, colorIdx: 0 },
  { size: 200, top: 20, left: 70, delay: 2,   duration: 14, colorIdx: 1 },
  { size: 150, top: 60, left: 30, delay: 4,   duration: 20, colorIdx: 2 },
  { size: 250, top: 80, left: 80, delay: 1,   duration: 16, colorIdx: 3 },
  { size: 120, top: 40, left: 50, delay: 3,   duration: 12, colorIdx: 0 },
  { size: 180, top: 10, left: 85, delay: 5,   duration: 17, colorIdx: 1 },
  { size: 220, top: 70, left: 5,  delay: 0.5, duration: 15, colorIdx: 2 },
  { size: 100, top: 35, left: 20, delay: 6,   duration: 11, colorIdx: 3 },
  { size: 280, top: 90, left: 55, delay: 2.5, duration: 19, colorIdx: 0 },
  { size: 130, top: 15, left: 40, delay: 7,   duration: 13, colorIdx: 1 },
  { size: 160, top: 55, left: 90, delay: 1.5, duration: 16, colorIdx: 2 },
  { size: 200, top: 50, left: 65, delay: 3.5, duration: 14, colorIdx: 3 },
  { size: 90,  top: 75, left: 45, delay: 8,   duration: 10, colorIdx: 0 },
  { size: 240, top: 25, left: 15, delay: 4.5, duration: 18, colorIdx: 1 },
  { size: 110, top: 85, left: 25, delay: 6.5, duration: 12, colorIdx: 2 },
  { size: 170, top: 45, left: 75, delay: 2,   duration: 15, colorIdx: 3 },
  { size: 140, top: 65, left: 60, delay: 5.5, duration: 17, colorIdx: 0 },
  { size: 190, top: 30, left: 95, delay: 9,   duration: 20, colorIdx: 1 },
]

export default function ParticleBackground() {
  return (
    <div className={styles.container} aria-hidden="true">
      {CONFIG.map((orb, i) => (
        <div
          key={i}
          className={styles.orb}
          style={{
            width: orb.size,
            height: orb.size,
            top: `${orb.top}%`,
            left: `${orb.left}%`,
            background: ORB_COLORS[orb.colorIdx],
            animationDelay: `${orb.delay}s`,
            animationDuration: `${orb.duration}s`,
          }}
        />
      ))}
    </div>
  )
}
