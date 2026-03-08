import React from 'react'
import { motion } from 'framer-motion'
import styles from './Gallery.module.css'

const rows = new Array(50).fill(1)
const cols = new Array(33).fill(1)

const BoxesCore = () => {
  return (
    <div
      className={styles.boxesContainer}
      style={{
        transform: 'translate(-40%,-60%) skewX(-18deg) skewY(5.25deg) scale(0.675) rotate(0deg) translateZ(0)',
      }}
    >
      {rows.map((_, i) => (
        <div key={`row-${i}`} className={styles.row}>
          {cols.map((_, j) => (
            <motion.div
              key={`col-${j}`}
              className={styles.col}
              style={{
                backgroundImage: "url('/Gemini_Generated_Image_kx1v28kx1v28kx1v.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
              whileHover={{
                backgroundImage: "url('/IMG_3247.jpeg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transition: { duration: 0 },
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

const Boxes = React.memo(BoxesCore)

export default function Gallery({ maskGradient, label = 'Hover the tiles to walk down memory lane.' }) {
  return (
    <section id="gallery" className={styles.section}>
      <div className={styles.boxesWrapper}>
        <div
          className={styles.mask}
          style={maskGradient ? { maskImage: maskGradient, WebkitMaskImage: maskGradient } : undefined}
        />
        <Boxes />
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
