import React from "react";
import { useGlobalContext } from "../Context/Context";
import { Navigation, Pagination } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";
import ItemSlide from "../ItemSlide/ItemSlide";


export default function SliderAutoPlay() {
  const { trending } = useGlobalContext();

  return (
    <>
      <main className="slider">
          <Swiper
          slidesPerView={4}
          spaceBetween={30}
          slidesPerGroup={4}
          loop={true}
          loopFillGroupWithBlank={true}
          
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper"

          breakpoints={{
            0:{
                 slidesPerView:1,
                 spaceBetween:10,
            },
             480:{
                 slidesPerView:2,
                 spaceBetween:10,
             },
             768:{
        
                 slidesPerView:3,
                 spaceBetween:15,
             },
             992:{
              slidesPerView:4,
              spaceBetween: 15,            },
             1024:{
              slidesPerView: 4,
              spaceBetween: 30,            },
            

             }}




          >
           
            {trending.map((item) => (
              <SwiperSlide key={item.id} > <ItemSlide trending={item}  /> </SwiperSlide>
            ))}
          </Swiper>
      </main>
    </>
  );
}
