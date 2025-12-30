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
    rating: 4.5,
    description:
      'Lightweight casual shorts with an easy waist and breathable fabric for warm days. This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.',
    colors: [
      { '#24c7d6': 'blue' },
    ],
    sizes: ['Small', 'X-Large'],
    images: {
      '#24c7d6': [
        `${base}/img/products/bermuda-shorts.png`,
        `${base}/img/products/bermuda-shorts.png`,
        `${base}/img/products/bermuda-shorts.png`,
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
    rating: 4.5,
    description:
      'Slim casual jeans with a clean finish and durable denim for daily rotation. This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.',
    colors: [
      { '#000000': 'black' },
      { '#13476b': 'blue' },
    ],
    sizes: ['Small', 'Medium', 'Large', 'X-Large'],
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
    rating: 4.5,
    description:
      'Moisture friendly tee with stretch and a neat hem for training sessions. This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.',
    colors: [
      { '#000000': 'white' },
      { '#f08307': 'orange' },
    ],
    sizes: ['Small', 'Medium', 'Large', 'X-Large'],
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
    rating: 4.5,
    description:
      'Casual button shirt with crisp lines and a comfortable regular fit. This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.',
    colors: [
      { '#2a206b': 'blue, purple, red' },
      { '#64a178': 'green' },
    ],
    sizes: ['Small', 'Medium', 'Large', 'X-Large'],
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
    rating: 4.5,
    description:
      'Casual t-shirt with a soft handfeel and minimal logo print. This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.',
    colors: [
      { '#e88931': 'orange' },
    ],
    sizes: ['Small', 'Medium', 'Large', 'X-Large'],
    images: {
      '#e88931': [
        `${base}/img/products/orange-t-shirt.png`,
        `${base}/img/products/orange-t-shirt.png`,
        `${base}/img/products/orange-t-shirt.png`,
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
    rating: 4.5,
    description:
      'Relaxed t-shirt with fine stripes and smooth combed cotton. This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.',
    colors: [
      { '#3a7ea6': 'cyan' },
      { '#bf7ab0': 'pink' },
    ],
    sizes: ['Small', 'Medium', 'Large', 'X-Large'],
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
    rating: 4.5,
    description:
      'Everyday jeans with a tapered leg and sturdy midweight denim. This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.',
    colors: [
      { '#3a7ea6': 'cyan' },
    ],
    sizes: ['Small', 'Medium', 'Large', 'X-Large'],
    images: {
      '#3a7ea6': [
        `${base}/img/products/jeans1-1.webp`,
        `${base}/img/products/jeans1-3.webp`,
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
    rating: 4.5,
    description:
      'Formal shirt with a sharp collar and smooth weave for office looks. This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.',
    colors: [
      { '#000000': 'black' },
      { '#ffffff': 'white' },
      { '#7babc7': 'cyan' },
      { '#946d34': 'brown, orange' },
    ],
    sizes: ['Small', 'Medium', 'Large', 'X-Large'],
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
    sizes: ['Small', 'Medium', 'Large', 'X-Large'],
    images: {
      '#7babc7': [
        `${base}/img/products/shirt5-1.webp`,
        `${base}/img/products/shirt5-2.webp`,
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
    rating: 4.5,
    description:
      'Crisp poplin shirt tailored for formal outfits and easy layering. This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.',
    colors: [
      { '#d4cc85': 'orange' },
    ],
    sizes: ['Small', 'Medium', 'Large', 'X-Large'],
    images: {
      '#d4cc85': [
        `${base}/img/products/shirt6-1.webp`,
        `${base}/img/products/shirt6-2.webp`,
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
    rating: 4.5,
    description:
      'Cozy hoodie with a soft fleece lining and simple casual styling. This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.',
    colors: [
      { '#282b7a': 'blue' },
    ],
    sizes: ['Small', 'Medium', 'Large', 'X-Large'],
    images: {
      '#282b7a': [
        `${base}/img/products/hoodie1-1.webp`,
        `${base}/img/products/hoodie1-2.webp`,
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
    rating: 4.5,
    description:
      'Warm hoodie with a structured hood and everyday casual comfort. This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.',
    colors: [
      { '#edb97e': 'orange' },
      { '#7d7d7d': 'white' },
    ],
    sizes: ['Small', 'Medium', 'Large', 'X-Large'],
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
    rating: 4.5,
    description:
      'Gym shorts with breathable panels and a secure waistband. This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.',
    colors: [
      { '#000000': 'black' },
      { '#edb97e': 'orange' },
      { '#302b66': 'blue' },
    ],
    sizes: ['Small', 'Medium', 'Large', 'X-Large'],
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
    rating: 4.5,
    description:
      'Gym tee with quick dry fabric and a streamlined athletic cut. This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.',
    colors: [
      { '#000000': 'black' },
    ],
    sizes: ['Small', 'Medium', 'Large', 'X-Large'],
    images: {
      '#000000': [
        `${base}/img/products/tshirt1-1.webp`,
        `${base}/img/products/tshirt1-2.webp`,
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
    rating: 4.5,
    description:
      'Training t-shirt with light stretch and smooth seams for movement. This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.',
    colors: [
      { '#0c0742': 'blue' },
      { '#828282': 'white' },
    ],
    sizes: ['Small', 'Medium', 'Large', 'X-Large'],
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
    rating: 4.5,
    description:
      'Party ready shirt with a sleek sheen and tailored fit. This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.',
    colors: [
      { '#ffffff': 'white' },
    ],
    sizes: ['Small', 'Medium', 'Large', 'X-Large'],
    images: {
      '#ffffff': [
        `${base}/img/products/shirt7-1.webp`,
        `${base}/img/products/shirt7-2.webp`,
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
    rating: 4.5,
    description:
      'Party t-shirt with a bold print and a soft breathable feel. This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.',
    colors: [
      { '#000000': 'white' },
    ],
    sizes: ['Small', 'Medium', 'Large', 'X-Large'],
    images: {
      '#000000': [
        `${base}/img/products/tshirt4-1.webp`,
        `${base}/img/products/tshirt4-2.webp`,
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
    sizes: ['Small', 'Medium', 'Large', 'X-Large'],
    images: {
      '#ffffff': [
        `${base}/img/products/tshirt5-1.webp`,
        `${base}/img/products/tshirt5-2.webp`,
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
