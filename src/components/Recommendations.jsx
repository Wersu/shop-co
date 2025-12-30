import React from 'react'
import ProductCard from './ProductCard'
import useScrollAnimation from '../hooks/useScrollAnimation'
import { useSelector } from 'react-redux'

const Recommendations = () => {
  const indexes =
    useSelector((state) => state.product.product?.recommendations) || []
  let products = useSelector((state) => state.product.products)
  const seen = new Set()
  products = products.filter((product) => {
    const key = product.productId ?? product.id
    if (!indexes.includes(key)) return false
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
  useScrollAnimation()

  return (
    <section className="scroll-hidden mx-auto flex flex-col items-center gap-13 pt-16 pb-10 sm:gap-8 sm:pt-12 md:pb-0 xl:container 2xl:max-w-7xl">
      <h2 className="title title-section px-1.5 text-center text-5xl">
        YOU MIGHT ALSO LIKE
      </h2>
      <div className="no-scrollbar grid grid-cols-4 gap-5 overflow-auto max-xl:flex max-xl:w-full max-xl:max-w-full max-xl:pl-5 max-sm:[&>*]:min-w-[250px] sm:[&>*]:min-w-[300px]">
        {products.map((product) => {
          return (
            <div className="" key={product.id}>
              <ProductCard product={product} />
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default Recommendations
