import { motion } from 'framer-motion'
import { FaExpand, FaHeart } from 'react-icons/fa'
import styles from './Gallery.module.css'

const GALLERY = [
  { id: 1, gradient: 'linear-gradient(135deg, #A78BFA 0%, #FF6B9D 100%)', label: 'Sweet Memories',   aspect: 'tall'   },
  { id: 2, gradient: 'linear-gradient(135deg, #4ECDC4 0%, #A78BFA 100%)', label: 'Best Friends',     aspect: 'wide'   },
  { id: 3, gradient: 'linear-gradient(135deg, #FFD700 0%, #FF6B9D 100%)', label: 'Celebrations',     aspect: 'square' },
  { id: 4, gradient: 'linear-gradient(135deg, #FF6B9D 0%, #4ECDC4 100%)', label: 'Adventures',       aspect: 'square' },
  { id: 5, gradient: 'linear-gradient(135deg, #302b63 0%, #A78BFA 100%)', label: 'Precious Moments', aspect: 'tall'   },
  { id: 6, gradient: 'linear-gradient(135deg, #FFD700 0%, #4ECDC4 100%)', label: 'Good Times',       aspect: 'wide'   },
  { id: 7, gradient: 'linear-gradient(135deg, #302b63 0%, #FF6B9D 100%)', label: 'Favorites',        aspect: 'square' },
  { id: 8, gradient: 'linear-gradient(135deg, #A78BFA 0%, #FFD700 100%)', label: 'Golden Days',      aspect: 'square' },
]

const cellVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.07, duration: 0.5, ease: 'easeOut' },
  }),
}

export default function Gallery() {
  return (
    <section className={styles.section}>
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <p className={styles.eyebrow}>A life beautifully lived</p>
        <h2 className={styles.heading}>Memory Gallery</h2>
        <p className={styles.subheading}>
          Every picture tells a story — add your photos to make this truly yours.
        </p>
      </motion.div>

      <motion.div
        className={styles.grid}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {GALLERY.map((item, i) => (
          <motion.div
            key={item.id}
            className={`${styles.cell} ${styles[item.aspect]}`}
            custom={i}
            variants={cellVariants}
          >
            <div
              className={styles.cellBg}
              style={{ background: item.gradient }}
            />
            <div className={styles.overlay}>
              <div className={styles.overlayContent}>
                <FaHeart className={styles.overlayIcon} />
                <span className={styles.overlayLabel}>{item.label}</span>
                <FaExpand className={styles.expandIcon} />
              </div>
            </div>
            <div className={styles.cellLabel}>
              <span>{item.label}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.p
        className={styles.hint}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.7 }}
        viewport={{ once: true }}
      >
        ✨ Replace the gradient placeholders with real photos to personalize this gallery
      </motion.p>
    </section>
  )
}
