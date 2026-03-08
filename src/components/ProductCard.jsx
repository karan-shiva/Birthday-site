import { motion } from 'framer-motion'
import styles from './ProductCard.module.css'

export default function ProductCard({ product, isSelected, onSelect }) {
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
          src={product.image}
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
      </div>

      <div className={styles.info}>
        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.description}>{product.description}</p>
        {isSelected && (
          <p className={styles.selectedLabel}>Selected ✨</p>
        )}
      </div>
    </motion.button>
  )
}
