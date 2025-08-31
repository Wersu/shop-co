import React from 'react'
import RatingStars from './RatingStar'

const TopSelling = () => {
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
    <section className="center b container mx-auto flex flex-col items-center gap-13 pt-16 pb-20">
      <h2 className="title text-5xl">TOP SELLING</h2>
      <div className="grid grid-cols-4 gap-5">
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
                    {product.rating} <span className="text-black/60">/5</span>
                  </p>
                </div>
                {product.sale ? (
                  <div className="flex gap-2.5">
                    <p className="subtitle text-2xl">
                      $
                      {Math.round(product.price * ((100 - product.sale) / 100))}
                    </p>
                    <p className="subtitle text-2xl text-black/40 line-through">
                      ${product.price}
                    </p>
                    <p className="inline content-center rounded-full bg-[rgba(255,51,51,0.1)] px-3 py-1.5 text-xs text-[#FF3333]">
                      -{product.sale}%
                    </p>
                  </div>
                ) : (
                  <p className="subtitle text-2xl">${product.price}</p>
                )}
              </div>
            </div>
          )
        })}
      </div>
      <a
        href="#!"
        className="box-border w-55 rounded-full border-1 border-black/10 px-13 py-4 text-center hover:border-black hover:bg-black hover:text-white"
      >
        View All
      </a>
    </section>
  )
}

export default TopSelling
