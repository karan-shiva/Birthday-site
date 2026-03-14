import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import styles from './Gallery.module.css'

const rows = new Array(50).fill(1)
const cols = new Array(33).fill(1)

const GALLERY_IMAGES = Array.from({ length: 90 }, (_, k) => `/Gallery/IMG${k + 1}.avif`)

const BoxesCore = ({ loadedRows }) => {
  return (
    <div
      className={styles.boxesContainer}
      style={{
        transform: 'translate(-40%,-60%) skewX(-10deg) skewY(3deg) scale(0.675) rotate(0deg) translateZ(0)',
      }}
    >
      {rows.map((_, i) => (
        <div key={`row-${i}`} className={styles.row}>
          {cols.map((_, j) => (
            <motion.div
              key={`col-${j}`}
              className={styles.col}
              style={{
                backgroundImage: loadedRows.has(i)
                  ? `url('${GALLERY_IMAGES[(i * cols.length + j) % GALLERY_IMAGES.length]}')`
                  : 'none',
                backgroundSize: '100% 100%',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                filter: 'grayscale(1) sepia(0.5) hue-rotate(220deg) saturate(1.4) blur(2px) brightness(0.7)',
                willChange: 'filter',
              }}
              animate={{ opacity: loadedRows.has(i) ? 1 : 0.4 }}
              transition={{ duration: 0.5 }}
              whileHover={{
                filter: 'grayscale(0) blur(0px)',
                transition: { duration: 0.3 },
              }}
            >
              {j % 2 === 0 && i % 2 === 0 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className={styles.plusIcon}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                </svg>
              ) : null}
            </motion.div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default function Gallery({ maskGradient, label = 'Hover the tiles to walk down memory lane.' }) {
  const [loadedRows, setLoadedRows] = useState(new Set())
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          rows.forEach((_, i) => {
            setTimeout(() => setLoadedRows(prev => new Set([...prev, i])), i * 15)
          })
          observer.disconnect()
        }
      },
      { rootMargin: '150px' }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="gallery" className={styles.section} ref={sectionRef}>
      <div className={styles.boxesWrapper}>
        <div
          className={styles.mask}
          style={maskGradient ? { maskImage: maskGradient, WebkitMaskImage: maskGradient } : undefined}
        />
        <BoxesCore loadedRows={loadedRows} />
        <div className={styles.header}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className={styles.heading}>Memory Gallery</h2>
            <p className={styles.subheading}>{label}</p>
          </motion.div>
        </div>
      </div>
      <div className={styles.ctaWrapper}>
        <motion.button
          className={`${styles.cta} glass`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={() =>
            document.getElementById('wishwheel')?.scrollIntoView({ behavior: 'smooth' })
          }
        >
          Read Birthday Wishes ↓
        </motion.button>
      </div>
    </section>
  )
}
