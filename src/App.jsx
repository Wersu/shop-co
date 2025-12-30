import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import Shop from './pages/Shop'
import OnSale from './pages/OnSale'
import NewArrivalsPage from './pages/NewArrivalsPage'
import TopSellingPage from './pages/TopSellingPage'
import BrandsPage from './pages/BrandsPage'
import About from './pages/About'
import Cart from './pages/Cart'
import Product from './pages/Product'
import ScrollToTop from './hooks/ScrollToTop'
import { LayoutGroup } from 'framer-motion'

function App() {
  return (
    <LayoutGroup>
    <div>
      <Header />
      <main className="pt-[80px] sm:pt-0">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog title="Catalog" />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/on-sale" element={<OnSale />} />
          <Route path="/shop/new-arrivals" element={<NewArrivalsPage />} />
          <Route path="/shop/top-selling" element={<TopSellingPage />} />
          <Route path="/brands" element={<BrandsPage />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/shop/casual"
            element={<Catalog title="Casual" initialDressStyle="Casual" />}
          />
          <Route
            path="/shop/formal"
            element={<Catalog title="Formal" initialDressStyle="Formal" />}
          />
          <Route
            path="/shop/party"
            element={<Catalog title="Party" initialDressStyle="Party" />}
          />
          <Route
            path="/shop/gym"
            element={<Catalog title="Gym" initialDressStyle="Gym" />}
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:productId/color/:colorId" element={<Product />} />
          <Route path="/product/:id" element={<Product />} />
        </Routes>
      </main>
      <Footer />
    </div>
    </LayoutGroup>
  )
}

export default App
