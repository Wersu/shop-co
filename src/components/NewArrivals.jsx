import React from 'react'
import ProductCard from './ProductCard'
import useScrollAnimation from '../hooks/useScrollAnimation'
import { Link } from 'react-router-dom'

const NewArrivals = () => {
  useScrollAnimation()
  let products = [
    {
      id: 1,
      imgPath: './img/products/black-t-shirt.png',
      title: 'T-shirt With Tape Details',
      rating: 4.5,
      price: 120,
    },
    {
      id: 2,
      imgPath: './img/products/blue-jeans.png',
      title: 'Skinny Fit Jeans',
      rating: 3.5,
      price: 260,
      sale: 20,
    },
    {
      id: 3,
      imgPath: './img/products/checkered-shirt.png',
      title: 'Checkered Shirt',
      rating: 4.5,
      price: 180,
    },
    {
      id: 4,
      imgPath: './img/products/stripped-t-shirt.png',
      title: 'Sleeve Striped T-shirt',
      rating: 4.5,
      price: 160,
      sale: 30,
    },
  ]

  return (
    <section className="scroll-hidden mx-auto flex max-w-7xl flex-col items-center gap-13 border-b-1 border-black/10 pt-18 pb-16 sm:gap-8 sm:pt-12 sm:pb-10 xl:container">
      <h2 className="title title-section text-5xl">NEW ARRIVALS</h2>
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

export default NewArrivals
