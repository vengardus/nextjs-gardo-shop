"use client"

// Import Swiper React components
import { useState } from 'react';
import { Swiper as SwiperObject } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs, Autoplay } from 'swiper/modules'
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'

import './slideshow.css'
import { ProductImage } from '../product-image/ProductImage';

interface Props {
  images: string[],
  title: string,
  className: string
}

export const ProductSlideShow = ({ images, title, className }: Props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>()

  return (
    <div className={className}>
      <Swiper
        // styles para las flechas de paginación del slide
        // style={{
        //     '--swiper-navigation-color': '#fff',
        //     '--swiper-pagination-color': '#fff',
        // } as React.CSSProperties
        // }
        spaceBetween={10}
        navigation={true}
        autoplay={{
          delay: 2500
        }}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null
        }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        className="mySwiper2"
      >
        {
          images.map(image => (
            <SwiperSlide key={image}>
              <ProductImage
                width={512}
                height={380}
                src={image}
                alt={title}
                className='rounded-lg object-fill'
              />
            </SwiperSlide>
          ))
        }
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {
          images.map(image => (
            <SwiperSlide key={image}>
              <ProductImage
                width={300}
                height={300}
                src={image}
                alt={title}
                className='rounded-lg object-fill'
              />
            </SwiperSlide>
          ))
        }
      </Swiper>
    </div>
  )
}

{

  /* 
  Enlaces videos
  
  https://www.xvideos.com/video.ucoieihf626/alice_fernandez_disfruta_nuestro_gangbang_negro_3_negrazos_para_ella

  */
}