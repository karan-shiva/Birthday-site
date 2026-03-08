import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ShopHero from './ShopHero'
import CategoryGrid from './CategoryGrid'
import ProductGrid from './ProductGrid'
import Confirmation from './Confirmation'

export default function ShopSection({ onClose }) {
  const [view, setView] = useState('home')
  const [activeCategory, setActiveCategory] = useState(null)
  const [selectedItems, setSelectedItems] = useState([])
  const categoryRef = useRef(null)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'instant' })

  function handleEnter() {
    categoryRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  function handleSelectCategory(categoryId) {
    setActiveCategory(categoryId)
    setView('products')
    scrollToTop()
  }

  function handleSelectItem(item) {
    setSelectedItems(prev =>
      prev.some(i => i.id === item.id)
        ? prev.filter(i => i.id !== item.id)
        : [...prev, item]
    )
  }

  function handleConfirm() {
    setView('confirmed')
    scrollToTop()
  }

  function handleChangeMind() {
    setSelectedItems([])
    setActiveCategory(null)
    setView('home')
    scrollToTop()
  }

  function handleBack() {
    setView('home')
    scrollToTop()
  }

  return (
    <section>
      <AnimatePresence mode="wait" initial={false}>
        {view === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <ShopHero onEnter={handleEnter} onClose={onClose} selectedItems={selectedItems} />
            <div ref={categoryRef}>
              <CategoryGrid onSelectCategory={handleSelectCategory} />
            </div>
          </motion.div>
        )}

        {view === 'products' && (
          <motion.div
            key="products"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.35 }}
          >
            <ProductGrid
              categoryId={activeCategory}
              selectedItems={selectedItems}
              onSelect={handleSelectItem}
              onBack={handleBack}
              onConfirm={handleConfirm}
            />
          </motion.div>
        )}

        {view === 'confirmed' && (
          <motion.div
            key="confirmed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Confirmation selectedItems={selectedItems} onChangeMind={handleChangeMind} />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
