import React from "react";
import './Top10_BanChayNhat.css';
import Slider from "react-slick"; // Import Slider từ react-slick
import 'slick-carousel/slick/slick.css'; // Import Slick Carousel CSS
import 'slick-carousel/slick/slick-theme.css'; // Import theme CSS
import ProductCard_2 from '../ProductCard/ProductCard_2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const products = [
  {
      id: 1,
      category: "Ổi",
      name: "Ổi ruột đỏ Ruby giòn ngọt",
      originalPrice: "200,000đ",
      discountedPrice: "100,000đ",
      imageUrl: "./Images/oi.png",
      imageUrl_2: "./Images/oi_2.png",
      soldCount: 163,
      badge: "Best",
  },
  {
      id: 2,
      category: "Box",
      name: "Giỏ trái cây nhiệt đới TropiLove",
      originalPrice: "300,000đ",
      discountedPrice: "200,000đ",
      imageUrl: "./Images/box_tropical.png",
      soldCount: 173,
      badge: "Best",
  },
  {
      id: 3,
      category: "Lựu",
      name: "Lựu hong ngon hong tính tiền",
      originalPrice: "200,000đ",
      discountedPrice: "150,000đ",
      imageUrl: "./Images/luu.png",
      soldCount: 150,
      badge: "Best",
  },
  {
    id: 4,
    category: "Mãng cầu",
    name: "Mãng cầu ngọt say sinh tố",
    originalPrice: "200,000đ",
    discountedPrice: "150,000đ",
    imageUrl: "./Images/mangcau.png",
    soldCount: 150,
    badge: "Best",
  },
  {
    id: 5,
    category: "Đu đủ",
    name: "Đu đủ trong rừng",
    originalPrice: "200,000đ",
    discountedPrice: "150,000đ",
    imageUrl: "./Images/dudu.png",
    soldCount: 150,
    badge: "Best",
  }
  
];

const Top10_BanChayNhat = () => {
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
              <ProductCard_2 product={product} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
  
}

export default Top10_BanChayNhat;
