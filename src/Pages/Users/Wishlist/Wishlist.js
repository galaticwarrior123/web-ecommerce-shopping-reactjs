import './Wishlist.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import DefaultLayoutUserHomePage from "../../../Layouts/DefaultLayoutUserHomePage";
import WishlistAPI from "../../../API/WishlistAPI";
import { useNavigate, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTrash, faTimes } from '@fortawesome/free-solid-svg-icons';

const Wishlist = () => {
    const [wishlistItems, setWishlistItems] = useState([]);
    const [wishlistId, setWishlistId] = useState(null);
    const [wishlistItemCreatedAt, setWishlistItemCreatedAt] = useState(null);

    const totalItems = wishlistItems.length;

    const handleRemoveFromWishlist = async (itemId) => {
        try {
            const response = await WishlistAPI.DeleteProduct(wishlistId, String(itemId));
            console.log("Product removed from wishlist:", response);
            alert("Sản phẩm đã được xóa khỏi danh sách yêu thích!");

            // Update the wishlist items by filtering out the removed item
            setWishlistItems((prevItems) =>
                prevItems.filter((item) => item.product._id !== itemId)
            );
        } catch (error) {
            console.error("Error removing product from wishlist:", error);
            alert("Có lỗi xảy ra khi xóa sản phẩm khỏi danh sách yêu thích.");
        }
    };

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const data = await WishlistAPI.GetWishlist();
                console.log("DATA: ", data);
                if (data.data.success && data.data.wishlist) {
                    const products = data.data.wishlist.products || [];
                    console.log("Wishlist: ", data);
                    setWishlistItems(products);

                    const createdAtDates = products.map((item) =>
                        item.createdAt ? item.createdAt.split('T')[0] : "No date available"
                    );
                    console.log("Created At Dates: ", createdAtDates);

                    setWishlistItemCreatedAt(createdAtDates);
                    setWishlistId(data.data.wishlist._id); // Lưu _id của giỏ hàng
                    //setWishlistItemCreatedAt(data.data.wishlist.products.createdAt.split('T')[0]);
                    setWishlistItems(data.data.wishlist.products); // Giả sử products chứa danh sách sản phẩm
                }
            } catch (error) {
                console.error("Error fetching wishlist:", error);
            }
        };

        fetchWishlist();
    }, []);


    return (
        <DefaultLayoutUserHomePage>
            <div class="wishListContainer">
                <div className="row">
                    <div className="col-12 text-center">
                        <h3 className="mt-4" style={{ color: 'black' }}>DANH SÁCH SẢN PHẨM YÊU THÍCH <span className="text-muted">(<span>{totalItems}</span> sản phẩm)</span></h3>
                    </div>
                </div>
                {wishlistItems.length === 0 ? (
                    <p className="text-center">Danh sách đang trống</p>
                ) : (
                    wishlistItems.map((item) => (
                        <div class="row mt-3">
                            <div class="col-12">
                                <table className="table table-bordered wishlist-table">
                                    <thead className="thead-light">
                                        <tr>
                                            <th>Sản phẩm</th>
                                            <th>Ngày</th>
                                            <th>Trạng thái</th>
                                            <th>Đơn giá</th>
                                            <th></th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <img src={item.product.images[0] || "https://via.placeholder.com/60"} alt="Product Image" className="mr-3"></img>
                                                    <div>
                                                        <div className="product-category">{item.product.category?.name || 'Default Category Name'}</div>
                                                        <small style={{ fontSize: '15px', fontWeight: '450' }}>{item.product.productName || 'Default Product Name'}</small>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{item.createdAt ? item.createdAt.split('T')[0] : "No date available"}</td>

                                            <td className="status" style={{ color: item.product.quantity > 0 ? 'green' : 'red' }}>
                                                <i>
                                                    <FontAwesomeIcon icon={item.product.quantity > 0 ? faCheck : faTimes} />
                                                </i>
                                                {item.product.quantity > 0 ? ' Còn hàng' : ' Hết hàng'}
                                            </td>

                                            <td>
                                                {item.product.sale_price > 0 ? (
                                                    <>
                                                        <span className="price">{item.product.sale_price.toLocaleString() || 'Default Sale Price'} đ</span>
                                                        <span className="old-price">{item.product.origin_price.toLocaleString() || 'Default Origin Price'} đ</span>
                                                    </>) : (
                                                    <span className="price">{item.product.origin_price.toLocaleString() || 'Default Origin Price'} đ</span>
                                                )}
                                            </td>
                                            <td>
                                                <a
                                                    href={`/product/${item.product._id}`}
                                                    className="text-primary"><button className='btn-view-detail'>Xem chi tiết</button>
                                                </a>
                                                <button className='remove-item' onClick={() => handleRemoveFromWishlist(item.product._id)}>
                                                    <FontAwesomeIcon icon={faTrash} style={{ color: '#ea6975' }} />
                                                </button>
                                                {/* <br /><button className="btn btn-sm btn-add-to-cart" style={{ marginTop: '10px' }}>Thêm vào giỏ hàng</button> */}
                                            </td>
                                        </tr>

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </DefaultLayoutUserHomePage>
    )
}

export default Wishlist;