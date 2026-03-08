import { motion } from 'framer-motion'
import styles from './ShopHero.module.css'

export default function ShopHero({ onEnter, selectedItems }) {
  return (
    <section className={styles.hero}>
      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Happy Birthday, my Shopoholic 🛍️
        </motion.p>

        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.7, type: 'spring', stiffness: 120 }}
        >
          Your Birthday Boutique
        </motion.h1>

        <motion.p
          className={styles.tagline}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          You can shop to your hearts content 🛍️, pick one thing you love — I&apos;ll make it yours ✨
        </motion.p>

        <motion.button
          className={styles.cta}
          onClick={onEnter}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
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
