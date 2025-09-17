"use client" // (Super expression must either be null or a function) لحل المشكلة دي
import Image from "next/image";
import React from "react";
import Slider from "react-slick";

export default function MainSlider() {
  const settings = {
    arrows: false,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 500
  };
  return (
    <div className="grid grid-cols-12 my-5">
        <div className="col-span-10">
            <Slider {...settings}>
                <div>
                    < Image src='/images/slider-image-1.jpeg' alt="imageslider1" width={1000} height={1000} className="w-full h-96 object-cover" />
                </div>
                <div>
                    < Image src='/images/slider-image-2.jpeg' alt="imageslider2" width={1000} height={1000} className="w-full h-96 object-cover" />
                </div>
                <div>
                    < Image src='/images/slider-image-3.jpeg' alt="imageslider3" width={1000} height={1000} className="w-full h-96 object-cover" />
                </div>
            </Slider>
        </div>

        <div className="col-span-2">
          <div>
            < Image src='/images/slider-image-1.jpeg' alt="imageslider1" width={1000} height={1000} className="w-full h-48 object-cover" />
          </div>
          <div>
            < Image src='/images/slider-image-2.jpeg' alt="imageslider2" width={1000} height={1000} className="w-full h-48 object-cover" />
          </div>
        </div>
    </div>
  );
}