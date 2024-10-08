import React from "react";
import { useState, useEffect } from "react";
import './Top10_BanChayNhat.css';
import Slider from "react-slick"; // Import Slider từ react-slick
import 'slick-carousel/slick/slick.css'; // Import Slick Carousel CSS
import 'slick-carousel/slick/slick-theme.css'; // Import theme CSS
import ProductCard_2 from '../ProductCard/ProductCard_2';
import ProductAPI from "../../API/ProductAPI";

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
      imageUrl_2: "./Images/box_tropical_2.png",
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
      imageUrl_2: "./Images/luu_2.png",
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
    imageUrl_2: "./Images/mangcau_2.png",
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
    imageUrl_2: "./Images/dudu_2.png",
    soldCount: 150,
    badge: "Best",
  }
  
];

const Top10_BanChayNhat = () => {
  const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [productsPerPage] = useState(2); // Số sản phẩm mỗi trang
    const [sort, setSort] = useState("asc");
    const [selectedCategoryId, setSelectedCategoryId] = useState([]);
    const [products, setProducts] = useState([]);
    const [hasMore, setHasMore] = useState(true); // Để theo dõi có còn sản phẩm hay không
    const [totalProducts, setTotalProducts] = useState(0); // Tổng số sản phẩm
    const [totalPages, setTotalPages] = useState(1); // Tổng số trang

    const fetchProducts = async () => {
        try {
            const response = await ProductAPI.getProducts({
                name: search,
                page,
                sort,
                category: selectedCategoryId.join(','),
            });
            console.log(response);
            setProducts(response.data.DT.products);
            setTotalProducts(response.data.DT.products.length); // Tổng số sản phẩm
            setTotalPages(Math.ceil(response.data.DT.products.length / productsPerPage)); // Tính tổng số trang
        } catch (error) {
            console.error('Lỗi khi lấy sản phẩm:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [search, page, sort, selectedCategoryId]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage); // Cập nhật trang mới
        }
    };

    const handleCategorySelect = (id) => {
        if (selectedCategoryId.includes(id)) {
            setSelectedCategoryId(prev => prev.filter(categoryId => categoryId !== id));
        } else {
            setSelectedCategoryId(prev => [...prev, id]);
        }
    };

    const handleSearch = (input) => {
        setSearch(input);
        console.log("Search: ", input);
    };


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
          {products.map((product, index) => (
            <div key={product.id}>
              {/* <ProductCard_2 product={product} showProductCount={true} showViewCount={false} /> */}
              <ProductCard_2 key={index} product={product} showProductCount={true} showViewCount={false} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
  
}

export default Top10_BanChayNhat;
