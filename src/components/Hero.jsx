import React from 'react'

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-[#f0f0f0]">
      <div className="relative container mx-auto">
        <div className="relative z-10 flex flex-col gap-8 py-28">
          <h1 className="title max-w-1/2 text-6xl capitalize">
            Find clothes that matches your style
          </h1>
          <p className="max-w-xl text-black/60">
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of
            style.
          </p>
          <a
            href="#!"
            className="inline-block w-52 rounded-full bg-black p-4 text-center text-white hover:opacity-60"
          >
            Shop Now
          </a>

          <dl className="justify-centermax-w-xl mt-4 flex flex-wrap">
            <div className="flex flex-col-reverse border-r-1 border-black/10 pr-8">
              <dt className="-m-0.5 text-sm text-black/60">
                International Brands
              </dt>
              <dd className="subtitle text-4xl">200+</dd>
            </div>
            <div className="flex flex-col-reverse border-r-1 border-black/10 pr-8 pl-8">
              <dt className="-m-0.5 text-sm text-black/60">
                High-Quality Products
              </dt>
              <dd className="subtitle text-4xl">2,000+</dd>
            </div>
            <div className="flex flex-col-reverse pl-8">
              <dt className="-m-0.5 text-sm text-black/60">Happy Customers</dt>
              <dd className="subtitle text-4xl">30,000+</dd>
            </div>
          </dl>
        </div>
        <div className="hero__bg-img absolute top-0 -right-20 z-0 h-full w-auto">
          <img
            src="./img/home-page/hero-bg-tablet3.jpg"
            alt="Background cover"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  )
}

export default Hero
