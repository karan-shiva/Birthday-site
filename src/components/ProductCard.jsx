import { useState } from 'react'
import { motion } from 'framer-motion'
import styles from './ProductCard.module.css'

export default function ProductCard({ product, isSelected, onSelect }) {
  const [imgIndex, setImgIndex] = useState(0)
  const hasMultiple = product.images.length > 1

  function prev(e) {
    e.stopPropagation()
    setImgIndex(i => (i - 1 + product.images.length) % product.images.length)
  }

  function next(e) {
    e.stopPropagation()
    setImgIndex(i => (i + 1) % product.images.length)
  }

  return (
    <motion.button
      className={`glass ${styles.card} ${isSelected ? styles.selected : ''}`}
      onClick={() => onSelect(product)}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      layout
    >
      <div className={styles.imageWrap}>
        <img
          src={product.images[imgIndex]}
          alt={product.name}
          className={styles.image}
          loading="lazy"
        />

        {isSelected && (
          <motion.div
            className={styles.checkOverlay}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <span className={styles.checkmark}>✓</span>
          </motion.div>
        )}

        {hasMultiple && (
          <>
            <button className={`${styles.arrow} ${styles.arrowLeft}`} onClick={prev} aria-label="Previous image">‹</button>
            <button className={`${styles.arrow} ${styles.arrowRight}`} onClick={next} aria-label="Next image">›</button>
            <div className={styles.dots}>
              {product.images.map((_, i) => (
                <span key={i} className={`${styles.dot} ${i === imgIndex ? styles.dotActive : ''}`} />
              ))}
            </div>
          </>
        )}
      </div>

      <div className={styles.info}>
        <h3 className={styles.name}>{product.name}</h3>
        {isSelected && (
          <p className={styles.selectedLabel}>Selected ✨</p>
        )}
      </div>
    </motion.button>
  )
}
