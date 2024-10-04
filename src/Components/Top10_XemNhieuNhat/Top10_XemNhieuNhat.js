import React from "react";
import './Top10_XemNhieuNhat.css';
import Slider from "react-slick"; // Import Slider từ react-slick
import 'slick-carousel/slick/slick.css'; // Import Slick Carousel CSS
import 'slick-carousel/slick/slick-theme.css'; // Import theme CSS
import ProductCard_2 from '../ProductCard/ProductCard_2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const products = [
  {
      id: 1,
      category: "Bơ",
      name: "Bơ beo béo",
      originalPrice: "200,000đ",
      discountedPrice: "100,000đ",
      imageUrl: "./Images/bo.png",
      imageUrl_2: "./Images/bo_2.png",
      viewCount: 1000,
      badge: "Hot",
  },
  {
    id: 2,
    category: "Măng cụt",
    name: "Măng cụt ngọt lắm",
    originalPrice: "200,000đ",
    discountedPrice: "100,000đ",
    imageUrl: "./Images/mangcut.png",
    imageUrl_2: "./Images/mangcut_2.png",
    viewCount: 1500,
    badge: "Hot",
  },
  {
    id: 3,
    category: "Cà chua",
    name: "Cà chua thân gỗ",
    originalPrice: "200,000đ",
    discountedPrice: "100,000đ",
    imageUrl: "./Images/cachua.png",
    imageUrl_2: "./Images/cachua_2.png",
    viewCount: 900,
    badge: "Hot",
  },
  {
    id: 4,
    category: "Chanh",
    name: "Chanh không hột",
    originalPrice: "200,000đ",
    discountedPrice: "100,000đ",
    imageUrl: "./Images/chanh.png",
    imageUrl_2: "./Images/chanh_2.png",
    viewCount: 900,
    badge: "Hot",
  }
  
];

const Top10_XemNhieuNhatNhat = () => {
     // Cấu hình cho Slick Carousel
     const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3, // Hiển thị 3 sản phẩm cùng lúc
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      arrows: true
  };

  return (
    <div className="product-container">
      <div className="product-carousel">
        <Slider {...settings}>
          {products.map((product) => (
            <div key={product.id}>
              <ProductCard_2 product={product} showProductCount={false} showViewCount={true} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
  
}

export default Top10_XemNhieuNhatNhat;
