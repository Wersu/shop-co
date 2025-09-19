import React from 'react'
import RatingStars from './RatingStar'

const NewArrivals = () => {
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
    <section className="mx-auto flex max-w-7xl flex-col items-center gap-13 border-b-1 border-black/10 pt-18 pb-16 sm:gap-8 sm:pt-12 sm:pb-10 xl:container">
      <h2 className="title title-section text-5xl">NEW ARRIVALS</h2>
      <div className="no-scrollbar grid grid-cols-4 gap-5 overflow-auto max-xl:flex max-xl:w-full max-xl:max-w-full max-xl:pl-5 max-sm:[&>*]:min-w-[250px] sm:[&>*]:min-w-[300px]">
        {products.map((product) => {
          return (
            <div className="" key={product.id}>
              <a
                href="#!"
                className="block overflow-hidden rounded-3xl bg-[#F0EEED]"
              >
                <img
                  src={product.imgPath}
                  alt={product.title}
                  className="transition-transform hover:scale-110"
                />
              </a>
              <div className="mt-4 flex flex-col gap-2">
                <a className="subtitle text-xl hover:text-black/60">
                  {product.title}
                </a>
                <div className="flex gap-3">
                  <RatingStars rating={product.rating} />
                  <p className="text-sm">
                    {product.rating}
                    <span className="text-black/60">/5</span>
                  </p>
                </div>
                {product.sale ? (
                  <div className="flex gap-2.5">
                    <p className="subtitle text-xl sm:text-2xl">
                      ${product.price * ((100 - product.sale) / 100)}
                    </p>
                    <p className="subtitle text-xl text-black/40 line-through sm:text-2xl">
                      ${product.price}
                    </p>
                    <p className="inline content-center rounded-full bg-[rgba(255,51,51,0.1)] px-3 py-1.5 text-xs text-[#FF3333]">
                      -{product.sale}%
                    </p>
                  </div>
                ) : (
                  <p className="subtitle text-xl sm:text-2xl">
                    ${product.price}
                  </p>
                )}
              </div>
            </div>
          )
        })}
      </div>
      <a
        href="#!"
        className="box-border w-55 rounded-full border-1 border-black/10 px-13 py-3 text-center hover:border-black hover:bg-black hover:text-white max-sm:w-[90%] sm:py-4"
      >
        View All
      </a>
    </section>
  )
}

export default NewArrivals
