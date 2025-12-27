import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import ProductCard from './../components/ProductCard'
import { applyCatalogFilters } from '../store/productSlice'
import { getColorHex, getColorName } from '../utils/colors'

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

  const colorOptions = [
    { '#00C12B': 'green' },
    { '#F50606': 'red' },
    { '#F5DD06': 'yellow' },
    { '#F57906': 'orange' },
    { '#06CAF5': 'cyan' },
    { '#063AF5': 'blue' },
    { '#7D06F5': 'purple' },
    { '#F506A4': 'pink' },
    { '#FFFFFF': 'white' },
    { '#000000': 'black' },
  ]

  const filtersContent = (
    <>
      <div className="flex items-center justify-between">
        <h2 className="subtitle text-base md:text-[20px]">Filters</h2>
        <img
          className="fill-opacity cursor-pointer opacity-40 md:hidden"
          src="./img/icon/close.svg"
          onClick={() => setIsFiltersOpen(false)}
          aria-label="Close filters"
          alt="Close filters"
        />
        <img
          className="fill-opacity hidden opacity-40 md:block"
          src="./img/icon/filters.svg"
          alt=""
        />
      </div>

      <div className="">
        <ul className="space-y-1 text-gray-700">
          {['T-shirts', 'Shorts', 'Shirts', 'Hoodie', 'Jeans'].map((item) => (
            <li
              key={item}
              className={`flex cursor-pointer items-center justify-between ${
                localFilters.category === item
                  ? 'text-black opacity-100'
                  : 'opacity-60 hover:opacity-100'
              }`}
              onClick={() =>
                setLocalFilters((prev) => ({ ...prev, category: item }))
              }
            >
              <p className="text-black">{item}</p>
              <img src="./img/icon/arrow-right.svg" alt="" />
            </li>
          ))}
        </ul>
      </div>

      {/* PRICE */}
      <div className="">
        <h3 className="subtitle mb-3 text-base md:mb-5 md:text-[20px]">
          Price
        </h3>
        <input
          type="range"
          min="50"
          max="200"
          value={priceValue}
          onChange={(e) => setPriceValue(Number(e.target.value))}
          onPointerUp={() =>
            setLocalFilters((prev) => ({
              ...prev,
              price: [50, Number(priceValue)],
            }))
          }
          onTouchEnd={() =>
            setLocalFilters((prev) => ({
              ...prev,
              price: [50, Number(priceValue)],
            }))
          }
          className="w-full border-0 bg-[#F0F0F0] accent-black outline-0!"
        />
        <div className="mt-1 flex justify-between text-sm">
          <span>$50</span>
          <span>${priceValue}</span>
        </div>
      </div>

      {/* COLORS */}
      <div className="">
        <h3 className="subtitle mb-3 text-base md:mb-5 md:text-[20px]">
          Colors
        </h3>
        <div className="flex flex-wrap gap-2 xl:gap-3">
          {colorOptions.map((color) => {
            const hex = getColorHex(color)
            const name = getColorName(color)
            const isSelected = localFilters.colors.some(
              (picked) =>
                getColorName(picked)?.toLowerCase() === name?.toLowerCase()
            )
            return (
              <button
                key={name || hex}
                onClick={() => {
                  if (!name) return
                  setLocalFilters((prev) => ({
                    ...prev,
                    colors: isSelected
                      ? prev.colors.filter(
                          (picked) =>
                            getColorName(picked)?.toLowerCase() !==
                            name.toLowerCase()
                        )
                      : [...prev.colors, color],
                  }))
                }}
                className={`relative h-[29px] w-[29px] rounded-full border-2 border-black/20 text-white! hover:scale-110 xl:h-[37px] xl:w-[37px] ${
                  isSelected ? '' : ''
                } `}
                style={{ backgroundColor: hex }}
              >
                {isSelected &&
                  (hex === '#FFFFFF' ? (
                    <svg
                      width="14"
                      height="11"
                      viewBox="0 0 14 11"
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-black!"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.5306 2.03063L5.5306 10.0306C5.46092 10.1005 5.37813 10.156 5.28696 10.1939C5.1958 10.2317 5.09806 10.2512 4.99935 10.2512C4.90064 10.2512 4.8029 10.2317 4.71173 10.1939C4.62057 10.156 4.53778 10.1005 4.4681 10.0306L0.968098 6.53063C0.898333 6.46087 0.842993 6.37804 0.805236 6.28689C0.76748 6.19574 0.748047 6.09804 0.748047 5.99938C0.748047 5.90072 0.76748 5.80302 0.805236 5.71187C0.842993 5.62072 0.898333 5.53789 0.968098 5.46813C1.03786 5.39837 1.12069 5.34302 1.21184 5.30527C1.30299 5.26751 1.40069 5.24808 1.49935 5.24808C1.59801 5.24808 1.69571 5.26751 1.78686 5.30527C1.87801 5.34302 1.96083 5.39837 2.0306 5.46813L4.99997 8.4375L12.4693 0.969379C12.6102 0.828483 12.8013 0.749329 13.0006 0.749329C13.1999 0.749329 13.391 0.828483 13.5318 0.969379C13.6727 1.11028 13.7519 1.30137 13.7519 1.50063C13.7519 1.69989 13.6727 1.89098 13.5318 2.03188L13.5306 2.03063Z"
                        fill="black"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="14"
                      height="11"
                      viewBox="0 0 14 11"
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white!"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.5306 2.03063L5.5306 10.0306C5.46092 10.1005 5.37813 10.156 5.28696 10.1939C5.1958 10.2317 5.09806 10.2512 4.99935 10.2512C4.90064 10.2512 4.8029 10.2317 4.71173 10.1939C4.62057 10.156 4.53778 10.1005 4.4681 10.0306L0.968098 6.53063C0.898333 6.46087 0.842993 6.37804 0.805236 6.28689C0.76748 6.19574 0.748047 6.09804 0.748047 5.99938C0.748047 5.90072 0.76748 5.80302 0.805236 5.71187C0.842993 5.62072 0.898333 5.53789 0.968098 5.46813C1.03786 5.39837 1.12069 5.34302 1.21184 5.30527C1.30299 5.26751 1.40069 5.24808 1.49935 5.24808C1.59801 5.24808 1.69571 5.26751 1.78686 5.30527C1.87801 5.34302 1.96083 5.39837 2.0306 5.46813L4.99997 8.4375L12.4693 0.969379C12.6102 0.828483 12.8013 0.749329 13.0006 0.749329C13.1999 0.749329 13.391 0.828483 13.5318 0.969379C13.6727 1.11028 13.7519 1.30137 13.7519 1.50063C13.7519 1.69989 13.6727 1.89098 13.5318 2.03188L13.5306 2.03063Z"
                        fill="white"
                      />
                    </svg>
                  ))}
              </button>
            )
          })}
        </div>
      </div>

      {/* SIZES */}
      <div className="">
        <h3 className="subtitle mb-3 text-base md:mb-5 md:text-[20px]">Size</h3>
        <div className="flex flex-wrap gap-2">
          {[
            'XX-Small',
            'X-Small',
            'Small',
            'Medium',
            'Large',
            'X-Large',
            'XX-Large',
            '3X-Large',
            '4X-Large',
          ].map((s) => (
            <button
              key={s}
              onClick={() =>
                setLocalFilters((prev) => ({
                  ...prev,
                  sizes: prev.sizes.includes(s)
                    ? prev.sizes.filter((i) => i !== s)
                    : [...prev.sizes, s],
                }))
              }
              className={`cursor-pointer rounded-full px-3 py-2 sm:px-4 sm:py-2 ${
                localFilters.sizes.includes(s)
                  ? 'bg-black text-white'
                  : 'border border-[#F0F0F0] bg-[#F0F0F0] text-black/60 hover:border-black/60'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* DRESS STYLE */}
      <div className="">
        <h3 className="subtitle mb-3 text-base md:mb-5 md:text-[20px]">
          Dress Style
        </h3>
        <ul className="space-y-1 text-gray-700">
          {['Casual', 'Formal', 'Party', 'Gym'].map((item) => (
            <li
              key={item}
              className={`flex cursor-pointer items-center justify-between ${
                localFilters.dressStyle === item
                  ? 'text-black opacity-100'
                  : 'opacity-60 hover:opacity-100'
              }`}
              onClick={() =>
                setLocalFilters((prev) => ({ ...prev, dressStyle: item }))
              }
            >
              <p className="text-black">{item}</p>
              <img src="./img/icon/arrow-right.svg" alt="" />
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={handleApply}
        className="mt-4 w-full rounded-[62px] bg-black pt-3! pb-3 text-white transition hover:bg-zinc-800"
      >
        Apply Filter
      </button>
    </>
  )

  return (
    <div className="container mx-auto grid w-full grid-cols-12 px-2 sm:gap-4 md:gap-8 2xl:max-w-7xl">
      <aside className="col-span-12 hidden h-fit rounded-[20px] border border-black/10 bg-white px-3 py-5 sm:col-span-4 sm:block lg:col-span-3 xl:p-6 [&>*]:border-b [&>*]:border-black/10 [&>*]:not-first:pt-3 [&>*]:not-last:pb-3 md:[&>*]:not-first:pt-6 md:[&>*]:not-last:pb-6">
        {filtersContent}
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
          } [&>*]:border-b [&>*]:border-black/10 [&>*]:not-first:pt-3 [&>*]:not-last:pb-3`}
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
          {filtersContent}
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
              <div className="min-w-0" key={product.id}>
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
