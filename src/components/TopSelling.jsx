import React from 'react'
import ProductCard from './ProductCard'
import useScrollAnimation from '../hooks/useScrollAnimation'
import { Link } from 'react-router-dom'

const TopSelling = () => {
  useScrollAnimation()
  let products = [
    {
      id: 1,
      imgPath: './img/products/stripped-shirt.png',
      title: 'Sleeve Striped T-shirt',
      rating: 5.0,
      price: 212,
      sale: 20,
    },
    {
      id: 2,
      imgPath: './img/products/orange-t-shirt.png',
      title: 'Courage Graphic T-shirt',
      rating: 4.0,
      price: 145,
    },
    {
      id: 3,
      imgPath: './img/products/bermuda-shorts.png',
      title: 'Loose Fit Bermuda Shorts',
      rating: 3.0,
      price: 80,
    },
    {
      id: 4,
      imgPath: './img/products/black-jeans.png',
      title: 'Faded Skinny Jeans',
      rating: 4.5,
      price: 210,
    },
  ]

  return (
    <section className="scroll-hidden mx-auto flex max-w-7xl flex-col items-center gap-13 pt-16 pb-20 sm:gap-8 sm:pt-12 sm:pb-10 xl:container">
      <h2 className="title title-section text-5xl">TOP SELLING</h2>
      <div className="no-scrollbar grid grid-cols-4 gap-5 overflow-auto max-xl:flex max-xl:w-full max-xl:max-w-full max-xl:pl-5 max-sm:[&>*]:min-w-[250px] sm:[&>*]:min-w-[300px]">
        {products.map((product) => {
          return (
            <div className="" key={product.id}>
              <ProductCard product={product} />
            </div>
          )
        })}
      </div>
      <Link
        to="/catalog"
        className="box-border w-55 rounded-full border-1 border-black/10 px-13 py-3 text-center hover:border-black hover:bg-black hover:text-white max-sm:w-[90%] sm:py-4"
      >
        View All
      </Link>
    </section>
  )
}

export default TopSelling
