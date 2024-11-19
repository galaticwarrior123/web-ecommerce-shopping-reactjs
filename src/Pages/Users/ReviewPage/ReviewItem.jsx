import { Rating } from "@smastrom/react-rating";

const ReviewItem = ({ review }) => {
  const formattedDate = new Date(review.createdAt).toLocaleString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  return (
    <div className="d-flex flex-row gap-3 border border-primary align-items-center w-75 my-2 p-2">
      <img src={review.user.avatar} style={{ width: "100px", height: "80px", borderRadius: "50%", objectFit: "cover" }} />
      <div className="d-flex flex-column gap-1">
        <span className="fw-bold">{review.user.username}</span>
        <Rating value={review.rating} readOnly style={{ width: "10%" }} />
        <span>{review.comment}</span>
        <span className="d-flex justify-content-end">{formattedDate}</span>
      </div>
    </div>
  );
};
export default ReviewItem;
