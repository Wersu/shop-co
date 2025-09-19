import React from 'react'

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-[#f0f0f0] sm:mt-0">
      <div className="relative container mx-auto max-w-7xl px-2 pb-[500px] lg:pb-0">
        <div className="relative z-10 flex flex-col gap-8 pt-10 md:pt-28 lg:py-28">
          <h1 className="title text-[36px]/[34px] capitalize sm:text-[45px]/[50px] md:text-[53px]/[58px] lg:max-w-1/2 lg:text-6xl">
            Find clothes that matches your style
          </h1>
          <p className="text-black/60 lg:max-w-xl">
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of
            style.
          </p>
          <a
            href="#!"
            className="inline-block w-full rounded-full bg-black p-4 text-center text-white hover:opacity-60 sm:w-52"
          >
            Shop Now
          </a>

          <dl className="mt-1 flex max-w-xl flex-col flex-wrap items-center justify-center gap-y-3.5 sm:mt-4 sm:flex-row">
            <div className="flex flex-col-reverse items-center border-black/10 sm:border-r-1 sm:pr-8">
              <dt className="-m-0.5 text-sm text-black/60">
                International Brands
              </dt>
              <dd className="subtitle text-2xl sm:text-4xl">200+</dd>
            </div>
            <div className="flex flex-col-reverse items-center border-black/10 sm:border-r-1 sm:pr-8 sm:pl-8">
              <dt className="-m-0.5 text-sm text-black/60">
                High-Quality Products
              </dt>
              <dd className="subtitle text-2xl sm:text-4xl">2,000+</dd>
            </div>
            <div className="flex flex-col-reverse items-center sm:pl-8">
              <dt className="-m-0.5 text-sm text-black/60">Happy Customers</dt>
              <dd className="subtitle text-2xl sm:text-4xl">30,000+</dd>
            </div>
          </dl>
        </div>
        <div className="hero__bg-img absolute right-1/2 bottom-0 z-0 h-[500px] w-max max-lg:translate-x-1/2 lg:top-0 min-lg:-right-60 lg:h-full lg:w-auto xl:-right-20">
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
