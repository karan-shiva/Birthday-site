import { motion } from 'framer-motion'
import styles from './ShopHero.module.css'

export default function ShopHero({ onEnter, onClose, selectedItems }) {
  return (
    <section className={styles.hero}>
      {onClose && (
        <button className={styles.backBtn} onClick={onClose}>
          ← Back
        </button>
      )}
      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        <p className={styles.subtitle}>
          Happy Birthday, my Shopoholic 🛍️
        </p>

        <h1 className={styles.title}>
          Your Birthday Boutique
        </h1>

        <p className={styles.tagline}>
          You can shop to your hearts content 🛍️, pick one thing you love — I&apos;ll make it yours ✨
        </p>

        <motion.button
          className={styles.cta}
          onClick={onEnter}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          Start Shopping 🛍️
        </motion.button>

        {selectedItems?.length > 0 && (
          <motion.p
            className={styles.hint}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {selectedItems.length === 1
              ? <>{selectedItems[0].name} is in your wishlist</>
              : <><strong>{selectedItems.length} items</strong> in your wishlist</>
            }
          </motion.p>
        )}
      </motion.div>

      <div className={styles.scrollHint}>
        <span>↓</span>
      </div>
    </section>
  )
}
