import React, { useState } from 'react'
import ReviewList from './ReviewList'

const ProductTabs = () => {
  const [activeTab, setActiveTab] = useState('product-detals')

  let faqs = () => {
    return (
      <div className="mt-6 space-y-6">
        <div>
          <h3 className="text-lg font-semibold">
            How should I care for the t-shirt?
          </h3>
          <p className="text-black/60">
            Machine wash in cold water (30°C) with similar colors. Do not
            bleach. Air dry.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold">
            Does the t-shirt shrink after washing?
          </h3>
          <p className="text-black/60">
            No, thanks to pre-treatment, the fabric keeps its shape and does not
            shrink.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold">
            Is the fit suitable for everyday wear?
          </h3>
          <p className="text-black/60">
            Yes, the t-shirt has a universal Regular Fit — comfortable both for
            sports and casual looks.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold">
            Can I return it if the size doesn’t fit?
          </h3>
          <p className="text-black/60">
            Yes, returns are accepted within 30 days if the tag and packaging
            are preserved.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold">
            What material is the t-shirt made of?
          </h3>
          <p className="text-black/60">
            100% organic cotton — breathable, soft, and eco-friendly.
          </p>
        </div>
      </div>
    )
  }

  let productDetails = () => {
    return (
      <div className="mt-6 space-y-6">
        <p className="text-black/70">
          This premium t-shirt is crafted from 100% organic cotton, offering a
          breathable and lightweight feel. Designed with a timeless cut, it’s
          perfect for both casual and smart-casual outfits.
        </p>
        <p className="text-black/70">
          Durable stitching and high-quality fabric ensure long-lasting wear
          while maintaining softness wash after wash.
        </p>

        <ul className="grid gap-4 sm:grid-cols-2">
          <li>
            <span className="font-medium text-black">Material:</span> 100%
            Organic Cotton
          </li>
          <li>
            <span className="font-medium text-black">Fit:</span> Regular
          </li>
          <li>
            <span className="font-medium text-black">Care:</span> Machine wash
            cold
          </li>
          <li>
            <span className="font-medium text-black">Origin:</span> Made in
            Italy
          </li>
          <li>
            <span className="font-medium text-black">Sizes:</span> S, M, L, XL
          </li>
        </ul>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-3 pt-[80px] pb-[64px]">
      <ul className="grid grid-cols-3 items-center">
        <li
          className={
            'cursor-pointer border-b pb-6 text-center text-[20px]/[22px]' +
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
            'cursor-pointer border-b pb-6 text-center text-[20px]/[22px]' +
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
            'cursor-pointer border-b pb-6 text-center text-[20px]/[22px]' +
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
