import RatingStars from "./RatingStars";

const RatingAndReviewCard = ({ name, rating, text, img }) => {
  return (
    <div className="bg-gray-900/30 border border-gray-700/80 rounded-lg h-53 w-70 shadow-md">
      <div className="flex items-center gap-3 p-4 border-b border-gray-600 bg-gray-900 rounded-t-lg">
        <img src={img} alt={name} className="w-12 h-12 rounded-full" />
        <div>
          <h3 className="text-white font-semibold">{name}</h3>
        </div>
      </div>
      <div className="p-4 text-gray-300">
        <div className="flex flex-row items-center gap-3 mb-2 text-lg">
          <div>
            <RatingStars Review_Count={rating} />
          </div>
          <div> {rating}</div>
        </div>
        <p className="text-sm text-left mb-4">{text.length>95?text.substring(0,93)+"...":text}</p>
      </div>
    </div>
  );
};

export default RatingAndReviewCard;
