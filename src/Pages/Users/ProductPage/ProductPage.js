import { useState, useEffect } from "react";
import LeftPage from "../../../Components/LeftPage/LeftPage";
import DefaultLayoutUserHomePage from "../../../Layouts/DefaultLayoutUserHomePage";
import ProductAPI from "../../../API/ProductAPI";
import ProductCard_2 from "../../../Components/ProductCard/ProductCard_2";
import "./ProductPage.css";
import { useLocation, useNavigate } from "react-router-dom";

const PRODUCTS_PER_PAGE = 10;

const ProductPage = () => {
    const [search, setSearch] = useState("");
    const [selectedCategoryId, setSelectedCategoryId] = useState([]);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();
    const location = useLocation();


    // lấy params từ url
    const params = new URLSearchParams(location.search);

    useEffect(() => {
        // Initialize filters from navigation state if available
        if (params.get('categoryId') ) {
            console.log('all: ', params.get('categoryId'));
            fetchProducts();
        } else {
            if (params) {
                if (params.get("categoryId")) setSelectedCategoryId([...params.get("categoryId").split(",")]);

                if (params.get("search")) setSearch(params.get("search"));

            }
            else {
                fetchProducts();
            }
        }

    }, [params.get("categoryId"), params.get("search")]);


    // Fetch products only once on component mount
    useEffect(() => {

        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await ProductAPI.getAllProducts();
            if (response.data?.DT?.products) {
                setProducts(response.data.DT.products);
            } else {
                console.error('No products returned or incorrect data structure:', response.data);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    // Filter products whenever `products`, `selectedCategoryId`, or `search` changes
    useEffect(() => {
        const filterProducts = () => {
            let filtered = products;

            if (selectedCategoryId.length > 0) {
                filtered = filtered.filter(product => selectedCategoryId.includes(product.category));
            }

            if (search) {
                filtered = filtered.filter(product =>
                    product.productName.toLowerCase().includes(search.toLowerCase())
                );
            }

            setFilteredProducts(filtered);
            setTotalPages(Math.ceil(filtered.length / PRODUCTS_PER_PAGE));
            setPage(1); // Reset to first page on filter change
        };
        filterProducts();
    }, [products, selectedCategoryId, search]);

    const handlePageChange = (newPage) => setPage(newPage);

    const handleCategorySelect = (id) => {
        setSelectedCategoryId(prev =>
            prev.includes(id) ? prev.filter(categoryId => categoryId !== id) : [...prev, id]
        );
    };

    const handleSearch = (input) => setSearch(input);

    // Paginate products for current page
    const paginatedProducts = filteredProducts.slice((page - 1) * PRODUCTS_PER_PAGE, page * PRODUCTS_PER_PAGE);

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

                    <div className="pagination mt-4 d-flex justify-content-center align-items-center">
                        <button
                            className="btn btn-primary me-2"
                            disabled={page === 1}
                            onClick={() => handlePageChange(page - 1)}
                        >
                            Trước
                        </button>

                        <span>{page} của {totalPages}</span>

                        <button
                            className="btn btn-primary ms-2"
                            disabled={page === totalPages}
                            onClick={() => handlePageChange(page + 1)}
                        >
                            Sau
                        </button>
                    </div>
                </div>
            </div>
        </DefaultLayoutUserHomePage>
    );
};

export default ProductPage;
