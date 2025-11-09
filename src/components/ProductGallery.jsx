import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const ProductGallery = () => {
  let [indexImg, setIndexImg] = useState(0)
  const product = useSelector((state) => state.product.product)
  const selectedColor = useSelector((state) => state.product.selectedColor)
  const images = product.images

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
                alt={product.title}
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
