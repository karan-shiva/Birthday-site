import { useState, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ShopHero from './ShopHero'
import ProductGrid from './ProductGrid'
import Confirmation from './Confirmation'

export default function ShopSection() {
  const [view, setView] = useState('shop')
  const [selectedItems, setSelectedItems] = useState([])
  const sectionRef = useRef(null)
  const productsRef = useRef(null)

  function scrollToSection() {
    sectionRef.current?.scrollIntoView({ behavior: 'instant' })
  }

  function handleEnter() {
    productsRef.current?.scrollIntoView({ behavior: 'smooth' })
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
    scrollToSection()
  }

  function handleChangeMind() {
    setSelectedItems([])
    setView('shop')
    scrollToSection()
  }

  return (
    <section ref={sectionRef}>
      <AnimatePresence mode="wait" initial={false}>
        {view === 'shop' && (
          <motion.div
            key="shop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <ShopHero onEnter={handleEnter} selectedItems={selectedItems} />
            <div ref={productsRef}>
              <ProductGrid
                selectedItems={selectedItems}
                onSelect={handleSelectItem}
                onConfirm={handleConfirm}
              />
            </div>
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
