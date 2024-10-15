import LeftPage from "../../../Components/LeftPage/LeftPage";
import DefaultLayoutUserHomePage from "../../../Layouts/DefaultLayoutUserHomePage";
import "./ProductPage.css";

import { useState, useEffect } from "react";
import ProductAPI from "../../../API/ProductAPI";
import ProductCard_2 from "../../../Components/ProductCard/ProductCard_2";

const ProductPage = () => {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
   
    const [sort, setSort] = useState("asc");
    const [selectedCategoryId, setSelectedCategoryId] = useState([]);
    const [products, setProducts] = useState([]);
    const [hasMore, setHasMore] = useState(true); // Track if more products are available
    const [totalPages, setTotalPages] = useState(1); // Total number of pages

    const fetchProducts = async () => {
        try {
            const response = await ProductAPI.getProducts({
                name: search,
                page: page,
                sort,
                category: selectedCategoryId.join(','),
            });
           
            const fetchedProducts = response.data.DT.products;
            setTotalPages(response.data.DT.totalPages); // Set the total number of pages

            if (fetchedProducts.length > 0) {
                setProducts(fetchedProducts); // Set the new products
                setHasMore(true); // More products are available
               
            } else {
                setHasMore(false); // No more products
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [search, page, sort, selectedCategoryId]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage); // Update to the new page
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
                            disabled={page === totalPages || !hasMore}
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
