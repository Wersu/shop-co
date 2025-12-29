import React, { useState, useEffect, useRef } from 'react'
import RatingStars from './RatingStar'
import { useSelector } from 'react-redux'
import { AnimatePresence } from 'framer-motion'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'

const ReviewList = () => {
  const [visibleCard, setVisibleCard] = useState(4)
  const product = useSelector((state) => state.product.product)
  const reviews = product.reviews || []

  const [sortType, setSortType] = useState('latest')
  const [sortedReviews, setSortedReviews] = useState([])
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  useEffect(() => {
    let sorted = [...reviews]
    switch (sortType) {
      case 'latest':
        sorted.sort((a, b) => new Date(b.data) - new Date(a.data))
        break
      case 'earliest':
        sorted.sort((a, b) => new Date(a.data) - new Date(b.data))
        break
      case 'highest':
        sorted.sort((a, b) => b.rating - a.rating)
        break
      case 'lowest':
        sorted.sort((a, b) => a.rating - b.rating)
        break
      default:
        break
    }
    setSortedReviews(sorted)
  }, [sortType, reviews])

  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="flex flex-col content-center">
      <div className="flex flex-col justify-between gap-3 py-6 sm:flex-row sm:items-center">
        <div className="flex items-baseline gap-2">
          <h2 className="text-xl sm:text-2xl">All Reviews</h2>
          <span className="text-black/60">({reviews.length})</span>
        </div>
        <div className="flex items-center gap-2.5">
          {/* <button className="rounded-full bg-[#F0F0F0] px-3 py-3 hover:bg-black hover:text-white">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.125 11.625V20.25C13.125 20.5484 13.0065 20.8345 12.7955 21.0455C12.5845 21.2565 12.2984 21.375 12 21.375C11.7016 21.375 11.4155 21.2565 11.2045 21.0455C10.9935 20.8345 10.875 20.5484 10.875 20.25V11.625C10.875 11.3266 10.9935 11.0405 11.2045 10.8295C11.4155 10.6185 11.7016 10.5 12 10.5C12.2984 10.5 12.5845 10.6185 12.7955 10.8295C13.0065 11.0405 13.125 11.3266 13.125 11.625ZM18.75 18C18.4516 18 18.1655 18.1185 17.9545 18.3295C17.7435 18.5405 17.625 18.8266 17.625 19.125V20.25C17.625 20.5484 17.7435 20.8345 17.9545 21.0455C18.1655 21.2565 18.4516 21.375 18.75 21.375C19.0484 21.375 19.3345 21.2565 19.5455 21.0455C19.7565 20.8345 19.875 20.5484 19.875 20.25V19.125C19.875 18.8266 19.7565 18.5405 19.5455 18.3295C19.3345 18.1185 19.0484 18 18.75 18ZM21 14.25H19.875V3.75C19.875 3.45163 19.7565 3.16548 19.5455 2.9545C19.3345 2.74353 19.0484 2.625 18.75 2.625C18.4516 2.625 18.1655 2.74353 17.9545 2.9545C17.7435 3.16548 17.625 3.45163 17.625 3.75V14.25H16.5C16.2016 14.25 15.9155 14.3685 15.7045 14.5795C15.4935 14.7905 15.375 15.0766 15.375 15.375C15.375 15.6734 15.4935 15.9595 15.7045 16.1705C15.9155 16.3815 16.2016 16.5 16.5 16.5H21C21.2984 16.5 21.5845 16.3815 21.7955 16.1705C22.0065 15.9595 22.125 15.6734 22.125 15.375C22.125 15.0766 22.0065 14.7905 21.7955 14.5795C21.5845 14.3685 21.2984 14.25 21 14.25ZM5.25 15C4.95163 15 4.66548 15.1185 4.4545 15.3295C4.24353 15.5405 4.125 15.8266 4.125 16.125V20.25C4.125 20.5484 4.24353 20.8345 4.4545 21.0455C4.66548 21.2565 4.95163 21.375 5.25 21.375C5.54837 21.375 5.83452 21.2565 6.0455 21.0455C6.25647 20.8345 6.375 20.5484 6.375 20.25V16.125C6.375 15.8266 6.25647 15.5405 6.0455 15.3295C5.83452 15.1185 5.54837 15 5.25 15ZM7.5 11.25H6.375V3.75C6.375 3.45163 6.25647 3.16548 6.0455 2.9545C5.83452 2.74353 5.54837 2.625 5.25 2.625C4.95163 2.625 4.66548 2.74353 4.4545 2.9545C4.24353 3.16548 4.125 3.45163 4.125 3.75V11.25H3C2.70163 11.25 2.41548 11.3685 2.2045 11.5795C1.99353 11.7905 1.875 12.0766 1.875 12.375C1.875 12.6734 1.99353 12.9595 2.2045 13.1705C2.41548 13.3815 2.70163 13.5 3 13.5H7.5C7.79837 13.5 8.08452 13.3815 8.2955 13.1705C8.50647 12.9595 8.625 12.6734 8.625 12.375C8.625 12.0766 8.50647 11.7905 8.2955 11.5795C8.08452 11.3685 7.79837 11.25 7.5 11.25ZM14.25 6.75H13.125V3.75C13.125 3.45163 13.0065 3.16548 12.7955 2.9545C12.5845 2.74353 12.2984 2.625 12 2.625C11.7016 2.625 11.4155 2.74353 11.2045 2.9545C10.9935 3.16548 10.875 3.45163 10.875 3.75V6.75H9.75C9.45163 6.75 9.16548 6.86853 8.9545 7.0795C8.74353 7.29048 8.625 7.57663 8.625 7.875C8.625 8.17337 8.74353 8.45952 8.9545 8.6705C9.16548 8.88147 9.45163 9 9.75 9H14.25C14.5484 9 14.8345 8.88147 15.0455 8.6705C15.2565 8.45952 15.375 8.17337 15.375 7.875C15.375 7.57663 15.2565 7.29048 15.0455 7.0795C14.8345 6.86853 14.5484 6.75 14.25 6.75Z"
                fill="currentColor"
              />
            </svg>
          </button> */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              className="flex items-center gap-2 rounded-full bg-[#F0F0F0] px-5 py-3 transition hover:bg-black hover:text-white"
            >
              {sortType === 'latest' && 'Latest'}
              {sortType === 'earliest' && 'Earliest'}
              {sortType === 'highest' && 'Highest Rating'}
              {sortType === 'lowest' && 'Lowest Rating'}

              <svg
                width="12"
                height="7"
                viewBox="0 0 12 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`transition-transform duration-200 ${
                  isDropdownOpen ? 'rotate-180' : ''
                }`}
              >
                <path
                  d="M11.5306 1.53061L6.5306 6.53061C6.46092 6.60053 6.37813 6.65601 6.28696 6.69386C6.1958 6.73172 6.09806 6.7512 5.99935 6.7512C5.90064 6.7512 5.8029 6.73172 5.71173 6.69386C5.62057 6.65601 5.53778 6.60053 5.4681 6.53061L0.468098 1.53061C0.327202 1.38972 0.248047 1.19862 0.248047 0.999362C0.248047 0.800105 0.327202 0.609009 0.468098 0.468112C0.608994 0.327216 0.800091 0.248062 0.999348 0.248062C1.19861 0.248062 1.3897 0.327216 1.5306 0.468112L5.99997 4.93749L10.4693 0.467488C10.6102 0.326592 10.8013 0.247437 11.0006 0.247437C11.1999 0.247437 11.391 0.326592 11.5318 0.467488C11.6727 0.608384 11.7519 0.79948 11.7519 0.998738C11.7519 1.198 11.6727 1.38909 11.5318 1.52999L11.5306 1.53061Z"
                  fill="currentColor"
                />
              </svg>
            </button>
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -5 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -5 }}
                  transition={{ duration: 0.15, ease: 'easeOut' }}
                  className="absolute left-0 sm:left-auto sm:right-0 z-20 mt-2 w-[180px] overflow-hidden rounded-xl border border-black/10 bg-white shadow-md"
                >
                  {[
                    { value: 'latest', label: 'Latest' },
                    { value: 'earliest', label: 'Earliest' },
                    { value: 'highest', label: 'Highest Rating' },
                    { value: 'lowest', label: 'Lowest Rating' },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSortType(option.value)
                        setIsDropdownOpen(false)
                      }}
                      className={`block w-full px-4 py-2 text-left hover:bg-black/5 ${
                        sortType === option.value
                          ? 'bg-black/10 font-medium'
                          : ''
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <button className="rounded-full bg-black px-[30px] py-3 text-white">
            Write a Review
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-[20px] sm:grid-cols-2">
        {sortedReviews.slice(0, visibleCard).map((reviews, idx) => (
          <div className="reviews-card" key={idx}>
            <div className="flex h-full flex-col rounded-2xl border border-black/10 bg-white p-6 px-7 pt-8 max-[350px]:p-3 max-[350px]:px-3 max-[350px]:pt-5">
              <div className="mb-3.5">
                <RatingStars rating={reviews.rating} />
              </div>
              <div className="mb-3 flex items-center gap-1.5">
                <h3 className="subtitle text-xl">{reviews.name}</h3>
                <svg
                  width="20"
                  height="21"
                  viewBox="0 0 20 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 0.829102C8.07164 0.829102 6.18657 1.40093 4.58319 2.47227C2.97982 3.54362 1.73013 5.06636 0.992179 6.84794C0.254225 8.62952 0.061142 10.5899 0.437348 12.4812C0.813554 14.3725 1.74215 16.1098 3.10571 17.4734C4.46928 18.837 6.20656 19.7656 8.09787 20.1418C9.98919 20.518 11.9496 20.3249 13.7312 19.5869C15.5127 18.849 17.0355 17.5993 18.1068 15.9959C19.1782 14.3925 19.75 12.5075 19.75 10.5791C19.7473 7.99408 18.7192 5.51571 16.8913 3.68783C15.0634 1.85994 12.585 0.831831 10 0.829102ZM14.2806 8.85973L9.03063 14.1097C8.96097 14.1795 8.87826 14.2348 8.78721 14.2725C8.69616 14.3103 8.59857 14.3297 8.5 14.3297C8.40144 14.3297 8.30385 14.3103 8.2128 14.2725C8.12175 14.2348 8.03903 14.1795 7.96938 14.1097L5.71938 11.8597C5.57865 11.719 5.49959 11.5281 5.49959 11.3291C5.49959 11.1301 5.57865 10.9392 5.71938 10.7985C5.86011 10.6577 6.05098 10.5787 6.25 10.5787C6.44903 10.5787 6.6399 10.6577 6.78063 10.7985L8.5 12.5188L13.2194 7.79848C13.2891 7.72879 13.3718 7.67352 13.4628 7.63581C13.5539 7.59809 13.6515 7.57868 13.75 7.57868C13.8486 7.57868 13.9461 7.59809 14.0372 7.63581C14.1282 7.67352 14.2109 7.72879 14.2806 7.79848C14.3503 7.86816 14.4056 7.95088 14.4433 8.04193C14.481 8.13297 14.5004 8.23056 14.5004 8.3291C14.5004 8.42765 14.481 8.52523 14.4433 8.61627C14.4056 8.70732 14.3503 8.79004 14.2806 8.85973Z"
                    fill="#01AB31"
                  />
                </svg>
              </div>
              <p className="text-black/60">"{reviews.text}"</p>
              {reviews.data && (
                <p className="mt-3 text-black/60">Posted on {reviews.data}</p>
              )}
            </div>
          </div>
        ))}
      </div>
      <button
        className={
          'center mt-[36px] box-border w-[245px] self-center rounded-full border-1 border-black/10 px-13 py-3 text-center hover:border-black hover:bg-black hover:text-white max-sm:w-[90%] sm:py-4' +
          (visibleCard >= reviews.length ? ' hidden' : '')
        }
        onClick={() => {
          setVisibleCard((prev) => {
            if (prev + 2 < reviews.length) return prev + 2
            else return reviews.length
          })
        }}
      >
        Load More Reviews
      </button>
    </div>
  )
}

export default ReviewList
