import { useCallback, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import FeaturedDishes from './components/FeaturedDishes'
import Menu from './components/Menu'
import Gallery from './components/Gallery'
import Visit from './components/Visit'
import Reserve from './components/Reserve'
import Footer from './components/Footer'
import Intro from './components/intro/Intro'

export default function App() {
  const [revealed, setRevealed] = useState(false) // the website is built as the curtain starts to lift
  const [introDone, setIntroDone] = useState(false) // the intro is removed once it has finished
  const reveal = useCallback(() => setRevealed(true), [])
  const finish = useCallback(() => setIntroDone(true), [])

  return (
    <>
      {revealed && (
        <>
          <Navbar />
          <main>
            <Hero />
            <FeaturedDishes />
            <Menu />
            <Gallery />
            <Visit />
            <Reserve />
          </main>
          <Footer />
        </>
      )}
      {!introDone && <Intro onReveal={reveal} onDone={finish} />}
    </>
  )
}