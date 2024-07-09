"use client"

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination, Autoplay } from 'swiper/modules'
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode'
import 'swiper/css/pagination'

import './slideshow.css'
import Image from 'next/image';

interface Props {
    images: string[],
    title: string,
    className: string
}

export const ProductMobileSlideShow = ({ images, title, className }: Props) => {

    return (
        <div className={className}>
            <Swiper
                style={{
                    width: '98vw',
                    height: '500px'
                }
                }
                autoplay={{
                    delay: 2500
                }}
                pagination
                modules={[FreeMode, Pagination, Autoplay]}
                className="mySwiper"
            >
                {
                    images.map(image => (
                        <SwiperSlide key={image}>
                            <Image
                                width={600}
                                height={500}
                                src={`/products/${image}`}
                                alt={title}
                                className='object-fill'
                            />
                        </SwiperSlide>
                    ))
                }
            </Swiper>

        </div>
    )
}
