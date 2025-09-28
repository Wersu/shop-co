import React from 'react'
import Hero from '../components/Hero'
import Brands from '../components/Brands'
import NewArrivals from '../components/NewArrivals'
import TopSelling from '../components/TopSelling'
import DressStyle from '../components/DressStyle'
import Reviews from '../components/Reviews'

const Home = () => {
  return (
    <>
      <Hero />
      <Brands />
      <NewArrivals />
      <TopSelling />
      <DressStyle />
      <Reviews />
    </>
  )
}

export default Home
