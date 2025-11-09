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
    <div className="container mx-auto px-3 pt-[80px] pb-[64px]">
      <ul className="grid grid-cols-3 items-center">
        <li
          // from-[#F0F0F0] to-white to-80%  hover:bg-radial
          className={
            'cursor-pointer border-b pb-6 text-center text-[20px]/[22px] transition-all hover:text-[24px]/[22px]' +
            (activeTab === 'product-detals'
              ? ' border-black text-black'
              : ' border-black/10 text-black/60')
          }
          onClick={() => {
            setActiveTab('product-detals')
          }}
        >
          Product Details
        </li>
        <li
          className={
            'cursor-pointer border-b pb-6 text-center text-[20px]/[22px] transition-all hover:text-[24px]/[22px]' +
            (activeTab === 'reviews'
              ? ' border-black text-black'
              : ' border-black/10 text-black/60')
          }
          onClick={() => {
            setActiveTab('reviews')
          }}
        >
          Rating & Reviews
        </li>
        <li
          className={
            'cursor-pointer border-b pb-6 text-center text-[20px]/[22px] transition-all hover:text-[24px]/[22px]' +
            (activeTab === 'faqs'
              ? ' border-black text-black'
              : ' border-black/10 text-black/60')
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
