import React from 'react'

const DressStyle = () => {
  return (
    <div className="container mx-auto rounded-2xl bg-[#F0F0F0] px-16 pt-18 pb-19">
      <h1 className="title mb-16 text-center text-5xl">
        BROWSE BY DRESS STYLE
      </h1>

      <div className="mb-5 flex gap-5">
        <a
          href="#!"
          className="relative h-72 flex-2 overflow-hidden rounded-xl"
        >
          <img
            src="./img/home-page/casual-bg.png"
            alt=""
            className="h-full w-full transform object-cover transition duration-300 hover:scale-105"
          />
          <h3 className="subtitle absolute top-4 left-4 rounded-md bg-white/70 px-3 py-1 text-4xl">
            Casual
          </h3>
        </a>
        <a
          href="#!"
          className="relative h-72 flex-3 overflow-hidden rounded-xl"
        >
          <img
            src="./img/home-page/formal-bg.png"
            alt=""
            className="h-full w-full transform object-cover transition duration-300 hover:scale-105"
          />
          <h3 className="subtitle absolute top-4 left-4 rounded-md bg-white/70 px-3 py-1 text-4xl">
            Formal
          </h3>
        </a>
      </div>
      <div className="flex gap-5">
        <a
          href="#!"
          className="relative h-72 flex-3 overflow-hidden rounded-xl"
        >
          <img
            src="./img/home-page/party-bg.png"
            alt=""
            className="h-full w-full transform object-cover transition duration-300 hover:scale-105"
          />
          <h3 className="subtitle absolute top-4 left-4 rounded-md bg-white/70 px-3 py-1 text-4xl">
            Party
          </h3>
        </a>
        <a
          href="#!"
          className="relative h-72 flex-2 overflow-hidden rounded-xl"
        >
          <img
            src="./img/home-page/gym-bg.png"
            alt=""
            className="h-full w-full transform object-cover transition duration-300 hover:scale-105"
          />
          <h3 className="subtitle absolute top-4 left-4 rounded-md bg-white/70 px-3 py-1 text-4xl">
            Gym
          </h3>
        </a>
      </div>
    </div>
  )
}

export default DressStyle
