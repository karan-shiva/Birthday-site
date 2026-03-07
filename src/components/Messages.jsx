import { motion } from 'framer-motion'
import { FaHeart, FaStar, FaRocket, FaFire, FaMagic, FaBirthdayCake } from 'react-icons/fa'
import styles from './Messages.module.css'

const WISHES = [
  {
    id: 1,
    avatar: '🎂',
    sender: 'Mom',
    accent: 'gold',
    icon: FaBirthdayCake,
    text: "Alex, watching you grow into the incredible person you are today fills my heart with endless joy. Every day with you is a gift. Happy 25th, my love!",
  },
  {
    id: 2,
    avatar: '🎉',
    sender: 'Dad',
    accent: 'pink',
    icon: FaStar,
    text: "Twenty-five years of adventures, laughter, and endless pride. Here's to a quarter-century well lived — the world is yours, kiddo!",
  },
  {
    id: 3,
    avatar: '🌟',
    sender: 'Sarah',
    accent: 'purple',
    icon: FaHeart,
    text: "My favorite person is finally a quarter-century old! You make every room brighter just by walking in. Can't wait to celebrate with you! 💜",
  },
  {
    id: 4,
    avatar: '🎈',
    sender: 'James',
    accent: 'mint',
    icon: FaFire,
    text: "Bro, 25 already?! Time flies when you're this awesome. Wishing you a birthday as legendary as you are. Have the best one yet!",
  },
  {
    id: 5,
    avatar: '💜',
    sender: 'Emma',
    accent: 'purple',
    icon: FaMagic,
    text: "Wishing you a day as magical and radiant as you are. You deserve every happiness the universe can offer, Alex. Here's to you! ✨",
  },
  {
    id: 6,
    avatar: '🚀',
    sender: 'Mike',
    accent: 'gold',
    icon: FaRocket,
    text: "To 25 more years of crushing it! You've already done so much — I can't wait to see what the next chapter holds. Happy birthday, legend! 🚀",
  },
]

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 40 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 120, damping: 14 },
  },
}

export default function Messages() {
  return (
    <section className={styles.section}>
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <p className={styles.eyebrow}>With love from everyone</p>
        <h2 className={styles.heading}>Birthday Wishes</h2>
      </motion.div>

      <motion.div
        className={styles.grid}
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
      >
        {WISHES.map((wish) => {
          const Icon = wish.icon
          return (
            <motion.div
              key={wish.id}
              className={`${styles.card} glass`}
              variants={cardVariants}
              whileHover={{ scale: 1.03 }}
              style={{
                '--card-accent': `var(--accent-${wish.accent})`,
                '--card-glow': `var(--glow-${wish.accent})`,
              }}
            >
              <div className={styles.cardTop}>
                <div className={styles.avatar}>
                  <span>{wish.avatar}</span>
                </div>
                <div className={styles.sender}>
                  <strong>{wish.sender}</strong>
                  <Icon
                    className={styles.icon}
                    style={{ color: `var(--accent-${wish.accent})` }}
                  />
                </div>
              </div>
              <p className={styles.text}>{wish.text}</p>
              <div className={styles.cardAccentLine} />
            </motion.div>
          )
        })}
      </motion.div>
    </section>
  )
}
