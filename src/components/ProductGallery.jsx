import React, { useState } from 'react'

const ProductGallery = ({ selectedColor }) => {
  let [indexImg, setIndexImg] = useState(0)

  let images = {
    brown: [
      '/img/product-page/t-shirt-front.png',
      '/img/product-page/t-shirt-back.png',
      '/img/product-page/t-shirt-real.png',
    ],
    green: [
      '/img/products/stripped-t-shirt.png',
      '/img/products/stripped-t-shirt.png',
      '/img/products/stripped-t-shirt.png',
    ],
    blue: [
      '/img/products/blue-polo.png',
      '/img/products/blue-polo.png',
      '/img/products/blue-polo.png',
    ],
  }

  return (
    <div className="flex flex-1 gap-3.5">
      <div className="flex max-w-[152px] flex-col gap-3.5">
        {images[selectedColor].map((item, idx) => {
          return (
            <button
              key={idx}
              className={`overflow-hidden rounded-3xl border ${indexImg === idx ? 'border-black' : 'border-transparent'}`}
              onClick={() => {
                setIndexImg(idx)
              }}
            >
              <img
                src={item}
                alt=""
                className="block overflow-hidden rounded-3xl bg-[#F0EEED] object-cover"
              />
            </button>
          )
        })}
      </div>
      <div className="overflow-hidden rounded-2xl bg-[#F0EEED]">
        <img
          src={images[selectedColor][indexImg]}
          alt=""
          className="block h-full w-auto object-cover"
        />
      </div>
    </div>
  )
}

export default ProductGallery
