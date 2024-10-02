import { React, useState } from "react";
import './HomePage_CommonUsers.css';
import DefaultLayoutUserHomePage from "../../../Layouts/DefaultLayoutUserHomePage";
import LeftPage from "../../../Components/LeftPage/LeftPage";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Top10_BanChayNhat from '../../../Components/Top10_BanChayNhat/Top10_BanChayNhat';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faAngleDown, faCartShopping, faFileInvoiceDollar, faUser, faHeart } from '@fortawesome/free-solid-svg-icons';

import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';


const HomePage = () => {
    const [search, setSearch] = useState("");
    const [selectedCategoryId, setSelectedCategoryId] = useState([]);

    const handleSearch = (input) => {
        setSearch(input);
        console.log("Search: ", input);
    };

    const handleCategorySelect = (id) => {
        if (selectedCategoryId.includes(id)) {
            // Nếu đã có, loại bỏ nó khỏi mảng
            setSelectedCategoryId(prev => prev.filter(categoryId => categoryId !== id));
        } else {
            // Nếu chưa có, thêm id vào mảng
            setSelectedCategoryId(prev => [...prev, id]);
        }
    };

    return (
        <DefaultLayoutUserHomePage>
            <div className="container-common">
                <div className="row mt-5">
                    <LeftPage onSelectCategory={handleCategorySelect} onSearch={handleSearch} />
                    <div class="col-md-9 z-index-0">
                        <div class="row row-badge">
                            <div class="col-3">
                                <div class="p-2">
                                    <div className="badge1">
                                        <img src="./Images/always_fresh.png" alt="badge 1" class="badge-logo"></img>
                                        <span>ALWAYS FRESH</span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-3">
                                <div class="p-2">
                                    <div className="badge2">
                                        <img src="./Images/super_healthy.png" alt="badge 2" class="badge-logo"></img>
                                        <span>SUPER HEALTHY</span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-3">
                                <div class="p-2">
                                    <div className="badge3">
                                        <img src="./Images/premium_quality.png" alt="badge 3" class="badge-logo"></img>
                                        <span>PREMIUM QUALITY</span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-3">
                                <div class="p-2">
                                    <div className="badge4">
                                        <img src="./Images/natural.png" alt="badge 4" class="badge-logo"></img>
                                        <span>100% NATURAL</span>
                                    </div>
                                </div>
                            </div>


                        </div>
                        {/* <div class="badge-shop">
                                <div className="badge1">
                                    <img src="./Images/always_fresh.png" alt="badge 1" class="badge-logo"></img>
                                    <span>ALWAYS FRESH</span>
                                </div>

                                <div className="badge2">
                                    <img src="./Images/super_healthy.png" alt="badge 2" class="badge-logo"></img>
                                    <span>SUPER HEALTHY</span>
                                </div>

                                <div className="badge3">
                                    <img src="./Images/premium_quality.png" alt="badge 3" class="badge-logo"></img>
                                    <span>PREMIUM QUALITY</span>
                                </div>

                                <div className="badge4">
                                    <img src="./Images/natural.png" alt="badge 4" class="badge-logo"></img>
                                    <span>100% NATURAL</span>
                                </div>
                            </div> */}

                        <div className="row row_2">
                            <div className="col-12">
                                <div id="carouselExampleFade" class="carousel slide carousel-fade" data-bs-ride="carousel">

                                    <div class="carousel-indicators">
                                        <button type="button" data-bs-target="#carouselExampleFade" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                                        <button type="button" data-bs-target="#carouselExampleFade" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                        <button type="button" data-bs-target="#carouselExampleFade" data-bs-slide-to="2" aria-label="Slide 3"></button>
                                    </div>

                                    <div class="carousel-inner">
                                        <div class="carousel-item active" data-bs-interval="3000">
                                            <img src="./Images/slide1.png" class="d-block w-100" alt="..." />
                                        </div>
                                        <div class="carousel-item" data-bs-interval="3000">
                                            <img src="./Images/slide2.png" class="d-block w-100" alt="..." />
                                        </div>
                                        <div class="carousel-item" data-bs-interval="3000">
                                            <img src="./Images/slide3.png" class="d-block w-100" alt="..." />
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        {/* <div class="row row-cols-1 row-cols-md-2 g-3">
                        <span>asdfs</span>
                    </div> */}
                    </div>
                </div>

                <div className="row mt-5 row2">

                    <div class="container overflow-hidden">
                        <div class="row gx-5">
                            <div class="col-4">
                                <div class="p-3">
                                    <div class="gallery-image__item nov-sh-image-1 lazyloaded">
                                        <a class="w-100 gallery-image__link" href="#">
                                            <img class="w-100 lazyloaded" alt="gallery image" src="./Images/tomato_juice.png" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div class="col-4">
                                <div class="p-3">
                                    <div class="gallery-image__item nov-sh-image-1 lazyloaded">
                                        <a class="w-100 gallery-image__link" href="#">
                                            <img class="w-100 lazyloaded" alt="gallery image" src="./Images/peach_juice.png" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div class="col-4">
                                <div class="p-3">
                                    <div class="gallery-image__item nov-sh-image-1 lazyloaded">
                                        <a class="w-100 gallery-image__link" href="#">
                                            <img class="w-100 lazyloaded" alt="gallery image" src="./Images/apple_juice.png" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className="row spacing-30">

                            <div class="col-lg-4 col-md-4 col-xs-12 gallery-image_column mb-sm-15">
                                <div class="gallery-image__item nov-sh-image-1 lazyloaded">
                                    <a class="w-100 gallery-image__link" href="#">
                                        <img class="w-100 lazyloaded" alt="gallery image" src="./Images/tomato_juice.png"/>
                                    </a>
                                </div>
                            </div>

                            <div class="col-lg-4 col-md-4 col-xs-12 gallery-image_column mb-sm-15">
                                <div class="gallery-image__item nov-sh-image-1 lazyloaded">
                                    <a class="w-100 gallery-image__link" href="#">
                                        <img class="w-100 lazyloaded" alt="gallery image" src="./Images/peach_juice.png"/>
                                    </a>
                                </div>
                            </div>

                            <div class="col-lg-4 col-md-4 col-xs-12 gallery-image_column mb-sm-15">
                                <div class="gallery-image__item nov-sh-image-1 lazyloaded">
                                    <a class="w-100 gallery-image__link" href="#">
                                        <img class="w-100 lazyloaded" alt="gallery image" src="./Images/apple_juice.png"/>
                                    </a>
                                </div>
                            </div>

                        </div> */}

                </div>

                <div className="row mt-5 row3">
                    <div className="content">
                        <span>TOP NHỮNG SẢN PHẨM BÁN CHẠY NHẤT</span>
                        <Top10_BanChayNhat/>
                    </div>
                </div>

                <div className="row mt-5 row3">
                    <div className="content">
                        <span>TOP NHỮNG SẢN PHẨM XEM NHIỀU NHẤT</span>
                    </div>
                </div>
            </div>
        </DefaultLayoutUserHomePage>



    );
};

export default HomePage;