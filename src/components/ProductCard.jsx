import React from 'react'
import RatingStars from './RatingStar'

const ProductCard = ({ product }) => {
  console.log('product', product)
  return (
    <div>
      <a href="#!" className="block overflow-hidden rounded-3xl bg-[#F0EEED]">
        <img
          src={product.imgPath}
          alt={product.title}
          className="transition-transform hover:scale-110"
        />
      </a>
      <div className="mt-4 flex flex-col gap-2">
        <a className="subtitle text-xl hover:text-black/60" href="#!">
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
              ${Math.round(product.price * ((100 - product.sale) / 100))}
            </p>
            <p className="subtitle text-xl text-black/40 line-through sm:text-2xl">
              ${product.price}
            </p>
            <p className="inline content-center rounded-full bg-[rgba(255,51,51,0.1)] px-3 py-1.5 text-xs text-[#FF3333]">
              -{product.sale}%
            </p>
          </div>
        ) : (
          <p className="subtitle text-xl sm:text-2xl">${product.price}</p>
        )}
      </div>
    </div>
  )
}

export default ProductCard
