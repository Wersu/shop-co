import './App.css'
import Header from './components/Header'
import Hero from './components/Hero'
import Brands from './components/Brands'
import NewArrivals from './components/NewArrivals'
import TopSelling from './components/TopSelling'
import DressStyle from './components/DressStyle'
import Reviews from './components/Reviews'
import Footer from './components/Footer'

function App() {
  return (
    <div>
      <Header />
      <main className="pt-[80px] sm:pt-0">
        <Hero />
        <Brands />
        <NewArrivals />
        <TopSelling />
        <DressStyle />
        <Reviews />
      </main>
      <Footer />
    </div>
  )
}
export default App
