import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import Cart from './pages/Cart'
import Product from './pages/Product'
import ScrollToTop from './hooks/ScrollToTop'
import { LayoutGroup } from 'framer-motion'

function App() {
  return (
    <LayoutGroup>
      <div>
        <Header />
        <main className="pt-20 sm:pt-0">
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product/:id" element={<Product />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </LayoutGroup>
  )
}

export default App
