import ParticleBackground from './components/ParticleBackground'
import Hero from './components/Hero'
import Countdown from './components/Countdown'
import Messages from './components/Messages'
import Gallery from './components/Gallery'

function App() {
  return (
    <>
      <ParticleBackground />
      <main>
        <Hero />
        <Countdown />
        <Messages />
        <Gallery />
      </main>
    </>
  )
}

export default App
