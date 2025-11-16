import React, { useState } from 'react'
import RatingStars from './RatingStar'
import { useSelector, useDispatch } from 'react-redux'
import { setColor, setSize } from '../store/productSlice'
import { addToCart, removeFromCart } from '../store/cartSlice'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'

const ProductInfo = () => {
  const product = useSelector((state) => state.product.product)
  const selectedColor = useSelector((state) => state.product.selectedColor)
  const selectedSize = useSelector((state) => state.product.selectedSize)

  const [sizeError, setSizeError] = useState(false)
  const [shake, setShake] = useState(false)

  const cart = useSelector((state) => state.cart.cart)

  const dispatch = useDispatch()
  const itemInCart = cart.find(
    (item) =>
      item.id === product.id &&
      item.selectedColor === selectedColor &&
      item.selectedSize === selectedSize
  )

  const quantity = itemInCart?.quantity || 0

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true)
      setShake(true)
      setTimeout(() => setShake(false), 500)
      return
    }
    setSizeError(false)
    dispatch(
      addToCart({
        ...product,
        selectedColor,
        selectedSize,
        quantity: 1,
      })
    )
  }

  return (
    <div>
      <div className="flex flex-col gap-3.5 pb-6">
        <h1 className="title text-[40px]">{product.title}</h1>
        <div className="flex gap-3">
          <RatingStars rating={product.rating} />
          <p className="text-sm">
            {product.rating}
            <span className="text-black/60">/5</span>
          </p>
        </div>
        {product.sale ? (
          <div className="flex gap-2.5">
            <p className="subtitle text-3xl sm:text-3xl">
              ${product.actualPrice}
            </p>
            <p className="subtitle text-xl text-black/40 line-through sm:text-2xl">
              ${product.price}
            </p>
            <p className="inline content-center rounded-full bg-[rgba(255,51,51,0.1)] px-3 py-1.5 text-[#FF3333]">
              -{product.sale * 100}%
            </p>
          </div>
        ) : (
          <p className="subtitle text-xl sm:text-3xl">${product.price}</p>
        )}
        <p className="mt-1.5 text-black/60">${product.description}</p>
      </div>

      <div className="border-y border-black/10 py-6">
        <p className="mb-4 text-black/60">Select Colors</p>
        <ul className="flex gap-4">
          {product.colors.map((color) => {
            return (
              <li
                key={color}
                className={`flex h-[37px] w-[37px] cursor-pointer items-center justify-center rounded-full hover:scale-90`}
                onClick={() => dispatch(setColor(color))}
                style={{ backgroundColor: color }}
              >
                {selectedColor === color && (
                  <svg
                    width="14"
                    height="11"
                    viewBox="0 0 14 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.5306 2.03063L5.5306 10.0306C5.46092 10.1005 5.37813 10.156 5.28696 10.1939C5.1958 10.2317 5.09806 10.2512 4.99935 10.2512C4.90064 10.2512 4.8029 10.2317 4.71173 10.1939C4.62057 10.156 4.53778 10.1005 4.4681 10.0306L0.968098 6.53063C0.898333 6.46087 0.842993 6.37804 0.805236 6.28689C0.76748 6.19574 0.748047 6.09804 0.748047 5.99938C0.748047 5.90072 0.76748 5.80302 0.805236 5.71187C0.842993 5.62072 0.898333 5.53789 0.968098 5.46813C1.03786 5.39837 1.12069 5.34302 1.21184 5.30527C1.30299 5.26751 1.40069 5.24808 1.49935 5.24808C1.59801 5.24808 1.69571 5.26751 1.78686 5.30527C1.87801 5.34302 1.96083 5.39837 2.0306 5.46813L4.99997 8.4375L12.4693 0.969379C12.6102 0.828483 12.8013 0.749329 13.0006 0.749329C13.1999 0.749329 13.391 0.828483 13.5318 0.969379C13.6727 1.11028 13.7519 1.30137 13.7519 1.50063C13.7519 1.69989 13.6727 1.89098 13.5318 2.03188L13.5306 2.03063Z"
                      fill="white"
                    />
                  </svg>
                )}
              </li>
            )
          })}
        </ul>
      </div>

      <div className="border-b border-black/10 py-6">
        <motion.p
          className={'mb-4 ' + (sizeError ? 'text-red-600' : 'text-black/60')}
          animate={shake ? { x: [-8, 8, -6, 6, -4, 4, 0] } : { x: 0 }}
          transition={{ duration: 0.5 }}
        >
          Choose Size
        </motion.p>
        <ul className="flex gap-4">
          {product.sizes.map((size) => {
            return (
              <li
                key={size}
                className={
                  selectedSize === size
                    ? 'cursor-pointer rounded-full bg-black px-6 py-3 text-white'
                    : 'cursor-pointer rounded-full border border-[#F0F0F0] bg-[#F0F0F0] px-6 py-3 text-black/60 hover:border-black/60'
                }
                onClick={() => dispatch(setSize(size))}
              >
                {size}
              </li>
            )
          })}
        </ul>
      </div>
      <div className="flex gap-5 pt-6">
        {quantity > 0 && (
          <div
            className={
              'flex w-[170px] items-center justify-between rounded-full bg-[#F0F0F0] px-5 py-4 transition-all'
            }
          >
            <button
              onClick={() =>
                dispatch(
                  removeFromCart({
                    id: product.id,
                    selectedColor,
                    selectedSize,
                  })
                )
              }
              className="hover:scale-120"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.375 12C21.375 12.2984 21.2565 12.5845 21.0455 12.7955C20.8345 13.0065 20.5484 13.125 20.25 13.125H3.75C3.45163 13.125 3.16548 13.0065 2.9545 12.7955C2.74353 12.5845 2.625 12.2984 2.625 12C2.625 11.7016 2.74353 11.4155 2.9545 11.2045C3.16548 10.9935 3.45163 10.875 3.75 10.875H20.25C20.5484 10.875 20.8345 10.9935 21.0455 11.2045C21.2565 11.4155 21.375 11.7016 21.375 12Z"
                  fill="black"
                />
              </svg>
            </button>

            <p className="">{quantity}</p>

            <button
              onClick={() =>
                dispatch(
                  addToCart({
                    ...product,
                    selectedColor,
                    selectedSize,
                    quantity: 1,
                  })
                )
              }
              className="hover:scale-120"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.375 12C21.375 12.2984 21.2565 12.5845 21.0455 12.7955C20.8345 13.0065 20.5484 13.125 20.25 13.125H13.125V20.25C13.125 20.5484 13.0065 20.8345 12.7955 21.0455C12.5845 21.2565 12.2984 21.375 12 21.375C11.7016 21.375 11.4155 21.2565 11.2045 21.0455C10.9935 20.8345 10.875 20.5484 10.875 20.25V13.125H3.75C3.45163 13.125 3.16548 13.0065 2.9545 12.7955C2.74353 12.5845 2.625 12.2984 2.625 12C2.625 11.7016 2.74353 11.4155 2.9545 11.2045C3.16548 10.9935 3.45163 10.875 3.75 10.875H10.875V3.75C10.875 3.45163 10.9935 3.16548 11.2045 2.9545C11.4155 2.74353 11.7016 2.625 12 2.625C12.2984 2.625 12.5845 2.74353 12.7955 2.9545C13.0065 3.16548 13.125 3.45163 13.125 3.75V10.875H20.25C20.5484 10.875 20.8345 10.9935 21.0455 11.2045C21.2565 11.4155 21.375 11.7016 21.375 12Z"
                  fill="black"
                />
              </svg>
            </button>
          </div>
        )}
        <button
          className="flex flex-2 items-center justify-center rounded-full border border-black/0 bg-black px-4 py-4 text-base text-white transition-all hover:opacity-75"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default ProductInfo
