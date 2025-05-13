import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { removeFromCart } from "../../../redux/slices/cartSlice";

const CartItem = ({ id, title, desc, price, img }) => {
  const dispatch = useDispatch();
  const totalItems = useSelector((state) => state.cart.totalItems);
  const handleRemove = () => {
    dispatch(removeFromCart(id));
    localStorage.setItem("totalItems", JSON.stringify(totalItems));
    toast.error("Course removed from cart");
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 border-b border-gray-700 pb-5">
      {/* Thumbnail */}
      <img
        src={img}
        alt={title}
        className="w-[150px] lg:w-[200px]  rounded-xl"
      />

      {/* Details */}
      <div className="flex flex-col justify-between w-full text-white">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-400 mt-1">
          {desc?.length > 80 ? `${desc.substring(0, 80)}...` : desc}
        </p>

        {/* Price and Delete */}
        <div className="mt-4 flex justify-between items-center">
          <span className="text-green-400 text-md font-semibold">
            ₹ {price}
          </span>
          <button
            onClick={handleRemove}
            className="p-2 bg-red-600 hover:bg-red-700 rounded-full text-white transition"
            title="Remove from cart"
          >
            <MdDelete size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
