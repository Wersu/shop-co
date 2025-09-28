import React from 'react'
import ProductCard from './ProductCard'
import useScrollAnimation from '../hooks/useScrollAnimation'
import { Link } from 'react-router-dom'

const Recommendations = () => {
  useScrollAnimation()
  let products = [
    {
      id: 1,
      imgPath: '/img/products/blue-polo.png',
      title: 'Polo with Contrast Trims',
      rating: 4.0,
      price: 242,
      sale: 20,
    },
    {
      id: 2,
      imgPath: '/img/products/white-t-shirt.png',
      title: 'Gradient Graphic T-shirt',
      rating: 3.5,
      price: 145,
    },
    {
      id: 3,
      imgPath: '/img/products/pink-polo.png',
      title: 'Polo with Tipping Details',
      rating: 4.5,
      price: 180,
    },
    {
      id: 4,
      imgPath: '/img/products/black-striped-t-shirt.png',
      title: 'Black Striped T-shirt',
      rating: 5.0,
      price: 150,
      sale: 30,
    },
  ]

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
