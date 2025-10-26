import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { clearSearch } from '../store/productSlice'

const SearchResults = () => {
  const dispatch = useDispatch()
  const { filteredProducts, searchQuery } = useSelector(
    (state) => state.product
  )

  if (filteredProducts.length === 0 || !searchQuery) {
    return null
  }

  const handleClose = () => {
    dispatch(clearSearch())
  }
  const highlightMatch = (text, query) => {
    if (!query.trim()) return text

    const escapedQuery = query.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const regex = new RegExp(`(${escapedQuery})`, 'gi')
    const parts = text.split(regex)

    return parts.map((part, index) =>
      part.toLowerCase() === query.trim().toLowerCase() ? (
        <span key={index} className="subtitle font-black">
          {part}
        </span>
      ) : (
        part
      )
    )
  }
  return (
    <div className="absolute top-full right-0 left-0 z-50 mt-2 max-h-96 overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg">
      <div className="p-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-lg font-semibold">
            Search results ({filteredProducts.length})
          </h3>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="space-y-3">
          {filteredProducts.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              onClick={handleClose}
              className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-gray-50"
            >
              <img
                src={product.images[product.colors[0]][0]}
                alt={product.title}
                className="h-12 w-12 rounded object-cover"
              />
              <div className="flex-1">
                <h4 className="font-medium">
                  {highlightMatch(product.title, searchQuery)}
                </h4>
                <p className="line-clamp-1 text-xs text-gray-600">
                  {product.description}
                </p>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-sm font-semibold">
                    $
                    {product.price -
                      (product.price * (product.sale || 0)) / 100}
                  </span>
                  {product.sale && (
                    <span className="text-xs text-red-600 line-through">
                      ${product.price}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SearchResults
