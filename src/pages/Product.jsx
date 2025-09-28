import React, { useState } from 'react'
import Recommendations from '../components/Recommendations'
import { useParams } from 'react-router-dom'

import Breadcrumbs from '../components/Breadcrumbs'
import ProductGallery from '../components/ProductGallery'
import ProductInfo from '../components/ProductInfo'
import ProductTabs from '../components/ProductTabs'

function Product() {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/catalog' },
    { label: 'Men', href: '/catalog?category=men' },
    { label: 'T-shirts', href: '/catalog?category=tshirts' },
    { label: 'One Life Graphic T-shirt', href: '/product/1' },
  ]

  const [selectedColor, setSelectedColor] = useState('brown')

  return (
    <section className="">
      <Breadcrumbs paths={breadcrumbs} />

      <div className="container mx-auto grid grid-cols-1 gap-10 px-3 lg:grid-cols-2">
        <ProductGallery selectedColor={selectedColor} />
        <ProductInfo
        // selectedColor={selectedColor}
        // setSelectedColor={setSelectedColor}
        />
      </div>

      <ProductTabs />

      <Recommendations />
    </section>
  )
}

export default Product
