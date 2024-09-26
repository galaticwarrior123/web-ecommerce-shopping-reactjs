import React from 'react';

const ProductItem = ({ product }) => {
    return (
        <div className="border rounded-lg p-4 shadow-lg transition-transform transform hover:scale-105">
            <img
                src="https://cdn.eva.vn/upload/4-2021/images/2021-11-26/trai-cay1-1637895782-331-width600height450.jpg"
                alt={product.productName}
                className="w-full h-40 object-cover mb-2 rounded"
            />
            <h3 className="text-lg font-bold mb-1">{product.productName}</h3>
            <p className="text-gray-600 text-base">${product.price}</p>
        </div>
    );
};



export default ProductItem;
