import React from 'react'

const DressStyle = () => {
  return (
    <section className="px-4">
      <div className="container mx-auto max-w-7xl rounded-2xl bg-[#F0F0F0] px-6 pt-10 pb-7 lg:px-16 lg:pt-18 lg:pb-19">
        <h2 className="title title-section mb-7 text-center text-5xl md:mb-16">
          BROWSE BY DRESS STYLE
        </h2>

        <div className="mb-4 block gap-5 md:mb-5 md:flex">
          <a
            href="#!"
            className="relative mb-4 block h-48 flex-2 overflow-hidden rounded-xl bg-white md:mb-0 md:h-72"
          >
            <img
              src="./img/home-page/casual-bg.png"
              alt=""
              className="h-full w-auto transform justify-self-end object-cover transition duration-300 hover:scale-105 max-md:w-[70%] max-sm:w-[80%] lg:w-full"
              style={{ objectPosition: '100% 100%' }}
            />
            <h3
              className="subtitle absolute top-4 left-4 rounded-md px-3 py-1 text-4xl"
              style={{ fontSize: 'clamp(1.5rem, 1.221rem + 1.14vw, 2.25rem)' }}
            >
              Casual
            </h3>
          </a>
          <a
            href="#!"
            className="relative block h-48 flex-3 overflow-hidden rounded-xl md:h-72"
          >
            <img
              src="./img/home-page/formal-bg.png"
              alt=""
              className="h-full w-full transform object-cover transition duration-300 hover:scale-105"
            />
            <h3
              className="subtitle absolute top-4 left-4 rounded-md px-3 py-1 text-4xl"
              style={{ fontSize: 'clamp(1.5rem, 1.221rem + 1.14vw, 2.25rem)' }}
            >
              Formal
            </h3>
          </a>
        </div>
        <div className="block gap-5 md:flex">
          <a
            href="#!"
            className="relative mb-4 block h-48 flex-3 overflow-hidden rounded-xl md:mb-0 md:h-72"
          >
            <img
              src="./img/home-page/party-bg.png"
              alt=""
              className="h-full w-full transform object-cover transition duration-300 hover:scale-105"
            />
            <h3
              className="subtitle absolute top-4 left-4 rounded-md px-3 py-1 text-4xl"
              style={{ fontSize: 'clamp(1.5rem, 1.221rem + 1.14vw, 2.25rem)' }}
            >
              Party
            </h3>
          </a>
          <a
            href="#!"
            className="relative block h-48 flex-2 overflow-hidden rounded-xl bg-white md:h-72"
          >
            <img
              src="./img/home-page/gym-bg.png"
              alt=""
              className="h-full w-auto transform justify-self-end object-cover transition duration-300 hover:scale-105 max-md:w-[70%] max-sm:w-[80%] lg:w-full"
              style={{ objectPosition: '100% 30%' }}
            />
            <h3
              className="subtitle absolute top-4 left-4 rounded-md px-3 py-1 text-4xl"
              style={{ fontSize: 'clamp(1.5rem, 1.221rem + 1.14vw, 2.25rem)' }}
            >
              Gym
            </h3>
          </a>
        </div>
      </div>
    </section>
  )
}

export default DressStyle
