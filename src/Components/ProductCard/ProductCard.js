import './ProductCard.css';


const ProductCard = ({ product }) => {
    return (
        <div className="col-md-3 mb-4">
            <div className="card">
                <img src={product.images[0]} className="card-img-top" alt={product.title} />
                <div className="card-body">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text">Giá bán: {product.price} VND</p>
                    <div className="d-flex justify-content-around">
                        <button className="btn btn-light">
                            <i className="fas fa-cart-plus"></i>
                        </button>
                        <button className="btn btn-light">
                            <i className="fas fa-info-circle"></i>
                        </button>
                        <button className="btn btn-light">
                            <i className="fas fa-heart"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;