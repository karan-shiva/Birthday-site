import { useEffect } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import styles from './Hero.module.css'

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 15 },
  },
}

const BALLOONS = [
  { color: '#FF6B9D', size: 70, left: '8%', delay: '0s', duration: '3.4s' },
  { color: '#A78BFA', size: 55, left: '50%', delay: '0.6s', duration: '4s' },
  { color: '#FFD700', size: 65, left: '88%', delay: '1.1s', duration: '3s' },
]

function Balloon({ color, size, left, delay, duration }) {
  return (
    <div
      className={styles.balloon}
      style={{ left, animationDelay: delay, animationDuration: duration }}
      aria-hidden="true"
    >
      <svg
        width={size}
        height={size * 1.4}
        viewBox="0 0 60 84"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse cx="30" cy="28" rx="26" ry="28" fill={color} opacity="0.88" />
        <ellipse cx="22" cy="18" rx="7" ry="9" fill="rgba(255,255,255,0.25)" />
        <path d="M30 56 Q27 64 29 72 Q31 78 30 84" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M30 56 L28 60 L32 60 Z" fill={color} opacity="0.7" />
      </svg>
    </div>
  )
}

export default function Hero() {
  useEffect(() => {
    const colors = ['#FFD700', '#FF6B9D', '#A78BFA', '#4ECDC4', '#ffffff']

    // Phase 1 — big side + center burst at 1.5s
    const timer1 = setTimeout(() => {
      confetti({ particleCount: 160, angle: 60,  spread: 80,  origin: { x: 0,   y: 0.5 }, colors, scalar: 1.2 })
      confetti({ particleCount: 160, angle: 120, spread: 80,  origin: { x: 1,   y: 0.5 }, colors, scalar: 1.2 })
      confetti({ particleCount: 80,              spread: 100, origin: { x: 0.5, y: 0.2 }, colors, scalar: 1.1 })
    }, 1500)

    // Phase 2 — gentle continuous shower from the top for 4 seconds
    let animFrame
    let start = null
    const shower = (timestamp) => {
      if (!start) start = timestamp
      if (timestamp - start > 2000) return
      confetti({
        particleCount: 4,
        angle: 270,
        spread: 130,
        origin: { x: Math.random(), y: 0 },
        colors,
        gravity: 0.8,
        scalar: 0.9,
      })
      animFrame = requestAnimationFrame(shower)
    }

    const timer2 = setTimeout(() => {
      animFrame = requestAnimationFrame(shower)
    }, 2000)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      if (animFrame) cancelAnimationFrame(animFrame)
    }
  }, [])

  return (
    <section className={styles.hero}>
      {BALLOONS.map((b, i) => (
        <Balloon key={i} {...b} />
      ))}

      <motion.div
        className={styles.content}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p className={styles.subtitle} variants={itemVariants}>
          Celebrating a very special person
        </motion.p>

        <motion.h1 className={styles.name} variants={itemVariants}>
          Happy Birthday, Yuga!
        </motion.h1>

        <motion.div className={styles.ageBadge} variants={itemVariants}>
          <span className={styles.ageNumber}>26</span>
          <span className={styles.ageLabel}>years of awesomeness</span>
        </motion.div>

        <motion.p className={styles.tagline} variants={itemVariants}>
          Welcome to your late 20s
        </motion.p>

        <motion.button
          className={`${styles.cta} glass`}
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={() =>
            document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })
          }
        >
          Explore Memories ↓
        </motion.button>
      </motion.div>

      <div className={styles.scrollHint} aria-hidden="true">
        <span />
      </div>
    </section>
  )
}
