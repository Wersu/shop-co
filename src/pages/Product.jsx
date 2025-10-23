import React, { useState } from 'react'
import Recommendations from '../components/Recommendations'

import Breadcrumbs from '../components/Breadcrumbs'
import ProductGallery from '../components/ProductGallery'
import ProductInfo from '../components/ProductInfo'
import ProductTabs from '../components/ProductTabs'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { setProduct } from '../store/productSlice'
import { useEffect } from 'react'

function Product() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { products, product } = useSelector((state) => state.product)

  useEffect(() => {
    const found = products.find((p) => p.id === Number(id))
    if (found) dispatch(setProduct(found))
  }, [id, products, dispatch])

  if (!product) return <div>Loading...</div>

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/catalog' },
    { label: 'Men', href: '/catalog?category=men' },
    { label: 'T-shirts', href: '/catalog?category=tshirts' },
    { label: 'One Life Graphic T-shirt', href: '/product/1' },
  ]

  return (
    <section className="mx-auto max-w-7xl">
      <Breadcrumbs paths={breadcrumbs} />

      <div className="container mx-auto grid grid-cols-1 gap-10 px-3 lg:grid-cols-2">
        <ProductGallery />
        <ProductInfo />
      </div>

      <ProductTabs />

      <Recommendations />
    </section>
  )
}

export default Product
