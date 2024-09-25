import React, { useState, useEffect } from 'react';
import ProductItem from '../../Common/ProductItem/ProductItem.js';
import ProductAPI from '../../../API/ProductAPI.js';

const SearchPage = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortOrder, setSortOrder] = useState('asc');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const categories = ['Táo', 'Nho', 'Chuối', 'Cam', 'Xoài'];

    const fetchProducts = async (page, sort, categories, searchTerm) => {
        try {
            const response = await ProductAPI.getProducts({ // Sử dụng phương thức tĩnh
                name: searchTerm,
                page,
                sort,
                categories: categories.join(','),
            });
            console.log(response.data);
            setProducts(response.data.DT.products);
        } catch (error) {
            console.error('Lỗi khi lấy sản phẩm:', error);
        }
    };

    useEffect(() => {
        fetchProducts(currentPage, sortOrder, selectedCategories, searchTerm);
    }, [currentPage, sortOrder, selectedCategories, searchTerm]);

    const handlePrevPage = () => {
        setCurrentPage(prev => Math.max(prev - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage(prev => prev + 1);
    };

    const handleSortChange = () => {
        setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
    };

    const handleCategoryChange = (event) => {
        const selectedOptions = Array.from(event.target.selectedOptions).map(option => option.value);
        setSelectedCategories(selectedOptions);
        setCurrentPage(1);
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchSubmit = () => {
        setCurrentPage(1);
        fetchProducts(currentPage, sortOrder, selectedCategories, searchTerm); // Fetch products with the search term
    };

    return (
        <div className="p-4">
            <div className="flex flex-col space-y-4">
                {/* Search Bar */}
                <div className="flex items-center mb-4">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearch}
                        placeholder="Tìm kiếm sản phẩm..."
                        className="w-full p-2 border rounded-md"
                    />
                    <button
                        onClick={handleSearchSubmit}
                        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Tìm kiếm
                    </button>
                </div>

                {/* Dropdown Menu for Categories and Sort Button */}
                <div className="flex items-center space-x-4 mb-4">
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">Chọn danh mục</label>
                        <select
                            multiple
                            value={selectedCategories}
                            onChange={handleCategoryChange}
                            className="w-full p-2 border rounded-md"
                        >
                            {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <button
                            onClick={handleSortChange}
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                        >
                            Sắp xếp: {sortOrder === 'asc' ? 'Tăng dần' : 'Giảm dần'}
                        </button>
                    </div>
                </div>

                {/* Hiển thị danh mục đã chọn */}
                <div className="mb-4">
                    <h3 className="text-lg font-semibold">Danh mục đã chọn:</h3>
                    <div className="flex flex-wrap space-x-2">
                        {selectedCategories.length > 0 ? (
                            selectedCategories.map((category) => (
                                <span
                                    key={category}
                                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full"
                                >
                                    {category}
                                </span>
                            ))
                        ) : (
                            <p className="text-gray-500">Chưa chọn danh mục nào.</p>
                        )}
                    </div>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-5 gap-4 mb-4">
                    {products.length > 0 ? (
                        products.map(product => (
                            <div key={product.id} className="col-span-1">
                                <ProductItem product={product} />
                            </div>
                        ))
                    ) : (
                        <p>Không có sản phẩm nào.</p>
                    )}
                </div>

                {/* Pagination */}
                <div className="flex justify-center space-x-4 mt-4">
                    <button
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:bg-gray-200"
                    >
                        Trang trước
                    </button>
                    <span>Trang {currentPage}</span>
                    <button
                        onClick={handleNextPage}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                    >
                        Trang tiếp theo
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SearchPage;
