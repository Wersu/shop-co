import React from 'react'
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
  const { id, productId, colorId } = useParams()
  const dispatch = useDispatch()
  const { products, product } = useSelector((state) => state.product)

  useEffect(() => {
    const normalizedId = productId ?? id
    let found = null

    if (productId && colorId) {
      const variants = products.filter(
        (item) => String(item.productId) === String(productId)
      )
      if (variants.length) {
        const index = Number.parseInt(colorId, 10) - 1
        const safeIndex =
          Number.isNaN(index) || index < 0 || index >= variants.length
            ? 0
            : index
        found = variants[safeIndex]
      }
    }

    if (!found && normalizedId) {
      found = products.find((item) => String(item.id) === String(normalizedId))
    }

    if (!found && normalizedId) {
      const variants = products.filter(
        (item) => String(item.productId) === String(normalizedId)
      )
      if (variants.length) found = variants[0]
    }

    if (found) dispatch(setProduct(found))
  }, [id, productId, colorId, products, dispatch])

  if (!product) return <div>Loading...</div>

  const productGroupId = product.productId ?? product.id
  const productVariants = products.filter(
    (item) => String(item.productId) === String(productGroupId)
  )
  const colorIndex = productVariants.findIndex(
    (item) => item.id === product.id
  )
  const colorParam = colorIndex >= 0 ? colorIndex + 1 : 1
  const productHref = productGroupId
    ? `/product/${productGroupId}/color/${colorParam}`
    : `/product/${product.id}`

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/shop' },
    {
      label: product.category || 'Catalog',
      href: '/shop',
    },
    {
      label: product.title,
      href: productHref,
    },
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
