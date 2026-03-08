import ParticleBackground from './components/ParticleBackground'
import Hero from './components/Hero'
import Gallery from './components/Gallery'
import WishWheel from './components/WishWheel'
import ShopSection from './components/ShopSection'

function App() {
  return (
    <>
      <ParticleBackground />
      <main>
        <Hero />
        <Gallery
          maskGradient="radial-gradient(ellipse 70% 70% at center, rgba(10, 8, 32, 0.18) 55%, #0a0820 100%)"
        />
        <WishWheel />
        <ShopSection />
      </main>
    </>
  )
}

export default App
