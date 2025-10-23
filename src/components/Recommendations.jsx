import React from 'react'
import ProductCard from './ProductCard'
import useScrollAnimation from '../hooks/useScrollAnimation'
import { useSelector, useDispatch } from 'react-redux'

const Recommendations = () => {
  const product = useSelector((state) => state.product.product)
  useScrollAnimation()
  let products = product.recommendations

  return (
    <section className="scroll-hidden mx-auto flex max-w-7xl flex-col items-center gap-13 pt-16 pb-20 sm:gap-8 sm:pt-12 sm:pb-10 xl:container">
      <h2 className="title title-section text-5xl">YOU MIGHT ALSO LIKE</h2>
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
