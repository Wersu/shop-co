import React, { useState } from 'react'
import { useSelector } from 'react-redux'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'

const ProductGallery = () => {
  let [indexImg, setIndexImg] = useState(0)
  const product = useSelector((state) => state.product.product)
  const selectedColor = useSelector((state) => state.product.selectedColor)
  const images = product.images
  const currentSrc = images[selectedColor][indexImg]

  return (
    <div className="flex flex-1 flex-col-reverse gap-3.5 xl:flex-row">
      <div className="flex gap-3.5 xl:max-w-[152px] xl:flex-col">
        {images[selectedColor].map((item, idx) => {
          return (
            <button
              key={idx}
              className={`block aspect-square w-full overflow-hidden rounded-3xl border xl:h-auto ${indexImg === idx ? 'border-black' : 'border-transparent hover:border-black/30'}`}
              onClick={() => {
                setIndexImg(idx)
              }}
            >
              <img
                src={item}
                alt={product.title}
                className="block h-full w-full overflow-hidden rounded-3xl bg-[#F0EEED] object-cover"
              />
            </button>
          )
        })}
      </div>
      <div className="aspect-square w-full overflow-hidden rounded-2xl bg-[#F0EEED]">
        {/* <img
          src={images[selectedColor][indexImg]}
          alt=""
          className="block h-full w-full object-contain object-center"
        /> */}
        <motion.img
          src={currentSrc}
          alt={product.title}
          className="block h-full w-auto object-cover justify-self-center"
          layoutId={`product-${product.id}`}
          transition={{ duration: 0.45 }}
          data-fly-img={`product-${product.id}`}
          />
      </div>
    </div>
  )
}

export default ProductGallery
