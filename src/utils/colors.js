export const getColorHex = (color) => {
  if (typeof color === 'string') return color
  if (!color || typeof color !== 'object') return null
  const keys = Object.keys(color)
  return keys.length > 0 ? keys[0] : null
}

export const getColorName = (color) => {
  if (typeof color === 'string') return color
  const hex = getColorHex(color)
  return hex ? color[hex] : null
}
