import React, { useRef } from 'react'
import RatingStars from './RatingStar'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import useScrollAnimation from '../hooks/useScrollAnimation'

import 'swiper/css'
import 'swiper/css/navigation'

const Reviews = () => {
  useScrollAnimation()
  const swiperRef = useRef(null)

  const reviews = [
    {
      name: 'Sarah M.',
      text: "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
      rating: 5,
    },
    {
      name: 'Alex K.',
      text: 'Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.',
      rating: 3,
    },
    {
      name: 'James L.',
      text: "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.",
      rating: 4,
    },
    {
      name: 'Sarah M.',
      text: "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
      rating: 4,
    },
    {
      name: 'Alex K.',
      text: 'Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.',
      rating: 3,
    },
    {
      name: 'James L.',
      text: "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.",
      rating: 5,
    },
    {
      name: 'Sarah M.',
      text: "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
      rating: 4,
    },
    {
      name: 'Alex K.',
      text: 'Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.',
      rating: 3,
    },
    {
      name: 'James L.',
      text: "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.",
      rating: 5,
    },
  ]

  const markEdges = (swiper) => {
    if (!swiper || !swiper.slides || !swiper.slides.length) return

    Array.from(swiper.slides).forEach((el) =>
      el.classList.remove('edge-visible')
    )

    if (typeof window !== 'undefined' && window.innerWidth < 1700) return

    const idxs = swiper.visibleSlidesIndexes || []
    if (!idxs.length) return

    if (swiper.isBeginning) {
      const firstVisible = idxs[0]
      swiper.slides[firstVisible]?.classList.add('edge-visible')
    }
    if (swiper.isEnd) {
      const lastVisible = idxs[idxs.length - 1]
      swiper.slides[lastVisible]?.classList.add('edge-visible')
    }
  }

  const markEdgesAsync = (s) =>
    requestAnimationFrame(() => requestAnimationFrame(() => markEdges(s)))

  return (
    <section className="reviews scroll-hidden relative pt-20">
      <div className="container mx-auto mb-6 flex max-w-7xl items-center justify-between px-4">
        <h2 className="title text-3xl font-black">OUR HAPPY CUSTOMERS</h2>
        <div className="flex gap-2">
          <button
            id="reviews-prev"
            onClick={() => {
              swiperRef.current?.slidePrev(400)
            }}
            className="prev-btn p-2 hover:text-black/60"
            aria-label="Prev"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.70406 4.4541L2.95406 11.2041C2.84918 11.3086 2.76597 11.4328 2.70919 11.5696C2.6524 11.7063 2.62317 11.8529 2.62317 12.001C2.62317 12.149 2.6524 12.2957 2.70919 12.4324C2.76597 12.5691 2.84918 12.6933 2.95406 12.7979L9.70406 19.5479C9.91541 19.7592 10.2021 19.8779 10.5009 19.8779C10.7998 19.8779 11.0865 19.7592 11.2978 19.5479C11.5092 19.3365 11.6279 19.0499 11.6279 18.751C11.6279 18.4521 11.5092 18.1654 11.2978 17.9541L6.46875 13.125L20.25 13.125C20.5484 13.125 20.8345 13.0065 21.0455 12.7955C21.2565 12.5846 21.375 12.2984 21.375 12C21.375 11.7017 21.2565 11.4155 21.0455 11.2045C20.8345 10.9936 20.5484 10.875 20.25 10.875L6.46875 10.875L11.2987 6.04598C11.5101 5.83463 11.6288 5.54799 11.6288 5.2491C11.6288 4.95022 11.5101 4.66357 11.2987 4.45223C11.0874 4.24088 10.8008 4.12215 10.5019 4.12215C10.203 4.12215 9.91634 4.24088 9.705 4.45223L9.70406 4.4541Z"
                fill="currentColor"
              />
            </svg>
          </button>
          <button
            id="reviews-next"
            onClick={() => {
              swiperRef.current?.slideNext(400)
            }}
            className="next-btn p-2 hover:text-black/60"
            aria-label="Next"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.2959 4.4541L21.0459 11.2041C21.1508 11.3086 21.234 11.4328 21.2908 11.5696C21.3476 11.7063 21.3768 11.8529 21.3768 12.001C21.3768 12.149 21.3476 12.2957 21.2908 12.4324C21.234 12.5691 21.1508 12.6933 21.0459 12.7979L14.2959 19.5479C14.0846 19.7592 13.7979 19.8779 13.4991 19.8779C13.2002 19.8779 12.9135 19.7592 12.7022 19.5479C12.4908 19.3365 12.3721 19.0499 12.3721 18.751C12.3721 18.4521 12.4908 18.1654 12.7022 17.9541L17.5313 13.125L3.75 13.125C3.45163 13.125 3.16548 13.0065 2.9545 12.7955C2.74353 12.5846 2.625 12.2984 2.625 12C2.625 11.7017 2.74353 11.4155 2.95451 11.2045C3.16548 10.9936 3.45163 10.875 3.75 10.875L17.5313 10.875L12.7013 6.04598C12.4899 5.83463 12.3712 5.54799 12.3712 5.2491C12.3712 4.95022 12.4899 4.66357 12.7013 4.45223C12.9126 4.24088 13.1992 4.12215 13.4981 4.12215C13.797 4.12215 14.0837 4.24088 14.295 4.45223L14.2959 4.4541Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="mx-auto w-full overflow-hidden">
        <Swiper
          modules={[Navigation]}
          onInit={(s) => {
            swiperRef.current = s
            markEdgesAsync(s)
          }}
          onReachBeginning={markEdgesAsync}
          onReachEnd={markEdgesAsync}
          onFromEdge={markEdgesAsync}
          onSlideChange={markEdgesAsync}
          onResize={markEdgesAsync}
          slidesPerView="auto"
          spaceBetween={20}
          centeredSlides
          centeredSlidesBounds
          initialSlide={1}
          watchSlidesProgress
          loop={false}
          className="py-8"
          breakpoints={{
            320: {
              // spaceBetween: 60,
            },
            640: {},
          }}
        >
          {reviews.map((review, idx) => (
            <SwiperSlide key={idx} className="flex !w-auto">
              <div className="review-card mx-2 w-[500px] max-[520px]:w-[350px] max-[350px]:w-[300px] sm:w-[400px]">
                <div className="flex h-full flex-col rounded-2xl border border-black/10 bg-white p-6 px-7 pt-8 max-[350px]:p-3 max-[350px]:px-3 max-[350px]:pt-5">
                  <div className="mb-3.5">
                    <RatingStars rating={review.rating} />
                  </div>
                  <div className="mb-3 flex items-center gap-1.5">
                    <h3 className="subtitle text-xl">{review.name}</h3>
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
                  <p className="text-black/60">"{review.text}"</p>
                  {reviews.data && (
                    <p className="mt-3 text-black/60">
                      Posted on {reviews.data}
                    </p>
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

export default Reviews
