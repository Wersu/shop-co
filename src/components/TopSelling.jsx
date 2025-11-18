import React from 'react'
import ProductCard from './ProductCard'
import useScrollAnimation from '../hooks/useScrollAnimation'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const TopSelling = () => {
  useScrollAnimation()

  const products = useSelector((state) => state.product.products)
  const topProducts = products.filter((product) => product.isTop)
  topProducts.sort(() => 0.5 - Math.random())

  return (
    <section className="scroll-hidden mx-auto flex flex-col items-center gap-13 pt-16 pb-20 sm:gap-8 sm:pt-12 sm:pb-10 xl:container 2xl:max-w-7xl">
      <h2 className="title title-section text-5xl">TOP SELLING</h2>
      <div className="no-scrollbar grid grid-cols-4 gap-5 overflow-auto max-xl:flex max-xl:w-full max-xl:max-w-full max-xl:pl-5 max-sm:[&>*]:min-w-[250px] sm:[&>*]:min-w-[300px]">
        {topProducts.slice(0, 4).map((product) => {
          return (
            <div className="" key={product.id}>
              <ProductCard product={product} />
            </div>
          )
        })}
      </div>
      <Link
        to="/catalog"
        className="box-border w-55 rounded-full border border-black/10 px-13 py-3 text-center hover:border-black hover:bg-black hover:text-white max-sm:w-[90%] sm:py-4"
      >
        View All
      </Link>
    </section>
  )
}

export default TopSelling
