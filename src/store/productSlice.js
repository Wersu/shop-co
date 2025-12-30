import { createSlice } from '@reduxjs/toolkit'
import { getColorHex, getColorName } from '../utils/colors'
const base = import.meta.env.BASE_URL

const normalizeValue = (value) => value?.toLowerCase().trim()
const splitColorNames = (value) => {
  if (typeof value !== 'string') return []
  return value
    .split(',')
    .map((name) => normalizeValue(name))
    .filter(Boolean)
}
const getColorLabels = (color) => {
  const name = getColorName(color)
  if (name) return splitColorNames(name)
  if (typeof color === 'string') return [normalizeValue(color)].filter(Boolean)
  return []
}
const getProductCategory = (product) => {
  if (product.category) return product.category
  if (!product.title) return null
  const title = product.title.toLowerCase()
  if (
    title.includes('t-shirt') ||
    title.includes('tshirt') ||
    title.includes('t shirt')
  ) {
    return 'T-shirts'
  }
  if (title.includes('hoodie')) return 'Hoodie'
  if (title.includes('jean')) return 'Jeans'
  if (title.includes('short')) return 'Shorts'
  if (title.includes('shirt')) return 'Shirts'
  return null
}
const getProductDressStyle = (product) => {
  if (product.dressStyle) return product.dressStyle
  if (product.style) return product.style
  if (Array.isArray(product.tags)) {
    const match = product.tags.find((tag) =>
      ['Casual', 'Formal', 'Party', 'Gym'].includes(tag)
    )
    return match || null
  }
  return null
}

const createProductVariants = (products) => {
  return products.flatMap((product) => {
    const colors = Array.isArray(product.colors) ? product.colors : []
    if (colors.length === 0) {
      return [{ ...product, productId: product.id }]
    }

    return colors.map((color, index) => {
      const colorHex = getColorHex(color)
      const colorKey = colorHex
        ? colorHex.replace('#', '').toLowerCase()
        : `v${index + 1}`
      const images =
        colorHex && product.images?.[colorHex]
          ? { [colorHex]: product.images[colorHex] }
          : product.images
      return {
        ...product,
        id: `${product.id}-${colorKey}`,
        productId: product.id,
        colors: [color],
        images,
      }
    })
  })
}

const baseProducts = [
  {
    id: 1,
    title: 'Trailmark Cotton Shirt',
    category: 'Shirts',
    dressStyle: 'Casual',
    price: 300,
    sale: 0.4,
    actualPrice: 0,
    rating: 4.5,
    description:
      'Soft cotton shirt with a subtle graphic and everyday fit for casual wear. This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.',
    colors: [
      { '#354a1f': 'brown, green' },
      { '#000000': 'black' },
      { '#FFFFFF': 'white' },
    ],
    sizes: ['Small', 'Medium', 'Large', 'X-Large'],
    images: {
      '#354a1f': [
        `${base}/img/products/t-shirt-front.png`,
        `${base}/img/products/t-shirt-back.png`,
      ],
      '#000000': [
        `${base}/img/products/black-t-shirt.png`,
        `${base}/img/products/black-t-shirt.png`,
        `${base}/img/products/black-t-shirt.png`,
      ],
      '#FFFFFF': [
        `${base}/img/products/white-t-shirt.png`,
        `${base}/img/products/white-t-shirt.png`,
        `${base}/img/products/white-t-shirt.png`,
      ],
    },
    faqs: [
      {
        question: 'How should I care for the t-shirt?',
        answer:
          'Machine wash in cold water (30°C) with similar colors. Do not bleach. Air dry.',
      },
      {
        question: 'Does the t-shirt shrink after washing?',
        answer:
          'No, thanks to pre-treatment, the fabric keeps its shape and does not shrink.',
      },
      {
        question: 'Is the fit suitable for everyday wear?',
        answer:
          'Yes, the t-shirt has a universal Regular Fit — comfortable both for sports and casual looks.',
      },
      {
        question: 'Can I return it if the size doesn’t fit?',
        answer:
          'Yes, returns are accepted within 30 days if the tag and packaging are preserved.',
      },
      {
        question: 'What material is the t-shirt made of?',
        answer: '100% organic cotton — breathable, soft, and eco-friendly.',
      },
    ],
    productDetails: {
      descriptions: [
        'This premium t-shirt is crafted from 100% organic cotton, offering a breathable and lightweight feel. Designed with a timeless cut, it’s perfect for both casual and smart-casual outfits.',
        'Durable stitching and high-quality fabric ensure long-lasting wear while maintaining softness wash after wash.',
      ],
      params: {
        Material: '100% Organic Cotton',
        Fit: 'Regular',
        Care: 'Machine wash cold',
        Origin: 'Made in Italy',
        Sizes: 'S, M, L, XL',
      },
    },
    reviews: [
      {
        name: 'Samantha D.',
        text: "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.",
        rating: 4.5,
        data: 'August 14, 2023',
      },
      {
        name: 'Alex K.',
        text: "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.",
        rating: 4,
        data: 'August 15, 2023',
      },
      {
        name: 'Ethan R.',
        text: "This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt.",
        rating: 3.5,
        data: 'August 16, 2023',
      },
      {
        name: 'Olivia P.',
        text: "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out.",
        rating: 4,
        data: 'August 17, 2023',
      },
      {
        name: 'Liam K.',
        text: "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion.",
        rating: 4,
        data: 'August 18, 2023',
      },
      {
        name: 'Ava H.',
        text: "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter.",
        rating: 4.5,
        data: 'August 19, 2023',
      },
      {
        name: 'Samantha D.',
        text: "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.",
        rating: 4.5,
        data: 'August 14, 2023',
      },
      {
        name: 'Alex K.',
        text: "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.",
        rating: 4,
        data: 'August 15, 2023',
      },
      {
        name: 'Ethan R.',
        text: "This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt.",
        rating: 3.5,
        data: 'August 16, 2023',
      },
      {
        name: 'Olivia P.',
        text: "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out.",
        rating: 4,
        data: 'August 17, 2023',
      },
      {
        name: 'Liam K.',
        text: "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion.",
        rating: 4,
        data: 'August 18, 2023',
      },
      {
        name: 'Ava H.',
        text: "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter.",
        rating: 4.5,
        data: 'August 19, 2023',
      },
      {
        name: 'Samantha D.',
        text: "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.",
        rating: 4.5,
        data: 'August 14, 2023',
      },
      {
        name: 'Alex K.',
        text: "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.",
        rating: 4,
        data: 'August 15, 2023',
      },
      {
        name: 'Ethan R.',
        text: "This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt.",
        rating: 3.5,
        data: 'August 16, 2023',
      },
      {
        name: 'Olivia P.',
        text: "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out.",
        rating: 4,
        data: 'August 17, 2023',
      },
      {
        name: 'Liam K.',
        text: "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion.",
        rating: 4,
        data: 'August 18, 2023',
      },
      {
        name: 'Ava H.',
        text: "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter.",
        rating: 4.5,
        data: 'August 19, 2023',
      },
    ],
    recommendations: [5, 9, 10, 6],
    isNew: true,
    isTop: true,
  },
  {
    id: 2,
    title: 'Harbor Walk Shorts',
    category: 'Shorts',
    dressStyle: 'Casual',
    price: 140,
    rating: 4.1,
    description:
      'Lightweight casual shorts with an easy waist and breathable fabric for warm days. This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.',
    colors: [
      { '#24c7d6': 'blue' },
    ],
    sizes: ['Small', 'Large'],
    images: {
      '#24c7d6': [
        `${base}/img/products/bermuda-shorts.png`,
        `${base}/img/products/bermuda-shorts.png`,
        `${base}/img/products/bermuda-shorts.png`,
      ],
    },
    faqs: [
      {
        question: 'Are the shorts lined?',
        answer: 'No, they are unlined for lightweight wear.',
      },
      {
        question: 'What is the inseam length?',
        answer: 'Approximately 7 inches for a casual fit.',
      },
      {
        question: 'Do they have pockets?',
        answer: 'Yes, two side pockets and one back pocket.',
      },
    ],
    productDetails: {
      descriptions: [
        'Easy going shorts built with a light weave and a soft finish for warm days.',
        'Relaxed through the seat with clean stitching that stays neat after washing.',
      ],
      params: {
        Material: 'Cotton blend twill',
        Fit: 'Regular',
        Care: 'Machine wash cold',
        Origin: 'Made in Turkey',
        Sizes: 'S, M, L, XL',
      },
    
    },
    reviews: [
      {
        name: 'Samantha D.',
        text: "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.",
        rating: 4.5,
        data: 'August 14, 2023',
      },
      {
        name: 'Alex K.',
        text: "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.",
        rating: 4,
        data: 'August 15, 2023',
      },
      {
        name: 'Ethan R.',
        text: "This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt.",
        rating: 3.5,
        data: 'August 16, 2023',
      },
      {
        name: 'Olivia P.',
        text: "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out.",
        rating: 4,
        data: 'August 17, 2023',
      },
      {
        name: 'Liam K.',
        text: "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion.",
        rating: 4,
        data: 'August 18, 2023',
      },
      {
        name: 'Ava H.',
        text: "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter.",
        rating: 4.5,
        data: 'August 19, 2023',
      },
      {
        name: 'Samantha D.',
        text: "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.",
        rating: 4.5,
        data: 'August 14, 2023',
      },
      {
        name: 'Alex K.',
        text: "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.",
        rating: 4,
        data: 'August 15, 2023',
      },
      {
        name: 'Ethan R.',
        text: "This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt.",
        rating: 3.5,
        data: 'August 16, 2023',
      },
      {
        name: 'Olivia P.',
        text: "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out.",
        rating: 4,
        data: 'August 17, 2023',
      },
      {
        name: 'Liam K.',
        text: "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion.",
        rating: 4,
        data: 'August 18, 2023',
      },
      {
        name: 'Ava H.',
        text: "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter.",
        rating: 4.5,
        data: 'August 19, 2023',
      },
      {
        name: 'Samantha D.',
        text: "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.",
        rating: 4.5,
        data: 'August 14, 2023',
      },
      {
        name: 'Alex K.',
        text: "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.",
        rating: 4,
        data: 'August 15, 2023',
      },
      {
        name: 'Ethan R.',
        text: "This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt.",
        rating: 3.5,
        data: 'August 16, 2023',
      },
      {
        name: 'Olivia P.',
        text: "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out.",
        rating: 4,
        data: 'August 17, 2023',
      },
      {
        name: 'Liam K.',
        text: "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion.",
        rating: 4,
        data: 'August 18, 2023',
      },
      {
        name: 'Ava H.',
        text: "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter.",
        rating: 4.5,
        data: 'August 19, 2023',
      },
    ],
    recommendations: [14, 1, 3, 6],
    isNew: true,
    isTop: true,
  },
  {
    id: 3,
    title: 'Midnight Ridge Jeans',
    category: 'Jeans',
    dressStyle: 'Casual',
    price: 185,
    sale: 0.2,
    rating: 4.6,
    description:
      'Slim casual jeans with a clean finish and durable denim for daily rotation. This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.',
    colors: [
      { '#000000': 'black' },
      { '#13476b': 'blue' },
    ],
    sizes: ['Medium', 'Large', 'X-Large'],
    images: {
      '#000000': [
        `${base}/img/products/black-jeans.png`,
        `${base}/img/products/black-jeans.png`,
        `${base}/img/products/black-jeans.png`,
      ],
      '#13476b': [
        `${base}/img/products/blue-jeans.png`,
        `${base}/img/products/blue-jeans.png`,
        `${base}/img/products/blue-jeans.png`,
      ],
    },
    faqs: [
      {
        question: 'Do the jeans have stretch?',
        answer: 'Yes, a small amount of elastane adds comfort.',
      },
      {
        question: 'Is the fit slim or relaxed?',
        answer: 'Slim through the leg with a regular rise.',
      },
      {
        question: 'How should I wash them?',
        answer: 'Turn inside out and wash cold to preserve color.',
      },
    ],
    productDetails: {
      descriptions: [
        'Slim denim with a clean leg line and subtle stretch for comfort.',
        'Finished with durable seams and a soft hand feel for daily wear.',
      ],
      params: {
        Material: 'Denim with elastane',
        Fit: 'Slim',
        Care: 'Wash cold, hang dry',
        Origin: 'Made in Portugal',
        Sizes: 'S, M, L, XL',
      },
    
    },
    reviews: [
      {
        name: 'Samantha D.',
        text: "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.",
        rating: 4.5,
        data: 'August 14, 2023',
      },
      {
        name: 'Alex K.',
        text: "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.",
        rating: 4,
        data: 'August 15, 2023',
      },
      {
        name: 'Ethan R.',
        text: "This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt.",
        rating: 3.5,
        data: 'August 16, 2023',
      },
      {
        name: 'Olivia P.',
        text: "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out.",
        rating: 4,
        data: 'August 17, 2023',
      },
      {
        name: 'Liam K.',
        text: "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion.",
        rating: 4,
        data: 'August 18, 2023',
      },
      {
        name: 'Ava H.',
        text: "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter.",
        rating: 4.5,
        data: 'August 19, 2023',
      },
      {
        name: 'Samantha D.',
        text: "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.",
        rating: 4.5,
        data: 'August 14, 2023',
      },
      {
        name: 'Alex K.',
        text: "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.",
        rating: 4,
        data: 'August 15, 2023',
      },
      {
        name: 'Ethan R.',
        text: "This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt.",
        rating: 3.5,
        data: 'August 16, 2023',
      },
      {
        name: 'Olivia P.',
        text: "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out.",
        rating: 4,
        data: 'August 17, 2023',
      },
      {
        name: 'Liam K.',
        text: "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion.",
        rating: 4,
        data: 'August 18, 2023',
      },
      {
        name: 'Ava H.',
        text: "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter.",
        rating: 4.5,
        data: 'August 19, 2023',
      },
      {
        name: 'Samantha D.',
        text: "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.",
        rating: 4.5,
        data: 'August 14, 2023',
      },
      {
        name: 'Alex K.',
        text: "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.",
        rating: 4,
        data: 'August 15, 2023',
      },
      {
        name: 'Ethan R.',
        text: "This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt.",
        rating: 3.5,
        data: 'August 16, 2023',
      },
      {
        name: 'Olivia P.',
        text: "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out.",
        rating: 4,
        data: 'August 17, 2023',
      },
      {
        name: 'Liam K.',
        text: "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion.",
        rating: 4,
        data: 'August 18, 2023',
      },
      {
        name: 'Ava H.',
        text: "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter.",
        rating: 4.5,
        data: 'August 19, 2023',
      },
    ],
    recommendations: [8, 1, 2, 6],
    isNew: true,
    isTop: true,
  },
  {
    id: 4,
    title: 'Core Flex Gym Tee',
    category: 'T-shirts',
    dressStyle: 'Gym',
    price: 160,
    rating: 4.0,
    description:
      'Moisture friendly tee with stretch and a neat hem for training sessions. This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.',
    colors: [
      { '#000000': 'white' },
      { '#f08307': 'orange' },
    ],
    sizes: ['Small', 'Medium'],
    images: {
      '#000000': [
        `${base}/img/products/black-stripped-t-shirt.png`,
        `${base}/img/products/black-stripped-t-shirt.png`,
        `${base}/img/products/black-stripped-t-shirt.png`,
      ],
      '#f08307': [
        `${base}/img/products/stripped-t-shirt.png`,
        `${base}/img/products/stripped-t-shirt.png`,
        `${base}/img/products/stripped-t-shirt.png`,
      ],
    },
    faqs: [
      {
        question: 'Is this tee good for workouts?',
        answer: 'Yes, the fabric is moisture friendly.',
      },
      {
        question: 'Does it run true to size?',
        answer: 'Yes, it follows a standard athletic fit.',
      },
      {
        question: 'Is it tagless?',
        answer: 'Yes, the neck label is printed for comfort.',
      },
    ],
    productDetails: {
      descriptions: [
        'Training tee with a smooth touch and flexible knit for movement.',
        'Breathable finish keeps the feel light through long sessions.',
      ],
      params: {
        Material: 'Performance cotton',
        Fit: 'Athletic',
        Care: 'Machine wash cold',
        Origin: 'Made in Vietnam',
        Sizes: 'S, M, L, XL',
      },
    
    },
    reviews: [
      {
        name: 'Samantha D.',
        text: "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.",
        rating: 4.5,
        data: 'August 14, 2023',
      },
      {
        name: 'Alex K.',
        text: "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.",
        rating: 4,
        data: 'August 15, 2023',
      },
      {
        name: 'Ethan R.',
        text: "This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt.",
        rating: 3.5,
        data: 'August 16, 2023',
      },
      {
        name: 'Olivia P.',
        text: "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out.",
        rating: 4,
        data: 'August 17, 2023',
      },
      {
        name: 'Liam K.',
        text: "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion.",
        rating: 4,
        data: 'August 18, 2023',
      },
      {
        name: 'Ava H.',
        text: "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter.",
        rating: 4.5,
        data: 'August 19, 2023',
      },
      {
        name: 'Samantha D.',
        text: "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.",
        rating: 4.5,
        data: 'August 14, 2023',
      },
      {
        name: 'Alex K.',
        text: "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.",
        rating: 4,
        data: 'August 15, 2023',
      },
      {
        name: 'Ethan R.',
        text: "This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt.",
        rating: 3.5,
        data: 'August 16, 2023',
      },
      {
        name: 'Olivia P.',
        text: "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out.",
        rating: 4,
        data: 'August 17, 2023',
      },
      {
        name: 'Liam K.',
        text: "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion.",
        rating: 4,
        data: 'August 18, 2023',
      },
      {
        name: 'Ava H.',
        text: "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter.",
        rating: 4.5,
        data: 'August 19, 2023',
      },
      {
        name: 'Samantha D.',
        text: "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.",
        rating: 4.5,
        data: 'August 14, 2023',
      },
      {
        name: 'Alex K.',
        text: "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.",
        rating: 4,
        data: 'August 15, 2023',
      },
      {
        name: 'Ethan R.',
        text: "This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt.",
        rating: 3.5,
        data: 'August 16, 2023',
      },
      {
        name: 'Olivia P.',
        text: "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out.",
        rating: 4,
        data: 'August 17, 2023',
      },
      {
        name: 'Liam K.',
        text: "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion.",
        rating: 4,
        data: 'August 18, 2023',
      },
      {
        name: 'Ava H.',
        text: "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter.",
        rating: 4.5,
        data: 'August 19, 2023',
      },
    ],
    recommendations: [15, 16, 6, 14],
    isNew: true,
    isTop: true,
  },
  {
    id: 5,
    title: 'City Grid Button Shirt',
    category: 'Shirts',
    dressStyle: 'Casual',
    price: 210,
    sale: 0.15,
    rating: 4.3,
    description:
      'Casual button shirt with crisp lines and a comfortable regular fit. This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.',
    colors: [
      { '#2a206b': 'blue, purple, red' },
      { '#64a178': 'green' },
    ],
    sizes: ['Medium', 'X-Large'],
    images: {
      '#2a206b': [
        `${base}/img/products/checkered-shirt.png`,
        `${base}/img/products/checkered-shirt.png`,
        `${base}/img/products/checkered-shirt.png`,
      ],
      '#64a178': [
        `${base}/img/products/stripped-shirt.png`,
        `${base}/img/products/stripped-shirt.png`,
        `${base}/img/products/stripped-shirt.png`,
      ],
    },
    faqs: [
      {
        question: 'Are these jeans tapered?',
        answer: 'Yes, they narrow slightly toward the ankle.',
      },
      {
        question: 'Do they fade over time?',
        answer: 'Minimal fading with cold washes.',
      },
      {
        question: 'Is the fabric heavy?',
        answer: 'Midweight denim for year round wear.',
      },
    ],
    productDetails: {
      descriptions: [
        'Modern jeans with a tapered leg and balanced weight denim.',
        'Structured look that softens with wear without losing shape.',
      ],
      params: {
        Material: 'Midweight denim',
        Fit: 'Tapered',
        Care: 'Wash cold inside out',
        Origin: 'Made in Italy',
        Sizes: 'S, M, L, XL',
      },
    
    },
    reviews: [
      {
        name: 'Samantha D.',
        text: "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.",
        rating: 4.5,
        data: 'August 14, 2023',
      },
      {
        name: 'Alex K.',
        text: "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.",
        rating: 4,
        data: 'August 15, 2023',
      },
      {
        name: 'Ethan R.',
        text: "This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt.",
        rating: 3.5,
        data: 'August 16, 2023',
      },
      {
        name: 'Olivia P.',
        text: "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out.",
        rating: 4,
        data: 'August 17, 2023',
      },
      {
        name: 'Liam K.',
        text: "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion.",
        rating: 4,
        data: 'August 18, 2023',
      },
      {
        name: 'Ava H.',
        text: "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter.",
        rating: 4.5,
        data: 'August 19, 2023',
      },
      {
        name: 'Samantha D.',
        text: "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.",
        rating: 4.5,
        data: 'August 14, 2023',
      },
      {
        name: 'Alex K.',
        text: "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.",
        rating: 4,
        data: 'August 15, 2023',
      },
      {
        name: 'Ethan R.',
        text: "This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt.",
        rating: 3.5,
        data: 'August 16, 2023',
      },
      {
        name: 'Olivia P.',
        text: "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out.",
        rating: 4,
        data: 'August 17, 2023',
      },
      {
        name: 'Liam K.',
        text: "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion.",
        rating: 4,
        data: 'August 18, 2023',
      },
      {
        name: 'Ava H.',
        text: "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter.",
        rating: 4.5,
        data: 'August 19, 2023',
      },
      {
        name: 'Samantha D.',
        text: "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.",
        rating: 4.5,
        data: 'August 14, 2023',
      },
      {
        name: 'Alex K.',
        text: "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.",
        rating: 4,
        data: 'August 15, 2023',
      },
      {
        name: 'Ethan R.',
        text: "This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt.",
        rating: 3.5,
        data: 'August 16, 2023',
      },
      {
        name: 'Olivia P.',
        text: "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out.",
        rating: 4,
        data: 'August 17, 2023',
      },
      {
        name: 'Liam K.',
        text: "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion.",
        rating: 4,
        data: 'August 18, 2023',
      },
      {
        name: 'Ava H.',
        text: "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter.",
        rating: 4.5,
        data: 'August 19, 2023',
      },
    ],
    recommendations: [1, 9, 10, 6],
    isNew: true,
    isTop: true,
  },
  {
    id: 6,
    title: 'Daybreak Logo Tee',
    category: 'T-shirts',
    dressStyle: 'Casual',
    price: 125,
    rating: 3.9,
    description:
      'Casual t-shirt with a soft handfeel and minimal logo print. This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.',
    colors: [
      { '#e88931': 'orange' },
    ],
    sizes: ['Large', 'X-Large'],
    images: {
      '#e88931': [
        `${base}/img/products/orange-t-shirt.png`,
        `${base}/img/products/orange-t-shirt.png`,
        `${base}/img/products/orange-t-shirt.png`,
      ],
    },
    faqs: [
      {
        question: 'Are the shorts high waisted?',
        answer: 'No, they have a regular rise.',
      },
      {
        question: 'Do they shrink after washing?',
        answer: 'Minimal shrinkage with cold wash and air dry.',
      },
      {
        question: 'Is the waist elastic?',
        answer: 'No, it uses a fixed waistband with belt loops.',
      },
    ],
    productDetails: {
      descriptions: [
        'Stonewash shorts with a laid back finish and easy comfort.',
        'Built for everyday use with reinforced pocket edges.',
      ],
      params: {
        Material: 'Washed denim',
        Fit: 'Regular',
        Care: 'Machine wash cold',
        Origin: 'Made in India',
        Sizes: 'S, M, L, XL',
      },
    
    },
    reviews: [
      {
        name: 'Samantha D.',
        text: "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.",
        rating: 4.5,
        data: 'August 14, 2023',
      },
      {
        name: 'Alex K.',
        text: "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.",
        rating: 4,
        data: 'August 15, 2023',
      },
      {
        name: 'Ethan R.',
        text: "This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt.",
        rating: 3.5,
        data: 'August 16, 2023',
      },
      {
        name: 'Olivia P.',
        text: "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out.",
        rating: 4,
        data: 'August 17, 2023',
      },
      {
        name: 'Liam K.',
        text: "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion.",
        rating: 4,
        data: 'August 18, 2023',
      },
      {
        name: 'Ava H.',
        text: "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter.",
        rating: 4.5,
        data: 'August 19, 2023',
      },
      {
        name: 'Samantha D.',
        text: "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.",
        rating: 4.5,
        data: 'August 14, 2023',
      },
      {
        name: 'Alex K.',
        text: "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.",
        rating: 4,
        data: 'August 15, 2023',
      },
      {
        name: 'Ethan R.',
        text: "This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt.",
        rating: 3.5,
        data: 'August 16, 2023',
      },
      {
        name: 'Olivia P.',
        text: "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out.",
        rating: 4,
        data: 'August 17, 2023',
      },
      {
        name: 'Liam K.',
        text: "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion.",
        rating: 4,
        data: 'August 18, 2023',
      },
      {
        name: 'Ava H.',
        text: "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter.",
        rating: 4.5,
        data: 'August 19, 2023',
      },
      {
        name: 'Samantha D.',
        text: "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.",
        rating: 4.5,
        data: 'August 14, 2023',
      },
      {
        name: 'Alex K.',
        text: "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.",
        rating: 4,
        data: 'August 15, 2023',
      },
      {
        name: 'Ethan R.',
        text: "This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt.",
        rating: 3.5,
        data: 'August 16, 2023',
      },
      {
        name: 'Olivia P.',
        text: "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out.",
        rating: 4,
        data: 'August 17, 2023',
      },
      {
        name: 'Liam K.',
        text: "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion.",
        rating: 4,
        data: 'August 18, 2023',
      },
      {
        name: 'Ava H.',
        text: "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter.",
        rating: 4.5,
        data: 'August 19, 2023',
      },
    ],
    recommendations: [7, 4, 1, 2],
    isNew: true,
    isTop: true,
  },
  {
    id: 7,
    title: 'Canvas Stripe Tee',
    category: 'T-shirts',
    dressStyle: 'Casual',
    price: 195,
    sale: 0.25,
    rating: 4.2,
    description:
      'Relaxed t-shirt with fine stripes and smooth combed cotton. This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.',
    colors: [
      { '#3a7ea6': 'cyan' },
      { '#bf7ab0': 'pink' },
    ],
    sizes: ['Small', 'Large'],
    images: {
      '#3a7ea6': [
        `${base}/img/products/blue-polo.png`,
        `${base}/img/products/blue-polo.png`,
        `${base}/img/products/blue-polo.png`,
      ],
      '#bf7ab0': [
        `${base}/img/products/pink-polo.png`,
        `${base}/img/products/pink-polo.png`,
        `${base}/img/products/pink-polo.png`,
      ],
    },
    faqs: [
      {
        question: 'Is the collar structured?',
        answer: 'Yes, it holds shape after washing.',
      },
      {
        question: 'Can it be tucked in?',
        answer: 'Yes, the length works for tucking.',
      },
      {
        question: 'Is it breathable?',
        answer: 'Yes, the cotton blend is airy.',
      },
    ],
    productDetails: {
      descriptions: [
        'Polo shirt with a clean collar and a breathable knit texture.',
        'Balanced weight fabric keeps a crisp look after washing.',
      ],
      params: {
        Material: 'Cotton pique',
        Fit: 'Regular',
        Care: 'Machine wash cold',
        Origin: 'Made in Turkey',
        Sizes: 'S, M, L, XL',
      },
    
    },
    reviews: [
      {
        name: 'Samantha D.',
        text: "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.",
        rating: 4.5,
        data: 'August 14, 2023',
      },
      {
        name: 'Alex K.',
        text: "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.",
        rating: 4,
        data: 'August 15, 2023',
      },
      {
        name: 'Ethan R.',
        text: "This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt.",
        rating: 3.5,
        data: 'August 16, 2023',
      },
      {
        name: 'Olivia P.',
        text: "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out.",
        rating: 4,
        data: 'August 17, 2023',
      },
      {
        name: 'Liam K.',
        text: "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion.",
        rating: 4,
        data: 'August 18, 2023',
      },
      {
        name: 'Ava H.',
        text: "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter.",
        rating: 4.5,
        data: 'August 19, 2023',
      },
      {
        name: 'Samantha D.',
        text: "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.",
        rating: 4.5,
        data: 'August 14, 2023',
      },
      {
        name: 'Alex K.',
        text: "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.",
        rating: 4,
        data: 'August 15, 2023',
      },
      {
        name: 'Ethan R.',
        text: "This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt.",
        rating: 3.5,
        data: 'August 16, 2023',
      },
      {
        name: 'Olivia P.',
        text: "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out.",
        rating: 4,
        data: 'August 17, 2023',
      },
      {
        name: 'Liam K.',
        text: "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion.",
        rating: 4,
        data: 'August 18, 2023',
      },
      {
        name: 'Ava H.',
        text: "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter.",
        rating: 4.5,
        data: 'August 19, 2023',
      },
      {
        name: 'Samantha D.',
        text: "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.",
        rating: 4.5,
        data: 'August 14, 2023',
      },
      {
        name: 'Alex K.',
        text: "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.",
        rating: 4,
        data: 'August 15, 2023',
      },
      {
        name: 'Ethan R.',
        text: "This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt.",
        rating: 3.5,
        data: 'August 16, 2023',
      },
      {
        name: 'Olivia P.',
        text: "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out.",
        rating: 4,
        data: 'August 17, 2023',
      },
      {
        name: 'Liam K.',
        text: "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion.",
        rating: 4,
        data: 'August 18, 2023',
      },
      {
        name: 'Ava H.',
        text: "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter.",
        rating: 4.5,
        data: 'August 19, 2023',
      },
    ],
    recommendations: [6, 4, 1, 2],
    isNew: true,
    isTop: true,
  },
  {
    id: 8,
    title: 'Slate Runner Jeans',
    category: 'Jeans',
    dressStyle: 'Casual',
    price: 155,
    rating: 4.4,
    description:
      'Everyday jeans with a tapered leg and sturdy midweight denim. This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.',
    colors: [
      { '#3a7ea6': 'cyan' },
    ],
    sizes: ['Medium', 'Large'],
    images: {
      '#3a7ea6': [
        `${base}/img/products/jeans1-1.webp`,
        `${base}/img/products/jeans1-3.webp`,
      ],
    },
    faqs: [
      {
        question: 'Does the stripe pattern fade?',
        answer: 'No, it keeps color with cold wash.',
      },
      {
        question: 'Is the fabric soft?',
        answer: 'Yes, it is a soft cotton knit.',
      },
      {
        question: 'Is it boxy or fitted?',
        answer: 'Regular fit, not oversized.',
      },
    ],
    productDetails: {
      descriptions: [
        'Striped tee with a soft jersey feel and a classic cut.',
        'Lightweight construction makes it easy to layer.',
      ],
      params: {
        Material: 'Cotton jersey',
        Fit: 'Regular',
        Care: 'Machine wash cold',
        Origin: 'Made in Portugal',
        Sizes: 'S, M, L, XL',
      },
    },
    
    reviews: [
      {
        name: 'Samantha D.',
        text: "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.",
        rating: 4.5,
        data: 'August 14, 2023',
      },
      {
        name: 'Alex K.',
        text: "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.",
        rating: 4,
        data: 'August 15, 2023',
      },
      {
        name: 'Ethan R.',
        text: "This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt.",
        rating: 3.5,
        data: 'August 16, 2023',
      },
      {
        name: 'Olivia P.',
        text: "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out.",
        rating: 4,
        data: 'August 17, 2023',
      },
      {
        name: 'Liam K.',
        text: "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion.",
        rating: 4,
        data: 'August 18, 2023',
      },
      {
        name: 'Ava H.',
        text: "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter.",
        rating: 4.5,
        data: 'August 19, 2023',
      },
      {
        name: 'Samantha D.',
        text: "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.",
        rating: 4.5,
        data: 'August 14, 2023',
      },
      {
        name: 'Alex K.',
        text: "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.",
        rating: 4,
        data: 'August 15, 2023',
      },
      {
        name: 'Ethan R.',
        text: "This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt.",
        rating: 3.5,
        data: 'August 16, 2023',
      },
      {
        name: 'Olivia P.',
        text: "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out.",
        rating: 4,
        data: 'August 17, 2023',
      },
      {
        name: 'Liam K.',
        text: "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion.",
        rating: 4,
        data: 'August 18, 2023',
      },
      {
        name: 'Ava H.',
        text: "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter.",
        rating: 4.5,
        data: 'August 19, 2023',
      },
      {
        name: 'Samantha D.',
        text: "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.",
        rating: 4.5,
        data: 'August 14, 2023',
      },
      {
        name: 'Alex K.',
        text: "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.",
        rating: 4,
        data: 'August 15, 2023',
      },
      {
        name: 'Ethan R.',
        text: "This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt.",
        rating: 3.5,
        data: 'August 16, 2023',
      },
      {
        name: 'Olivia P.',
        text: "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out.",
        rating: 4,
        data: 'August 17, 2023',
      },
      {
        name: 'Liam K.',
        text: "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion.",
        rating: 4,
        data: 'August 18, 2023',
      },
      {
        name: 'Ava H.',
        text: "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter.",
        rating: 4.5,
        data: 'August 19, 2023',
      },
    ],
    recommendations: [3, 1, 2, 6],
    isNew: true,
    isTop: true,
  },
  {
    id: 9,
    title: 'Atlas Formal Shirt',
    category: 'Shirts',
    dressStyle: 'Formal',
    price: 170,
    sale: 0.1,
    rating: 3.8,
    description:
      'Formal shirt with a sharp collar and smooth weave for office looks. This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.',
    colors: [
      { '#000000': 'black' },
      { '#ffffff': 'white' },
      { '#7babc7': 'cyan' },
      { '#946d34': 'brown, orange' },
    ],
    sizes: ['Small', 'X-Large'],
    images: {
      '#000000': [
        `${base}/img/products/shirt1-1.webp`,
        `${base}/img/products/shirt1-2.webp`,
      ],
      '#ffffff': [
        `${base}/img/products/shirt2-1.webp`,
        `${base}/img/products/shirt2-2.webp`,
      ],
      '#7babc7': [
        `${base}/img/products/shirt3-1.webp`,
        `${base}/img/products/shirt3-2.webp`,
      ],
      '#946d34': [
        `${base}/img/products/shirt4-1.webp`,
        `${base}/img/products/shirt4-2.webp`,
      ],
    },
    faqs: [
      {
        question: 'Do the shorts have a drawstring?',
        answer: 'Yes, an internal drawstring is included.',
      },
      {
        question: 'Are they suitable for lounging?',
        answer: 'Yes, the terry fabric is very soft.',
      },
      {
        question: 'Is the fabric thick?',
        answer: 'Medium thickness, breathable in warm weather.',
      },
    ],
    productDetails: {
      descriptions: [
        'Terry shorts with a soft looped interior for comfort.',
        'Easy waistband and a relaxed drape for off duty days.',
      ],
      params: {
        Material: 'Cotton terry',
        Fit: 'Relaxed',
        Care: 'Machine wash cold',
        Origin: 'Made in Vietnam',
        Sizes: 'S, M, L, XL',
      },
    
    },
    reviews: [
      {
        name: 'Samantha D.',
        text: "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.",
        rating: 4.5,
        data: 'August 14, 2023',
      },
      {
        name: 'Alex K.',
        text: "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.",
        rating: 4,
        data: 'August 15, 2023',
      },
      {
        name: 'Ethan R.',
        text: "This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt.",
        rating: 3.5,
        data: 'August 16, 2023',
      },
      {
        name: 'Olivia P.',
        text: "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out.",
        rating: 4,
        data: 'August 17, 2023',
      },
      {
        name: 'Liam K.',
        text: "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion.",
        rating: 4,
        data: 'August 18, 2023',
      },
      {
        name: 'Ava H.',
        text: "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter.",
        rating: 4.5,
        data: 'August 19, 2023',
      },
      {
        name: 'Samantha D.',
        text: "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.",
        rating: 4.5,
        data: 'August 14, 2023',
      },
      {
        name: 'Alex K.',
        text: "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.",
        rating: 4,
        data: 'August 15, 2023',
      },
      {
        name: 'Ethan R.',
        text: "This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt.",
        rating: 3.5,
        data: 'August 16, 2023',
      },
      {
        name: 'Olivia P.',
        text: "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out.",
        rating: 4,
        data: 'August 17, 2023',
      },
      {
        name: 'Liam K.',
        text: "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion.",
        rating: 4,
        data: 'August 18, 2023',
      },
      {
        name: 'Ava H.',
        text: "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter.",
        rating: 4.5,
        data: 'August 19, 2023',
      },
      {
        name: 'Samantha D.',
        text: "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.",
        rating: 4.5,
        data: 'August 14, 2023',
      },
      {
        name: 'Alex K.',
        text: "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.",
        rating: 4,
        data: 'August 15, 2023',
      },
      {
        name: 'Ethan R.',
        text: "This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt.",
        rating: 3.5,
        data: 'August 16, 2023',
      },
      {
        name: 'Olivia P.',
        text: "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out.",
        rating: 4,
        data: 'August 17, 2023',
      },
      {
        name: 'Liam K.',
        text: "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion.",
        rating: 4,
        data: 'August 18, 2023',
      },
      {
        name: 'Ava H.',
        text: "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter.",
        rating: 4.5,
        data: 'August 19, 2023',
      },
    ],
    recommendations: [10, 11, 1, 5],
    isNew: true,
    isTop: true,
  },
  {
    id: 10,
    title: 'Regent Dress Shirt',
    category: 'Shirts',
    dressStyle: 'Formal',
    price: 130,
    rating: 4.5,
    description:
      'Classic formal shirt with clean placket and wrinkle resistant finish. This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.',
    colors: [
      { '#7babc7': 'cyan' },
    ],
    sizes: ['Small', 'Medium', 'Large'],
    images: {
      '#7babc7': [
        `${base}/img/products/shirt5-1.webp`,
        `${base}/img/products/shirt5-2.webp`,
      ],
    },
    faqs: [
      {
        question: 'Is the tee pre shrunk?',
        answer: 'Yes, it is pre shrunk for stability.',
      },
      {
        question: 'Does it have side seams?',
        answer: 'Yes, for a cleaner fit.',
      },
      {
        question: 'Is the fabric opaque?',
        answer: 'Yes, it is not see through.',
      },
    ],
    productDetails: {
      descriptions: [
        'Clean crew tee with a sturdy knit and smooth finish.',
        'Designed to hold shape and color over time.',
      ],
      params: {
        Material: 'Heavy cotton',
        Fit: 'Regular',
        Care: 'Machine wash cold',
        Origin: 'Made in Portugal',
        Sizes: 'S, M, L, XL',
      },
    
    },
    reviews: [
      {
        name: 'Samantha D.',
        text: "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.",
        rating: 4.5,
        data: 'August 14, 2023',
      },
      {
        name: 'Alex K.',
        text: "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.",
        rating: 4,
        data: 'August 15, 2023',
      },
      {
        name: 'Ethan R.',
        text: "This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt.",
        rating: 3.5,
        data: 'August 16, 2023',
      },
      {
        name: 'Olivia P.',
        text: "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out.",
        rating: 4,
        data: 'August 17, 2023',
      },
      {
        name: 'Liam K.',
        text: "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion.",
        rating: 4,
        data: 'August 18, 2023',
      },
      {
        name: 'Ava H.',
        text: "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter.",
        rating: 4.5,
        data: 'August 19, 2023',
      },
      {
        name: 'Samantha D.',
        text: "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.",
        rating: 4.5,
        data: 'August 14, 2023',
      },
      {
        name: 'Alex K.',
        text: "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.",
        rating: 4,
        data: 'August 15, 2023',
      },
      {
        name: 'Ethan R.',
        text: "This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt.",
        rating: 3.5,
        data: 'August 16, 2023',
      },
      {
        name: 'Olivia P.',
        text: "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out.",
        rating: 4,
        data: 'August 17, 2023',
      },
      {
        name: 'Liam K.',
        text: "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion.",
        rating: 4,
        data: 'August 18, 2023',
      },
      {
        name: 'Ava H.',
        text: "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter.",
        rating: 4.5,
        data: 'August 19, 2023',
      },
      {
        name: 'Samantha D.',
        text: "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.",
        rating: 4.5,
        data: 'August 14, 2023',
      },
      {
        name: 'Alex K.',
        text: "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.",
        rating: 4,
        data: 'August 15, 2023',
      },
      {
        name: 'Ethan R.',
        text: "This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt.",
        rating: 3.5,
        data: 'August 16, 2023',
      },
      {
        name: 'Olivia P.',
        text: "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out.",
        rating: 4,
        data: 'August 17, 2023',
      },
      {
        name: 'Liam K.',
        text: "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion.",
        rating: 4,
        data: 'August 18, 2023',
      },
      {
        name: 'Ava H.',
        text: "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter.",
        rating: 4.5,
        data: 'August 19, 2023',
      },
    ],
    recommendations: [9, 11, 1, 5],
    isNew: true,
    isTop: true,
  },
  {
    id: 11,
    title: 'Sterling Poplin Shirt',
    category: 'Shirts',
    dressStyle: 'Formal',
    price: 220,
    sale: 0.3,
    rating: 4.7,
    description:
      'Crisp poplin shirt tailored for formal outfits and easy layering. This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.',
    colors: [
      { '#d4cc85': 'orange' },
    ],
    sizes: ['Large'],
    images: {
      '#d4cc85': [
        `${base}/img/products/shirt6-1.webp`,
        `${base}/img/products/shirt6-2.webp`,
      ],
    },
    faqs: [
      {
        question: 'Is the print raised or flat?',
        answer: 'Flat print for a smooth feel.',
      },
      {
        question: 'Is it heavyweight?',
        answer: 'Yes, a slightly heavier cotton.',
      },
      {
        question: 'Will the print crack?',
        answer: 'No, it is designed to stay flexible.',
      },
    ],
    productDetails: {
      descriptions: [
        'Studio tee with a bold graphic and a heavier drape.',
        'Comfortable collar and reinforced seams for longevity.',
      ],
      params: {
        Material: 'Premium cotton',
        Fit: 'Regular',
        Care: 'Wash cold, low tumble',
        Origin: 'Made in Italy',
        Sizes: 'S, M, L, XL',
      },
    },
    
    reviews: [
      {
        name: 'Samantha D.',
        text: "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.",
        rating: 4.5,
        data: 'August 14, 2023',
      },
      {
        name: 'Alex K.',
        text: "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.",
        rating: 4,
        data: 'August 15, 2023',
      },
      {
        name: 'Ethan R.',
        text: "This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt.",
        rating: 3.5,
        data: 'August 16, 2023',
      },
      {
        name: 'Olivia P.',
        text: "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out.",
        rating: 4,
        data: 'August 17, 2023',
      },
      {
        name: 'Liam K.',
        text: "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion.",
        rating: 4,
        data: 'August 18, 2023',
      },
      {
        name: 'Ava H.',
        text: "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter.",
        rating: 4.5,
        data: 'August 19, 2023',
      },
      {
        name: 'Samantha D.',
        text: "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.",
        rating: 4.5,
        data: 'August 14, 2023',
      },
      {
        name: 'Alex K.',
        text: "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.",
        rating: 4,
        data: 'August 15, 2023',
      },
      {
        name: 'Ethan R.',
        text: "This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt.",
        rating: 3.5,
        data: 'August 16, 2023',
      },
      {
        name: 'Olivia P.',
        text: "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out.",
        rating: 4,
        data: 'August 17, 2023',
      },
      {
        name: 'Liam K.',
        text: "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion.",
        rating: 4,
        data: 'August 18, 2023',
      },
      {
        name: 'Ava H.',
        text: "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter.",
        rating: 4.5,
        data: 'August 19, 2023',
      },
      {
        name: 'Samantha D.',
        text: "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.",
        rating: 4.5,
        data: 'August 14, 2023',
      },
      {
        name: 'Alex K.',
        text: "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.",
        rating: 4,
        data: 'August 15, 2023',
      },
      {
        name: 'Ethan R.',
        text: "This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt.",
        rating: 3.5,
        data: 'August 16, 2023',
      },
      {
        name: 'Olivia P.',
        text: "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out.",
        rating: 4,
        data: 'August 17, 2023',
      },
      {
        name: 'Liam K.',
        text: "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion.",
        rating: 4,
        data: 'August 18, 2023',
      },
      {
        name: 'Ava H.',
        text: "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter.",
        rating: 4.5,
        data: 'August 19, 2023',
      },
    ],
    recommendations: [9, 10, 1, 5],
    isNew: true,
    isTop: true,
  },
  {
    id: 12,
    title: 'Driftline Hoodie',
    category: 'Hoodie',
    dressStyle: 'Casual',
    price: 165,
    rating: 4.0,
    description:
      'Cozy hoodie with a soft fleece lining and simple casual styling. This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.',
    colors: [
      { '#282b7a': 'blue' },
    ],
    sizes: ['Small', 'Medium'],
    images: {
      '#282b7a': [
        `${base}/img/products/hoodie1-1.webp`,
        `${base}/img/products/hoodie1-2.webp`,
      ],
    },
    faqs: [
      {
        question: 'Are these shorts quick dry?',
        answer: 'They dry faster than standard cotton.',
      },
      {
        question: 'Do they have pockets?',
        answer: 'Yes, side pockets and one back pocket.',
      },
      {
        question: 'Is the waistband adjustable?',
        answer: 'Yes, with a drawstring.',
      },
    ],
    productDetails: {
      descriptions: [
        'Chill shorts with a light feel and quick dry comfort.',
        'Soft waistband and clean hems for casual wear.',
      ],
      params: {
        Material: 'Cotton nylon blend',
        Fit: 'Regular',
        Care: 'Machine wash cold',
        Origin: 'Made in Vietnam',
        Sizes: 'S, M, L, XL',
      },
    },
    
    reviews: [
      {
        name: 'Samantha D.',
        text: "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.",
        rating: 4.5,
        data: 'August 14, 2023',
      },
      {
        name: 'Alex K.',
        text: "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.",
        rating: 4,
        data: 'August 15, 2023',
      },
      {
        name: 'Ethan R.',
        text: "This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt.",
        rating: 3.5,
        data: 'August 16, 2023',
      },
      {
        name: 'Olivia P.',
        text: "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out.",
        rating: 4,
        data: 'August 17, 2023',
      },
      {
        name: 'Liam K.',
        text: "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion.",
        rating: 4,
        data: 'August 18, 2023',
      },
      {
        name: 'Ava H.',
        text: "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter.",
        rating: 4.5,
        data: 'August 19, 2023',
      },
      {
        name: 'Samantha D.',
        text: "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.",
        rating: 4.5,
        data: 'August 14, 2023',
      },
      {
        name: 'Alex K.',
        text: "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.",
        rating: 4,
        data: 'August 15, 2023',
      },
      {
        name: 'Ethan R.',
        text: "This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt.",
        rating: 3.5,
        data: 'August 16, 2023',
      },
      {
        name: 'Olivia P.',
        text: "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out.",
        rating: 4,
        data: 'August 17, 2023',
      },
      {
        name: 'Liam K.',
        text: "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion.",
        rating: 4,
        data: 'August 18, 2023',
      },
      {
        name: 'Ava H.',
        text: "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter.",
        rating: 4.5,
        data: 'August 19, 2023',
      },
      {
        name: 'Samantha D.',
        text: "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.",
        rating: 4.5,
        data: 'August 14, 2023',
      },
      {
        name: 'Alex K.',
        text: "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.",
        rating: 4,
        data: 'August 15, 2023',
      },
      {
        name: 'Ethan R.',
        text: "This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt.",
        rating: 3.5,
        data: 'August 16, 2023',
      },
      {
        name: 'Olivia P.',
        text: "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out.",
        rating: 4,
        data: 'August 17, 2023',
      },
      {
        name: 'Liam K.',
        text: "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion.",
        rating: 4,
        data: 'August 18, 2023',
      },
      {
        name: 'Ava H.',
        text: "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter.",
        rating: 4.5,
        data: 'August 19, 2023',
      },
    ],
    recommendations: [13],
    isNew: true,
    isTop: true,
  },
  {
    id: 13,
    title: 'Harbor Fleece Hoodie',
    category: 'Hoodie',
    dressStyle: 'Casual',
    price: 190,
    sale: 0.2,
    rating: 4.3,
    description:
      'Warm hoodie with a structured hood and everyday casual comfort. This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.',
    colors: [
      { '#edb97e': 'orange' },
      { '#7d7d7d': 'white' },
    ],
    sizes: ['Medium', 'X-Large'],
    images: {
      '#edb97e': [
        `${base}/img/products/hoodie2-1.webp`,
        `${base}/img/products/hoodie2-2.webp`,
      ],
      '#7d7d7d': [
        `${base}/img/products/hoodie3-1.webp`,
        `${base}/img/products/hoodie3-2.webp`,
      ],
    },
    faqs: [
      {
        question: 'Is the color vibrant?',
        answer: 'Yes, the dye is saturated and rich.',
      },
      {
        question: 'Is the fit slim?',
        answer: 'Regular fit with a slight taper.',
      },
      {
        question: 'Is it good for events?',
        answer: 'Yes, it works well for casual parties.',
      },
    ],
    productDetails: {
      descriptions: [
        'Party ready tee with a smooth finish and vivid color.',
        'Balanced weight fabric keeps a clean silhouette.',
      ],
      params: {
        Material: 'Cotton jersey',
        Fit: 'Regular',
        Care: 'Machine wash cold',
        Origin: 'Made in Italy',
        Sizes: 'S, M, L, XL',
      },
    },
    
    reviews: [
      {
        name: 'Samantha D.',
        text: "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.",
        rating: 4.5,
        data: 'August 14, 2023',
      },
      {
        name: 'Alex K.',
        text: "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.",
        rating: 4,
        data: 'August 15, 2023',
      },
      {
        name: 'Ethan R.',
        text: "This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt.",
        rating: 3.5,
        data: 'August 16, 2023',
      },
      {
        name: 'Olivia P.',
        text: "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out.",
        rating: 4,
        data: 'August 17, 2023',
      },
      {
        name: 'Liam K.',
        text: "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion.",
        rating: 4,
        data: 'August 18, 2023',
      },
      {
        name: 'Ava H.',
        text: "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter.",
        rating: 4.5,
        data: 'August 19, 2023',
      },
      {
        name: 'Samantha D.',
        text: "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.",
        rating: 4.5,
        data: 'August 14, 2023',
      },
      {
        name: 'Alex K.',
        text: "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.",
        rating: 4,
        data: 'August 15, 2023',
      },
      {
        name: 'Ethan R.',
        text: "This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt.",
        rating: 3.5,
        data: 'August 16, 2023',
      },
      {
        name: 'Olivia P.',
        text: "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out.",
        rating: 4,
        data: 'August 17, 2023',
      },
      {
        name: 'Liam K.',
        text: "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion.",
        rating: 4,
        data: 'August 18, 2023',
      },
      {
        name: 'Ava H.',
        text: "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter.",
        rating: 4.5,
        data: 'August 19, 2023',
      },
      {
        name: 'Samantha D.',
        text: "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.",
        rating: 4.5,
        data: 'August 14, 2023',
      },
      {
        name: 'Alex K.',
        text: "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.",
        rating: 4,
        data: 'August 15, 2023',
      },
      {
        name: 'Ethan R.',
        text: "This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt.",
        rating: 3.5,
        data: 'August 16, 2023',
      },
      {
        name: 'Olivia P.',
        text: "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out.",
        rating: 4,
        data: 'August 17, 2023',
      },
      {
        name: 'Liam K.',
        text: "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion.",
        rating: 4,
        data: 'August 18, 2023',
      },
      {
        name: 'Ava H.',
        text: "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter.",
        rating: 4.5,
        data: 'August 19, 2023',
      },
    ],
    recommendations: [12, 1, 5, 6],
    isNew: true,
    isTop: true,
  },
  {
    id: 14,
    title: 'Sprint Mesh Shorts',
    category: 'Shorts',
    dressStyle: 'Gym',
    price: 145,
    rating: 4.1,
    description:
      'Gym shorts with breathable panels and a secure waistband. This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.',
    colors: [
      { '#000000': 'black' },
      { '#edb97e': 'orange' },
      { '#302b66': 'blue' },
    ],
    sizes: ['Small', 'Large'],
    images: {
      '#000000': [
        `${base}/img/products/shorts1-1.webp`,
        `${base}/img/products/shorts1-2.webp`,
      ],
      '#edb97e': [
        `${base}/img/products/shorts2-1.webp`,
        `${base}/img/products/shorts2-2.webp`,
        `${base}/img/products/shorts2-3.webp`,
      ],
      '#302b66': [
        `${base}/img/products/shorts3-1.webp`,
      ],
    },
    faqs: [
      {
        question: 'Does the fabric feel light?',
        answer: 'Yes, it is lightweight and breathable.',
      },
      {
        question: 'Is the neckline tight?',
        answer: 'No, it is a relaxed crew neck.',
      },
      {
        question: 'Is it easy to layer?',
        answer: 'Yes, it layers under shirts or jackets.',
      },
    ],
    productDetails: {
      descriptions: [
        'Everyday tee with an airy feel and soft knit.',
        'Simple construction that layers well with shirts or jackets.',
      ],
      params: {
        Material: 'Lightweight cotton',
        Fit: 'Regular',
        Care: 'Machine wash cold',
        Origin: 'Made in Turkey',
        Sizes: 'S, M, L, XL',
      },
    },
    
    reviews: [
      {
        name: 'Samantha D.',
        text: "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.",
        rating: 4.5,
        data: 'August 14, 2023',
      },
      {
        name: 'Alex K.',
        text: "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.",
        rating: 4,
        data: 'August 15, 2023',
      },
      {
        name: 'Ethan R.',
        text: "This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt.",
        rating: 3.5,
        data: 'August 16, 2023',
      },
      {
        name: 'Olivia P.',
        text: "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out.",
        rating: 4,
        data: 'August 17, 2023',
      },
      {
        name: 'Liam K.',
        text: "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion.",
        rating: 4,
        data: 'August 18, 2023',
      },
      {
        name: 'Ava H.',
        text: "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter.",
        rating: 4.5,
        data: 'August 19, 2023',
      },
      {
        name: 'Samantha D.',
        text: "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.",
        rating: 4.5,
        data: 'August 14, 2023',
      },
      {
        name: 'Alex K.',
        text: "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.",
        rating: 4,
        data: 'August 15, 2023',
      },
      {
        name: 'Ethan R.',
        text: "This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt.",
        rating: 3.5,
        data: 'August 16, 2023',
      },
      {
        name: 'Olivia P.',
        text: "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out.",
        rating: 4,
        data: 'August 17, 2023',
      },
      {
        name: 'Liam K.',
        text: "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion.",
        rating: 4,
        data: 'August 18, 2023',
      },
      {
        name: 'Ava H.',
        text: "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter.",
        rating: 4.5,
        data: 'August 19, 2023',
      },
      {
        name: 'Samantha D.',
        text: "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.",
        rating: 4.5,
        data: 'August 14, 2023',
      },
      {
        name: 'Alex K.',
        text: "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.",
        rating: 4,
        data: 'August 15, 2023',
      },
      {
        name: 'Ethan R.',
        text: "This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt.",
        rating: 3.5,
        data: 'August 16, 2023',
      },
      {
        name: 'Olivia P.',
        text: "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out.",
        rating: 4,
        data: 'August 17, 2023',
      },
      {
        name: 'Liam K.',
        text: "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion.",
        rating: 4,
        data: 'August 18, 2023',
      },
      {
        name: 'Ava H.',
        text: "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter.",
        rating: 4.5,
        data: 'August 19, 2023',
      },
    ],
    recommendations: [2, 4, 15, 16],
    isNew: true,
    isTop: true,
  },
  {
    id: 15,
    title: 'Pulse Performance Tee',
    category: 'T-shirts',
    dressStyle: 'Gym',
    price: 200,
    sale: 0.15,
    rating: 4.4,
    description:
      'Gym tee with quick dry fabric and a streamlined athletic cut. This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.',
    colors: [
      { '#000000': 'black' },
    ],
    sizes: ['Medium', 'Large'],
    images: {
      '#000000': [
        `${base}/img/products/tshirt1-1.webp`,
        `${base}/img/products/tshirt1-2.webp`,
      ],
    },
    faqs: [
      {
        question: 'Are these joggers fleece lined?',
        answer: 'No, they are unlined.',
      },
      {
        question: 'Is the ankle cuff elastic?',
        answer: 'Yes, with a soft ribbed cuff.',
      },
      {
        question: 'Is the rise mid or high?',
        answer: 'Mid rise.',
      },
    ],
    productDetails: {
      descriptions: [
        'Jogger style denim with a tapered leg and flexible feel.',
        'Structured enough for daily wear with casual comfort.',
      ],
      params: {
        Material: 'Denim with elastane',
        Fit: 'Tapered',
        Care: 'Wash cold, hang dry',
        Origin: 'Made in Portugal',
        Sizes: 'S, M, L, XL',
      },
    },
    
    reviews: [
      {
        name: 'Samantha D.',
        text: "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.",
        rating: 4.5,
        data: 'August 14, 2023',
      },
      {
        name: 'Alex K.',
        text: "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.",
        rating: 4,
        data: 'August 15, 2023',
      },
      {
        name: 'Ethan R.',
        text: "This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt.",
        rating: 3.5,
        data: 'August 16, 2023',
      },
      {
        name: 'Olivia P.',
        text: "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out.",
        rating: 4,
        data: 'August 17, 2023',
      },
      {
        name: 'Liam K.',
        text: "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion.",
        rating: 4,
        data: 'August 18, 2023',
      },
      {
        name: 'Ava H.',
        text: "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter.",
        rating: 4.5,
        data: 'August 19, 2023',
      },
      {
        name: 'Samantha D.',
        text: "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.",
        rating: 4.5,
        data: 'August 14, 2023',
      },
      {
        name: 'Alex K.',
        text: "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.",
        rating: 4,
        data: 'August 15, 2023',
      },
      {
        name: 'Ethan R.',
        text: "This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt.",
        rating: 3.5,
        data: 'August 16, 2023',
      },
      {
        name: 'Olivia P.',
        text: "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out.",
        rating: 4,
        data: 'August 17, 2023',
      },
      {
        name: 'Liam K.',
        text: "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion.",
        rating: 4,
        data: 'August 18, 2023',
      },
      {
        name: 'Ava H.',
        text: "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter.",
        rating: 4.5,
        data: 'August 19, 2023',
      },
      {
        name: 'Samantha D.',
        text: "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.",
        rating: 4.5,
        data: 'August 14, 2023',
      },
      {
        name: 'Alex K.',
        text: "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.",
        rating: 4,
        data: 'August 15, 2023',
      },
      {
        name: 'Ethan R.',
        text: "This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt.",
        rating: 3.5,
        data: 'August 16, 2023',
      },
      {
        name: 'Olivia P.',
        text: "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out.",
        rating: 4,
        data: 'August 17, 2023',
      },
      {
        name: 'Liam K.',
        text: "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion.",
        rating: 4,
        data: 'August 18, 2023',
      },
      {
        name: 'Ava H.',
        text: "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter.",
        rating: 4.5,
        data: 'August 19, 2023',
      },
    ],
    recommendations: [16, 4, 14, 6],
    isNew: true,
    isTop: true,
  },
  {
    id: 16,
    title: 'Lift Ready Tee',
    category: 'T-shirts',
    dressStyle: 'Gym',
    price: 175,
    rating: 3.7,
    description:
      'Training t-shirt with light stretch and smooth seams for movement. This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.',
    colors: [
      { '#0c0742': 'blue' },
      { '#828282': 'white' },
    ],
    sizes: ['Small', 'Medium', 'X-Large'],
    images: {
      '#0c0742': [
        `${base}/img/products/tshirt3-1.webp`,
        `${base}/img/products/tshirt3-2.webp`,
        `${base}/img/products/tshirt3-3.webp`,
      ],
      '#828282': [
        `${base}/img/products/tshirt2-1.webp`,
        `${base}/img/products/tshirt2-2.webp`,
      ],
    },
    faqs: [
      {
        question: 'Is the fabric wrinkle resistant?',
        answer: 'Yes, it resists light wrinkling.',
      },
      {
        question: 'Does it run large?',
        answer: 'No, it fits true to size.',
      },
      {
        question: 'Is it suitable for office wear?',
        answer: 'Yes, it has a clean, sharp look.',
      },
    ],
    productDetails: {
      descriptions: [
        'Minimal shirt with a crisp finish and smooth touch.',
        'Clean lines and a steady drape for a sharp look.',
      ],
      params: {
        Material: 'Cotton poplin',
        Fit: 'Regular',
        Care: 'Machine wash cold',
        Origin: 'Made in Turkey',
        Sizes: 'S, M, L, XL',
      },
    },
    
    reviews: [
      {
        name: 'Samantha D.',
        text: "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.",
        rating: 4.5,
        data: 'August 14, 2023',
      },
      {
        name: 'Alex K.',
        text: "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.",
        rating: 4,
        data: 'August 15, 2023',
      },
      {
        name: 'Ethan R.',
        text: "This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt.",
        rating: 3.5,
        data: 'August 16, 2023',
      },
      {
        name: 'Olivia P.',
        text: "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out.",
        rating: 4,
        data: 'August 17, 2023',
      },
      {
        name: 'Liam K.',
        text: "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion.",
        rating: 4,
        data: 'August 18, 2023',
      },
      {
        name: 'Ava H.',
        text: "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter.",
        rating: 4.5,
        data: 'August 19, 2023',
      },
      {
        name: 'Samantha D.',
        text: "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.",
        rating: 4.5,
        data: 'August 14, 2023',
      },
      {
        name: 'Alex K.',
        text: "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.",
        rating: 4,
        data: 'August 15, 2023',
      },
      {
        name: 'Ethan R.',
        text: "This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt.",
        rating: 3.5,
        data: 'August 16, 2023',
      },
      {
        name: 'Olivia P.',
        text: "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out.",
        rating: 4,
        data: 'August 17, 2023',
      },
      {
        name: 'Liam K.',
        text: "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion.",
        rating: 4,
        data: 'August 18, 2023',
      },
      {
        name: 'Ava H.',
        text: "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter.",
        rating: 4.5,
        data: 'August 19, 2023',
      },
      {
        name: 'Samantha D.',
        text: "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.",
        rating: 4.5,
        data: 'August 14, 2023',
      },
      {
        name: 'Alex K.',
        text: "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.",
        rating: 4,
        data: 'August 15, 2023',
      },
      {
        name: 'Ethan R.',
        text: "This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt.",
        rating: 3.5,
        data: 'August 16, 2023',
      },
      {
        name: 'Olivia P.',
        text: "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out.",
        rating: 4,
        data: 'August 17, 2023',
      },
      {
        name: 'Liam K.',
        text: "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion.",
        rating: 4,
        data: 'August 18, 2023',
      },
      {
        name: 'Ava H.',
        text: "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter.",
        rating: 4.5,
        data: 'August 19, 2023',
      },
    ],
    recommendations: [15, 4, 14, 6],
    isNew: true,
    isTop: true,
  },
  {
    id: 17,
    title: 'Neon Night Shirt',
    category: 'Shirts',
    dressStyle: 'Party',
    price: 230,
    sale: 0.35,
    rating: 4.6,
    description:
      'Party ready shirt with a sleek sheen and tailored fit. This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.',
    colors: [
      { '#ffffff': 'white' },
    ],
    sizes: ['Large', 'X-Large'],
    images: {
      '#ffffff': [
        `${base}/img/products/shirt7-1.webp`,
        `${base}/img/products/shirt7-2.webp`,
      ],
    },
    faqs: [
      {
        question: 'Is this shirt made of linen?',
        answer: 'Yes, a linen blend for airflow.',
      },
      {
        question: 'Does it require ironing?',
        answer: 'Light ironing is recommended.',
      },
      {
        question: 'Is it semi sheer?',
        answer: 'No, it is not see through.',
      },
    ],
    productDetails: {
      descriptions: [
        'Linen blend shirt designed for airflow and lightness.',
        'Soft texture with a relaxed structure for warm weather.',
      ],
      params: {
        Material: 'Linen cotton blend',
        Fit: 'Relaxed',
        Care: 'Wash cold, hang dry',
        Origin: 'Made in Italy',
        Sizes: 'S, M, L, XL',
      },
    },
    
    reviews: [
      {
        name: 'Samantha D.',
        text: "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.",
        rating: 4.5,
        data: 'August 14, 2023',
      },
      {
        name: 'Alex K.',
        text: "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.",
        rating: 4,
        data: 'August 15, 2023',
      },
      {
        name: 'Ethan R.',
        text: "This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt.",
        rating: 3.5,
        data: 'August 16, 2023',
      },
      {
        name: 'Olivia P.',
        text: "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out.",
        rating: 4,
        data: 'August 17, 2023',
      },
      {
        name: 'Liam K.',
        text: "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion.",
        rating: 4,
        data: 'August 18, 2023',
      },
      {
        name: 'Ava H.',
        text: "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter.",
        rating: 4.5,
        data: 'August 19, 2023',
      },
      {
        name: 'Samantha D.',
        text: "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.",
        rating: 4.5,
        data: 'August 14, 2023',
      },
      {
        name: 'Alex K.',
        text: "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.",
        rating: 4,
        data: 'August 15, 2023',
      },
      {
        name: 'Ethan R.',
        text: "This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt.",
        rating: 3.5,
        data: 'August 16, 2023',
      },
      {
        name: 'Olivia P.',
        text: "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out.",
        rating: 4,
        data: 'August 17, 2023',
      },
      {
        name: 'Liam K.',
        text: "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion.",
        rating: 4,
        data: 'August 18, 2023',
      },
      {
        name: 'Ava H.',
        text: "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter.",
        rating: 4.5,
        data: 'August 19, 2023',
      },
      {
        name: 'Samantha D.',
        text: "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.",
        rating: 4.5,
        data: 'August 14, 2023',
      },
      {
        name: 'Alex K.',
        text: "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.",
        rating: 4,
        data: 'August 15, 2023',
      },
      {
        name: 'Ethan R.',
        text: "This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt.",
        rating: 3.5,
        data: 'August 16, 2023',
      },
      {
        name: 'Olivia P.',
        text: "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out.",
        rating: 4,
        data: 'August 17, 2023',
      },
      {
        name: 'Liam K.',
        text: "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion.",
        rating: 4,
        data: 'August 18, 2023',
      },
      {
        name: 'Ava H.',
        text: "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter.",
        rating: 4.5,
        data: 'August 19, 2023',
      },
    ],
    recommendations: [18, 19, 1, 5],
    isNew: true,
    isTop: true,
  },
  {
    id: 18,
    title: 'Afterglow Party Tee',
    category: 'T-shirts',
    dressStyle: 'Party',
    price: 150,
    rating: 4.2,
    description:
      'Party t-shirt with a bold print and a soft breathable feel. This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.',
    colors: [
      { '#000000': 'white' },
    ],
    sizes: ['Small', 'Large'],
    images: {
      '#000000': [
        `${base}/img/products/tshirt4-1.webp`,
        `${base}/img/products/tshirt4-2.webp`,
      ],
    },
    faqs: [
      {
        question: 'Is the print bright?',
        answer: 'Yes, it has a bold neon graphic.',
      },
      {
        question: 'Is the fit relaxed?',
        answer: 'Regular fit with room in the chest.',
      },
      {
        question: 'Does the collar stretch out?',
        answer: 'No, it holds shape well.',
      },
    ],
    productDetails: {
      descriptions: [
        'Party tee with a bold graphic and smooth jersey feel.',
        'Comfortable weight that keeps a neat drape.',
      ],
      params: {
        Material: 'Cotton jersey',
        Fit: 'Regular',
        Care: 'Machine wash cold',
        Origin: 'Made in Vietnam',
        Sizes: 'S, M, L, XL',
      },
    },
    
    reviews: [
      {
        name: 'Samantha D.',
        text: "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.",
        rating: 4.5,
        data: 'August 14, 2023',
      },
      {
        name: 'Alex K.',
        text: "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.",
        rating: 4,
        data: 'August 15, 2023',
      },
      {
        name: 'Ethan R.',
        text: "This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt.",
        rating: 3.5,
        data: 'August 16, 2023',
      },
      {
        name: 'Olivia P.',
        text: "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out.",
        rating: 4,
        data: 'August 17, 2023',
      },
      {
        name: 'Liam K.',
        text: "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion.",
        rating: 4,
        data: 'August 18, 2023',
      },
      {
        name: 'Ava H.',
        text: "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter.",
        rating: 4.5,
        data: 'August 19, 2023',
      },
      {
        name: 'Samantha D.',
        text: "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.",
        rating: 4.5,
        data: 'August 14, 2023',
      },
      {
        name: 'Alex K.',
        text: "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.",
        rating: 4,
        data: 'August 15, 2023',
      },
      {
        name: 'Ethan R.',
        text: "This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt.",
        rating: 3.5,
        data: 'August 16, 2023',
      },
      {
        name: 'Olivia P.',
        text: "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out.",
        rating: 4,
        data: 'August 17, 2023',
      },
      {
        name: 'Liam K.',
        text: "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion.",
        rating: 4,
        data: 'August 18, 2023',
      },
      {
        name: 'Ava H.',
        text: "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter.",
        rating: 4.5,
        data: 'August 19, 2023',
      },
      {
        name: 'Samantha D.',
        text: "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.",
        rating: 4.5,
        data: 'August 14, 2023',
      },
      {
        name: 'Alex K.',
        text: "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.",
        rating: 4,
        data: 'August 15, 2023',
      },
      {
        name: 'Ethan R.',
        text: "This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt.",
        rating: 3.5,
        data: 'August 16, 2023',
      },
      {
        name: 'Olivia P.',
        text: "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out.",
        rating: 4,
        data: 'August 17, 2023',
      },
      {
        name: 'Liam K.',
        text: "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion.",
        rating: 4,
        data: 'August 18, 2023',
      },
      {
        name: 'Ava H.',
        text: "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter.",
        rating: 4.5,
        data: 'August 19, 2023',
      },
    ],
    recommendations: [19, 17, 4, 6],
    isNew: true,
    isTop: true,
  },
  {
    id: 19,
    title: 'Midnight Spark Tee',
    category: 'T-shirts',
    dressStyle: 'Party',
    price: 205,
    sale: 0.25,
    rating: 4.5,
    description:
      'Statement tee with a clean drape and a festive party vibe. This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.',
    colors: [
      { '#ffffff': 'white' },
    ],
    sizes: ['Medium', 'Large', 'X-Large'],
    images: {
      '#ffffff': [
        `${base}/img/products/tshirt5-1.webp`,
        `${base}/img/products/tshirt5-2.webp`,
      ],
    },
    faqs: [
      {
        question: 'Is the fabric smooth?',
        answer: 'Yes, it has a soft hand feel.',
      },
      {
        question: 'Is it suitable for night outings?',
        answer: 'Yes, it has a subtle sheen.',
      },
      {
        question: 'Does it keep its color?',
        answer: 'Yes, color stays consistent with cold wash.',
      },
    ],
    productDetails: {
      descriptions: [
        'Statement tee with a clean surface and soft hand feel.',
        'Balanced weight fabric for an easy party ready look.',
      ],
      params: {
        Material: 'Premium cotton',
        Fit: 'Regular',
        Care: 'Machine wash cold',
        Origin: 'Made in Italy',
        Sizes: 'S, M, L, XL',
      },
    },
    
    reviews: [
      {
        name: 'Samantha D.',
        text: "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.",
        rating: 4.5,
        data: 'August 14, 2023',
      },
      {
        name: 'Alex K.',
        text: "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.",
        rating: 4,
        data: 'August 15, 2023',
      },
      {
        name: 'Ethan R.',
        text: "This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt.",
        rating: 3.5,
        data: 'August 16, 2023',
      },
      {
        name: 'Olivia P.',
        text: "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out.",
        rating: 4,
        data: 'August 17, 2023',
      },
      {
        name: 'Liam K.',
        text: "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion.",
        rating: 4,
        data: 'August 18, 2023',
      },
      {
        name: 'Ava H.',
        text: "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter.",
        rating: 4.5,
        data: 'August 19, 2023',
      },
      {
        name: 'Samantha D.',
        text: "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.",
        rating: 4.5,
        data: 'August 14, 2023',
      },
      {
        name: 'Alex K.',
        text: "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.",
        rating: 4,
        data: 'August 15, 2023',
      },
      {
        name: 'Ethan R.',
        text: "This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt.",
        rating: 3.5,
        data: 'August 16, 2023',
      },
      {
        name: 'Olivia P.',
        text: "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out.",
        rating: 4,
        data: 'August 17, 2023',
      },
      {
        name: 'Liam K.',
        text: "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion.",
        rating: 4,
        data: 'August 18, 2023',
      },
      {
        name: 'Ava H.',
        text: "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter.",
        rating: 4.5,
        data: 'August 19, 2023',
      },
      {
        name: 'Samantha D.',
        text: "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.",
        rating: 4.5,
        data: 'August 14, 2023',
      },
      {
        name: 'Alex K.',
        text: "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.",
        rating: 4,
        data: 'August 15, 2023',
      },
      {
        name: 'Ethan R.',
        text: "This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt.",
        rating: 3.5,
        data: 'August 16, 2023',
      },
      {
        name: 'Olivia P.',
        text: "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out.",
        rating: 4,
        data: 'August 17, 2023',
      },
      {
        name: 'Liam K.',
        text: "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion.",
        rating: 4,
        data: 'August 18, 2023',
      },
      {
        name: 'Ava H.',
        text: "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter.",
        rating: 4.5,
        data: 'August 19, 2023',
      },
    ],
    recommendations: [18, 17, 4, 6],
    isNew: true,
    isTop: true,
  },
]

const initialProducts = createProductVariants(baseProducts)
initialProducts.forEach((product) => {
  const sale = typeof product.sale === 'number' ? product.sale : 0
  product.actualPrice = product.price - Math.round(product.price * sale)
})

const createDefaultCatalogFilters = () => ({
  category: null,
  price: [50, 200],
  colors: [],
  sizes: [],
  dressStyle: null,
  onSale: false,
  isNew: false,
  isTop: false,
})

const productSlice = createSlice({
  name: 'product',
  initialState: {
    selectedColor: null,
    selectedSize: null,
    product: null,
    searchQuery: '',
    filteredProducts: [],
    catalogFilters: createDefaultCatalogFilters(),
    catalogFilteredProducts: initialProducts,
    products: initialProducts,
  },
  reducers: {
    setColor: (state, action) => {
      state.selectedColor = action.payload
    },
    setSize: (state, action) => {
      state.selectedSize = action.payload
    },
    setProduct: (state, action) => {
      state.product = action.payload
      state.selectedColor = getColorHex(state.product.colors?.[0])
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload
    },
    searchProducts: (state, action) => {
      const query = action.payload.toLowerCase().trim()

      if (!query) {
        state.filteredProducts = []
        return
      }

      state.filteredProducts = state.products.filter((product) =>
        product.title.toLowerCase().trim().includes(query)
      )
    },
    clearSearch: (state) => {
      state.searchQuery = ''
      state.filteredProducts = []
    },
    applyCatalogFilters: (state, action) => {
      state.catalogFilters = action.payload
      state.catalogFilteredProducts = state.products.filter((product) => {
        const price = product.actualPrice ?? product.price ?? 0
        if (
          price < state.catalogFilters.price[0] ||
          price > state.catalogFilters.price[1]
        ) {
          return false
        }

        if (state.catalogFilters.colors.length > 0) {
          const hasColor = product.colors?.some((color) => {
            const productLabels = getColorLabels(color)
            if (productLabels.length === 0) return false
            return state.catalogFilters.colors.some((picked) => {
              const pickedLabels = getColorLabels(picked)
              if (pickedLabels.length === 0) return false
              return pickedLabels.some((pickedLabel) =>
                productLabels.includes(pickedLabel)
              )
            })
          })
          if (!hasColor) return false
        }

        if (state.catalogFilters.sizes.length > 0) {
          const hasSize = product.sizes?.some((size) =>
            state.catalogFilters.sizes.some(
              (picked) => normalizeValue(picked) === normalizeValue(size)
            )
          )
          if (!hasSize) return false
        }

        if (state.catalogFilters.category) {
          const category = getProductCategory(product)
          if (!category) return false
          if (
            normalizeValue(category) !==
            normalizeValue(state.catalogFilters.category)
          ) {
            return false
          }
        }

        if (state.catalogFilters.dressStyle) {
          const dressStyle = getProductDressStyle(product)
          if (!dressStyle) return true
          if (
            normalizeValue(dressStyle) !==
            normalizeValue(state.catalogFilters.dressStyle)
          ) {
            return false
          }
        }

        if (state.catalogFilters.onSale) {
          const isOnSale =
            typeof product.sale === 'number'
              ? product.sale > 0
              : (product.actualPrice ?? 0) < (product.price ?? 0)
          if (!isOnSale) return false
        }

        if (state.catalogFilters.isNew && !product.isNew) {
          return false
        }

        if (state.catalogFilters.isTop && !product.isTop) {
          return false
        }

        return true
      })
    },
    resetCatalogFilters: (state) => {
      state.catalogFilters = createDefaultCatalogFilters()
      state.catalogFilteredProducts = state.products
    },
  },
})

export const {
  setColor,
  setSize,
  setProduct,
  setSearchQuery,
  searchProducts,
  clearSearch,
  applyCatalogFilters,
  resetCatalogFilters,
} = productSlice.actions

export default productSlice.reducer
