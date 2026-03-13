import { useEffect } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import styles from './Confirmation.module.css'

function fireConfetti() {
  const colors = ['#FFD700', '#FF6B9D', '#A78BFA', '#4ECDC4', '#ffffff']

  confetti({
    particleCount: 120,
    spread: 80,
    origin: { y: 0.55 },
    colors,
    scalar: 1.1,
  })

  setTimeout(() => {
    confetti({
      particleCount: 60,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.6 },
      colors,
    })
    confetti({
      particleCount: 60,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.6 },
      colors,
    })
  }, 300)
}

export default function Confirmation({ selectedItems, onChangeMind }) {
  useEffect(() => {
    fireConfetti()
  }, [])

  const isSingle = selectedItems?.length === 1
  const first = selectedItems?.[0]

  return (
    <section className={styles.section}>
      <motion.div
        className={`glass ${isSingle ? styles.card : styles.multiCard}`}
        initial={{ opacity: 0, scale: 0.85, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.1 }}
      >
        {isSingle ? (
          <>
            <div className={styles.imageWrap}>
              <motion.img
                src={first.images[0]}
                alt={first.name}
                className={styles.image}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              />
              <div className={styles.shimmer} />
            </div>

            <div className={styles.content}>
              <motion.p className={styles.label} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                Your choice
              </motion.p>
              <motion.h2 className={styles.itemName} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.5 }}>
                {first.name}
              </motion.h2>
              <motion.p className={styles.message} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
                I&apos;ll get this for you! 🎁
              </motion.p>
              <motion.p className={styles.sub} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
                Consider it done, love ♡
              </motion.p>
              <motion.button className={styles.changeBtn} onClick={onChangeMind} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                Hmm, let me look again...
              </motion.button>
            </div>
          </>
        ) : (
          <div className={styles.multiContent}>
            <motion.p className={styles.label} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
              Your wishlist
            </motion.p>
            <motion.p className={styles.message} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              I&apos;ll pick one for you! 🎁
            </motion.p>
            <motion.div
              className={styles.multiGrid}
              initial="hidden"
              animate="visible"
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
            >
              {selectedItems.map((item) => (
                <motion.div
                  key={item.id}
                  className={styles.multiItem}
                  variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.35 } } }}
                >
                  <img src={item.images[0]} alt={item.name} className={styles.multiImage} />
                  <p className={styles.multiName}>{item.name}</p>
                </motion.div>
              ))}
            </motion.div>
            <motion.p className={styles.sub} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
              Consider it done, love ♡
            </motion.p>
            <motion.button className={styles.changeBtn} onClick={onChangeMind} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              Hmm, let me look again...
            </motion.button>
          </div>
        )}
      </motion.div>
    </section>
  )
}
