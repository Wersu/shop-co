const RatingStars = ({ rating }) => {
  const fullStars = Math.floor(rating)
  const hasHalf = rating !== Math.floor(rating)

  return (
    <div className="flex gap-1">
      {Array(fullStars)
        .fill(0)
        .map((_, i) => (
          <svg
            key={`full-${i}`}
            width="19"
            height="17"
            viewBox="0 0 19 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.24494 0.255127L11.8641 5.89504L18.0374 6.64322L13.4829 10.8771L14.679 16.9794L9.24494 13.9561L3.8109 16.9794L5.00697 10.8771L0.452479 6.64322L6.62573 5.89504L9.24494 0.255127Z"
              fill="#FFC633"
            />
          </svg>
        ))}
      {hasHalf && (
        <svg
          width="9"
          height="17"
          viewBox="0 0 9 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.56594 16.9794L8.99998 13.9561V0.255127L6.38077 5.89504L0.20752 6.64322L4.76201 10.8771L3.56594 16.9794Z"
            fill="#FFC633"
          />
        </svg>
      )}
    </div>
  )
}

export default RatingStars
