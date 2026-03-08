import { useState } from 'react'
import ParticleBackground from './components/ParticleBackground'
import Hero from './components/Hero'
import Gallery from './components/Gallery'
import WishWheel from './components/WishWheel'
import ShopSection from './components/ShopSection'

function App() {
  const [showShop, setShowShop] = useState(false)

  return (
    <>
      <ParticleBackground />
      {!showShop ? (
        <main>
          <Hero />
          <Gallery
            maskGradient="radial-gradient(ellipse 70% 70% at center, rgba(10, 8, 32, 0.18) 55%, #0a0820 100%)"
          />
          <WishWheel onOpenShop={() => {
            window.scrollTo(0, 0)
            setShowShop(true)
          }} />
        </main>
      ) : (
        <ShopSection onClose={() => {
          window.scrollTo(0, 0)
          setShowShop(false)
        }} />
      )}
    </>
  )
}

export default App
