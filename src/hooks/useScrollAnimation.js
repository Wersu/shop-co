import { useEffect } from 'react'

export default function useScrollAnimation() {
  useEffect(() => {
    const elements = document.querySelectorAll('.scroll-hidden')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('scroll-show')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 }
    )

    elements.forEach((el) => observer.observe(el))
  }, [])
}
