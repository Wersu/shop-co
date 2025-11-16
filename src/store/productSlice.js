import { createSlice } from '@reduxjs/toolkit'
const base = import.meta.env.BASE_URL

const initialProducts = [
  {
    id: 1,
    title: 'One Life Graphic T-shirt',
    price: 300,
    sale: 0.4,
    actualPrice: 0,
    rating: 4.5,
    description:
      'This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.',
    colors: ['#4F4631', '#314F4A', '#31344F'],
    sizes: ['Small', 'Medium', 'Large', 'X-Large'],
    images: {
      '#4F4631': [
        `${base}/img/product-page/t-shirt-front.png`,
        `${base}/img/product-page/t-shirt-back.png`,
        `${base}/img/product-page/t-shirt-real.png`,
      ],
      '#314F4A': [
        `${base}/img/products/stripped-t-shirt.png`,
        `${base}/img/products/stripped-t-shirt.png`,
        `${base}/img/products/stripped-t-shirt.png`,
      ],
      '#31344F': [
        `${base}/img/products/blue-polo.png`,
        `${base}/img/products/blue-polo.png`,
        `${base}/img/products/blue-polo.png`,
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
    recommendations: [1, 2, 3, 4],
    isNew: true,
    isTop: true,
  },
  {
    id: 2,
    title: 'One Life Graphic T-shirt',
    price: 300,
    sale: 0.4,
    rating: 4.5,
    description:
      'This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.',
    colors: ['#4F4631', '#314F4A', '#31344F'],
    sizes: ['Small', 'Medium', 'Large', 'X-Large'],
    images: {
      '#4F4631': [
        `${base}/img/product-page/t-shirt-front.png`,
        `${base}/img/product-page/t-shirt-back.png`,
        `${base}/img/product-page/t-shirt-real.png`,
      ],
      '#314F4A': [
        `${base}/img/products/stripped-t-shirt.png`,
        `${base}/img/products/stripped-t-shirt.png`,
        `${base}/img/products/stripped-t-shirt.png`,
      ],
      '#31344F': [
        `${base}/img/products/blue-polo.png`,
        `${base}/img/products/blue-polo.png`,
        `${base}/img/products/blue-polo.png`,
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
    recommendations: [1, 2, 3, 4],
    isNew: true,
    isTop: true,
  },
  {
    id: 3,
    title: 'One Life Graphic T-shirt',
    price: 300,
    sale: 0.4,
    rating: 4.5,
    description:
      'This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.',
    colors: ['#4F4631', '#314F4A', '#31344F'],
    sizes: ['Small', 'Medium', 'Large', 'X-Large'],
    images: {
      '#4F4631': [
        `${base}/img/product-page/t-shirt-front.png`,
        `${base}/img/product-page/t-shirt-back.png`,
        `${base}/img/product-page/t-shirt-real.png`,
      ],
      '#314F4A': [
        `${base}/img/products/stripped-t-shirt.png`,
        `${base}/img/products/stripped-t-shirt.png`,
        `${base}/img/products/stripped-t-shirt.png`,
      ],
      '#31344F': [
        `${base}/img/products/blue-polo.png`,
        `${base}/img/products/blue-polo.png`,
        `${base}/img/products/blue-polo.png`,
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
    recommendations: [1, 2, 3, 4],
    isNew: true,
    isTop: true,
  },
  {
    id: 4,
    title: 'One Life Graphic T-shirt',
    price: 300,
    sale: 0.4,
    rating: 4.5,
    description:
      'This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.',
    colors: ['#4F4631', '#314F4A', '#31344F'],
    sizes: ['Small', 'Medium', 'Large', 'X-Large'],
    images: {
      '#4F4631': [
        `${base}/img/product-page/t-shirt-front.png`,
        `${base}/img/product-page/t-shirt-back.png`,
        `${base}/img/product-page/t-shirt-real.png`,
      ],
      '#314F4A': [
        `${base}/img/products/stripped-t-shirt.png`,
        `${base}/img/products/stripped-t-shirt.png`,
        `${base}/img/products/stripped-t-shirt.png`,
      ],
      '#31344F': [
        `${base}/img/products/blue-polo.png`,
        `${base}/img/products/blue-polo.png`,
        `${base}/img/products/blue-polo.png`,
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
    recommendations: [1, 2, 3, 4],
    isNew: true,
    isTop: true,
  },
  {
    id: 5,
    title: 'One Life Graphic T-shirt',
    price: 300,
    sale: 0.4,
    rating: 4.5,
    description:
      'This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.',
    colors: ['#4F4631', '#314F4A', '#31344F'],
    sizes: ['Small', 'Medium', 'Large', 'X-Large'],
    images: {
      '#4F4631': [
        `${base}/img/product-page/t-shirt-front.png`,
        `${base}/img/product-page/t-shirt-back.png`,
        `${base}/img/product-page/t-shirt-real.png`,
      ],
      '#314F4A': [
        `${base}/img/products/stripped-t-shirt.png`,
        `${base}/img/products/stripped-t-shirt.png`,
        `${base}/img/products/stripped-t-shirt.png`,
      ],
      '#31344F': [
        `${base}/img/products/blue-polo.png`,
        `${base}/img/products/blue-polo.png`,
        `${base}/img/products/blue-polo.png`,
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
    recommendations: [1, 2, 3, 4],
    isNew: true,
    isTop: true,
  },
]
initialProducts.forEach((product) => {
  product.actualPrice = product.price - Math.round(product.price * product.sale)
})

const productSlice = createSlice({
  name: 'product',
  initialState: {
    selectedColor: null,
    selectedSize: null,
    product: null,
    searchQuery: '',
    filteredProducts: [],
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
      state.selectedColor = state.product.colors[0]
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
  },
})

export const {
  setColor,
  setSize,
  setProduct,
  setSearchQuery,
  searchProducts,
  clearSearch,
} = productSlice.actions

export default productSlice.reducer
