import { motion } from 'framer-motion'
import { CATEGORIES, PRODUCTS } from '../products'
import styles from './CategoryGrid.module.css'

const ACCENT_COLORS = {
  pink:   { color: 'var(--accent-pink)',   glow: 'var(--glow-pink)' },
  gold:   { color: 'var(--accent-gold)',   glow: 'var(--glow-gold)' },
  purple: { color: 'var(--accent-purple)', glow: 'var(--glow-purple)' },
}

export default function CategoryGrid({ onSelectCategory }) {
  return (
    <section className={styles.section}>
      <motion.h2
        className={styles.heading}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Choose a Category
      </motion.h2>

      <motion.div
        className={styles.grid}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.15 } },
        }}
      >
        {CATEGORIES.map((cat) => {
          const count = PRODUCTS.filter(p => p.category === cat.id).length
          const accent = ACCENT_COLORS[cat.accent]

          return (
            <motion.button
              key={cat.id}
              className={`glass ${styles.card}`}
              style={{ '--card-color': accent.color, '--card-glow': accent.glow }}
              onClick={() => onSelectCategory(cat.id)}
              variants={{
                hidden:  { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
              whileHover={{ scale: 1.04, boxShadow: accent.glow }}
              whileTap={{ scale: 0.97 }}
            >
              <span className={styles.icon}>{cat.icon}</span>
              <h3 className={styles.label}>{cat.label}</h3>
              <p className={styles.count}>{count} pieces</p>
              <span className={styles.arrow}>→</span>
            </motion.button>
          )
        })}
      </motion.div>
    </section>
  )
}
