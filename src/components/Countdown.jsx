import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import styles from './Countdown.module.css'

const TARGET_DATE = new Date('2026-03-15T00:00:00')

function getTimeLeft() {
  const diff = TARGET_DATE - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true }
  return {
    days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours:   Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
    done:    false,
  }
}

function CountdownChip({ value, label, accent }) {
  const [flipping, setFlipping] = useState(false)
  const [displayed, setDisplayed] = useState(value)
  const prevValue = useRef(value)

  useEffect(() => {
    if (value !== prevValue.current) {
      setFlipping(true)
      const t = setTimeout(() => {
        setDisplayed(value)
        setFlipping(false)
        prevValue.current = value
      }, 200)
      return () => clearTimeout(t)
    }
  }, [value])

  return (
    <div className={styles.chip}>
      <div
        className={`${styles.chipInner} glass`}
        style={{ '--chip-accent': `var(--accent-${accent})` }}
      >
        <span
          className={`${styles.chipValue} ${flipping ? styles.flipping : ''}`}
          style={{ color: `var(--accent-${accent})`, textShadow: `var(--glow-${accent})` }}
        >
          {String(displayed).padStart(2, '0')}
        </span>
        <span className={styles.chipLabel}>{label}</span>
      </div>
    </div>
  )
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft)
  const birthdayCelebrated = useRef(false)

  useEffect(() => {
    const id = setInterval(() => {
      const t = getTimeLeft()
      setTimeLeft(t)
      if (t.done && !birthdayCelebrated.current) {
        birthdayCelebrated.current = true
        confetti({ particleCount: 200, spread: 120, origin: { y: 0.5 } })
      }
    }, 1000)
    return () => clearInterval(id)
  }, [])

  if (timeLeft.done) {
    return (
      <section id="countdown" className={styles.section}>
        <motion.div
          className={`${styles.birthdayCard} glass`}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 100, damping: 12 }}
          viewport={{ once: true }}
        >
          <p className={styles.birthdayEmoji}>🎉</p>
          <h2 className={styles.birthdayMsg}>Today is the day!</h2>
          <p className={styles.birthdaySubmsg}>Happy Birthday, Alex! 🎂</p>
        </motion.div>
      </section>
    )
  }

  return (
    <section id="countdown" className={styles.section}>
      <motion.div
        className={styles.wrapper}
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <p className={styles.eyebrow}>The countdown is on</p>
        <h2 className={styles.heading}>Until the Big Day</h2>
        <p className={styles.date}>March 15, 2026</p>

        <div className={styles.chips}>
          <CountdownChip value={timeLeft.days}    label="Days"    accent="gold"   />
          <CountdownChip value={timeLeft.hours}   label="Hours"   accent="pink"   />
          <CountdownChip value={timeLeft.minutes} label="Minutes" accent="purple" />
          <CountdownChip value={timeLeft.seconds} label="Seconds" accent="mint"   />
        </div>
      </motion.div>
    </section>
  )
}
