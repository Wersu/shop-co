import React, { useState } from 'react'
import ReviewList from './ReviewList'
import { useSelector } from 'react-redux'

const ProductTabs = () => {
  const product = useSelector((state) => state.product.product)

  const [activeTab, setActiveTab] = useState('product-detals')

  let faqs = () => {
    return (
      <div className="mt-6 space-y-6">
        {product.faqs.map(({ question, answer }, idx) => {
          return (
            <div key={idx}>
              <h3 className="text-lg font-semibold">{question}</h3>
              <p className="text-black/60">{answer}</p>
            </div>
          )
        })}
      </div>
    )
  }

  let productDetails = () => {
    return (
      <div className="mt-6 space-y-6">
        {product.productDetails.descriptions.map((item, idx) => {
          return (
            <p className="text-black/70" key={idx}>
              {item}
            </p>
          )
        })}
        <ul className="grid gap-4 sm:grid-cols-2">
          {Object.entries(product.productDetails.params).map(([key, value]) => (
            <li key={key}>
              <span className="font-medium text-black">{key}: </span> {value}
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-3 pt-[30px] sm:pt-[50px] md:pt-20">
      <ul className="grid grid-cols-3 items-stretch">
        <li
          className={
            'cursor-pointer self-end border-b py-4 text-center text-[16px] transition-all sm:text-[20px]/[22px] md:hover:text-[24px]/[22px] lg:pb-6' +
            (activeTab === 'product-detals'
              ? ' border-black text-black'
              : ' border-black/10 text-black/60 hover:border-black/30 hover:text-black/70')
          }
          onClick={() => {
            setActiveTab('product-detals')
          }}
        >
          Product Details
        </li>
        <li
          className={
            'cursor-pointer self-end border-b py-4 text-center text-[16px] transition-all sm:text-[20px]/[22px] md:hover:text-[24px]/[22px] lg:pb-6' +
            (activeTab === 'reviews'
              ? ' border-black text-black'
              : ' border-black/10 text-black/60 hover:border-black/30 hover:text-black/70')
          }
          onClick={() => {
            setActiveTab('reviews')
          }}
        >
          Rating & Reviews
        </li>
        <li
          className={
            'cursor-pointer self-end border-b py-4 text-center text-[16px] transition-all sm:text-[20px]/[22px] md:hover:text-[24px]/[22px] lg:pb-6' +
            (activeTab === 'faqs'
              ? ' border-black text-black'
              : ' border-black/10 text-black/60 hover:border-black/30 hover:text-black/70')
          }
          onClick={() => {
            setActiveTab('faqs')
          }}
        >
          FAQs
        </li>
      </ul>
      <div className="">
        {activeTab === 'reviews' ? (
          <ReviewList />
        ) : activeTab === 'faqs' ? (
          faqs()
        ) : (
          productDetails()
        )}
      </div>
    </div>
  )
}

export default ProductTabs
