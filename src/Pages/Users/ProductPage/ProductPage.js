import LeftPage from "../../../Components/LeftPage/LeftPage";
import DefaultLayoutUserHomePage from "../../../Layouts/DefaultLayoutUserHomePage";
import "./ProductPage.css";

import { useState, useEffect } from "react";
import ProductAPI from "../../../API/ProductAPI";
import ProductCard from "../../../Components/ProductCard/ProductCard";

const ProductPage = () => {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState("asc");
    const [selectedCategoryId, setSelectedCategoryId] = useState([]);
    const [products, setProducts] = useState([]);

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
        } catch (error) {
            console.error('Lỗi khi lấy sản phẩm:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [search, page, sort, selectedCategoryId]);


    const handleCategorySelect = (id) => {
        if (selectedCategoryId.includes(id)) {
            // Nếu đã có, loại bỏ nó khỏi mảng
            setSelectedCategoryId(prev => prev.filter(categoryId => categoryId !== id));
        } else {
            // Nếu chưa có, thêm id vào mảng
            setSelectedCategoryId(prev => [...prev, id]);
        }
    };

    useEffect(() => {
        console.log("Selected Category IDs: ", selectedCategoryId);
    }, [selectedCategoryId]);

    const handleSearch = (input) => {
        setSearch(input);
        console.log("Search: ", input);
    };
    return (
        <DefaultLayoutUserHomePage>
            <div className="row mt-5">
                <LeftPage onSelectCategory={handleCategorySelect} onSearch={handleSearch} />
                <div className="col-md-9 z-index-0">
                    <div className="row row-cols-1 row-cols-md-2 g-3">
                        {products.map((product, index) => (
                            <ProductCard product={product} key={index} />
                        ))}
                    </div>
                </div>
            </div>
        </DefaultLayoutUserHomePage>
    );
}

export default ProductPage;
