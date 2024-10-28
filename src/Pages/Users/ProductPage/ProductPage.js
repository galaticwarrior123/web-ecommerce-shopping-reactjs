import { useState, useEffect } from "react";
import LeftPage from "../../../Components/LeftPage/LeftPage";
import DefaultLayoutUserHomePage from "../../../Layouts/DefaultLayoutUserHomePage";
import ProductAPI from "../../../API/ProductAPI";
import ProductCard_2 from "../../../Components/ProductCard/ProductCard_2";
import "./ProductPage.css";

const PRODUCTS_PER_PAGE = 10;

const ProductPage = () => {
    const [search, setSearch] = useState("");
    const [selectedCategoryId, setSelectedCategoryId] = useState([]);
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchProducts = async () => {
        try {
            const response = await ProductAPI.getAllProducts();
            if (response.data && response.data.DT && response.data.DT.products) {
                setProducts(response.data.DT.products);
                setTotalPages(Math.ceil(response.data.DT.products.length / PRODUCTS_PER_PAGE));
            } else {
                console.error('Không có sản phẩm nào được trả về hoặc cấu trúc dữ liệu không đúng:', response.data);
            }
        } catch (error) {
            console.error('Lỗi khi lấy sản phẩm:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [search, selectedCategoryId]);

    const handlePageChange = (newPage) => {
        setPage(newPage);
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
    };

    // Get products for current page
    const paginatedProducts = products.slice((page - 1) * PRODUCTS_PER_PAGE, page * PRODUCTS_PER_PAGE);

    return (
        <DefaultLayoutUserHomePage>
            <div className="row mt-5">
                <LeftPage onSelectCategory={handleCategorySelect} onSearch={handleSearch} />
                <div className="col-md-9 z-index-0">
                    <div className="row row-cols-1 row-cols-md-2 g-3">
                        {paginatedProducts.map((product, index) => (
                            <ProductCard_2 key={index} product={product} showProductCount={true} showViewCount={true} />
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

                        <span>{page} of {totalPages}</span>

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
