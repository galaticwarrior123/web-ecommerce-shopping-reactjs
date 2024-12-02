import { useEffect, useState } from "react";
import OrderAPI from "../../../API/OrderAPI";
import PurchasedProductItem from "./PurchasedProductItem";
import ModalAddReview from "./ModalAddReview";
import ReviewAPI from "../../../API/ReviewAPI";
import { toast } from "react-toastify";
import DefaultLayoutUserHomePage from "../../../Layouts/DefaultLayoutUserHomePage";

const PurchasedProducts = () => {
  const [products, setProducts] = useState([]);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});

  const handleSubmitReview = async (review) => {
    if (!review.rating) {
      toast.error("Rating is required");
      return;
    }
    if (!review.comment) {
      toast.error("Comment is required");
      return;
    }
    if (review.comment.length < 10) {
      toast.error("Comment must be at least 10 characters long");
      return;
    }
    review.product = selectedProduct._id;
    const response = await ReviewAPI.CreateReview(review);
    if (response.status === 200) {
      toast.success("Review successfully added");
      setShowReviewModal(false);
      await fetchaProductsPurchased();
    } else {
      toast.error("Error: " + response.data.EM);
    }
  };

  const handleShowReviewModal = (product) => {
    setSelectedProduct(product);
    setShowReviewModal(true);
  };

  const fetchaProductsPurchased = async () => {
    try {
      const response = await OrderAPI.GetProductPurchased();
      setProducts(response.data.DT);
    } catch (error) {
      console.error("Error:", error.response.data.EM);
    }
  };

  useEffect(() => {
    fetchaProductsPurchased();
  }, []);

  return (
    <DefaultLayoutUserHomePage>
      <h3 className="text-center fs-1 mt-4">Đánh giá sản phẩm</h3>
      <div className="row mt-3 border border-2 rounded-3 px-3 mx-5 ">
        {products.length === 0 && <p className="text-center mt-4">Không còn sản phẩm để đánh giá</p>}
        {products &&
          products.length > 0 &&
          products.map((product) => (
            <PurchasedProductItem
              key={product._id}
              product={product}
              handleShowReviewModal={handleShowReviewModal}
            />
          ))}
        <ModalAddReview
          show={showReviewModal}
          setShow={setShowReviewModal}
          handleSubmitReview={handleSubmitReview}
        />
      </div>
    </DefaultLayoutUserHomePage>
  );
};

export default PurchasedProducts;
