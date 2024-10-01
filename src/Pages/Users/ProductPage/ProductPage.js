import LeftPage from "../../../Components/LeftPage/LeftPage";
import DefaultLayoutUserHomePage from "../../../Layouts/DefaultLayoutUserHomePage";
import "./ProductPage.css";

import { useState, useEffect } from "react";
import ProductAPI from "../../../API/ProductAPI";
import ProductCard from "../../../Components/ProductCard/ProductCard";

const ProductPage = () => {
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

    return (
        <DefaultLayoutUserHomePage>
            <div className="row mt-5">
                <LeftPage onSelectCategory={handleCategorySelect} onSearch={handleSearch} />
                <div className="col-md-9 z-index-0">
                    <div className="row row-cols-1 row-cols-md-2 g-3">
                        {products.map((product, index) => (
                            <ProductCard key={index} product={product} />
                        ))}
                    </div>
                    
                    {/* Pagination */}
                    <div className="pagination mt-4 d-flex justify-content-center align-items-center">
                        <button
                            className="btn btn-primary me-2"
                            disabled={page === 1}
                            onClick={() => handlePageChange(page - 1)}
                        >
                            Previous
                        </button>
                        
                        <span>{`Page ${page} of ${totalPages}`}</span>
                        
                        <button
                            className="btn btn-primary ms-2"
                            disabled={page === totalPages}
                            onClick={() => handlePageChange(page + 1)}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </DefaultLayoutUserHomePage>
    );
};

export default ProductPage;
