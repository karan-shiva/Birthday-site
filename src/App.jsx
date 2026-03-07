import ParticleBackground from './components/ParticleBackground'
import Hero from './components/Hero'
import Messages from './components/Messages'
import Gallery from './components/Gallery'

function App() {
  return (
    <>
      <ParticleBackground />
      <main>
        <Hero />
        <Gallery />
        <Messages />
      </main>
    </>
  )
}

export default App
