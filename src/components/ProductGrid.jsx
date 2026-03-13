import { motion, AnimatePresence } from 'framer-motion'
import { PRODUCTS } from '../products'
import ProductCard from './ProductCard'
import styles from './ProductGrid.module.css'

export default function ProductGrid({ selectedItems, onSelect, onConfirm }) {
  const hasSelections = selectedItems?.length > 0

  return (
    <section className={styles.section}>
      <motion.div
        className={styles.grid}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.08 } },
        }}
      >
        {PRODUCTS.map((product) => (
          <motion.div
            key={product.id}
            variants={{
              hidden:  { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
            }}
          >
            <ProductCard
              product={product}
              isSelected={selectedItems?.some(i => i.id === product.id)}
              onSelect={onSelect}
            />
          </motion.div>
        ))}
      </motion.div>

      <AnimatePresence>
        {hasSelections && (
          <motion.div
            className={styles.stickyFooter}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          >
            <p className={styles.footerText}>
              <span className={styles.footerEmoji}>✨</span>
              <span>
                {selectedItems.length === 1
                  ? <><strong>{selectedItems[0].name}</strong><small> is in your heart</small></>
                  : <><strong>{selectedItems.length} items</strong><small> in your wishlist</small></>
                }
              </span>
            </p>
            <motion.button
              className={styles.confirmBtn}
              onClick={onConfirm}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              {selectedItems.length === 1 ? 'This is the one! 🎁' : 'These are my picks! 🎁'}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {hasSelections && <div className={styles.footerSpacer} />}
    </section>
  )
}
