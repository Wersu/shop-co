import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import ProductCard from './../components/ProductCard'
import CatalogFiltersContent from '../components/CatalogFiltersContent'
import { applyCatalogFilters, resetCatalogFilters } from '../store/productSlice'

const Catalog = () => {
  const dispatch = useDispatch()

  const products = useSelector((state) => state.product.catalogFilteredProducts)

  const [localFilters, setLocalFilters] = useState({
    category: null,
    price: [50, 200],
    colors: [],
    sizes: [],
    dressStyle: null,
  })
  const [priceValue, setPriceValue] = useState(200)
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const [dragY, setDragY] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const touchStartY = useRef(0)
  const canDrag = useRef(false)
  const dragDisabled = useRef(false)

  useEffect(() => {
    return () => {
      dispatch(resetCatalogFilters())
    }
  }, [dispatch])

  useEffect(() => {
    if (!isFiltersOpen) return
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = overflow
    }
  }, [isFiltersOpen])
  useEffect(() => {
    if (!isFiltersOpen) {
      setDragY(0)
      setIsDragging(false)
    }
  }, [isFiltersOpen])
  useEffect(() => {
    setPriceValue(localFilters.price[1])
  }, [localFilters.price])

  const handleApply = () => {
    dispatch(applyCatalogFilters(localFilters))
    setIsFiltersOpen(false)
  }

  return (
    <div className="container mx-auto grid w-full grid-cols-12 px-2 sm:gap-4 md:gap-8 2xl:max-w-7xl">
      <aside className="col-span-12 hidden h-fit rounded-[20px] border border-black/10 bg-white px-3 py-5 sm:col-span-4 sm:block lg:col-span-3 xl:p-6 [&>*]:border-b [&>*]:border-black/10 [&>*]:not-first:pt-3 [&>*]:not-last:pb-3 md:[&>*]:not-first:pt-6 md:[&>*]:not-last:pb-6">
        <CatalogFiltersContent
          localFilters={localFilters}
          setLocalFilters={setLocalFilters}
          priceValue={priceValue}
          setPriceValue={setPriceValue}
          onApply={handleApply}
          onClose={() => setIsFiltersOpen(false)}
        />
      </aside>

      <div
        className={`fixed inset-0 z-60 sm:hidden ${
          isFiltersOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
        aria-hidden={!isFiltersOpen}
      >
        <button
          type="button"
          className={`absolute inset-0 bg-black/40 transition-opacity ${
            isFiltersOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsFiltersOpen(false)}
          aria-label="Close filters"
        />
        <aside
          className={`no-scrollbar absolute right-0 bottom-0 left-0 max-h-[85vh] overflow-y-auto rounded-t-[20px] border border-black/10 bg-white px-3 py-5 ${
            isDragging ? 'transition-none' : 'transition-transform duration-200'
          } *:border-b *:border-black/10 *:not-first:pt-3 *:not-last:pb-3`}
          style={{
            transform: isFiltersOpen
              ? `translateY(${dragY}px)`
              : 'translateY(100%)',
          }}
          onTouchStart={(e) => {
            touchStartY.current = e.touches[0].clientY
            dragDisabled.current = Boolean(
              e.target.closest('input[type="range"]')
            )
            canDrag.current = e.currentTarget.scrollTop === 0
            setIsDragging(false)
          }}
          onTouchMove={(e) => {
            if (!canDrag.current || dragDisabled.current) return
            const delta = e.touches[0].clientY - touchStartY.current
            if (delta <= 0) return
            e.preventDefault()
            setIsDragging(true)
            setDragY(delta)
          }}
          onTouchEnd={() => {
            if (!canDrag.current || dragDisabled.current) return
            if (dragY > 120) {
              setIsFiltersOpen(false)
            } else {
              setDragY(0)
            }
            setIsDragging(false)
            canDrag.current = false
            dragDisabled.current = false
          }}
        >
          <CatalogFiltersContent
            localFilters={localFilters}
            setLocalFilters={setLocalFilters}
            priceValue={priceValue}
            setPriceValue={setPriceValue}
            onApply={handleApply}
            onClose={() => setIsFiltersOpen(false)}
          />
        </aside>
      </div>

      <section className="col-span-12 sm:col-span-8 lg:col-span-9">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="subtitle text-[24px] md:text-[32px]">Casual</h2>
          <button
            className="rounded-full bg-[#F0F0F0] p-2 sm:hidden"
            onClick={() => setIsFiltersOpen(true)}
          >
            <img src="./img/icon/filters.svg" alt="" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-x-3 gap-y-6 min-[390px]:grid-cols-2 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {products.map((product) => {
            return (
              <div className="min-w-0 justify-self-center" key={product.id}>
                <ProductCard product={product} />
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}

export default Catalog
